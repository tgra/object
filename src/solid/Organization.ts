import { TermWrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { VCARD, SCHEMA, RDF } from "../vocabulary/mod.js"

type SchemaOrganizationType = typeof SCHEMA[keyof typeof SCHEMA]

const allowedOrgTypes = new Set<string>([
    SCHEMA.Corporation,
    SCHEMA.EducationalOrganization,
    SCHEMA.GovernmentOrganization,
    SCHEMA.NGO,
    SCHEMA.PerformingGroup,
    SCHEMA.Project,
    SCHEMA.SportsOrganization,
])

export class Organization extends TermWrapper {

    constructor(term: string | any, dataset: any, factory?: any) {
        // Convert string to NamedNode if needed
        const t = typeof term === "string" ? (factory || dataset.factory).namedNode(term) : term
        super(t, dataset, factory)

        // Always declare as vcard:Organization
        if (!dataset.has(this.term, RDF.type, VCARD.Organization)) {
            dataset.add((factory || dataset.factory).quad(this.term, RDF.type, VCARD.Organization))
        }
    }

    get name(): string | undefined {
        return this.singularNullable(SCHEMA.name, ValueMappings.literalToString)
    }

    set name(value: string | undefined) {
        this.overwriteNullable(SCHEMA.name, value, TermMappings.stringToLiteral)
    }

    get url(): string | undefined {
        return this.singularNullable(SCHEMA.url, ValueMappings.iriToString)
    }

    set url(value: string | undefined) {
        this.overwriteNullable(SCHEMA.url, value, TermMappings.stringToIri)
    }

    get types(): Set<string> {
        const orgTypes = new Set<string>()
        for (const iri of this.objects(RDF.type, ValueMappings.iriToString, TermMappings.stringToIri)) {
            orgTypes.add(iri)
        }
        return orgTypes
    }

    /** Add a new type for this organization */
    addType(orgType: SchemaOrganizationType): void {
        if (!allowedOrgTypes.has(orgType)) {
            throw new Error(`Invalid organization type: ${orgType}`)
        }
        const types = this.objects(
            RDF.type,
            ValueMappings.iriToString,
            TermMappings.stringToIri
        )
        types.add(orgType)
    }


}

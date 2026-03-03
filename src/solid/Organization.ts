import { TermWrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { VCARD, SCHEMA, RDF } from "../vocabulary/mod.js"

export class Organization extends TermWrapper {
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
}

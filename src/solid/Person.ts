import { TermWrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { VCARD, OWL } from "../vocabulary/mod.js"
import { rdf } from "rdf-namespaces" 

export class Person extends TermWrapper {

    constructor(term: string | any, dataset: any, factory?: any) {
        // Convert string to NamedNode if needed
        const t = typeof term === "string" ? (factory || dataset.factory).namedNode(term) : term
        super(t, dataset, factory)

        // Always declare as vcard:Individual
        if (!dataset.has(this.term, rdf.type, VCARD.Individual)) {
            dataset.add((factory || dataset.factory).quad(this.term, rdf.type, VCARD.Individual))
        }
    }

    get name(): string | undefined {
        return this.singularNullable(VCARD.fn, ValueMappings.literalToString)
    }

    set name(value: string | undefined) {
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }

    get phone(): string | undefined {
        return this.singularNullable(VCARD.phone, ValueMappings.literalToString)
    }

    set phone(value: string | undefined) {
        this.overwriteNullable(VCARD.phone, value, TermMappings.stringToLiteral)
    }

    get email(): string | undefined {
        return this.singularNullable(VCARD.email, ValueMappings.literalToString)
    }

    set email(value: string | undefined) {
        this.overwriteNullable(VCARD.email, value, TermMappings.stringToLiteral)
    }


    get webId(): string | undefined {
        return this.singularNullable(OWL.sameAs, ValueMappings.iriToString)
    }

    set webId(value: string | undefined) {
        if (!value) return
        this.overwriteNullable(OWL.sameAs, value, TermMappings.stringToIri)
    }
}

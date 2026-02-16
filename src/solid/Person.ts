import { TermWrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { VCARD, OWL } from "../vocabulary/mod.js"
import { rdf } from "rdf-namespaces" 

export class Person extends TermWrapper {

    constructor(term: any, dataset: any, factory?: any) {
        super(term, dataset, factory)
        if (!dataset.has(term, rdf.type, VCARD.Individual)) {
            throw new Error(`Node ${term.value} is not a vcard:Individual`)
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

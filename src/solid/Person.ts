import { TermWrapper, ValueMappings, TermMappings } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { rdf } from "rdf-namespaces" // or define RDF.type yourself

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
        if (!value) throw new Error("Individual name cannot be empty")
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }



    get webId(): string | undefined {
        return this.singularNullable(VCARD.hasURL, ValueMappings.iriToString)
    }

    set webId(value: string | undefined) {
        if (!value) return
        this.overwriteNullable(VCARD.hasURL, value, TermMappings.stringToIri)
    }
}

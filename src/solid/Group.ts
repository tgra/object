import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"

export class Group extends TermWrapper {
    get name(): string | undefined {
        const value = this.singularNullable(VCARD.fn, ValueMappings.literalToString)

        if (!value) {
            throw new Error("Group must have a vcard:fn (name)")
        }
        return value
    }

    set name(value: string | undefined) {
        if (!value) {
            throw new Error("Group name cannot be empty")
        }
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }

    get members(): Set<Person> {
        const individuals = new Set<Person>()

        for (const iri of this.objects(VCARD.member, ValueMappings.iriToString, TermMappings.stringToIri)) {
            const individual = new Person(iri, this.dataset, this.factory)
            individuals.add(individual)
        }
        return individuals
    }

}

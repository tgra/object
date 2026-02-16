import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"

export class Group extends TermWrapper {
    
    get name(): string | undefined {
        const value = this.singularNullable(VCARD.fn, ValueMappings.literalToString)

        return value
    }

    set name(value: string | undefined) {
        if (!value) {
            throw new Error("Group name cannot be empty")
        }
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }

    get members(): Set<Person> {
        const persons = new Set<Person>()

        for (const iri of this.objects(VCARD.member, ValueMappings.iriToString, TermMappings.stringToIri)) {
            const person = new Person(iri, this.dataset, this.factory)
            persons.add(person)
        }
        return persons
    }

    /** Add a new Person to this group */
    addMember(person: Person) {
        // Convert Person term to string IRI
        const iri = person.term.value

        // Use objects() to get the live set and add the new member
        const membersSet = this.objects(
            VCARD.member,
            ValueMappings.iriToString,
            TermMappings.stringToIri
        )
        membersSet.add(iri)
    }

    /** Remove a Person from this group */
    deleteMember(person: Person) {
        const iri = person.term.value

        const membersSet = this.objects(
            VCARD.member,
            ValueMappings.iriToString,
            TermMappings.stringToIri
        )
        membersSet.delete(iri)
    }
}

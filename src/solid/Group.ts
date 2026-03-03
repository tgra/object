import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"

export class Group extends TermWrapper {
    
    get name(): string | undefined {
        return this.singularNullable(VCARD.fn, ValueMappings.literalToString)
    }

    set name(value: string | undefined) {
        if (!value) {
            throw new Error("Group name cannot be empty")
        }
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }

    get members(): Set<Person> {
        return this.objects(VCARD.member, ObjectMapping.as(Person), ObjectMapping.as(Person))
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

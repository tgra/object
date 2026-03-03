import { TermMappings, ValueMappings, TermWrapper, ObjectMapping } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"

export class Group extends TermWrapper {
    get name(): string | undefined {
        return this.singularNullable(VCARD.fn, ValueMappings.literalToString)
    }

    set name(value: string | undefined) {
        this.overwriteNullable(VCARD.fn, value, TermMappings.stringToLiteral)
    }

    get members(): Set<Person> {
        return this.objects(VCARD.member, ObjectMapping.as(Person), ObjectMapping.as(Person))
    }
}

import { DatasetWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"

export class PersonDataset extends DatasetWrapper {
    get person(): Iterable<Person> {
        return this.instancesOf(VCARD.Individual, Person)
    }
}

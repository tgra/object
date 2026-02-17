import { DatasetWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Organization } from "./Organization.js"

export class OrganizationDataset extends DatasetWrapper {
    get person(): Iterable<Organization> {
        return this.instancesOf(VCARD.Individual, Organization)
    }
}

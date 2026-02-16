import { DatasetWrapper } from "rdfjs-wrapper"
import { VCARD } from "../vocabulary/mod.js"
import { Group } from "./Group.js"

export class GroupDataset extends DatasetWrapper {
    get group(): Iterable<Group> {
        return this.instancesOf(VCARD.Group, Group)
    }
}

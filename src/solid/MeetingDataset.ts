import { DatasetWrapper } from "rdfjs-wrapper"
import { ICAL } from "../vocabulary/mod.js"
import { Meeting } from "./Meeting.js"

export class MeetingDataset extends DatasetWrapper {
    get meeting(): Iterable<Meeting> {
        return this.instancesOf(ICAL.Vevent, Meeting)
    }
}

import { DatasetWrapper } from "rdfjs-wrapper"
import { FOAF } from "../vocabulary/mod.js"
import { Profile } from "./Profile.js"

export class ProfileDataset extends DatasetWrapper {
    get profile(): Iterable<Profile> {
        return this.instancesOf(FOAF.PersonalProfileDocument, Profile)
    }
}


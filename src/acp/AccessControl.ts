import { TermWrapper } from "rdfjs-wrapper"
import { Policy } from "./Policy.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class AccessControl extends Typed {
    get apply(): Set<Policy> {
        return this.objects(ACP.apply, TermWrapper.as(Policy), TermWrapper.as(Policy))
    }
}

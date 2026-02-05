import { TermMappings, ValueMappings } from "rdfjs-wrapper"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class Matcher extends Typed {
    get agent(): Set<string> {
        return this.objects(ACP.agent, ValueMappings.iriToString, TermMappings.stringToIri)
    }
}

import { TermMappings, ValueMappings, TermWrapper,  DatasetWrapper } from "rdfjs-wrapper"
import {  ICAL } from "../vocabulary/mod.js"

export class Meeting extends TermWrapper {
    get summary(): string | undefined {
        return this.singularNullable(ICAL.summary, ValueMappings.literalToString)
    }

    set summary(value: string | undefined) {
        this.overwriteNullable(ICAL.summary, value, TermMappings.stringToLiteral)
    }

    get location(): string | undefined {
        return this.singularNullable(ICAL.location, ValueMappings.literalToString)
    }

    set location(value: string | undefined) {
        this.overwriteNullable(ICAL.location, value, TermMappings.stringToLiteral)
    }

    get comment(): string | undefined {
        return this.singularNullable(ICAL.comment, ValueMappings.literalToString)
    }

    set comment(value: string | undefined) {
        this.overwriteNullable(ICAL.comment, value, TermMappings.stringToLiteral)
    }

    get startDate(): Date | undefined {
        return this.singularNullable(ICAL.dtstart, ValueMappings.literalToDate)
    }

    set startDate(value: Date | undefined) {
        this.overwriteNullable(ICAL.dtstart, value, TermMappings.dateToLiteral)
    }

    get endDate(): Date | undefined {
        return this.singularNullable(ICAL.dtend, ValueMappings.literalToDate)
    }

    set endDate(value: Date | undefined) {
        this.overwriteNullable(ICAL.dtend, value, TermMappings.dateToLiteral)
    }
}

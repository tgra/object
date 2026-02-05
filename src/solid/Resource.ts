import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { DC, POSIX, RDF, RDFS } from "../vocabulary/mod.js"

// TODO: review implementation of this
export type FileType = "folder" | "file" | "image" | "document" | "other";

export class Resource extends TermWrapper {
    #ianaMediaTypePattern = /^http:\/\/www\.w3\.org\/ns\/iana\/media-types\/(.+)#Resource$/;

    get id(): string {
        return this.term.value
    }

    get isContainer(): boolean {
        return this.id.endsWith("/")
    }

    get fileType(): FileType {
        return this.isContainer ? "folder" : "file"
    }

    get title(): string | undefined {
        return this.singularNullable(DC.title, ValueMappings.literalToString)
    }

    get label(): string | undefined {
        return this.singularNullable(RDFS.label, ValueMappings.literalToString)
    }

    get name(): string {
        return this.title ?? this.label ?? this.extractNameFromUrl(this.id)
    }

    get modified(): Date | undefined {
        return this.singularNullable(DC.modified, ValueMappings.literalToDate)
    }

    get mtime(): Date | undefined {
        return this.singularNullable(POSIX.mtime, ValueMappings.literalToDate)
    }

    get lastModified(): Date | undefined {
        return this.modified ?? this.mtime
    }

    get size(): number | undefined {
        return this.singularNullable(POSIX.size, ValueMappings.literalToNumber)
    }

    get type(): Set<string> {
        return this.objects(RDF.type, ValueMappings.iriToString, TermMappings.stringToIri)
    }

    get mimeType(): string | undefined {
        const matches = [...this.type]
            .map(t => this.#ianaMediaTypePattern.exec(t))
            .filter(results => results !== null)
            .map(results => results[0])

        for (const match of matches) {
            return match
        }

        return;
    }

    override toString() {
        return this.id
    }

    // TODO: review implementation of this
    private extractNameFromUrl(url: string): string {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split("/").filter(Boolean);
            let name = pathParts[pathParts.length - 1] || urlObj.hostname;

            try {
            name = decodeURIComponent(name);
            } catch (e) {
            // Keep original name if decoding fails
            }

            return name;
        } catch (e) {
            // If URL parsing fails, try to extract from the string directly
            const parts = url.split("/").filter(Boolean);
            const lastPart = parts[parts.length - 1] || url;
            try {
            return decodeURIComponent(lastPart);
            } catch {
            return lastPart;
            }
        }
    }
}

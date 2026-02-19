import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { Organization } from "@solid/object";

describe("Organization tests", () => {

    const sampleRDF = `
@prefix schema: <https://schema.org/> .
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<https://example.org/org/1>
    a schema:Corporation ;
    schema:name "Example Corp" ;
    schema:url <https://example.org> .
`;
    it("should parse name and url", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const org = new Organization(
            "https://example.org/org/1",
            store,
            DataFactory
        )

        assert.equal(org.name, "Example Corp")
        assert.equal(org.url, "https://example.org")
    })

    it("should allow setting name and url", () => {
        const store = new Store()

        const org = new Organization(
            "https://example.org/org/2",
            store,
            DataFactory
        )

        org.name = "New Org"
        org.url = "https://new.org"

        assert.equal(org.name, "New Org")
        assert.equal(org.url, "https://new.org")
    })






})

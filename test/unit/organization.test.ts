import { DataFactory, Parser, Store } from "n3";
import assert from "node:assert";
import { describe, it } from "node:test";

import { Organization } from "@solid/object";
import {VCARD, SCHEMA, RDF} from "../../src/vocabulary/mod"


describe("Organization class tests", () => {
    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix schema: <https://schema.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<https://example.org/org/1> a vcard:Organization ;
    schema:name "Example Corp" ;
    schema:url "https://example.org" ;
    rdf:type schema:Corporation .
`;

    it("should parse Organization properties", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(sampleRDF));

        const org = new Organization("https://example.org/org/1", store);

        assert.strictEqual(org.name, "Example Corp");
        assert.strictEqual(org.url, "https://example.org");
        assert.ok(org.types.has(VCARD.Organization), "Base type should be vcard:Organization");
        assert.ok(org.types.has(SCHEMA.Corporation), "Should include Corporation type");
    });

    it("should allow setting Organization properties", () => {
        const store = new Store();
        const org = new Organization("https://example.org/org/2", store);

        org.name = "New Org";
        org.url = "https://new.org";
        org.addType(SCHEMA.NGO);

        assert.strictEqual(org.name, "New Org");
        assert.strictEqual(org.url, "https://new.org");
        assert.ok(org.types.has(VCARD.Organization));
        assert.ok(org.types.has(SCHEMA.NGO));
    });

    it("should enforce allowed organization types (runtime check)", () => {
        const store = new Store();
        const org = new Organization("https://example.org/org/3", store);

        assert.throws(() => {
            // bypass TS type safety for test
            org.addType("https://schema.org/InvalidType" as any);
        }, /Invalid organization type/);
    });

    it("should handle multiple types correctly", () => {
        const store = new Store();
        const org = new Organization("https://example.org/org/4", store);

        org.addType(SCHEMA.Corporation);
        org.addType(SCHEMA.NGO);

        const typesArray = Array.from(org.types);
        assert.ok(typesArray.includes(VCARD.Organization));
        assert.ok(typesArray.includes(SCHEMA.Corporation));
        assert.ok(typesArray.includes(SCHEMA.NGO));

        // Ensure no duplicates
        const uniqueTypes = new Set(typesArray);
        assert.strictEqual(uniqueTypes.size, typesArray.length);
    });

    it("should allow updating name and url multiple times", () => {
        const store = new Store();
        const org = new Organization("https://example.org/org/5", store);

        org.name = "Org A";
        org.url = "https://orga.org";

        org.name = "Org B";
        org.url = "https://orgb.org";

        assert.strictEqual(org.name, "Org B");
        assert.strictEqual(org.url, "https://orgb.org");
    });

    it("should handle minimal organization (only base type)", () => {
        const store = new Store();
        const org = new Organization("https://example.org/org/minimal", store);

        assert.strictEqual(org.name, undefined);
        assert.strictEqual(org.url, undefined);
        assert.ok(org.types.has(VCARD.Organization));
        assert.strictEqual(org.types.size, 1);
    });
});

import { DataFactory, Parser, Store } from "n3";
import assert from "node:assert";
import { describe, it } from "node:test";
import { Person } from "@solid/object";

describe("Person class tests", () => {
    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

<https://example.org/person/1> a vcard:Individual ;
    vcard:fn "Alice Smith" ;
    vcard:email "alice@example.org" ;
    vcard:phone "+123456789" ;
    owl:sameAs <https://alice.example.org/#me> .
`;

    it("should parse Person properties", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(sampleRDF));

        const person = new Person("https://example.org/person/1", store);

        assert.strictEqual(person.name, "Alice Smith");
        assert.strictEqual(person.email, "alice@example.org");
        assert.strictEqual(person.phone, "+123456789");
        assert.strictEqual(person.webId, "https://alice.example.org/#me");
    });

    it("should allow setting Person properties", () => {
        const store = new Store();
        const person = new Person("https://example.org/person/1", store);

        person.name = "Bob Jones";
        person.email = "bob@example.org";
        person.phone = "+987654321";
        person.webId = "https://bob.example.org/#me";

        assert.strictEqual(person.name, "Bob Jones");
        assert.strictEqual(person.email, "bob@example.org");
        assert.strictEqual(person.phone, "+987654321");
        assert.strictEqual(person.webId, "https://bob.example.org/#me");
    });
});

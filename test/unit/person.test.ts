import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { Person } from "@solid/object";



describe("Person tests", () => {

    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

<https://example.org/person/1>
    a vcard:Individual ;
    vcard:fn "Alice" ;
    vcard:phone "+123456789" ;
    vcard:email "alice@example.org" ;
    owl:sameAs <https://alice.example.org/profile#me> .
`;

    it("should allow setting properties", () => {
        const store = new Store()

        const person = new Person(
            "https://example.org/person/2",
            store,
            DataFactory
        )

        person.name = "Bob"
        person.phone = "+987654321"
        person.email = "bob@example.org"
        person.webId = "https://bob.example.org/profile#me"

        assert.equal(person.name, "Bob")
        assert.equal(person.phone, "+987654321")
        assert.equal(person.email, "bob@example.org")
        assert.equal(person.webId, "https://bob.example.org/profile#me")
    })



})

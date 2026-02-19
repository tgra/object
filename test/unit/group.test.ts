import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"


import { Group, Person } from "@solid/object";



describe("Group tests", () => {

    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/group/1>
    a vcard:Group ;
    vcard:fn "Engineering Team" ;
    vcard:member <https://example.org/person/1> ;
    vcard:member <https://example.org/person/2> .
`;

    it("should parse and retrieve group name", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/1"),
            store,
            DataFactory
        )

        assert.equal(group.name, "Engineering Team")
        assert.equal(typeof group.name, "string")
    })

    it("should allow setting group name", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/1"),
            store,
            DataFactory
        )

        group.name = "Updated Team"

        assert.equal(group.name, "Updated Team")
    })

    it("should throw when setting empty group name", () => {
        const store = new Store()

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/empty"),
            store,
            DataFactory
        )

        assert.throws(() => {
            group.name = undefined as any
        })
    })

    it("should parse members as Person instances", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/1"),
            store,
            DataFactory
        )

        const members = group.members

        assert.ok(members instanceof Set)
        assert.equal(members.size, 2)

        for (const member of members) {
            assert.ok(member instanceof Person)
        }
    })

    it("should add a new member", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/1"),
            store,
            DataFactory
        )

        const newPerson = new Person(
            DataFactory.namedNode("https://example.org/person/3"),
            store,
            DataFactory
        )

        group.addMember(newPerson)

        const members = group.members
        assert.equal(members.size, 3)

        const iris = Array.from(members).map(p => p.term.value)
        assert.ok(iris.includes("https://example.org/person/3"))
    })

    it("should delete a member", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/1"),
            store,
            DataFactory
        )

        const personToRemove = new Person(
            DataFactory.namedNode("https://example.org/person/1"),
            store,
            DataFactory
        )

        group.deleteMember(personToRemove)

        const members = group.members
        assert.equal(members.size, 1)

        const iris = Array.from(members).map(p => p.term.value)
        assert.ok(!iris.includes("https://example.org/person/1"))
    })

    it("should ensure members are unique", () => {
        const duplicateRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/group/dup>
    a vcard:Group ;
    vcard:member <https://example.org/person/1> ;
    vcard:member <https://example.org/person/1> .
`
        const store = new Store()
        store.addQuads(new Parser().parse(duplicateRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/dup"),
            store,
            DataFactory
        )

        const members = group.members

        assert.equal(members.size, 1)
    })

    it("should return empty set if no members exist", () => {
        const emptyRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/group/empty>
    a vcard:Group .
`

        const store = new Store()
        store.addQuads(new Parser().parse(emptyRDF))

        const group = new Group(
            DataFactory.namedNode("https://example.org/group/empty"),
            store,
            DataFactory
        )

        assert.ok(group.members instanceof Set)
        assert.equal(group.members.size, 0)
    })

})

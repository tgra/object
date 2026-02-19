import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { GroupDataset } from "@solid/object"
import { Person } from "@solid/object"


// Sample RDF for an existing group with two members

 /*
const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/group/1> a vcard:Group ;
    vcard:fn "Engineering Team" ;
    vcard:member <https://example.org/person/alice> ;
    vcard:member <https://example.org/person/bob> .
`

describe("GroupDataset / Group tests", () => {

     
    it("should parse a group and retrieve its properties", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const dataset = new GroupDataset(store, DataFactory)
        const groups = Array.from(dataset.group)
        assert.ok(groups.length > 0, "No groups found")

        const group = groups[0]!
        assert.equal(group.name, "Engineering Team")

        const memberIRIs = Array.from(group.members).map((m: Person) => m.term.value)
        assert.ok(memberIRIs.includes("https://example.org/person/alice"))
        assert.ok(memberIRIs.includes("https://example.org/person/bob"))
    })

    
    it("should allow changing group name", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const dataset = new GroupDataset(store, DataFactory)
        const group = Array.from(dataset.group)[0]!

        group.name = "Product Team"
        assert.equal(group.name, "Product Team")
    })

  
    it("should allow adding a new member", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const dataset = new GroupDataset(store, DataFactory)
        const group = Array.from(dataset.group)[0]!

        // Create new person (automatically typed as vcard:Individual)
        const charlie = new Person("https://example.org/person/charlie", store, DataFactory)
        charlie.name = "Charlie"

        group.addMember(charlie)

        const memberNames = Array.from(group.members).map((m: Person) => m.name)
        assert.ok(memberNames.includes("Charlie"))
        assert.ok(memberNames.includes("Alice") || memberNames.includes("Bob"))
    })
    it("should allow removing a member", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const dataset = new GroupDataset(store, DataFactory)
        const group = Array.from(dataset.group)[0]!

        const alice = new Person("https://example.org/person/alice", store, DataFactory)
        group.deleteMember(alice)

        const memberIRIs = Array.from(group.members).map((m: Person) => m.term.value)
        assert.ok(!memberIRIs.includes("https://example.org/person/alice"))
        assert.ok(memberIRIs.includes("https://example.org/person/bob"))
    })

    it("should reflect live changes in the dataset", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const dataset = new GroupDataset(store, DataFactory)
        const group = Array.from(dataset.group)[0]!

        const dave = new Person("https://example.org/person/dave", store, DataFactory)
        group.addMember(dave)

        const bob = new Person("https://example.org/person/bob", store, DataFactory)
        group.deleteMember(bob)

        const memberIRIs = Array.from(group.members).map((m: Person) => m.term.value)
        assert.deepEqual(memberIRIs.sort(), [
            "https://example.org/person/alice",
            "https://example.org/person/dave"
        ])
    })
       
})
 */
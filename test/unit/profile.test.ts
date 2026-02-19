import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Profile } from "@solid/object"
import { Person } from "@solid/object"

describe("Profile tests", () => {

  const sampleRDF = `
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix solid: <http://www.w3.org/ns/solid/terms#> .
@prefix schema: <http://schema.org/> .
@prefix org: <http://www.w3.org/ns/org#> .

<https://example.org/profile#me>
    foaf:nick "alex" ;
    solid:preferredSubjectPronoun "they" ;
    solid:preferredObjectPronoun "them" ;
    solid:preferredRelativePronoun "theirs" ;
    schema:skills <https://example.org/skills/TypeScript> ;
    schema:skills <https://example.org/skills/RDF> ;
    schema:knowsLanguage <https://example.org/lang/en> ;
    schema:knowsLanguage <https://example.org/lang/de> ;
    foaf:account <https://github.com/example> ;
    foaf:account <https://twitter.com/example> ;
    org:member <https://example.org/person/1> .
`;

  it("should parse and retrieve profile properties", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile#me"),
      store,
      DataFactory
    )

    // Singular string properties
    assert.equal(profile.nickname, "alex")
    assert.equal(profile.preferredSubjectPronoun, "they")
    assert.equal(profile.preferredObjectPronoun, "them")
    assert.equal(profile.preferredRelativePronoun, "theirs")

    // Set-based properties
    assert.ok(profile.skills instanceof Set)
    assert.ok(profile.languages instanceof Set)
    assert.ok(profile.accounts instanceof Set)
    assert.ok(profile.roles instanceof Set)

    assert.ok(profile.skills.has("https://example.org/skills/TypeScript"))
    assert.ok(profile.languages.has("https://example.org/lang/en"))
    assert.ok(profile.accounts.has("https://github.com/example"))

    const role = Array.from(profile.roles)[0]
    assert.ok(role instanceof Person)
  })


  it("should allow setting of singular properties", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile#me"),
      store,
      DataFactory
    )

    profile.nickname = "updatedNick"
    profile.preferredSubjectPronoun = "she"
    profile.preferredObjectPronoun = "her"
    profile.preferredRelativePronoun = "hers"

    assert.equal(profile.nickname, "updatedNick")
    assert.equal(profile.preferredSubjectPronoun, "she")
    assert.equal(profile.preferredObjectPronoun, "her")
    assert.equal(profile.preferredRelativePronoun, "hers")
  })


  it("should ensure singular properties are correct type", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile#me"),
      store,
      DataFactory
    )

    assert.equal(typeof profile.nickname, "string")
    assert.equal(typeof profile.preferredSubjectPronoun, "string")
    assert.equal(typeof profile.preferredObjectPronoun, "string")
    assert.equal(typeof profile.preferredRelativePronoun, "string")
  })


  it("should ensure set properties return Sets and not arrays", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile#me"),
      store,
      DataFactory
    )

    assert.ok(profile.skills instanceof Set)
    assert.ok(profile.languages instanceof Set)
    assert.ok(profile.accounts instanceof Set)
    assert.ok(profile.roles instanceof Set)

    assert.ok(!Array.isArray(profile.skills))
    assert.ok(!Array.isArray(profile.languages))
    assert.ok(!Array.isArray(profile.accounts))
    assert.ok(!Array.isArray(profile.roles))
  })


  it("should handle duplicate singular values by exposing only one", () => {
    const duplicateRDF = `
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix solid: <http://www.w3.org/ns/solid/terms#> .

<https://example.org/profile#me>
    foaf:nick "alex" ;
    foaf:nick "duplicateNick" ;
    solid:preferredSubjectPronoun "they" ;
    solid:preferredSubjectPronoun "duplicatePronoun" .
`

    const store = new Store()
    store.addQuads(new Parser().parse(duplicateRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile#me"),
      store,
      DataFactory
    )

    assert.equal(typeof profile.nickname, "string")
    assert.equal(typeof profile.preferredSubjectPronoun, "string")

    assert.ok(!Array.isArray(profile.nickname))
    assert.ok(!Array.isArray(profile.preferredSubjectPronoun))
  })

})

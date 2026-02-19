import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Profile, Person } from "@solid/object";

describe("Profile tests", () => {

  const sampleRDF = `
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix solid: <http://www.w3.org/ns/solid/terms#> .
@prefix schema: <https://schema.org/> .
@prefix org: <http://www.w3.org/ns/org#> .

<https://example.org/profile/1>
    foaf:nick "Ali" ;
    solid:preferredSubjectPronoun "they" ;
    solid:preferredObjectPronoun "them" ;
    solid:preferredRelativePronoun "theirs" ;
    org:member <https://example.org/person/1> ;
    schema:skills <https://example.org/skill/JS> ;
    schema:knowsLanguage <https://example.org/lang/EN> ;
    foaf:account <https://social.example.org/ali> .
`;

  it("should parse nickname and pronouns", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile/1"),
      store,
      DataFactory
    )

    assert.equal(profile.nickname, "Ali")
    assert.equal(profile.preferredSubjectPronoun, "they")
    assert.equal(profile.preferredObjectPronoun, "them")
    assert.equal(profile.preferredRelativePronoun, "theirs")
  })

  it("should allow setting nickname and pronouns", () => {
    const store = new Store()

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile/2"),
      store,
      DataFactory
    )

    profile.nickname = "Sam"
    profile.preferredSubjectPronoun = "he"
    profile.preferredObjectPronoun = "him"
    profile.preferredRelativePronoun = "his"

    assert.equal(profile.nickname, "Sam")
    assert.equal(profile.preferredSubjectPronoun, "he")
    assert.equal(profile.preferredObjectPronoun, "him")
    assert.equal(profile.preferredRelativePronoun, "his")
  })

  it("should parse roles as Person instances", () => {
    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const profile = new Profile(
      DataFactory.namedNode("https://example.org/profile/1"),
      store,
      DataFactory
    )

    const roles = profile.roles

    assert.ok(roles instanceof Set)
    assert.equal(roles.size, 1)

    for (const role of roles) {
      assert.ok(role instanceof Person)
    }
  })

  
})

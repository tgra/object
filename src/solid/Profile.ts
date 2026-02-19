import { TermMappings, ValueMappings, TermWrapper, DatasetWrapper } from "rdfjs-wrapper"
import { FOAF, SOLID, SCHEMA, ORG, VCARD } from "../vocabulary/mod.js"
import { Person } from "./Person.js"


export class Profile extends TermWrapper {

  /* Nickname */
  get nickname(): string | undefined {
    return this.singularNullable(FOAF.nick, ValueMappings.literalToString)
  }
  set nickname(value: string | undefined) {
    this.overwriteNullable(FOAF.nick, value, TermMappings.stringToLiteral)
  }

  /* Pronouns */

  // Preferred pronoun for subject role (he/she/they
  get preferredSubjectPronoun(): string | undefined {
    return this.singularNullable(SOLID.preferredSubjectPronoun, ValueMappings.literalToString)
  }
  set preferredSubjectPronoun(value: string | undefined) {
    this.overwriteNullable(SOLID.preferredSubjectPronoun, value, TermMappings.stringToLiteral)
  }

  // Preferred pronoun for object role (him/her/them)
  get preferredObjectPronoun(): string | undefined {
    return this.singularNullable(SOLID.preferredObjectPronoun, ValueMappings.literalToString)
  }
  set preferredObjectPronoun(value: string | undefined) {
    this.overwriteNullable(SOLID.preferredObjectPronoun, value, TermMappings.stringToLiteral)
  }

  // Preferred relative pronoun (his/hers/theirs)
  get preferredRelativePronoun(): string | undefined {
    return this.singularNullable(SOLID.preferredRelativePronoun, ValueMappings.literalToString)
  }
  set preferredRelativePronoun(value: string | undefined) {
    this.overwriteNullable(SOLID.preferredRelativePronoun, value, TermMappings.stringToLiteral)
  }


  /* Roles / Organization involvement  */

  get roles(): Set<Person> {
    const persons = new Set<Person>()

    for (const iri of this.objects(ORG.member, ValueMappings.iriToString, TermMappings.stringToIri)) {
      const person = new Person(iri, this.dataset, this.factory)
      persons.add(person)
    }
    return persons
  }

  /* Skills */
  get skills(): Set<string> {
    return this.objects(SCHEMA.skills, ValueMappings.iriToString, TermMappings.stringToIri)
  }

  /* Languages */
  get languages(): Set<string> {
    return this.objects(SCHEMA.knowsLanguage, ValueMappings.iriToString, TermMappings.stringToIri)
  }
  
  /* Online/ Social Media Accounts */
  get accounts(): Set<string> {
    return this.objects(FOAF.account, ValueMappings.iriToString, TermMappings.stringToIri)
  }
}

import { TermMappings, ValueMappings, TermWrapper, DatasetWrapper } from "rdfjs-wrapper"
import { FOAF, SOLID, SCHEMA, ORG, VCARD } from "../vocabulary/mod.js"

import { Agent } from "@solid/object"

export class ProfileDataset extends DatasetWrapper {

    get profile(): Iterable<Profile> {
        return this.instancesOf(FOAF.PersonalProfileDocument, Profile)
    }
}

export class Profile extends TermWrapper {

    get primaryTopic(): string | undefined {
        return this.singularNullable(FOAF.primaryTopic, ValueMappings.iriToString )
    }
    set primaryTopic(value: string | undefined) {
        this.overwriteNullable(FOAF.primaryTopic, value, TermMappings.stringToIri)
    }

    get maker(): string | undefined {
        return this.singularNullable(FOAF.maker, ValueMappings.iriToString)
    }
    set maker(value: string | undefined) {
        this.overwriteNullable(FOAF.maker, value, TermMappings.stringToIri)
    }

    /* Nickname */
    get nickname(): string | undefined {
      return this.singularNullable(FOAF.nick, ValueMappings.literalToString)
    }
    set nickname(value: string | undefined) {
      this.overwriteNullable(FOAF.nick, value, TermMappings.stringToLiteral)
    }
  
    /* Pronouns */
    get preferredSubjectPronoun(): string | undefined {
      return this.singularNullable(SOLID.preferredSubjectPronoun, ValueMappings.literalToString)
    }
    set preferredSubjectPronoun(value: string | undefined) {
      this.overwriteNullable(SOLID.preferredSubjectPronoun, value, TermMappings.stringToLiteral)
    }
    get preferredObjectPronoun(): string | undefined {
      return this.singularNullable(SOLID.preferredObjectPronoun, ValueMappings.literalToString)
    }
    set preferredObjectPronoun(value: string | undefined) {
      this.overwriteNullable(SOLID.preferredObjectPronoun, value, TermMappings.stringToLiteral)
    }
    get preferredRelativePronoun(): string | undefined {
      return this.singularNullable(SOLID.preferredRelativePronoun, ValueMappings.literalToString)
    }
    set preferredRelativePronoun(value: string | undefined) {
      this.overwriteNullable(SOLID.preferredRelativePronoun, value, TermMappings.stringToLiteral)
    }
  

    /* Roles (inverse org:member) */

    get roles(): Iterable<Role> {
      return this.objects(ORG.member, Role)
    }
    
  
    /* Skills */
    get skills(): Iterable<Skill> {
      
      return this.objects(SCHEMA.skills, Skill)
    }
  
    /* Languages */
    get languages(): Iterable<Language> {
      return this.objects(SCHEMA.knowsLanguage, Language)
    }
  
    /* Online Accounts */
    get accounts(): Iterable<OnlineAccount> {
      return this.objects(FOAF.account, OnlineAccount)
    }
  }
  

  export class Organization extends TermWrapper {

    get name(): string | undefined {
      return this.singularNullable(SCHEMA.name, ValueMappings.literalToString)
    }
  
    set name(value: string | undefined) {
      this.overwriteNullable(SCHEMA.name, value, TermMappings.stringToLiteral)
    }
  
    get uri(): string | undefined {
      return this.singularNullable(SCHEMA.uri, ValueMappings.iriToString)
    }
  
    set uri(value: string | undefined) {
      this.overwriteNullable(SCHEMA.uri, value, TermMappings.stringToIri)
    }
  
    get publicId(): string | undefined {
      return this.singularNullable(SOLID.publicId, ValueMappings.iriToString)
    }
  
    set publicId(value: string | undefined) {
      this.overwriteNullable(SOLID.publicId, value, TermMappings.stringToIri)
    }
  
  }

  export class Role extends TermWrapper {

    get organization(): Organization | undefined {
      return this.singularNullable(ORG.organization, Organization)
    }
    
    set organization(value: Organization | undefined) {
      this.overwriteNullable(ORG.organization, value)
    }
    
    
  
    /* Role Name */
    get roleName(): string | undefined {
      return this.singularNullable(VCARD.role, ValueMappings.literalToString)
    }
  
    set roleName(value: string | undefined) {
      this.overwriteNullable(VCARD.role, value, TermMappings.stringToLiteral)
    }
  
    /* Occupation */
    get occupation(): Role | undefined {
      return this.singularNullable(ORG.role, Role)
    }
    
    set occupation(value: Role | undefined) {
      this.overwriteNullable(ORG.role, value)
    }
    
  
    /* Start Date */
    get startDate(): Date | undefined {
      return this.singularNullable(SCHEMA.startDate, ValueMappings.literalToDate)
    }
  
    set startDate(value: Date | undefined) {
      this.overwriteNullable(SCHEMA.startDate, value, TermMappings.dateToLiteral)
    }
  
    /* End Date */
    get endDate(): Date | undefined {
      return this.singularNullable(SCHEMA.endDate, ValueMappings.literalToDate)
    }
  
    set endDate(value: Date | undefined) {
      this.overwriteNullable(SCHEMA.endDate, value, TermMappings.dateToLiteral)
    }
  
    /* Description */
    get description(): string | undefined {
      return this.singularNullable(SCHEMA.description, ValueMappings.literalToString)
    }
  
    set description(value: string | undefined) {
      this.overwriteNullable(SCHEMA.description, value, TermMappings.stringToLiteral)
    }
  
  }
  


  export class OnlineAccount extends TermWrapper {

    get accountName(): string | undefined {
      return this.singularNullable(FOAF.accountName, ValueMappings.literalToString)
    }
  
    set accountName(value: string | undefined) {
      this.overwriteNullable(FOAF.accountName, value, TermMappings.stringToLiteral)
    }
  
    get homepage(): string | undefined {
      return this.singularNullable(FOAF.homepage, ValueMappings.iriToString)
    }
  
    set homepage(value: string | undefined) {
      this.overwriteNullable(FOAF.homepage, value, TermMappings.stringToIri)
    }
  
    get icon(): string | undefined {
      return this.singularNullable(FOAF.icon, ValueMappings.literalToString)
    }
  
    set icon(value: string | undefined) {
      this.overwriteNullable(FOAF.icon, value, TermMappings.stringToLiteral)
    }
  
  }
  

export class Skill extends TermWrapper {

  get publicId(): string | undefined {
    return this.singularNullable(SOLID.publicId, ValueMappings.iriToString)
  }

  set publicId(value: string | undefined) {
    this.overwriteNullable(SOLID.publicId, value, TermMappings.stringToIri)
  }

}

export class Language extends TermWrapper {

  get publicId(): string | undefined {
    return this.singularNullable(SOLID.publicId, ValueMappings.iriToString)
  }

  set publicId(value: string | undefined) {
    this.overwriteNullable(SOLID.publicId, value, TermMappings.stringToIri)
  }

}

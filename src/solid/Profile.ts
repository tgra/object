import { TermMappings, ValueMappings, TermWrapper,  DatasetWrapper } from "rdfjs-wrapper"
import {  FOAF } from "../vocabulary/mod.js"
import { URL } from "url"
import { WebIdDataset } from "../mod.js"


export class PersonalProfileDataset extends DatasetWrapper {
    get profile(): Iterable<PersonalProfileDocument> {
        return this.instancesOf(FOAF.PersonalProfileDocument, PersonalProfileDocument)
    }
}

export class PersonalProfileDocument extends TermWrapper {
    get primaryTopic(): WebIdDataset | undefined {
        return this.singularNullable(FOAF.primaryTopic, ValueMappings.iriToString)
    }
    set primaryTopic(value: WebIdDataset | undefined) {
        this.overwriteNullable(FOAF.primaryTopic, value, TermMappings.stringToIri)
    }


    get maker(): WebIdDataset | undefined {

        return this.singularNullable(FOAF.maker, ValueMappings.iriToString)
    }
    set maker(value: WebIdDataset | undefined) {
        this.overwriteNullable(FOAF.maker, value, TermMappings.stringToIri)
    }

}









/*



fields defined in 

https://pdsinterop.org/conventions/profile/

via 

/Users/tanyagray/Documents/code/ODI/task-solid-extract-classes/solid-panes/docs/conventions.md




```turtle
@prefix     ab: <http://www.w3.org/ns/pim/ab#> .
@prefix    acl: <http://www.w3.org/ns/auth/acl#> .
@prefix     dc: <http://purl.org/dc/elements/1.1/> .
@prefix    dct: <http://purl.org/dc/terms/> .
@prefix   flow: <http://www.w3.org/2005/01/wf/flow#> .
@prefix   foaf: <http://xmlns.com/foaf/0.1/> .
@prefix   ical: <http://www.w3.org/2002/12/cal/ical#> .
@prefix    ldp: <http://www.w3.org/ns/ldp#> .
@prefix    mee: <http://www.w3.org/ns/pim/meeting#> .
@prefix    pim: <http://www.w3.org/ns/pim/space#> .
@prefix    rdf: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix   sioc: <http://rdfs.org/sioc/ns#> .
@prefix  solid: <http://www.w3.org/ns/solid/terms#> .
@prefix   stat: <http://www.w3.org/ns/posix/stat#> .
@prefix     ui: <http://www.w3.org/ns/ui#> .
@prefix  vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix    XML: <http://www.w3.org/2001/XMLSchema#> .
```

One of the most important RDF documents on your pod is your profile, which is the document that people get when they dereference your webid. We'll look at that first. After that, we'll look at each of the tools that can be created with the databrowser's + button: Addressbook, Notepad, Chat, LongChat, Meeting, Event, Link, Document, Folder, and Source.

## Profile
(see also [pdsinterop.org's description](https://pdsinterop.org/conventions/profile/))

### Profile document

To add information to your webid profile, you can use the following triples. Suppose your webid is `/profile/card#me`, then your profile document is `/profile/card` (without the `#me`). Add the following triples to it:

```turtle
</profile/card> a                 foaf:PersonalProfileDocument .
</profile/card> foaf:maker        </profile/card#me> .
</profile/card> foaf:primaryTopic </profile/card#me> .
```

### You as a person

Now say your name is "John Doe", then add these triples to your profile document to publish your identity as a person:

```turtle
</profile/card#me> a         foaf:Person .
</profile/card#me> a         schema:Person .
</profile/card#me> foaf:name "John Doe" .
```

### Linking to your pod

Say your pod is at `/pod`, with the LDN inbox at `/pod/inbox/`, to link from your identity to your pod:

```turtle
</profile/card#me> solid:account </pod> .
</profile/card#me> pim:storage   </pod> .
</profile/card#me> ldp:inbox     </pod/inbox/> .
```

### Preferences

To publish some of your generic preferences to apps, use:

```turtle
</profile/card#me> pim:preferencesFile    </settings/prefs.ttl> .
</profile/card#me> solid:publicTypeIndex  </settings/publicTypeIndex.ttl> .
</profile/card#me> solid:privateTypeIndex </settings/privateTypeIndex.ttl> .
```




https://github.com/SolidOS/profile-pane/blob/main/src/ontology/profileForm.ttl


 get location(): string | undefined {
        return this.singularNullable(ICAL.location, ValueMappings.literalToString)
    }

    set location(value: string | undefined) {
        this.overwriteNullable(ICAL.location, value, TermMappings.stringToLiteral)
    }

    get comment(): string | undefined {
        return this.singularNullable(ICAL.comment, ValueMappings.literalToString)
    }

    set comment(value: string | undefined) {
        this.overwriteNullable(ICAL.comment, value, TermMappings.stringToLiteral)
    }

    get startDate(): Date | undefined {
        return this.singularNullable(ICAL.dtstart, ValueMappings.literalToDate)
    }

    set startDate(value: Date | undefined) {
        this.overwriteNullable(ICAL.dtstart, value, TermMappings.dateToLiteral)
    }

    get endDate(): Date | undefined {
        return this.singularNullable(ICAL.dtend, ValueMappings.literalToDate)
    }

    set endDate(value: Date | undefined) {
        this.overwriteNullable(ICAL.dtend, value, TermMappings.dateToLiteral)
    }
*/
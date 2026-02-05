import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"
import { WebIdDataset } from "@solid/object"


describe("Example suite", async () => {
    it("Example test", () => {
        const rdf = `
<https://id.inrupt.com/matthieuodi>
        a       <http://xmlns.com/foaf/0.1/Agent>;
        <http://xmlns.com/foaf/0.1/name> "Matthieu Odi" ;
        <http://www.w3.org/2000/01/rdf-schema#seeAlso>
                <https://storage.inrupt.com/b3c35eeb-6198-45a5-b6bc-052cfd4a671f/profile>;
        <http://www.w3.org/ns/pim/space#storage>
                <https://storage.inrupt.com/b3c35eeb-6198-45a5-b6bc-052cfd4a671f/>;
        <http://www.w3.org/ns/solid/terms#oidcIssuer>
                <https://login.inrupt.com>;
        <http://xmlns.com/foaf/0.1/isPrimaryTopicOf>
                <https://storage.inrupt.com/b3c35eeb-6198-45a5-b6bc-052cfd4a671f/profile> .
`;

        const store = new Store()
        store.addQuads(new Parser().parse(rdf));
        const webid = new WebIdDataset(store, DataFactory)

        assert.equal("https://id.inrupt.com/matthieuodi", webid.mainSubject?.term.value)
        assert.equal("Matthieu Odi", webid.mainSubject?.name)
    })
})

import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { MeetingDataset } from "@solid/object";


describe("MeetingDataset / Meeting tests", () => {

    const sampleRDF = `
@prefix cal: <http://www.w3.org/2002/12/cal/ical#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://example.org/meeting/1> a cal:Vevent ;

    cal:summary "Team Sync" ;
    cal:location "Zoom Room 123" ;
    cal:comment "Discuss project updates" ;
    cal:dtstart "2026-02-09T10:00:00Z"^^xsd:dateTime ;
    cal:dtend "2026-02-09T11:00:00Z"^^xsd:dateTime .
`;

    it("should parse and retrieve meeting properties", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(sampleRDF));

        const dataset = new MeetingDataset(store, DataFactory);
        const meetings = Array.from(dataset.meeting);

        const meeting = meetings[0]; 
        assert.ok(meeting, "No meeting found")

        // Check property types and values

        assert.equal(meeting.summary, "Team Sync");
        assert.equal(meeting.location, "Zoom Room 123");
        assert.equal(meeting.comment, "Discuss project updates");

       
        assert.ok(meeting.startDate instanceof Date);
        assert.ok(meeting.endDate instanceof Date);

        assert.equal(meeting.startDate?.toISOString(), "2026-02-09T10:00:00.000Z");
        assert.equal(meeting.endDate?.toISOString(), "2026-02-09T11:00:00.000Z");
    });



    it("should allow setting of meeting properties", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(sampleRDF));

        const dataset = new MeetingDataset(store, DataFactory);
        const meetings = Array.from(dataset.meeting);

        assert.ok(meetings.length > 0, "No meetings found");
        
        const meeting = Array.from(dataset.meeting)[0]!;

        // Set new values
        meeting.summary = "Updated Meeting";
        meeting.location = "Conference Room A";
        meeting.comment = "New agenda";
        const newStart = new Date("2026-02-09T12:00:00Z");
        const newEnd = new Date("2026-02-09T13:00:00Z");
        meeting.startDate = newStart;
        meeting.endDate = newEnd;

        // Retrieve again
        assert.equal(meeting.summary, "Updated Meeting");
        assert.equal(meeting.location, "Conference Room A");
        assert.equal(meeting.comment, "New agenda");
        assert.equal(meeting.startDate.toISOString(), newStart.toISOString());
        assert.equal(meeting.endDate.toISOString(), newEnd.toISOString());
    });



    it("should ensure all properties are correct type", () => {
        const store = new Store();
        store.addQuads(new Parser().parse(sampleRDF));

        const dataset = new MeetingDataset(store, DataFactory);
        const meeting = Array.from(dataset.meeting)[0];

        assert.ok(meeting, "No meeting found")
     
        // Check property types 

        assert.equal(typeof meeting.summary, "string");
        assert.equal(typeof meeting.location, "string");
        assert.equal(typeof meeting.comment, "string");

        assert.ok(meeting.startDate instanceof Date, "startDate should be a Date");
        assert.ok(meeting.endDate instanceof Date, "endDate should be a Date");
        
    });


    it("should ensure all properties are unique text or date values", () => {

        const duplicateRDF = `
@prefix cal: <http://www.w3.org/2002/12/cal/ical#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://example.org/meeting/1> a cal:Vevent ;
    cal:summary "Team Sync" ;
    cal:summary "Duplicate Summary" ;
    cal:location "Zoom Room 123" ;
    cal:location "Duplicate Location" ;
    cal:comment "Discuss project updates" ;
    cal:comment "Duplicate Comment" ;
    cal:dtstart "2026-02-09T10:00:00Z"^^xsd:dateTime ;
    cal:dtstart "2026-02-09T09:00:00Z"^^xsd:dateTime ;
    cal:dtend "2026-02-09T11:00:00Z"^^xsd:dateTime ;
    cal:dtend "2026-02-09T12:00:00Z"^^xsd:dateTime .
`;

        const store = new Store();
        store.addQuads(new Parser().parse(duplicateRDF));

        const dataset = new MeetingDataset(store, DataFactory);
        const meeting = Array.from(dataset.meeting)[0];

        assert.ok(meeting, "No meeting found");

        // Ensure exposed values are single (unique) and correct type
        assert.equal(typeof meeting.summary, "string");
        assert.equal(typeof meeting.location, "string");
        assert.equal(typeof meeting.comment, "string");

        assert.ok(meeting.startDate instanceof Date);
        assert.ok(meeting.endDate instanceof Date);

        // Ensure no arrays are returned
        assert.ok(!Array.isArray(meeting.summary));
        assert.ok(!Array.isArray(meeting.location));
        assert.ok(!Array.isArray(meeting.comment));
        assert.ok(!Array.isArray(meeting.startDate));
        assert.ok(!Array.isArray(meeting.endDate));
    });



});
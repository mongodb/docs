import loadSpec from 'oasprey';
import axios from 'axios';

const baseURL = "https://status.mongodb.com/";

// Load the OpenAPI spec from URL and pass as object
let spec;
beforeAll(async () => {
    const response = await axios.get("https://www.mongodb.com/docs/api/doc/cloud-status.json");
    spec = loadSpec(response.data);
});

describe("OpenAPI spec to fetch Atlas status should work", () => {
    it("should match the get summary schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/summary.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get status schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/status.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get components schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/components.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get unresolved incidents schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/incidents/unresolved.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get all incidents schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/incidents.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get upcoming scheduled maintenances schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/scheduled-maintenances/upcoming.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get active scheduled maintenances schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/scheduled-maintenances/active.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });

    it("should match the get all scheduled maintenances schema", async () => {
        const res = await axios.get(baseURL + 'api/v2/scheduled-maintenances.json');
        expect(res.status).toEqual(200);
        expect(res).toSatisfyApiSpec();
    });
});

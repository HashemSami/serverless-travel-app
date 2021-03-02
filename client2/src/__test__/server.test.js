import "regenerator-runtime/runtime.js";
import { server } from "../server/index";
import db from "../server/mockDatabase";
const request = require("supertest");

jest.setTimeout(30000);

describe("testing app routes", () => {
  it("should be able to post data to db", async (done) => {
    const d = new Date();
    const timestamp = d.getTime();
    const response = {
      region: "Middle East",
      country: "Saudi Arabia",
      city: "Riyadh",
      date: timestamp,
      countryInfo: { alpha2Code: "SA" },
    };

    await request(server)
      .post("/post-data")
      .send(response)
      .set("Accept", "application/json");

    const res = await request(server).get("/get-data");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(db);
    done();
  });

  it("should be able to get db", async (done) => {
    const res = await request(server).get("/get-data");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(db);
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    server.close();
    done();
  });
});

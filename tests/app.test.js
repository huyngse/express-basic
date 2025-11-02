import mongoose from "mongoose";
import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });
  it("should respond with 200 and a hello message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello world!" });
  });
});

import assert from "power-assert";
import TypedValue from "../src/TypedValue";

describe("TypedValue", () => {
  describe("constructor(type: string, value: any)", () => {
    it("works", () => {
      let value = new TypedValue("int", 10);

      assert(value instanceof TypedValue);
      assert(value.type === "int");
      assert(value.value === 10);
    });
  });
  describe("#is(type: string): boolean", () => {
    it("works", () => {
      assert(new TypedValue("int", 10).is("int") === true);
      assert(new TypedValue("float", 20).is("int") === false);
      assert(new TypedValue("symbol", "30").is("int") === false);

      assert(new TypedValue("int", 10).is("float") === false);
      assert(new TypedValue("float", 20).is("float") === true);
      assert(new TypedValue("symbol", "30").is("float") === false);

      assert(new TypedValue("int", 10).is("symbol") === false);
      assert(new TypedValue("float", 20).is("symbol") === false);
      assert(new TypedValue("symbol", "30").is("symbol") === true);
    });
  });
  describe("#to(type: string): TypedValue", () => {
    it("works", () => {
      assert.deepEqual(new TypedValue("int", 10).to("int"), new TypedValue("int", 10));
      assert.deepEqual(new TypedValue("int", 10).to("float"), new TypedValue("float", 10));
      assert.deepEqual(new TypedValue("int", 10).to("symbol"), new TypedValue("symbol", "10"));
      assert.deepEqual(new TypedValue("int", 10).to("unknown"), new TypedValue("int", 0));

      assert.deepEqual(new TypedValue("float", 20).to("int"), new TypedValue("int", 20));
      assert.deepEqual(new TypedValue("float", 20).to("float"), new TypedValue("float", 20));
      assert.deepEqual(new TypedValue("float", 20).to("symbol"), new TypedValue("symbol", "20.0"));
      assert.deepEqual(new TypedValue("float", 20).to("unknown"), new TypedValue("int", 0));

      assert.deepEqual(new TypedValue("symbol", "30").to("int"), new TypedValue("int", 30));
      assert.deepEqual(new TypedValue("symbol", "30").to("float"), new TypedValue("float", 30));
      assert.deepEqual(new TypedValue("symbol", "30").to("symbol"), new TypedValue("symbol", "30"));
      assert.deepEqual(new TypedValue("symbol", "30").to("unknown"), new TypedValue("int", 0));
    });
  });
  describe("#equals(other: TypedValue): boolean", () => {
    it("works", () => {
      assert(new TypedValue("int", 10).equals({ type: "int", value: 10 }) === true);
      assert(new TypedValue("int", 10).equals({ type: "float", value: 10 }) === true);
      assert(new TypedValue("int", 10).equals({ type: "symbol", value: "10" }) === false);

      assert(new TypedValue("int", 10).equals({ type: "int", value: 20 }) === false);
      assert(new TypedValue("int", 10).equals({ type: "float", value: 20 }) === false);
      assert(new TypedValue("int", 10).equals({ type: "symbol", value: "20" }) === false);
    });
  });
  describe("#toNumber(): number", () => {
    it("works", () => {
      assert(new TypedValue("int", 10).toNumber() === 10);
      assert(new TypedValue("float", 20).toNumber() === 20);
      assert(new TypedValue("symbol", "30").toNumber() === 30);
    });
  });
  describe("#toString()", () => {
    it("works", () => {
      assert(new TypedValue("int", 10).toString() === "10");
      assert(new TypedValue("float", 20).toString() === "20.0");
      assert(new TypedValue("symbol", "30").toString() === "30");
    });
  });
  describe("#valueOf(): any", () => {
    it("works", () => {
      assert(new TypedValue("int", 10).valueOf() === 10);
      assert(new TypedValue("float", 20).valueOf() === 20);
      assert(new TypedValue("symbol", "30").valueOf() === "30");
    });
  });
  describe("#toJSON(): JSON", () => {
    it("works", () => {
      assert.deepEqual(new TypedValue("int", 10).toJSON(), { type: "int", value: 10 });
      assert.deepEqual(new TypedValue("float", 20).toJSON(), { type: "float", value: 20 });
      assert.deepEqual(new TypedValue("symbol", "30").toJSON(), { type: "symbol", value: "30" });
    });
  });
  describe(".from(value: any): TypedValue", () => {
    it("works", () => {
      assert.deepEqual(TypedValue.from(), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(null), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(false), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(true), new TypedValue("int", 1));
      assert.deepEqual(TypedValue.from(10), new TypedValue("float", 10));
      assert.deepEqual(TypedValue.from("10"), new TypedValue("int", 10));
      assert.deepEqual(TypedValue.from("10."), new TypedValue("float", 10));
      assert.deepEqual(TypedValue.from("abcd"), new TypedValue("symbol", "abcd"));
      assert.deepEqual(TypedValue.from('"10"'), new TypedValue("symbol", "10"));
      assert.deepEqual(TypedValue.from("'10'"), new TypedValue("symbol", "'10'"));
      assert.deepEqual(TypedValue.from(() => {}), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(new TypedValue("int", 10)), new TypedValue("int", 10));
    });
  });
});

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
      assert(new TypedValue("bang", "bang").is("bang") === true);
      assert(new TypedValue("int", 10).is("bang") === false);
      assert(new TypedValue("float", 20).is("bang") === false);
      assert(new TypedValue("symbol", "30").is("bang") === false);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).is("bang") === false);
      assert(new TypedValue("bang", "bang").is("int") === false);
      assert(new TypedValue("int", 10).is("int") === true);
      assert(new TypedValue("float", 20).is("int") === false);
      assert(new TypedValue("symbol", "30").is("int") === false);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).is("int") === false);
      assert(new TypedValue("bang", "bang").is("float") === false);
      assert(new TypedValue("int", 10).is("float") === false);
      assert(new TypedValue("float", 20).is("float") === true);
      assert(new TypedValue("symbol", "30").is("float") === false);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).is("float") === false);
      assert(new TypedValue("bang", "bang").is("symbol") === false);
      assert(new TypedValue("int", 10).is("symbol") === false);
      assert(new TypedValue("float", 20).is("symbol") === false);
      assert(new TypedValue("symbol", "30").is("symbol") === true);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).is("symbol") === false);
      assert(new TypedValue("bang", "bang").is("list") === false);
      assert(new TypedValue("int", 10).is("list") === false);
      assert(new TypedValue("float", 20).is("list") === false);
      assert(new TypedValue("symbol", "30").is("list") === false);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).is("list") === true);
    });
  });
  describe("#to(type: string): TypedValue", () => {
    it("works", () => {
      assert.deepEqual(new TypedValue("bang", "bang").to("bang"), new TypedValue("bang", "bang"));
      assert.deepEqual(new TypedValue("bang", "bang").to("int"), new TypedValue("int", 0));
      assert.deepEqual(new TypedValue("bang", "bang").to("float"), new TypedValue("float", 0));
      assert.deepEqual(new TypedValue("bang", "bang").to("symbol"), new TypedValue("symbol", "bang"));
      assert.deepEqual(new TypedValue("bang", "bang").to("list"), new TypedValue("list", [ new TypedValue("bang", "bang") ]));
      assert.deepEqual(new TypedValue("bang", "bang").to("unknown"), new TypedValue("int", 0));
      assert.deepEqual(new TypedValue("int", 10).to("bang"), new TypedValue("bang", "bang"));
      assert.deepEqual(new TypedValue("int", 10).to("int"), new TypedValue("int", 10));
      assert.deepEqual(new TypedValue("int", 10).to("float"), new TypedValue("float", 10));
      assert.deepEqual(new TypedValue("int", 10).to("symbol"), new TypedValue("symbol", "10"));
      assert.deepEqual(new TypedValue("int", 10).to("list"), new TypedValue("list", [ new TypedValue("int", 10) ]));
      assert.deepEqual(new TypedValue("int", 10).to("unknown"), new TypedValue("int", 0));
      assert.deepEqual(new TypedValue("float", 20).to("bang"), new TypedValue("bang", "bang"));
      assert.deepEqual(new TypedValue("float", 20).to("int"), new TypedValue("int", 20));
      assert.deepEqual(new TypedValue("float", 20).to("float"), new TypedValue("float", 20));
      assert.deepEqual(new TypedValue("float", 20).to("list"), new TypedValue("list", [ new TypedValue("float", 20) ]));
      assert.deepEqual(new TypedValue("float", 20).to("symbol"), new TypedValue("symbol", "20"));
      assert.deepEqual(new TypedValue("float", 20).to("unknown"), new TypedValue("int", 0));
      assert.deepEqual(new TypedValue("symbol", "30").to("bang"), new TypedValue("bang", "bang"));
      assert.deepEqual(new TypedValue("symbol", "30").to("int"), new TypedValue("int", 30));
      assert.deepEqual(new TypedValue("symbol", "30").to("float"), new TypedValue("float", 30));
      assert.deepEqual(new TypedValue("symbol", "30").to("symbol"), new TypedValue("symbol", "30"));
      assert.deepEqual(new TypedValue("symbol", "30").to("list"), new TypedValue("list", [ new TypedValue("symbol", "30") ]));
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
      assert(new TypedValue("bang", "bang").toNumber() === 0);
      assert(new TypedValue("int", 10).toNumber() === 10);
      assert(new TypedValue("float", 20).toNumber() === 20);
      assert(new TypedValue("symbol", "30").toNumber() === 30);
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).toNumber() === 40);
    });
  });
  describe("#toString()", () => {
    it("works", () => {
      assert(new TypedValue("bang", "bang").toString() === "bang");
      assert(new TypedValue("int", 10).toString() === "10");
      assert(new TypedValue("float", 20).toString() === "20.");
      assert(new TypedValue("symbol", "30").toString() === "30");
      assert(new TypedValue("list", [ new TypedValue("int", 40 ) ]).toString(), "[ 40 ]");
    });
  });
  describe("#valueOf(): any", () => {
    it("works", () => {
      assert(new TypedValue("bang", "bang").valueOf() === "bang");
      assert(new TypedValue("int", 10).valueOf() === 10);
      assert(new TypedValue("float", 20).valueOf() === 20);
      assert(new TypedValue("symbol", "30").valueOf() === "30");
      assert.deepEqual(new TypedValue("list", [ new TypedValue("int", 40 ) ]).valueOf(), [ 40 ]);
    });
  });
  describe("#toJSON(): JSON", () => {
    it("works", () => {
      assert.deepEqual(new TypedValue("bang", "bang").toJSON(), { type: "bang", value: "bang" });
      assert.deepEqual(new TypedValue("int", 10).toJSON(), { type: "int", value: 10 });
      assert.deepEqual(new TypedValue("float", 20).toJSON(), { type: "float", value: 20 });
      assert.deepEqual(new TypedValue("symbol", "30").toJSON(), { type: "symbol", value: "30" });
      assert.deepEqual(new TypedValue("list", [ new TypedValue("int", 40 ) ]).toJSON(), { type: "list", value: [ { type: "int", value: 40 } ]});
    });
  });
  describe(".from(value: any): TypedValue", () => {
    it("works", () => {
      assert.deepEqual(TypedValue.from(), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(null), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(false), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(true), new TypedValue("int", 1));
      assert.deepEqual(TypedValue.from(10), new TypedValue("float", 10));
      assert.deepEqual(TypedValue.from("bang"), new TypedValue("bang", "bang"));
      assert.deepEqual(TypedValue.from("10"), new TypedValue("int", 10));
      assert.deepEqual(TypedValue.from("10."), new TypedValue("float", 10));
      assert.deepEqual(TypedValue.from('"10"'), new TypedValue("symbol", "10"));
      assert.deepEqual(TypedValue.from("'10'"), new TypedValue("symbol", "'10'"));
      assert.deepEqual(TypedValue.from([ 1, 2, 3 ]), new TypedValue("list", [ 1, 2, 3 ].map(TypedValue.from)));
      assert.deepEqual(TypedValue.from(() => {}), new TypedValue("int", 0));
      assert.deepEqual(TypedValue.from(new TypedValue("int", 10)), new TypedValue("int", 10));
    });
  });
});

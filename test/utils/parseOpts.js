import assert from "power-assert";
import parseOpts from "../../src/utils/parseOpts";
import { $i, $f, $s } from "../../src/TypedValue";

describe("utils", () => {
  describe("parseOpts(_opts: object): object", () => {
    it("works: button", () => {
      let _opts = {
        "id": "obj-42",
        "maxclass": "button",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": [ "bang" ],
        "patching_rect": [ 492, 188, 24, 24 ],
        "presentation_rect": [ 492, 188, 24, 24 ],
        "style": ""
      };

      let opts = parseOpts(_opts);

      assert(opts.id === "obj-42");
      assert(opts.tagName === "button");
      assert.deepEqual(opts.args, []);
      assert.deepEqual(opts.attrs, {});
      assert(opts.numOfInlets === 1);
      assert(opts.numOfOutlets === 1);
      assert.deepEqual(opts.outletTypes, [ "bang" ]);
      assert.deepEqual(opts.patchingRect, [ 492, 188, 24, 24 ]);
    });
    it("works: 'resize'", () => {
      let _opts = {
        "fontname": "Arial",
        "fontsize": 12,
        "id": "obj-4",
        "maxclass": "message",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": [ "" ],
        "patching_rect": [ 235, 285, 43, 18 ],
        "style": "",
        "text": "resize"
      };
      let opts = parseOpts(_opts);

      assert(opts.id === "obj-4");
      assert(opts.tagName === "message");
      assert.deepEqual(opts.args, []);
      assert.deepEqual(opts.attrs, {});
      assert(opts.numOfInlets === 2);
      assert(opts.numOfOutlets === 1);
      assert.deepEqual(opts.outletTypes, [ "" ]);
      assert.deepEqual(opts.patchingRect, [ 235, 285, 43, 18 ]);
    });
    it("works: abs 0.", () => {
      let _opts = {
        "fontname": "Arial",
        "fontsize": 13,
        "id": "obj-11",
        "maxclass": "newobj",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": [ "float" ],
        "patching_rect": [ 225, 310, 47, 23 ],
        "style": "",
        "text": "abs 0."
      };

      let opts = parseOpts(_opts);

      assert(opts.id === "obj-11");
      assert(opts.tagName === "abs");
      assert.deepEqual(opts.args, [ $f(0) ]);
      assert.deepEqual(opts.attrs, {});
      assert(opts.numOfInlets === 1);
      assert(opts.numOfOutlets === 1);
      assert.deepEqual(opts.outletTypes, [ "float" ]);
      assert.deepEqual(opts.patchingRect, [ 225, 310, 47, 23 ]);
    });
    it("works: plot~", () => {
      let _opts = {
        "id": "obj-10",
        "margins": [ 1, 0, 1, 0 ],
        "maxclass": "plot~",
        "numinlets": 1,
        "numoutlets": 1,
        "numpoints": 441,
        "outlettype": [ "" ],
        "patching_rect": [ 120, 270, 238, 135 ],
        "subplots": [
          {
            "color": [ 0.4, 0.4, 0.75, 1 ],
            "thickness": 1.2,
            "point_style": "none",
            "line_style": "lines",
            "number_style": "none",
            "filter": "none",
            "domain_start": 0,
            "domain_end": 1,
            "domain_style": "linear",
            "domain_markers": [ 0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1 ],
            "domain_labels": [],
            "range_start": -1,
            "range_end": 1,
            "range_style": "linear",
            "range_markers": [ -0.5, 0, 0.5 ],
            "range_labels": [],
            "origin_x": 0,
            "origin_y": 0
          }
        ]
      };

      let opts = parseOpts(_opts);

      assert(opts.id === "obj-10");
      assert(opts.tagName === "plot~");
      assert.deepEqual(opts.args, []);
      assert.deepEqual(opts.attrs, {});
      assert(opts.numOfInlets === 1);
      assert(opts.numOfOutlets === 1);
      assert.deepEqual(opts.outletTypes, [ "" ]);
      assert.deepEqual(opts.patchingRect, [ 120, 270, 238, 135 ]);
    });
    it("works: jit.matrix 4 char 320 240 @srcdimstart 320 0 @srcdimend 0 240", () => {
      let _opts = {
        "color": [ 0.7, 0.7, 0.7, 1 ],
        "fontname": "Arial",
        "fontsize": 11.595187,
        "id": "obj-4",
        "linecount": 3,
        "maxclass": "newobj",
        "numinlets": 1,
        "numoutlets": 2,
        "outlettype": [ "jit_matrix", "" ],
        "patching_rect": [ 210, 455, 143, 47 ],
        "style": "",
        "text": "jit.matrix 4 char 320 240 @srcdimstart 320 0 @srcdimend 0 240"
      };

      let opts = parseOpts(_opts);

      assert(opts.id === "obj-4");
      assert(opts.tagName === "jit.matrix");
      assert.deepEqual(opts.args, [ $i(4), $s("char"), $i(320), $i(240) ]);
      assert.deepEqual(opts.attrs, {
        srcdimstart: [ $i(320), $i(0) ],
        srcdimend: [ $i(0), $i(240) ]
      });
      assert(opts.numOfInlets === 1);
      assert(opts.numOfOutlets === 2);
      assert.deepEqual(opts.outletTypes, [ "jit_matrix", "" ]);
      assert.deepEqual(opts.patchingRect, [ 210, 455, 143, 47 ]);
    });
  });
});

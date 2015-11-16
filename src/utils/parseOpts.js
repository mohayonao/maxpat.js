import parseText from "./parseText";

function createOpts(maxclass, text) {
  if (maxclass === "newobj") {
    return parseText(text);
  }
  return { tagName: maxclass, args: [], attrs: {} };
}

export default function parseOpts(_opts) {
  let opts = createOpts(_opts.maxclass, _opts.text);

  opts.id = _opts.id;
  opts.numOfInlets = _opts.numinlets|0;
  opts.numOfOutlets = _opts.numoutlets|0;
  opts.outletTypes = _opts.outlettype || [];
  opts.patchingRect = _opts.patching_rect;

  return opts;
}

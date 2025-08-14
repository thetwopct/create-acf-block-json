#!/usr/bin/env node

const pkg = require("../package.json");

const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
    console.log(pkg.version);
    process.exit(0);
}

const create = require("../lib/create-acf-block-json");

create.acfBlock();

#!/usr/bin/env node
const {connectDB} = require("./db");
require("./commands");

async function main() {
    await connectDB();
}

main();
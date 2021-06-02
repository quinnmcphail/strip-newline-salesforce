#!/usr/bin/env node

import * as arg from "arg";
import { readFileSync, writeFileSync } from "fs";
import * as Vinyl from "vinyl";
import { removeNewlineFromFile } from ".";

const args = arg({});
const files = args._;

for (let i = 0; i < files.length; i++) {
  const content = readFileSync(files[i]);
  const file = new Vinyl({
    contents: content,
  });
  removeNewlineFromFile(file);
  if (file.contents) {
    writeFileSync(files[i], file.contents.toString());
  } else {
    writeFileSync(files[i], "");
  }
}

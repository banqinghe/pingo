#!/usr/bin/env node
'use strict';

import kleur from 'kleur';
import { appendDirPath } from '../storage.mjs';

export async function pin() {
  const args = process.argv.slice(2).filter(Boolean);

  if (!args.length) {
    const cwd = process.cwd();
    appendDirPath(cwd);
  }

  for (const path of args) {
    const done = await appendDirPath(path);
    if (!done) {
      console.error(`${kleur.bold().red('Invalid path')}: ${path}`);
    }
  }
}

pin();

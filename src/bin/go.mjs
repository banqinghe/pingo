#!/usr/bin/env node
'use strict';

import { basename } from 'path';
import kleur from 'kleur';
import prompts from 'prompts';
import { loadStorage, updateLatestPath } from '../storage.mjs';

export async function go() {
  const args = process.argv.slice(2).filter(Boolean);
  const pinPaths = await loadStorage();

  const choicePaths = [];

  if (args.length) {
    const userReg = new RegExp(`.*${args.join('.*')}.*`, 'i');
    for (const path of pinPaths) {
      if (userReg.test(path)) {
        choicePaths.push(path);
      }
    }
    if (!choicePaths.length) {
      console.error(kleur.bold('No matched path'));
      return;
    }
    if (choicePaths.length === 1) {
      updateLatestPath(choicePaths[0]);
      return;
    }
  }

  const { target } = await prompts({
    type: 'autocomplete',
    name: 'target',
    message: 'directory to go',
    choices: (choicePaths.length ? choicePaths : pinPaths).map(path => ({
      title: basename(path),
      value: path,
      description: path,
    })),
  });

  updateLatestPath(target);
}

go();

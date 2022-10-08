import { existsSync, promises as fs } from 'fs';
import { join, resolve } from 'path';

const home =
  process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;

const storageDir = join(home, '.pingo');
const storagePath = join(storageDir, '_storage.json');

const tmpStoragePath = join(storageDir, 'last_path.txt');

export async function loadStorage() {
  return existsSync(storagePath)
    ? JSON.parse((await fs.readFile(storagePath, 'utf-8')) || '[]') || []
    : [];
}

export async function appendDirPath(path) {
  const absPath = resolve(path);
  if (!existsSync(join(absPath, '/'))) {
    return false;
  }

  if (!existsSync(storageDir)) {
    await fs.mkdir(storageDir, { recursive: true });
  }

  const prevStorage = await loadStorage();
  const nextStorage = [...prevStorage, absPath];
  await fs.writeFile(storagePath, JSON.stringify(nextStorage), 'utf-8');

  return true;
}

export async function updateLatestPath(path) {
  await fs.writeFile(tmpStoragePath, path || '.', 'utf-8');
}

import { defineBuildConfig } from 'unbuild';
import fg from 'fast-glob';

export default defineBuildConfig({
  entries: [...fg.sync('src/bin/*.js').map(i => i.slice(0, -3))],
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});

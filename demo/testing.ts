import { generateChangelog } from '../src';
import { version } from '../package.json';

generateChangelog(
  (changelog: string) => {
    console.log(changelog);
  },
  version
);

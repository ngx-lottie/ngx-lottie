import { join } from 'path';
import { existsSync, createReadStream, createWriteStream } from 'fs';
import * as colors from 'colors/safe';

import { name } from '../package.json';

function copyReadmeAfterSuccessfulBuild(): void {
  const path = join(__dirname, '../README.md');
  const noReadme = !existsSync(path);

  if (noReadme) {
    return console.log(colors.yellow(`README.md doesn't exist on the root level!`));
  }

  createReadStream(path)
    .pipe(createWriteStream(join(__dirname, `../dist/${name}/README.md`)))
    .on('finish', () => {
      console.log(colors.green(`Successfully copied README.md into dist/${name} folder!`));
    });
}

copyReadmeAfterSuccessfulBuild();

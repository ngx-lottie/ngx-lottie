import { ngPackagr } from 'ng-packagr';
import { join } from 'path';

async function buildPackage(): Promise<void> {
  try {
    await ngPackagr()
      .forProject(join(__dirname, '../src/package.json'))
      .withTsConfig(join(__dirname, '../src/tsconfig.lib.json'))
      .build();
  } catch (e) {
    console.log(e);
  }
}

buildPackage();

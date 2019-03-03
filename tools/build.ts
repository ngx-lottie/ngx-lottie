import { ngPackagr } from 'ng-packagr';
import { join } from 'path';

async function buildPackage(): Promise<void> {
  try {
    await ngPackagr()
      .forProject(join(__dirname, '../lottie/package.json'))
      .withTsConfig(join(__dirname, '../lottie/tsconfig.lib.json'))
      .build();
  } catch (e) {
    console.log(e);
  }
}

buildPackage();

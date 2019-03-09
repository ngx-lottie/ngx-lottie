import { ngPackagr } from 'ng-packagr';
import { join } from 'path';

const lottiePath = join(__dirname, '../src/lottie');

async function buildPackage(): Promise<void> {
  try {
    await ngPackagr()
      .forProject(join(lottiePath, 'package.json'))
      .withTsConfig(join(lottiePath, 'tsconfig.lib.json'))
      .build();
  } catch (e) {
    console.log(e);
  }
}

buildPackage();

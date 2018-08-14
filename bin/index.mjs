import program from 'commander';
import path from 'path';
import packageJson from './../package.json';

import { deploy } from './../lib/s3-deploy';

program.version(packageJson.version);

program
  .command('deploy [targetDir]')
  .description('start deploy')
  .action((dir = 'dist') => {
    deploy(path.resolve(dir));
  });

program.parse(process.argv);

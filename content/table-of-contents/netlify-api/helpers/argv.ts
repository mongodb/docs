import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const tableOfContentApiOptions = yargs(hideBin(process.argv))
  .option('branch', {
    alias: 'b',
    type: 'string',
    demandOption: true,
    describe: 'Assigns which branch to use to point the build webhook to.',
  })
  .option('all-prod', {
    alias: 'ap',
    type: 'boolean',
    default: false,
    describe: 'Triggers a deploy all for prod sites',
  })
  .option('all-predprod', {
    alias: 'aprd',
    type: 'boolean',
    default: false,
    describe: 'Triggers a deploy all for predprod sites',
  })
  .help()
  .alias('help', 'h').argv;

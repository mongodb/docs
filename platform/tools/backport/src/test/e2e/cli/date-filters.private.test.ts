import { getDevAccessToken } from '../../private/getDevAccessToken';
import { runBackportViaCli } from './runBackportViaCli';

const accessToken = getDevAccessToken();
jest.setTimeout(15_000);

describe('date filters (dateSince, dateUntil)', () => {
  it(`filters commits by "since" and "until"`, async () => {
    const { output } = await runBackportViaCli(
      [
        '--branch=7.x',
        '--repo=backport-org/backport-e2e',
        `--accessToken=${accessToken}`,
        '--since=2020-08-15T10:00:00.000Z',
        '--until=2020-08-15T10:30:00.000Z',
      ],
      { waitForString: 'Select commit' },
    );

    expect(output).toMatchInlineSnapshot(`
"repo: backport-org/backport-e2e 🔹 sourceBranch: master 🔹 author: sorenlouv 🔹 since: 2020-08-15T10:00:00.000Z 🔹 until: 2020-08-15T10:30:00.000Z

? Select commit (Use arrow keys)
❯ 1. Bump to 8.0.0  
  2. Add package.json  
  3. Update .backportrc.json  
  4. Create .backportrc.json"
`);
  });

  it('combined with --pr-filter', async () => {
    const options = [
      '--branch=7.x',
      '--repo=elastic/kibana',
      `--accessToken=${accessToken}`,
      '--since=2023-09-01',
      '--until=2023-10-01',
    ];

    const { output: outputWithoutPrFilter } = await runBackportViaCli(options, {
      waitForString: 'Select commit',
    });

    expect(outputWithoutPrFilter).toMatchInlineSnapshot(`
"repo: elastic/kibana 🔹 sourceBranch: main 🔹 author: sorenlouv 🔹 autoMerge: true 🔹 since: 2023-09-01T00:00:00.000Z 🔹 until: 2023-10-01T00:00:00.000Z

? Select commit (Use arrow keys)
❯ 1. [APM] Add support for versioned APIs in diagnostics tool (#167050)  
  2. [APM] Add permissions for "input-only" package (#166234)  
  3. [APM] Add docs for Serverless API tests (#166147)  
  4. [APM] Paginate big traces (#165584) 8.10 
  5. [APM] Move index settings persistence to data access plugn (#165560)"
`);

    const { output: outputWithPrFilter } = await runBackportViaCli(
      [...options, `--pr-filter="label:release_note:fix"`],
      { waitForString: 'Select commit' },
    );

    expect(outputWithPrFilter).toMatchInlineSnapshot(`
"repo: elastic/kibana 🔹 sourceBranch: main 🔹 author: sorenlouv 🔹 autoMerge: true 🔹 since: 2023-09-01T00:00:00.000Z 🔹 until: 2023-10-01T00:00:00.000Z

? Select commit (Use arrow keys)
❯ 1. [APM] Paginate big traces (#165584) 8.10"
`);
  });
});

import nock from 'nock';
import { addAssigneesToPullRequest } from './addAssigneesToPullRequest';

describe('addAssigneesToPullRequest', () => {
  it('should add assignees to PR', async () => {
    const pullNumber = 216;
    const assignees = ['sorenlouv'];

    const scope = nock('https://api.github.com')
      .post('/repos/elastic/kibana/issues/216/assignees', {
        assignees: ['sorenlouv'],
      })
      .reply(200, 'some response');

    const res = await addAssigneesToPullRequest({
      repoName: 'kibana',
      repoOwner: 'elastic',
      accessToken: 'my-token',
      autoAssign: false,
      interactive: false,
      pullNumber,
      assignees,
    });

    expect(res).toBe(undefined);
    scope.done();
    nock.cleanAll();
  });
});

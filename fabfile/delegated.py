from fabric.api import task, puts, abort, env, hide
from git import GitRepoManager
import os.path
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../bin/')))

from utils import log_command_output, ingest_yaml, get_branch

b = 'delegated-builder'

def build_branch(logfile, branch='master', target='publish', wait=False):
    puts('[{0}]: building {1} check {2} for build log.'.format(b, branch, logfile))

    if wait is True:
        puts('[{0}]: building now, waiting for the build to finish.'.format(b))

    cmd = ['make', target]
    with open(logfile, 'a') as f:
        f.write('[{0}]: --- logging {1} -- {1} ---\n'.format(b, branch, ' '.join(cmd)))

    log_command_output(cmd, env.repo.path, logfile, wait)

    if wait is False:
        puts('[{0}]: build in progress.'.format(b))


env.logfile = 'build/docs-staging-delegated.log'
env.builders = ['publish', 'push', 'stage', 'json-output']
env.builders.extend(ingest_yaml(os.path.join(os.path.dirname(__file__), '../bin/makecloth/data/sphinx.yaml'))['builders'])
env.branch = get_branch()
env.wait = False
env.repo = GitRepoManager()
env.repo.b = b

@task
def wait():
    env.wait = True

@task
def log(logfile):
    env.logfile = logfile

@task
def branch(branch):
    if branch in env.repo.branches:
        env.branch = branch
    else:
        abort(branch + ' is not in list of buildable branches.')

@task
def build(builder='publish'):
    if builder not in env.builders:
        pass
    else:
        with hide('running'):
            env.repo.set_branch(env.branch)
            env.repo.set_path(env.repo.delegated_path)
            env.repo.update_repo(logfile=env.logfile, branch=env.branch)

        build_branch(logfile=env.logfile, branch=env.branch, target=builder, wait=env.wait)

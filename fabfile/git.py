from fabric.api import lcd, local, task, abort, env, hide
from fabric.utils import puts
import os.path
import sys
import re
import subprocess

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../bin/')))
import docs_meta
from utils import get_branch

env.sign = False
env.branch = None

@task(alias='signoff')
def sign():
    env.sign = True

@task(alias='am')
def apply(obj,repo=None):
    if repo is None:
        repo = docs_meta.GIT_REMOTE['upstream']

    cmd = ['curl',
           'https://github.com/{0}/'.format(repo),
           '|', 'git', 'am',
           '--signoff --3way' if env.sign else '--3way' ]

    if obj.startswith('http'):
        cmd[1] = obj
        if not obj.endswith('.patch'):
            cmd[1] += '.patch'
        local(' '.join(cmd))
    elif re.search('[a-zA-Z]+', obj):
        cmd[1] = cmd[1] + 'commit/' + obj + '.patch'

        local(' '.join(cmd))
        puts('[git]: merged commit {0} for {1} into {2}'.format(obj, repo, docs_meta.get_branch()))
    else:
        cmd[1] = cmd[1] + 'pull/' + obj + '.patch'

        local(' '.join(cmd))
        puts('[git]: merged pull request #{0} for {1} into {2}'.format(obj, repo, docs_meta.get_branch()))

@task()
def branch(branch):
    with hide('running'):
        branches = local("git for-each-ref  refs/heads/ --format='%(refname:short)'", capture=True).split()

        if branch not in branches:
            abort('{0} is not a local git branch'.foramt(branch))
        else:
            env.branch = branch

@task(aliases=['cp', 'cherry-pick'])
def cherrypick(*obj):
    with hide('running'):
        if env.branch is not None:
            local('git checkout {0}'.format(env.branch))

        for commit in [ o for o in obj ]:
            local('git cherry-pick {0}'.format(commit))

        if env.branch is not None:
            local('git checkout -')

## The GitRepoManager class is used to interface with git repositories for the
## purpose of the delegated build system, that builds output from a checkout of
## the local repository with a different set of working files, so that
## multi-branch local builds need not overlap with the current work. See
## fabfile/delegated.py for the delegated builder.

class GitRepoManager(object):
    def __init__(self, path=None, branch='master'):
        self.delegated_path = os.path.join(os.getcwd(), 'build/.docs-staging')
        self.delegated_build_path = os.path.join(self.delegated_path, 'build')
        self.b = 'git'

        self.current_branch = get_branch(os.getcwd())
        self.branch = self.current_branch

        self.branches = set()
        self.branches.add(self.current_branch)
        for branch in docs_meta.PUBLISHED_BRANCHES:
            if branch is not None:
                self.branches.add(branch)

        self.set_branch(branch)

        self.path = None
        self.set_path(path)

    def set_branch(self, branch='master'):
        if branch is None or branch == self.branch:
            pass
        elif branch != self.branch:
            self.branch = branch
        else:
            branch = os.getcwd()
            self.branch = branch

        if self.branch not in self.branches:
            if self.branch is not None:
                self.branches.add(self.branch)

    def set_path(self, path=None):
        if path is None or path == self.path:
            pass
        elif path != self.path:
            self.path = path
        else:
            path = os.getcwd()
            self.path = path

    def change_branch(self, branch=None):
        if branch == None:
            pass
        else:
            self.set_branch(branch)
            puts('[{0}]: changing branch in {1} to "{2}"'.format(self.b, self.path, self.branch))

            with lcd(self.path):
                local('git checkout {0}'.format(str(self.branch)))

            puts('[{0}]: checked out branch: {1} in staging.'.format(self.b, self.branch))

    @staticmethod
    def get_branches(path):
        with lcd(path):
            o = local('ls .git/refs/heads', capture=True)

        return o.stdout.split()

    def branch_cleanup(self, path=None):
        self.set_path(path)
        puts('[{0}]: doing branch cleanup in {1}'.format(self.b, self.path))

        for branch in self.branches:
            if branch not in self.get_branches(self.path):
                self.create_branch(branch)

        for branch in self.get_branches(self.path):
            if branch != self.branch and branch not in self.branches:
                self.remove_branch(branch)

    def remove_branch(self, branch):
        with lcd(self.path):
            local('git branch -D {0}'.format(branch))

        puts('[{0}]: cleaned up stale branch: {1}'.format(self.b, branch))

    def create_branch(self, branch):
        with lcd(self.path):
            local('git branch {0} origin/{0}'.format(branch))

        puts('[{0}]: created {1} branch in repo {2}'.format(self.b, branch, self.path))

    def clone_repo(self, source, location):
        local('git clone {0} {1}'.format(source, location))
        puts('[{0}]: created a clone of "{1}" repo in "{1}".'.format(self.b, source, location))
        self.set_path(location)

    def fetch(self, remote='origin'):
        with lcd(self.path):
            local('git fetch {0}'.format(remote))

    def reset(self, remote='origin'):
        with lcd(self.path):
            local('git reset --hard')
            local('git checkout {0}'.format(self.branch))
            local('git reset --hard {0}'.format('/'.join([remote, self.branch])))

    def reset_working_copy(self):
        self.fetch()
        self.reset()

    def create_staging_build_path(self):
        if os.path.exists(self.delegated_build_path):
            if os.path.islink(self.delegated_build_path):
                pass
            elif os.path.isdir(self.delegated_build_path):
                abort("[{0}]: ERROR: the path '{1}' is a directory, you probably want to remove it and try again.".format(self.b, self.delegated_build_path))
            else:
                abort("[{0}]: ERROR: check '{1}' and try again.".format(self.b, self.delegated_build_path))
        else:
            old_path = os.getcwd()
            os.chdir(os.path.join(old_path, self.delegated_path))
            os.symlink('../../build', 'build')
            os.chdir(old_path)
            puts('[{0}] created "{1}" symlink.'.format(self.b, self.delegated_build_path))

    def update_repo(self, logfile=None, branch='master'):
        self.set_branch(branch)

        if self.path is None or not os.path.isdir(self.path):
            self.clone_repo('./', 'build/.docs-staging')
        else:
            with hide('running', 'stdout', 'stderr'):
                self.reset_working_copy()
            puts('[{0}]: updated staging.'.format(self.b))

        self.create_staging_build_path()

        puts('[{0}]: regenerated buildsystem'.format(self.b))

        with hide('running', 'stdout', 'stderr'):
            self.branch_cleanup(self.path)
            self.change_branch(branch)

from fabric.api import cd, local, task, abort, env
from fabric.utils import puts
import os.path
import sys
import re

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../bin/')))
import docs_meta

env.sign = False

@task
def sign():
    env.sign = True

@task
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

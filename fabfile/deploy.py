from fabric.api import cd, local, task, abort, env, puts
from fabric.utils import _AttributeDict as ad
from docs_meta import PUBLISHED_BRANCHES, MANUAL_BRANCH, render_paths, get_branch, get_commit
from urllib2 import urlopen

env.paths = render_paths('dict')

def validate_branch(branch):
    if branch == 'override':
        pass
    elif branch is None:
        abort('must specify a branch')
    elif branch not in PUBLISHED_BRANCHES:
        abort('must specify a published branch.')

@task
def staging(branch=None):
    validate_branch(branch)

    env.hosts = ['public@test.docs.10gen.cc']
    env.remote_rsync_location = '/srv/public/test/' + str(branch)
    env.release_info_url = 'http://test.docs.10gen.cc/{0}/release.txt'.format(str(branch))

@task
def production(branch=None):
    validate_branch(branch)

    env.hosts = ['www@www-c1.10gen.cc', 'www@www-c2.10gen.cc']
    env.remote_rsync_location = '/data/sites/docs/' + str(branch)
    env.release_info_url = 'http://docs.mongodb.org/{0}/release.txt'.format(str(branch))

def build_rsync_cmd(local_path, remote_string, recursive=True, delete=None):
    return [
        'rsync',
        '-ltz' if delete != 'delete' else '-ltz --delete',
        '-qcr' if recursive is True else '-cq',
        local_path,
        remote_string
    ]

@task
def check():
    r = urlopen(env.release_info_url).readlines()[0].split('\n')[0]

    if get_commit() == r:
        abort('ERROR: the current published version of is the same as the current commit. Make a new commit before publishing.')
    else:
        puts('[build]: the current commit is different than the published version on. Building now.')

@task
def push(delete=None):
    if not env.hosts:
        abort('must specify a deployment mode: staging or production')

    cmd = build_rsync_cmd(local_path=env.paths['branch-staging'] + '/',
                                 remote_string=env.host_string + ':' + env.remote_rsync_location,
                                 delete=delete)
    local(' '.join(cmd))

@task
def everything(override=None):
    if override != 'override':
        abort('must specify override to deploy everything')

    cmd = build_rsync_cmd(local_path=env.paths['public'] + '/',
                          remote_string=env.host_string + ':' + env.remote_rsync_location.rsplit('/', 1)[0])

    local(' '.join(cmd))

@task
def static():
    if get_branch() == MANUAL_BRANCH:

        cmd = [ build_rsync_cmd(local_path=env.paths['public'] + '/*',
                               remote_string=env.host_string + ':' + env.remote_rsync_location.rsplit('/', 1)[0],
                               recursive=False),
               build_rsync_cmd(local_path=env.paths['public'] + '/.htaccess',
                               remote_string=env.host_string + ':' + env.remote_rsync_location.rsplit('/', 1)[0],
                               recursive=False) ]

        for c in cmd:
            local(' '.join(c))

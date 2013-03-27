from fabric.api import cd, local, task, abort, env
from fabric.utils import _AttributeDict as ad
from mongodb_docs_meta import PUBLISHED_BRANCHES, render_paths

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

@task
def production(branch=None): 
    validate_branch(branch)

    env.hosts = ['www@www-c1.10gen.cc', 'www@www-c2.10gen.cc']
    env.remote_rsync_location = '/data/sites/docs/' + str(branch)

def build_rsync_args(*args): 
    o = '-raz'
    if 'delete' in args: 
        o += ' --delete'

def build_rsync_cmd(local_path, remote_string, delete=None):
    return [
        'rsync', 
        '-raz' if delete != 'delete' else '-raz --delete', 
        local_path,
        remote_string
    ]
    
@task
def deploy(delete=None):
    if not env.hosts:
        abort('must specify a deployment mode: staging or production')

    cmd = build_rsync_cmd(local_path=env.paths['branch-staging'] + '/',
                          remote_string=env.host_string + ':' + env.remote_rsync_location,
                          delete=delete)

    local(' '.join(cmd))

@task
def deploy_everything(override=None):
    if override != 'override':
        abort('must specify override to deploy everyting')

    cmd = build_rsync_cmd(local_path=env.paths['public'] + '/', 
                    remote_string=env.host_string + ':' + env.remote_rsync_location.rsplit('/', 1)[0])

    local(' '.join(cmd))

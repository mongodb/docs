from fabric.api import task, local, env, puts, hide
from fabric.utils import _AttributeDict as ad
import os
import time

env.ACCEPTABLE = 864000
env.msgid = 'intersphinx'

#### Helper functions

def download_file(file, url):
    cmd = ['curl', '-s', '--remote-time', url, '-o', file]
    with hide('running'):
        local(' '.join(cmd))

def file_timestamp(path):
    return os.stat(path)[8]

#### Tasks

env._ui = ad({'url': None, 'file': None})

@task
def url(url):
    env._ui.url = url

@task
def file(file):
    env._ui.file = file

@task
def download():
    f = env._ui.file
    s = env._ui.url

    if os.path.isfile(f):
        newf = False
    else:
        puts('[{0}]: "{1} file does not exist'.format(env.msgid, f))
        newf = download_file(f, s)

    mtime = file_timestamp(f)

    if mtime < time.time() - env.ACCEPTABLE:
        # if mtime is less than now - n days, it may be stale.

        newtime = time.time() - (env.ACCEPTABLE / 2)

        if newf is True:
            # if we just downloaded the file it isn't stale yet
            os.utime(f, (newtime, newtime))
        else:
            # definitley stale, must download it again.
            newf = download_file(f, s)
            if mtime == file_timestamp(f):
                # if the source is stale, modify mtime so we don't
                # download it for a few days.
                os.utime(f, (newtime, newtime))
    else:
        # otherwise, mtime is within the window of n days, and we can do nothing.
        puts('[{0}]: "{1}" is up to date'.format(env.msgid, f))

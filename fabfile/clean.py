from fabric.api import task
import time
import os
import sys
import shutil
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../bin/')))

import utils
import docs_meta

def _rm_rf(path):
    if os.path.isdir(path):
        shutil.rmtree(path)
    elif os.path.exists(path):
        os.remove(path)

@task
def builds(days=14):
    days = time.time() - 60*60*24 * int(days)

    path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../build/')) + '/'

    builds = [ path + o for o in os.listdir(path) if os.path.isdir(path + o)]

    for build in builds:
        branch = build.rsplit('/', 1)[1]

        if branch in docs_meta.PUBLISHED_BRANCHES:
            continue
        elif branch == docs_meta.get_branch:
            continue
        elif branch == 'public':
            continue
        elif os.stat(build).st_mtime < days:
            _rm_rf(build)
            _rm_rf(path + "public/" + branch)
            print('[clean]: removed stale build artifact: ' + build)

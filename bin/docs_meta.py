#!/usr/bin/python

import datetime
import argparse
import yaml
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), './')))
from utils import write_yaml, shell_value, get_commit, get_branch, get_conf_file, ingest_yaml, BuildConfiguration

### Configuration and Settings

conf = BuildConfiguration(__file__)

# For backwards compatibility, populating global variables from yaml file. See
# the docs_meta.yaml file for documentation of these values.

GIT_REMOTE = conf.git.remote
MANUAL_BRANCH = conf.git.branches.manual
PUBLISHED_BRANCHES = conf.git.branches.published
PUBLISHED_VERSIONS = conf.version.published

STABLE_RELEASE = conf.version.stable
UPCOMING_RELEASE = conf.version.upcoming
GENERATED_MAKEFILES = conf.build.system.files
GENERATED_MAKEFILE_DATA_DIRECTORY = conf.build.system.data

### Functions

def get_manual_path():
    branch = get_branch()

    if branch == conf.git.branches.manual:
        return 'manual'
    else:
        return branch

def get_versions():
    o = []

    for version in conf.version.published:
        version_string = str(version)
        path_name = 'v' + version_string

        if version == conf.version.stable:
            version_string += ' (current)'
        elif version == conf.version.upcoming:
            version_string += ' (upcoming)'

        o.append( { 'v': path_name, 't': version_string } )

    return o

def output_yaml(fn):
    o = {
            'branch': get_branch(),
            'commit': get_commit(),
            'manual_path': get_manual_path(),
            'date': str(datetime.date.today().year),
            'version_selector': get_versions(),
            'stable': conf.version.stable,
            'published_branches': conf.git.branches.published,
            'pdfs': []
    }

    write_yaml(o, fn)

def render_paths(fn):
    paths = conf['build']['paths']
    paths['public'] = paths['output'] + '/public'
    paths['branch-output'] = paths['output'] + '/' + get_branch()
    paths['branch-source'] = paths['branch-output'] + '/source'
    paths['branch-staging'] = paths['public'] + '/' + get_branch()

    if str(fn).endswith('yaml'):
        utils.write_yaml(paths, fn)
    elif fn == 'print':
        print(yaml.dump(paths, default_flow_style=False))
    else:
        return paths

def main():
    action_list = [ 'branch', 'commit', 'versions', 'stable', 'all', 'manual',
                    'yaml', 'current-or-manual', 'output', 'paths']

    parser = argparse.ArgumentParser('MongoDB Documentation Meta Data Provider')
    parser.add_argument('action', choices=action_list, nargs='?', default='all')
    parser.add_argument('filename', nargs='?', default='meta.yaml')

    ui = parser.parse_args()

    if ui.action == 'all':
        BREAK = "\n"
        print("MongoDB Manual:" + BREAK +
              "     Commit: " + get_commit() + BREAK +
              "     Branch: " + get_branch() + BREAK +
              "     Manual: " + conf.git.branches.manual + BREAK +
              "     Versions: " + str(conf.version.published) + BREAK +
              "     Stable: " + str(conf.version.stable) + BREAK +
              "     Year: " + str(datetime.date.today().year) + BREAK +
              "     Path: " + get_manual_path() + BREAK +
              "     Version UI: " + str(get_versions()))
    elif ui.action == 'branch':
        print(get_branch())
    elif ui.action == 'commit':
        print(get_commit())
    elif ui.action == 'stable':
        print(conf.version.stable)
    elif ui.action == 'versions':
        print(conf.version.published)
    elif ui.action == 'manual':
        print(conf.git.branches.manual)
    elif ui.action == 'current-or-manual':
        print(get_manual_path())
    elif ui.action == 'yaml':
        output_yaml(ui.filename)
    elif ui.action == 'paths':
        render_paths('print')

if __name__ == '__main__':
    main()

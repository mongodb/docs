#!/usr/bin/python

import datetime
import argparse
import yaml
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), './')))
from utils import write_yaml, shell_value, get_commit, get_branch, get_conf_file, ingest_yaml

### Configuration and Settings

conf = ingest_yaml(get_conf_file(__file__, os.path.split(os.path.abspath(__file__))[0]))

# For backwards compatibility, populating global variables from yaml file. See
# the docs_meta.yaml file for documentation of these values.

GIT_REMOTE = conf['git']['remote']
MANUAL_BRANCH = conf['git']['branches']['manual']
PUBLISHED_BRANCHES = conf['git']['branches']['published']
PUBLISHED_VERSIONS = conf['version']['published']

STABLE_RELEASE = conf['version']['stable']
UPCOMING_RELEASE = conf['version']['upcoming']
GENERATED_MAKEFILES = conf['build']['system']['files']
GENERATED_MAKEFILE_DATA_DIRECTORY = conf['build']['system']['data']

### Functions

def get_manual_path():
    branch = get_branch()

    if branch == MANUAL_BRANCH:
        manual_path = 'manual'
    else:
        manual_path = branch

    return manual_path

def get_versions():
    o = []

    for version in PUBLISHED_VERSIONS:
        version_string = str(version)
        path_name = 'v' + version_string

        if version == STABLE_RELEASE:
            version_string += ' (current)'
        elif version == UPCOMING_RELEASE:
            version_string += ' (upcoming)'

        version_dict = { 'v': path_name, 't': version_string }
        o.append(version_dict)

    return o

def output_yaml(fn):
    o = {
            'branch': get_branch(),
            'commit': get_commit(),
            'manual_path': get_manual_path(),
            'date': str(datetime.date.today().year),
            'version_selector': get_versions(),
            'stable': STABLE_RELEASE,
            'published_branches': PUBLISHED_BRANCHES,
            'pdfs': []
    }

    with open(fn, 'w') as f:
        f.write(yaml.dump(o, default_flow_style=False))

def render_paths(fn):
    paths = conf['build']['paths']
    paths['public'] = paths['output'] + '/public'
    paths['branch-output'] = paths['output'] + '/' + get_branch()
    paths['branch-source'] = paths['branch-output'] + '/source'
    paths['branch-staging'] = paths['public'] + '/' + get_branch()

    if str(fn).endswith('yaml'):
        with open(fn, 'w') as f:
            f.write(yaml.dump(paths, default_flow_style=False))
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
              "     Manual: " + MANUAL_BRANCH + BREAK +
              "     Versions: " + str(PUBLISHED_VERSIONS) + BREAK +
              "     Stable: " + str(STABLE_RELEASE) + BREAK +
              "     Year: " + str(datetime.date.today().year) + BREAK +
              "     Path: " + get_manual_path() + BREAK +
              "     Version UI: " + str(get_versions()))
    elif ui.action == 'branch':
        print(get_branch())
    elif ui.action == 'commit':
        print(get_commit())
    elif ui.action == 'stable':
        print(STABLE_RELEASE)
    elif ui.action == 'versions':
        print(PUBLISHED_VERSIONS)
    elif ui.action == 'manual':
        print(MANUAL_BRANCH)
    elif ui.action == 'current-or-manual':
        print(get_manual_path())
    elif ui.action == 'yaml':
        output_yaml(ui.filename)
    elif ui.action == 'paths':
        render_paths('print')

if __name__ == '__main__':
    main()

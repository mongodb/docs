#!/usr/bin/python

import datetime
import re
import subprocess
import argparse

MANUAL_BRANCH = 'master'
PUBLISHED_VERSIONS = [ '2.4', '2.2' ]
STABLE_RELEASE = PUBLISHED_VERSIONS[0]
UPCOMING_RELEASE = None

def shell_value( args ):
    if isinstance( args , str ):
        r = re.compile( "\s+" )
        args = r.split( args )
    p = subprocess.Popen( args , stdout=subprocess.PIPE , stderr=subprocess.PIPE )
    r = p.communicate()
    value = r[0].decode().rstrip()
    return value

def get_manual_path():
    branch = get_branch()

    if branch == MANUAL_BRANCH:
        manual_path = MANUAL_BRANCH
    else:
        manual_path = branch

    return manual_path

def get_commit():
    return shell_value('git rev-parse --verify HEAD')

def get_branch():
    return shell_value('git symbolic-ref HEAD').split('/')[2]

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


def main():
    action_list = ['branch', 'commit', 'versions', 'stable', 'all', 'manual']
    parser = argparse.ArgumentParser('MongoDB Documentation Meta Data Provider')
    parser.add_argument('action', choices=action_list, nargs='?', default='all')

    action = parser.parse_args().action

    if action == 'all':
        BREAK = "\n"

        print("MongoDB Manual:" + BREAK +
              "     Commit: " + get_commit() + BREAK +
              "     Branch: " + get_branch() + BREAK +
              "     Manual: " + MANUAL_BRANCH + BREAK +
              "     Versions: " + str(PUBLISHED_VERSIONS) + BREAK +
              "     Stable: " + str(STABLE_RELEASE) + BREAK +
              "     Year: " + str(datetime.date.today().year) + BREAK +
              "     Version UI: " + str(get_versions()))
    elif action == 'branch':
        print(get_branch())
    elif action == 'commit':
        print(get_commit())
    elif action == 'stable':
        print(STABLE_RELEASE)
    elif action == 'versions':
        print(PUBLISHED_VERSIONS)
    elif action == 'manual':
        print(MANUAL_BRANCH)

if __name__ == '__main__':
    main()

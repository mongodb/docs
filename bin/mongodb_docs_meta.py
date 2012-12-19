#!/usr/bin/python

import datetime 
import re
import subprocess

MANUAL_BRANCH = 'manual'

def shell_value( args ):
    if isinstance( args , str ):
        r = re.compile( "\s+" )
        args = r.split( args )
    p = subprocess.Popen( args , stdout=subprocess.PIPE , stderr=subprocess.PIPE )
    r = p.communicate()
    value = r[0].decode().rstrip()
    return value

def get_manual_path():
    branch = shell_value('git symbolic-ref HEAD').split('/')[2]
    if branch == MANUAL_BRANCH:
        manual_path = MANUAL_BRANCH
    else:
        manual_path = branch

    return manual_path

def get_commit():
    return shell_value('git rev-parse --verify HEAD')

def get_branch():
    return shell_value('git symbolic-ref HEAD').split('/')[2]

def main():
    BREAK = "\n"

    print("MongoDB Manual:" + BREAK +
          "     Commit: " + meta_commit() + BREAK +
          "     Branch: " + meta_branch() + BREAK + 
          "     Year: " + str(datetime.date.today().year))

if __name__ == '__main__':
    main()

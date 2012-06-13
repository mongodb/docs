#!/usr/bin/python
"""
This module defines a class.
"""

import subprocess
import re

MANUAL_BRANCH = "manual"

def shell_value( args ):
    import subprocess
    if isinstance( args , str ):
        r = re.compile( "\s+" )
        args = r.split( args )
    p = subprocess.Popen( args , stdout=subprocess.PIPE , stderr=subprocess.PIPE )
    r = p.communicate()
    value = r[0].decode().rstrip()
    return value

class VersionMeta():
    def __init__(self):
        self.branch = shell_value('git symbolic-ref HEAD').split('/')[2]
        self.commit = shell_value('git rev-parse --verify HEAD')
        
        if self.branch == MANUAL_BRANCH:
            self.manual_path = "manaul"
        else:
            self.manual_path = self.branch

def main():
    meta = VersionMeta()
    BREAK = "\n"

    print("MongoDB Manual:" + BREAK +
          "     Commit: " + meta.commit + BREAK +
          "     Branch: " + meta.branch)

if __name__ == "__main__":
    main()

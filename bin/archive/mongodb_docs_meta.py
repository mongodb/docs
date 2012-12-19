#!/usr/bin/python
"""
This module defines a class.
"""

import re
import datetime

MANUAL_BRANCH = "manual"

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
          "     Branch: " + meta.branch + BREAK)

if __name__ == "__main__":
    main()

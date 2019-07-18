#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 27 11:17:26 2017

@author: alex7376
"""

import os
import sys

# dir(s) to exclude from test
exclude_dirs = ('.')
# return value
match = False

print('Checking RST files for incorrect .. code:: usage:')
for root, dirs, files in os.walk(".", topdown=True):
    dirs[:] = [d for d in dirs if not d.startswith(exclude_dirs)]
    for filename in files:
        if filename.endswith(".rst"):
            with open(os.path.join(root, filename)) as the_file:
                content = the_file.readlines()
                for number, line in enumerate(content):
                    if ".. code::" in line:
                        print("In {filename} on line {number}, invalid code "
                              "block found: '{line}'. Please use '.. "
                              "code-block::' instead.".format(
                               filename=os.path.join(root, filename),
                               number=number, line=line.strip()))
                        match = True
if match:
    sys.exit(1)
else:
    print('No incorrect ".. code:: usage" found.')

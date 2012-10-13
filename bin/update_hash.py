#!/usr/bin/python

import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))

from conf import VersionMeta

def main():
    meta = VersionMeta()

    content = '.. |commit| replace:: ``' + meta.commit + '``' + '\n'

    f = open('source/includes/hash.rst', 'w')
    f.write(content)
    f.close()
	
if __name__ == '__main__':
    main()

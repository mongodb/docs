#!/usr/bin/python

import mongodb_docs_meta

def main():
    meta = mongodb_docs_meta.VersionMeta()

    content = '.. |commit| replace:: ``' + meta.commit + '``' + '\n'

    f = open('source/includes/hash.rst', 'w')
    f.write(content)
    f.close()
	
if __name__ == '__main__':
    main()

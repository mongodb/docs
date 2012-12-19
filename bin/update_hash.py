#!/usr/bin/python

from mongodb_docs_meta import get_commit

def main():

    content = '.. |commit| replace:: ``' + get_commit() + '``' + '\n'

    f = open('source/includes/hash.rst', 'w')
    f.write(content)
    f.close()
	
if __name__ == '__main__':
    main()

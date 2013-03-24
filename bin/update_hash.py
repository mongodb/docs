#!/usr/bin/python

from mongodb_docs_meta import get_commit

def main():
    content = '.. |commit| replace:: ``' + get_commit() + '``' + '\n'

    with open('source/includes/hash.rst', 'w') as f:
        f.write(content)

if __name__ == '__main__':
    main()

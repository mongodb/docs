#!/usr/bin/python

import sys
import os
import sphinx_conf

def cli():
    try:
        builder = sys.argv[1]
    except IndexError:
        exit('[build]: Error. No builder specified.')

    if builder == 'linux-32':
        builder = 'linux-i686'
        platform = 'linux'
    elif builder == 'linux-64':
        builder = 'linux-x86_64'
        platform = 'linux'
    elif builder == 'osx':
        builder = 'osx-x86_64'
        platform = 'osx'
    else:
        print(sys.argv[1])
        exit('[build]: Error. Builder argument, must be "linux-32", "linux-64", or "osx".')

    try:
        outputfile = sys.argv[2]
    except IndexError:
        exit('[build]: Error. No output file specified to "update_release.py"')

    return { 'outputfile': outputfile, 'builder': builder, 'platform': platform }

def generate_output(builder, platform, version):
    BREAK = '\n\n'
    INDENT = '   '

    output = ('.. code-block:: sh' + '\n\n' +
              '   curl http://downloads.mongodb.org/' + platform + '/mongodb-' +
              builder + '-' + version + '.tgz > mongo.tgz' + '\n')

    return output

def main():
    interface = cli()
    output = generate_output(interface['builder'], interface['platform'], sphinx_conf.version)

    with open(interface['outputfile'], 'w') as f:
        f.write(output)

if __name__ == '__main__':
    main()

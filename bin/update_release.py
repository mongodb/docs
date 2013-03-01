#!/usr/bin/python

import sys
import os
import argparse
import sphinx_conf

def cli():
    parser = argparse.ArgumentParser('Generate install files.')
    parser.add_argument(choices=['linux-32', 'linux-64', 'osx-64'], dest='builder')
    parser.add_argument(choices=['core', 'amz', 'rhel6', 'ubuntu11', 'ubuntu12', 'suse'], dest='release')
    parser.add_argument(dest='output')

    p = parser.parse_args()

    if p.builder == 'linux-32':
        builder = 'linux-i686'
        platform = 'linux'
    elif p.builder == 'linux-64':
        builder = 'linux-x86_64'
        platform = 'linux'
    elif p.builder == 'osx-64':
        builder = 'osx-x86_64'
        platform = 'osx'

    if p.release == 'core':
        release = 'core'
    if p.release == 'amz':
        release = 'amzn64'
    elif p.release == 'rhel6':
        release = 'rhel62'
    elif p.release == 'ubuntu11':
        release = 'ubuntu1104'
    elif p.release == 'ubuntu12':
        release = 'ubuntu1204'
    elif p.release == 'suse':
        release = 'suse11'

    return  { 'outputfile': p.output, 'builder': builder, 'platform': platform, 'release': release }

def generate_output(builder, platform, version, release):
    BREAK = '\n\n'
    INDENT = '   '

    if release == 'core':
        output = ('.. code-block:: sh' + '\n\n' +
                  '   curl http://downloads.mongodb.org/' + platform + '/mongodb-' +
                  builder + '-' + version + '.tgz > mongodb.tgz' + '\n')
    else:
        output = ('.. code-block:: sh' + '\n\n' +
                  '   curl http://downloads.10gen.com/linux/mongodb-' + builder + '-subscription-' +
                  release + '-' + version + '.tgz > mongodb.tgz' + '\n')

    return output

def main():
    interface = cli()
    output = generate_output(interface['builder'], interface['platform'], sphinx_conf.version, interface['release'])

    with open(interface['outputfile'], 'w') as f:
        f.write(output)

if __name__ == '__main__':
    main()

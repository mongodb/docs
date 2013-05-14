#!/usr/bin/python

import sys
import os
import argparse
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.getcwd())))
from conf import release

from rstcloth import RstCloth

r = RstCloth()

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
    r.directive('code-block', 'sh', block='header')
    r.newline(block='header')

    if release == 'core':
        r.content('curl http://downloads.mongodb.org/{0}/mongodb-{1}-{2}.tgz > mongodb.tgz'.format(platform, builder, version), 3, wrap=False, block='cmd')
    else:
        r.content('curl http://downloads.10gen.com/linux/mongodb-{0}-subscription-{1}-{2}.tgz > mongodb.tgz'.format(builder, release, version), 3, wrap=False, block='cmd')
        r.content('tar -zxvf mongodb.tgz', 3, wrap=False, block='cmd')
        r.content('cp -R -n mongodb-{0}-subscription-{1}-{2}/ mongodb'.format(builder, release, version), 3, wrap=False, block='cmd')

    r.newline(block='footer')

def main():
    interface = cli()

    generate_output(interface['builder'], interface['platform'], release, interface['release'])

    r.write(interface['outputfile'])

if __name__ == '__main__':
    main()

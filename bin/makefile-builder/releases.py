#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import install_guides, subscription_build

m = MakefileBuilder()

def build_all_install_guides(install_guides):
    m.comment('to render the install guides properly, we have to bake in the version number.', block='header')
    m.newline(block='header')

    for build in install_guides:
        if build[1] is None:
            makefile_core(build[0])
        else:
            makefile_restat(build[0], build[1])

    for build in subscription_build:
        makefile_subscription(build[0], build[1])

    m.comment('integration target for the installation guides:', block='meta')

    m.target(target='.PHONY',
             dependency='installation-guides $(installation-sources) $(installation-guides)',
             block='meta')

    m.newline(block='meta')
    m.target(target='installation-sources',
             dependency='$(installation-sources)', block='meta')

    m.job('git update-index --assume-unchanged $(installation-sources)', ignore=True, block='meta')
    m.msg('[build]: cleansing git index of installation sources.', block='meta')

    m.newline(block='meta')
    m.target(target='installation-guides',
             dependency='installation-sources $(installation-guides)',
             block='meta')

def makefile_core(builder):
    # this is one of the included source files.
    target = 'source/includes/install-curl-release-' + builder + '.rst'

    m.append_var(variable='installation-sources',
                 value=target,
                 block='source')
    m.target(target=target, dependency=None, block='source')
    m.job('$(PYTHONBIN) bin/update_release.py %s %s %s' % (builder, 'core', target), block='source')
    m.msg('[build]: \(re\)generated $@.', block='source')
    m.newline(block='source')

def makefile_restat(target, dependency):
    # this is an installation guide.
    
    m.append_var(variable='installation-guides', value=target, block='guide')
    m.target(target=target, dependency=dependency, block='guide')
    m.job('touch $@', block='guide')
    m.msg('[build]: touched $@ to ensure a clean build.', block='guide')
    m.newline(block='guide')

def makefile_subscription(builder, release):
    target = 'source/includes/install-curl-release-ent-' + release + '.rst'

    m.append_var(variable='installation-sources',
                 value=target,
                 block='ent')
    m.target(target=target, dependency=None, block='ent')
    m.job('$(PYTHONBIN) bin/update_release.py %s %s $@' % (builder, release), block='ent')
    m.msg('[build]: \(re\)generated $@.', block='ent')
    m.newline(block='ent')


def main():
    build_all_install_guides(install_guides)

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify install guides.')

if __name__ == '__main__':
    main()

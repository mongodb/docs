#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import install_guides

m = MakefileBuilder()

def build_all_install_guides(install_guides):
    m.comment('to render the install guides properly, we have to bake in the version number.', block='header')
    m.newline(block='header')

    for build in install_guides:
        makefile_inst(build[0], build[1])

    m.comment('integration target for the installation guides:', block='meta')

    m.target(target='.PHONY',
             dependency='installation-guides $(installation-sources) $(installation-guides)',
             block='meta')

    m.newline(block='meta')
    m.target(target='installation-sources',
             dependency='$(installation-sources)', block='meta')
    m.job('git update-index --assume-unchanged $(installation-sources)', ignore=True, block='meta')
    m.msg('[build]: clensing git index of installation sources.', block='meta')

    m.newline(block='meta')
    m.target(target='installation-guides', 
             dependency='installation-sources $(installation-guides)',
             block='meta')

def makefile_inst(builder, dependency):
    if dependency is None: 
        # this is one of the included source files.
        target = 'source/includes/install-curl-release-' + builder + '.rst'

        m.append_var(variable='installation-sources', 
                     value=target,
                     block='guide')
        m.target(target=target, dependency=None, block='source')
        m.job('$(PYTHONBIN) bin/update_release.py ' + builder + ' $@', block='source')
        m.msg('[build]: \(re\)generated $@.', block='source')
        m.newline(block='source')
    else: 
        # this is an installation guide.
        target = builder
        m.append_var(variable='installation-guides', value=target, block='guide')
        m.target(target=target, dependency=dependency, block='guide')
        m.job('touch $@', block='guide')
        m.msg('[build]: touched $@ to ensure a clean build.', block='guide')
        m.newline(block='guide')

def main():
    build_all_install_guides(install_guides)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify install guides.')

if __name__ == '__main__':
    main()

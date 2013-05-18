#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileCloth()

def make_all_links(links):
    m.comment('each link is created in the root and then moved into place using the "create-link" script.', block='header')
    m.newline(block='header')

    for link in links:
        make_link(link['link-path'], link['referent'], link['type'])

    m.comment('meta-targets for testing/integration with rest of the build. must apear at the end', block='footer')
    m.newline(block='footer')

    m.target('.PHONY', 'links clean-links $(public-output)/manual', block='footer')
    m.target('links', '$(LINKS)', block='footer')
    m.newline(block='footer')
    m.target('clean-links', block='footer')
    m.job('rm -rf $(LINKS)', True)

def make_link(make_target, link_target, makefile_block):
    link_location = make_target.rsplit('/', 1)[0] + '/'

    if makefile_block == 'use':
        m.target(link_location, '$(public-branch-output)', makefile_block)

    if makefile_block == 'content':
        m.target(make_target, '', makefile_block)
    else:
        m.append_var('LINKS', make_target, makefile_block)
        m.target(make_target, link_location, makefile_block)


    m.job('@bin/create-link %s $(notdir $@) %s' % ( link_target, link_location), makefile_block)
    m.msg('[symlink]: created a link at: %s' % make_target, makefile_block)
    m.newline(block=makefile_block)

def main():
    conf_file = utils.get_conf_file(__file__)
    make_all_links(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify symlink builders.')

if __name__ == '__main__':
    main()

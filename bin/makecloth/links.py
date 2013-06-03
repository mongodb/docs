#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth
from docs_meta import render_paths

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileCloth()
paths = render_paths('dict')

def make_all_links(links):
    m.comment('each link is created in the root and then moved into place using the "create-link" script.', block='header')
    m.newline(block='header')

    for link in links:
        make_link(link['link-path'], link['referent'], link['type'])

    m.comment('meta-targets for testing/integration with rest of the build. must apear at the end', block='footer')
    m.newline(block='footer')

    m.target('.PHONY', ['links', 'clean-links', '{0}/manual'.format(paths['public'])], block='footer')
    m.target('links', '$(LINKS)', block='footer')
    m.newline(block='footer')
    m.target('clean-links', block='footer')
    m.job('rm -rf $(LINKS)', True)

def make_link(link_path, referent, block):
    if block == 'content':
        m.append_var('LINKS', link_path)

    m.target(link_path, block=block)

    m.job(job='fab process.input:{0} process.output:{1} process.create_link'.format(referent, link_path), block=block)
    m.newline(block=block)

def main():
    conf_file = utils.get_conf_file(__file__)
    make_all_links(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify symlink builders.')

if __name__ == '__main__':
    main()

#!/usr/bin/python

import sys
import os.path
from multiprocessing import cpu_count
import pkg_resources


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from makecloth import MakefileCloth

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileCloth()

def make_all_sphinx(sphinx):
    m.section_break('sphinx prerequisites')
    m.newline()
    m.target('sphinx-prerequisites', 'setup composites generate-source composite-pages.yaml', block='prereq')
    m.msg('[sphinx-prep]: completed $@ buildstep.', block='prereq')

    m.target('generate-source', '$(branch-output)/source tables installation-guides intersphinx', block='prereq')
    m.job('rsync --recursive --times --delete source/ $(branch-output)/source', block='prereq')
    m.msg('[sphinx-prep]: updated source in $(branch-output)/source', block='prereq')
    info_note = 'Build in progress past critical phase.'
    m.job(utils.build_platform_notification('Sphinx', info_note), ignore=True, block='prereq')
    m.msg('[sphinx-prep]: INFO - ' + info_note, block='prereq')

    m.target('$(branch-output)/source', block='prereq')
    m.job('mkdir -p $@', block='prereq')
    m.msg('[sphinx-prep]: created $@', block='prereq')

    m.section_break('sphinx targets', block='sphinx')
    m.newline(block='sphinx')

    for builder in sphinx:
        sphinx_builder(builder)

    m.section_break('nitpick sphinx builders')
    m.newline(block='sphinx')

    for builder in sphinx:
        sphinx_builder(builder + '-nitpick')

    m.target('.PHONY', '$(sphinx-targets)', block='footer')

def build_kickoff(target, block):
    m.job('mkdir -p $(branch-output)/' + target, block=block)
    m.msg('[' + target + ']: created $(branch-output)/' + target, block)
    m.msg('[sphinx]: starting ' + target + ' build', block)
    m.msg('[' + target + ']: build started at `date`.', block)

def sphinx_builder(target):
    b = 'production'
    m.append_var('sphinx-targets', target)
    m.target(target, 'sphinx-prerequisites', block=b)

    if target.endswith('-nitpick'):
        nitpick = True
        builder = target.split('-')[0]
        fab_args = builder + ',nitpick=True'
    else:
        nitpick = False
        builder = target
        fab_args = builder

    m.job('fab sphinx.build:' + fab_args, block=b)
    m.msg('[{0}] completed {0} build.'.format(target))


    if nitpick is False:
        m.target('clean-' + target, block=b)
        m.job('rm -rf $(branch-output)/doctrees-{0} $(branch-output)/{0}'.format(builder), block=b)
        m.msg('[clean-{0}]: removed all files supporting the {1} build'.format(target, builder) )

    m.newline(block=b)

def get_config():
    return utils.ingest_yaml(utils.get_conf_file(__file__))

def main():
    make_all_sphinx(get_config())

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx builders.')

if __name__ == '__main__':
    main()

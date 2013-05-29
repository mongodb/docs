#!/usr/bin/python

import sys
import os.path
from multiprocessing import cpu_count
import pkg_resources

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth
import docs_meta

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileCloth()

paths = docs_meta.render_paths('dict')

def make_all_sphinx(config):
    b = 'prereq'
    build_source_dir = paths['branch-output'] + '/source'

    config['generated-source'].insert(0, build_source_dir)

    m.section_break('sphinx prerequisites')
    m.newline()
    m.target('sphinx-prerequisites', config['prerequsites'], block=b)
    m.msg('[sphinx-prep]: build environment prepared for sphinx.', block=b)

    m.target('generate-source',  config['generated-source'], block=b)
    m.job('rsync --recursive --times --delete source/ ' + build_source_dir, block=b)
    m.msg('[sphinx-prep]: updated source in ' + build_source_dir, block=b)

    info_note = 'Build in progress past critical phase.'
    m.job(utils.build_platform_notification('Sphinx', info_note), ignore=True, block=b)
    m.msg('[sphinx-prep]: INFO - ' + info_note, block=b)

    m.target(build_source_dir, block=b)
    m.job('mkdir -p ' + build_source_dir, block=b)
    m.msg('[sphinx-prep]: created ' + build_source_dir, block=b)

    m.section_break('sphinx targets', block=b)
    m.newline(block=b)

    sphinx_targets = []
    for builder in config['builders']:
        sphinx_builder(builder)

        sphinx_targets.append(builder)
        sphinx_targets.append(builder + '-nitpick')
        sphinx_targets.append('clean-' + builder)

    m.section_break('meta', block='footer')
    m.newline(block='footer')
    m.target('.PHONY', sphinx_targets, block='footer')

def build_kickoff(target, block):
    m.job('mkdir -p {1}/{0}'.format(target, paths['branch-output']), block=block)
    m.msg('[{0}]: created {1}/{0}'.format(target, paths['branch-output']), block)
    m.msg('[sphinx]: starting {0} build'.foramt(target), block)
    m.msg('[{0}]: build started at `date`.'.format(target), block)

def sphinx_builder(target):
    b = 'production'
    m.comment(target, block=b)

    m.target(target, 'sphinx-prerequisites', block=b)
    m.job('fab sphinx.build:' + target, block=b)
    m.job(utils.build_platform_notification('Sphinx', 'completed {0} build.'.format(target)), ignore=True, block=b)
    m.msg('[{0}]: completed {0} build.'.format(target))

    m.target(target + '-nitpick', 'sphinx-prerequisites', block=b)
    m.job('fab sphinx.build:' + target + ',nitpick=True', block=b)
    m.job(utils.build_platform_notification('Sphinx', 'completed {0} build.'.format(target)), ignore=True, block=b)
    m.msg('[{0}]: completed {0} build.'.format(target))

    m.target('clean-' + target, block=b)
    m.job('rm -rf {0}/doctrees-{1} {0}/{1}'.format(paths['branch-output'], target), block=b)
    m.msg('[clean-{0}]: removed all files supporting the {0} build'.format(target) )

def main():
    config = utils.ingest_yaml(utils.get_conf_file(__file__))

    make_all_sphinx(config)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx builders.')

if __name__ == '__main__':
    main()

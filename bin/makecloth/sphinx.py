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
    m.section_break('sphinx related variables', block='header')

    m.comment('variables related to paper sizing for the latex output', block='vars')
    m.newline()
    m.var(variable='PAPER',
          value='letter',
          block='vars')
    m.var(variable='PAPEROPT_a4',
          value='-D latex_paper_size=a4',
          block='vars')
    m.var(variable='PAPEROPT_letter',
          value='-D latex_paper_size=letter',
          block='vars')

    m.comment('general sphinx variables', block='vars')

    m.section_break('sphinx prerequisites')
    m.newline()
    m.target('sphinx-prerequisites', 'setup composites generate-source composite-pages.yaml', block='prereq')
    m.msg('[sphinx-prep]: completed $@ buildstep.', block='prereq')

    m.target('generate-source', '$(branch-output)/source images tables installation-guides intersphinx generate-manpages api ref-toc', block='prereq')
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

    build_kickoff(target, block=b)

    if target.startswith('html') or target.startswith('dirhtml'):
        tag = 'website'
    else:
        tag = 'print'

    sphinx_opts = '-q -d $(branch-output)/doctrees-$@ $(PAPEROPT_$(PAPER)) -c ./ '
    if pkg_resources.get_distribution("sphinx").version.startswith('1.2'):
        sphinx_opts += '-j ' + str(cpu_count() + 1 ) + ' '

    if target.endswith('-nitpick'):
        sphinx_opts += '-n -w $(branch-output)/build.$(shell date +%Y%m%d%H%M).log '
        builder = target.split('-')[0]
    else:
        builder = target

    sphinx_opts += '$(branch-output)/source'

    if target.startswith('epub'):
        epub_filter = ("sed $(SED_ARGS_REGEX) "
                       "-e '/^WARNING: unknown mimetype.*ignoring$$/d' "
                       "-e '/^WARNING: search index.*incomplete.$$/d' ")

        epub_command = 'sphinx-build -b epub -t print {0} $(branch-output)/epub'.format(sphinx_opts)

        m.job('{ %s 2>&1 1>&3 | %s 1>&2; } 3>&1' % (epub_command, epub_filter), block=b)
    else:
        m.job('sphinx-build -b {0} -t {1} {2} $(branch-output)/{3}'.format(builder, tag, sphinx_opts, builder), block=b)

    if target.startswith('linkcheck'):
        m.msg('[' + target + ']: Link check complete at `date`. See "$(branch-output)/linkcheck/output.txt".', block=b)
    else:
        m.msg('[' + target + ']: build finished at `date`.', block=b)

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

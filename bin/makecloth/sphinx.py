#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from makecloth import MakefileCloth

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileCloth()

def make_all_sphinx(sphinx):
    m.section_break('sphinx related variables', block='header')
    m.var(variable='SPHINXOPTS',
          value='-c ./',
          block='vars')
    m.var(variable='SPHINXBUILD',
          value='sphinx-build',
          block='vars')

    m.comment('defines a nitpick mode for sphinx\'s more verbose reporting', block='vars')
    m.raw(['ifdef NITPICK'], block='vars')
    m.append_var(variable='SPHINXOPTS',
                 value='-n -w $(branch-output)/build.$(shell date +%Y%m%d%H%M).log',
                 block='vars')
    m.raw(['endif'], block='vars')

    m.comment('variables related to paper sizing for the latex output', block='vars')
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
    m.var(variable='ALLSPHINXOPTS',
          value='-q -d $(branch-output)/doctrees-$@ $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) $(branch-output)/source',
          block='vars')

    m.comment('epub build modification and settings', block='vars')
    m.var(variable='epub-command',
          value='$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(branch-output)/epub',
          block='vars')
    m.var(variable='epub-filter',
          value="sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'",
          block='vars')

    m.section_break('sphinx prerequisites')
    m.target('sphinx-prerequisites', 'setup generate-source composite-pages.yaml', block='prereq')
    m.msg('[sphinx-prep]: completed $@ buildstep.', block='prereq')

    m.target('generate-source', '$(branch-output)/source tables installation-guides intersphinx generate-manpages ref-toc', block='prereq')
    m.job('rsync --recursive --times --delete source/ $(branch-output)/source', block='prereq')
    m.msg('[sphinx-prep]: updated source in $(branch-output)/source', block='prereq')
    info_note = 'Build in progress past critical phase.'
    m.job(utils.build_platform_notification('Sphinx', info_note), ignore=True, block='prereq')
    m.msg('[sphinx-prep]: INFO - ' + info_note, block='prereq')

    m.target('$(branch-output)/source', block='prereq')
    m.job('mkdir -p $@', block='prereq')
    m.msg('[sphinx-prep]: created $@', block='prereq')

    m.section_break('sphinx targets', block='sphinx')
    m.comment('each sphinx target invokes and controls the sphinx build.', block='sphinx')
    m.newline(block='sphinx')

    for builder in sphinx:
        sphinx_builder(builder)

    m.target('.PHONY', '$(sphinx-targets)', block='footer')

def build_kickoff(loc, block):
    m.job('mkdir -p $(branch-output)/' + loc, block=block)
    m.msg('[$@]: created $(branch-output)/' + loc, block)
    m.msg('[sphinx]: starting $@ build', block)
    m.msg('[$@]: build started at `date`.', block)

def sphinx_builder(target):
    b = 'production'

    m.append_var('sphinx-targets', target)
    m.target(target, 'sphinx-prerequisites', block=b)

    if target == 'epub':
        build_kickoff('$@',block=b)
        m.job('{ $(epub-command) 2>&1 1>&3 | $(epub-filter) 1>&2; } 3>&1', block=b)
    else:
        build_kickoff('$@', block=b)
        m.job('$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@', block=b)

    if target == 'linkcheck':
        m.msg('[$@]: Link check complete at `date`. See "$(branch-output)/linkcheck/output.txt".', block=b)
    else:
        m.msg('[$@]: build finished at `date`.', block=b)

    m.newline(block=b)

def get_config():
    return utils.ingest_yaml(utils.get_conf_file(__file__))

def main():
    make_all_sphinx(get_config())

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx builders.')

if __name__ == '__main__':
    main()

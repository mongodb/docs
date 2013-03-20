#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import sphinx as sphinx_targets

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileBuilder()

def make_all_sphinx(sphinx):
    m.section_break('sphinx related variables', block='header')
    m.var(variable='SPHINXOPTS',
          value='-c $(branch-output)/',
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
          value='-q -d $(branch-output)/doctrees-$@ $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) $(branch-source)',
          block='vars')
    m.var(variable='DRAFTSPHINXOPTS',
          value='-q -d $(branch-output)/draft-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) draft',
          block='vars')

    m.comment('epub build modification and settings', block='vars')
    m.var(variable='epub-command',
          value='$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(branch-output)/epub',
          block='vars')
    m.var(variable='epub-filter',
          value="sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'",
          block='vars')

    m.section_break('sphinx targets', block='sphinx')
    m.comment('each sphinx target invokes and controls the sphinx build.', block='sphinx')
    m.newline(block='sphinx')

    for builder in sphinx:
        sphinx_builder(builder)

    m.target('.PHONY', '$(sphinx-targets) $(branch-output)/source.tar $(branch-source) $(branch-output)/conf-tmp.py $(branch-output)/bin', block='footer')

def build_kickoff(loc, block):
    m.job('mkdir -p $(branch-output)/' + loc, block=block)
    m.msg('[$@]: created $(branch-output)/' + loc, block)
    m.msg('[sphinx]: starting $@ build', block)
    m.msg('[$@]: build started at `date`.', block)

def sphinx_builder(target):
    b = 'production'

    m.append_var('sphinx-targets', target)
    m.target(target, 'sphinx-prerequisites', block=b)

    if target.split('-')[0] == 'draft':
        if target.split('-')[1] == 'html':
            loc = 'draft'
        else:
            loc = target
        build_kickoff(loc, block=b)
        m.job('$(SPHINXBUILD) -b ' + target.split('-')[1] + ' $(DRAFTSPHINXOPTS) $(branch-output)/' + loc, block=b)
    elif target == 'epub':
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

def main():
    make_all_sphinx(sphinx_targets)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx builders.')

if __name__ == '__main__':
    main()

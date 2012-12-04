#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import sphinx as sphinx_targets

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileBuilder()

def make_all_sphinx(sphinx):
    m.section_break('sphinx related variables', block='header')
    m.var(variable='SPHINXOPTS',
          value='-c ./',
          block='vars')
    m.var(variable='SPHINXBUILD',
          value='sphinx-build',
          block='vars')
    
    m.comment('defines a nitpick mode for sphinx\'s more verbose reporting', block='vars')
    m.raw('ifdef NITPICK\n', block='vars')
    m.append_var(variable='SPHINXOPTS',
                 value='-n -w $(branch-output)/build.$(timestamp).log',
                 block='vars')
    m.raw('endif\n', block='vars')
    
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
          value='-q -d $(branch-output)/doctrees-$@ $(PAPEROPT_$(PAPER)) $(build-meta) $(SPHINXOPTS) source',
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
        sphinx_builder(builder[0], builder[1])

    m.target('.PHONY', '$(sphinx-targets)', block='footer')

def build_kickoff(loc, block):
    m.job('mkdir -p $(branch-output)/' + loc, block=block)
    m.msg('[$@]: created $(branch-output)/' + loc, block)
    m.msg('[sphinx]: starting $@ build', block)
    m.msg('[$@]: build started at `date`.', block)

def sphinx_builder(target, production):
    m.append_var('sphinx-targets', target)

    if production is True and target != 'epub': 
        b = 'production'
        m.target(target, block=b)
    else:
        b = 'testing'
        m.target(target, '', block=b)

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

def main():
    make_all_sphinx(sphinx_targets)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx builders.')

if __name__ == '__main__':
    main()

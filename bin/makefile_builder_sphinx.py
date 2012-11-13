#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import sphinx as sphinx_targets

# to add a symlink build process, add a tuple to the ``links`` in the builder definitions file.

m = MakefileBuilder()

def make_all_sphinx(sphinx):
    m.comment('each sphinx target invokes and controls the sphinx build.', block='header')
    m.newline(block='header')

    m.var(variable='epub-command', 
          value='$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(branch-output)/epub',
          block='header')
    m.var(variable='epub-filter', 
          value="sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'",
          block='header')
    m.newline(n=2, block='header')

    for builder in sphinx:
        sphinx_builder(builder[0], builder[1])

    m.target('.PHONY', '$(sphinx-targets)', block='footer')

def build_kickoff(loc, block):
    m.job('mkdir -p $(branch-output)/' + loc, block)
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
        m.target(target, 'pre-build-dependencies', block=b)

    if target.split('-')[0] == 'draft':
        if target.split('-')[1] == 'html': 
            loc = 'draft'
        else: 
            loc = target

        build_kickoff(loc, block=b)
        m.job('$(SPHINXBUILD) -b' + target.split('-')[1] + ' $(DRAFTSPHINXOPTS) $(branch-output)/' + loc, block=b)

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

    print('[meta-build]: built "' + sys.argv[1] + '" to specify symlink builders.')

if __name__ == '__main__':
    main()

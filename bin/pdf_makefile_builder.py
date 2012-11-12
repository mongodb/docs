#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder

pdfs_to_build = [
#    (root-name, tag)
    ('MongoDB', 'Manual'),
    ('MongoDB-reference', 'manual'),
    ('MongoDB-use-cases', 'guide'),
]

m = MakefileBuilder()

def pdf_makefile(name, tag):
    name_tagged = name + '-' + tag

    m.section_break(name)
    m.target(target='$(branch-output)/latex/' + name + '.tex',
             dependency='latex')
    m.job('sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@')
    m.msg('[latex]: fixing $@ TeX from the Sphinx output.')

    m.target(target='$(branch-output)/latex/' + name_tagged + '.tex',
             dependency='$(branch-output)/latex/' + name + '.tex')
    m.job('$(PYTHONBIN) $(build-tools)/copy-if-needed.py -i $< -o $@ -b pdf')

    m.target(target='$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf',
             dependency='$(branch-output)/latex/' + name_tagged + '.pdf')
    m.job('cp $< $@')
    m.msg('[build]: migrated $@')

    m.target(target='$(public-branch-output)/' + name_tagged + '.pdf',
             dependency='$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf')
    m.job('$(build-tools)/create-link $(notdir $<) $(notdir $@) $@')

    m.comment('adding ' + name + '.pdf to the build dependency.')
    m.append_var('PDF_OUTPUT', '$(public-branch-output)/' + name_tagged + '.pdf')

def build_all_pdfs(pdfs):
    for pdf in pdfs:
        pdf_makefile(pdf[0], pdf[1])

    m.newline()
    m.target(target='.PHONY',
             dependency='manual-pdfs')
    m.target(target='manual-pdfs',
             dependency='$(PDF_OUTPUT)')

def main():
    build_all_pdfs(pdfs_to_build)
    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify pdf builders.')

if __name__ == '__main__':
    main()

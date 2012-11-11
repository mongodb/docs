#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder

pdfs_to_build = [
#    (root-name, tag)
    ('MongoDB', 'Manual'),
    ('MongoDB-reference', 'manual'),
    ('MongoDB-use-cases', 'guide'),
]

def makefile_builder(name, tag):
    name_tagged = name + '-' + tag

    m = MakefileBuilder()

    m.section_break(name)
    m.target(target='$(branch-output)/latex/' + name + '.tex',
             dependency='latex')
    m.job('sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@')
    m.message('[latex]: fixing $@ TeX from the Sphinx output.')

    m.target(target='$(branch-output)/latex/' + name_tagged + '.tex',
             dependency='$(branch-output)/latex/' + name + '.tex')
    m.job('$(PYTHONBIN) $(build-tools)/copy-if-needed.py -i $< -o $@ -b pdf')

    m.target(target='$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf',
             dependency='$(branch-output)/latex/' + name_tagged + '.pdf')
    m.job('cp $< $@')
    m.message('[build]: migrated $@')

    m.target(target='$(public-branch-output)/' + name_tagged + '.pdf',
             dependency='$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf')
    m.job('$(build-tools)/create-link $(notdir $<) $(notdir $@) $@')

    m.comment('adding ' + name + '.pdf to the build dependency.')
    m.append_var('PDF_OUTPUT', '$(public-branch-output)/' + name_tagged + '.pdf')

    return m.makefile

class MongoDBManualPdfMakefile(object):
    def __init__(self, makefile=[]):
        self.makefile = makefile
        for pdfs in pdfs_to_build:
            for item in makefile_builder(pdfs[0], pdfs[1]):
                self.makefile.append(item)

        self.makefile.append('\n')
        self.makefile.append('manual-pdfs:$(PDF_OUTPUT)')

    def print_content(self):
        for line in self.makefile:
            print(line.rstrip('\n'))

    def write(self, filename):
        with open(filename, 'w') as f:
            for line in self.makefile:
                f.write(line)
            f.write('\n')
        print('[meta-build]: built "' + sys.argv[1] + '" to specify pdf builders.' )

def main():
    output = []

    makefile = MongoDBManualPdfMakefile()
    makefile.write(sys.argv[1])

if __name__ == '__main__':
    main()

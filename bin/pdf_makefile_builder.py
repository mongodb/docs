#!/usr/bin/python

import sys

TARGET = '\n'
JOB = '\n\t'

pdfs_to_build = [
#    (root-name, tag)
    ('MongoDB', 'manual'),
    ('MongoDB-reference', 'manual'),
    ('MongoDB-use-cases', 'guide'),
]

def makefile_target(name, tag):
    name_tagged = name + '-' + tag

    makefile_contents = (      
        TARGET + '$(branch-output)/latex/' + name + '.tex:latex' + 
        JOB + '@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@' +
        JOB + '@echo [latex]: fixing $@ TeX from the Sphinx output.' +
        TARGET + '$(branch-output)/latex/' + name_tagged + '.tex:$(branch-output)/latex/' + name + '.tex' +
        JOB + '@$(PYTHONBIN) bin/copy-if-needed.py -i $< -o $@ -b pdf' +
        TARGET + '$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf:$(branch-output)/latex/' + name_tagged + '.pdf' +
        JOB + '@cp $< $@' + 
        JOB + '@echo [build]: migrated $@' +
        TARGET + '$(public-branch-output)/' + name_tagged + '.pdf:$(public-branch-output)/' + name_tagged + '-$(current-branch).pdf' + 
        JOB + '@bin/create-link $(notdir $<) $(notdir $@) $@'  
        )

    return makefile_contents

def main(): 
    output = []

    for pdfs in pdfs_to_build: 
        output.append(makefile_target(pdfs[0], pdfs[1]))
        output.append('\n\n')

    with open(sys.argv[1], 'w') as f: 
        for line in output:
            f.write(line)

    print('[meta-build]: built "' + sys.argv[1] + '" to specify pdf builders.' )

if __name__ == '__main__':
    main()

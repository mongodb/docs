#!/usr/bin/python
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from docs_meta import get_manual_path, MANUAL_BRANCH, render_paths, GENERATED_MAKEFILES
from makecloth import MakefileCloth
m = MakefileCloth()

def generate_meta():
    m.section_break('branch/release meta', block='rel')
    m.var('manual-branch', MANUAL_BRANCH, block='rel')
    m.var('current-branch', str(utils.get_branch()), block='rel')
    m.var('last-commit', str(utils.get_commit()), block='rel')
    m.var('current-if-not-manual', str(get_manual_path()), block='rel')

    paths = render_paths(True)

    m.section_break('file system paths', block='paths')
    m.var('output', paths['output'], block='paths')
    m.var('public-output', paths['public'], block='paths')
    m.var('branch-output', paths['branch-output'], block='paths')
    m.var('rst-include', paths['includes'], block='paths')
    m.var('branch-source', paths['branch-source'], block='paths')
    m.var('public-branch-output', paths['branch-staging'], block='paths')

    generated_makefiles = []

    m.newline()
    for target in GENERATED_MAKEFILES:
        file ='/'.join([paths['output'], "makefile." + target])
        cloth = '/'.join([paths['tools'], "makecloth", target + '.py'])
        
        generated_makefiles.append(file)
        m.raw(['-include ' + paths['output'] + '/makefile.' + target])

        m.target(target=file, dependency=cloth, block='makefiles')
        m.job(' '.join(["$(PYTHONBIN)", cloth, file]))
        m.newline()

    m.newline()

    m.target('.PHONY',  generated_makefiles)

def main():
    generate_meta()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to seed build metadata.')

if __name__ == '__main__':
    main()

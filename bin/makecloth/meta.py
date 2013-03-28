#!/usr/bin/python
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import docs_meta as docs_meta
from makecloth import MakefileCloth
m = MakefileCloth()

def generate_meta():
    m.section_break('branch/release meta', block='rel')
    m.var('manual-branch', docs_meta.MANUAL_BRANCH, block='rel')
    m.var('current-branch', str(docs_meta.get_branch()), block='rel')
    m.var('last-commit', str(docs_meta.get_commit()), block='rel')
    m.var('current-if-not-manual', str(docs_meta.get_manual_path()), block='rel')

    paths = docs_meta.render_paths(True)

    m.section_break('file system paths', block='paths')
    m.var('output', paths['output'], block='paths')
    m.var('public-output', paths['public'], block='paths')
    m.var('branch-output', paths['branch-output'], block='paths')
    m.var('rst-include', paths['includes'], block='paths')
    m.var('branch-source', paths['branch-source'], block='paths')
    m.var('public-branch-output', paths['branch-staging'], block='paths')

def main():
    generate_meta()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to seed build metadata.')

if __name__ == '__main__':
    main()

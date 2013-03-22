#!/usr/bin/python
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import mongodb_docs_meta as mongo_meta
from makecloth import MakefileCloth
m = MakefileCloth()

def generate_meta():
    m.section_break('branch/release meta', block='rel')
    m.var('manual-branch', mongo_meta.MANUAL_BRANCH, block='rel')
    m.var('current-branch', str(mongo_meta.get_branch()), block='rel')
    m.var('last-commit', str(mongo_meta.get_commit()), block='rel')
    m.var('current-if-not-manual', str(mongo_meta.get_manual_path()), block='rel')

    m.section_break('file system paths', block='paths')
    m.var('public-output', '$(output)/public', block='paths')
    m.var('branch-output', '$(output)/$(current-branch)', block='paths')
    m.var('branch-source', '$(branch-output)/branch-source')
    m.var('branch-source-current', '$(branch-source)-current')
    m.var('public-branch-output', '$(public-output)/$(current-branch)', block='paths')

def main():
    generate_meta()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to seed build metadata.')

if __name__ == '__main__':
    main()

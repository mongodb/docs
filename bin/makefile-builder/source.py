#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
m = MakefileBuilder()

def generate_cache():
    m.section_break('sphinx prerequisites')
    m.target('sphinx-prerequisites', 'setup generate-source $(branch-output)/conf.py $(branch-output)/bin $(branch-output)/meta.yaml bin/meta.yaml ', block='prereq')
    m.msg('[sphinx-prep]: completed $@ buildstep.', block='prereq')

    m.target('generate-source', '$(branch-source)', block='prereq')

    m.target('$(branch-output)/source.tar', '$(branch-output)', block='prereq')
    m.job('git archive --prefix=source/ -o $(branch-output)/source.tar $(current-branch):source/', block='prereq')
    m.msg('[sphinx-prep]: generated $(branch-output)/source.tar from git', block='prereq')

    m.target('$(branch-source)', '$(branch-output)/source.tar tables installation-guides intersphinx generate-manpages', block='prereq')
    m.job('mkdir -p $@', block='prereq')
    m.msg('[sphinx-prep]: created $@', block='prereq')
    m.job('$(TARBIN) -U  -C $(branch-output) --no-overwrite-dir --keep-newer-files -xf $(branch-output)/source.tar')
    m.job('rsync --ignore-times --recursive --times --delete source/ $(branch-source)', block='prereq')
    m.job('bin/backfill-source-cache source/ $(branch-source)')
    m.msg('[sphinx-prep]: updated source in $(branch-source)', block='prereq')

    m.target('$(branch-output)/conf-tmp.py', block='prereq')
    m.job('git show $(current-branch):conf.py > $@', block='prereq')
    m.msg('[sphinx-prep]: checked out $(current-branch):conf.py for build.')

    m.target('$(branch-output)/bin', block='prereq')
    m.job('rm -f $@', ignore=True, block='prereq')
    m.job('cd $(branch-output) ; ln -s "../../bin"', block='prereq')
    m.msg('[sphinx-prep]: created $@ link')

    m.target('$(branch-output)/conf.py', '$(branch-output)/conf-tmp.py', block='prereq')
    m.job('$(PYTHONBIN) $(build-tools)/copy-if-needed.py -i $< -o $@ -b sphinx-prep', block='prereq')
    m.job('rm -f $<', ignore=True, block='prereq')
    m.msg('[sphinx-prep]: updated cached $@ build file', block='prereq')

def main():
    generate_cache()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to maintain the source cache.')

if __name__ == '__main__':
    main()

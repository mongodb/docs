#!/usr/bin/python

import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import mongodb_docs_meta as mongo_meta
from makecloth import MakefileCloth
from builder_data import sphinx

m = MakefileCloth()

def build_platform_notification(title, content):
    if sys.platform.startswith('darwin'):
        return 'growlnotify -n "mongodb-doc-build" -a "Terminal.app" -m %s -t %s' % (title, content)
    if sys.platform.startswith('linux'):
        return 'notify-send "%s" "%s"' % (title, content)

def generate_delegated_interface():
    branches = mongo_meta.PUBLISHED_BRANCHES
    current_branch = mongo_meta.get_branch()

    if current_branch not in branches:
        branches.append(current_branch)

    builders = sphinx
    builders.append('publish')
    builders.append('push')
    builders.append('stage')

    targets = []

    for branch in branches:
        m.section_break(branch, block=branch)
        m.newline(block=branch)
        for target in builders:

            for sync in [ ('foreground', '--wait'), ('background', '') ]:

                build_target = 'delegated-%s-%s-%s' % ( branch, target, sync[0])
                targets.append(build_target)

                m.target(target=build_target,  block=branch)

                m.job(job=('$(PYTHONBIN) bin/delegated-build --branch %s --target %s %s'
                           % ( branch, target, sync[1])),
                      block=branch)

                if sync[0] == 'background':
                    m.job(job=build_platform_notification('build complete', ' '.join([branch, target])),
                          ignore=True, block=branch)

            m.newline(block=branch)

    m.section_break('meta section', block='meta')
    m.newline()
    m.target('.PHONY', ' '.join(targets), block='meta')

def main():
    generate_delegated_interface()

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" for a delegated UI build system.')

if __name__ == '__main__':
    main()

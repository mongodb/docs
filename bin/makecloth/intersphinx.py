#!/usr/bin/python
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from makecloth import MakefileCloth
from conf import intersphinx_mapping
import docs_meta

paths = docs_meta.render_paths('dict')
m = MakefileCloth()

def intersphinx_builders():
    invs = []
    for i in intersphinx_mapping:
        output = '{0}/{1}.inv'.format(paths['output'], i)
        m.target(output, block=i)
        m.job('@fab {0}.url:{1}objects.inv {0}.file:{2} {0}.download'.format('intersphinx', intersphinx_mapping[i][0], output), block=i)
        m.newline(block=i)
        invs.append(output)

    m.newline(block='control')
    m.target('intersphinx', invs, block='control')

    invs = ' '.join(invs)
    m.target('clean-intersphinx', block='control')
    m.job('rm -f ' + invs, block='control')
    m.msg('[intersphinx]: all existing intersphinx inv files removed.', block='control')
    m.target('.PHONY', 'intersxpinx clean-intersphinx ' + invs, block='control')

def main():
    intersphinx_builders()
    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify intersphinx downloads.')

if __name__ == '__main__':
    main()

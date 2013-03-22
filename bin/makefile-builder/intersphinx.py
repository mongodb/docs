#!/usr/bin/python
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.getcwd())))

from makefile_builder import MakefileBuilder
from conf import intersphinx_mapping

m = MakefileBuilder()

def intersphinx_builders():
    for i in intersphinx_mapping:
        output = '$(output)/%s.inv' % i
        m.target(output, block=i)
        m.job('@$(PYTHONBIN) bin/intersphinx-download.py $@ ' + intersphinx_mapping[i][0] + 'objects.inv', block=i)
        m.append_var('intersphinx-libraries', output, block=i)
        m.newline(block=i)

    m.newline(block='control')
    m.target('intersphinx', '$(intersphinx-libraries)', block='control')
    m.target('clean-intersphinx', block='control')
    m.job('rm -f $(intersphinx-libraries)', block='control')
    m.msg('[intersphinx]: all existing intersphinx inv files removed.', block='control')
    m.target('.PHONY', 'intersxpinx clean-intersphinx $(intersphinx-libraries)', block='control')

def main():
    intersphinx_builders()
    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify intersphinx downloads.')

if __name__ == '__main__':
    main()

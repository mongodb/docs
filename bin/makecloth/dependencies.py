#!/usr/bin/python

import sys
import os.path 
from itertools import groupby
from operator import itemgetter
import re

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def generate_dependency_rules(rules):
    composites = []

    for t, d in groupby(rules, key=itemgetter('target')):
        dependency = []
        for i in d:
            dependency.append(i['dep'])

        m.target(t, dependency, block='deps')
        m.job('touch {0}'.format(t), block='deps')
        m.msg('[dependency]: restating {0} because its included files changed'.format(t), block='deps')

        m.append_var('composites', t, block='deps')

        m.newline(block='deps')

    m.target('composites', '$(composites)', block='meta')

def main():
    conf_file = sys.argv[2]
    generate_dependency_rules(utils.ingest_json(conf_file))

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify dependencies on included files.')

if __name__ == '__main__':
    main()

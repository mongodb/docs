#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils as util
from makecloth import MakefileCloth

m = MakefileCloth()

def make_toc():
    inputs = [i for i in util.expand_tree('./source/includes') if i.startswith('./source/includes/ref-toc-') ]

    for document in inputs:
        document = document[2:]

        base_name = document.rsplit('/', 1)[1].rsplit('.', 1)[0][8:]
        
        m.section_break(document)
        
        table_target = 'source/includes/table-' + base_name + '.rst'
        m.append_var('ref-toc-output', table_target, block=base_name)
        m.target(target=table_target,
                 dependency=[document, 'bin/rstcloth/toc.py'], block=base_name)
        m.job('$(PYTHONBIN) bin/rstcloth/toc.py $< --table $@', block=base_name)
        m.msg('[toc-builder]: built table file for %s' % base_name, block=base_name)

        m.newline()
        toc_target = 'source/includes/toc-' + base_name + '.rst'
        m.append_var('ref-toc-output', toc_target, block=base_name)
        m.target(target=toc_target,
                 dependency=[document, 'bin/rstcloth/toc.py'], block=base_name)
        m.job('$(PYTHONBIN) bin/rstcloth/toc.py $< --contents $@', block=base_name)
        m.msg('[toc-builder]: built toctree file for %s' % base_name, block=base_name)

    m.section_break('meta')
    m.target('.PHONY', ['clean-ref-toc', 'ref-toc', 'reftoc', 'clean-reftoc'], block='meta')
    m.target(['ref-toc', 'reftoc'], '$(ref-toc-output)', block='meta')
    m.target(['clean-ref-toc', 'clean-reftoc'], block='meta')
    m.job('rm -f $(ref-toc-output)', ignore=True)
    m.msg('[toc-builder]: cleaned all ref-toc build products.')
    
def main():
    make_toc()

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify reference toc data builders.')


if __name__ == '__main__':
    main()

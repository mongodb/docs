#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as util
from makecloth import MakefileCloth

m = MakefileCloth()

def make_toc(sources):
    for target in sources:
        document = target[0]
        output_format = target[1]

        if document.startswith('./source/includes/ref-toc-'):
            base_name = document.rsplit('/', 1)[1].rsplit('.', 1)[0][8:]
        if document.startswith('./source/includes/toc-'):
            base_name = document.rsplit('/', 1)[1].rsplit('.', 1)[0][4:]

        document = document[2:]

        m.section_break(document)

        if output_format == 'table':
            table_target = 'source/includes/table-' + base_name + '.rst'
            m.append_var('toc-output', table_target, block=base_name)
            m.target(target=table_target,
                     dependency=[document, 'bin/rstcloth/toc.py'], block=base_name)
            m.job('$(PYTHONBIN) bin/rstcloth/toc.py $< --table $@', block=base_name)
            m.msg('[toc-builder]: built table file for %s' % base_name, block=base_name)
            m.newline()

        if output_format == 'dfn':
            table_target = 'source/includes/dfn-list-' + base_name + '.rst'
            m.append_var('toc-output', table_target, block=base_name)
            m.target(target=table_target,
                     dependency=[document, 'bin/rstcloth/toc.py'], block=base_name)
            m.job('$(PYTHONBIN) bin/rstcloth/toc.py $< --dfn $@', block=base_name)
            m.msg('[toc-builder]: built definition list file for %s' % base_name, block=base_name)
            m.newline()

        toc_target = 'source/includes/toc-' + base_name + '.rst'
        m.append_var('toc-output', toc_target, block=base_name)
        m.target(target=toc_target,
                 dependency=[document, 'bin/rstcloth/toc.py'], block=base_name)
        m.job('$(PYTHONBIN) bin/rstcloth/toc.py $< --contents $@', block=base_name)
        m.msg('[toc-builder]: built toctree file for %s' % base_name, block=base_name)
        m.newline()

def generate_footer():
    m.section_break('meta')
    m.target('.PHONY', ['clean-toc', 'toc'], block='meta')
    m.target('toc', '$(toc-output)', block='meta')
    m.target(['clean-toc', 'clean-reftoc'], block='meta')
    m.job('rm -f $(toc-output)', ignore=True)
    m.msg('[toc-builder]: cleaned all toc build products.')

def collect_source_files():
    output = []

    for i in util.expand_tree('./source/includes', 'yaml'):
        if i.startswith('./source/includes/ref-toc-'):
            output.append((i, 'table'))
        if i.startswith('./source/includes/toc-'):
            output.append((i, 'dfn'))

    return output

def main():
    sources = collect_source_files()
    make_toc(sources)

    generate_footer()
    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify reference toc builders.')


if __name__ == '__main__':
    main()

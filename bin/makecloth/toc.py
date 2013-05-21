#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def make_toc(sources):
    toc_targets = []

    for target in sources:
        document = target[0]
        output_format = target[1]

        if document.startswith('./source/includes/ref-toc-'):
            base_name = document.rsplit('/', 1)[1].rsplit('.', 1)[0][8:]
        if document.startswith('./source/includes/toc-'):
            base_name = document.rsplit('/', 1)[1].rsplit('.', 1)[0][4:]

        document = document[2:]

        m.section_break(document)
        command = '$(PYTHONBIN) bin/rstcloth/toc.py {0} '
        generator = 'bin/rstcloth/toc.py'

        if output_format == 'table':
            table_target = 'source/includes/table-' + base_name + '.rst'
            toc_targets.append(table_target)

            command += '--sort '

            m.target(target=table_target, dependency=[document, generator], block=base_name)
            table_command = command + '--table {1}'
            m.job(table_command.format(document, table_target), block=base_name)
            m.msg('[toc]: built table file for %s' % base_name, block=base_name)
            m.newline()

        if output_format == 'dfn':
            dfn_target = 'source/includes/dfn-list-' + base_name + '.rst'
            toc_targets.append(dfn_target)

            m.target(target=dfn_target, dependency=[document, generator], block=base_name)
            dfn_command = command + '--dfn {1}'
            m.job(dfn_command.format(document, dfn_target), block=base_name)
            m.msg('[toc]: built definition list file for %s' % base_name, block=base_name)
            m.newline()

        toc_target = 'source/includes/toc-' + base_name + '.rst'
        toc_targets.append(toc_target)

        m.target(target=toc_target, dependency=[document, generator], block=base_name)
        contents_command = command + '--contents {1}'

        m.job(contents_command.format(document, toc_target), block=base_name)
        m.msg('[toc]: built toctree file for %s' % base_name, block=base_name)
        m.newline()

    generate_footer(toc_targets)


def generate_footer(targets):
    m.section_break('meta')
    m.target('.PHONY', ['clean-toc', 'toc'], block='meta')
    m.target('toc', targets, block='meta')
    
    m.newline()
    m.target('clean-toc', block='meta')
    m.job('rm -f ' + ' '.join(targets), ignore=True)
    m.msg('[toc]: cleaned all toc build products.')

def collect_source_files():
    output = []

    for i in utils.expand_tree('./source/includes', 'yaml'):
        if i.startswith('./source/includes/ref-toc-'):
            output.append((i, 'table'))
        if i.startswith('./source/includes/toc-'):
            output.append((i, 'dfn'))

    return output

def main():
    sources = collect_source_files()
    make_toc(sources)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify reference toc builders.')


if __name__ == '__main__':
    main()

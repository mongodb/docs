#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import tables as tables_to_build

# to add a table to the build process, add a tuple to the ``tables`` list in the builder definition file. 

m = MakefileBuilder()

def build_all_tables(tables):
    m.comment('each table is compiled into rst from a yaml file using the table_builder.py file.', block='header')
    m.newline(block='header')

    for table in tables:
        makefile_table(table[0], table[1])

    m.comment('meta-targets for testing/integration with rest of the build. must apear at the end', block='footer')
    m.newline(block='footer')

    m.target('.PHONY', 'tables clean-tables', block='footer')
    m.target('tables', '$(output-tables)', block='footer')
    m.job('git update-index --assume-unchanged', ignore=True, block='footer')
    m.msg('[tables]: clensing git index of compiled tables', block='footer')
    m.newline(block='footer')
    m.target('clean-tables', block='footer')
    m.job('rm -rf $(output-tables)', True)

def makefile_table(name, block):
    m.append_var('output-tables', name + '.rst', block)
    m.target(name  + '.rst', name + '.yaml' , block)
    m.job('$(PYTHONBIN) bin/table_builder.py $< $@', block)
    m.msg('[table-builder]: \(re\)generate $@ table for inclusion in build', block)
    m.newline(block=block)

def main():
    build_all_tables(tables_to_build)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify table builders.')

if __name__ == '__main__':
    main()

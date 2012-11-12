#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder

# to add a table to the build process, add a tuple to the ``tables_to_build`` list.

tables_to_build = [
#    (input_file, output_file, makefile_block)
     ('$(rst-include)/table-sql-to-agg-terms.yaml', '$(rst-include)/table-sql-to-agg-terms.rst', 'agg'),
     ('$(rst-include)/table-sql-to-agg-examples.yaml','$(rst-include)/table-sql-to-agg-examples.rst', 'agg'),
     ('$(rst-include)/table-sql-to-mongo-executables.yaml', '$(rst-include)/table-sql-to-mongo-executables.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-terms.yaml', '$(rst-include)/table-sql-to-mongo-terms.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-schema-examples.yaml', '$(rst-include)/table-sql-to-mongo-schema-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-insert-examples.yaml', '$(rst-include)/table-sql-to-mongo-insert-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-select-examples.yaml', '$(rst-include)/table-sql-to-mongo-select-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-update-examples.yaml', '$(rst-include)/table-sql-to-mongo-update-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-delete-examples.yaml', '$(rst-include)/table-sql-to-mongo-delete-examples.rst', 'sql'),
]

m = MakefileBuilder()

def build_all_tables(tables):
    m.comment('each table is compiled into rst from a yaml file using the table_builder.py file.', block='header')
    m.newline(block='header')

    for table in tables:
        makefile_table(table[0], table[1], table[2])

    m.comment('meta-targets for testing/integration with rest of the build. must apear at the end', block='footer')
    m.newline(block='footer')

    m.target('.PHONY', 'tables clean-tables', block='footer')
    m.target('tables', '$(output-tables)', block='footer')
    m.job('git update-index --assume-unchanged', block='footer')
    m.msg('[build]: clensing git index of compiled tables', block='footer')
    m.newline(block='footer')
    m.target('clean-tables', block='footer')
    m.job('rm -rf $(output-tables)', True)

def makefile_table(input, output, block):
    m.append_var('output-tables', output, block)
    m.target(output, input, block)
    m.job('$(PYTHONBIN) bin/table_builder.py $< $@', block)
    m.msg('[table-builder]: \(re\)generate $@ table for inclusion in build', block)
    m.newline(block=block)

def main():
    build_all_tables(tables_to_build)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify table builders.')

if __name__ == '__main__':
    main()

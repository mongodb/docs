#!/usr/bin/python2

import yaml
import textwrap
import argparse
import table_builder as tb

def fill(string, first=0, hanging=0, width=72):
    first_indent = ' ' * first
    hanging_indent = ' ' * hanging

    return textwrap.fill(string,
                         width=width,
                         initial_indent=first_indent,
                         subsequent_indent=hanging_indent)

class ReferenceTable(tb.TableData):
    def __init__(self, header, rows):
        self.header = header
        self.rows = rows

class ReferenceToc(object):
    def __init__(self, filename):
        self.spec = self._process_spec(filename)
        self._process_data()

        self.output = { 'contents': self.toc_output}
        self.table_header = [ ['Name'], ['Description'] ]

    def _process_spec(self, spec):
        r = []

        with open(spec, 'r') as f:
            data = yaml.load_all(f)

            for datum in data:
                if datum['description'] is None:
                    datum['description'] = ''

                r.append(datum)

        r.sort(key=lambda r: r['name'])

        return r

    def _process_data(self):

        self.toc_output = [
            '.. class:: hidden', '',
            fill('.. toctree::', 3),
            fill(':titlesonly:', 6), '']
        self.table_rows = []

        row = 1
        for ref in self.spec:
            self.toc_output.append(fill(ref['file'], 6))
            self.table_rows.append( { row: [ ref['name'], fill(ref['description'], width=64) ] } )
            row += 1

    def echo(self, output):
        for line in self.output[output]:
            print(line)

    def write(self, output, filename):
        with open(filename, 'w') as f:
            for line in self.output[output]:
                f.write(line + '\n')

def user_input():
    parser = argparse.ArgumentParser('.htaccess generator.')

    parser.add_argument('filename', nargs='?',
                        help='the input data file.')
    parser.add_argument('--table', '-t', action='store', default=None,
                        help='output filename for table.')
    parser.add_argument('--contents', '-c', action='store', default=None,
                        help='output filename for toctree.')

    return parser.parse_args()

def main():
    ui = user_input()

    toc = ReferenceToc(ui.filename)

    if ui.table:
        table = ReferenceTable(toc.table_header, toc.table_rows)

        t = tb.TableBuilder(tb.RstTable(table))

        t.write(ui.table)

    if ui.contents:
        toc.write('contents', ui.contents)

if __name__ == '__main__':
    main()

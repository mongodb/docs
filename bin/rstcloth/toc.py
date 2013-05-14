#!/usr/bin/python2

import yaml
import textwrap
import argparse
import table as tb
from rstcloth import RstCloth, fill

class ReferenceToc(object):
    def __init__(self, filename):
        self.table = tb.TableData()
        self.content = RstCloth()

        self.spec = self._process_spec(filename)
        self._process_data()

    def _process_spec(self, spec):
        o = []

        with open(spec, 'r') as f:
            data = yaml.load_all(f)

            for datum in data:
                if datum['description'] is None:
                    datum['description'] = ''

                o.append(datum)

        o.sort(key=lambda o: o['name'])

        return o

    def _process_data(self):
        self.table.add_header(['Name', 'Description'])

        self.content.directive('class', 'hidden', block='toc')
        self.content.newline(block='toc')
        self.content.directive('toctree', fields=[('titlesonly', '')], indent=3, block='toc')
        self.content.newline(block='toc')

        for ref in self.spec:
            self.content.content(ref['file'], 6, block='toc')
            self.table.add_row([ ref['name'], ref['description'] ])

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
        t = tb.TableBuilder(tb.RstTable(toc.table))
        t.write(ui.table)

    if ui.contents:
        toc.content.write(ui.contents)

if __name__ == '__main__':
    main()

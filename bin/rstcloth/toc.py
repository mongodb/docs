#!/usr/bin/python2

import yaml
import textwrap
import argparse
import table as tb
from rstcloth import RstCloth, fill

class CustomTocTree(object):
    def __init__(self, filename, sort=False):
        self.spec = self._process_spec(filename, sort)

        self.table = None
        self.contents = None
        self.dfn = None

    def build_table(self):
        self.table = tb.TableData()
        self.table.add_header(['Name', 'Description'])

    def build_dfn(self):
        self.dfn = RstCloth()

    def build_contents(self):
        self.contents = RstCloth()
        self.contents.directive('class', 'hidden')
        self.contents.newline()
        self.contents.directive('toctree', fields=[('titlesonly', '')], indent=3)
        self.contents.newline()

    def _process_spec(self, spec, sort=False):
        o = []

        with open(spec, 'r') as f:
            data = yaml.load_all(f)

            for datum in data:
                if datum['description'] is None:
                    datum['description'] = ''

                if sort is False:
                    pass
                elif 'name' not in datum: 
                    sort = False

                o.append(datum)

        if sort is True: 
            o.sort(key=lambda o: o['name'])

        return o

    def finalize(self):
        for ref in self.spec:
            if self.table is not None:
                self.table.add_row([ ref['name'], ref['description'] ])
            if self.contents is not None:
                self.contents.content(ref['file'], 6, block='toc')
            if self.dfn is not None:
                if 'name' in ref:
                    text = ref['name']
                else:
                    text = None

                link = self.dfn.role('doc', ref['file'], text)
                self.dfn.definition(link, ref['description'], bold=False)
                self.dfn.newline()

def user_input():
    parser = argparse.ArgumentParser('table of contents generator.')

    parser.add_argument('filename', nargs='?',
                        help='the input data file.')
    parser.add_argument('--table', '-t', action='store', default=False,
                        help='output filename for table.')
    parser.add_argument('--contents', '-c', action='store', default=False,
                        help='output filename for toctree.')
    parser.add_argument('--dfn', '-d', action='store', default=False,
                        help='output filename for definition list.')
    parser.add_argument('--sort', '-s', action='store_true', default=False,
                        help='sort items in toc output filename for lists.')

    return parser.parse_args()

def main():
    ui = user_input()

    toc = CustomTocTree(ui.filename)

    if ui.dfn:
        toc.build_dfn()
    if ui.contents:
        toc.build_contents()
    if ui.table:
        toc.build_table()

    toc.finalize()

    if ui.dfn:
        toc.dfn.write(ui.dfn)
    if ui.contents:
        toc.contents.write(ui.contents)
    if ui.table:
        t = tb.TableBuilder(tb.RstTable(toc.table))
        t.write(ui.table)

if __name__ == '__main__':
    main()

#!/usr/bin/python2

import yaml
import textwrap
import argparse 

def fill(string, first=0, hanging=0):

    first_indent = ' ' * first
    hanging_indent = ' ' * hanging

    return textwrap.fill(string, 
                         width=72, 
                         initial_indent=first_indent, 
                         subsequent_indent=hanging_indent)

class ReferenceToc(object):
    def __init__(self, filename):
        self.spec = self._process_spec(filename)
        self.output = self._process_data()

    def _process_spec(self, spec):
        r = []

        with open(spec, 'r') as f:
            data = yaml.load_all(f)

            for datum in data: 
                if datum['description'] == None:
                    datum['description'] = ''

                r.append(datum)

        r.sort(key=lambda r: r['name'])

        return r

    def _process_data(self):
        o = { 'contents': ['.. toctree::', fill(':titlesonly:', 3), ''],
              'table': ['.. list-table::', fill(':header-rows: 1', 3), '', 
                        fill('* - Name', 3), fill('- Description', 5), ''], }

        BREAK = '\n'

        for ref in self.spec:
            o['contents'].append(fill(ref['file'], 3))
            o['table'].append(fill('* - ' + ref['name'], 3, 5) + BREAK +
                              fill('- ' + ref['description'], 5, 7) + BREAK)

        return o

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
        toc.write('table', ui.table)
    
    if ui.contents:
        toc.write('contents', ui.contents)


if __name__ == '__main__':
    main()

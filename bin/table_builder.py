# Copyright 2012-2013 10gen, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Authors: Sam Kleinman, Kay Kim

import sys
import argparse
import string
import textwrap

import yaml

def normalize_cell_height(rowdata):
    """
    Normalize cells in the rowdata so that each cell has the same height;
    more specifically, ensure that each cell data list spans the same number of
    lines when printed as others in the row. Mutates 'rowdata' in place by only
    appeneding rather than resetting the reference.
    """
    maxlines = max([ len(cell) for cell in rowdata])

    for cell in rowdata:
        for x in range(maxlines - len(cell)):
            cell.append( ' '  )


def fill(string, first=0, hanging=0):
    first_indent = ' ' * first
    hanging_indent = ' ' * hanging

    return textwrap.fill(string,
                         width=72,
                         initial_indent=first_indent,
                         subsequent_indent=hanging_indent)


###################################
#
# Generating parts of the table.

class TableData(object):
    def parse_table(self, layout, meta, content):
        if hasattr(meta, 'format'):
            self.format = meta.format

        if layout.header:
            header = []
            for cell in layout.header:
                header.append([eval(cell)])
        else:
            header = None

        self.header = header

        rows = []
        for rownum in layout.rows:
            parsed_cells = []
            for cell in rownum.items()[0][1]:
                parsed_cells.append(eval(cell))
            rows.append( dict(zip(rownum.keys(), [parsed_cells])) )

        self.rows = rows

class YamlTable(TableData):
    def __init__(self, inputfile):
        self.inputfile = inputfile
        self.format = None

        layout, meta, content = self.read_data(inputfile)
        self.parse_table(layout, meta, content)

    def read_data(self, datafile):
        with open(datafile, "rt") as f:
            parsed = yaml.load_all(f)
            layout = dict2obj(parsed.next())
            meta = dict2obj(parsed.next())
            content = dict2obj(parsed.next())

        if layout.section != 'layout':
            exit('layout document in "' + datafile + '" is malformed.')
        elif meta.section != 'meta':
            exit('meta document in "' + datafile + '" is malformed.')
        elif content.section != 'content':
            exit('content document in "' + datafile + '" is malformed.')

        return layout, meta, content

###################################
#
# Reading and processing input, and rendering table.

class dict2obj(object):
    """
    Converts a dict (from yaml, in this case) into a Python object.
    """

    def __init__(self, d):
        self.__dict__['d'] = d

    def __getattr__(self, key):
        value = self.__dict__['d'][key]
        if type(value) == type({}):
            return dict2obj(value)

        return value

###################################
#
# Interaction

class OutputTable(object):
    pass

class RstTable(OutputTable):
    def __init__(self, imported_table):
        self.columnwidths = []
        self.tempcolumnwidths = []

        self.table = imported_table

        self.process_table_content()
        self.output = self.render_table()

    ###################################
    #
    # Flexibility for tables of different sizes.

    def _check_column_width(self, rowdata):
        """
        Compares the cell widths of the row with the curren max cell
        width in the global variables. Then updates
        ``tempcolumnwidths``. ``tempcolumnwidths`` variable maintains
        the running max width of each column.
        """

        thisrowwidths = [ max([len(line) for line in cell ]) for cell in rowdata]

        if len(self.tempcolumnwidths) == 0:
            self.tempcolumnwidths.append(thisrowwidths)
        else:
            currentmaxwidths = self.tempcolumnwidths.pop()
            self.tempcolumnwidths.append([ max(currentmaxwidths[i], thisrowwidths[i]) for i in range(len(currentmaxwidths))])

    ###################################
    #
    # Building the table representation

    def _get_row_line(self, delim='-'):
        """
        Produces and returns row deliminiters for restructured text tables.
        """
        return '+' + delim + str(delim + '+' + delim).join([ delim * width for width in self.columnwidths ]) + delim + '+'

    def _get_row(self, rowdata):
        """
        Returns rows given ``rowdata`` properly formated for restructured text tables.
        """
        rowlines = []
        for line in zip(*rowdata):
            if len(rowlines) > 0:
                rowlines.append('\n')
            rowlines.append( '| ' + ' | '.join([ line[idx].ljust(self.columnwidths[idx]) for idx in range(len(line)) ]) + ' |' )

        return ''.join(rowlines)

    def process_table_content(self):
        self.table_data = []

        # Compare cell widths of the header  with the
        # max cell widths stored in the global var tempcolumnwidths
        # and swap out value(s) if necessary.
        if self.table.header is not None:
            self._check_column_width(self.table.header)

        for index in range(len(self.table.rows)):
            parsed_row = []

            # Append each cell to the parsed_row list, breaking multi-line
            # cell data as needed.
            for cell in self.table.rows[index][index + 1]:
                parsed_row.append(cell.split('\n'))

            # process the data to ensure the table is big enough.
            self._check_column_width(parsed_row)
            normalize_cell_height(parsed_row)

            # add the processed data to the table
            self.table_data.append(parsed_row)

        # Set the global variable columnwidths to the flattened out
        # tempcolumnwidths
        for cellwidth in self.tempcolumnwidths.pop():
            self.columnwidths.append(cellwidth)

    def render_table(self):
        o = []
        o.append(self._get_row_line())

        if self.table.header is not None:
            o.append(self._get_row(self.table.header))
            o.append(self._get_row_line('='))

        for row in self.table_data:
            o.append(self._get_row(row))
            o.append(self._get_row_line())

        return o


###################################
#
# Outputs a list-table

class ListTable(OutputTable):
    def __init__(self, imported_table):
        self.table = imported_table
        self.output = self.render_table()

    def render_table(self):
        o = ['.. list-table::']

        if self.table.header is not None:
            o.append(fill(':header-rows: 1'), 3)

        o.append('')

        for row in self.table.rows:
            r = row.popitem()[1]

            o.append(fill('* - ' + r[0], 3))

            for cell in r[1:]:
                o.append(fill('- ' + cell, 5, 7))
                o.append('')

        return o

class HtmlTable(OutputTable):
    def __init__(self, imported_table):
        self.tags = { 'tr': '<tr>',
            'th': '<th>',
            'td': '<td>',
            'table': '<table>'
            }

        self.table = imported_table
        self.output = self.render_table()

    def render_table(self):
        o = [self.tags['table']]

        if self.table.header is not None:
            o.append(self._process_html_row(self.tags['tr'], self.tags['th'], self.table.header) )

        for row in self.table.rows:
            o.append(self._process_html_row(self.tags['tr'], self.tags['td'], row.values()))

        o.append(self._get_ending_tag(self.tags['table']))
        return o

    def _process_html_row(self, tag, tagchild, rowdata):
        row=[]
        row.append(tag)
        row.append("\n")

        if tagchild is None:
            row.append(rowdata)
        else:
            for data in rowdata:
                for cell in data:
                    row.append(self._process_html_row(tagchild, None, cell))
                    row.append("\n")
        row.append("\n")
        row.append(self._get_ending_tag(tag))

        return ''.join(row)

    def _get_ending_tag(self, tag):
        return string.join(tag.split('<', 1), '</')

class TableBuilder(object):
    def __init__(self, table):
        self.output = table.output

    def write(self, outputfile=None):
        if outputfile is None:
            outputfile = get_default_outputfile(self.inputfile)

        with open(outputfile, 'w') as f:
            for line in self.output:
                f.write(line + '\n')

    def print_table(self):
        for line in self.output:
            print(line)

###################################
#
# Interface.

def get_outputfile(inputfile, outputfile):
    if outputfile is None:
        return inputfile.rsplit('.')[0] + '.rst'
    else:
        return outputfile

def user_input(formats):
    parser = argparse.ArgumentParser('YAML to (RST/HTML) Table Builder')
    parser.add_argument('input', nargs='?', help='path of source yaml file.')

    output_help = 'path of output file. by default, the input file name with an ".rst" extension.'
    parser.add_argument('output', nargs='?', default=None, help=output_help)
    parser.add_argument('--type', '-t', choices=formats, default='rst',
                        help='output table format.')

    return parser.parse_args()

def main():
    formats = { 'rst': RstTable,
                'list': ListTable,
                'html': HtmlTable }

    ui = user_input(formats.keys())

    table_data = YamlTable(ui.input)

    if table_data.format is None:
        table_data.format = ui.type

    table = TableBuilder(formats[table_data.format](table_data))

    table.write(get_outputfile(ui.input, ui.output))

if __name__ == '__main__':
    main()

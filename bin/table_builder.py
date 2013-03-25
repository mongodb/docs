# Copyright 2012 10gen, Inc.
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

import sys

try:
    import yaml
except ImportError:
    exit('[table-builder]: You must install PyYAML to build tables.')

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

def get_default_outputfile(inputfile):
    return inputfile.rsplit('.')[0] + '.rst'


###################################
#
# Generating parts of the table.

class YamlTable(object):
    def __init__(self, inputfile):
        self.columnwidths = []
        self.tempcolumnwidths = []
        self.read_data(inputfile)
        self.process_table_content()

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

        rows = { 'rows': [] }

        if layout.header:
            header = []
            for cell in layout.header:
                header.append([eval(cell)])
        else:
            header = None

        for rownum in layout.rows:
            parsed_cell = []
            for cell in rownum.items()[0][1]:
                parsed_cell.append(eval(cell))
            rows['rows'].append( dict(zip(rownum.keys(), [parsed_cell])) )

        # return header, rows
        self.header = header
        self.rows = rows


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

class RstTable(YamlTable):
    def __init__(self, inputfile):
        self.inputfile = inputfile
        super(RstTable, self).__init__(inputfile)
        self.output = self.render_table()

    ###################################
    #
    # Flexibility for tables of different sizes.

    def check_column_width(self, rowdata):
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

    def get_row_line(self, delim='-'):
        """
        Produces and returns row deliminiters for restructured text tables.
        """
        return '+' + delim + str(delim + '+' + delim).join([ delim * width for width in self.columnwidths ]) + delim + '+'

    def get_row(self, rowdata):
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
        self.tabledata = []

        # Compare cell widths of the header  with the
        # max cell widths stored in the global var tempcolumnwidths
        # and swap out value(s) if necessary.
        if self.header is not None:
            self.check_column_width(self.header)

        for index in range(len(self.rows['rows'])):
            parsed_row = []

            # Append each cell to the parsed_row list, breaking multi-line
            # cell data as needed.
            for cell in self.rows['rows'][index][index + 1]:
                parsed_row.append(cell.split('\n'))

            # process the data to ensure the table is big enough.
            self.check_column_width(parsed_row)
            normalize_cell_height(parsed_row)

            # add the processed data to the table
            self.tabledata.append(parsed_row)

        # Set the global variable columnwidths to the flattened out
        # tempcolumnwidths
        for cellwidth in self.tempcolumnwidths.pop():
            self.columnwidths.append(cellwidth)

    def render_table(self):
        o = []
        o.append(self.get_row_line())

        if self.header is not None:
            o.append(self.get_row(self.header))
            o.append(self.get_row_line('='))

        for self.row in self.tabledata:
            o.append(self.get_row(self.row))
            o.append(self.get_row_line())

        return o

class ListTable(YamlTable):
    pass

class HtmlTable(YamlTable):
    pass

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

def main():
    # the following is a total hack to avoid argparse. first argument
    # is input, second is output.  we'll have to break down and use
    # argparse if we want any other options, just for sanity.

    inputfile = sys.argv[1]

    try:
        outputfile = sys.argv[2]
    except IndexError:
        outputfile = get_default_outputfile(inputfile)

    table = RstTable(inputfile)
    output = TableBuilder(table)

    output.write(outputfile)

if __name__ == '__main__':
    main()

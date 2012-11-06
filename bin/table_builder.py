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

import yaml
import sys

# global variables
columnwidths=[]  # the column widths to use in get_rowline() and get_row() methods
tempcolumnwidths=[] # working list to determine columnwidths global variable
                    # tempcolumnwidths keeps the running max value for each cell

###################################
#
# Generating parts of the table.

def get_row_line(delim='-'):
    """
    Prints lines to seperate rows in the column for restrucutred text
    format.
    """
    return '+' + delim + str(delim + '+' + delim).join([ delim * width for width in columnwidths ]) + delim + '+'

def get_row(rowdata):
    """
    Prints the contents of the row, seperated as needed for
    restructured text format.
    """
    rowlines = []
    for line in zip(*rowdata):
        if len(rowlines) > 0:
            rowlines.append('\n')
        rowlines.append( '| ' + ' | '.join([ line[idx].ljust(columnwidths[idx]) for idx in range(len(line)) ]) + ' |' )

    return ''.join(rowlines)

###################################
#
# Flexible table building processing.

def normalize_cell_height(rowdata):
    """
    Normalize cells in the rowdata so that each cell has the same height;
    more specifically, ensure that each cell data list spans the same number of
    lines when printed as others in the row.
    """

    # This function mutates the rowdata object, which is passed by
    # reference..  By appending to rowdata content as opposed to
    # resetting the reference (i.e. setting it equal to something
    # else) the method modifies whatever was referenced by rowdata and
    # does not need to explicitly return something

    maxlines = max([ len(cell) for cell in rowdata])

    for cell in rowdata:
        for x in range(maxlines-len(cell)):
            cell.append( ' '  )

def check_column_width(rowdata):
    """
    Compares the cell widths of the row with the curren max cell width
    in the global variables. Then updates the global values in the
    variable ``tempcolumnwidths``. ``tempcolumnwidths``  variable maintains
    the running max width of each column.

    By appending to the variable, the global
    scope of tempcolumnwidths is maintained.
    """

    thisrowwidths = [ max([len(line) for line in cell ]) for cell in rowdata]

    if len( tempcolumnwidths ) == 0:
        tempcolumnwidths.append(thisrowwidths)
    else:
        currentmaxwidths = tempcolumnwidths.pop()
        tempcolumnwidths.append([ max(currentmaxwidths[i], thisrowwidths[i]) for i in range(len(currentmaxwidths))])

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

def check_input_data(datafile, layout, meta, content):
    if layout != 'layout':
        exit('layout document in "' + datafile + '" is malformed.')
    elif meta != 'meta':
        exit('meta document in "' + datafile + '" is malformed.')
    elif content != 'content':
        exit('content document in "' + datafile + '" is malformed.')

def read_data(datafile):
    with open(datafile, "rt") as f:
        parsed = yaml.load_all(f)
        layout = dict2obj(parsed.next())
        meta = dict2obj(parsed.next())
        content = dict2obj(parsed.next())

    check_input_data(datafile, layout.section, meta.section, content.section)

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

    return header, rows

def render_table(header, rows):
    tabledata = []

    # Compare cell widths of the header  with the
    # max cell widths stored in the global var tempcolumnwidths
    # and swap out value(s) if necessary.
    if header is not None:
        check_column_width(header)

    for index in range(len(rows['rows'])):
        parsed_row = []

        # Append each cell to the parsed_row list, breaking multi-line
        # cell data as needed.
        for cell in rows['rows'][index][index + 1]:
            parsed_row.append(cell.split('\n'))

        # process the data to ensure the table is big enough.
        check_column_width(parsed_row)
        normalize_cell_height(parsed_row)

        # add the processed data to the table
        tabledata.append(parsed_row)

    # Set the global variable columnwidths to the flattened out
    # tempcolumnwidths
    for cellwidth in tempcolumnwidths.pop():
        columnwidths.append(cellwidth)

    output = []
    output.append(get_row_line())

    if header is not None:
        output.append(get_row(header))
        output.append(get_row_line('='))

    for row in tabledata:
        output.append(get_row(row))
        output.append(get_row_line())

    return output

###################################
#
# Interaction

def get_default_outputfile(inputfile):
    return  inputfile.rsplit('.')[0] + '.rst'

def cli():
    # this is a total hack to avoid argparse. first argument is input,
    # second is output.  we'll have to break down and use argparse if
    # we want any other options, just for sanity.

    inputfile = sys.argv[1]

    try:
        outputfile = sys.argv[2]
    except IndexError:
        outputfile = get_default_outputfile(inputfile)

    return inputfile, outputfile

###################################
#
# Interfaces.

class YamlTableBuilder(object):
    def __init__(self, inputfile):
        self.inputfile = inputfile
        self.table_header, self.table_rows = read_data(inputfile)
        self.output = render_table(self.table_header, self.table_rows)

    def write_file(self, outputfile=None):
        if outputfile is None:
            outputfile = get_default_outputfile(self.inputfile)

        with open(outputfile, 'w') as f:
            for line in self.output:
                f.write(line + '\n')

    def print_table(self):
        for line in self.output:
            print(line)

def main():
    inputfile, outputfile = cli()

    table = YamlTableBuilder(inputfile)

    table.write_file(outputfile)

if __name__ == '__main__':
    main()

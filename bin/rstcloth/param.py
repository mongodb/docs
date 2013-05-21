import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils as utils
from rstcloth import RstCloth
from rstcloth import fill
import table as tb

r = RstCloth()

field_type = {
    'param' : 'Parameter',
    'field': 'Field',
    'arg': 'Argument',
    'option': 'Option',
    'flag': 'Flag',
}

class ParamTable(tb.TableData):
    def __init__(self, header=[], rows=[]):
        super(ParamTable, self).__init__()
        self.header = header
        self.rows = rows
        self.num_rows = 0
        self.type_column = None
        self.widths = None

    def set_column_widths(self, widths=None):
        if widths is None:
            if self.type_column:
                self.widths = [ 20, 20, 60 ]
            else:
                self.widths = [ 20, 80 ]

    def set_type(self, doc):
        if self.type_column is True or None:
            pass
        else:
            self.type_column = self.has_type(doc)

    @staticmethod
    def has_type(doc):
        if 'type' in doc and doc['type'] is not None or False:
            return True
        else:
            return False

def generate_params(params):
    params.sort(key=lambda p: p['position'])

    # Begin by generating the table for web output
    r.directive('only', '(html or singlehtml or dirhtml)', block='htm')
    r.newline(block='htm')
    r.content(generate_param_table(params), indent=3, block='html')
    r.newline(block='htm')

    # Then generate old-style param fields for non-web output
    r.directive('only', '(texinfo or latex or epub)', block='tex')
    r.newline(block='tex')

    for param in params:
        f = generate_param_fields(param)
        r.field(name=f[0], value=f[1], indent=3, wrap=False, block='tex')
        r.newline(block='tex')

def generate_param_table(params):
    table_data = ParamTable()

    for param in params:
        table_data.set_type(param)

    table_data.set_column_widths()

    table_data.add_header(render_header_row(params[0],
                                            table_data.num_rows,
                                            table_data.type_column))

    for param in params:
        row = [ r.pre(param['name']) ]

        if table_data.type_column is True:
            row.append(process_type_cell(param['type'], 'table'))

        row.append(process_description(param['description'], param['field']['optional']))

        table_data.add_row(row)

    table = tb.TableBuilder(tb.ListTable(table_data, widths=table_data.widths))

    return table.output

def generate_param_fields(param):
    _name = [ param['field']['type'] ]

    if ParamTable.has_type(param):
        _name.append(process_type_cell(param['type'], 'field'))


    if param['name'] is not None:
        _name.append(param['name'])

    description = param['description'] 


    if isinstance( param['description'], list):
        field_content = fill('\n'.join(param['description']), 0, 6, False)
    else:
        field_content = fill(param['description'], 0, 6, True)

    return ' '.join(_name), field_content
        

def process_description(content, optional=False):
    if isinstance(content, list):
        if optional is True:
            content[0] = 'Optional.\n' + content[0]
        return content
    else:
        if optional is True:
            o = 'Optional. '
        else:
            o = ''
        return fill(o + content).split('\n')

def process_type_cell(type_data, output):
    if isinstance(type_data, list):
        if output == 'field':
            return ','.join(type_data)
        elif output == 'table':
            length = len(type_data)

            if length == 2:
                return ' or '.join(type_data)
            elif length > 2:
                tmp = type_data[:-1]
                tmp.append('or ' + type_data[-1])
                return ', '.join(tmp)

    else:
        return type_data

def render_header_row(param_zero, num_rows, type_column):
    o = [ field_type[param_zero['field']['type']] ]

    if type_column is True:
        o.append('Type')

    o.append('Description')

    return o

def main():
    input_data = utils.ingest_yaml_list(sys.argv[1])
    generate_params(input_data)

    r.write(sys.argv[2])

    print('[api]: rebuilt "' + sys.argv[2] + '" parameter table.')

if __name__ == '__main__':
    main()

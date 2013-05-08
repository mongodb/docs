import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from rstcloth import RstCloth
from rstcloth import fill
import table as tb

r = RstCloth()

field_types = {
    'param' : 'Parameters',
    'field': 'Fields',
    'arg': 'Arguments',
}

class ParamTable(tb.TableData):
    def __init__(self, header, rows):
        self.header = header
        self.rows = rows

def generate_params(params):
    params.sort(key=lambda p: p['position'])

    has_type = False
    for param in params:
        if 'type' in param and param['type'] is not None or False:
            has_type = True

    r.directive('only', '(html or singlehtml or dirhtml)', block='htm')
    r.newline(block='htm')

    _header = [ [ field_types[params[0]['field']['type']] ] ]

    if has_type:
        _header.append(['Type'])

    _header.append(['Description'])

    _rows = []

    row_count = 1
    for param in params:
        row = [ r.pre(param['name']) ]

        if has_type:
            if isinstance(param['type'], list):
                type_cell = ', '.join(param['type'])
            else:
                type_cell = param['type']

            row.append(type_cell)

        _description = ''
        if param['field']['optional'] is True:
            _description += 'Optional. '

        _description += param['description']

        row.append(fill(_description).split('\n'))

        _rows.append( { row_count: row })

        row_count += 1

    if has_type:
        column_widths = [ 20, 20, 60 ]
    else:
        column_wdiths = [ 20, 80 ]

    table_data = ParamTable(_header, _rows)
    table = tb.TableBuilder(tb.ListTable(table_data, widths=column_widths))

    r.content(table.output, indent=3, block='html')

    r.directive('only', '(texinfo or latex or epub)', block='tex')
    r.newline(block='tex')

    for param in params:
        _name = [ param['field']['type'] ]

        if 'type' in param and param['type'] is not None or False:
            if isinstance(param['type'], list):
                _type = ','.join(param['type'])
            else:
                _type = param['type']

            _name.append(_type)

        _name.append(param['name'])

        r.field(name=' '.join(_name), value=param['description'], indent=3, block='tex')
        r.newline(block='tex')



def main():
    generate_params(utils.ingest_yaml(sys.argv[1]))

    r.write(sys.argv[2])

    print('[param]: rebuilt "' + sys.argv[2] + '" parameter table.')

if __name__ == '__main__':
    main()

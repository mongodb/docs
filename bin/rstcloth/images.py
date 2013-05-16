import sys
import os.path
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from rstcloth import RstCloth

r = RstCloth()

def generate_pages(conf):
    image = '/'.join([conf['dir'], conf['name']])
    alt = conf['alt']
    b = conf['name']

    for output in conf['output']:
        if output['type'] == 'print':
            r.directive('only', 'latex', wrap=False, block=b)
        else:
            r.directive('only', 'not latex', wrap=False, block=b)

        r.newline()

        if output['tag'] == '':
            tag = '.png'
        else:
            tag = '-' + output['tag'] + '.png'

        r.directive(name='image',
                    arg='/images/{0}{1}'.format(conf['name'], tag),
                    fields=[('alt', alt), ('align', 'center')],
                    indent=3,
                    block=b)
        r.newline(block=b)

    r.write(image + '.rst')

def main():
    image = json.loads(sys.argv[1])
    generate_pages(image)

if __name__ == '__main__':
    main()

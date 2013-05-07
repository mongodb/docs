import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from rstcloth import RstCloth

r = RstCloth()

def generate_params(params):
    import pprint 
    pprint.print( params )


def main():
    generate_params(utils.ingest_yaml(sys.argv[1]))

    # r.write(sys.argv[2])

    print('[param]: rebuilt "' + sys.argv[2] + '" parameter table.')

if __name__ == '__main__':
    main()


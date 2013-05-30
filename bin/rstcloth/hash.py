import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

from rstcloth import RstCloth
import utils

r = RstCloth()

def main(fn):
    r.directive('|commit| replace', '``{0}``'.format(utils.get_commit()))
    r.write(fn)

if __name__ == '__main__':
    main(sys.argv[1])
    

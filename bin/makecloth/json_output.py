#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from docs_meta import get_manual_path, get_branch, render_paths
from makecloth import MakefileCloth

paths = render_paths('dict')
m = MakefileCloth()

def generate_output_targets(souce_files):
    pass
def main():
    source_files = utils.expand_tree(paths['branch-output'] + '/json/', 'fjson')
    outputs = []

    if len(source_files) == 0:
        generation_worthwhile = False
    else:
        generation_worthwhile = True

    if generation_worthwhile:
        msg = '[json]: processed all json files.'

        for source in source_files:
            base_fn = source.split('/', 2)[2].rsplit('.', 1)[0]
            output_file = '/'.join([paths['branch-output'], base_fn]) + '.json' 
            staged_file = '/'.join([paths['branch-staging'], base_fn]) + '.json'
            outputs.append(staged_file)
            
            m.target(source, 'json')
            m.target(output_file, source)
            m.job('fab process.input:{0} process.output:{1} process.json_output'.format(source, output_file))
            
            m.target(staged_file, output_file)
            m.job('mkdir -p ' + os.path.dirname(staged_file))
            m.job('$(PYTHONBIN) {0}/copy-if-needed.py -i {1} -o {2} -b json'.format(paths['tools'], output_file, staged_file))
            
            m.newline()
    else:
        msg = '[json]: please build json output from sphinx using "make json" before processing the output.'


    m.section_break('meta')
    m.target('json-output', outputs)
    m.msg(msg)

    m.section_break('list file')
    list_file = paths['branch-staging'] + '/json/.file_list'
    tmp_list_file = '/'.join([paths['branch-output'], 'json-file-list'])

    m.comment('the meta build system generates "' + tmp_list_file + '" when it generates this file')
    m.target('json-file-list', list_file)
    m.target(tmp_list_file, [paths['output'] + '/makefile.json', paths['branch-output'] + '/json'])
    m.target(list_file, tmp_list_file)
    m.job('$(PYTHONBIN) {0}/copy-if-needed.py -i {1} -o {2} -b json'.format(paths['tools'], tmp_list_file, list_file))
    m.msg('[json]: rebuilt inventory of json output.')

    m.target(paths['branch-output'] + '/json', 'json')

    if generation_worthwhile:
        with open(tmp_list_file, 'w') as f:
            branch = get_manual_path()

            for fn in outputs:
                url = [ 'http://docs.mongodb.org', branch ]
                url.extend(fn.split('/', 3)[3:])
                url = '/'.join(url)

                f.write(url + '\n')

    m.target('clean-json-output', 'clean-json')
    m.job('rm -rf ' + ' '.join([list_file, tmp_list_file, paths['branch-staging'] + '/json']))
    m.msg('[json]: removed all processed json.')

if __name__ == '__main__':
    main()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify json output.')

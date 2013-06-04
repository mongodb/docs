#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from docs_meta import get_manual_path, render_paths
from makecloth import MakefileCloth

paths = render_paths('dict')
m = MakefileCloth()

def generate_list_file(outputs, path):
    with open(path, 'w') as f:
        branch =get_manual_path()

        for fn in outputs:
            url = [ 'http://docs.mongodb.org', branch ]
            url.extend(fn.split('/', 3)[3:])
            url = '/'.join(url)

            f.write(url + '\n')
    
def generate_json_target(source, output_file):
    m.target(source, 'json')
    m.target(output_file, source)
    m.job('fab process.input:{0} process.output:{1} process.json_output'.format(source, output_file))
    m.msg('[json]: generated a processed json file: ' + output_file)
    m.newline()

def generate_meta(outputs, msg):
    m.section_break('meta')

    build_json_output = paths['branch-output'] + '/json'
    public_json_output = paths['branch-staging'] + '/json'

    m.target('json-output', outputs)
    if len(outputs) > 0:
        m.job('rsync --recursive --times --delete --exclude="*fjson" {0} {1}'.format(build_json_output, public_json_output))
        m.msg('[json]: migrated all .json files to staging.')
    m.msg(msg)

    m.section_break('list file')

    m.comment('the meta build system generates "' + paths['branch-json-list-file']  + '" when it generates this file')
    m.target('json-file-list', paths['public-json-list-file'])
    m.target(paths['branch-json-list-file'] , [paths['output'] + '/makefile.json-output', build_json_output])
    m.target(paths['public-json-list-file'], paths['branch-json-list-file'] )
    m.job('fab process.input:{0} process.output:{1} process.copy_if_needed:json'.format(paths['branch-json-list-file'] , paths['public-json-list-file']))
    m.msg('[json]: rebuilt inventory of json output.')

    m.target(build_json_output, 'json')

    m.target('.PHONY', ['clean-json-output', 'clean-json', public_json_output])
    m.target('clean-json-output', 'clean-json')
    m.job('rm -rf ' + ' '.join([paths['public-json-list-file'], paths['branch-json-list-file'], public_json_output]))
    m.msg('[json]: removed all processed json.')


def main():
    source_files = utils.expand_tree(paths['branch-output'] + '/json/', 'fjson')
    outputs = []

    paths['branch-json-list-file'] = '/'.join([paths['branch-output'], 'json-file-list'])
    paths['public-json-list-file'] = paths['branch-staging'] + '/json/.file_list'

    if len(source_files) > 0:
        msg = '[json]: processed all json files.'

        for source in source_files:
            base_fn = source.split('/', 2)[2].rsplit('.', 1)[0]
            output_file = '/'.join([paths['branch-output'], base_fn]) + '.json' 
            outputs.append(output_file)
            
            generate_json_target(source, output_file)

        generate_list_file(outputs, paths['branch-json-list-file'] )
    else:
        msg = '[json]: please build json output from sphinx using "make json" before processing the output.'
        
    generate_meta(outputs, msg)

if __name__ == '__main__':
    main()

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify json output.')

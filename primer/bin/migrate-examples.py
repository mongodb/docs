#
# Creates primer-migrations-xxx-examples.yaml files.
# The giza migrations.py use these primer-migrations files
# to truncate/etc. the files
#

import os
import subprocess

# The created primer-migrations-xxx.yaml files live in config/ dir

configDir = "config/"

def create_migrations_yaml(edition, inputFiles, inputFileDirectory, prereqThreshold=None):

    # not adding assertions for sanity-check here
    # since we just call this function from within this file

    outputYaml = configDir + 'primer-migrations-' + edition.strip() + '-examples.yaml'

    targetDir = 'includes/'

    with open( outputYaml, 'w') as output:

       for file in inputFiles:

          source = inputFileDirectory + '/' + file

          # prereq are lines before the passed in prereqThreshold
          if prereqThreshold is not None:
             output.write('---\n')
             output.write('source: ' + source + '\n')
             output.write('target: ' + targetDir + 'example-prereq-' + edition + '-'+ file + '\n')
             output.write('truncate: \n')
             output.write('   end-before: "' + prereqThreshold.strip() + '"\n')

          with open( source, 'r') as f:
             fname, extension = os.path.splitext(file)

             for l in f:
                if '// @begin: ' in l:
                   output.write('---\n')
                   padding,reference = l.split('// @begin: ')
                   example = 'example-' + reference.rstrip() + extension

                   output.write('source: ' + source + '\n')
                   output.write('target: ' + targetDir + example + '\n')

                   output.write('truncate: \n')
                   output.write('   start-after: "' + l.strip() + '"\n')

                elif '// @end: ' in l:
                   output.write('   end-before: "' + l.strip() + '"\n')

       output.write('...')

def create_cpp_migrations_yaml():
    assetsDir = 'build/cpp-examples/examples'
    inputFiles = [ 'aggregate.cpp', 'create.cpp', 'index.cpp', 'query.cpp', 'remove.cpp', 'update.cpp' ]
    prereqThreshold = 'int main(int, char**)'
    create_migrations_yaml( 'cpp', inputFiles, assetsDir, prereqThreshold )

def main():
   create_cpp_migrations_yaml()

if __name__ == '__main__':
    main()

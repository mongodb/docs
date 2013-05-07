# Copyright 2013 Sam Kleinman, Cyborg Institute
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

import os
import os.path

def print_output(list):
    """
    :param list list: A list of strings to print.

    Takes a list as a single argument and prints each line.
    """
    for line in list:
        print(line)

def write_file(list, filename):
    """
    :param list list: A list of strings to write.
    :param string filename: The name of the file to write with ``list``.

    Write all items in ``list`` to the file specified by ``filename``. Creates
    enclosing directories if needed, and overwrite an existing file of the same
    name if it exists.
    """
    dirpath = filename.rsplit('/', 1)[0]
    if os.path.isdir(dirpath) is False:
        os.mkdir(dirpath)

    with open(filename, 'w') as f:
        for line in list:
            f.write(line + '\n')

class AttributeDict(dict):
    def __getattr__(self, attr):
        return self[attr]
    def __setattr__(self, attr, value):
        self[attr] = value

class Cloth(object):
    def get_block(self, block='_all'):
        if block not in self.docs:
            raise Exception('Error: ' + block + ' not specified in buildfile')
        else:
            return self.docs[block]

    def print_content(self, block_order=['_all']):
        output = []

        if type(block_order) is not list:
            raise Exception('Cannot print blocks not specified as a list.')
        else:
            for block in block_order:
                output.append(self.docs[block])

            output = [item for sublist in output for item in sublist]
            print_output(output)

    def print_block(self, block='_all'):
        if block not in self.docs:
            raise MissingBlock('Error: ' + block + ' not specified.')
        else:
            print_output(self.docs[block])

    def write(self, filename, block_order=['_all']):
        output = []

        if type(block_order) is not list:
            raise Exception('Cannot write blocks not specified as a list.')
        else:
            for block in block_order:
                output.append(self.docs[block])

            output = [item for sublist in output for item in sublist]
            write_file(output, filename)

    def write_block(self, filename, block='_all'):
        if block not in self.docs:
            raise Exception('Error: ' + block + ' not specified.')
        else:
            write_file(self.docs[block], filename)

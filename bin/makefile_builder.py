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

import os
import os.path

class MakefileBuilder(object):
    def __init__(self, makefile=None):
        self.builder = { '_all' : [] }

        if makefile is not None and type(makefile) is list:
            self.makefile = makefile
        else:
            self.makefile = self.builder['_all'] = []

    def add_to_builder(self, data, block):
        if block is '_all':
            pass
        else:
            self.makefile.append(data)

        if block in self.builder:
            self.builder[block].append(data)
        else:
            self.builder[block] = [data]

    def block(self, block):
        if block in self.builder:
            pass
        else:
            self.builder[block] = []
            self.section_break(block, block)

    def raw(self, lines, block='_all'):
        self.add_to_builder(lines, block)

    def section_break(self, name, block='_all'):
        self.add_to_builder('\n\n########## ' + name + ' ##########\n', block)

    def comment(self, comment, block='_all'):
        self.add_to_builder('\n# ' + comment + '\n', block)

    def newline(self, n=1, block='_all'):
        for i in range(n):
            self.add_to_builder('\n', block)

    def target(self, target, dependency=None, block='_all'):
        if dependency is None: 
            self.add_to_builder(target + ':' + '\n', block)
        else: 
            self.add_to_builder(target + ':' + dependency + '\n', block)
            
    def var(self, variable, value, block='_all'):
        self.add_to_builder(variable + ' = ' + value + '\n', block)

    def append_var(self, variable, value, block='_all'):
        self.add_to_builder(variable + ' += ' + value + '\n', block)

    def job(self, job, display=False, block='_all'):
        if display is True:
            o = '\t' + job + '\n'
        else:
            o = '\t@' + job + '\n'

        self.add_to_builder(o, block)

    def message(self, message, block='_all'):
        self.add_to_builder('\t@echo ' + message + '\n', block)

    msg = message

    def print_content(self, block_order=['_all']):
        o = []
        for block in block_order:
            o.append(self.builder[block])
            o = [item for sublist in o for item in sublist]
        for line in o:
            print(line.rstrip())

    def write(self, filename, block_order=['_all']):
        o = []
        for block in block_order:
            o.append(self.builder[block])
            o = [item for sublist in o for item in sublist]

        file_path = os.path.dirname(filename)

        if not os.path.exists(file_path):
            os.makedirs(file_path)

        with open(filename, 'w') as f:
            for line in o:
                f.write(line)

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

class MakefileBuilder(object):
    def __init__(self):
        self.makefile = []

    def target_break(self, name):
        self.makefile.append('\n\n########## ' + name + ' ##########\n\n')

    def target(self, target):
        self.makefile.append(target + '\n')

    def job(self, job):
        self.makefile.append('\t' + job + '\n')

    def print(self):
        for line in self.makefile:
            print(line)

    def write(self, filename):
        with open(filename, 'w') as f:
            for line in self.makefile:
                f.write(line)
                f.write('\n')

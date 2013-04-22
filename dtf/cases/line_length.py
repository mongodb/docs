# Copyright 2012-2013 Sam Kleinman
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
# 
# Part of the example distribution of DTF: https://pypi.python.org/pypi/dtf/

try:
    from cases import DtfCase
    from utils import expand_tree
except:
    from dtf.cases import DtfCase
    from dtf.utils import expand_tree

class DtfLineLength(DtfCase):
    @staticmethod
    def check_line(line, max_length):
        if len(line) > max_length: 
            return True
        else: 
            return False

    def check_file(self, source_file, p=True):
        with open(source_file, 'r') as f:
            ln = 1
            for line in f.readlines():
                ln += 1
                if self.check_line(line, self.test_spec['max_length']):
                    p = False
                    break

        if p is False: 
            return p, ln
        else:
            return p, None

    def test(self):
        result = self.check_file(self.test_spec['file'])

        if result[0] is True: 
            msg = ('[%s]: %s has no lines longer than %s characters.' 
                   % (self.name, self.test_spec['file'], self.test_spec['max_length']))
        else:
            msg = ('[%s]: line %s in "%s" is longer than %s characters.' 
                   % (self.name, result[1], self.test_spec['file'], self.test_spec['max_length']))
            
        return result[0], msg

def main(name, test_spec):
    c = DtfLineLength(name, test_spec)
    c.required_keys(['file', 'max_length', 'name'])
    c.run()

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

from change import DtfChange
import os
import yaml 

from dtf.dtf import PASSING

class DtfDirectoryPaired(DtfChange):
    def test(self, a=False, b=False):
        if self.hash(self.test_spec['file']['path']) == self.test_spec['file']['hash']:
            a = True 

        self.new_directory_count = len(os.listdir(self.test_spec['directory']))

        if self.test_spec['count'] == self.new_directory_count: 
            b = True

        if a is True and b is True: 
            msg = ('[%s]: number of files in "%s" and the content of "%s" has not changed.' 
                   % (self.name, self.test_spec['directory'], self.test_spec['file']['path']))
        else: 
            if a is False and b is False: 
                msg = ('[%s]: number of files in "%s" and the content of "%s" have changed.' 
                       % (self.name, self.test_spec['directory'], self.test_spec['file']['path']))
            elif a is False: 
                msg = ('[%s]: content of "%s" has changed. Likely false positive.' 
                       % (self.name, self.test_spec['file']['path']))
            elif b is False:
                msg = ('[%s]: number of files in "%s" changed. Update "%s" now.' 
                       % (self.name, self.test_spec['directory'], self.test_spec['file']['path']))
                
        r = a and b
        return r, msg        

    def passing(self):
        self.test_spec['file']['hash'] = self.hash(self.test_spec['file']['path'])
        self.test_spec['count'] = self.new_directory_count

        return yaml.dump(self.test_spec, default_flow_style=False)

def main(name, test_spec):
    c = DtfDirectoryPaired(name, test_spec)
    c.required_keys(['directory', 'file', 'count', 'type', 'name'])
    c.run()

    if PASSING is True:
        c.print_passing_spec()

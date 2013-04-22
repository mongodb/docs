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

import hashlib
import os

from dtf.cases import DtfCase
from dtf.dtf import PASSING

class DtfChange(DtfCase):
    @staticmethod
    def hash(file, block_size=2**20):
        md5 = hashlib.md5()
        with open(file, 'rb') as f:
            for chunk in iter(lambda: f.read(128*md5.block_size), b''):
                md5.update(chunk)
        return md5.hexdigest()

    def test(self, r=False):
        if self.hash(self.test_spec['file']) == self.test_spec['hash']:
            r = True

        if r is False: 
            msg = ('[%s]: file named "%s" changed. Update other files as needed.' 
                   % ( self.test_spec['name'], self.test_spec['file']))
        else:
            msg = ('[%s]: file named "%s" is **not** changed. No further action required.' 
                   % ( self.test_spec['name'], self.test_spec['file']))

        return r, msg

    def passing(self):
        self.test_spec['hash'] = self.hash(self.test_spec['file'])
        
        return yaml.dump(self.test_spec, default_flow_style=False)

def main(name, test_spec):
    c = DtfChange(name, test_spec)
    c.required_keys(['file', 'hash', 'type', 'name'])
    c.run()

    if PASSING is True:
        c.print_passing_spec()

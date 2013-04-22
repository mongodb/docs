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
import yaml

from dtf.dtf import PASSING

class DtfPaired(DtfChange):
    def test(self, a=False, b=False):
        if self.hash(self.test_spec['file0']['path']) == self.test_spec['file0']['hash']:
            a = True

        if self.hash(self.test_spec['file1']['path']) == self.test_spec['file1']['hash']:
            b = True

        if a is True and b is True:
            msg = "[%s]: no changes" % self.name
        else:
            if a is False and b is False:
                msg = ('[%s]: both "%s" and "%s" files changed.'
                       % (self.name, self.test_spec['file1']['path'], self.test_spec['file0']['path']))
            elif a is False:
                msg = ('[%s]: "%s" changed without "%s".'
                       % (self.name, self.test_spec['file1']['path'], self.test_spec['file0']['path']))
            elif b is False:
                msg = ('[%s]: only "%s" changed without "%s".'
                       % (self.name, self.test_spec['file0']['path'], self.test_spec['file1']['path']))

        r = a and b

        return r, msg

    def passing(self):
        self.test_spec['file0']['hash'] = self.hash(self.test_spec['file0']['path'])
        self.test_spec['file1']['hash'] = self.hash(self.test_spec['file1']['path'])

        return yaml.dump(self.test_spec, default_flow_style=False)


def main(name, test_spec):
    c = DtfPaired(name, test_spec)
    c.required_keys(['file1', 'file0', 'type', 'name'])
    c.run()

    if PASSING is True:
        c.print_passing_spec()

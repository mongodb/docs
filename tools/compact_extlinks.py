# This script takes existing extlinks and applies them to existing docs.
# The original files are saved with the .orig suffix.
# Usage:
# python compact_extlinks.py <document root>
# E.g.: python compact_extlinks.py ../source

import os
import sys
import re
from collections import defaultdict
from shutil import copyfile

sys.path.append("..")
from conf import extlinks

doc_root = sys.argv[1]

url_valid_chars = r"[\-\._~\:/?#\[\]@!\$&\'\(\)\*\+\,;%=\w]+"
link_valid_chars = r"[\s\w!\"#$%&\'\(\)\*\+,\.\/:;=\?@\[\]\^\_\{\|\}\~\-]"

# return: dict of extlink tag (e.g. aws-docs) => regular expression for matching rst
def extlinks_regexp(links=extlinks):
    re_dict = dict()

    regexps = []
    for k, v in links.items():
        url = re.sub(r'https?://(\S+)\%s$', '\g<1>', v[0])

        re_dict[k] = re.compile(r"(`)(" + link_valid_chars + r"*)<(\s*https?://" + url + r")(" + url_valid_chars + r")(\s*>\s*`_+)", re.MULTILINE)

    return re_dict

link_regex = extlinks_regexp()

urls = defaultdict(int)
num_scanned = 0
num_created = 0

for dirpath, dirnames, filenames in os.walk(doc_root):
    for filename in [f for f in filenames if (f.endswith(".txt") or f.endswith(".rst"))]:
        updated = False

        filepath = "/".join([dirpath, filename])
        with open(filepath, 'r') as file:
            num_scanned += 1
            data = file.read()

            for k, regexpr in link_regex.items():
                result = re.subn(regexpr, (":" + k + ":`\g<2><\g<4>>`"), data)

                if result[1] > 0: #num updates
                    updated = True
                    data = result[0]

        if updated:
            num_created += 1
            # save the original
            copyfile(filepath, (filepath + ".orig"))

            fh = open(filepath, 'w')
            fh.write(data)
            fh.close()
    else:
        continue

print("Files scanned: %i" % num_scanned)
print("New files created: %i" % num_created)

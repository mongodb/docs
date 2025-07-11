# This script checks for circular 301 redirects in the config/redirects
# configuration file. It outputs the generated redirects, but the user must
# manually locate the corresponding entries in the configuration file.
#
# Usage:
#
# Pipe the output of `mut-redirects config/redirects` to this script.
#
# Example:
# mut-redirects config/redirects | python check_circular_redirects.py

import sys
import re

prefix_re = r"^Redirect\s301\s"

line_no = 1
for line in sys.stdin:
    if re.match(prefix_re, line):
        entry = line.rstrip()
        tokens = entry.split()
        num_tokens = len(tokens)

        src = tokens[num_tokens-2]
        if src.endswith("/"):
            src = src[:-1]

        dst = tokens[num_tokens-1]
        if dst.endswith("/"):
            dst = dst[:-1]

        if dst.endswith(src):
            print("Duplicate found on line %d: %s" % (line_no, entry))

    line_no += 1

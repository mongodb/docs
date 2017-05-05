#!/usr/bin/env python3

import os
import re
import sys

###### Fill in these values ######
# LANGUAGE_ID is whatever you put into template.py
LANGUAGE_ID = 'scala'
# The name of the file the Makefile downloads
LANGUAGE_FILENAME = 'DocumentationExampleSpec.scala'
# The lowercase name of the language (for Pygments code highlighting)
LANGUAGE_NAME = 'scala'
# The number of spaces to remove from the beginning of each line
LANGUAGE_DEDENT = '12'
###### -------------------- ######

template_example = \
'''
     - id: {id}
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/{filename}
            :language: {language}
            :dedent: {dedent}
            :start-after: Start Example {n}
            :end-before: End Example {n}
'''

template_language = \
'''
     - id: {id}
       content: |
         <stuff>
'''

def rewrite(path, match):
    assert match

    with open(path, 'a') as f:
        try:
            n = int(match.group(1))
            f.write(template_example.format(id=LANGUAGE_ID, filename=LANGUAGE_FILENAME, language=LANGUAGE_NAME, dedent=LANGUAGE_DEDENT, n=n))
        except ValueError:
            f.write(template_language.format(id=LANGUAGE_ID))


def main():
    for root, _, files in os.walk('./'):
        for name in files:
            match = re.search(r'driver-example-[a-z]+-([a-z0-9]+)\.rst$', name)
            if not match:
                continue

            rewrite(os.path.join(root, name), match)

if __name__ == '__main__':
    main()
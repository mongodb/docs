#!/usr/bin/env python
import argparse
import json
import os
import re
import sys
import toml
import logging

logger = logging.getLogger('genindex')
PAT_HEADMATTER = re.compile(r'^\+\+\+\n(.+)\n\+\+\+', re.DOTALL)


def process_file(path):
    with open(path, 'r') as f:
        rawdata = f.read()

    match = PAT_HEADMATTER.match(rawdata)
    if not match:
        raise ValueError('Couldn\'t find headmatter')

    data = toml.loads(match.group(1))
    title = data['title']
    slug = data.get('slug', os.path.splitext(os.path.basename(path))[0])
    tags = data['tags']

    return (slug, title, tags)


def main(args):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', help='Source directory under which to find pages.')
    parser.add_argument('--out', metavar='PATH', help='Path in which to save the tag index.')
    parser.add_argument('--config', metavar='PATH', help='Path to the project configuration file.')
    args = parser.parse_args()

    logging.basicConfig()
    data = []

    with open(args.config, 'r') as f:
        tag_manifest = toml.load(f).get('tags', {})

    error = False
    for root, _, files in os.walk(args.source):
        for filename in files:
            filename = os.path.join(root, filename)
            try:
                slug, title, tags = process_file(filename)
            except ValueError:
                logger.exception('Error processing %s', filename)
                continue

            for tag in tags:
                if not tag in tag_manifest:
                    logger.fatal('Unknown tag "%s" in %s', tag, filename)
                    error = True

            data.append((slug, title, tags))

    if error:
        sys.exit(1)

    with open(args.out, 'w') as f:
        json.dump({
            'tags': tag_manifest,
            'pages': data
        }, f)

if __name__ == '__main__':
    main(sys.argv)

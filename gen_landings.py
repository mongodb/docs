#!/usr/bin/env python3
import os.path

from sys import argv

# Build directory name will be the name of Makefile recipe
BUILD_DIR = argv[1]

# Paths of source files
HOME_INPUT_PATH = './src/html/home.html'
CLOUD_INPUT_PATH = './src/html/cloud.html'
TOOLS_INPUT_PATH = './src/html/tools.html'

# Path of the output files
HOME_OUTPUT_PATH = os.path.join(BUILD_DIR, 'home', 'index.html')
CLOUD_OUTPUT_PATH = os.path.join(BUILD_DIR, 'cloud', 'index.html')
TOOLS_OUTPUT_PATH = os.path.join(BUILD_DIR, 'tools', 'index.html')


def build_individual(template, input_path, output_path):
    """Build a landing page from a single source file
       pyfe.g., Cloud landing page, Tools..."""
    html = ''

    # Read the source file
    with open(input_path, 'r') as in_file:
        html = in_file.read()

    # Substitute the template placeholder w/ HTML
    file_contents = template.replace('{0}', html)

    # Write the output file
    with open(output_path, 'w') as out_file:
        out_file.write(file_contents)


def main():
    # Read the template
    with open('./src/html/_layout.html', 'r') as in_file:
        template = in_file.read()

    # Build each landing page using the template
    build_individual(template, HOME_INPUT_PATH, HOME_OUTPUT_PATH)
    build_individual(template, CLOUD_INPUT_PATH, CLOUD_OUTPUT_PATH)
    build_individual(template, TOOLS_INPUT_PATH, TOOLS_OUTPUT_PATH)

if __name__ == '__main__':
    main()

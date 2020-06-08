#!/usr/bin/env python3
import collections
import os.path
from sys import argv

Site = collections.namedtuple('Site', ('input_path', 'output_path', 'title', 'search_properties'))

# Build directory name will be the name of Makefile recipe
BUILD_DIR = argv[1]

SITES = [
    Site('./src/html/cloud.html',
         os.path.join(BUILD_DIR, 'cloud', 'index.html'),
         'Cloud Products — MongoDB Documentation',
         'atlas-master,mms-onprem-current,mms-cloud-master,stitch-master'),
    Site('./src/html/tools.html',
         os.path.join(BUILD_DIR, 'tools', 'index.html'),
         'MongoDB Tools — MongoDB Documentation',
         'bi-connector-current,spark-connector-current,compass-master'),
    Site('./src/html/announcements/login-and-access-changes.html',
         os.path.join(BUILD_DIR, 'announcements/login-and-access-changes', 'index.html'),
         'MongoDB Announcements — MongoDB Documentation',
         '')
]


def build_individual(template: str, site: Site) -> None:
    """Build a landing page from a single source file
       pyfe.g., Cloud landing page, Tools..."""
    html = ''

    # Read the source file
    with open(site.input_path, 'r') as in_file:
        html = in_file.read()

    title_pair = site.title.split('—', 1)
    project_title = title_pair[0] if len(title_pair) > 1 else ''

    # Substitute the template placeholder w/ HTML
    file_contents = template.replace('{title}', site.title)
    file_contents = file_contents.replace('{projectTitle}', project_title)
    file_contents = file_contents.replace('{searchProperties}', site.search_properties)
    file_contents = file_contents.replace('{body}', html)

    # Write the output file
    with open(site.output_path, 'w') as out_file:
        out_file.write(file_contents)


def main() -> None:
    # Read the template
    with open('./src/html/_layout.html', 'r') as in_file:
        template = in_file.read()

    # Build each landing page using the template
    for site in SITES:
        build_individual(template, site)

if __name__ == '__main__':
    main()

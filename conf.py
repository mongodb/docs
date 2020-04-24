# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os
import datetime
import logging

from giza.config.runtime import RuntimeStateConfig
from giza.content.replacements import get_replacements
from giza.config.helper import fetch_config, get_versions

logging.basicConfig(level=logging.INFO)
conf = fetch_config(RuntimeStateConfig())
sconf = conf.system.files.data.sphinx_local

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'source_constants',
    'tabs',
    'icon'
]

locale_dirs = [os.path.join(conf.paths.projectroot, conf.paths.locale)]
gettext_compact = False

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = sconf.master_doc
language = 'en'
project = sconf.project
copyright = u'2011-{0}'.format(datetime.date.today().year)
version = conf.version.branch
release = conf.version.release

rst_epilog = [
    '.. include:: {0}/hash.rst'.format(conf.paths.includes[len(conf.paths.source):]),
    '.. |copy| unicode:: U+000A9',
    '.. |arrow| unicode:: U+27A4',
    '.. |charts| replace:: MongoDB Charts',
    '.. |charts-short| replace:: Charts',
    '.. |checkmark| unicode:: U+2713',
    '.. |tls-ssl| replace:: :abbr:`TLS (Transport Layer Security)`/:abbr:`SSL (Secure Sockets Layer)`',
    '.. |service| replace:: Atlas',
    '.. |enc-channel| replace:: :ref:`encoding channel <encoding-channels>`',
    '.. |aws| replace:: :abbr:`AWS (Amazon Web Services)`',
    '.. |gcp| replace:: :abbr:`GCP (Google Cloud Platform)`',
    '.. |html| replace:: :abbr:`HTML (HyperText Markup Language)`',
    '.. |css| replace:: :abbr:`CSS (Cascading Style Sheets)`',
]

rst_epilog.extend(get_replacements(conf))
rst_epilog = '\n'.join(rst_epilog)

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'v0.10': ('https://docs.mongodb.com/charts/v0.10%s', ''),
    'atlas': ('https://docs.atlas.mongodb.com%s', ''),
    'stitch': ('https://docs.mongodb.com/stitch%s', ''),
    'onprem': ('https://docs.mongodb.com/charts/onprem%s', ''),
    'compass': ('https://docs.mongodb.com/compass/master%s', ''),
    'wikipedia' : ('https://en.wikipedia.org/wiki%s', ''),
    'mvn' : ('https://mvnrepository.com/artifact%s',''),
    'npmjs' : ('https://www.npmjs.com/package%s',''),
    'gh' : ('https://github.com%s',''),
}

source_constants = {
    'version': 'v0.10.0'
}

# add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = (''.join([conf.project.url, '/', i, '%s']), '')

intersphinx_mapping = {}
for i in conf.system.files.data.intersphinx:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
                                                       conf.paths.output,
                                                       i.path))
# -- Options for HTML output ---------------------------------------------------

html_theme = sconf.theme.name
html_theme_path = [os.path.join(conf.paths.buildsystem, 'themes')]
html_title = conf.project.title
htmlhelp_basename = 'MongoDB'

html_copy_source = False
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '/.'.join([conf.project.url,
                                 conf.git.branches.current,
                                 sconf.theme.book_path_base])

html_theme_options = {
    'branch': conf.git.branches.current,
    'translations': [],
    'language': language,
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.theme.project,
    'version': version,
    'version_selector':  get_versions(conf),
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
    'is_saas' : conf.git.branches.current == 'master'
}

html_sidebars = sconf.sidebars



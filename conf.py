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
from giza.config.helper import fetch_config

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
    'fasthtml'
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
    '.. |service-fullname| replace:: MongoDB Atlas',
    '.. |service| replace:: Atlas',
    '.. |mms-full| replace:: MongoDB Cloud Manager',
    '.. |mms| replace:: Cloud Manager',
    '.. |stitch-docs| replace:: MongoDB Stitch',
    '.. _stitch-docs: https://docs.mongodb.com/stitch',
    '.. |bic| replace:: Atlas BI Connector',
    
]

rst_epilog.extend(get_replacements(conf))
rst_epilog = '\n'.join(rst_epilog)

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', ''),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'cloudmgr': ('https://docs.cloudmanager.mongodb.com%s', ''),

    'compass': ('https://docs.mongodb.com/compass%s', '')
}

# add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = (''.join([conf.project.url, '/', i, '%s']), '')

intersphinx_mapping = {}
for i in conf.system.files.data.intersphinx:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
                                                       conf.paths.output,
                                                       i.path))

languages = [
    ("ar", "Arabic"),
    ("cn", "Chinese"),
    ("cs", "Czech"),
    ("de", "German"),
    ("es", "Spanish"),
    ("fr", "French"),
    ("hu", "Hungarian"),
    ("id", "Indonesian"),
    ("it", "Italian"),
    ("jp", "Japanese"),
    ("ko", "Korean"),
    ("lt", "Lithuanian"),
    ("pl", "Polish"),
    ("pt", "Portuguese"),
    ("ro", "Romanian"),
    ("ru", "Russian"),
    ("tr", "Turkish"),
    ("uk", "Ukrainian")
]

# -- Options for HTML output ---------------------------------------------------

html_theme = sconf.theme.name
html_theme_path = [os.path.join(conf.paths.buildsystem, 'themes')]
html_title = conf.project.title
htmlhelp_basename = 'MongoDB'

html_logo = sconf.logo
html_static_path = sconf.paths.static

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
    'translations': languages,
    'language': language,
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'version': version,
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
}

html_sidebars = sconf.sidebars

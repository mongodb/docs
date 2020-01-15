# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

from giza.config.helper import fetch_config, get_versions, get_manual_path
from giza.config.runtime import RuntimeStateConfig
import sys
import os.path
import datetime

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)


conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot,
                             conf.paths.buildsystem, 'sphinxext'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'


extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'tabs',
    'fasthtml'
]

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = sconf.master_doc
language = 'en'
project = sconf.project
copyright = u'2008-{0}'.format(datetime.date.today().year)

version = '3.0'
release = version

rst_epilog = '\n'.join([
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |hardlink| replace:: https://docs.mongodb.com/ecosystem/',
    '.. |atlas-full| replace:: MongoDB Atlas',
    '.. |atlas| replace:: Atlas'
])

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', ''),
    'api': ('https://api.mongodb.com/%s', ''),
    'manual': ('https://docs.mongodb.org/manual%s', ''),
    'gettingstarted': ('https://docs.mongodb.org/getting-started%s', ''),
    'atlas': ('https://docs.atlas.mongodb.com%s', ''),
    'mms-docs': ('https://docs.cloud.mongodb.com%s', ''),
    'mms-home': ('https://cloud.mongodb.com%s', ''),
    'guides': ('https://docs.mongodb.com/guides%s', ''),
    'java-docs-latest': ('http://mongodb.github.io/mongo-java-driver/3.12/%s', ''),
    'kafka-21-javadoc': ('https://kafka.apache.org/21/javadoc/org/apache/kafka%s', ''),
    'csharp-docs-latest': ('http://mongodb.github.io/mongo-csharp-driver/2.10%s', ''),
    'node-docs-latest': ('http://mongodb.github.io/node-mongodb-native/3.5%s', ''),
    'scala-docs-latest': ('http://mongodb.github.io/mongo-scala-driver/2.8%s', ''),
    'aws-docs': ('https://docs.aws.amazon.com/%s', ''),
    'wikipedia': ('https://en.wikipedia.org/wiki/%s', ''),
    'community-support': ('https://www.mongodb.com/community-support-resources%s', ''),
}

intersphinx_mapping = {}

try:
    for i in intersphinx_libs:
        intersphinx_mapping[i['name']] = (i['url'], os.path.join(conf.paths.projectroot,
                                                                 conf.paths.output,
                                                                 i['path']))
except:
    for i in intersphinx_libs:
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
htmlhelp_basename = 'MongoDBdoc'

html_logo = ".static/logo-mongodb.png"
html_static_path = ['source/.static']
html_last_updated_fmt = '%b %d, %Y'

html_copy_source = False
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '{0}/{1}/{2}.{3}'

html_theme_options = {
    'branch': conf.git.branches.current,
    'translations': languages,
    'language': language,
    'manual_path': "ecosystem",
    'repo_name': 'docs-ecosystem',
    'jira_project': 'DOCS',
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'nav_excluded': sconf.theme.nav_excluded,
}

html_sidebars = sconf.sidebars

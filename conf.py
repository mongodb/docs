# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import base64
import sys
import os.path
import datetime

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

from giza.config.runtime import RuntimeStateConfig
from giza.config.helper import fetch_config, get_versions, get_manual_path

conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
pdfs = conf.system.files.data.pdfs
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'guides',
    'tabs',
    'uriwriter',
    'fasthtml',
    'source_constants'
]

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = sconf.master_doc
language = 'en'
project = sconf.project
copyright = u'2008-{0}'.format(datetime.date.today().year)

version = conf.version.branch
release = conf.version.release

rst_epilog = '\n'.join([
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |ent-build| replace:: MongoDB Enterprise',
])

source_constants = {
    'package-branch': 'testing',
    'package-name-org': 'mongodb-org',
    'package-name-enterprise': 'mongodb-enterprise',
    'version': '4.2',
    'release': 'release',
    'pgp-version': '4.0',
    'pgp-fingerprint': '9DA31620334BD75D9DCB49F368818C72E52529D4'
}

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'manual': ('https://www.mongodb.com/docs/manual%s', ''),
    'perl-api': ('https://metacpan.org/pod/MongoDB::%s', ''),
    'node-docs': ('http://mongodb.github.io/node-mongodb-native/3.0/%s', ''),
    'node-api': ('http://mongodb.github.io/node-mongodb-native/3.0/api/%s', ''),
    'ruby-api': ('http://api.mongodb.com/ruby/current/Mongo/%s', ''),
    'scala-api': ('http://mongodb.github.io/mongo-scala-driver/2.2/scaladoc/org/mongodb/scala/MongoCollection.html#%s', ''),
    'csharp-api': ('https://mongodb.github.io/mongo-csharp-driver/2.5/apidocs/html/%s.htm', ''),
    'csharp-docs': ('https://mongodb.github.io/mongo-csharp-driver/2.5/reference/%s', ''),
    'java-async-docs': ('http://mongodb.github.io/mongo-java-driver/3.7/%s', ''),
    'java-async-api': ('http://mongodb.github.io/mongo-java-driver/3.7/javadoc/%s', ''),
    'java-sync-api': ('http://mongodb.github.io/mongo-java-driver/3.7/javadoc/%s', ''),
    'atlas': ('https://www.mongodb.com/docs/atlas%s', ''),
    'stitch': ('https://www.mongodb.com/docs/realm%s', ''),
}

intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
                                                       conf.paths.output, i.path))

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
html_theme_path = [ os.path.join(conf.paths.buildsystem, 'themes') ]
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
    'manual_path': "bi-connector",
    'repo_name': 'docs-bi-connector',
    'jira_project': 'DOCS',
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'epubpath': manual_edition_path.format(conf.project.url,
                                           conf.project.basepath,
                                           'mongodb-guides', 'epub'),
    'nav_excluded': sconf.theme.nav_excluded,
    'version_selector': get_versions(conf),

}

html_sidebars = sconf.sidebars


# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = conf.project.title
epub_author = u'MongoDB Documentation Project'
epub_publisher = u'MongoDB, Inc.'
epub_copyright = copyright
epub_theme = 'epub_mongodb'
epub_tocdup = True
epub_tocdepth = 3
epub_language = 'en'
epub_scheme = 'url'
epub_identifier = 'http://docs.mongodb.org/guides/'
epub_exclude_files = []
epub_pre_files = []
epub_post_files = []

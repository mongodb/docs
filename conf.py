# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os
import datetime

try:
    project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
except NameError:
    project_root = os.path.abspath(os.getcwd())

sys.path.append(project_root)

from bootstrap import buildsystem

sys.path.append(os.path.join(project_root, buildsystem, 'sphinxext'))
sys.path.append(os.path.join(project_root, buildsystem, 'bin'))

from utils import ingest_yaml, ingest_yaml_list
from docs_meta import get_conf, get_versions, get_manual_path

conf = get_conf()
conf.build.paths.projectroot = project_root
pdfs = ingest_yaml_list(os.path.join(conf.build.paths.builddata, 'pdfs.yaml'))
intersphinx_libs = ingest_yaml_list(os.path.join(conf.build.paths.builddata, 'intersphinx.yaml'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.intersphinx',
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
]

locale_dirs = [ conf.build.paths.locale ]
gettext_compact = False

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = 'contents'
language = 'en'
project = u'mongodb-manual'
copyright = u'2011-' + str(datetime.date.today().year) + ', MongoDB, Inc.'
version = conf.version.branch
release = conf.version.release

rst_epilog = '\n'.join([
    '.. |branch| replace:: ``' + conf.git.branches.current + '``',
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: ' + str(datetime.date.today().year),
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |hardlink| replace:: ' + conf.project.url + '/' + conf.git.branches.current
])

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'wiki': ('http://www.mongodb.org/display/DOCS/%s', ''),
    'api': ('http://api.mongodb.org/%s', ''),
    'source': ('https://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/' + conf.git.branches.current + '/%s', ''),
    'hardlink' : ( 'http://docs.mongodb.org/' + conf.git.branches.current + '/%s', ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'ecosystem': ('http://docs.mongodb.org/ecosystem%s', ''),
    'meta-driver': ('http://docs.mongodb.org/meta-driver/latest%s', ''),
    'mms': ('http://mms.mongodb.org/help%s', ''),
    'mms-hosted': ('http://mms.mongodb.org/help-hosted%s', ''),
    'about': ('http://www.mongodb.org/about%s', '')
}

## add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = ( conf.project.url + '/' + i + '%s', '')

intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i['name']] = ( i['url'], os.path.join(conf.build.paths.projectroot,
                                                              conf.build.paths.output,
                                                              i['path']))

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

html_theme = 'manual'
html_theme_path = [ os.path.join(buildsystem, 'themes') ]
html_title = conf.project.title
htmlhelp_basename = 'MongoDBdoc'

html_logo = ".static/logo-mongodb.png"
html_static_path = ['source/.static']

html_copy_source = False
html_use_smartypants = True
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '{0}/{1}/MongoDB-manual'.format(conf.project.url, conf.git.branches.current)

html_theme_options = {
    'branch': conf.git.branches.current,
    'pdfpath': manual_edition_path + '.pdf',
    'epubpath': manual_edition_path + '.epub',
    'manual_path': get_manual_path(conf),
    'translations': languages,
    'language': language,
    'repo_name': 'docs',
    'jira_project': 'DOCS',
    'google_analytics': 'UA-7301842-8',
    'project': 'manual',
    'version': version,
    'version_selector': get_versions(conf),
    'stable': conf.version.stable,
}

html_sidebars = {
    '**': ['pagenav.html'],
}
html_sidebars['**'].append('formats.html')

# -- Options for LaTeX output --------------------------------------------------

latex_documents = []
for pdf in pdfs:
    _latex_document = ( pdf['source'], pdf['output'], pdf['title'], pdf['author'], pdf['class'])
    latex_documents.append( _latex_document )

latex_preamble_elements = [ r'\DeclareUnicodeCharacter{FF04}{\$}',
                            r'\DeclareUnicodeCharacter{FF0E}{.}',
                            r'\PassOptionsToPackage{hyphens}{url}',
                            r'\usepackage{upquote}',
                            r'\pagestyle{plain}',
                            r'\pagenumbering{arabic}' ]
latex_elements = {
    'preamble': '\n'.join(latex_preamble_elements),
    'pointsize': '10pt',
    'papersize': 'letterpaper'
}

latex_paper_size = 'letter'
latex_use_parts = False
latex_show_pagerefs = True
latex_show_urls = 'footnote'
latex_domain_indices = False
latex_logo = None
latex_appendices = []

# -- Options for manual page output --------------------------------------------

man_pages = [
  # (source start file, name, description, authors, manual section).
    ('reference/program/bsondump', 'bsondump', u'MongoDB BSON utility', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongo', 'mongo', u'MongoDB Shell', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongod', 'mongod', u'MongoDB Server', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongos', 'mongos', u'MongoDB Shard Utility', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongodump', 'mongodump', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongoexport', 'mongoexport', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongofiles', 'mongofiles', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongoimport', 'mongoimport', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongooplog', 'mongooplog', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongorestore', 'mongorestore', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongostat', 'mongostat', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongosniff', 'mongosniff', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongotop', 'mongotop', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/program/mongoperf', 'mongoperf', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/parameters', 'mongodb-parameters', u'MongoDB Parameters', [u'MongoDB Documentation Project'], 5),
]

# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = conf.project.title
epub_author = u'MongoDB Documentation Project'
epub_publisher = u'MongoDB, Inc.'
epub_copyright = copyright
epub_theme = 'epub_mongodb'
epub_tocdup = True
epub_tocdepth = 3
epub_language = language
epub_scheme = 'url'
epub_identifier = conf.project.url + '/' + conf.git.branches.current
epub_exclude_files = []

epub_pre_files = []
epub_post_files = []

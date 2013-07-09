# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os.path

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from bootstrap import buildsystem

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'sphinxext')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'bin')))

from utils import ingest_yaml, ingest_yaml_list

meta = ingest_yaml('meta.yaml')
pdfs = ingest_yaml_list('pdfs.yaml')

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.intersphinx',
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
]

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = 'contents'
language = 'en'
project = u'mongodb-manual'
copyright = u'2011-' + meta['date'] + ', 10gen, Inc.'
version = '2.2'
release = '2.2.5'

BREAK = '\n'
rst_epilog = ('.. |branch| replace:: ``' + meta['branch'] + '``' + BREAK +
              '.. |copy| unicode:: U+000A9' + BREAK +
              '.. |year| replace:: ' + meta['date'] + BREAK +
              '.. |ent-build| replace:: the MongoDB Subscriber Edition' + BREAK +
              '.. |hardlink| replace:: http://docs.mongodb.org/' + meta['branch'])

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'wiki': ('http://www.mongodb.org/display/DOCS/%s', ''),
    'api': ('http://api.mongodb.org/%s', ''),
    'source': ('https://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/' + meta['branch'] + '/%s', ''),
    'hardlink' : ( 'http://docs.mongodb.org/' + meta['branch'] + '/%s', ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'ecosystem': ('http://docs.mongodb.org/ecosystem%s', ''),
    'meta-driver': ('http://docs.mongodb.org/meta-driver/latest%s', ''),
    'about': ('http://www.mongodb.org/about%s', '')
}

## add `extlinks` for each published version.
for i in meta['published_branches']:
    extlinks[i] = ('http://docs.mongodb.org/' + i + '%s', '')

intersphinx_mapping = {
        # see bin/makefile-builder/intersphinx.py and bin/intersphinx-download.py
        # for more information.
        'pymongo': ('http://api.mongodb.org/python/current/', '../../../build/pymongo.inv'),
        'python' : ('http://docs.python.org/2/', '../../../build/python2.inv'),
        'python2' : ('http://docs.python.org/2/', '../../../build/python2.inv'),
        'python3' : ('http://docs.python.org/3/', '../../../build/python3.inv'),
        'django': ('https://django.readthedocs.org/en/latest/', '../../../build/django.inv'),
#        'djangomongodbengine': ('http://django-mongodb.org/', '../../../build/djangomongodb.inv'), # website currently 404s
        'djangotoolbox' : ('http://djangotoolbox.readthedocs.org/en/latest/', '../../../build/djangotoolbox.inv'),
}

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

html_theme = 'mongodb'
html_theme_path = [ os.path.join(buildsystem, 'themes') ]
html_title = "MongoDB Manual"
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

manual_edition_path = 'http://docs.mongodb.org/{0}/MongoDB-manual'.format(meta['branch'])

html_theme_options = {
    'branch': meta['branch'],
    'pdfpath': manual_edition_path + '.pdf',
    'epubpath': manual_edition_path + '.epub',
    'manual_path': meta['manual_path'],
    'translations': languages,
    'language': language,
    'repo_name': 'docs',
    'jira_project': 'DOCS',
    'google_analytics': 'UA-7301842-8',
    'project': 'manual',
    'version': version,
    'version_selector': meta['version_selector'],
    'stable': meta['stable'],
}

html_sidebars = {
    '**': ['pagenav.html'],
}
html_sidebars['**'].append('formats.html')
html_sidebars['**'].append('intrasites.html')
# html_sidebars['**'].append('translations.html')
html_sidebars['**'].append('resources.html')

# -- Options for LaTeX output --------------------------------------------------

latex_documents = []
for pdf in pdfs:
    _latex_document = ( pdf['source'], pdf['output'], pdf['title'], pdf['author'], pdf['class'])
    latex_documents.append( _latex_document )

latex_elements = {
    'preamble': '\DeclareUnicodeCharacter{FF04}{\$} \DeclareUnicodeCharacter{FF0E}{.} \PassOptionsToPackage{hyphens}{url}',
    'pointsize': '10pt',
    'papersize': 'letterpaper'
}

latex_paper_size = 'letter'
latex_use_parts = True
latex_show_pagerefs = True
latex_show_urls = False
latex_domain_indices = True
latex_logo = None
latex_appendices = []

# -- Options for manual page output --------------------------------------------

man_pages = [
  # (source start file, name, description, authors, manual section).
    ('reference/bsondump', 'bsondump', u'MongoDB BSON utility', [u'MongoDB Documentation Project'], 1),
    ('reference/mongo', 'mongo', u'MongoDB Shell', [u'MongoDB Documentation Project'], 1),
    ('reference/mongod', 'mongod', u'MongoDB Server', [u'MongoDB Documentation Project'], 1),
    ('reference/mongos', 'mongos', u'MongoDB Shard Utility', [u'MongoDB Documentation Project'], 1),
    ('reference/mongodump', 'mongodump', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongoexport', 'mongoexport', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongofiles', 'mongofiles', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongoimport', 'mongoimport', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongooplog', 'mongooplog', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongorestore', 'mongorestore', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongostat', 'mongostat', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongosniff', 'mongosniff', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongotop', 'mongotop', u'MongoDB', [u'MongoDB Documentation Project'], 1),
    ('reference/mongoperf', 'mongoperf', u'MongoDB', [u'MongoDB Documentation Project'], 1),
]

texinfo_documents = [
    ('contents', 'mongodb-manual', 'MongoDB Manual', '10gen, Inc.', 'mongodb', 'MongoDB Manual', 'Database', True),
    ('meta/reference', 'mongodb-reference', 'MongoDB Reference Manual', '10gen, Inc.', 'mongodb', 'Reference Material for MongoDB', 'Database', False),
    ('crud', 'mongodb-crud', 'MongoDB Crud Guide', '10gen, Inc.', 'mongodb', 'CRUD Operation Guide for MongoDB', 'Database', False),
]

# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = u'MongoDB'
epub_author = u'MongoDB Documentation Project'
epub_publisher = u'MongoDB Documentation Project'
epub_copyright = u'2011-' + meta['date'] + ', 10gen Inc.'
epub_theme = 'epub_mongodb'
epub_tocdup = True
epub_tocdepth = 3
epub_language = language
epub_scheme = 'url'
epub_identifier = 'http://docs.mongodb.org/' + meta['branch']
epub_exclude_files = []

epub_pre_files = []
epub_post_files = []

# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys, os
import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "bin")))

import mongodb_docs_meta

meta = {
    'branch': mongodb_docs_meta.get_branch(),
    'commit': mongodb_docs_meta.get_commit(),
    'manual_path': mongodb_docs_meta.get_manual_path(),
    'date': str(datetime.date.today().year),
}

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'
extensions = ["sphinx.ext.intersphinx", "sphinx.ext.extlinks", "mongodb_domain", "additional_directives", "aggregation_domain"]
templates_path = ['.templates']

source_suffix = '.txt'
master_doc = 'contents'

project = u'MongoDB Ecosystem'
copyright = u'2011-2012, 10gen, Inc.'

version = '2.2.2'
release = version

current_git_commit = meta['commit']
current_git_branch = meta['branch']

rst_epilog = ".. |branch| replace:: ``" + current_git_branch + "``" + """
.. |commit| replace:: ``""" + current_git_commit + "``" + """
.. |copy| unicode:: U+000A9
.. |hardlink| replace:: http://docs.mongodb.org/""" + current_git_branch

exclude_patterns = []

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'wiki': ('http://www.mongodb.org/display/DOCS/%s', ''),
    'api': ('http://api.mongodb.org/%s', ''),
    'source': ('http://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/' + current_git_branch + '/%s', ''),
    'hardlink' : ( 'http://docs.mongodb.org/' + current_git_branch + '/%s', '')
}

intersphinx_mapping = {
    'pymongo': ('http://api.mongodb.org/python/current/', None),
    'manual': ('http://docs.mongodb.org/manual/', None)
}

# -- Options for HTML output ---------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes...
html_theme = 'mongodb'
html_theme_path = ['themes']
html_title = project
html_logo = "source/.static/logo-mongodb.png"
html_static_path = ['source/.static']
html_last_updated_fmt = '%b %d, %Y'

html_copy_source = False
html_use_smartypants = True
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = 'http://docs.mongodb.org/ecosystem/MongoDB-Ecosystem'

html_theme_options = {
    'branch': current_git_branch,
    'pdfpath':  manual_edition_path + '.pdf',
    'epubpath':  manual_edition_path + '.epub',
    'manual_path': meta['manual_path'],
    'repo_name': 'docs-ecosystem',
    'jira_project': 'DOCS',
    'google_analytics': 'UA-7301842-8',
    'is_manual': False,
    'project': 'ecosystem',
}

html_sidebars = {
    '**': ['pagenav.html'],
}

htmlhelp_basename = 'MongoDBdoc'

# -- Options for LaTeX output --------------------------------------------------

latex_documents = [
#   (source start file, target name, title, author, documentclass [howto/manual]).
    ('contents', 'MongoDB-Ecosystem.tex', u'MongoDB Ecosystem Documentation', u'MongoDB Documentation Project', 'manual'),
]

latex_elements = {
    'preamble': '\DeclareUnicodeCharacter{FF04}{\$} \DeclareUnicodeCharacter{FF0E}{.}',
    'pointsize': '10pt',
    'papersize': 'letterpaper'
}

latex_use_parts = True
latex_show_pagerefs = True
latex_show_urls = False
latex_domain_indices = True
latex_appendices = []

# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = u'MongoDB'
epub_author = u'MongoDB Documentation Project'
epub_publisher = u'MongoDB Documentation Project'
epub_copyright = u'2011, 10gen Inc.'
epub_theme = 'epub_mongodb'
epub_tocdup = True
epub_tocdepth = 3
epub_language = 'en'
epub_scheme = 'url'
epub_identifier = 'http://docs.mongodb.org/ecosystem/'
epub_exclude_files = []
epub_pre_files = []
epub_post_files = []

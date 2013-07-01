# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Fri Sep 23 17:07:35 2011.

import sys, os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from bootstrap import buildsystem

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'sphinxext')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'bin')))

from utils import ingest_yaml, ingest_yaml_list

pdfs = ingest_yaml_list('pdfs.yaml')
meta = ingest_yaml('meta.yaml')

# -- General configuration -----------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.
extensions = ['sphinx.ext.intersphinx', 'sphinx.ext.todo', 'sphinx.ext.ifconfig']
templates_path = ['templates']
source_suffix = '.txt'
master_doc = 'index'

copyright = u'2011-2013, 10gen, Inc.'

version = '1.2'
release = 'Upcoming'
pygments_style = 'sphinx'

# -- Options for HTML output ---------------------------------------------------

html_theme = '10gen'
html_theme_path = ['themes']
html_logo = "source/.static/logo-10gen.png"
html_static_path = ['source/_static']
html_use_smartypants = True
html_use_index = True
html_split_index = False
html_use_modindex = False
html_show_sourcelink = False
htmlhelp_basename = 'MongoDBdoc'

html_theme_options = {
    'project': 'mms',
    'version': version,
    'branch': meta['branch'],
    'version_selector': meta['version_selector'],
    'stable': meta['upcoming'],
}

hosted_latex_documents = []
saas_latex_documents = []

for pdf in pdfs:
    _latex_document = ( pdf['source'], pdf['output'], pdf['title'], pdf['author'], pdf['class'])
    if pdf['edition'] == 'hosted':
        hosted_latex_documents.append( _latex_document )
    elif pdf['edition'] == 'saas':
        saas_latex_documents.append( _latex_document )

# -- Conditional Output --------------------------------------------------------
BREAK = '\n\n'
if tags.has('hosted'): 
    project = u'On-Prem Monitoring / MMS'
    html_title = 'On-Prem Monitoring / MMS'
    html_short_title = 'On-Prem Monitoring / MMS'
    html_theme_options['edition'] = 'hosted'
    latex_documents = hosted_latex_documents
    rst_epilog = '\n'
    rst_epilog += ".. |s| replace:: Suite" + BREAK
    rst_epilog += ".. |index-page-title| replace:: On-Prem Monitoring" + BREAK
    rst_epilog += ".. |mms| replace:: On-Prem Monitoring" + BREAK
else:
    project = u'MongoDB Monitoring and Backup Service (MMS)'
    html_title = 'MMS Manual'
    html_short_title = 'MMS'
    html_theme_options['edition'] = 'saas'
    latex_documents = saas_latex_documents
    rst_epilog = '\n'
    rst_epilog += ".. |s| replace:: Service" + BREAK
    rst_epilog += ".. |index-page-title| replace:: MongoDB Monitoring and Backup Service" + BREAK
    rst_epilog += ".. |mms| replace:: MongoDB Monitoring and Backup Service" + BREAK
    
# -- Options for LaTeX output --------------------------------------------------

latex_paper_size = 'letter' # ('letter' or 'a4').
latex_font_size = '10pt' # ('10pt', '11pt' or '12pt').
latex_logo = None
latex_preamble = ''
latex_use_parts = False
latex_use_modindex = False

# Example configuration for intersphinx: refer to the Python standard library.

intersphinx_mapping = {'http://docs.python.org/': None}
intersphinx_cache_limit = 30

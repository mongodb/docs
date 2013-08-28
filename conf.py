# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Fri Sep 23 17:07:35 2011.

import sys
import os

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))

sys.path.append(project_root)

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from bootstrap import buildsystem

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'sphinxext')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), buildsystem, 'bin')))

from utils import ingest_yaml, ingest_yaml_list

meta = ingest_yaml(os.path.join(project_root, 'meta.yaml'))
pdfs = ingest_yaml_list(os.path.join(project_root, 'pdfs.yaml'))

# -- General configuration -----------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.
extensions = ['sphinx.ext.intersphinx', 'sphinx.ext.todo', 'sphinx.ext.ifconfig']
templates_path = ['templates']
source_suffix = '.txt'
master_doc = 'index'

copyright = u'2011-2013, MongoDB, Inc.'

version = '1.4-pre'
release = 'Upcoming'
pygments_style = 'sphinx'

# -- Options for HTML output ---------------------------------------------------

html_theme = 'mongodb'
html_theme_path = [ os.path.join(buildsystem, 'themes') ]
html_logo = "source/.static/logo-10gen.png"
html_static_path = ['source/_static']
html_use_smartypants = True
html_use_index = True
html_split_index = False
html_use_modindex = False
html_show_sourcelink = False
htmlhelp_basename = 'MongoDB doc'

html_theme_options = {
    'project': 'mms',
    'version': version,
    'branch': meta['branch'],
    'google_analytics': 'UA-7301842-7',
    'version_selector': meta['version_selector'],
    'stable': meta['upcoming'],
}
html_sidebars = {
    '**': [],
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
try:
    if tags.has('hosted'):
        project = u'MongoDB Management Service (MMS) On-Prem'
        html_title = 'MMS On-Prem Manual'
        html_short_title = 'MMS On-Prem Manual'
        latex_documents = hosted_latex_documents
        rst_epilog = '\n'
        rst_epilog += ".. |s| replace:: Suite" + BREAK
        rst_epilog += ".. |index-page-title| replace:: MongoDB Management Service On-Prem" + BREAK
        rst_epilog += ".. |mms| replace:: MongoDB Management Service On-Prem" + BREAK
        rst_epilog += ".. |backup| replace:: MMS Backup On-Prem" + BREAK
        rst_epilog += ".. |monitoring| replace:: MMS Monitoring On-Prem" + BREAK
        rst_epilog += ".. |release-string| replace:: -- {0} Release".format(release) + BREAK
        html_sidebars['**'].append('sidebar-nav-mms-hosted.html')
    else:
        project = u'MongoDB Management Service (MMS)'
        html_title = 'MMS Manual'
        html_short_title = 'MMS Manual'
        latex_documents = saas_latex_documents
        rst_epilog = '\n'
        rst_epilog += ".. |s| replace:: Service" + BREAK
        rst_epilog += ".. |index-page-title| replace:: MongoDB Management Service (MMS)" + BREAK
        rst_epilog += ".. |mms| replace:: MongoDB Management Service" + BREAK
        rst_epilog += ".. |backup| replace:: MMS Backup" + BREAK
        rst_epilog += ".. |monitoring| replace:: MMS Monitoring" + BREAK
        html_sidebars['**'].append('sidebar-nav.html')

        if release == "Upcoming":
            rst_epilog += ".. |release-string| replace:: \   "
        else:
            rst_epilog += ".. |release-string| replace:: -- {0} Release".format(release) + BREAK
except NameError:
    pass

html_sidebars['**'].extend(['searchbox.html', 'mms-resources.html', 'intrasite-manual.html'])

# -- Options for LaTeX output --------------------------------------------------

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

latex_logo = None
latex_use_parts = False
latex_use_modindex = False

# Example configuration for intersphinx: refer to the Python standard library.

intersphinx_mapping = {'http://docs.python.org/': None}
intersphinx_cache_limit = 30

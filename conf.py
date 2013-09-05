# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Fri Sep 23 17:07:35 2011.

import sys, os

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

from bootstrap import buildsystem

sys.path.append(os.path.join(project_root, buildsystem, 'sphinxext'))
sys.path.append(os.path.join(project_root, buildsystem, 'bin'))

from utils import ingest_yaml, ingest_yaml_list
from docs_meta import get_conf, get_versions, get_manual_path

conf = get_conf()
pdfs = ingest_yaml_list(os.path.join(conf.build.paths.builddata, 'pdfs.yaml'))
intersphinx_libs = ingest_yaml_list(os.path.join(conf.build.paths.builddata, 'intersphinx.yaml'))

# -- General configuration -----------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.
extensions = [
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx.ext.extlinks'
]

templates_path = ['templates']
source_suffix = '.txt'
master_doc = 'index'

copyright = u'2011-2013, MongoDB, Inc.'

version = '1.4-pre'
release = 'Upcoming'
pygments_style = 'sphinx'

# -- Options for HTML output ---------------------------------------------------

html_theme = 'mms'
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
    'version': version,
    'branch': conf.git.branches.current,
    'manual_path': get_manual_path(conf),
    'google_analytics': 'UA-7301842-7',
    'version_selector': get_versions(conf),
    'stable': conf.version.stable,
}

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
    'about': ('http://www.mongodb.org/about%s', '')
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
rst_epilog = []
html_sidebars = { '**': [] }

try:
    if tags.has('hosted'):
        project = u'MongoDB Management Service (MMS) On-Prem'
        html_title = 'MMS On-Prem Manual'
        html_short_title = 'MMS On-Prem Manual'
        latex_documents = hosted_latex_documents
        rst_epilog.append(".. |s| replace:: Suite")
        rst_epilog.append(".. |index-page-title| replace:: MongoDB Management Service On-Prem")
        rst_epilog.append(".. |mms| replace:: MongoDB Management Service On-Prem")
        rst_epilog.append(".. |backup| replace:: MMS Backup On-Prem")
        rst_epilog.append(".. |monitoring| replace:: MMS Monitoring On-Prem")
        html_sidebars['**'].append('sidebar-nav-mms-hosted.html')
        html_theme_template['edition'] = 'hosted'

        if release == "Upcoming":
            rst_epilog.append(".. |release-string| replace:: \   ")
        else:
            rst_epilog.append(".. |release-string| replace:: -- {0} Release".format(release))

        ## add `extlinks` for each published version.
        for i in conf.git.branches.published:
            extlinks[i] = ( conf.project.url + '/' + i + '%s', '')
    else:
        project = u'MongoDB Management Service (MMS)'
        html_title = 'MMS Manual'
        html_short_title = 'MMS Manual'
        latex_documents = saas_latex_documents
        rst_epilog.append(".. |s| replace:: Service")
        rst_epilog.append(".. |index-page-title| replace:: MongoDB Management Service (MMS)")
        rst_epilog.append(".. |mms| replace:: MongoDB Management Service")
        rst_epilog.append(".. |backup| replace:: MMS Backup")
        rst_epilog.append(".. |monitoring| replace:: MMS Monitoring")
        html_sidebars['**'].append('sidebar-nav.html')
        html_theme_template['edition'] = 'saas'
except NameError:
    rst_epilog.append(".. |release-string| replace:: \   ")

rst_epilog = '\n'.join(rst_epilog)
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
intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i['name']] = ( i['url'], os.path.join(conf.build.paths.projectroot,
                                                              conf.build.paths.output,
                                                              i['path']))

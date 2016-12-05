# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Fri Sep 23 17:07:35 2011.

import sys
import os
import datetime

from giza.config.runtime import RuntimeStateConfig
from giza.config.helper import fetch_config, get_versions, get_manual_path
from giza.config.project import get_current_path
from giza.content.replacements import get_replacements

conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

# -- General configuration -----------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.
extensions = [
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx.ext.extlinks',
    'intermanual',
    'directives',
    'mongodb'
]

locale_dirs = [ os.path.join(conf.paths.projectroot, conf.paths.locale + '-onprem'),
                os.path.join(conf.paths.projectroot, conf.paths.locale + '-cloud') ]

gettext_compact = False

templates_path = ['templates']
source_suffix = '.txt'
master_doc = 'index'

# MongoDB is added in the layout.html to the copyright
copyright = u'2008-{0}'.format(datetime.date.today().year)

version = conf.version.branch
release = conf.version.release
pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'manual': ('http://docs.mongodb.com/manual%s', ''),
    'v2.2': ('http://docs.mongodb.com/v2.2%s', ''),
    'v2.4': ('http://docs.mongodb.com/v2.4%s', ''),
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

html_theme_path = [ os.path.join(conf.paths.buildsystem, 'themes') ]

html_copy_source = False
html_logo = None
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
    'google_analytics': 'UA-7301842-7',
    'stable': conf.version.stable,
    'manual_branch': conf.git.branches.manual,
    'project': conf.project.name,
    'translations': languages,
    'nav_excluded': sconf.theme.nav_excluded,
    'upcoming': '',
}

onprem_latex_documents = []
cloud_latex_documents = []

latex_documents = []
if 'pdfs' in conf.system.files.data:
    for pdf in conf.system.files.data.pdfs:
        if pdf.edition == 'onprem':
            onprem_latex_documents.append((pdf.source, pdf.output, pdf.title, pdf.author, pdf.doc_class))
        elif pdf.edition == 'cloud':
            cloud_latex_documents.append((pdf.source, pdf.output, pdf.title, pdf.author, pdf.doc_class))

# -- Conditional Output --------------------------------------------------------
rst_epilog = []
html_sidebars = { '**': ['pagenav.html'] }

try:
    if tags.has('onprem'):
        conf.runstate.edition = 'onprem'

        project = u'MongoDB Ops Manager'
        latex_documents = onprem_latex_documents

        html_title = 'MongoDB Ops Manager Manual'
        html_short_title = 'Ops Manager Manual'

        html_theme = 'mms-onprem'
        html_theme_options['pdfpath'] = '/'.join([conf.project.url,
                                                  conf.git.branches.current,
                                                  'opsmanager-manual.pdf'])
        html_theme_options['edition'] = 'hosted'
        html_theme_options['sitename'] = 'Ops Manager Docs'

        if release == "Upcoming":
            rst_epilog.append(".. |release-string| replace:: \   ")
            
            # If upcoming, pop in the latest stable/current version
            rst_epilog.append(".. |manifestlink| replace:: https://opsmanager.mongodb.com/static/version_manifest/{0}.json".format(conf.git.branches.current))

        else:
            rst_epilog.append(".. |release-string| replace:: -- {0} Release".format(release))
            rst_epilog.append(".. |manifestlink| replace:: https://opsmanager.mongodb.com/static/version_manifest/{0}.json".format(version))


        ## add `extlinks` for each published version.
        for i in conf.git.branches.published:
            extlinks[i] = ( conf.project.url + '/' + i + '%s', '')
    elif tags.has('cloud'):
        conf.runstate.edition = 'cloud'

        project = u'MongoDB Cloud Manager'

        latex_documents = cloud_latex_documents

        html_short_title = 'Cloud Manager Manual'
        html_title = 'MongoDB Cloud Manager Manual'

        html_theme = 'mms-cloud'
        html_theme_options['edition'] = 'saas'
        html_theme_options['pdfpath'] = '/' + 'cloudmanager-manual.pdf'
        html_theme_options['sitename'] = 'Cloud Manager Docs'
except NameError:
    pass

rst_epilog.extend(get_replacements(conf))
rst_epilog = '\n'.join(rst_epilog)

html_theme_options['manual_path'] = get_manual_path(conf)

existing = conf.runstate.edition
conf.runstate.edition = 'saas'
html_theme_options['saas_base'] = conf.project.tag
conf.runstate.edition = 'onprem'
html_theme_options['version_selector'] = get_versions(conf)
conf.runstate.edition = existing
html_theme_options['basepath'] = get_current_path(conf)

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
    'papersize': 'letterpaper',
    'tableofcontents': '\\clearpage\\textcopyright{ MongoDB, Inc. 2008 - 2016 }\\clearpage\\tableofcontents'
}

latex_logo = None
latex_use_parts = False
latex_use_modindex = False

# Example configuration for intersphinx: refer to the Python standard library.
intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
                                                        conf.paths.output,
                                                        i.path))

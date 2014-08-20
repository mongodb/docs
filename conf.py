# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Fri Sep 23 17:07:35 2011.

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

try:
    from utils.structures import BuildConfiguration
    from utils.serialization import ingest_yaml, ingest_yaml_list
    from utils.config import get_conf
    from utils.project import get_current_path, get_versions, get_manual_path, edition_setup

    conf = get_conf()
    conf.paths.projectroot = project_root
    pdfs = ingest_yaml_list(os.path.join(conf.paths.builddata, 'pdfs.yaml'))
    intersphinx_libs = ingest_yaml_list(os.path.join(conf.paths.builddata, 'intersphinx.yaml'))

    hosted_conf = edition_setup('hosted', conf)
    saas_conf = edition_setup('saas', conf)
except:
    from giza.config.runtime import RuntimeStateConfig
    from giza.config.helper import fetch_config, get_versions, get_manual_path
    from giza.tools.strings import dot_concat

    conf = fetch_config(RuntimeStateConfig())
    intersphinx_libs = conf.system.files.data.intersphinx
    pdfs = conf.system.files.data.pdfs

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
    'mongodb',
    'sphinxcontrib.httpdomain',
]

locale_dirs = [ os.path.join(conf.paths.projectroot, conf.paths.locale + '-hosted'),
                os.path.join(conf.paths.projectroot, conf.paths.locale + '-saas')]
gettext_compact = False

templates_path = ['templates']
source_suffix = '.txt'
master_doc = 'index'

copyright = u'2011-' + str(datetime.date.today().year) + ', MongoDB, Inc.'

version = conf.version.branch
release = conf.version.release
pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'wiki': ('http://www.mongodb.org/display/DOCS/%s', ''),
    'api': ('http://api.mongodb.org/%s', ''),
    'source': ('https://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/' + conf.git.branches.current + '/%s', ''),
    'hardlink' : ( 'http://docs.mongodb.org/' + conf.git.branches.current + '/%s', ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'v2.2': ('http://docs.mongodb.org/v2.2%s', ''),
    'v2.4': ('http://docs.mongodb.org/v2.4%s', ''),
    'ecosystem': ('http://docs.mongodb.org/ecosystem%s', ''),
    'meta-driver': ('http://docs.mongodb.org/meta-driver/latest%s', ''),
    'about': ('http://www.mongodb.org/about%s', '')
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
html_theme_path = [ os.path.join(buildsystem, 'themes') ]
html_logo = None
html_static_path = ['source/_static', 'source/figures']
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
    'nav_excluded': [ '/tutorial/nav/monitoring-getting-started',
                      '/tutorial/nav/backup-getting-started' ]
}

hosted_latex_documents = []
saas_latex_documents = []

try:
    latex_documents = []
    if 'pdfs' in conf.system.files.data:
        for pdf in conf.system.files.data.pdfs:
            if pdf.edition == 'hosted':
                hosted_latex_documents.append((pdf.source, pdf.output, pdf.title, pdf.author, pdf.doc_class))
            elif pdf.edition == 'saas':
                saas_latex_documents.append((pdf.source, pdf.output, pdf.title, pdf.author, pdf.doc_class))
except AttributeError:
    # we have an old-style config object, do the old
    latex_documents = []

    if tags.has('latex'):
        pdf_conf_path = os.path.join(conf.paths.builddata, 'pdfs.yaml')
        if os.path.exists(pdf_conf_path):
            pdfs = ingest_yaml_list(pdf_conf_path)
        else:
            raise SphinxError('[WARNING]: skipping pdf builds because of missing {0} file'.format(pdf_conf_path))
    else:
        pdfs = []


    for pdf in pdfs:
        _latex_document = ( pdf['source'], pdf['output'], pdf['title'], pdf['author'], pdf['class'])
        if pdf['edition'] == 'hosted':
            hosted_latex_documents.append( _latex_document )
        elif pdf['edition'] == 'saas':
            saas_latex_documents.append( _latex_document )

# -- Conditional Output --------------------------------------------------------
rst_epilog = []
html_sidebars = { '**': ['pagenav.html'] }

try:
    if tags.has('hosted'):
        try:
            conf = hosted_conf
        except NameError:
            conf.runstate.edition = 'hosted'

        html_theme = 'mms-hosted'
        project = u'MongoDB Management Service (MMS) On-Prem'
        html_title = 'MMS On-Prem Manual'
        html_short_title = 'MMS On-Prem Manual'
        html_theme_options['pdfpath'] = '/'.join([conf.project.url,
                                                  conf.project.basepath,
                                                  conf.git.branches.current,
                                                  'mms-manual.pdf'])
        latex_documents = hosted_latex_documents
        rst_epilog.append(".. |s| replace:: Suite")
        rst_epilog.append(".. |index-page-title| replace:: On Prem MongoDB Management Service")
        rst_epilog.append(".. |mms| replace:: On-Prem MongoDB Management Service")
        rst_epilog.append(".. |backup| replace:: On Prem MMS Backup")
        rst_epilog.append(".. |automation| replace:: On Prem MMS Automation")
        rst_epilog.append(".. |monitoring| replace:: On Prem MMS Monitoring")
        rst_epilog.append(".. |admin-title-string| replace:: On Prem MMS")
        html_theme_options['edition'] = 'hosted'
        html_theme_options['sitename'] = 'MMS On-Prem Docs'
        if release == "Upcoming":
            rst_epilog.append(".. |release-string| replace:: \   ")
        else:
            rst_epilog.append(".. |release-string| replace:: -- {0} Release".format(release))
        ## add `extlinks` for each published version.
        for i in conf.git.branches.published:
            extlinks[i] = ( conf.project.url + '/' + i + '%s', '')
    else:
        try:
            conf = saas_conf
        except NameError:
            conf.runstate.edition = 'saas'

        html_theme = 'mms-saas'
        html_theme_options['pdfpath'] = '/'.join([conf.project.url,
                                                  conf.project.basepath,
                                                  'mms-manual.pdf'])
        project = u'MongoDB Management Service (MMS)'
        html_title = 'MMS Manual'
        html_short_title = 'MMS Manual'
        latex_documents = saas_latex_documents
        rst_epilog.append(".. |s| replace:: Service")
        rst_epilog.append(".. |index-page-title| replace:: MongoDB Management Service (MMS)")
        rst_epilog.append(".. |mms| replace:: MongoDB Management Service")
        rst_epilog.append(".. |automation| replace:: MMS Automation")
        rst_epilog.append(".. |backup| replace:: MMS Backup")
        rst_epilog.append(".. |monitoring| replace:: MMS Monitoring")
        rst_epilog.append(".. |release-string| replace:: \ ")
        rst_epilog.append(".. |admin-title-string| replace:: MMS")
        html_theme_options['edition'] = 'saas'
        html_theme_options['sitename'] = 'MMS Docs'
except NameError:
    pass

rst_epilog = '\n'.join(rst_epilog)

html_theme_options['manual_path'] = get_manual_path(conf)

try:
    html_theme_options['saas_base'] = saas_conf.project.tag
    html_theme_options['version_selector'] = get_versions(hosted_conf)
except NameError:
    existing = conf.runstate.edition
    conf.runstate.edition = 'saas'
    html_theme_options['saas_base'] = conf.project.tag
    conf.runstate.edition = 'hosted'
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
    'papersize': 'letterpaper'
}

latex_logo = None
latex_use_parts = False
latex_use_modindex = False

# Example configuration for intersphinx: refer to the Python standard library.
intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i['name']] = ( i['url'], os.path.join(conf.paths.projectroot,
                                                              conf.paths.output,
                                                              i['path']))

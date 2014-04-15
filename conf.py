# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os
import datetime

from sphinx.errors import SphinxError

try:
    project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
except NameError:
    project_root = os.path.abspath(os.getcwd())

sys.path.append(project_root)

from bootstrap import buildsystem

sys.path.append(os.path.join(project_root, buildsystem, 'sphinxext'))
sys.path.append(os.path.join(project_root, buildsystem, 'bin'))

from utils.config import get_conf
from utils.project import get_versions, get_manual_path
from utils.serialization import ingest_yaml, ingest_yaml_list
from utils.structures import BuildConfiguration
from utils.strings import dot_concat

conf = get_conf()

conf.paths.projectroot = project_root
intersphinx_libs = ingest_yaml_list(os.path.join(conf.paths.builddata, 'intersphinx.yaml'))
sconf = BuildConfiguration(os.path.join(conf.paths.builddata, 'sphinx-local.yaml'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.intersphinx',
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
]

locale_dirs = [ conf.paths.locale ]
gettext_compact = False

templates_path = ['.templates']
exclude_patterns = []

source_suffix = '.txt'

master_doc = sconf.master_doc
language = 'en'
project = sconf.project
copyright = u'2011-{0}'.format(datetime.date.today().year)
version = conf.version.branch
release = conf.version.release

rst_epilog = '\n'.join([
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |hardlink| replace:: {0}/{1}'.format(conf.project.url, conf.git.branches.current)
])

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'wiki': ('http://www.mongodb.org/display/DOCS/%s', ''),
    'api': ('http://api.mongodb.org/%s', ''),
    'source': ('https://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/{0}/%s'.format(conf.git.branches.current), ''),
    'hardlink' : ( 'http://docs.mongodb.org/{0}/%s'.format(conf.git.branches.current), ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'ecosystem': ('http://docs.mongodb.org/ecosystem%s', ''),
    'meta-driver': ('http://docs.mongodb.org/meta-driver/latest%s', ''),
    'mms': ('https://mms.mongodb.com/help%s', ''),
    'mms-hosted': ('https://mms.mongodb.org/help-hosted%s', ''),
    'about': ('http://www.mongodb.org/about%s', '')
}
h
## add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = ( ''.join([ conf.project.url, '/', i, '%s' ]), '' )

intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i['name']] = ( i['url'], os.path.join(conf.paths.projectroot,
                                                              conf.paths.output,
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

html_theme = sconf.theme.name
html_theme_path = [ os.path.join(buildsystem, 'themes') ]
html_title = conf.project.title
htmlhelp_basename = 'MongoDBdoc'

html_logo = sconf.logo
html_static_path = sconf.paths.static

html_copy_source = False
html_use_smartypants = True
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '{0}/{1}/{2}'.format(conf.project.url,
                                           conf.git.branches.current,
                                           sconf.theme.book_path_base)

html_theme_options = {
    'branch': conf.git.branches.current,
    'pdfpath': dot_concat(manual_edition_path, 'pdf'),
    'epubpath': dot_concat(manual_edition_path, 'epub'),
    'manual_path': get_manual_path(conf),
    'translations': languages,
    'language': language,
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.theme.project,
    'version': version,
    'version_selector': get_versions(conf),
    'stable': conf.version.stable,
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
}

html_sidebars = sconf.sidebars

# -- Options for LaTeX output --------------------------------------------------

pdfs = []
try:
    if tags.has('latex'):
        pdf_conf_path = os.path.join(conf.paths.builddata, 'pdfs.yaml')
        if os.path.exists(pdf_conf_path):
            pdfs = ingest_yaml_list(pdf_conf_path)
        else:
            raise SphinxError('[WARNING]: skipping pdf builds because of missing {0} file'.format(pdf_conf_path))
except NameError:
    pass

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

man_page_definitions = []
try:
    if tags.has('man'):
        man_page_conf_path = os.path.join(conf.paths.builddata, 'manpages.yaml')
        if os.path.exists(man_page_conf_path):
            man_page_definitions = ingest_yaml_list(man_page_conf_path)
        else:
            raise SphinxError('[WARNING]: skipping man builds because of missing {0} file'.format(man_page_conf_path))
except NameError:
    pass
man_pages = []
for mp in man_page_definitions:
    man_pages.append((mp['file'], mp['name'], mp['title'], mp['authors'], mp['section']))

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
epub_identifier = ''.join([conf.project.url, '/', conf.git.branches.current])
epub_exclude_files = []

epub_pre_files = []
epub_post_files = []


# put it into your conf.py
def setup(app):
    # disable versioning for speed
    from sphinx.builders.gettext import I18nBuilder
    I18nBuilder.versioning_method = 'none'

    def doctree_read(app, doctree):
        if not isinstance(app.builder, I18nBuilder):
            return
        from docutils import nodes
        from sphinx.versioning import add_uids
        list(add_uids(doctree, nodes.TextElement))
    app.connect('doctree-read', doctree_read)

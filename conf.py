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
from sphinx.ext.extlinks import make_link_role
from giza.config.runtime import RuntimeStateConfig
from giza.config.helper import fetch_config, get_versions, get_manual_path

conf = fetch_config(RuntimeStateConfig())
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

try:
    tags
except NameError:
    class Tags(object):
        def has(self, *args):
            return False

    tags = Tags()

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'fasthtml'
]

locale_dirs = [ os.path.join(conf.paths.projectroot, conf.paths.locale) ]
gettext_compact = False

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
    '.. |copy| unicode:: U+000A9',
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |hardlink| replace:: {0}/{1}'.format(conf.project.url, conf.git.branches.current),
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
])

pygments_style = 'sphinx'

extlinks = {
    'hardlink' : ( 'https://docs.mongodb.com/{0}/%s'.format(conf.git.branches.current), ''),
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'api': ('https://api.mongodb.com/%s', ''),
    'gettingstarted': ('https://docs.mongodb.com/getting-started%s', ''),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'ecosystem': ('https://docs.mongodb.com/ecosystem%s', ''),
    'mms-docs': ('https://docs.cloudmanager.mongodb.com%s', ''),
    'mms-home': ('https://cloud.mongodb.com%s', ''),
    'opsmgr': ('https://docs.opsmanager.mongodb.com/current%s', ''),
    'products': ('https://www.mongodb.com/products%s', '')
}

## add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = ( ''.join([ conf.project.url, '/', i, '%s' ]), '' )

intersphinx_mapping = {}
for i in conf.system.files.data.intersphinx:
    intersphinx_mapping[i.name] = ( i.url, os.path.join(conf.paths.projectroot,
                                                        conf.paths.output,
                                                        i.path))

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

html_logo = sconf.logo
html_static_path = sconf.paths.static

html_copy_source = False
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
    'pdfpath': manual_edition_path + '-' + conf.git.branches.current + '.pdf',
    'epubpath': manual_edition_path + '.epub',
    'manual_path': get_manual_path(conf),
    'translations': languages,
    'language': language,
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.theme.project,
    'version': version,
    'version_selector': get_versions(conf),
    'active_branches': conf.version.active,
    'stable': conf.version.stable,
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
}

html_sidebars = sconf.sidebars

# -- Options for LaTeX output --------------------------------------------------

latex_documents = []
if 'pdfs' in conf.system.files.data:
    for pdf in conf.system.files.data.pdfs:
        latex_documents.append((pdf.source, pdf.output, pdf.title, pdf.author, pdf.doc_class))

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
    'tableofcontents': '\\textcopyright{ MongoDB, Inc. 2008 - 2015 } This work is licensed under a \href{https://creativecommons.org/licenses/by-nc-sa/3.0/us/}{Creative Commons Attribution-NonCommercial-ShareAlike 3.0 United States License}\\clearpage\\tableofcontents'
}

latex_paper_size = 'letter'
latex_use_parts = False
latex_show_pagerefs = True
latex_show_urls = 'footnote'
latex_domain_indices = False
latex_logo = None
latex_appendices = []

# -- Options for manual page output --------------------------------------------

man_pages = []
if 'manpages' in conf.system.files.data:
    for mp in conf.system.files.data.manpages:
        man_pages.append((mp.file, mp.name, mp.title, mp.authors, mp.section))

# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = conf.project.title
epub_author = u'MongoDB, Inc.'
epub_publisher = u'MongoDB, Inc.'
epub_copyright = u'MongoDB, Inc. 2008 - 2015'
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

# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import base64
import sys
import os.path
import datetime

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

from giza.config.runtime import RuntimeStateConfig
from giza.config.helper import fetch_config, get_versions, get_manual_path

conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
pdfs = conf.system.files.data.pdfs
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

# -- General configuration ----------------------------------------------------

needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'fasthtml',
    'tabs',
    'landing_cards',
    'source_constants',
    'xmlrole'
]

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
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |hardlink| replace:: https://docs.mongodb.com/bi-connector/',
    '.. |adc| replace:: :abbr:`ADC (Active Directory Controller)`',
    '.. |bi-atlas-short-link| replace:: :doc:`BI Connector for Atlas </atlas-bi-connector>`',
    '.. |bi-atlas-short| replace:: BI Connector for Atlas',
    '.. |bi-atlas| replace:: MongoDB Connector for Business Intelligence for MongoDB Atlas',
    '.. |bi-short| replace:: BI Connector',
    '.. |bi| replace:: MongoDB Connector for BI',
    '.. |cidr| replace:: :abbr:`CIDR (Classless Inter-Domain Routing)`',
    '.. |dsn| replace:: :abbr:`DSN (Data Source Name)`',
    '.. |epoch-time| replace:: Timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |https| replace:: :abbr:`HTTPS (Secure HyperText Transport Protocol)`',
    '.. |http| replace:: :abbr:`HTTP (HyperText Transport Protocol)`',
    '.. |iana| replace:: :abbr:`IANA (Internet Assigned Numbers Authority)`',
    '.. |ipaddr| replace:: :abbr:`IP (Internet Protocol)`',
    '.. |iso8601-time| replace:: Timestamp in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__ date and time format in |UTC|',
    '.. |jdbc| replace:: :abbr:`JDBC (Java Database Connectivity)`',
    '.. |jira| replace:: `Jira <https://jira.mongodb.org>`__',
    '.. |kdc| replace:: :abbr:`KDC (Key Distribution Center)`',
    '.. |kmip| replace:: :abbr:`KMIP (Key Management Interoperability Protocol)`',
    '.. |ldaps| replace:: :abbr:`LDAPS (Secure Lightweight Directory Access Protocol)`',
    '.. |ldap| replace:: :abbr:`LDAP (Lightweight Directory Access Protocol)`',
    '.. |odbc-driver-name| replace:: MongoDB ODBC driver',
    '.. |odbc| replace:: :abbr:`ODBC (Open Database Connectivity)`',
    '.. |sasl| replace:: :abbr:`SASL (Simple Authentication and Security Layer)`',
    '.. |scram| replace:: :abbr:`SCRAM (Salted Challenge Response Authentication Mechanism)`',
    '.. |spn| replace:: :abbr:`SPN (Service Principal Name)`',
    '.. |sql| replace:: :abbr:`SQL (Structured Query Language)`',
    '.. |ssl| replace:: :abbr:`SSL (Secure Sockets Layer)`',
    '.. |tls-ssl| replace:: :abbr:`TLS (Transport Layer Security)`/:abbr:`SSL (Secure Sockets Layer)`',
    '.. |tls| replace:: :abbr:`TLS (Transport Layer Security)`',
    '.. |upn| replace:: :abbr:`UPN (User Principal Name)`',
    '.. |url| replace:: :abbr:`URL (Uniform Resource Locator)`',
    '.. |utc| replace:: :abbr:`UTC (Coordinated Universal Time)`',
    '.. |mongodump| replace:: :binary:`~bin.mongodump`',
    '.. |mongod| replace:: :binary:`~bin.mongod`',
    '.. |mongorestore| replace:: :binary:`~bin.mongorestore`',
    '.. |mongosqld| replace:: :binary:`~bin.mongosqld`',
    '.. |mongos| replace:: :binary:`~bin.mongos`',
    '.. |mongo| replace:: :binary:`~bin.mongo`',
])

source_constants = {
    'odbc-driver': '`MongoDB ODBC Driver for BI Connector <https://github.com/mongodb/mongo-odbc-driver/releases/>`__',
    'bi-atlas-short': 'BI Connector for Atlas',
    'bi-short': 'BI Connector',
    'download-center': '`MongoDB Download Center <https://www.mongodb.com/download-center/bi-connector>`__',
    'download-center-bi': '`MongoDB Connector for BI <https://www.mongodb.com/download-center/bi-connector>`__',
    'download-center-tableau': '`MongoDB Connector for BI <https://www.mongodb.com/download-center/bi-connector?jmp=tbl>`__',
    'download-center-url': 'https://www.mongodb.com/download-center/bi-connector',
    'java-plugin': 'MongoSQL Authentication Plugin for MySQL Connector/J'
}

extlinks = {
    'gh' : ('https://github.com%s',''),
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'manual': ('http://docs.mongodb.com/manual%s', ''),
    'ms-docs': ('https://docs.microsoft.com/en-us%s',''),
    'mvn' : ('https://mvnrepository.com/artifact%s',''),
    'v2.10': ('https://docs.mongodb.com/bi-connector/v2.10%s',''),
    'v3.6': ('https://docs.mongodb.com/v3.6%s', ''),
    'website': ('https://www.mongodb.com%s?jmp=docs', ''),
    'mysql': ('https://dev.mysql.com%s', '')
}

intersphinx_mapping = {}
for i in intersphinx_libs:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
                                                       conf.paths.output, i.path))

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

html_logo = ".static/logo-mongodb.png"
html_static_path = ['source/.static']
html_last_updated_fmt = '%b %d, %Y'

html_copy_source = False
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '{0}/{1}/{2}.{3}'

html_theme_options = {
    'branch': conf.git.branches.current,
    'translations': languages,
    'language': language,
    'manual_path': "bi-connector",
    'repo_name': 'docs-bi-connector',
    'jira_project': 'DOCS',
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'epubpath': manual_edition_path.format(conf.project.url,
                                           conf.project.basepath,
                                           'mongodb-bi-connector', 'epub'),
    'nav_excluded': sconf.theme.nav_excluded,
    'version_selector': get_versions(conf),
    'is_upcoming': False,
}

html_sidebars = sconf.sidebars


# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = conf.project.title
epub_author = u'MongoDB Documentation Project'
epub_publisher = u'MongoDB, Inc.'
epub_copyright = copyright
epub_theme = 'epub_mongodb'
epub_tocdup = True
epub_tocdepth = 3
epub_language = 'en'
epub_scheme = 'url'
epub_identifier = 'http://docs.mongodb.org/bi-connector/'
epub_exclude_files = []
epub_pre_files = []
epub_post_files = []

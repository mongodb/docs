# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os.path
import datetime

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

from giza.config.runtime import RuntimeStateConfig
from giza.config.helper import fetch_config, get_versions, get_manual_path

conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
sconf = conf.system.files.data.sphinx_local

sys.path.append(os.path.join(conf.paths.projectroot, conf.paths.buildsystem, 'sphinxext'))

# -- General configuration ----------------------------------------------------


extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.todo',
    'mongodb',
    'directives',
    'intermanual',
    'tabs',
    'source_constants',
    'icon'
]

source_constants = {
  'download-page': '`downloads page <https://www.mongodb.com/download-center/compass?tck=docs_compass>`__',
  'current-version': '1.21.2'
}

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
    '.. |hardlink| replace:: http://docs.mongodb.com/compass/',
    '.. |compass| replace:: MongoDB Compass',
    '.. |compass-short| replace:: Compass',
    '.. |checkmark| replace:: :icon:`check-circle`',
    '.. |2fa| replace:: :abbr:`2FA (Two Factor Authentication)`',
    '.. |api| replace:: :abbr:`API (Application Programming Interface)`',
    '.. |aws| replace:: :abbr:`AWS (Amazon Web Services)`',
    '.. |bic-full| replace:: :bic:`MongoDB Connector for BI </>`',
    '.. |bic-official| replace:: MongoDB Connector for Business Intelligence for Atlas',
    '.. |bic-short| replace:: :bic:`BI Connector </>`',
    '.. |bic| replace:: BI Connector for Atlas',
    '.. |bson| replace:: :abbr:`BSON (Binary Javascript Object Notation)`',
    '.. |certauth| replace:: Certificate Authority',
    '.. |cidr| replace:: :abbr:`CIDR (Classless Inter-Domain Routing)`',
    '.. |cifs| replace:: :abbr:`CIFS (Common Internet File System)`',
    '.. |Epoch-time| replace:: Timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time| replace:: timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |Epoch-time-ms| replace:: Timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time-ms| replace:: timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |fqdn| replace:: :abbr:`FQDN (fully qualified domain name)`',
    '.. |gcp| replace:: :abbr:`GCP (Google Cloud Platform)`',
    '.. |global-write-clusters| replace:: Global Clusters',
    '.. |global-write-cluster| replace:: Global Cluster',
    '.. |global-write| replace:: Global Writes',
    '.. |https| replace:: :abbr:`HTTPS (Secure HyperText Transport Protocol)`',
    '.. |http| replace:: :abbr:`HTTP (HyperText Transport Protocol)`',
    '.. |iana| replace:: :abbr:`IANA (Internet Assigned Numbers Authority)`',
    '.. |ipaddr| replace:: :abbr:`IP (Internet Protocol)`',
    '.. |ipv4| replace:: :abbr:`IPv4 (Internet Protocol version 4)`',
    '.. |ipv6| replace:: :abbr:`IPv6 (Internet Protocol version 6)`',
    '.. |iops| replace:: :abbr:`IOPS (Input/Output Operations per Second)`',
    '.. |iso8601-duration| replace:: Duration in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=851138376#Durations>`__ notation',
    '.. |iso8601-time| replace:: Timestamp in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__ date and time format in |utc|',
    '.. |iso8601| replace:: `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__',
    '.. |jira| replace:: `Jira <https://jira.mongodb.org>`__"',
    '.. |json| replace:: :abbr:`JSON (Javascript Object Notation)`',
    '.. |kdc| replace:: :abbr:`KDC (Key Distribution Center)`',
    '.. |kmip| replace:: :abbr:`KMIP (Key Management Interoperability)`',
    '.. |kms| replace:: :abbr:`KMS (Key Management Service)`',
    '.. |ldaps| replace:: :abbr:`LDAPS (Secure Lightweight Directory Access Protocol)`',
    '.. |ldap| replace:: :abbr:`LDAP (Lightweight Directory Access Protocol)`',
    '.. |mms-full| replace:: MongoDB Cloud Manager',
    '.. |mms| replace:: Cloud Manager',
    '.. |nfs| replace:: :abbr:`NFS (Network File System)`',
    '.. |piv| replace:: :abbr:`PIV (Personal Identity Verification)`',
    '.. |rdp| replace:: :abbr:`RDP (Remote Desktop Protocol)`',
    '.. |restapi| replace:: :abbr:`REST (Representational State Transfer)` :abbr:`API (Application Programming Interface)`',
    '.. |rest| replace:: :abbr:`REST (Representational State Transfer)`',
    '.. |s3| replace:: :abbr:`S3 (Simple Storage Service)`',
    '.. |service-fullname| replace:: MongoDB Atlas',
    '.. |service-pricing| replace:: Atlas pricing page',
    '.. |service| replace:: Atlas',
    '.. |sms| replace:: :abbr:`SMS (short message service)`',
    '.. |smtp| replace:: :abbr:`SMTP (Simple Mail Transport Protocol)`',
    '.. |snmp| replace:: :abbr:`SNMP (Simple Network Management Protocol)`',
    '.. |spn| replace:: :abbr:`SPN (Service Principal Name)`',
    '.. |sql| replace:: :abbr:`SQL (Structured Query Language)`',
    '.. |ssd| replace:: :abbr:`SSD (Solid State Disk)`',
    '.. |ssl| replace:: :abbr:`SSL (Secure Sockets Layer)`',
    '.. |stitch-docs| replace:: MongoDB Stitch',
    '.. |tcp| replace:: :abbr:`TCP (Transmission Control Protocol)`',
    '.. |tls-ssl| replace:: :abbr:`TLS (Transport Layer Security)`/:abbr:`SSL (Secure Sockets Layer)`',
    '.. |tls| replace:: :abbr:`TLS (Transport Layer Security)`',
    '.. |totp| replace:: :abbr:`TOTP (Time-based One-time Password Algorithm)`',
    '.. |udp| replace:: :abbr:`UDP (User Datagram Protocol)`',
    '.. |upn| replace:: :abbr:`UPN (User Principal Name)`',
    '.. |uri| replace:: :abbr:`URI (Uniform Resource Identifier)`',
    '.. |url| replace:: :abbr:`URL (Uniform Resource Locator)`',
    '.. |utc| replace:: :abbr:`UTC (Coordinated Universal Time)`',
    '.. |vpc| replace:: :abbr:`VPC (Virtual Private Cloud)`',
    '.. |yaml| replace:: :abbr:`YAML (Yet Another Markup Language)`'
])

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'source': ('https://github.com/mongodb/mongo/blob/master/%s', ''),
    'docsgithub' : ( 'http://github.com/mongodb/docs/blob/' + conf.git.branches.current + '/%s', ''),
    'manual': ('http://docs.mongodb.org/manual%s', ''),
    'manual-next': ('http://docs.mongodb.org/master%s', ''),
    'bic': ('https://docs.mongodb.com/bi-connector/current%s',''),
    'product': ('http://www.mongodb.com/products/%s?tck=docs_compass',''),
    'dl': ('http://www.mongodb.com/download-center/%s?tck=docs_compass',''),
    'atlas': ('http://docs.atlas.mongodb.com%s', ''),
    'guides': ('https://docs.mongodb.com/guides%s', '')
}

intersphinx_mapping = {}

try:
    for i in intersphinx_libs:
        intersphinx_mapping[i['name']] = ( i['url'], os.path.join(conf.paths.projectroot,
                                                              conf.paths.output,
                                                              i['path']))
except:
    for i in intersphinx_libs:
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
htmlhelp_basename = 'MongoDB'

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
    'manual_path': "compass",
    'repo_name': 'docs-compass',
    'jira_project': 'DOCS',
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'nav_excluded': sconf.theme.nav_excluded,
    'version': version,
    'version_selector':  get_versions(conf),
    'active_branches': conf.version.active,

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
epub_identifier = 'http://docs.mongodb.com/compass/'
epub_exclude_files = []
epub_pre_files = []
epub_post_files = []

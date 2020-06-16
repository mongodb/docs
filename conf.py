# -*- coding: utf-8 -*-
#
# MongoDB documentation build configuration file, created by
# sphinx-quickstart on Mon Oct  3 09:58:40 2011.
#
# This file is execfile()d with the current directory set to its containing dir.

import sys
import os
import datetime
import logging

from giza.config.runtime import RuntimeStateConfig
from giza.content.replacements import get_replacements
from giza.config.helper import fetch_config

logging.basicConfig(level=logging.INFO)
conf = fetch_config(RuntimeStateConfig())
intersphinx_libs = conf.system.files.data.intersphinx
sconf = conf.system.files.data.sphinx_local

project_root = os.path.join(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(project_root)

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
    'icon',
    'landing_cards',
    'div',
    'source_constants',
    'xmlrole',
    'div'
]

locale_dirs = [os.path.join(conf.paths.projectroot, conf.paths.locale)]
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

rst_epilog = [
    '.. include:: {0}/hash.rst'.format(conf.paths.includes[len(conf.paths.source):]),
    '.. _service-fullname: https://www.mongodb.com/cloud/atlas?tck=docs_atlas',
    '.. _service-pricing: https://www.mongodb.com/cloud/atlas/pricing?tck=docs_atlas',
    '.. _service:  https://www.mongodb.com/cloud/atlas?tck=docs_atlas',
    '.. _realm-docs: https://docs.mongodb.com/realm',
    '.. |service-register| replace:: :mdbacct:`MongoDB Atlas registration page </register>`',
    '.. |service-login| replace:: :mdbacct:`MongoDB Atlas login page </login>`',
    '.. |2fa| replace:: :abbr:`2FA (Two Factor Authentication)`',
    '.. |a-service| replace:: an Atlas',
    '.. |A-service| replace:: An Atlas',
    '.. |aki| replace:: :abbr:`AKI (Azure Key Identifier)`',
    '.. |akv| replace:: :abbr:`AKV (Azure Key Vault)`',
    '.. |api| replace:: :abbr:`API (Application Programming Interface)`',
    '.. |arn| replace:: :abbr:`ARN (Amazon Resource Name)`',
    '.. |aws| replace:: :abbr:`AWS (Amazon Web Services)`',
    '.. |aws-eni| replace:: :abbr:`ENI (Elastic Network Interface)`',
    '.. |azure| replace:: :abbr:`Azure (Microsoft Azure)`',
    '.. |bic-full| replace:: :bic:`MongoDB Connector for BI </>`',
    '.. |bic-official| replace:: MongoDB Connector for Business Intelligence for Atlas',
    '.. |bic-short| replace:: :bic:`BI Connector </>`',
    '.. |bic-short-no-link| replace:: BI Connector',
    '.. |bic| replace:: BI Connector for Atlas',
    '.. |bson| replace:: :abbr:`BSON (Binary Javascript Object Notation)`',
    '.. |certauth| replace:: Certificate Authority',
    '.. |charts| replace:: MongoDB Charts',
    '.. |charts-short| replace:: Charts',
    '.. |cidr| replace:: :abbr:`CIDR (Classless Inter-Domain Routing)`',
    '.. |cifs| replace:: :abbr:`CIFS (Common Internet File System)`',
    '.. |cps| replace:: :abbr:`CPS (Cloud Provider Snapshots)`',
    '.. |cmk| replace:: :abbr:`CMK (customer master key)`',
    '.. |compass| replace:: MongoDB Compass',
    '.. |copy| unicode:: U+000A9',
    '.. |csv| replace:: :abbr:`CSV (Comma-Separated Values)`',
    '.. |cvc| replace:: :abbr:`CVC (Card Verification Code)`',
    '.. |data-lakes| replace:: Data Lakes',
    '.. |data-lake| replace:: Data Lake',
    '.. |datadog| replace:: `Datadog <https://www.datadoghq.com/>`__',
    '.. |dns| replace:: :abbr:`DNS (Domain Name System)`',
    '.. |Epoch-time-ms| replace:: Timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time-ms| replace:: timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |Epoch-time| replace:: Timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time| replace:: timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |fcv| replace:: :abbr:`FCV (Feature Compatibility Version)`',
    '.. |fim| replace:: :abbr:`FIM (Federated Identity Management)`',
    '.. |fmc| replace:: :abbr:`FMC (Federation Management Console)`',
    '.. |fqdn| replace:: :abbr:`FQDN (fully qualified domain name)`',
    '.. |fts| replace:: Atlas Search',
    '.. |gcp| replace:: :abbr:`GCP (Google Cloud Platform)`',
    '.. |global-write-clusters| replace:: Global Clusters',
    '.. |global-write-cluster| replace:: Global Cluster',
    '.. |global-write| replace:: Global Writes',
    '.. |hmac| replace:: :abbr:`HMAC (hash-based message authentication code)`',
    '.. |html| replace:: :abbr:`HTML (Hypertext Markup Language)`',
    '.. |https| replace:: :abbr:`HTTPS (Secure HyperText Transport Protocol)`',
    '.. |http| replace:: :abbr:`HTTP (HyperText Transport Protocol)`',
    '.. |iam| replace:: :abbr:`IAM (Identity and Access Management)`',
    '.. |iana| replace:: :abbr:`IANA (Internet Assigned Numbers Authority)`',
    '.. |idps| replace:: :abbr:`IdPs (Identity Providers)`',
    '.. |idp| replace:: :abbr:`IdP (Identity Provider)`',
    '.. |iops| replace:: :abbr:`IOPS (Input/Output Operations per Second)`',
    '.. |ipaddr| replace:: :abbr:`IP (Internet Protocol)`',
    '.. |ipv4| replace:: :abbr:`IPv4 (Internet Protocol version 4)`',
    '.. |ipv6| replace:: :abbr:`IPv6 (Internet Protocol version 6)`',
    '.. |iso8601-duration| replace:: Duration in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=851138376#Durations>`__ notation',
    '.. |iso8601-time| replace:: Timestamp in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__ date and time format in |utc|',
    '.. |iso8601| replace:: `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__',
    '.. |jira| replace:: `Jira <https://jira.mongodb.org>`__',
    '.. |json| replace:: :abbr:`JSON (Javascript Object Notation)`',
    '.. |kdc| replace:: :abbr:`KDC (Key Distribution Center)`',
    '.. |kmip| replace:: :abbr:`KMIP (Key Management Interoperability)`',
    '.. |kms| replace:: :abbr:`KMS (Key Management Service)`',
    '.. |ldaps| replace:: :abbr:`LDAPS (Secure Lightweight Directory Access Protocol)`',
    '.. |ldap| replace:: :abbr:`LDAP (Lightweight Directory Access Protocol)`',
    '.. |mdb-support| replace:: `MongoDB Support <https://support.mongodb.com/welcome>`__',
    '.. |mms-full| replace:: MongoDB Cloud Manager',
    '.. |mms| replace:: Cloud Manager',
    '.. |mongodump| replace:: :binary:`~bin.mongodump`',
    '.. |mongod| replace:: :binary:`~bin.mongod`',
    '.. |mongomirror| replace:: :binary:`~bin.mongomirror`',
    '.. |mongorestore| replace:: :binary:`~bin.mongorestore`',
    '.. |mongos| replace:: :binary:`~bin.mongos`',
    '.. |mongo| replace:: :binary:`~bin.mongo`',
    '.. |nfs| replace:: :abbr:`NFS (Network File System)`',
    '.. |nvme-clusters| replace:: clusters with local :ref:`NVMe SSDs <nvme-storage>`',
    '.. |nvme| replace:: :abbr:`NVMe (non-volatile memory express)`',
    '.. |pa| replace:: Performance Advisor',
    '.. |pcre| replace:: :abbr:`PCRE (Perl Compatible Regular Expressions)`',
    '.. |pem| replace:: :abbr:`PEM (Privacy Enhanced Mail)`',
    '.. |pit| replace:: :abbr:`PIT (Point in Time)`',
    '.. |piv| replace:: :abbr:`PIV (Personal Identity Verification)`',
    '.. |rdp| replace:: :abbr:`RDP (Remote Desktop Protocol)`',
    '.. |rtpp| replace:: :abbr:`RTPP (Real-Time Performance Panel)`',
    '.. |restapi| replace:: :abbr:`REST (Representational State Transfer)` :abbr:`API (Application Programming Interface)`',
    '.. |rest| replace:: :abbr:`REST (Representational State Transfer)`',
    '.. |s3| replace:: :abbr:`S3 (Simple Storage Service)`',
    '.. |sak| replace:: :abbr:`SAK (Service Account Key)`',
    '.. |saml| replace:: :abbr:`SAML (Security Assertion Markup Language)`',
    '.. |sca| replace:: :abbr:`SCA (Strong Customer Authentication)`',
    '.. |service-fullname| replace:: MongoDB Atlas',
    '.. |service-pricing| replace:: Atlas pricing page',
    '.. |service| replace:: Atlas',
    '.. |slo| replace:: :abbr:`SLO (Single Logout)`',
    '.. |sms| replace:: :abbr:`SMS (short message service)`',
    '.. |smtp| replace:: :abbr:`SMTP (Simple Mail Transport Protocol)`',
    '.. |sni| replace:: :abbr:`SNI (Server Name Indication)`',
    '.. |snmp| replace:: :abbr:`SNMP (Simple Network Management Protocol)`',
    '.. |spn| replace:: :abbr:`SPN (Service Principal Name)`',
    '.. |ssd| replace:: :abbr:`SSD (Solid State Disk)`',
    '.. |ssl| replace:: :abbr:`SSL (Secure Sockets Layer)`',
    '.. |sso| replace:: :abbr:`SSO (Single Sign-On)`',
    '.. |realm-docs| replace:: MongoDB Realm',
    '.. |tcp| replace:: :abbr:`TCP (Transmission Control Protocol)`',
    '.. |times| unicode:: U+000D7',
    '.. |tls-ssl| replace:: :abbr:`TLS (Transport Layer Security)`/:abbr:`SSL (Secure Sockets Layer)`',
    '.. |tls| replace:: :abbr:`TLS (Transport Layer Security)`',
    '.. |totp| replace:: :abbr:`TOTP (Time-based One-time Password Algorithm)`',
    '.. |udp| replace:: :abbr:`UDP (User Datagram Protocol)`',
    '.. |ui-org-menu| replace:: :icon-mms:`office` :guilabel:`Organizations` menu',
    '.. |upn| replace:: :abbr:`UPN (User Principal Name)`',
    '.. |uri| replace:: :abbr:`URI (Uniform Resource Identifier)`',
    '.. |url| replace:: :abbr:`URL (Uniform Resource Locator)`',
    '.. |usd| replace:: :abbr:`USD (United States Dollars)`',
    '.. |utc| replace:: :abbr:`UTC (Coordinated Universal Time)`',
    '.. |vat| replace:: :abbr:`VAT (Value Added Tax)`',
    '.. |vpc| replace:: :abbr:`VPC (Virtual Private Cloud)`',
    '.. |yaml| replace:: :abbr:`YAML (Yet Another Markup Language)`',
]

rst_epilog.extend(get_replacements(conf))
rst_epilog = '\n'.join(rst_epilog)

source_constants = {
    'aws-pl': 'AWS PrivateLink',
    'data-lake-store': 'data store',
    'data-lake-stores': 'data stores',
    'data-lake' : 'Atlas Data Lake',
    'data-lake-short' : 'Data Lake',
    'fts' : 'Atlas Search',
    'latest-mongodb-eol': '3.4',
    'service-api-v1-base-uri' : 'https://cloud.mongodb.com/api/atlas/v1.0',
    'Cloud-Backup' : 'Cloud Backup',
    'Old-Backup' : 'Legacy Backup',
    'cloud-backup' : 'cloud backup',
    'old-backup' : 'legacy backup',
    'PIT-Restore' : 'Continuous Cloud Backup',
    'pit-restore' : 'continuous cloud backup',
    'Realm' : 'MongoDB Realm',
    'MongoDB-Realm' : 'MongoDB Realm',
}

pygments_style = 'sphinx'

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', ''),
    'dl': ('https://www.mongodb.com/download-center/%s?jmp=docs', ''),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'cloudmgr': ('https://docs.cloudmanager.mongodb.com%s', ''),
    'driver' : ('https://docs.mongodb.com/ecosystem/drivers%s', ''),
    'compass': ('https://docs.mongodb.com/compass%s', ''),
    'stitch': ('https://docs.mongodb.com/realm%s', ''),
    'realm': ('https://docs.mongodb.com/realm%s', ''),
    'charts': ('https://docs.mongodb.com/charts/saas%s', ''),
    'bic': ('https://docs.mongodb.com/bi-connector/current%s',''),
    'website': ('https://www.mongodb.com%s?tck=docs_atlas', ''),
    'legal': ('https://www.mongodb.com/legal%s?tck=docs_atlas', ''),
    'aws': ('http://docs.aws.amazon.com%s',''),
    'azure': ('https://docs.microsoft.com/en-us/azure%s',''),
    'gh' : ('https://github.com%s',''),
    'gcp': ('https://cloud.google.com%s',''),
    'dochub': ('https://dochub.mongodb.org/core/%s', ''),
    'hardlink': ('https://docs.atlas.mongodb.com%s', ''),
    'dochub': ('https://dochub.mongodb.org/core/%s', ''),
    'wikipedia' : ('https://en.wikipedia.org/wiki%s', ''),
    'ruby': ('https://docs.mongodb.com/ruby-driver/current%s', ''),
    'mdbacct': ('https://account.mongodb.com/account%s',''),
    'contact': ('https://www.mongodb.com/contact%s',''),
    'adl': ('https://docs.mongodb.com/datalake%s',''),
    'guides' : ('https://docs.mongodb.com/guides%s',''),
    'osb' : ('https://docs.mongodb.com/atlas-open-service-broker/current%s','')
}

# add `extlinks` for each published version.
for i in conf.git.branches.published:
    extlinks[i] = (''.join([conf.project.url, '/', i, '%s']), '')

intersphinx_mapping = {}
for i in conf.system.files.data.intersphinx:
    intersphinx_mapping[i.name] = (i.url, os.path.join(conf.paths.projectroot,
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
html_theme_path = [os.path.join(conf.paths.buildsystem, 'themes')]
html_title = conf.project.title
htmlhelp_basename = 'MongoDB'

html_copy_source = False
html_domain_indices = True
html_use_index = True
html_split_index = False
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

manual_edition_path = '/.'.join([conf.project.url,
                                 conf.git.branches.current,
                                 sconf.theme.book_path_base])

html_theme_options = {
    'branch': conf.git.branches.current,
    'translations': languages,
    'language': language,
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'version': version,
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
}

html_sidebars = sconf.sidebars

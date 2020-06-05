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

# needs_sphinx = '1.0'

extensions = [
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx.ext.extlinks',
    'intermanual',
    'directives',
    'mongodb',
    'fasthtml',
    'fixed_only',
    'tabs',
    'icon',
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
pygments_style = 'sphinx'

source_constants = {
    'default-profile': ':ref:`default profile <mcli-profiles>`',
    'version': version,
    'mcli': 'MongoDB CLI',
    'mcli-long': 'MongoDB Command Line Interface (``mongocli``)',
    'mcli-version': '0.5.0',
    'mdbVersion': '4.2',
    'mdbagent': 'MongoDB Agent',
    'aagent': 'Automation Agent',
    'magent': 'Monitoring Agent',
    'bagent': 'Backup Agent',
}

rst_epilog = '\n'.join([
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |copy| unicode:: U+000A9',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |a-application| replace:: an Ops Manager Application',
    '.. |a-mms| replace:: an Ops Manager',
    '.. |A-mms| replace:: An Ops Manager',
    '.. |application-s| replace:: Ops Manager Applications',
    '.. |application| replace:: Ops Manager Application',
    '.. |2fa| replace:: :abbr:`2FA (Two Factor Authentication)`',
    '.. |cloud| replace:: :cloudmgr:`MongoDB Cloud Manager </>`',
    '.. |cloud-short| replace:: Cloud Manager',
    '.. |api| replace:: :abbr:`API (Application Programming Interface)`',
    '.. |aws| replace:: :abbr:`AWS (Amazon Web Services)`',
    '.. |bic-full| replace:: :bic:`MongoDB Connector for BI </>`',
    '.. |bic-short| replace:: :bic:`BI Connector </>`',
    '.. |bic| replace:: BI Connector for Atlas',
    '.. |bson| replace:: :abbr:`BSON (Binary Javascript Object Notation)`',
    '.. |certauth| replace:: Certificate Authority',
    '.. |cidr| replace:: :abbr:`CIDR (Classless Inter-Domain Routing)`',
    '.. |cifs| replace:: :abbr:`CIFS (Common Internet File System)`',
    '.. |com| replace:: Cloud Manager or Ops Manager',
    '.. |compass| replace:: :compass:`MongoDB Compass </>`',
    '.. |csr| replace:: :abbr:`CSR (Certificate Signing Request)`',
    '.. |csrs| replace:: :abbr:`CSRs (Certificate Signing Requests)`',
    '.. |dns| replace:: :abbr:`DNS (Domain Name System)`',
    '.. |dns-srv| replace:: :abbr:`DNS (Domain Name System)` :abbr:`SRV (Service)`',
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |Epoch-time-ms| replace:: Timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time-ms| replace:: timestamp in the number of milliseconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |Epoch-time| replace:: Timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |epoch-time| replace:: timestamp in the number of seconds that have elapsed since the `UNIX epoch <https://en.wikipedia.org/wiki/Unix_time?oldid=828172017>`__',
    '.. |fqdn| replace:: :abbr:`FQDN (fully qualified domain name)`',
    '.. |gcp| replace:: :abbr:`GCP (Google Cloud Platform)`',
    '.. |global-write-clusters| replace:: Global Clusters',
    '.. |global-write-cluster| replace:: Global Cluster',
    '.. |global-write| replace:: Global Writes',
    '.. |hardlink| replace:: https://docs.mongodb.com/kubernetes-operator/',
    '.. |https| replace:: :abbr:`HTTPS (Secure HyperText Transport Protocol)`',
    '.. |http| replace:: :abbr:`HTTP (HyperText Transport Protocol)`',
    '.. |iana| replace:: :abbr:`IANA (Internet Assigned Numbers Authority)`',
    '.. |iops| replace:: :abbr:`IOPS (Input/Output Operations per Second)`',
    '.. |ipaddr| replace:: :abbr:`IP (Internet Protocol)`',
    '.. |ipv4| replace:: :abbr:`IPv4 (Internet Protocol version 4)`',
    '.. |ipv6| replace:: :abbr:`IPv6 (Internet Protocol version 6)`',
    '.. |iso8601-duration| replace:: Duration in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=851138376#Durations>`__ notation',
    '.. |iso8601-time| replace:: Timestamp in `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__ date and time format in |utc|',
    '.. |iso8601| replace:: `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`__',
    '.. |jira| replace:: `Jira <https://jira.mongodb.org>`__"',
    '.. |json| replace:: :abbr:`JSON (Javascript Object Notation)`',
    '.. |jedec| replace:: :abbr:`JEDEC (Joint Electron Device Engineering Council Solid State Technology Association)`',
    '.. |k8s-configmaps| replace:: `ConfigMaps <https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/>`__',
    '.. |k8s-configmap| replace:: `ConfigMap <https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/>`__',
    '.. |k8s-crds| replace:: `CustomResourceDefinitions <https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/>`__',
    '.. |k8s-crd| replace:: `CustomResourceDefinition <https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/>`__',
    '.. |k8s-mdbrscs| replace:: MongoDB Kubernetes resources',
    '.. |k8s-mdbrsc| replace:: MongoDB Kubernetes resource',
    '.. |k8s-nodes| replace:: `nodes <https://kubernetes.io/docs/concepts/architecture/nodes/>`__',
    '.. |k8s-node| replace:: `node <https://kubernetes.io/docs/concepts/architecture/nodes/>`__',
    '.. |k8s-nss| replace:: `namespaces <https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/>`__',
    '.. |k8s-ns| replace:: `namespace <https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/>`__',
    '.. |k8s-objs| replace:: `objects <https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/>`__',
    '.. |k8s-obj| replace:: `object <https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/>`__',
    '.. |k8s-op-full| replace:: MongoDB Enterprise Kubernetes Operator',
    '.. |k8s-op-short| replace:: Kubernetes Operator',
    '.. |k8s-op| replace:: MongoDB Enterprise Kubernetes Operator',
    '.. |k8s-pods| replace:: `pods <https://kubernetes.io/docs/concepts/workloads/pods/pod/>`__',
    '.. |k8s-pod| replace:: `pod <https://kubernetes.io/docs/concepts/workloads/pods/pod/>`__',
    '.. |k8s-pvcs| replace:: `Persistent Volume Claims <https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims>`__',
    '.. |k8s-pvc| replace:: `Persistent Volume Claim <https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims>`__',
    '.. |k8s-pvs| replace:: `Persistent Volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__',
    '.. |k8s-pv| replace:: `Persistent Volume <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__',
    '.. |k8s-rule| replace:: `rule <https://kubernetes.io/docs/concepts/configuration/assign-pod-node/>`__',
    '.. |k8s-sc| replace:: `StorageClass <https://kubernetes.io/docs/concepts/storage/storage-classes/>`__',
    '.. |k8s-secrets| replace:: `secrets <https://kubernetes.io/docs/concepts/configuration/secret/>`__',
    '.. |k8s-secret| replace:: `secret <https://kubernetes.io/docs/concepts/configuration/secret/>`__',
    '.. |k8s-service-catalog| replace:: `Service Catalog <https://kubernetes.io/docs/tasks/service-catalog/install-service-catalog-using-helm/>`__',
    '.. |k8s-statefulsets| replace:: `StatefulSets <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`__',
    '.. |k8s-statefulset| replace:: `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`__',
    '.. |k8s| replace:: Kubernetes',
    '.. |kdc| replace:: :abbr:`KDC (Key Distribution Center)`',
    '.. |kmip| replace:: :abbr:`KMIP (Key Management Interoperability)`',
    '.. |kms| replace:: :abbr:`KMS (Key Management Service)`',
    '.. |kubectl| replace:: :xml:`<mono><link target="https://kubernetes.io/docs/reference/kubectl/kubectl/">kubectl</link></mono>`',
    '.. |ldaps| replace:: :abbr:`LDAPS (Secure Lightweight Directory Access Protocol)`',
    '.. |ldap| replace:: :abbr:`LDAP (Lightweight Directory Access Protocol)`',
    '.. |mms-full| replace:: :opsmgr:`MongoDB Ops Manager </>`',
    '.. |mms| replace:: `Ops Manager`',
    '.. |mongod| replace:: :binary:`~bin.mongod`',
    '.. |mongos| replace:: :binary:`~bin.mongos`',
    '.. |mongo| replace:: :binary:`~bin.mongo`',
    '.. |onprem| replace:: Ops Manager',
    '.. |onprem-link| replace:: :opsmgr:`Ops Manager </>`',
    '.. |nfs| replace:: :abbr:`NFS (Network File System)`',
    '.. |nvme-clusters| replace:: clusters with local NVMe SSDs',
    '.. |pit| replace:: :abbr:`PIT (Point in Time)`',
    '.. |piv| replace:: :abbr:`PIV (Personal Identity Verification)`',
    '.. |rdp| replace:: :abbr:`RDP (Remote Desktop Protocol)`',
    '.. |restapi| replace:: :abbr:`REST (Representational State Transfer)` :abbr:`API (Application Programming Interface)`',
    '.. |rest| replace:: :abbr:`REST (Representational State Transfer)`',
    '.. |s3| replace:: :abbr:`S3 (Simple Storage Service)`',
    '.. |service-fullname| replace:: :atlas:`MongoDB Atlas </>`',
    '.. |service-pricing| replace:: Atlas pricing page',
    '.. |service| replace:: Atlas',
    '.. |svc-api-key| replace:: Programmatic API Key',
    '.. |sms| replace:: :abbr:`SMS (short message service)`',
    '.. |smtp| replace:: :abbr:`SMTP (Simple Mail Transport Protocol)`',
    '.. |snmp| replace:: :abbr:`SNMP (Simple Network Management Protocol)`',
    '.. |spn| replace:: :abbr:`SPN (Service Principal Name)`',
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
    '.. |yaml| replace:: :abbr:`YAML (Yet Another Markup Language)`',
])

extlinks = {
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'opsmgr': ('http://docs.opsmanager.mongodb.com/current%s', ''),
    'opsmgr-rapid': ('http://docs.opsmanager.mongodb.com/rapid%s', ''),
    'cloudmgr': ('https://docs.cloudmanager.mongodb.com%s', ''),
    'atlas': ('https://docs.atlas.mongodb.com%s', ''),
    'bic': ('https://docs.mongodb.com/bi-connector/current%s',''),
    'compass': ('https://docs.mongodb.com/compass/current%s',''),
    'product': ('http://www.mongodb.com/products/%s?jmp=docs',''),
    'dl': ('http://www.mongodb.com/download-center/%s?jmp=docs',''),
    'website': ('https://www.mongodb.com%s?jmp=docs',''),
    'k8sdocs': ('https://kubernetes.io/docs%s', ''),
    'gh' : ('https://github.com%s', ''),
    'svc-cat' : ('https://svc-cat.io/docs%s', '')
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
    'jira_project': 'DOCSP',
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'epubpath': manual_edition_path.format(conf.project.url,
                                           conf.project.basepath,
                                           'mongodb-bi-connector', 'epub'),
    'nav_excluded': sconf.theme.nav_excluded,
    'version_selector': get_versions(conf),
    'is_upcoming': False,
    'is_alpha': True,
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
epub_identifier = 'http://docs.mongodb.org/mongocli/'
epub_exclude_files = []
epub_pre_files = []
epub_post_files = []

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
    'mongodb',
    'fasthtml',
    'fixed_only',
    'tabs',
    'icon',
    'source_constants',
    'xmlrole'
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

manifest_version = version
if version == 'upcoming':
    manifest_version = '4.6'

rr_version = '4.5'
# rr_version = str(float(manifest_version) + 0.1)

extlinks = {
    'hardlink' : ( 'https://docs.opsmanager.mongodb.com/{0}/%s'.format(conf.git.branches.current), ''),
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'v2.2': ('https://docs.mongodb.com/v2.2%s', ''),
    'v2.4': ('https://docs.mongodb.com/v2.4%s', ''),
    'v2.6': ('https://docs.mongodb.com/v2.6%s', ''),
    'v3.0': ('https://docs.mongodb.com/v3.0%s', ''),
    'v3.2': ('https://docs.mongodb.com/v3.2%s', ''),
    'v3.4': ('https://docs.mongodb.com/v3.4%s', ''),
    'v3.6': ('https://docs.mongodb.com/v3.6%s', ''),
    'v4.0': ('https://docs.mongodb.com/v4.0%s', ''),
    'v4.2': ('https://docs.mongodb.com/v4.2%s', ''),
    'v4.4': ('https://docs.mongodb.com/v4.4%s', ''),
    'azure': ('https://docs.microsoft.com/en-us/azure%s',''),
    'bic': ('https://docs.mongodb.com/bi-connector/current%s',''),
    'k8s': ('https://docs.mongodb.com/kubernetes-operator/stable%s',''),
    'atlas': ('https://docs.atlas.mongodb.com%s',''),
    'product': ('http://www.mongodb.com/products/%s?tck=docs',''),
    'website': ('https://www.mongodb.com%s?tck=docs',''),
    'legal': ('https://www.mongodb.com/legal%s?tck=docs', ''),
    'dl': ('http://www.mongodb.com/try/download/%s?jmp=docs',''),
    'filedl': ('http://downloads.mongodb.com%s?jmp=docs',''),
    'aws': ('http://docs.aws.amazon.com%s',''),
    'driver' : ('https://docs.mongodb.com/ecosystem/drivers%s', ''),
    'wikipedia' : ('https://en.wikipedia.org/wiki%s', ''),
    'mvn' : ('https://mvnrepository.com/artifact%s',''),
    'npmjs' : ('https://www.npmjs.com/package%s',''),
    'gh' : ('https://github.com%s',''),
    'gopkg-gh' : ('https://pkg.go.dev/github.com%s',''),
    'gopkg' : ('https://pkg.go.dev%s',''),
    'osi' : ('https://opensource.org%s', ''),
    'cc' : ('http://creativecommons.org/licenses%s', ''),
    'tldrl' : ('https://www.tldrlegal.com%s', ''),
    'contact': ('https://www.mongodb.com/lp/contact%s?jmp=docs',''),
    'uservoice' : ('https://feedback.mongodb.com/forums/%s?jmp=docs',''),
    'mdbacct': ('https://account.mongodb.com/account%s',''),
    'contact': ('https://www.mongodb.com/contact%s',''),
    'cve-def': ('https://cwe.mitre.org/data/definitions/%s.html',''),
    'cve-id': ('https://cve.mitre.org/cgi-bin/cvename.cgi?name=%s',''),
    'cvss': ('https://www.first.org/cvss%s',''),
    'cvss-score' : ('https://www.first.org/cvss/calculator/3.1#%s',''),
    'snyk-vuln' : ('https://snyk.io/vuln/%s',''),
    'db-tools' : ('https://docs.mongodb.com/database-tools%s?tck=docs',''),
    'mdb-sup' : ('https://support.mongodb.com%s?tck=docs',''),
    'mdbu' : ('https://university.mongodb.com%s?tck=docs',''),
}

source_constants = {
    'version': version,
    'release': release,
    'manifest-version': manifest_version,
    'rr-version': rr_version,
    'opsmgr-url': '<OpsManagerHost>:<Port>',
    'cloudmgr-url': 'cloud.mongodb.com',
    'autoagent-version': '6.5.1.5691-1',
    'bagent-version': '7.6.0.1059',
    'magent-version': '7.2.0.488-1',
    'mdbagent-version-cloud': '10.19.0.6566-1',
    'autoagent-version-cloud': '6.5.1.5691-1',
    'bagent-version-cloud': '7.6.0.1059',
    'magent-version-cloud': '7.2.0.488-1',
    'mdbagent-version-opsmgr': '10.18.0.6560-1',
    'autoagent-version-opsmgr': '5.4.16.5515-1',
    'bagent-version-opsmgr': '6.8.6.1013',
    'magent-version-opsmgr': '6.6.2.464',
    'aagent': 'Automation',
    'bagent': 'Backup',
    'magent': 'Monitoring',
    'mdbagent': 'MongoDB Agent',
    'mdbagent-wa': 'MongoDB Agent with Automation',
    'mdbagent-ba': 'MongoDB Agent with Backup',
    'agent-dl-deb-ubuntu-16-ppc': 'Ubuntu 16.X Power (ppc64le) - DEB',
    'agent-dl-deb-ubuntu-16-x64': 'Debian 8/9/10, Ubuntu 16.X/18.X/20.x - DEB',
    'agent-dl-deb-ubuntu-18-x64': 'Debian 8/9/10, Ubuntu 16.X/18.X/20.x - DEB',
    'agent-dl-deb-debian-8-x64': 'Debian 8/9/10, Ubuntu 16.X/18.X/20.x - DEB',
    'agent-dl-deb-debian-9-x64': 'Debian 8/9/10, Ubuntu 16.X/18.X/20.x - DEB',
    'agent-dl-deb-ubuntu-16-zSeries': 'Ubuntu 18.X Z-Series (s390x) - DEB',
    'agent-dl-msi-windows': 'Windows - MSI',
    'agent-dl-rpm-rhel-6-x64': 'RHEL/CentOS 6.X, Amazon Linux - RPM',
    'agent-dl-rpm-rhel-6-zSeries': 'RHEL 6.X Z-Series (s390x) - RPM',
    'agent-dl-rpm-rhel-7-ppc': 'RHEL/CentOS (7.X) Power (ppc64le) - RPM',
    'agent-dl-rpm-rhel-7-x64': 'RHEL/CentOS (7.X/8.X), SUSE12, SUSE15, Amazon Linux2 - RPM',
    'agent-dl-rpm-rhel-7-zSeries': 'RHEL 7.X Z-Series (s390x) - RPM',
    'agent-dl-tar-macos': 'Mac OSX (10.8 and above) - TAR',
    'agent-dl-tar-other-linux': 'Other Linux - TAR',
    'agent-dl-tar-rhel-7-ppc': 'RHEL/CentOS (7.X) Power (ppc64le) - TAR',
    'agent-dl-tar-rhel-7-x64': 'RHEL/CentOS (7.X/8.X), SUSE12, SUSE15, Amazon Linux 2 - TAR',
    'agent-dl-tar-ubuntu-16-ppc': 'Ubuntu 16.X Power (ppc64le) - TAR',
    'opsmgr-example-url': '<OpsManagerHost>:<Port>',
    'onprem': 'Ops Manager',
    'fcv-current' : '4.4',
    'fcv-previous' : '4.2'
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
html_use_index = True
html_split_index = False
html_use_modindex = False
html_show_sourcelink = False
htmlhelp_basename = 'MongoDB doc'

html_theme_options = {
    'branch': conf.git.branches.current,
    'google_analytics': 'UA-7301842-7',
    'has_mdb_agent' : False,
    'manual_branch': conf.git.branches.manual,
    'nav_excluded': sconf.theme.nav_excluded,
    'project': conf.project.name,
    'stable': conf.version.stable,
    'translations': languages,
    'upcoming': '',
    'version': version,
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

        html_title = 'MongoDB Ops Manager'

        html_theme = 'mms-onprem'
        html_theme_options['pdfpath'] = '/'.join([conf.project.url,
                                                  conf.git.branches.current,
                                                  'opsmanager-manual.pdf'])
        html_theme_options['edition'] = 'hosted'
        html_theme_options['sitename'] = 'Ops Manager Docs'

        if release in ["Upcoming", "upcoming", "Rapid", "rapid"]:
            rst_epilog.append(".. |release-string| replace:: \   ")

            # If upcoming, pop in the latest stable/current version
            rst_epilog.append(".. |manifestlink| replace:: https://opsmanager.mongodb.com/static/version_manifest/{0}.json".format(manifest_version))

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

        html_title = 'MongoDB Cloud Manager'

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
html_theme_options['project'] += '-' + conf.runstate.edition

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

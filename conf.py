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

rst_epilog = '\n'.join([
    '.. |copy| unicode:: U+000A9',
    '.. |ent-build| replace:: MongoDB Enterprise',
    '.. |year| replace:: {0}'.format(datetime.date.today().year),
    '.. |hardlink| replace:: {0}/{1}'.format(conf.project.url, conf.git.branches.current),
    '.. |branch| replace:: ``{0}``'.format(conf.git.branches.current),
    '.. |bi| replace:: MongoDB Connector for BI',
    '.. |version| replace:: {0}'.format(version),
    '.. |compass| replace:: MongoDB Compass'
])

source_constants = {
    'dbtools': 'MongoDB Database Tools',
    'dbtools-short' : 'Database Tools',
    'dbtools-pkg': '``mongodb-database-tools``',
    'package-name-org': 'mongodb-org',
    'package-name-enterprise': 'mongodb-enterprise',
    'version': version,
    'release': release,
    'pgp-version': version,
    'pgp-fingerprint': 'E162F504A20CDF15827F718D4B7C549A058F8B6B',
    'rsa-key': '4B7C549A058F8B6B',
    'pgp-fingerprint-fmt': 'E162 F504 A20C DF15 827F  718D 4B7C 549A 058F 8B6B',
    'windows-sha256': 'AF5AF79EFE540DCDDC2825A396C71FCFC4FEB463BC9CADDCCDE20AD126321CCC',
    'pgp-short-fingerprint' : '0x4B7C549A058F8B6B',
    'source-available' : '`source available and free to use <https://github.com/mongodb/mongo/>`_'
}


extlinks = {
    'hardlink' : ( 'http://docs.mongodb.com/{0}/%s'.format(conf.git.branches.current), ''),
    'issue': ('https://jira.mongodb.org/browse/%s', '' ),
    'api': ('https://api.mongodb.com/%s', ''),
    'gettingstarted': ('https://docs.mongodb.com/getting-started%s', ''),
    'manual': ('https://docs.mongodb.com/manual%s', ''),
    'ecosystem': ('https://docs.mongodb.com/ecosystem%s', ''),
    'mms-docs': ('https://docs.cloudmanager.mongodb.com%s', ''),
    'mms-home': ('https://www.mongodb.com/cloud/cloud-manager%s', ''),
    'opsmgr': ('https://docs.opsmanager.mongodb.com/current%s', ''),
    'atlas': ('https://docs.atlas.mongodb.com%s',''),
    'products': ('https://www.mongodb.com/products%s', ''),
    'wtdocs': ('http://source.wiredtiger.com/mongodb-3.4%s', ''),
    'perl-api': ('https://metacpan.org/pod/MongoDB::%s', ''),
    'node-docs': ('http://mongodb.github.io/node-mongodb-native/3.3/%s', ''),
    'node-api': ('http://mongodb.github.io/node-mongodb-native/3.3/api/%s', ''),
    'ruby-api': ('http://api.mongodb.com/ruby/current/Mongo/%s', ''),
    'scala-api': ('http://mongodb.github.io/mongo-scala-driver/2.0/scaladoc/org/mongodb/scala/MongoCollection.html#%s', ''),
    'csharp-api': ('https://api.mongodb.com/csharp/current/html/%s.htm', ''),
    'csharp-docs': ('https://mongodb.github.io/mongo-csharp-driver/2.4/reference/%s', ''),
    'java-async-docs': ('http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/%s', ''),
    'java-async-api': ('http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/javadoc/%s', ''),
    'go-api': ('https://godoc.org/github.com/mongodb/mongo-go-driver/%s', '')
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
    'repo_name': sconf.theme.repo,
    'jira_project': sconf.theme.jira,
    'google_analytics': sconf.theme.google_analytics,
    'project': sconf.project,
    'version': version,
    'sitename': sconf.theme.sitename,
    'nav_excluded': sconf.theme.nav_excluded,
}

# -- Options for manual page output --------------------------------------------

man_pages = []
if 'manpages' in conf.system.files.data:
    for mp in conf.system.files.data.manpages:
        man_pages.append((mp.file, mp.name, mp.title, mp.authors, mp.section))

html_sidebars = sconf.sidebars

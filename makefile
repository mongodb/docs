# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j
MAKEFLAGS += -r
MAKEFLAGS += --no-print-directory

# includes
include bin/makefile.compatibility
include bin/makefile.tables

# Build directory tweaking.
output = build
build-tools = bin
public-output = $(output)/public
branch-output = $(output)/$(current-branch)
public-branch-output = $(public-output)/$(current-branch)

# change this to reflect the branch that "manual/" will point to
manual-branch = master
# intuit the current branch and commit
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )
last-commit := $(shell git rev-parse --verify HEAD)

timestamp := $(shell date +%Y%m%d%H%M)

ifeq ($(current-branch),$(manual-branch))
current-if-not-manual = manual
else
current-if-not-manual = $(current-branch)
endif

# Sphinx variables.
sphinx-conf = $(branch-output)/conf.py
SPHINXOPTS = -c ./
SPHINXBUILD = sphinx-build

ifdef NITPICK
SPHINXOPTS += -n -w $(branch-output)/build.$(timestamp).log
endif

PAPER = letter
PAPEROPT_a4 = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS = -q -d $(branch-output)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
POSPHINXOPTS = -q -d $(branch-output)/doctrees-gettext $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
DRAFTSPHINXOPTS = -q -d $(branch-output)/draft-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) draft

.PHONY: publish help clean push-dc1 push-dc2
help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  html		to make standalone HTML files"
	@echo "  dirhtml	to make HTML files named index.html in directories"
	@echo "  singlehtml	to make a single large HTML file"
	@echo "  epub		to make an epub"
	@echo "  latex		to make LaTeX files, you can set PAPER=a4 or PAPER=letter"
	@echo "  man		to make manual pages"
	@echo "  changes	to make an overview of all changed/added/deprecated items"
	@echo
	@echo "MongoDB Manual Specific Targets."
	@echo "  publish	runs publication process and then deploys the build to $(public-output)"
	@echo "  push		runs publication process and pushes to docs site to production."
	@echo "  draft		builds a 'draft' build for pre-publication testing ."
	@echo "  pdfs		generates pdfs more efficently than latexpdf."
	@echo
	@echo "See 'meta.build.rst' for more information."

#
# Meta targets that control the build and publication process.
#

.PHONY: push publish-if-up-to-date

push:publish-if-up-to-date
	@echo [build]: copying the new $(current-branch) build to the web servers.
	@$(MAKE) MODE='push' push-dc1 push-dc2
	@echo [build]: deployed a new build of the $(current-branch) branch of the Manual.

push-all:publish
	@echo [build]: copying the full docs site to the web servers.
	@$(MAKE) MODE='push' push-all-dc1 push-all-dc2
	@echo [build]: deployed a new build of the full Manual.

publish-if-up-to-date:
	@bin/published-build-check $(current-branch) $(last-commit)
	@$(MAKE) publish

publish:initial-dependencies pre-build-dependencies
	@echo [build]: starting build of sphinx components built at `date`
	@$(MAKE) sphinx-components
	@echo [build]: all sphinx components built at `date`
	@echo [build]: starting build of all static components at `date`
	@$(MAKE) static-components post-processing
	@echo [build]: all static components built at `date`
	@echo [build]: $(manual-branch) branch is succeessfully deployed to '$(public-output)'.

#
# Targets for pushing the new build to the web servers.
#

ifeq ($(MODE),push)
push-dc1:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c1.10gen.cc:/data/sites/docs/$(current-branch)
push-dc2:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c2.10gen.cc:/data/sites/docs/$(current-branch)

push-all-dc1:
	rsync -arz $(public-output)/ www@www-c1.10gen.cc:/data/sites/docs
push-all-dc2:
	rsync -arz $(public-output)/ www@www-c2.10gen.cc:/data/sites/docs
endif

######################################################################
#
# Targets that should/need only be accessed in publication
#
######################################################################


# Deployment targets to kick off the rest of the build process. Only
# access these targets through the ``publish`` target.
.PHONY: initial-dependencies static-components sphinx-components post-processing

pre-build-dependencies:setup instalation-guides tables
	@echo [build]: completed $@ buildstep.
initial-dependencies:$(public-branch-output)/MongoDB-Manual.epub
	@echo [build]: completed $@ buildstep.
static-components:$(public-output)/index.html $(public-output)/10gen-gpg-key.asc $(public-output)/10gen-security-gpg-key.asc $(public-branch-output)/.htaccess $(public-branch-output)/release.txt $(public-output)/osd.xml
	@echo [build]: completed $@ buildstep.
post-processing:error-pages links
	@echo [build]: completed $@ buildstep.
sphinx-components:manual-pdfs $(public-branch-output)/single $(public-branch-output)/single/index.html $(public-branch-output) $(public-branch-output)/sitemap.xml.gz
	@echo [build]: completed $@ buildstep.

#
# Build the HTML components of the build.
#

## See 'bin/makefile.tables' for additional elements here.

# Baking the current release into the installation pages.

instalation-sources = source/includes/install-curl-release-osx-64.rst source/includes/install-curl-release-linux-64.rst source/includes/install-curl-release-linux-32.rst
.PHONY:instalation-guides $(instalation-sources) source/tutorial/install-mongodb-on-linux.txt source/tutorial/install-mongodb-on-os-x.txt
instalation-guides:instalation-sources source/tutorial/install-mongodb-on-linux.txt source/tutorial/install-mongodb-on-os-x.txt
instalation-sources:$(instalation-sources)
	@git update-index --assume-unchanged $(instalation-sources)
	@echo [build]: clensing git index of installation sources.
source/tutorial/install-mongodb-on-linux.txt:source/includes/install-curl-release-linux-64.rst
	@touch $@
	@echo [build]: touched $@ to ensure a clean build.
source/tutorial/install-mongodb-on-os-x.txt:source/includes/install-curl-release-osx-64.rst
	@echo [build]: touched $@ to ensure a clean build.
source/includes/install-curl-release-linux-64.rst:source/includes/install-curl-release-linux-32.rst
	@$(PYTHONBIN) bin/update_release.py linux-64 $@
	@echo [build]: \(re\)generated $@.
source/includes/install-curl-release-linux-32.rst:
	@$(PYTHONBIN) bin/update_release.py linux-32 $@
	@echo [build]: \(re\)generated $@.
source/includes/install-curl-release-osx-64.rst:
	@$(PYTHONBIN) bin/update_release.py osx $@
	@echo [build]: \(re\)generated $@.

# Initial build steps, exporting the current commit to the build.
.PHONY:source/about.txt source/includes/hash.rst setup $(public-branch-output)/release.txt
setup:source/includes/hash.rst
	@mkdir -p $(public-branch-output)
	@echo [build]: created $(public-branch-output)
source/includes/hash.rst:source/about.txt
	@$(PYTHONBIN) bin/update_hash.py
	@git update-index --assume-unchanged $@
	@echo [build]: \(re\)generated $@.
source/about.txt:
	@touch $@
	@echo [build]: touched $@ to ensure a clean build.
$(public-branch-output)/release.txt:
	@echo [build]: generating '$@' with current release hash.
	@git rev-parse --verify HEAD >|$@

# Establish basic dependencies.
$(branch-output)/dirhtml:dirhtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(branch-output)/html:html
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(branch-output)/singlehtml:singlehtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(branch-output)/singlehtml/contents.html:$(branch-output)/singlehtml


# Building and Linking the LaTeX/PDF Output
#
.PHONY: manual-pdfs

-include build/makefile.pdfs
$(output)/makefile.pdfs:bin/pdf_makefile_builder.py
	@bin/pdf_makefile_builder.py $@

#
# Building and Linking ePub Output
#
$(branch-output)/epub/MongoDB.epub:epub
$(public-branch-output)/MongoDB-Manual-$(current-branch).epub:$(branch-output)/epub/MongoDB.epub
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/MongoDB-Manual.epub:$(public-branch-output)/MongoDB-Manual-$(current-branch).epub
	@bin/create-link $(notdir $<) $(notdir $@) $@
	@echo [symlink]: created a link at: $@

#
# Migrating and processing the dirhtml and singlehtml as needed.
#

$(public-branch-output):$(branch-output)/dirhtml
	@cp -R $</* $@
	@rm -rf $@/meta/reference $@/meta/use-cases
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single:$(branch-output)/singlehtml
	@mkdir -p $@
	@cp -R $</* $@
	@rm -f $@/contents.html
	@echo [single]: migrated singlehtml files '$@'
$(public-branch-output)/single/search.html:$(branch-output)/dirhtml/search/index.html
	@cp $< $@
	@echo [single]: migrated search page '$@'
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
	                      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
	                      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [single]: generating and processing '$@' page

# Deployment related work for the non-Sphinx aspects of the build.

# migrate simple static content.

$(public-output)/index.html:themes/docs.mongodb.org/index.html
	@cp $< $@
	@echo [build]: migrated $@
$(public-output)/10gen-gpg-key.asc:themes/docs.mongodb.org/10gen-gpg-key.asc
	@cp $< $@
	@echo [build]: migrated $@
$(public-output)/10gen-security-gpg-key.asc:themes/docs.mongodb.org/10gen-security-gpg-key.asc
	@cp $< $@
	@echo [build]: migrated $@
$(public-output)/osd.xml:themes/docs.mongodb.org/osd.xml
	@cp $< $@
	@echo [build]: migrated $@

$(public-branch-output)/sitemap.xml.gz:$(branch-output)/sitemap.xml.gz
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/.htaccess:themes/docs.mongodb.org/.htaccess
	@cp $< $@
	@echo [build]: migrated $@

# Build and process the custom error pages.

ERROR_PAGES = $(public-branch-output)/meta/401/index.html $(public-branch-output)/meta/403/index.html $(public-branch-output)/meta/404/index.html $(public-branch-output)/meta/410/index.html
.PHONY: error-pages $(ERROR_PAGES)
error-pages: $(ERROR_PAGES)

$(public-branch-output)/meta/401/index.html:$(branch-output)/dirhtml/meta/401/index.html
	@sed $(SED_ARGS_FILE) "s@\.\./\.\./@http://docs.mongodb.org/manual/@" $@
	@echo [web]: processed error page: $@
$(public-branch-output)/meta/403/index.html:$(branch-output)/dirhtml/meta/403/index.html
	@sed $(SED_ARGS_FILE) "s@\.\./\.\./@http://docs.mongodb.org/manual/@" $@
	@echo [web]: processed error page: $@
$(public-branch-output)/meta/404/index.html:$(branch-output)/dirhtml/meta/404/index.html
	@sed $(SED_ARGS_FILE) "s@\.\./\.\./@http://docs.mongodb.org/manual/@" $@
	@echo [web]: processed error page: $@
$(public-branch-output)/meta/410/index.html:$(branch-output)/dirhtml/meta/410/index.html
	@sed $(SED_ARGS_FILE) "s@\.\./\.\./@http://docs.mongodb.org/manual/@" $@
	@echo [web]: processed error page: $@

# Create symbolic links

LINKS = $(public-output)/manual $(public-branch-output)/reference/reIndex $(public-branch-output)/tutorials $(public-branch-output)/reference/methods $(public-branch-output)/install-mongodb-on-red-hat-centos-or-fedora-linux
.PHONY: links $(LINKS)
links: $(LINKS)

$(public-output)/manual:
	@bin/create-link $(manual-branch) manual $@
	@echo [symlink]: created a link at: $@
$(public-branch-output)/tutorials:
	@bin/create-link tutorial $(notdir $@) $@
	@echo [symlink]: created a link at: $@
$(public-branch-output)/reference/methods:
	@bin/create-link method $(notdir $@) $@
	@echo [symlink]: created a link at: $@
$(public-branch-output)/reference/reIndex:
	@bin/create-link db.collection.reIndex $(notdir $@) $@
	@echo [symlink]: created a link at: $@
$(public-branch-output)/install-mongodb-on-red-hat-centos-or-fedora-linux:
	@bin/create-link install-mongodb-on-redhat-centos-or-fedora-linux $(notdir $@) $@
	@echo [symlink]: created a link at: $@

# Clean up/removal targets.
clean:
	-rm -rf $(branch-output)/*
	-rm -f build/makefile.pdfs
clean-public:
	-rm -rf $(public-output)/*
	-rm -f build/makefile.pdfs
clean-all:
	-rm -rf $(output)/*

# Needed for all sphinx builds.
.PHONY: $(branch-output)/themes $(branch-output)/bin $(branch-output)/.static $(branch-output)/.templates

######################################################################
#
# Default HTML Sphinx build targets
#
######################################################################

.PHONY: html dirhtml singlehtml epub sitemap
html:pre-build-dependencies
	@echo [$@]: build starting at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build complete at `date`.
dirhtml:
	@echo [$@]: build starting at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build complete at `date`.
singlehtml:
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build complete at `date`.

epub-command = $(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(branch-output)/epub
epub-filter = sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'
epub:pre-build-dependencies
	@echo [$@]: starting build at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@{ $(epub-command) 2>&1 1>&3 | $(epub-filter) 1>&2; } 3>&1
	@echo [$@]: build complete at `date`.

######################################################################
#
# Sitemap Builder
#
######################################################################

$(branch-output)/sitemap.xml.gz:$(branch-output)/dirhtml

SITEMAPBUILD = $(PYTHONBIN) bin/sitemap_gen.py
sitemap:$(branch-output)/sitemap.xml.gz
$(branch-output)/sitemap.xml.gz:$(public-output)/manual
	@echo [sitemap]: starting sitemap build at `date`.
	@echo [sitemap]: build time\: `date` >> $(branch-output)/sitemap-build.log
	@$(SITEMAPBUILD) --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@mv build/sitemap.xml.gz $@
	@echo [sitemap]: sitemap built at `date`.

######################################################################
#
# Targets for manpages
#
######################################################################

# helpers for compressing man pages
UNCOMPRESSED_MAN := $(wildcard $(branch-output)/man/*.1)
COMPRESSED_MAN := $(subst .1,.1.gz,$(UNCOMPRESSED_MAN))
man:pre-build-dependencies
	@echo [$@]: starting build at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build complete at `date`.

# Targets to build compressed man pages.
build-man: man $(COMPRESSED_MAN)
compress-man: $(COMPRESSED_MAN)
$(branch-output)/man/%.1.gz: $(branch-output)/man/%.1
	gzip $< -c > $@

######################################################################
#
# Build Targets for Draft Build.
#
######################################################################

.PHONY: aspirational aspiration draft draft-pdf draft-pdfs draft-html
aspiration:draft-html
aspirational:draft-html
draft:draft-html
draft-html:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b html $(DRAFTSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build finished at `date`.
draft-latex:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@-latex
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b latex $(DRAFTSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build finished at `date`.

draft-pdf:$(subst .tex,.pdf,$(wildcard $(branch-output)/draft-latex/*.tex))
draft-pdfs:draft-latex draft-pdf

##########################################################################
#
# Default Sphinx targets that are totally unused, but around just in case.
#
##########################################################################

.PHONY: changes linkcheck json doctest
json:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build finished at `date`.
gettext:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(POSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build finished at `date`.
changes:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: build finished at `date`.
linkcheck:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: Link check complete at `date`. See $(branch-output)/linkcheck/output.txt.
doctest:pre-build-dependencies
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [test]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: complete at `date`.

######################################################################
#
# PDF Build System.
#
######################################################################

LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"
LATEX_LINK_CORRECTION = "s%\\\code\{/%\\\code\{http://docs.mongodb.org/$(current-if-not-manual)/%g"

.PHONY:pdfs latex latexpdf

latex:
	@echo [$@]: build started at `date`.
	@mkdir -p $(branch-output)/$@
	@echo [$@]: created $(branch-output)/$@
	@echo [sphinx]: starting $@ build
	@$(SPHINXBUILD) -b $@ $(ALLSPHINXOPTS) $(branch-output)/$@
	@echo [$@]: generated all '.tex' file at `date`.

$(branch-output)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@
	@echo [latex]: fixing the Sphinx ouput of '$@'.

pdfs:$(subst .tex,.pdf,$(wildcard $(branch-output)/latex/*.tex))

PDFLATEXCOMMAND = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/

%.pdf:%.tex
	@echo [pdf]: pdf compilation of $@, started at `date`.
	@touch $(basename $@)-pdflatex.log
	@-$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(1/4\) pdflatex $<
	@-makeindex -s $(branch-output)/latex/python.ist '$(basename $<).idx' >> $(basename $@)-pdflatex.log 2>&1
	@echo [pdf]: \(2/4\) Indexing: $(basename $<).idx
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(3/4\) pdflatex $<
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(4/4\) pdflatex $<
	@echo [pdf]: see '$(basename $@)-pdflatex.log' for a full report of the pdf build process.
	@echo [pdf]: pdf compilation of $@, complete at `date`.

##########################################################################
#
# Archiving $(public-output) for cleaner full rebuilds
#
##########################################################################

archive:$(public-output).$(timestamp).tar.gz
	@echo [archive]: created $< archive.
$(public-output).$(ARCHIVE_DATE).tar.gz:$(public-output)
	tar -czvf $@ $<

# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j 
MAKEFLAGS += -r 
MAKEFLAGS += --no-print-directory

# You can set these variables from the command line.
SPHINXOPTS    = -c ./
SPHINXBUILD   = sphinx-build
PAPER	      =

# change this to reflect the location of the public repo
publication-output = ../public-docs

# change this to reflect the branch that "manual/" will point to
manual-branch = master
# intuit the current branch
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )

ifeq ($(current-branch),$(manual-branch))
current-if-not-manual = $(manual-branch)
else
current-if-not-manual = $(current-branch)
endif

# Build directory tweaking.
CURRENTBUILD = $(publication-output)/$(current-branch)
BUILDDIR = build

# Fixing `sed` for OS X
UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
SED_ARGS_FILE = -i -r
SED_ARGS_REGEX = -r
endif
ifeq ($(UNAME), Darwin)
SED_ARGS_FILE = -i "" -E
SED_ARGS_REGEX = -E
PYTHONBIN = python
endif

# Internal variables.
PAPEROPT_a4 = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS = -q -d $(BUILDDIR)/$(current-branch)-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
DRAFTSPHINXOPTS = -q -d $(BUILDDIR)/draft-$(current-branch)-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) draft

.PHONY: publish help clean push-dc1 push-dc2

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "	 html		to make standalone HTML files"
	@echo "	 dirhtml	to make HTML files named index.html in directories"
	@echo "	 singlehtml	to make a single large HTML file"
	@echo "	 epub		to make an epub"
	@echo "	 latex		to make LaTeX files, you can set PAPER=a4 or PAPER=letter"
	@echo "	 man		to make manual pages"
	@echo "	 changes	to make an overview of all changed/added/deprecated items"
	@echo
	@echo "MongoDB Manual Specific Targets."
	@echo "	 publish	runs publication process and then deploys the build to $(publication-output)"
	@echo "	 push		runs publication process and pushes to docs site to production."
	@echo "	 draft		builds a 'draft' build for pre-publication testing ."
	@echo "	 pdfs		generates pdfs more efficently than latexpdf."
	@echo
	@echo "See 'meta.build.rst' for more information."

#
# Meta targets that control the build and publication process.
#

push:publish
	@echo [build]: copying the new build to the web servers.
	$(MAKE) MODE='push' push-dc1 push-dc2
	@echo [build]: a new build of the $(manual-branch) branch of the Manual is deployed to the web servers.

publish:initial-dependencies
	$(MAKE) sphinx-components static-components
	@echo [build]: $(manual-branch) branch is succeessfully deployed to '$(publication-output)'.

#
# Targets for pushing the new build to the web servers.
#

ifeq ($(MODE),push)
push-dc1:
	rsync -arz ../public-docs/ www@www-c1.10gen.cc:/data/sites/docs
push-dc2:
	rsync -arz ../public-docs/ www@www-c2.10gen.cc:/data/sites/docs
endif

######################################################################
#
# Targets that should/need only be accessed in publication
#
######################################################################


# Deployment targets to kick off the rest of the build process. Only
# access these targets through the ``publish`` target.
.PHONY: initial-dependencies static-components sphinx-components

initial-dependencies:source/about.txt $(CURRENTBUILD) $(CURRENTBUILD)/MongoDB-Manual.epub
	@echo [build]: running the publication routine for the $(manual-branch) branch of the Manual.
static-components:$(publication-output)/index.html $(publication-output)/10gen-gpg-key.asc $(CURRENTBUILD)/tutorials $(CURRENTBUILD)/.htaccess $(CURRENTBUILD)/release.txt
	@echo [build]: building and migrating all non-Sphinx components of the build.
sphinx-components:$(CURRENTBUILD)/MongoDB-Manual.pdf $(CURRENTBUILD)/ $(CURRENTBUILD)/sitemap.xml.gz $(CURRENTBUILD)/ $(CURRENTBUILD)/single $(CURRENTBUILD)/single/index.html
	@echo [build]: running the publication routine for all Sphinx Components of the Manual Build.

#
# Build the HTML components of the build.
#

.PHONY:source/about.txt

$(BUILDDIR)/singlehtml/contents.html:$(BUILDDIR)/singlehtml
source/about.txt:
	@touch $@
	@echo [build]: touched '$@' to ensure a fresh build.
$(BUILDDIR)/dirhtml:dirhtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(BUILDDIR)/html:html
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(BUILDDIR)/singlehtml:singlehtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.

#
# Building and Linking the ePub and LaTeX Builds.
#
$(BUILDDIR)/latex/MongoDB.tex:latex
$(BUILDDIR)/latex/MongoDB.pdf:$(BUILDDIR)/latex/MongoDB-Manual.tex
$(BUILDDIR)/latex/MongoDB-Manual.tex:$(BUILDDIR)/latex/MongoDB.tex
	@bin/copy-if-needed $@ $<
$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).pdf:$(BUILDDIR)/latex/MongoDB-Manual.pdf
	@cp $< $@
	@echo [build]: migrated $@
$(CURRENTBUILD)/MongoDB-Manual.pdf:$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).pdf
	@bin/create-link $(notdir $<) $(notdir $@) $@

$(BUILDDIR)/epub/MongoDB.epub:epub
$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).epub:$(BUILDDIR)/epub/MongoDB.epub
	@cp $< $@
	@echo [build]: migrated $@
$(CURRENTBUILD)/MongoDB-Manual.epub:$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).epub
	@bin/create-link $(notdir $<) $(notdir $@) $@

#
# Migrating and processing the dirhtml and singlehtml as needed.
#

$(CURRENTBUILD)/:$(BUILDDIR)/dirhtml
	@cp -R $</* $@
	@echo [build]: migrated '$</*' to '$@'
$(CURRENTBUILD)/single:$(BUILDDIR)/singlehtml
	@mkdir -p $@
	@cp -R $</* $@
	@rm -f $@/contents.html
	@echo [SINGLE]: migrated singlehtml files '$@'
$(CURRENTBUILD)/single/search.html:$(BUILDDIR)/dirhtml/search/index.html
	@cp $< $@
	@echo [SINGLE]: migrated search page '$@'
$(CURRENTBUILD)/single/index.html:$(BUILDDIR)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
                              -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
                              -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [SINGLE]: generating and processing '$@' page

# Deployment related work for the non-Sphinx aspects of the build.
$(CURRENTBUILD)/release.txt:$(publication-output)/manual
	@echo [build]: generating '$@' with current release hash.
	@git rev-parse --verify HEAD >|$@
$(publication-output)/manual:
	@bin/create-link $(manual-branch) manual $@
$(publication-output):
	mkdir -p $@
$(CURRENTBUILD):$(publication-output)
	mkdir -p $@

$(publication-output)/index.html:themes/docs.mongodb.org/index.html
	@cp $< $@
	@echo [build]: migrated $@
$(CURRENTBUILD)/.htaccess:themes/docs.mongodb.org/.htaccess
	@cp $< $@
	@echo [build]: migrated $@
$(publication-output)/10gen-gpg-key.asc:themes/docs.mongodb.org/10gen-gpg-key.asc
	@cp $< $@
	@echo [build]: migrated $@
$(CURRENTBUILD)/sitemap.xml.gz:$(BUILDDIR)/sitemap.xml.gz
	@cp $< $@
	@echo [build]: migrated $@

$(CURRENTBUILD)/tutorials:
	@bin/create-link tutorial $(notdir $@) $@

# Clean up/removal targets.
clean:
	-rm -rf $(BUILDDIR)/*

######################################################################
#
# Default HTML Sphinx build targets
#
######################################################################

.PHONY: html dirhtml singlehtml epub sitemap
html:
	@mkdir -p $(BUILDDIR)/html
	@echo [build]: created $(BUILDDIR)/html
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo [HTML]: build complete.
dirhtml:
	@mkdir -p $(BUILDDIR)/dirhtml
	@echo [build]: created $(BUILDDIR)/dirhtml
	$(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(BUILDDIR)/dirhtml
	@echo [DIR-HTML]: build complete.
singlehtml:
	@mkdir -p $(BUILDDIR)/singlehtml
	@echo [build]: created $(BUILDDIR)/singlehtml
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
	@echo [SINGLE-HTML]: build complete.

epub-command = $(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
epub-filter = sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'
epub:
	@mkdir -p $(BUILDDIR)/epub
	@echo [build]: created $(BUILDDIR)/epub
	@echo [EPUB]: starting epub build.
	@echo $(epub-command)
	@{ $(epub-command) 2>&1 1>&3 | $(epub-filter) 1>&2; } 3>&1
	@echo [EPUB]: Build complete.

######################################################################
#
# Sitemap Builder
#
######################################################################

ifeq ($(shell test -f /etc/arch-release && echo arch || echo Linux),arch)
PYTHONBIN = python2
else 
PYTHONBIN = python
endif

$(BUILDDIR)/sitemap.xml.gz:$(BUILDDIR)/dirhtml

SITEMAPBUILD  = $(PYTHONBIN) bin/sitemap_gen.py
sitemap:$(BUILDDIR)/sitemap.xml.gz
$(BUILDDIR)/sitemap.xml.gz:
	@echo [SITEMAP]: starting sitemap build at `date`. 
	@echo [SITEMAP]: build time\: `date` >> $(BUILDDIR)/sitemap-build.log
	@$(SITEMAPBUILD) --testing --config=conf-sitemap.xml 2>&1 >> $(BUILDDIR)/sitemap-build.log
	@echo [SITEMAP]: sitemap built at `date`.


######################################################################
#
# Targets for manpages
#
######################################################################

# helpers for compressing man pages
UNCOMPRESSED_MAN := $(wildcard $(BUILDDIR)/man/*.1)
COMPRESSED_MAN := $(subst .1,.1.gz,$(UNCOMPRESSED_MAN))

man:
	@mkdir -p $(BUILDDIR)/man
	@echo [build]: created $(BUILDDIR)/man
	$(SPHINXBUILD) -b man $(ALLSPHINXOPTS) $(BUILDDIR)/man
	@echo [MAN]: build complete.

# Targets to build compressed man pages.
build-man: man $(COMPRESSED_MAN)
compress-man: $(COMPRESSED_MAN)
$(BUILDDIR)/man/%.1.gz: $(BUILDDIR)/man/%.1
	gzip $< -c > $@

######################################################################
#
# Build Targets for Draft Build.

######################################################################

.PHONY: aspirational aspiration draft draft-pdf draft-pdfs
aspiration:draft
aspirational:draft
draft:
	@mkdir -p $(BUILDDIR)/draft
	@echo [build]: created $(BUILDDIR)/draft
	$(SPHINXBUILD) -b html $(DRAFTSPHINXOPTS) $(BUILDDIR)/draft
	@echo [DRAFT]: HTML build finished.
draft-latex:
	@mkdir -p $(BUILDDIR)/draft-latex
	@echo [build]: created $(BUILDDIR)/draft-latex
	$(SPHINXBUILD) -b latex $(DRAFTSPHINXOPTS) $(BUILDDIR)/draft-latex
	@echo [DRAFT]: LaTeX build finished.
draft-pdf:$(subst .tex,.pdf,$(wildcard $(BUILDDIR)/draft-latex/*.tex))
draft-pdfs:draft-latex draft-pdf


##########################################################################
#
# Default Sphinx targets that are totally unused, but around just in case.
#
##########################################################################

.PHONY: changes linkcheck json doctest
json:
	@mkdir -p $(BUILDDIR)/json
	@echo [build]: created $(BUILDDIR)/json
	$(SPHINXBUILD) -b json $(ALLSPHINXOPTS) $(BUILDDIR)/json
	@echo [JSON]: build finished.
changes:
	@mkdir -p $(BUILDDIR)/changes
	@echo [build]: created $(BUILDDIR)/changes
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo [CHANGES]: build finished.
linkcheck:
	@mkdir -p $(BUILDDIR)/linkcheck
	@echo [build]: created $(BUILDDIR)/linkcheck
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo [LINK]: Link check complete. See $(BUILDDIR)/linkcheck/output.txt.
doctest:
	@mkdir -p $(BUILDDIR)/doctest
	@echo [build]: created $(BUILDDIR)/doctest
	$(SPHINXBUILD) -b doctest $(ALLSPHINXOPTS) $(BUILDDIR)/doctest
	@echo [TEST]: doctest complete.

######################################################################
#
# PDF Build System.
#
######################################################################

.PHONY:pdfs latex latexpdf

latex:
	@mkdir -p $(BUILDDIR)/latex
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(BUILDDIR)/latex
	@echo [latex]: TeX file generated.
latexpdf:latex
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	@echo [PDF]: build complete.

LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"

$(BUILDDIR)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) $@
	@echo [build]: fixing '$@' TeX from the Sphinx output

pdfs:$(subst .tex,.pdf,$(wildcard $(BUILDDIR)/latex/*.tex))

PDFLATEXCOMMAND = TEXINPUTS=".:$(BUILDDIR)/latex/:" pdflatex --interaction batchmode --output-directory $(BUILDDIR)/latex/

%.pdf:%.tex
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >|$@.log
	@echo [PDF]: \(1/4\) pdflatex $<
	@-makeindex -s $(BUILDDIR)/latex/python.ist '$(basename $<).idx' >>$@.log 2>&1
	@echo [PDF]: \(2/4\) Indexing: $(basename $<).idx
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >>$@.log
	@echo [PDF]: \(3/4\) pdflatex $<
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >>$@.log
	@echo [PDF]: \(4/4\) pdflatex $<
	@echo [PDF]: see '$@.log' for a full report of the pdf build process.

##########################################################################
#
# Archiving $(publication-output) for cleaner full rebuilds
#
##########################################################################

ARCHIVE_DATE := $(shell date +%s)
archive:$(publication-output).$(ARCHIVE_DATE).tar.gz
	@echo [archive]: created $< archive.
$(publication-output).$(ARCHIVE_DATE).tar.gz:$(publication-output)
	tar -czvf $@ $<

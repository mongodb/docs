# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j
MAKEFLAGS += -r
MAKEFLAGS += --no-print-directory

# Build directory tweaking.
output = build
public-output = $(output)/public
branch-output = $(output)/$(current-branch)
public-branch-output = $(public-output)/$(current-branch)

# change this to reflect the branch that "manual/" will point to
manual-branch = master
# intuit the current branch
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )

ifeq ($(current-branch),$(manual-branch))
current-if-not-manual = $(manual-branch)
else
current-if-not-manual = $(current-branch)
endif

# Fixing `sed` for OS X
UNAME := $(shell uname)
ifeq ($(UNAME), Linux)
SED_ARGS_FILE = -i -r
SED_ARGS_REGEX = -r
endif
ifeq ($(UNAME), Darwin)
SED_ARGS_FILE = -i "" -E
SED_ARGS_REGEX = -E
endif

# Sphinx variables.
SPHINXOPTS = -c ./
SPHINXBUILD = sphinx-build
PAPER = letter
PAPEROPT_a4 = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS = -q -d $(branch-output)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
DRAFTSPHINXOPTS = -q -d $(branch-output)/draft-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) draft

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
	@echo "	 publish	runs publication process and then deploys the build to $(public-output)"
	@echo "	 push		runs publication process and pushes to docs site to production."
	@echo "	 draft		builds a 'draft' build for pre-publication testing ."
	@echo "	 pdfs		generates pdfs more efficently than latexpdf."
	@echo
	@echo "See 'meta.build.rst' for more information."

#
# Meta targets that control the build and publication process.
#

push:publish
	@echo [build]: copying the new $(current-branch) build to the web servers.
	$(MAKE) MODE='push' push-dc1 push-dc2
	@echo [build]: deployed a new build of the $(current-branch) branch of the Manual.
push-all:publish
	@echo [build]: copying the full docs site to the web servers.
	$(MAKE) MODE='push' push-dc1 push-dc2
	@echo [build]: deployed a new build of the full Manual.

publish:initial-dependencies
	$(MAKE) sphinx-components static-components
	@echo [build]: $(manual-branch) branch is succeessfully deployed to '$(public-output)'.

#
# Targets for pushing the new build to the web servers.
#

ifeq ($(MODE),push)
push-dc1:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c1.10gen.cc:/data/sites/docs/$(current-branch)
push-dc2:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c1.10gen.cc:/data/sites/docs/$(current-branch)

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
.PHONY: initial-dependencies static-components sphinx-components

initial-dependencies:source/about.txt $(public-branch-output) $(public-branch-output)/MongoDB-Manual.epub
	@echo [build]: running the publication routine for the $(manual-branch) branch of the Manual.
static-components:$(public-output)/index.html $(public-output)/10gen-gpg-key.asc $(public-branch-output)/tutorials $(public-branch-output)/reference/methods $(public-branch-output)/.htaccess $(public-branch-output)/release.txt $(public-output)/osd.xml
	@echo [build]: building and migrating all non-Sphinx components of the build.
sphinx-components:$(public-branch-output)/ $(public-branch-output)/sitemap.xml.gz $(public-branch-output)/MongoDB-Manual.pdf $(public-branch-output)/single $(public-branch-output)/single/index.html
	@echo [build]: running the publication routine for all Sphinx Components of the Manual Build.

#
# Build the HTML components of the build.
#

.PHONY:source/about.txt

$(branch-output)/singlehtml/contents.html:$(branch-output)/singlehtml
source/about.txt:
	@touch $@
	@echo [build]: touched '$@' to ensure a fresh build.
$(branch-output)/dirhtml:dirhtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(branch-output)/html:html
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.
$(branch-output)/singlehtml:singlehtml
	@touch $@
	@echo [build]: touched $@ to ensure proper migration.

#
# Building and Linking the ePub and LaTeX Builds.
#
$(branch-output)/latex/MongoDB.tex:latex
$(branch-output)/latex/MongoDB.pdf:$(branch-output)/latex/MongoDB-Manual.tex
$(branch-output)/latex/MongoDB-Manual.tex:$(branch-output)/latex/MongoDB.tex
	@bin/copy-if-needed $@ $<
$(public-branch-output)/MongoDB-Manual-$(current-branch).pdf:$(branch-output)/latex/MongoDB-Manual.pdf
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/MongoDB-Manual.pdf:$(public-branch-output)/MongoDB-Manual-$(current-branch).pdf
	@bin/create-link $(notdir $<) $(notdir $@) $@

$(branch-output)/epub/MongoDB.epub:epub
$(public-branch-output)/MongoDB-Manual-$(current-branch).epub:$(branch-output)/epub/MongoDB.epub
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/MongoDB-Manual.epub:$(public-branch-output)/MongoDB-Manual-$(current-branch).epub
	@bin/create-link $(notdir $<) $(notdir $@) $@

#
# Migrating and processing the dirhtml and singlehtml as needed.
#

$(public-branch-output)/:$(branch-output)/dirhtml
	@cp -R $</* $@
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single:$(branch-output)/singlehtml
	@mkdir -p $@
	@cp -R $</* $@
	@rm -f $@/contents.html
	@echo [SINGLE]: migrated singlehtml files '$@'
$(public-branch-output)/single/search.html:$(branch-output)/dirhtml/search/index.html
	@cp $< $@
	@echo [SINGLE]: migrated search page '$@'
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
			      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
			      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [SINGLE]: generating and processing '$@' page

# Deployment related work for the non-Sphinx aspects of the build.
$(public-branch-output)/release.txt:$(public-output)/manual
	@echo [build]: generating '$@' with current release hash.
	@git rev-parse --verify HEAD >|$@
$(public-output)/manual:
	@bin/create-link $(manual-branch) manual $@
$(public-output):
	mkdir -p $@
$(public-branch-output):$(public-output)
	mkdir -p $@

$(public-output)/index.html:themes/docs.mongodb.org/index.html
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/.htaccess:themes/docs.mongodb.org/.htaccess
	@cp $< $@
	@echo [build]: migrated $@
$(public-output)/10gen-gpg-key.asc:themes/docs.mongodb.org/10gen-gpg-key.asc
	@cp $< $@
	@echo [build]: migrated $@
$(public-branch-output)/sitemap.xml.gz:$(branch-output)/sitemap.xml.gz
	@cp $< $@
	@echo [build]: migrated $@
$(public-output)/osd.xml:themes/docs.mongodb.org/osd.xml
	@cp $< $@
	@echo [build]: migrated $@

$(public-branch-output)/tutorials:
	@bin/create-link tutorial $(notdir $@) $@
$(public-branch-output)/reference/methods:
	@bin/create-link method $(notdir $@) $@

# Clean up/removal targets.
clean:
	-rm -rf $(branch-output)/*
clean-public:
	-rm -rf $(public-output)/*
clean-all:
	-rm -rf $(output)/*


######################################################################
#
# Default HTML Sphinx build targets
#
######################################################################

.PHONY: html dirhtml singlehtml epub sitemap
html:
	@mkdir -p $(branch-output)/html
	@echo [build]: created $(branch-output)/html
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(branch-output)/html
	@echo [HTML]: build complete.
dirhtml:
	@mkdir -p $(branch-output)/dirhtml
	@echo [build]: created $(branch-output)/dirhtml
	$(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(branch-output)/dirhtml
	@echo [DIR-HTML]: build complete.
singlehtml:
	@mkdir -p $(branch-output)/singlehtml
	@echo [build]: created $(branch-output)/singlehtml
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(branch-output)/singlehtml
	@echo [SINGLE-HTML]: build complete.

epub-command = $(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(branch-output)/epub
epub-filter = sed $(SED_ARGS_REGEX) -e '/^WARNING: unknown mimetype.*ignoring$$/d' -e '/^WARNING: search index.*incomplete.$$/d'
epub:
	@mkdir -p $(branch-output)/epub
	@echo [build]: created $(branch-output)/epub
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

$(branch-output)/sitemap.xml.gz:$(branch-output)/dirhtml

SITEMAPBUILD = $(PYTHONBIN) bin/sitemap_gen.py
sitemap:$(branch-output)/sitemap.xml.gz
$(branch-output)/sitemap.xml.gz:$(branch-output)/dirhtml
	@echo [SITEMAP]: starting sitemap build at `date`.
	@echo [SITEMAP]: build time\: `date` >> $(branch-output)/sitemap-build.log
	@$(SITEMAPBUILD) --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@mv build/sitemap.xml.gz $@
	@echo [SITEMAP]: sitemap built at `date`.


######################################################################
#
# Targets for manpages
#
######################################################################

# helpers for compressing man pages
UNCOMPRESSED_MAN := $(wildcard $(branch-output)/man/*.1)
COMPRESSED_MAN := $(subst .1,.1.gz,$(UNCOMPRESSED_MAN))

man:
	@mkdir -p $(branch-output)/man
	@echo [build]: created $(branch-output)/man
	$(SPHINXBUILD) -b man $(ALLSPHINXOPTS) $(branch-output)/man
	@echo [MAN]: build complete.

# Targets to build compressed man pages.
build-man: man $(COMPRESSED_MAN)
compress-man: $(COMPRESSED_MAN)
$(branch-output)/man/%.1.gz: $(branch-output)/man/%.1
	gzip $< -c > $@

######################################################################
#
# Build Targets for Draft Build.

######################################################################

.PHONY: aspirational aspiration draft draft-pdf draft-pdfs
aspiration:draft
aspirational:draft
draft:
	@mkdir -p $(branch-output)/draft
	@echo [build]: created $(branch-output)/draft
	$(SPHINXBUILD) -b html $(DRAFTSPHINXOPTS) $(branch-output)/draft
	@echo [DRAFT]: HTML build finished.
draft-latex:
	@mkdir -p $(branch-output)/draft-latex
	@echo [build]: created $(branch-output)/draft-latex
	$(SPHINXBUILD) -b latex $(DRAFTSPHINXOPTS) $(branch-output)/draft-latex
	@echo [DRAFT]: LaTeX build finished.
draft-pdf:$(subst .tex,.pdf,$(wildcard $(branch-output)/draft-latex/*.tex))
draft-pdfs:draft-latex draft-pdf


##########################################################################
#
# Default Sphinx targets that are totally unused, but around just in case.
#
##########################################################################

.PHONY: changes linkcheck json doctest
json:
	@mkdir -p $(branch-output)/json
	@echo [build]: created $(branch-output)/json
	$(SPHINXBUILD) -b json $(ALLSPHINXOPTS) $(branch-output)/json
	@echo [JSON]: build finished.
changes:
	@mkdir -p $(branch-output)/changes
	@echo [build]: created $(branch-output)/changes
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(branch-output)/changes
	@echo [CHANGES]: build finished.
linkcheck:
	@mkdir -p $(branch-output)/linkcheck
	@echo [build]: created $(branch-output)/linkcheck
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(branch-output)/linkcheck
	@echo [LINK]: Link check complete. See $(branch-output)/linkcheck/output.txt.
doctest:
	@mkdir -p $(branch-output)/doctest
	@echo [build]: created $(branch-output)/doctest
	$(SPHINXBUILD) -b doctest $(ALLSPHINXOPTS) $(branch-output)/doctest
	@echo [TEST]: doctest complete.

######################################################################
#
# PDF Build System.
#
######################################################################

.PHONY:pdfs latex latexpdf

latex:
	@mkdir -p $(branch-output)/latex
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(branch-output)/latex
	@echo [latex]: TeX file generated.
latexpdf:latex
	$(MAKE) -C $(branch-output)/latex all-pdf
	@echo [PDF]: build complete.

LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"

$(branch-output)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) $@
	@echo [build]: fixing '$@' TeX from the Sphinx output

pdfs:$(subst .tex,.pdf,$(wildcard $(branch-output)/latex/*.tex))

PDFLATEXCOMMAND = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/

%.pdf:%.tex
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >|$@.log
	@echo [PDF]: \(1/4\) pdflatex $<
	@-makeindex -s $(branch-output)/latex/python.ist '$(basename $<).idx' >>$@.log 2>&1
	@echo [PDF]: \(2/4\) Indexing: $(basename $<).idx
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >>$@.log
	@echo [PDF]: \(3/4\) pdflatex $<
	@$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<' >>$@.log
	@echo [PDF]: \(4/4\) pdflatex $<
	@echo [PDF]: see '$@.log' for a full report of the pdf build process.

##########################################################################
#
# Archiving $(public-output) for cleaner full rebuilds
#
##########################################################################

ARCHIVE_DATE := $(shell date +%s)
archive:$(public-output).$(ARCHIVE_DATE).tar.gz
	@echo [archive]: created $< archive.
$(public-output).$(ARCHIVE_DATE).tar.gz:$(public-output)
	tar -czvf $@ $<

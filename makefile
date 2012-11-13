# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j
MAKEFLAGS += -r
MAKEFLAGS += --no-print-directory

# Build directory tweaking.
output = build
build-tools = bin
rst-include = source/includes
public-output = $(output)/public
branch-output = $(output)/$(current-branch)
public-branch-output = $(public-output)/$(current-branch)

# intuit the current branch and commit
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )
last-commit := $(shell git rev-parse --verify HEAD)
timestamp := $(shell date +%Y%m%d%H%M)

# change this to reflect the branch that "manual/" will point to
manual-branch = master
ifeq ($(current-branch),$(manual-branch))
current-if-not-manual = manual
else
current-if-not-manual = $(current-branch)
endif

.PHONY: help
help:
	@echo "Please use \`make <target>' where <target> is a supported Sphinx target, including:"
	@echo "  html		to make standalone HTML files"
	@echo "  dirhtml	to make HTML files named index.html in directories"
	@echo "  epub		to make an epub"
	@echo "  latex		to make LaTeX files, you can set PAPER=a4 or PAPER=letter"
	@echo "  man		to make manual pages"
	@echo
	@echo "MongoDB Manual Specific Targets."
	@echo "  publish	runs publication process and then deploys the build to $(public-output)"
	@echo "  push		runs publication process and pushes to docs site to production."
	@echo "  draft		builds a 'draft' build for pre-publication testing ."
	@echo "  pdfs		generates pdfs more efficently than latexpdf."
	@echo
	@echo "See 'meta.build.rst' for more information."

############# makefile includes #############
include bin/makefile.compatibility

# Included, dynamically generated makefile sections, to build: sphinx
# targets, LaTeX/PDFs, tables, the installation guides, and symbolic
# links.

-include $(output)/makefile.pdfs
-include $(output)/makefile.tables
-include $(output)/makefile.links
-include $(output)/makefile.sphinx
-include $(output)/makefile.releases
-include $(output)/makefile.errors
-include $(output)/makefile.migrations

$(output)/makefile.%:bin/makefile-builder/%.py bin/makefile_builder.py bin/builder_data.py
	@$(PYTHONBIN) bin/makefile-builder/$(subst .,,$(suffix $@)).py $@

############# Meta targets that control the build and publication process. #############
.PHONY: publish push publish-if-up-to-date push-with-delete push-all
push:publish-if-up-to-date
	@echo [build]: copying the new $(current-branch) build to the web servers.
	@$(MAKE) MODE='push' push-dc1 push-dc2
	@echo [build]: deployed a new build of the $(current-branch) branch of the Manual.
push-all:publish
	@echo [build]: delploying the full docs site to the web servers.
	@$(MAKE) MODE='push' push-all-dc1 push-all-dc2
	@echo [build]: deployed a new build of the full Manual.
push-with-delete:publish
	@echo [build]: deploying the $(current-branch) to the web servers (with rsync --delete).
	@$(MAKE) MODE='push' push-with-delete-dc1 push-with-delete-dc2
	@echo [build]: deployed a new build of the $(current-branch) of Manual.
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

# Targets for pushing the new build to the web servers.
ifeq ($(MODE),push)
.PHONY: push-dc1 push-dc2 push-dc1-all push-dc2-all
push-dc1:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c1.10gen.cc:/data/sites/docs/$(current-branch)
push-dc2:
	rsync -arz $(public-output)/$(current-branch)/ www@www-c2.10gen.cc:/data/sites/docs/$(current-branch)
push-all-dc1:
	rsync -arz $(public-output)/ www@www-c1.10gen.cc:/data/sites/docs
push-all-dc2:
	rsync -arz $(public-output)/ www@www-c2.10gen.cc:/data/sites/docs
push-with-delete-dc1:
	rsync -arz --delete $(public-output)/$(current-branch)/ www@www-c1.10gen.cc:/data/sites/docs/$(current-branch)
push-with-delete-dc2:
	rsync -arz --delete $(public-output)/$(current-branch)/ www@www-c2.10gen.cc:/data/sites/docs/$(current-branch)
endif

############# Targets for all special elements of the production build (i.e. 'make publish') #############

# Deployment targets to kick off the rest of the build process.
# Only  access these targets through the ``publish`` target.
.PHONY: initial-dependencies static-components sphinx-components post-processing
pre-build-dependencies:setup installation-guides tables
	@echo [build]: completed $@ buildstep.
initial-dependencies:$(public-branch-output)/MongoDB-Manual.epub
	@echo [build]: completed $@ buildstep.
static-components:$(public-output)/index.html $(public-output)/10gen-gpg-key.asc $(public-output)/10gen-security-gpg-key.asc $(public-branch-output)/.htaccess $(public-branch-output)/release.txt $(public-output)/osd.xml
	@echo [build]: completed $@ buildstep.
post-processing:error-pages links
	@echo [build]: completed $@ buildstep.
sphinx-components:manual-pdfs $(public-branch-output)/single $(public-branch-output)/single/index.html $(public-branch-output) $(public-branch-output)/sitemap.xml.gz
	@echo [build]: completed $@ buildstep.

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
$(branch-output)/epub/MongoDB.epub:epub
$(public-branch-output)/MongoDB-Manual.epub:$(public-branch-output)/MongoDB-Manual-$(current-branch).epub

# Migrating and processing the dirhtml and singlehtml as needed.
$(public-branch-output):$(branch-output)/dirhtml
	@cp -R $</* $@
	@rm -rf $@/meta/reference $@/meta/use-cases
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single:$(branch-output)/singlehtml
	@mkdir -p $@
	@cp -R $</* $@
	@rm -f $@/contents.html
	@echo [single]: migrated singlehtml files '$@'
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
	                      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
	                      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [single]: generating and processing '$@' page

# Sitemap builder
.PHONY: sitemap
sitemap:$(branch-output)/sitemap.xml.gz
$(branch-output)/sitemap.xml.gz:$(public-output)/manual $(branch-output)/dirhtml
	@echo [sitemap]: starting sitemap build at `date`.
	@echo [sitemap]: build time\: `date` >> $(branch-output)/sitemap-build.log
	@$(PYTHONBIN) bin/sitemap_gen.py --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@mv build/sitemap.xml.gz $@
	@echo [sitemap]: sitemap built at `date`.

############# PDF generation infrastructure. #############

LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"
LATEX_LINK_CORRECTION = "s%\\\code\{/%\\\code\{http://docs.mongodb.org/$(current-if-not-manual)/%g"
PDFLATEXCOMMAND = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/

# Uses 'latex' target to generate latex files.
.PHONY:pdfs
pdfs:$(subst .tex,.pdf,$(wildcard $(branch-output)/latex/*.tex))
$(branch-output)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@
	@echo [latex]: fixing the Sphinx ouput of '$@'.
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

############# General purpose targets. Not used (directly) in the production build #############

# Clean up/removal targets.
clean:
	-rm -rf $(branch-output)/*
	-rm -f build/makefile.*
clean-public:
	-rm -rf $(public-output)/*
	-rm -f build/makefile.*
clean-all:
	-rm -rf $(output)/*
	-rm -f build/makefile.*

# Archiving $(public-output) for more sane testing, and risk free cleaning.
archive:$(public-output).$(timestamp).tar.gz
	@echo [archive]: created $< archive.
$(public-output).%.tar.gz:$(public-output)
	tar -czvf $@ $<

# convience targets for draft builds
.PHONY: draft draft-pdfs draft-latex draft-html
draft:draft-html
draft-pdfs:draft-latex $(subst .tex,.pdf,$(wildcard $(branch-output)/draft-latex/*.tex))

# man page support, uses sphinx `man` builder output.
UNCOMPRESSED_MAN := $(wildcard $(branch-output)/man/*.1)
COMPRESSED_MAN := $(subst .1,.1.gz,$(UNCOMPRESSED_MAN))
build-man:man $(COMPRESSED_MAN)
compress-man:$(COMPRESSED_MAN)
$(branch-output)/man/%.1.gz: $(branch-output)/man/%.1
	gzip $< -c > $@

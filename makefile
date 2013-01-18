# Makefile for MongoDB Sphinx documentation
include bin/makefile.compatibility
MAKEFLAGS += -j -r --no-print-directory

# Build directory tweaking.
output = build
build-tools = bin
rst-include = source/includes
public-output = $(output)/public
branch-output = $(output)/$(current-branch)
public-branch-output = $(public-output)/$(current-branch)

# get current branch & commit; set the branch that  "manual/" points to; + a conditional
manual-branch = master
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )
last-commit := $(shell git rev-parse --verify HEAD)
timestamp := $(shell date +%Y%m%d%H%M)
ifeq ($(current-branch),$(manual-branch))
current-if-not-manual = manual
else
current-if-not-manual = $(current-branch)
endif

help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'meta.build.rst' for more on the build. Use the following MongoDB Manual targets:"
	@echo "	 publish	runs publication process and then deploys the build to $(public-output)"
	@echo "	 push		runs publication process and pushes to docs site to production."
	@echo "	 draft		builds a 'draft' build for pre-publication testing ."
	@echo "	 pdfs		generates pdfs."

############# makefile includes #############
# Included, dynamically generated makefile sections, to build: sphinx
# targets, LaTeX/PDFs, tables, the installation guides, and sym links.

-include $(output)/makefile.pdfs
-include $(output)/makefile.texinfo
-include $(output)/makefile.tables
-include $(output)/makefile.links
-include $(output)/makefile.intersphinx
-include $(output)/makefile.sphinx
-include $(output)/makefile.releases
-include $(output)/makefile.errors
-include $(output)/makefile.migrations
-include $(output)/makefile.sphinx-migration

$(output)/makefile.%:bin/makefile-builder/%.py bin/makefile_builder.py bin/builder_data.py
	@mkdir -p $(output)
	@$(PYTHONBIN) $< $@
$(output)/makefile.intersphinx:bin/makefile-builder/intersphinx.py bin/makefile_builder.py conf.py
	@mkdir -p $(output)
	@$(PYTHONBIN) $< $@

include bin/makefile.clean
include bin/makefile.content
include bin/makefile.push

############# Meta targets that control the build and publication process. #############
.PHONY: publish publish-if-up-to-date

publish-if-up-to-date:
	@bin/published-build-check $(current-branch) $(last-commit)
	@$(MAKE) publish
publish:$(sphinx-content) $(static-content)
	@echo [build]: $(manual-branch) branch is succeessfully deployed to '$(public-output)'.

############# Targets that define the production build process #############
.PHONY:source/about.txt source/includes/hash.rst setup $(public-branch-output)/release.txt

# Generating files with buildinfo.
setup:source/includes/hash.rst
	@mkdir -p $(public-branch-output)
	@echo [build]: created $(public-branch-output)
source/includes/hash.rst:source/about.txt
	@$(PYTHONBIN) bin/update_hash.py
	@-git update-index --assume-unchanged $@
	@echo [build]: \(re\)generated $@.
$(public-branch-output)/release.txt:$(public-branch-output)/
	@echo [build]: generating '$@' with current release hash.
	@git rev-parse --verify HEAD >|$@

# Establish basic dependencies.
$(branch-output)/singlehtml/contents.html:$(branch-output)/singlehtml
$(branch-output)/epub/MongoDBManual.epub:epub
$(public-branch-output)/MongoDB-Manual.epub:$(public-branch-output)/MongoDB-Manual-$(current-branch).epub

# migrating and processing dirhtml and singlehtml content.
$(public-branch-output)/ $(public-output)/:
	@mkdir -p $@
	@echo [build]: created $@
$(public-branch-output):$(branch-output)/dirhtml
	@mkdir -p $@
	@cp -R $</* $@/
	@rm -rf $@/meta/reference $@/meta/use-cases
	@touch $@
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single:$(branch-output)/singlehtml
	@mkdir -p $@
	@cp -R $</* $@/
	@rm -f $@/contents.html
	@touch $@
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
			      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
			      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [single]: generating and processing '$@' page

# sitemap builder, triggered in the `publish` routine
$(output)/sitemap.xml.gz:$(public-branch-output) $(public-output)/manual
	@cp -R $(branch-output)/dirhtml/* $(public-branch-output)
	@echo [build]: migrated "$(branch-output)/dirhtml/*" to "$(public-branch-output)" again.
	@echo [sitemap]: starting sitemap build at `date`.
	@mkdir -p $(output)/
	@echo [sitemap]: build time\: `date` >> $(branch-output)/sitemap-build.log
	@$(PYTHONBIN) bin/sitemap_gen.py --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@echo [sitemap]: sitemap built at `date`.

############# PDF generation infrastructure. #############
LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"
LATEX_LINK_CORRECTION = "s%\\\code\{/%\\\code\{http://docs.mongodb.org/$(current-if-not-manual)/%g"
pdflatex-command = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/ $(LATEXOPTS)

# Uses 'latex' target to generate latex files.
draft-pdfs:draft-latex $(subst .tex,.pdf,$(wildcard $(branch-output)/draft-latex/*.tex))
pdfs:$(subst .tex,.pdf,$(wildcard $(branch-output)/latex/*.tex))
	@echo [build]: ALL PDFLATEX BUILD ERRORS IGNORED.
$(branch-output)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@
	@echo [latex]: fixing the Sphinx ouput of '$@'.
%.pdf:%.tex
	@echo [pdf]: pdf compilation of $@, started at `date`.
	@touch $(basename $@)-pdflatex.log
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(1/6\) pdflatex $<
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(2/6\) pdflatex $<
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(3/6\) pdflatex $<
	@-makeindex -s $(branch-output)/latex/python.ist '$(basename $<).idx' >> $(basename $@)-pdflatex.log 2>&1
	@echo [pdf]: \(4/6\) Indexing: $(basename $<).idx
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(5/6\) pdflatex $<
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(6/6\) pdflatex $<
	@echo [pdf]: see '$(basename $@)-pdflatex.log' for a full report of the pdf build process.
	@echo [pdf]: pdf compilation of $@, complete at `date`.

############# General purpose targets. Not used (directly) in the production build #############
draft:draft-html
# man page support, uses sphinx `man` builder output.
.PHONY:$(manpages)
manpages := $(wildcard $(branch-output)/man/*.1)
compressed-manpages := $(subst .1,.1.gz,$(manpages))
manpages:$(compressed-manpages) $(branch-output)/manpages.tar.gz
$(compressed-manpages):$(manpages)
$(manpages):man
$(branch-output)/man/%.1.gz: $(branch-output)/man/%.1
	@gzip $< -c > $@
	@echo [man]: compressing $< -- $@
$(branch-output)/manpages.tar.gz:man
	@touch $@.log
	@$(TARBIN) -C $(branch-output)/ --transform=s/man/mongodb-manpages/ \
		   -czvf $@ $(subst $(branch-output)/,,$(manpages)) >> $@.log
	@echo [man]: created $@ archive of all manpages

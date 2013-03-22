# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j -r --no-print-directory

############ path settings ##############
# Build directory tweaking.
output = build
build-tools = bin
rst-include = source/includes

help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'meta.build.rst' for more on the build. Use the following MongoDB Manual targets:"
	@echo "	 publish	runs publication process and then deploys the build to $(public-output)"
	@echo "	 push		runs publication process and pushes to docs site to production."
	@echo "	 draft		builds a 'draft' build for pre-publication testing ."
	@echo "	 pdfs		generates pdfs."

############# makefile includes #############
include bin/makefile.meta
include bin/makefile.compatibility
include bin/makefile.dynamic
include bin/makefile.clean
include bin/makefile.content
include bin/makefile.tables
include bin/makefile.push
include bin/makefile.manpages

############# Meta targets that control the build and publication process. #############
publish:$(sphinx-content) $(static-content)
	@echo [build]: $(manual-branch) branch is succeessfully deployed to '$(public-output)'.

############# Targets that define the production build process #############

# Generating files with build specific info.
setup:source/includes/hash.rst
	@mkdir -p $(public-branch-output) $(public-output)
	@echo [build]: created $(public-branch-output)
source/includes/hash.rst:source/about.txt
	@$(PYTHONBIN) bin/update_hash.py
	@-git update-index --assume-unchanged $@
	@echo [build]: \(re\)generated $@.
$(public-branch-output)/release.txt:$(public-branch-output)/
	@echo $(last-commit) >|$@
	@echo [build]: generated '$@' with current release hash.

# migrating and processing dirhtml and singlehtml content.
$(public-output)/ $(output):
	@mkdir -p $@
	@echo [build]: created $@
$(public-branch-output):$(branch-output)/dirhtml
	@mkdir -p $@
	@rsync -a $</ $@/
	@rm -rf $(public-branch-output)/meta/reference $(public-branch-output)/meta/use-cases
	@touch $@
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single:$(branch-output)/singlehtml
	@mkdir -p $@
	@rsync -a $</ $@/
	@rm -f $@/contents.html
	@touch $@
	@echo [build]: migrated '$</*' to '$@'
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
			      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
			      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [single]: generating and processing '$@' page

$(output)/sitemap.xml.gz:$(public-branch-output) $(public-output)/manual error-pages links
	@echo -e "----------\n[sitemap]: build started\: `date`" >> $(branch-output)/sitemap-build.log
	@$(PYTHONBIN) bin/sitemap_gen.py --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@echo [sitemap]: sitemap build complete at `date`.
	@echo "[sitemap]: build finished: `date`" >> $(branch-output)/sitemap-build.log

############# PDF generation infrastructure. #############
LATEX_CORRECTION = "s/(index|bfcode)\{(.*!*)*--(.*)\}/\1\{\2-\{-\}\3\}/g"
LATEX_LINK_CORRECTION = "s%\\\code\{/%\\\code\{http://docs.mongodb.org/$(current-if-not-manual)/%g"
pdflatex-command = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/ $(LATEXOPTS)

# Uses 'latex' target to generate latex files.
pdfs:$(subst .tex,.pdf,$(wildcard $(branch-output)/latex/*.tex))
$(branch-output)/latex/%.tex:
	@sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) $@
	@echo [latex]: fixing the Sphinx ouput of '$@'.
%.pdf:%.tex
	@$(pdflatex-command) $(LATEXOPTS) '$<' >|$@.log
	@echo "[pdf]: (1/4) pdflatex $<"
	@-makeindex -s $(output)/latex/python.ist '$(basename $<).idx' >>$@.log 2>&1
	@echo "[pdf]: (2/4) Indexing: $(basename $<).idx"
	@$(pdflatex-command) $(LATEXOPTS) '$<' >>$@.log
	@echo "[pdf]: (3/4) pdflatex $<"
	@$(pdflatex-command) $(LATEXOPTS) '$<' >>$@.log
	@echo "[pdf]: (4/4) pdflatex $<"
	@echo "[pdf]: see '$@.log' for a full report of the pdf build process."

############# General purpose targets. Not used (directly) in the production build #############
tags:
	@etags -I --language=none --regex=@bin/etags.regexp `find source -name "*.txt" | grep -v "\.#"`
	@echo "[dev]: etags generation complete."
draft:draft-html
draft-pdfs:draft-latex $(subst .tex,.pdf,$(wildcard $(branch-output)/draft-latex/*.tex))

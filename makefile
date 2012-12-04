# Makefile for MMS Sphinx documentation

######### makefile set up, includes, and generation ###########
MAKEFLAGS += -r -j --no-print-directory
output = build

include bin/makefile.push
include bin/makefile.compatibility
-include $(output)/makefile.sphinx

$(output)/makefile.%:bin/%.py bin/makefile_builder.py bin/builder_data.py
	@$(PYTHONBIN) bin/$(subst .,,$(suffix $@)).py $@

########## build system configuration and variables ##########

primary-branch = master
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )
last-commit := $(shell git rev-parse --verify HEAD)
timestamp := $(shell date +%Y%m%d%H%M)

ifeq ($(EDITION),hosted)
build-type = hosted
conf-path = conf_base.py
branch-output = build/hosted/$(current-branch)
publish-output = build/public/hosted/$(current-branch)
public-output = build/public/hosted
publish-dependency = $(public-output)/current
build-meta += -t hosted
else
build-type = saas
conf-path = conf_base.py
branch-output = build/saas
publish-output = build/public/saas
build-meta += -t saas
endif

########## interaction and control ##########
.PHONY: help hosted saas test publish
help:
	@echo "HELP TEXT OUT OF DATE"
	@echo "Please use \`make <target>' where <target> is one of:"
	@echo "	 all            to stage the all mms documents."
	@echo "	 hosted         to stage the mms-hosted documents."
	@echo "	 saas           to stage the mms saas version documents."
	@echo "	 push           to stage and deploy all mmms documents."
	@echo "	 push-hosted    to stage and deploy mms-hosted documents."
	@echo "	 push-mms       to stage and deploy mmms-saas documents."
	@echo "	 <sphinx>       all standard sphinx build targets are avlible for testing."

all:hosted saas
hosted:
	@$(MAKE) EDITION=$@ html publish
	@echo [build]: $@ edition complete
saas:
	@$(MAKE) EDITION=$@ html publish
	@echo [build]: $@ edition complete

$(public-output)/current:$(public-output)
	@ln -s $(primary-branch)
	@mv $(primary-branch) $@
	@echo [build]: created and migrated $@

########## dependency lists ##########

HTML_OUTPUT = $(publish-output)/ $(publish-output)/single/ $(publish-output)/single/_static
PDF_OUTPUT = $(branch-output)/latex/mms-manual.pdf
$(publish-output): $(HTML_OUTPUT) $(PDF_OUTPUT)
publish:$(publish-output) $(publish-dependency)

########## html migration ##########

$(public-output):
	@mkdir -p $@
	@echo [build]: created $@
$(publish-output)/single:$(branch-output)/singlehtml/
	@mkdir -p $@
	@echo [build]: created $@/.
$(publish-output)/:$(branch-output)/html/
	@mkdir -p $@
	@echo [build]: created $@.
	@cp -R $</* $@
	@echo [build]: migrated $< into $@.
$(publish-output)/single/: $(publish-output)/single/genindex.html
	@cp -R $(branch-output)/singlehtml/* $@
	@echo [build]: migrated $@
	@sed $(SED_ARGS_FILE) -e 's/id="searchbox"/id="display-none"/g' -e 's/id="editions"/id="display-none"/g' $(publish-output)/single/index.html
	@echo [build]: processed $@ content.
$(publish-output)/single/genindex.html:$(branch-output)/html/genindex.html
	@cp $< $@
	@echo [build]: migrated $@
	@sed $(SED_ARGS_FILE) -e 's@(<dt><a href=").*html#@\1./index.html#@' -e 's@(class="toctree-l1"><a class="reference internal" href=")(.*).html@\1../\2.html@' -e 's/id="searchbox"/id="display-none"/g' -e 's/id="navigation"/id="display-none"/g' -e 's/id="editions"/id="display-none"/g' $@
	@echo [build]: processed $@ content.
$(publish-output)/single/_static:$(publish-output)/_static/ $(publish-output)/single/
	@ln -s ../_static _static
	@mv _static $@
	@echo [build]: created and migrated $@.
$(publish-output)/_static/:$(publish-output)/
$(branch-output)/html/genindex.html:$(branch-output)/html/ $(publish-output)/single
$(branch-output)/html/:html 
$(branch-output)/singlehtml/:singlehtml

########## pdf migration ##########

pdflatex-command = TEXINPUTS=".:$(branch-output)/latex/:" pdflatex --interaction batchmode --output-directory $(branch-output)/latex/ $(LATEXOPTS)

$(branch-output)/latex/mms.tex:latex 
$(branch-output)/latex/mms-manual.pdf:$(branch-output)/latex/mms-manual.tex
$(branch-output)/latex/mms-manual.tex:$(branch-output)/latex/mms.tex
	@$(PYTHONBIN) bin/copy-if-needed.py -i $< -o $@ -b pdf

%.pdf:%.tex
	@echo [pdf]: pdf compilation of $@, started at `date`.
	@touch $(basename $@)-pdflatex.log
	@-$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(1/4\) pdflatex $<
	@-makeindex -s $(branch-output)/latex/python.ist '$(basename $<).idx' >> $(basename $@)-pdflatex.log 2>&1
	@echo [pdf]: \(2/4\) Indexing: $(basename $<).idx
	@$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(3/4\) pdflatex $<
	@$(pdflatex-command) '$<' >> $(basename $@)-pdflatex.log
	@echo [pdf]: \(4/4\) pdflatex $<
	@echo [pdf]: see '$(basename $@)-pdflatex.log' for a full report of the pdf build process.
	@echo [pdf]: pdf compilation of $@, complete at `date`.

###################################

clean:
	-rm -rf $(output)/*

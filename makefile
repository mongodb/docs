######### makefile set up, includes, and generation ###########
MAKEFLAGS += -r -j --no-print-directory
.DEFAULT_GOAL = publish
output = build
build-tools = bin
tools = $(output)/docs-tools

include $(tools)/makefiles/makefile.compatibility
-include $(output)/makefile.meta
noop:
build/makefile.meta:$(output)/docs-tools/makecloth/meta.py
	@mkdir -p $(output)
	@$(PYTHONBIN) $< $@

########## build system configuration and variables ##########
timestamp := $(shell date +%Y%m%d%H%M)

########## interaction and control ##########
.PHONY: help hosted saas publish all
help:
	@echo "please use \`make <target>' where <target> is one of:"
	@echo "	 publish        to stage the all mms documents. (default.)"
	@echo "	 hosted		to stage the mms-hosted documents."
	@echo "	 saas		to stage the mms saas version documents."
	@echo "	 push		to stage and deploy all mmms documents."
	@echo "	 <sphinx>	all standard sphinx build targets are avlible for testing."

publish all:hosted saas
hosted saas:setup
	@$(MAKE) EDITION=$@ generate-source dirhtml-$@ build/public/$@/.htaccess $(public-output) $(publish-output)
	@echo [build]: $@ edition complete
setup:
	@mkdir -p $(public-output) $(branch-output) $(branch-output)/source

########## html migration ##########
htaccess:build/public/saas/.htaccess build/public/hosted/.htaccess
build/public/saas/.htaccess:bin/htaccess-saas.yaml bin/htaccess.py
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<
build/public/hosted/.htaccess:bin/htaccess-hosted.yaml bin/htaccess.py 
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<

$(output):
	@mkdir -p $@
	@echo [build]: created $@

########## system #########################
clean:
	-rm -rf $(output)/*

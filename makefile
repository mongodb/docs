######### makefile set up, includes, and generation ###########
MAKEFLAGS += -r -j --no-print-directory
.DEFAULT_GOAL = publish
output = build
build-tools = bin
tools = $(output)/docs-tools

-include $(output)/makefile.meta
noop:
$(output)/makefile.meta:$(output)/docs-tools/makecloth/meta.py $(build-tools)/docs_meta.yaml meta.yaml
	@mkdir -p $(output)
	@python $< $@

########## build system configuration and variables ##########
timestamp := $(shell date +%Y%m%d%H%M)

########## interaction and control ##########
.PHONY: help hosted saas publish all $(output)/makefile.meta publish-saas publish-hosted generated-source-saas generated-source-hosted
help:
	@echo "please use \`make <target>' where <target> is one of:"
	@echo "	 publish        to stage the all mms documents. (default.)"
	@echo "	 hosted		to stage the mms-hosted documents."
	@echo "	 saas		to stage the mms saas version documents."
	@echo "	 push		to stage and deploy all mmms documents."
	@echo "	 <sphinx>	all standard sphinx build targets are avlible for testing."

ifeq ($(current-branch),master)
publish all:hosted saas
htaccess:build/public/saas/.htaccess build/public/hosted/.htaccess
build/public/saas/.htaccess:build/public/saas
else
publish all:hosted
htaccess:build/public/hosted/.htaccess
endif

hosted saas:setup
	@$(MAKE) EDITION=$@ generate-source-$@ publish-$@ latex-$@ json-$@ build/public/$@/.htaccess
	@echo [build]: $@ edition complete

########## common components ##########
build/public/saas/.htaccess:bin/htaccess-saas.yaml bin/htaccess.py build/public/saas
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<
build/public/hosted/.htaccess:bin/htaccess-hosted.yaml bin/htaccess.py build/public/hosted
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<

########## system ##########
clean:
	-rm -rf $(output)/*
master:
	@touch $@

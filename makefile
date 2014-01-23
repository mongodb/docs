######### makefile set up, includes, and generation ###########
MAKEFLAGS += -r -j --no-print-directory
output = build
build-tools = bin
tools = $(output)/docs-tools

noop:
bootstrap fabfile build/docs-tools:
	@python bootstrap.py
	@echo "[bootstrap]: configured build environment."

########## interaction and control ##########
.PHONY: $(output)/makefile.meta noop help hosted saas publish all $(output)/makefile.meta publish-saas publish-hosted generated-source-saas generated-source-hosted
help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'http://docs.mongodb.org/manual/meta' for more information. For MMS specific targets:"
	@echo "	 publish        to stage the all mms documents. (default.)"
	@echo "	 hosted		to stage the mms-hosted documents."
	@echo "	 saas		to stage the mms saas version documents."

-include $(output)/makefile.meta

########## MMS Specific Content ##########

hosted saas:setup
	@$(MAKE) EDITION=$@ generate-source-$@ latex-$@ json-$@ html-$@ dirhtml-$@ singlehtml-$@ build/public/$@/.htaccess
	@echo [build]: $@ edition complete

build/public/saas/.htaccess:bin/htaccess-saas.yaml $(tools)/bin/htaccess.py
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<
build/public/hosted/.htaccess:bin/htaccess-hosted.yaml $(tools)/bin/htaccess.py
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<

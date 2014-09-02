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
	@echo "	 publish	to stage the all mms documents. (default.)"
	@echo "	 hosted		to stage the mms-hosted documents."
	@echo "	 saas		to stage the mms saas version documents."

-include $(output)/makefile.meta

########## MMS Specific Content ##########

hosted saas:setup
	-@$(PYTHONBIN) $(tools)/bin/htaccess.py build/public/$@/.htaccess --data bin/htaccess-$@.yaml
	@fab sphinx.target:latex-$@,json-$@,singlehtml-$@,dirhtml-$@,html-$@
	@echo [build]: $@ edition complete

giza-push:
	@giza push --deploy push-saas push-hosted --builder latex json html dirhtml singlehtml --serial_sphinx --edition saas hosted
giza-stage:
	@giza push --deploy stage-saas stage-hosted --builder latex json html dirhtml singlehtml --serial_sphinx --edition saas hosted

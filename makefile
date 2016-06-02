MAKEFLAGS += -j -r --no-print-directory

%:
	giza make $@

help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'http://docs.mongodb.org/manual/meta' for more information."


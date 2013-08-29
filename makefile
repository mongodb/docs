MAKEFLAGS += -j -r --no-print-directory

############ path and build-meta configuration ##############
# The paths generated in makefile.meta will override the follwoing
# values, but we need to set the values once here to properly
# bootstrap the build system.

output = build
build-tools = bin
tools = $(output)/docs-tools

noop:
bootstrap fabfile build/docs-tools:
	@python bootstrap.py
	@echo "[bootstrap]: configured build environment."
help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'http://docs.mongodb.org/manual/meta' for more information."

-include $(output)/makefile.meta

############# Meta targets that control the build and publication process. #############
$(public-branch-output)/MongoDB-manual-$(current-branch).tar.gz:html
	@echo $(last-commit) >| $(branch-output)/$</release.txt
	@$(TARBIN) -C $(branch-output)/ --transform=s/html/MongoDB-manual-$(current-branch)/ \
                   -czf $@ ./$< 
	@echo "[html.tar.gz]: tarball of html build complete."

############# General purpose targets. Not used (directly) in the production build #############
tags:
	@etags -I --language=none --regex=@bin/etags.regexp `find source -name "*.txt" | grep -v "\.#"`
	@sed $(SED_ARGS_FILE) 's/\.\. (.*):: \$$*(.*)/\1.\2/' TAGS
	@echo "[dev]: etags generation complete."

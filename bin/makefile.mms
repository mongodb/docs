ifeq ($(EDITION),hosted)
build-type = hosted
public-output = build/public/$(build-type)/$(current-branch)
publish-output = $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-hosted:$(publish-dependency)
endif

ifeq ($(EDITION),saas)
build-type = saas
public-output = build/public/$(build-type)
publish-output += $(public-output) $(public-output)/single
publish-saas:$(publish-output) $(publish-dependency)
endif

generate-source-hosted:
	@rsync --recursive --times --delete source/ $(hosted-source-dir)
	@echo [sphinx-prep]: updated source in $(hosted-source-dir)
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase. \($(hosted-source-dir)\)

generate-source-saas:
	@rsync --recursive --times --delete source/ $(saas-source-dir)
	@echo [sphinx-prep]: updated source in $(saas-source-dir)
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase. \($(saas-source-dir)\)

build-meta += -t mms $(build-type)

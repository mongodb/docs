MAKEFLAGS += -r -j --no-print-directory
output = build

noop:

%:
	giza make $@

# -include $(output)/makefile.meta

########## interaction and control ##########
.PHONY: $(output)/makefile.meta noop giza-push giza-stage

giza-push push:
	@giza push --deploy push-cloud push-onprem	--builder publish --serial_sphinx --edition cloud onprem
giza-stage stage:
	@giza push --deploy stage-cloud stage-onprem --builder publish --serial_sphinx --edition cloud onprem

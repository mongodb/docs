MAKEFLAGS += -j -r --no-print-directory

output = build

noop:
bootstrap fabfile build/docs-tools:
	@python bootstrap.py
	@echo "[bootstrap]: configured build environment."

-include $(output)/makefile.meta

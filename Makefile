GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`

.PHONY: all serve

all:
	hugo -d build/$(GIT_BRANCH)

serve:
	hugo serve

GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`

.PHONY: all serve help

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

all: ## Build the documentation under build/<git branch>
	hugo -d build/$(GIT_BRANCH)

serve: ## Host the documentation on port 1313
	hugo serve

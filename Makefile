GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`

.PHONY: build serve help

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: | tools/node_modules ## Build the documentation under build/<git branch>
	hugo -d build/$(GIT_BRANCH)
	$(NODE) tools/genindex.js content/tutorials build/$(GIT_BRANCH)/search.json --config config.toml

serve: ## Host the documentation on port 1313
	hugo serve

tools/node_modules: tools/package.json
	cd tools && npm update

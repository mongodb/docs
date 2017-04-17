.PHONY: build server help

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: | tools/node_modules ## Build into public/
	hugo
	$(NODE) tools/genindex.js content public/search.json public/tags.json --config config.toml

server: ## Host the documentation on port 1313
	$(NODE) tools/genindex.js content public/search.json public/tags.json --config config.toml
	hugo server --renderToDisk

tools/node_modules: tools/package.json
	cd tools && npm update

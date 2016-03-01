.PHONY: help stage build

help:
	@echo 'Targets'
	@echo '    help    - Show this help message'
	@echo '    stage   - Host online for review'

stage: build
	mut-publish build/ docs-mongodb-org-staging --prefix='landing' --verbose --stage
	@echo "Hosted at https://docs-mongodborg-staging.corp.mongodb.com/landing/`whoami`/`git rev-parse --abbrev-ref HEAD`/index.html"

build:
	rm -rf $@
	mkdir build
	cp -p index.html mongodb-logo.png style.css *webfont* ./build

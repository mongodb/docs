GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
URL="https://docs-mongodborg-staging.corp.mongodb.com"
PREFIX=landing

.PHONY: help stage fake-deploy build

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy  - Create a fake deployment in the staging bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

stage: build
	mut-publish build/ docs-mongodb-org-staging --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build
	mut-publish build/ docs-mongodb-org-staging --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${URL}/${PREFIX}/index.html"

build:
	rm -rf $@
	mkdir build
	cp -p index.html mongodb-logo.png style.css *webfont* ./build

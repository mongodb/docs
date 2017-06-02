GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=landing

.PHONY: help stage fake-deploy build-temp lint build

CSS_ERRORS=errors,empty-rules,duplicate-properties,selector-max-approaching
CSS_WARNINGS=regex-selectors,unqualified-attributes,text-indent

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy  - Create a fake deployment in the staging bucket'
	@echo '  deploy       - Deploy into production'
	@echo '  lint         - Check the CSS'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

stage: build-temp
	mut-publish build-temp/ docs-mongodb-org-staging --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build-temp
	mut-publish build-temp/ docs-mongodb-org-staging --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${URL}/${PREFIX}/index.html"

deploy: build-temp
	mut-publish build-temp/ ${PRODUCTION_BUCKET} --prefix='/' --deploy --dry-run --verbose ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build-temp/ ${PRODUCTION_BUCKET} --prefix='/' --deploy ${ARGS}

	@echo "Deployed"

build-temp: style.min.css
	rm -rf $@
	mkdir $@
	cp -p index.html mongodb-logo.png style.min.css *webfont* $@/

build: style.min.css
	# Clean build directory
	rm -rf $@
	# Create output directories
	mkdir -p $@/home
	mkdir -p $@/cloud
	mkdir -p $@/tools
	# Copy CSS and JS files to output directories
	cp -r static/images static/fonts static/css static/js $@/home
	cp -r static/images static/fonts static/css static/js $@/cloud
	cp -r static/images static/fonts static/css static/js $@/tools
	# Run the script to generate each landing page
	python ./gen_landings.py $@

# Don't grab node_modules unless we have to
style.min.css: src/sass/style.scss
	$(MAKE) node_modules
	./node_modules/.bin/node-sass $^ | ./node_modules/.bin/cleancss --skip-rebase --semantic-merging -o ./static/css/$@

node_modules:
	npm update

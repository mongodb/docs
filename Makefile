GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)

STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging

PRODUCTION_BUCKET=docs-mongodb-org-prod
PRODUCTION_URL=https://docs.mongodb.com/guides

PROJECT=guides

DRIVERS_PATH=source/driver-examples

.PHONY: examples help html publish stage deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'


html: examples install-resources ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: examples install-resources ## Builds this branch's publishable HTML and other artifacts under build/public
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/master build/public; fi
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

deploy: build/public ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --all-subdirectories ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	mut-index upload build/public \
		-o ${PROJECT}-${GIT_BRANCH}.json \
		-u ${PRODUCTION_URL} \
		-g \
		-s \
		--exclude build/public/index.html

examples:
	mkdir -p ${DRIVERS_PATH}
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-python-driver/master/test/test_examples.py -o ${DRIVERS_PATH}/test_examples.py
	curl -SfL https://raw.githubusercontent.com/mongodb/motor/master/test/asyncio_tests/test_examples.py -o ${DRIVERS_PATH}/test_examples_motor.py
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-perl-driver/master/t/examples/driver-examples.t -o ${DRIVERS_PATH}/driver-examples.t
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-php-library/master/tests/DocumentationExamplesTest.php -o ${DRIVERS_PATH}/DocumentationExamplesTest.php
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver/master/driver-sync/src/examples/documentation/DocumentationSamples.java -o ${DRIVERS_PATH}/DocumentationSamples.java
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/2.2/test/functional/examples_tests.js -o ${DRIVERS_PATH}/examples_tests.js
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/master/spec/integration/shell_examples_spec.rb -o ${DRIVERS_PATH}/shell_examples_spec.rb
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/master/spec/integration/change_stream_examples_spec.rb -o ${DRIVERS_PATH}/change_stream_examples_spec.rb
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-scala-driver/master/driver/src/it/scala/org/mongodb/scala/DocumentationExampleSpec.scala -o ${DRIVERS_PATH}/DocumentationExampleSpec.scala
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/DocumentationExamples.cs -o ${DRIVERS_PATH}/DocumentationExamples.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/change_streams.js -o ${DRIVERS_PATH}/ChangeStreamNodeExamples.js
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/ChangeStreamExamples.cs -o ${DRIVERS_PATH}/ChangeStreamExamples.cs
	#curl -SfL https://raw.githubusercontent.com/mongodb/mongo-c-driver/master/tests/test-mongoc-sample-commands.c -o ${DRIVERS_PATH}/test-mongoc-sample-commands.c
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver-reactivestreams/master/examples/documentation/src/DocumentationSamples.java -o ${DRIVERS_PATH}/AsyncDocumentationSamples.java
	curl -SfL https://raw.githubusercontent.com/skerschb/testauth/master/src/index.js -o ${DRIVERS_PATH}/react_stitch_google.js
	cp examples/java/ConnectExample.java  ${DRIVERS_PATH}/JavaConnectExample.java
	cp examples/csharp/Connect.cs  ${DRIVERS_PATH}/csharpconnect.cs
	cp examples/python/connect/connect.py  ${DRIVERS_PATH}/connect.py
	cp examples/motor/connect/connect.py  ${DRIVERS_PATH}/motorconnect.py
	cp examples/python/connect/connecttest.py  ${DRIVERS_PATH}/connecttest.py
	cp examples/node/connect/connect.js  ${DRIVERS_PATH}/connect.js


install-resources: ## Retrieves the generated installation resources from the mongodb/docs repo
	curl -SfL https://raw.githubusercontent.com/mongodb/docs/master/source/includes/release-base.yaml -o source/includes/release-base.yaml
	curl -SfL https://raw.githubusercontent.com/mongodb/docs/master/source/includes/release-specifications.yaml -o source/includes/release-specifications.yaml
	curl -SfL https://raw.githubusercontent.com/mongodb/docs/master/source/includes/fact-install-windows.rst -o source/includes/fact-install-windows.rst

screenshots:
	giza generate assets
	@echo "Running screenshot tool"
	-rm -r screenshots-temp/guides
	mkdir -p screenshots-temp/guides
	cd build/docs-tools/tools/screenshot-tool && npm install
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-provider.js `pwd`/screenshot-scripts/.properties.ini	
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-clusterselect.js `pwd`/screenshot-scripts/.properties.ini
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-importatlas.js `pwd`/screenshot-scripts/.properties.ini	
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-connectionstringcompass.js `pwd`/screenshot-scripts/.properties.ini	
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-connectionstringdrivers.js `pwd`/screenshot-scripts/.properties.ini	
	node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-connectionstringwhitelist.js `pwd`/screenshot-scripts/.properties.ini	
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/guides-connectionstring.js `pwd`/screenshot-scripts/.properties.ini

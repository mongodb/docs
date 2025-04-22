GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-prd-staging
PRODUCTION_BUCKET=docs-mongodb-org-prd

# "PROJECT" currently exists to support having multiple projects
# within one bucket. For the manual it is empty.
PROJECT=
DOTCOM_STAGING_URL="https://mongodbcom-cdn.website.staging.corp.mongodb.com"
DOTCOM_STAGING_BUCKET=docs-mongodb-org-dotcomstg
DOTCOM_PRODUCTION_URL="https://mongodb.com"
DOTCOM_PRODUCTION_BUCKET=docs-mongodb-org-dotcomprd
DOTCOM_PREFIX=docs
DOTCOM_STGPREFIX=docs



DRIVERS_PATH=source/driver-examples

BLOCKS_FILE=./build/${GIT_BRANCH}/tests.blocks
TEST_FILE=./build/${GIT_BRANCH}/tests.js

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/manual-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help lint html markdown stage deploy deploy-search-index examples redirects

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

lint: ## Checks URLs in the built corpus underneath build/<branch>/html
	mut-lint --linters=links ./build/master/source/ ${ARGS}

test: html ## Runs test framework over the corpus
	./build/docs-tools/tools/rst-testing/create-blocks.py ./build/${GIT_BRANCH}/source ${BLOCKS_FILE}
	node ./build/docs-tools/tools/rst-testing/compile-blocks.js ${BLOCKS_FILE} > ${TEST_FILE}
	./build/docs-tools/tools/rst-testing/rst_tester.py ${TEST_FILE}

html: examples ## Builds this branch's HTML under build/<branch>/html
	giza make html

markdown: examples ## Build markdown and merge into docs-tutorials
	giza make markdown
	./build/docs-tools/tools/migrate-markdown.py build/${GIT_BRANCH}/markdown

publish: examples ## Builds this branch's publishable HTML and other artifacts under build/public
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/master build/public; fi
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

# - Enter build/<branch>/html, and recurse over each regular file
#   <basename>/<filename>.
#   * Upload each to the S3 bucket under <project>/<username>/<basename>/<filename>
stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${DOTCOM_STAGING_BUCKET} --prefix=${DOTCOM_STGPREFIX} --stage ${ARGS}
	@echo "Hosted at ${DOTCOM_STAGING_URL}/${DOTCOM_STGPREFIX}/${USER}/${GIT_BRANCH}/index.html"


# - Enter build/public/<branch>, as well as any symbolic links pointing
#   to it, and recurse over each file <basename>/<filename>.
#   * Upload each to the S3 bucket under <project>/<basename>/<filename>.
# - Upload each *regular file* <filename> underneath build/public
#   underneath <project>/<filename>.
# - Download the redirect rules from S3 that begin with one of the
#   --redirect-prefix regex rules.
# - Parse the file build/public/.htaccess, and for each redirect rule:
#   * If rule does not exist in remote set, upload redirect.
# - Remove previously-matched redirect rules in S3 that do not exist in
#   local redirect set.

# The recursive behavior would CHANGE if --all-subdirectories were
# given: ALL contents of build/public/<branch> would be upload
deploy: build/public ## Deploy to the production bucket
	mut-publish build/public ${DOTCOM_PRODUCTION_BUCKET} --prefix=${DOTCOM_PREFIX} --deploy --redirect-prefix='v[0-9]\.[0-9]' --redirect-prefix='manual' --redirect-prefix='master' ${ARGS}
	@echo "Hosted at ${DOTCOM_PRODUCTION_URL}/${DOTCOM_PREFIX}/index.html"
	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o manual-current.json --aliases manual-${GIT_BRANCH} -u ${PRODUCTION_URL}/manual -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o manual-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${GIT_BRANCH} -s; \
	fi

redirects:
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi
	
examples:
	mkdir -p ${DRIVERS_PATH}
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-python-driver/3.6.0/test/test_examples.py -o ${DRIVERS_PATH}/test_examples.py
	curl -SfL https://raw.githubusercontent.com/mongodb/motor/master/test/asyncio_tests/test_examples.py -o ${DRIVERS_PATH}/test_examples_motor.py

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-perl-driver/master/t/examples/driver-examples.t -o ${DRIVERS_PATH}/driver-examples.t

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver/3.6.x/driver/src/examples/documentation/DocumentationSamples.java -o ${DRIVERS_PATH}/DocumentationSamples.java
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver-reactivestreams/master/examples/documentation/src/DocumentationSamples.java -o ${DRIVERS_PATH}/AsyncDocumentationSamples.java

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/2.5-stable/spec/mongo/shell_examples_spec.rb -o ${DRIVERS_PATH}/shell_examples_spec.rb
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/2.5-stable/spec/mongo/change_stream_examples_spec.rb -o ${DRIVERS_PATH}/change_stream_examples_spec.rb

# node
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/change_streams.test.js                        -o ${DRIVERS_PATH}/node_changestreams.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/array_filters.test.js                         -o ${DRIVERS_PATH}/node_array_filters.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/causal_consistency.test.js                    -o ${DRIVERS_PATH}/node_causal_consistency.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/insert.test.js                                -o ${DRIVERS_PATH}/node_insert.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/project_fields_from_query_results.test.js     -o ${DRIVERS_PATH}/node_project.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/query.test.js                                 -o ${DRIVERS_PATH}/node_query.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/query_embedded_documents.test.js              -o ${DRIVERS_PATH}/node_query_embedded_documents.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/query_arrays.test.js                          -o ${DRIVERS_PATH}/node_query_arrays.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/query_array_of_documents.test.js              -o ${DRIVERS_PATH}/node_query_array_of_documents.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/query_for_null_fields.test.js                 -o ${DRIVERS_PATH}/node_query_for_null_fields.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/remove_documents.test.js                      -o ${DRIVERS_PATH}/node_remove.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/transactions.test.js                          -o ${DRIVERS_PATH}/node_transactions.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/main/test/integration/node-specific/examples/update_documents.test.js                      -o ${DRIVERS_PATH}/node_update.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/4.0/test/functional/examples/versioned_api.js                               -o ${DRIVERS_PATH}/node_versioned_api.js

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-php-library/v1.3/tests/DocumentationExamplesTest.php -o ${DRIVERS_PATH}/DocumentationExamplesTest.php


	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-scala-driver/2.6.x/driver/src/it/scala/org/mongodb/scala/DocumentationExampleSpec.scala -o ${DRIVERS_PATH}/DocumentationExampleSpec.scala

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/v2.5.x/tests/MongoDB.Driver.Examples/DocumentationExamples.cs -o ${DRIVERS_PATH}/DocumentationExamples.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/v2.5.x/tests/MongoDB.Driver.Examples/ChangeStreamExamples.cs -o ${DRIVERS_PATH}/ChangeStreamExamples.cs

	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-c-driver/r1.9/tests/test-mongoc-sample-commands.c -o ${DRIVERS_PATH}/test-mongoc-sample-commands.c 


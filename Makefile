GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod

# "PROJECT" currently exists to support having multiple projects
# within one bucket. For the manual it is empty.
PROJECT=

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
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${USER}/${GIT_BRANCH}/index.html"

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
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirect-prefix='v[0-9]\.[0-9]' --redirect-prefix='manual' --redirect-prefix='master' ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/index.html"

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
# python
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-python-driver/master/test/test_examples.py -o ${DRIVERS_PATH}/test_examples.py
# motor
	curl -SfL https://raw.githubusercontent.com/mongodb/motor/master/test/asyncio_tests/test_examples.py -o ${DRIVERS_PATH}/test_examples_motor.py
# perl
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-perl-driver/master/t/examples/driver-examples.t -o ${DRIVERS_PATH}/driver-examples.t
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-perl-driver/master/t/examples/transaction.t -o ${DRIVERS_PATH}/perl-transactions-examples.t
# php
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-php-library/master/tests/DocumentationExamplesTest.php -o ${DRIVERS_PATH}/DocumentationExamplesTest.php
# java crud
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver/master/driver-sync/src/examples/documentation/DocumentationSamples.java -o ${DRIVERS_PATH}/DocumentationSamples.java
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-java-driver-reactivestreams/master/examples/documentation/src/DocumentationSamples.java -o ${DRIVERS_PATH}/AsyncDocumentationSamples.java

# node
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/3.0/test/functional/operation_changestream_example_tests.js -o ${DRIVERS_PATH}/ChangeStreamNodeExamples.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/array_filters.js                              -o ${DRIVERS_PATH}/node_array_filters.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/causal_consistency.js                         -o ${DRIVERS_PATH}/node_causal_consistency.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/insert.js                                     -o ${DRIVERS_PATH}/node_insert.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/project_fields_from_query_results.js          -o ${DRIVERS_PATH}/node_project.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/query.js                                      -o ${DRIVERS_PATH}/node_query.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/query_embedded_documents.js                   -o ${DRIVERS_PATH}/node_query_embedded_documents.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/query_arrays.js                               -o ${DRIVERS_PATH}/node_query_arrays.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/query_array_of_documents.js                   -o ${DRIVERS_PATH}/node_query_array_of_documents.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/query_for_null_fields.js                      -o ${DRIVERS_PATH}/node_query_for_null_fields.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/remove_documents.js                           -o ${DRIVERS_PATH}/node_remove.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/transactions.js                               -o ${DRIVERS_PATH}/node_transactions.js
	curl -SfL https://raw.githubusercontent.com/mongodb/node-mongodb-native/master/test/examples/update_documents.js                           -o ${DRIVERS_PATH}/node_update.js

# ruby
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/master/spec/mongo/shell_examples_spec.rb -o ${DRIVERS_PATH}/shell_examples_spec.rb
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/master/spec/mongo/change_stream_examples_spec.rb -o ${DRIVERS_PATH}/change_stream_examples_spec.rb
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-ruby-driver/master/spec/mongo/transactions_examples_spec.rb -o ${DRIVERS_PATH}/transactions_examples_spec.rb

# scala
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-scala-driver/master/driver/src/it/scala/org/mongodb/scala/DocumentationExampleSpec.scala -o ${DRIVERS_PATH}/DocumentationExampleSpec.scala
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-scala-driver/master/driver/src/it/scala/org/mongodb/scala/DocumentationTransactionsExampleSpec.scala -o ${DRIVERS_PATH}/DocumentationTransactionsExampleSpec.scala

# csharp
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/DocumentationExamples.cs -o ${DRIVERS_PATH}/DocumentationExamples.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/ChangeStreamExamples.cs -o ${DRIVERS_PATH}/ChangeStreamExamples.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/TransactionExamplesForDocs/RetryExample1.cs -o ${DRIVERS_PATH}/TransactionsRetryExample1.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/TransactionExamplesForDocs/RetryExample2.cs -o ${DRIVERS_PATH}/TransactionsRetryExample2.cs
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-csharp-driver/master/tests/MongoDB.Driver.Examples/TransactionExamplesForDocs/RetryExample3.cs -o ${DRIVERS_PATH}/TransactionsRetryExample3.cs

# c
	curl -SfL https://raw.githubusercontent.com/mongodb/mongo-c-driver/master/src/libmongoc/tests/test-mongoc-sample-commands.c -o ${DRIVERS_PATH}/test-mongoc-sample-commands.c 

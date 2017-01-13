GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.org"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=php-library

.PHONY: help publish stage deploy

help:
# Prints out the following help message.
       @echo 'Targets'
       @echo '  help         - Show this help message'
       @echo '  publish      - Build docs locally'
       @echo '  stage        - Host online for review'
       @echo '  deploy       - Deploy to the production bucket'
       @echo ''
       @echo 'Variables'
       @echo '  ARGS         - Arguments to pass to mut-publish'

publish: 
# !!! DOES NOT PUT STUFF ONTO THE INTERNET !!!
# Builds the artifacts that you will deploy with other targets. 
# Also builds an HTML rendering for local viewing. 
#
# If master branch, giza creates any symlinks needed per integrations.yaml
# If master, giza creates any redirects per build_conf.yaml / htaccess.yaml

       # get the latest for mongo-php-libray/docs git submodule: 
       git submodule update --remote 
       # rsync the docs source from the submodule to the source/ directory:
       rsync -a --delete mongo-php-library/docs/ source/ 
       # build the publish artefacts using giza:
       giza make publish 

stage: 
# !!! DEPLOY HTML TO STAGING WEBSITE !!!
# Deploys the HTML from the build/<branch> directory to the STAGING_BUCKET.
#
# mut-publish
#       build/${GIT_BRANCH}/html  directory from which to grab the HTML to deploy to the STAGING_BUCKET
#       STAGING_BUCKET            Amazon s3 bucket used for the staging site
#         --prefix=${PREFIX}      ${PREFIX} is the folder in the staging bucket in which to place the HTML
#      --stage                    indicates that mut-publish should publish to the staging bucket (not the prod bucket)
#      if ${ARGS}, then additonal arguments

       mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
       @echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"



deploy: publish	
# !!! DEPLOY BUILD ARTIFACTS TO PRODUCTION !!!
# Deploys the build artifacts from the build/public directory to the PRODUCTION_BUCKET, 
# first doing a 'dry run' that lists all of the files that will be uploaded/deleted/etc. 
# and then asks you to press a key to perform the procedure.
#
# deploy: publish 	the :publish indicates that the publish target must happen before the deploy
# mut-publish
#      build/public         directory from which to grab the build artifacts to deploy to the PRODUCTION_BUCKET
#      PRODUCTION_BUCKET    Amazon s3 bucket that holds the production docs
#      --prefix=${PREFIX}   ${PREFIX} is the folder in the prod. bucket in which to place the artifacts
#      --deploy             indicates that mut-publish should publish to the production bucket (not the staging bucket)
#      --verbose            prints out a detail of what files are being uploaded/deleted/etc.
#      --dry-run            instructs mut-publish to do everything *except* actually put stuff on the internet.
#      if ${ARGS}, then additonal arguments
       @echo "Doing a dry-run"
       mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --verbose --dry-run ${ARGS}
    
       @echo ''
       read -p "Press any key to perform the previous"
       mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy ${ARGS}
    
       @echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/index.html"

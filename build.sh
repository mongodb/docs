PARSER_VERSION=0.18.14
# This make command curls the examples for certain repos.
# If the rule doesn't exist, the error doesn't interrupt the build process.
make examples

if [ ! -d "snooty-parser" ]; then
  echo "snooty parser not installed, downloading..."
  curl -L -o snooty-parser.zip https://github.com/mongodb/snooty-parser/releases/download/v${PARSER_VERSION}/snooty-v${PARSER_VERSION}-linux_x86_64.zip
  unzip -d ./snooty-parser snooty-parser.zip
  chmod +x ./snooty-parser/snooty
fi

echo "======================================================================================================================================================================="
echo "========================================================================== Running parser... =========================================================================="
./snooty-parser/snooty/snooty build . --no-caching --output=./bundle.zip --branch=v1.10
echo "========================================================================== Parser complete ============================================================================"
echo "======================================================================================================================================================================="

if [ ! -d "snooty" ]; then
  echo "snooty frontend not installed, downloading"
  git clone -b netlify-pageId-hotfix --depth 1 https://github.com/mongodb/snooty.git 
  echo GATSBY_MANIFEST_PATH=$(pwd)/bundle.zip >> ./snooty/.env.production
  cd snooty
  npm ci --legacy-peer-deps
  git clone --depth 1 https://github.com/mongodb/docs-tools.git ./snooty/docs-tools
  mkdir -p ./snooty/static/images
  mv ./snooty/docs-tools/themes/mongodb/static ./static/docs-tools
  mv ./snooty/docs-tools/themes/guides/static/images/bg-accent.svg ./static/docs-tools/images/bg-accent.svg
fi

if [ -d "docs-worker-pool" ]; then
  node --unhandled-rejections=strict docs-worker-pool/modules/persistence/dist/index.js --path bundle.zip --githubUser netlify
fi


cd snooty && npm run build:no-prefix

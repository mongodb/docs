#! /bin/bash

PROJECT=$(git rev-parse --show-toplevel)
DART_EXAMPLES=$PROJECT/examples/dart
GENERATED_EXAMPLES=$PROJECT/source/examples/generated/flutter

# standard bluehawking
echo "Bluehawking Dart unit test examples"
npx bluehawk snip $DART_EXAMPLES/test -o $GENERATED_EXAMPLES

# Bluehawk bundle example
echo "Bluehawking Flutter bundle example"
npx bluehawk snip $DART_EXAMPLES/bin/myapp.dart -o $GENERATED_EXAMPLES
npx bluehawk snip $DART_EXAMPLES/bundle_example -o $GENERATED_EXAMPLES

# Bluehawk testing SDK examples
echo "Bluehawking testing SDK examples"
npx bluehawk snip $DART_EXAMPLES/test_sdk_example/test -o $GENERATED_EXAMPLES

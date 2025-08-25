#!/bin/bash

PROJECT=$(git rev-parse --show-toplevel)
JS_RN_EXAMPLES=$PROJECT/examples/react-native/legacy/__tests__/js
TS_RN_EXAMPLES=$PROJECT/examples/react-native/legacy/__tests__/ts

echo $JS_RN_EXAMPLES

JS_GENERATED_EXAMPLES=$PROJECT/source/examples/generated/react-native/js
TS_GENERATED_EXAMPLES=$PROJECT/source/examples/generated/react-native/ts
echo $JS_GENERATED_EXAMPLES

npx bluehawk snip $JS_RN_EXAMPLES -o $JS_GENERATED_EXAMPLES

npx bluehawk snip $TS_RN_EXAMPLES -o $TS_GENERATED_EXAMPLES

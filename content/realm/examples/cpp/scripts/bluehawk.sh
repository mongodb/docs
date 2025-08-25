#! /bin/bash

PROJECT=$(git rev-parse --show-toplevel)
CPP_EXAMPLES=$PROJECT/examples/cpp
GENERATED_EXAMPLES=$PROJECT/source/examples/generated/cpp

# Bluehawk asymmetric examples
echo "Bluehawking C++ asymmetric sync examples"
npx bluehawk snip $CPP_EXAMPLES/asymmetric --ignore build -o $GENERATED_EXAMPLES

# Bluehawk local examples
echo "Bluehawking C++ local examples"
npx bluehawk snip $CPP_EXAMPLES/local --ignore build -o $GENERATED_EXAMPLES

# Bluehawk sync examples
echo "Bluehawking C++ sync examples"
npx bluehawk snip $CPP_EXAMPLES/sync --ignore build -o $GENERATED_EXAMPLES

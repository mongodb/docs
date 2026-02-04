#!/bin/bash
# This script installs all dependencies for running the Snooty parser locally.
# It is intended to be run from the snooty-build-log-project directory.

set -e

# Check if uv is installed
if ! command -v uv &> /dev/null; then
  echo "Installing uv..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "Using uv to manage Python and dependencies..."

# Create a virtual environment with Python 3.12 (uv will download it if needed)
if [ ! -d ".venv" ]; then
  uv venv --python 3.12 .venv
  echo "Created virtual environment in .venv with Python 3.12"
fi

# Activate the virtual environment
source .venv/bin/activate

echo "Installing Snooty parser from source..."

# Clone the snooty-parser repository if not already cloned
if [ ! -d "snooty-parser" ]; then
  git clone https://github.com/mongodb/snooty-parser.git
  echo "Cloned snooty-parser repository"
fi

cd snooty-parser

# Install build dependencies and snooty-parser from source
uv pip install flit wheel typing_extensions
uv pip install -e .

cd ..

# Optionally install development/test dependencies
uv pip install -r requirements.txt 2>/dev/null || echo "No requirements.txt found, skipping extra dependencies."

echo "Snooty parser and dependencies installed."
echo "To activate the environment later, run: source .venv/bin/activate"
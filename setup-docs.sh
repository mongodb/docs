#!/bin/bash
#
# Documentation Linters Setup Script
# 
# One-stop shop for writers to install all linting tools.
# Run once to set up, run again to update.
#
# Usage (recommended — private repo): clone first, then:
#   git clone git@github.com:10gen/docs-mongodb-internal.git && cd docs-mongodb-internal && ./setup-docs.sh
#   # or: gh repo clone 10gen/docs-mongodb-internal && cd docs-mongodb-internal && ./setup-docs.sh
#
# Optional: curl the script — raw.githubusercontent.com needs auth for private repos (see .github/lint-docs/README.md).
#
# Usage (if you already have the repo):
#   ./setup-docs.sh
#
# What it does:
#   - Clones the repo (if not already cloned)
#   - Installs Node.js (if missing)
#   - Installs pnpm (if missing)
#   - Installs lychee (for 404 link checking)
#   - Installs all linter dependencies
#
# Clone URL:
#   Tries SSH first, then HTTPS if SSH fails. To force HTTPS only:
#     DOCS_SETUP_HTTPS=1 curl -fsSL .../setup-docs.sh | bash
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${BLUE}▶${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

echo ""
echo "====================================="
echo "  Documentation Linters Setup"
echo "====================================="
echo ""

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
fi

# ============================================
# Check/Clone Repository
# ============================================
REPO_URL_SSH="git@github.com:10gen/docs-mongodb-internal.git"
REPO_URL_HTTPS="https://github.com/10gen/docs-mongodb-internal.git"
REPO_NAME="docs-mongodb-internal"
DEFAULT_CLONE_DIR="$HOME/$REPO_NAME"

# Determine if we're running from inside the repo or standalone
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" 2>/dev/null || echo ".")" && pwd)"

# Check if we're already in the repo
if [[ -d "$SCRIPT_DIR/.github/lint-docs" ]]; then
    REPO_ROOT="$SCRIPT_DIR"
    print_success "Running from existing repo: $REPO_ROOT"
elif [[ -d "./.github/lint-docs" ]]; then
    REPO_ROOT="$(pwd)"
    print_success "Running from existing repo: $REPO_ROOT"
elif [[ -d "$DEFAULT_CLONE_DIR/.github/lint-docs" ]]; then
    REPO_ROOT="$DEFAULT_CLONE_DIR"
    print_success "Found existing repo: $REPO_ROOT"
else
    # Need to clone the repo
    print_status "Cloning $REPO_NAME..."
    
    if [[ -d "$DEFAULT_CLONE_DIR" ]]; then
        print_error "$DEFAULT_CLONE_DIR already exists but doesn't look like the right repo"
        exit 1
    fi
    
    # Check if git is available
    if ! command -v git &> /dev/null; then
        print_error "Git is required. Please install git first."
        exit 1
    fi
    
    # Clone the repo (SSH first; HTTPS fallback or DOCS_SETUP_HTTPS=1)
    if [[ "${DOCS_SETUP_HTTPS:-}" == "1" ]]; then
        print_status "Cloning via HTTPS (DOCS_SETUP_HTTPS=1)..."
        git clone "$REPO_URL_HTTPS" "$DEFAULT_CLONE_DIR"
    elif git clone "$REPO_URL_SSH" "$DEFAULT_CLONE_DIR"; then
        :
    else
        print_warning "SSH clone failed; trying HTTPS..."
        git clone "$REPO_URL_HTTPS" "$DEFAULT_CLONE_DIR"
    fi
    REPO_ROOT="$DEFAULT_CLONE_DIR"
    print_success "Cloned to: $REPO_ROOT"
fi

LINT_DIR="$REPO_ROOT/.github/lint-docs"

if [[ ! -d "$LINT_DIR" ]]; then
    print_error "Cannot find .github/lint-docs directory"
    print_error "Something went wrong with the repo"
    exit 1
fi

print_status "Repo root: $REPO_ROOT"
echo ""

# ============================================
# Check/Install Node.js
# ============================================
print_status "Checking Node.js..."

if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js installed: $NODE_VERSION"
    
    # Check if version is >= 18
    NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/v//' | cut -d. -f1)
    if [[ "$NODE_MAJOR" -lt 18 ]]; then
        print_warning "Node.js 18+ recommended. You have $NODE_VERSION"
    fi
else
    print_warning "Node.js not found"
    
    if [[ "$OS" == "macos" ]]; then
        if command -v brew &> /dev/null; then
            print_status "Installing Node.js via Homebrew..."
            brew install node
            print_success "Node.js installed"
        else
            print_error "Please install Node.js: https://nodejs.org/"
            exit 1
        fi
    else
        print_error "Please install Node.js 18+: https://nodejs.org/"
        exit 1
    fi
fi

# ============================================
# Check/Install pnpm (optional, npm works too)
# ============================================
print_status "Checking package manager..."

if command -v pnpm &> /dev/null; then
    print_success "pnpm installed: $(pnpm -v)"
    PKG_MANAGER="pnpm"
elif command -v npm &> /dev/null; then
    print_success "npm installed: $(npm -v)"
    PKG_MANAGER="npm"
else
    print_error "No package manager found"
    exit 1
fi

# ============================================
# Check/Install lychee (for 404 linter)
# ============================================
print_status "Checking lychee (link checker)..."

if command -v lychee &> /dev/null; then
    print_success "lychee installed: $(lychee --version)"
else
    print_warning "lychee not found (required for 404 linter)"
    
    if [[ "$OS" == "macos" ]]; then
        if command -v brew &> /dev/null; then
            print_status "Installing lychee via Homebrew..."
            brew install lychee
            print_success "lychee installed"
        else
            print_warning "Install manually: brew install lychee"
        fi
    elif [[ "$OS" == "linux" ]]; then
        print_warning "Install manually: https://github.com/lycheeverse/lychee#installation"
    fi
fi

# ============================================
# Install linter dependencies
# ============================================
echo ""
print_status "Installing linter dependencies..."

cd "$LINT_DIR"

if [[ "$PKG_MANAGER" == "pnpm" ]]; then
    pnpm install --silent
else
    npm install --silent
fi

print_success "Dependencies installed"

# ============================================
# Verify installation
# ============================================
echo ""
print_status "Verifying installation..."

# Test that tsx works
if npx tsx --version &> /dev/null; then
    print_success "tsx (TypeScript executor) working"
else
    print_error "tsx not working"
    exit 1
fi

# ============================================
# Summary
# ============================================
echo ""
echo "====================================="
echo "  Setup Complete!"
echo "====================================="
echo ""
echo "Repo location: $REPO_ROOT"
echo ""
echo "Available linters:"
echo "  • SEO Linter      - checks titles, meta, headings, images"
echo "  • 404 Linter      - checks for broken external links"
echo "  • Redirect Linter - checks for circular redirects"
echo ""
echo "Quick start:"
echo "  cd $REPO_ROOT"
echo "  ./lint-docs.sh seo content/path/to/file.txt"
echo "  ./lint-docs.sh 404 content/path/to/file.txt"
echo "  ./lint-docs.sh redirects content/atlas/netlify.toml"
echo ""
echo "To update linters later, run:"
echo "  $REPO_ROOT/setup-docs.sh"
echo ""
print_success "You're all set!"

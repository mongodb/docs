#!/usr/bin/env bash
# version-bump.sh
# Automates Steps 4, 5, 6, and 7 of the version-update skill:
#   Step 4  — snooty.toml version field updates
#   Step 5  — directory operations (rename/copy/delete)
#   Step 6  — .backportrc.json insertions
#   Step 7  — ToC version array TypeScript files
#
# Not handled here: netlify.toml (Step 8), release notes (Step 3),
# product-specific steps (Step 10).
#
# Run from anywhere in the repo. The script locates the repo root
# from its own path.
#
# Usage:
#   version-bump.sh --docset NAME --type TYPE --new-version VER [OPTIONS]
#
# Required:
#   --docset NAME        Content directory name under content/
#                        (e.g. csharp, node, entity-framework, mongosync)
#   --type TYPE          major | minor | patch
#   --new-version VER    The version being released (e.g. 3.9, 4.0, 1.21)
#
# Optional:
#   --old-version VER    Version currently in snooty.toml; auto-read if omitted
#   --dry-run            Print planned operations without modifying files
#   --repo-root DIR      Override repo root detection

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

DRY_RUN=false
DOCSET=""
RELEASE_TYPE=""
NEW_VERSION=""
OLD_VERSION=""

die() { echo "Error: $*" >&2; exit 1; }

while [[ $# -gt 0 ]]; do
    case "$1" in
        --docset)       DOCSET="$2";       shift 2 ;;
        --type)         RELEASE_TYPE="$2"; shift 2 ;;
        --new-version)  NEW_VERSION="$2";  shift 2 ;;
        --old-version)  OLD_VERSION="$2";  shift 2 ;;
        --dry-run)      DRY_RUN=true;      shift   ;;
        --repo-root)    REPO_ROOT="$2";    shift 2 ;;
        -h|--help)      grep '^#' "$0" | grep -v '^#!/' | sed 's/^# \{0,1\}//'; exit 0 ;;
        *)              die "Unknown option: $1" ;;
    esac
done

[[ -n "$DOCSET" ]]       || die "--docset is required"
[[ -n "$RELEASE_TYPE" ]] || die "--type is required (major|minor|patch)"
[[ -n "$NEW_VERSION" ]]  || die "--new-version is required"

CONTENT="$REPO_ROOT/content"
TOC_DIR="$REPO_ROOT/content/table-of-contents/version-arrays"

# ── Helpers ───────────────────────────────────────────────────────────────────

run() {
    if $DRY_RUN; then echo "  [dry-run] $*"; return; fi
    "$@"
}

# Literal string replacement via perl \Q...\E (no regex escaping needed in args).
# Warns to stderr if the pattern is not found (silent no-op would hide bugs).
sub_file() {
    local file="$1" old_str="$2" new_str="$3"
    if $DRY_RUN; then
        printf "  [dry-run] %s\n    - %s\n    + %s\n" "$file" "$old_str" "$new_str"
        return
    fi
    if ! grep -qF -- "$old_str" "$file"; then
        echo "  WARNING: pattern not found, no change made: $(basename "$file")" >&2
        printf "    '%s'\n" "$old_str" >&2
        return
    fi
    perl -pi -e "s/\Q${old_str}\E/${new_str}/g" "$file"
}

# Multi-line replacement (slurps whole file). old_str is a perl regex.
# Warns to stderr if no substitution was made.
sub_file_ml() {
    local file="$1" pattern="$2" replacement="$3"
    if $DRY_RUN; then
        printf "  [dry-run] %s (multi-line)\n    pattern: %s\n    replace: %s\n" \
            "$file" "$pattern" "$replacement"
        return
    fi
    local tmp
    tmp="$(mktemp)"
    perl -0pe "s/${pattern}/${replacement}/g" "$file" > "$tmp"
    if cmp -s "$file" "$tmp"; then
        echo "  WARNING: multi-line substitution matched nothing in $(basename "$file")" >&2
        printf "    pattern: %s\n" "$pattern" >&2
        rm "$tmp"
        return
    fi
    mv "$tmp" "$file"
}

# After copying <src>/ → <dest>/, rewrite snooty.toml constants in the new
# directory that hardcode the source directory inside a path or URL (e.g.
# csharp's `example` GitHub blob URL: .../content/csharp/upcoming/source/...).
# Step 4 updates the version number, but not these path-bearing constants, so
# the copy would otherwise leave the destination pointing back at the source
# tree. Pass the same directory names used in the adjacent copy so the helper
# makes no assumption about what those directories are called. No-op for
# docsets that define no such constant.
#
# The replacement value contains "/", so it is passed to perl as a variable
# ($n) rather than interpolated into the s/// literal — otherwise the slashes
# would terminate the substitution delimiters.
fix_copied_snooty_paths() {
    local src_dir="$1" dest_dir="$2"
    local snooty="$DOCSET_DIR/$dest_dir/snooty.toml"
    [[ -f "$snooty" ]] || return 0
    local old="content/$DOCSET/$src_dir/"
    local new="content/$DOCSET/$dest_dir/"
    grep -qF -- "$old" "$snooty" || return 0
    if $DRY_RUN; then
        printf "  [dry-run] rewrite %s/snooty.toml path constants: %s → %s\n" \
            "$dest_dir" "$old" "$new"
        return
    fi
    echo "  fix     $dest_dir/snooty.toml path constants: $src_dir/ → $dest_dir/"
    perl -pi -e 'BEGIN{$o=shift;$n=shift} s/\Q$o\E/$n/g' "$old" "$new" "$snooty"
}

# ── Docset model lookup ───────────────────────────────────────────────────────
#
# Models:
#   standard_major   upcoming/current/vX.x; major creates vX.x archive
#   per_minor        upcoming/current/vX.Y; every minor/major creates new archive
#   atlas_cli        per_minor but .backportrc.json source = upcoming only
#   mongosync        current only; minor copies current to vX.Y
#   mongocli         patch-only; no dir changes; updates both snooty.toml dirs
#   skip             dedicated workflow; not handled here

get_model() {
    case "$1" in
        csharp|golang|java|java-rs|kotlin|kotlin-sync|node|php-library|\
        pymongo-driver|ruby-driver|rust|scala-driver|cpp-driver|swift|\
        terraform|cloudformation|spark-connector)
            echo "standard_major" ;;
        kubernetes)
            echo "per_minor" ;;
        entity-framework|atlas-operator|kafka-connector)
            echo "per_minor" ;;
        atlas-cli)
            echo "atlas_cli" ;;
        mongosync)
            echo "mongosync" ;;
        mongocli)
            echo "mongocli" ;;
        manual|atlas-architecture)
            echo "skip" ;;
        *)
            echo "" ;;
    esac
}

# Known per-docset version field names; empty = auto-detect from snooty.toml
get_version_field_override() {
    case "$1" in
        atlas-cli)        echo "atlas-cli-version" ;;
        mongocli)         echo "mcli-version" ;;
        kafka-connector)  echo "connector_version" ;;
        spark-connector)  echo "current-version" ;;
        mongosync)        echo "version" ;;
        *)               echo "" ;;
    esac
}

# ToC version array file, relative to content/table-of-contents/version-arrays/
# Normalize a version string to the format used in archive directory names.
# Most docsets use the version as-is; atlas-cli uses major.minor only.
archive_dir_version() {
    local docset="$1" ver="$2"
    case "$docset" in
        atlas-cli|kubernetes) echo "${ver%.*}" ;;  # strip patch: "1.54.0"→"1.54", "1.8.0"→"1.8"
        *)         echo "$ver" ;;
    esac
}

get_toc_file() {
    case "$1" in
        csharp)        echo "drivers/csharp-versions.ts" ;;
        cpp-driver)    echo "drivers/cpp-versions.ts" ;;
        java)          echo "drivers/java-versions.ts" ;;
        java-rs)       echo "drivers/java-rs-versions.ts" ;;
        kotlin)        echo "drivers/kotlin-coroutine-versions.ts" ;;
        kotlin-sync)   echo "drivers/kotlin-sync-versions.ts" ;;
        node)          echo "drivers/node-versions.ts" ;;
        rust)          echo "drivers/rust-versions.ts" ;;
        scala-driver)  echo "drivers/scala-versions.ts" ;;
        kafka-connector) echo "cloud-docs/kafka-connector.ts" ;;
        mongosync)     echo "server-docs/mongosync.ts" ;;
        *)             echo "" ;;
    esac
}

# ── Resolve docset ────────────────────────────────────────────────────────────

DOCSET_MODEL="$(get_model "$DOCSET")"
[[ -n "$DOCSET_MODEL" ]] || die "Unknown docset '$DOCSET'. Add it to get_model() or use --help."
[[ "$DOCSET_MODEL" != "skip" ]] || \
    die "'$DOCSET' uses a dedicated workflow (see skill references). This script does not handle it."

DOCSET_DIR="$CONTENT/$DOCSET"
[[ -d "$DOCSET_DIR" ]] || die "Directory not found: $DOCSET_DIR"

# ── Read current version from snooty.toml ────────────────────────────────────

case "$DOCSET_MODEL" in
    mongosync) SNOOTY_SUBDIR="current"  ;;
    *)         SNOOTY_SUBDIR="upcoming" ;;
esac
SNOOTY="$DOCSET_DIR/$SNOOTY_SUBDIR/snooty.toml"
[[ -f "$SNOOTY" ]] || die "snooty.toml not found: $SNOOTY"

V_FIELD="$(get_version_field_override "$DOCSET")"
if [[ -z "$V_FIELD" ]]; then
    if   grep -qE '^version-number[[:space:]]*=' "$SNOOTY"; then V_FIELD="version-number"
    elif grep -qE '^version[[:space:]]*='        "$SNOOTY"; then V_FIELD="version"
    else die "Cannot detect version field in $SNOOTY. Add docset to get_version_field_override()."
    fi
fi

CURRENT_VER="$(grep -E "^${V_FIELD}[[:space:]]*=" "$SNOOTY" | head -1 | \
    sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
[[ -n "$CURRENT_VER" ]] || die "Could not read '$V_FIELD' from $SNOOTY"

# For per_minor/atlas_cli, OLD_VERSION = what's live in current/ (being archived).
# upcoming/ already has the new version; current/ has the old released version.
# For all other models, upcoming and current share the same version before bump.
if [[ -z "$OLD_VERSION" ]]; then
    case "$DOCSET_MODEL" in
        per_minor|atlas_cli)
            LIVE_SNOOTY="$DOCSET_DIR/current/snooty.toml"
            if [[ -f "$LIVE_SNOOTY" ]]; then
                OLD_VERSION="$(grep -E "^${V_FIELD}[[:space:]]*=" "$LIVE_SNOOTY" | head -1 | \
                    sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
            fi
            [[ -n "$OLD_VERSION" ]] || OLD_VERSION="$CURRENT_VER"
            ;;
        *)
            OLD_VERSION="$CURRENT_VER"
            ;;
    esac
fi

if [[ "$OLD_VERSION" == "$NEW_VERSION" ]]; then
    echo "Warning: old and new versions are both '$NEW_VERSION'." >&2
    echo "  Pass --old-version to specify the version being archived." >&2
fi

# MCK (kubernetes) stores versions as full semver X.Y.0 in snooty.toml.
# Normalize X.Y → X.Y.0 so field writes and archive dir naming are both correct.
if [[ "$DOCSET" == "kubernetes" ]]; then
    [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+$ ]] && NEW_VERSION="${NEW_VERSION}.0"
    [[ "$OLD_VERSION" =~ ^[0-9]+\.[0-9]+$ ]] && OLD_VERSION="${OLD_VERSION}.0"
fi

# ── Header ────────────────────────────────────────────────────────────────────

echo ""
echo "version-bump.sh"
echo "  docset:   $DOCSET  ($DOCSET_MODEL)"
echo "  type:     $RELEASE_TYPE"
echo "  version:  $OLD_VERSION  →  $NEW_VERSION"
$DRY_RUN && echo "  mode:     dry-run"
echo ""

# ── Step 4: snooty.toml ───────────────────────────────────────────────────────

echo "── Step 4: snooty.toml ──────────────────────────────────────────────────"

update_field() {
    local file="$1" field="$2" old_val="$3" new_val="$4"
    if ! grep -qE "^${field}[[:space:]]*=" "$file" 2>/dev/null; then
        echo "  skip: '$field' not found in $(basename "$(dirname "$file")")/snooty.toml"
        return
    fi
    echo "  $(basename "$(dirname "$file")")/snooty.toml  $field: \"$old_val\" → \"$new_val\""
    sub_file "$file" "${field} = \"${old_val}\"" "${field} = \"${new_val}\""
}

case "$DOCSET_MODEL" in
    mongosync)
        LATEST_FULL="$(grep -E '^latest-version[[:space:]]*=' "$SNOOTY" | head -1 | \
            sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
        if [[ "$RELEASE_TYPE" == "patch" ]]; then
            # Patch: only latest-version changes; minor fields are unchanged
            if [[ -n "$LATEST_FULL" ]]; then
                update_field "$SNOOTY" "latest-version" "$LATEST_FULL" "$NEW_VERSION"
            fi
        else
            PREV_VER="$(grep -E '^version-previous[[:space:]]*=' "$SNOOTY" | head -1 | \
                sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
            update_field "$SNOOTY" "version"          "$OLD_VERSION"  "$NEW_VERSION"
            update_field "$SNOOTY" "version-previous" "$PREV_VER"     "$OLD_VERSION"
            update_field "$SNOOTY" "version-dev"      "$OLD_VERSION"  "$NEW_VERSION"
            if [[ -n "$LATEST_FULL" ]]; then
                update_field "$SNOOTY" "latest-version" "$LATEST_FULL" "${NEW_VERSION}.0"
            fi
        fi
        ;;
    mongocli)
        for dir in upcoming current; do
            f="$DOCSET_DIR/$dir/snooty.toml"
            [[ -f "$f" ]] && update_field "$f" "$V_FIELD" "$OLD_VERSION" "$NEW_VERSION"
        done
        ;;
    per_minor|atlas_cli)
        if [[ "$RELEASE_TYPE" == "patch" ]]; then
            if [[ "$DOCSET" == "kafka-connector" ]]; then
                # Kafka patch: connector_patch_version lives in upcoming/
                [[ "$NEW_VERSION" == *.*.* ]] || \
                    die "kafka-connector patch releases require a full X.Y.Z version (e.g., 2.1.1), not '$NEW_VERSION'."
                PATCH_FIELD="connector_patch_version"
                OLD_PATCH="$(grep -E "^${PATCH_FIELD}[[:space:]]*=" "$SNOOTY" | head -1 | \
                    sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
                if [[ -n "$OLD_PATCH" ]]; then
                    update_field "$SNOOTY" "$PATCH_FIELD" "$OLD_PATCH" "${NEW_VERSION##*.}"
                fi
            else
                # EF / atlas-cli patch: current/ is the release dir.
                # upcoming/ is already pre-bumped to the next minor — do not touch it.
                CURRENT_SNOOTY="$DOCSET_DIR/current/snooty.toml"
                if [[ -f "$CURRENT_SNOOTY" ]]; then
                    update_field "$CURRENT_SNOOTY" "$V_FIELD" "$OLD_VERSION" "$NEW_VERSION"
                else
                    echo "  current/snooty.toml not found — skipping"
                fi
                if [[ "$DOCSET" == "entity-framework" ]]; then
                    echo "  NOTE: verify full-version in current/snooty.toml matches new patch"
                fi
            fi
        else
            # Minor/major: upcoming/ is the active working directory.
            # CURRENT_VER (from upcoming/) may already equal NEW_VERSION if pre-bumped.
            if [[ "$CURRENT_VER" == "$NEW_VERSION" ]]; then
                echo "  upcoming/snooty.toml $V_FIELD already at \"$NEW_VERSION\" — no change"
            else
                update_field "$SNOOTY" "$V_FIELD" "$CURRENT_VER" "$NEW_VERSION"
            fi
            if [[ "$DOCSET" == "kafka-connector" ]]; then
                PATCH_FIELD="connector_patch_version"
                OLD_PATCH="$(grep -E "^${PATCH_FIELD}[[:space:]]*=" "$SNOOTY" | head -1 | \
                    sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
                if [[ -n "$OLD_PATCH" ]]; then
                    update_field "$SNOOTY" "$PATCH_FIELD" "$OLD_PATCH" "0"
                fi
            fi
            if [[ "$DOCSET" == "kubernetes" ]]; then
                DL_OLD="$(grep -E '^dl-version[[:space:]]*=' "$SNOOTY" | head -1 | \
                    sed "s/.*=[[:space:]]*['\"]//; s/['\"].*//")"
                [[ -n "$DL_OLD" ]] && update_field "$SNOOTY" "dl-version" "$DL_OLD" "$NEW_VERSION"
            fi
        fi
        ;;
    *)
        update_field "$SNOOTY" "$V_FIELD" "$OLD_VERSION" "$NEW_VERSION"
        ;;
esac

echo ""

# ── Step 5: Directory operations ──────────────────────────────────────────────

echo "── Step 5: Directory operations ─────────────────────────────────────────"

if [[ "$RELEASE_TYPE" == "patch" || "$DOCSET_MODEL" == "mongocli" ]]; then
    echo "  (no directory changes)"
else
    case "$DOCSET_MODEL" in
        standard_major)
            if [[ "$RELEASE_TYPE" == "major" ]]; then
                OLD_MAJ="${OLD_VERSION%%.*}"
                ARCHIVE="$DOCSET_DIR/v${OLD_MAJ}.x"
                [[ -d "$ARCHIVE" ]] && die "Archive already exists: $ARCHIVE"
                echo "  rename  current/  →  v${OLD_MAJ}.x/"
                run mv "$DOCSET_DIR/current" "$ARCHIVE"
            else
                echo "  delete  current/"
                run rm -rf "$DOCSET_DIR/current"
            fi
            echo "  copy    upcoming/  →  current/"
            run cp -rP "$DOCSET_DIR/upcoming" "$DOCSET_DIR/current"
            fix_copied_snooty_paths upcoming current
            ;;
        per_minor|atlas_cli)
            ARCHIVE_VER="$(archive_dir_version "$DOCSET" "$OLD_VERSION")"
            ARCHIVE="$DOCSET_DIR/v${ARCHIVE_VER}"
            [[ -d "$ARCHIVE" ]] && die "Archive already exists: $ARCHIVE"
            echo "  rename  current/  →  v${ARCHIVE_VER}/"
            run mv "$DOCSET_DIR/current" "$ARCHIVE"
            echo "  copy    upcoming/  →  current/"
            run cp -rP "$DOCSET_DIR/upcoming" "$DOCSET_DIR/current"
            fix_copied_snooty_paths upcoming current
            ;;
        mongosync)
            ARCHIVE="$DOCSET_DIR/v${OLD_VERSION}"
            [[ -d "$ARCHIVE" ]] && die "Archive already exists: $ARCHIVE"
            echo "  copy    current/  →  v${OLD_VERSION}/"
            run cp -rP "$DOCSET_DIR/current" "$ARCHIVE"
            echo "  (current/ remains as working directory)"
            ;;
    esac
fi

echo ""

# ── Step 6: .backportrc.json ──────────────────────────────────────────────────

echo "── Step 6: .backportrc.json ─────────────────────────────────────────────"

BACKPORTRC="$DOCSET_DIR/.backportrc.json"

if [[ "$RELEASE_TYPE" == "patch" ]]; then
    echo "  (patch release — no changes)"
elif [[ ! -f "$BACKPORTRC" ]]; then
    echo "  (not found — skipping)"
else
    command -v jq >/dev/null 2>&1 || die "jq is required. Install it and re-run."
    TMP="$(mktemp)"

    case "$DOCSET_MODEL" in
        standard_major)
            if [[ "$RELEASE_TYPE" == "major" ]]; then
                OLD_MAJ="${OLD_VERSION%%.*}"
                NEW_DIR="content/$DOCSET/v${OLD_MAJ}.x"
                echo "  prepend $NEW_DIR to source and target choices"
                if ! $DRY_RUN; then
                    jq --arg d "$NEW_DIR" '
                        .sourceDirectoryChoices |= [$d] + . |
                        .targetDirectoryChoices |= [$d] + .
                    ' "$BACKPORTRC" > "$TMP" && mv "$TMP" "$BACKPORTRC"
                fi
            else
                echo "  (minor release — no changes)"
            fi
            ;;
        per_minor)
            # upcoming and current are always the first two entries;
            # the old current (now archived as vX.Y) goes at index 2
            ARCHIVE_VER="$(archive_dir_version "$DOCSET" "$OLD_VERSION")"
            OLD_DIR="content/$DOCSET/v${ARCHIVE_VER}"
            if [[ "$DOCSET" == "kubernetes" ]]; then
                echo "  insert $OLD_DIR at index 2 of targetDirectoryChoices (sourceDirectoryChoices unchanged)"
                if ! $DRY_RUN; then
                    jq --arg d "$OLD_DIR" '
                        .targetDirectoryChoices |= [.[0], .[1], $d] + .[2:]
                    ' "$BACKPORTRC" > "$TMP" && mv "$TMP" "$BACKPORTRC"
                fi
            else
                echo "  insert $OLD_DIR at index 2 of source and target choices"
                if ! $DRY_RUN; then
                    jq --arg d "$OLD_DIR" '
                        .sourceDirectoryChoices |= [.[0], .[1], $d] + .[2:] |
                        .targetDirectoryChoices |= [.[0], .[1], $d] + .[2:]
                    ' "$BACKPORTRC" > "$TMP" && mv "$TMP" "$BACKPORTRC"
                fi
            fi
            ;;
        atlas_cli)
            # Source stays as [upcoming] only.
            # Archived old current goes at index 1 of target (after current).
            ARCHIVE_VER="$(archive_dir_version "$DOCSET" "$OLD_VERSION")"
            OLD_DIR="content/$DOCSET/v${ARCHIVE_VER}"
            echo "  insert $OLD_DIR at index 1 of targetDirectoryChoices"
            if ! $DRY_RUN; then
                jq --arg d "$OLD_DIR" '
                    .targetDirectoryChoices |= [.[0], $d] + .[1:]
                ' "$BACKPORTRC" > "$TMP" && mv "$TMP" "$BACKPORTRC"
            fi
            ;;
        mongosync)
            # source: current first, then archives newest-first
            # target: archives oldest-first, then current last
            OLD_DIR="content/$DOCSET/v${OLD_VERSION}"
            echo "  insert $OLD_DIR at index 1 of source, before last entry of target"
            if ! $DRY_RUN; then
                jq --arg d "$OLD_DIR" '
                    .sourceDirectoryChoices |= [.[0], $d] + .[1:] |
                    .targetDirectoryChoices |= (.[:-1] + [$d] + .[-1:])
                ' "$BACKPORTRC" > "$TMP" && mv "$TMP" "$BACKPORTRC"
            fi
            ;;
    esac
    rm -f "$TMP"
fi

echo ""

# ── Step 7: ToC version array ─────────────────────────────────────────────────

echo "── Step 7: ToC version array ────────────────────────────────────────────"

TOC_FILE="$(get_toc_file "$DOCSET")"

if [[ "$RELEASE_TYPE" == "patch" ]]; then
    echo "  (patch release — no changes)"
elif [[ -z "$TOC_FILE" ]]; then
    echo "  (no version array file for $DOCSET)"
else
    TOC_PATH="$TOC_DIR/$TOC_FILE"
    if [[ ! -f "$TOC_PATH" ]]; then
        echo "  (file not found: $TOC_PATH — skipping)"
    else
        case "$DOCSET_MODEL" in
            standard_major)
                if [[ "$RELEASE_TYPE" == "major" ]]; then
                    OLD_ALIAS="v${OLD_VERSION%%.*}.x"
                    NEW_ALIAS="v${NEW_VERSION%%.*}.x"
                    echo "  $TOC_PATH"
                    echo "    allVersions: insert '$NEW_ALIAS' before 'upcoming'"
                    echo "    namedVersions: '$OLD_ALIAS' → '$NEW_ALIAS'"
                    # allVersions is single-line; 'upcoming' is always the last element
                    sub_file "$TOC_PATH" "'upcoming'" "'${NEW_ALIAS}', 'upcoming'"
                    # namedVersions uses double-bracket form: [['vX.x', 'current']]
                    sub_file "$TOC_PATH" \
                        "[['${OLD_ALIAS}', 'current']]" \
                        "[['${NEW_ALIAS}', 'current']]"
                else
                    echo "  (minor release — no changes)"
                fi
                ;;
            mongosync)
                # allVersions is multi-line; append new version after last entry
                echo "  $TOC_PATH"
                echo "    allVersions: append 'v${NEW_VERSION}'"
                echo "    namedVersions: 'v${OLD_VERSION}' → 'v${NEW_VERSION}'"
                sub_file_ml "$TOC_PATH" \
                    "('v${OLD_VERSION}',\n)(\s*\])" \
                    "\$1  'v${NEW_VERSION}',\n\$2"
                sub_file "$TOC_PATH" \
                    "[['v${OLD_VERSION}', 'current']]" \
                    "[['v${NEW_VERSION}', 'current']]"
                ;;
            per_minor)
                if [[ "$DOCSET" == "kafka-connector" ]]; then
                    # Pre-flight: ToC must have OLD_VERSION as current before substituting.
                    # If it doesn't, the ToC is out of sync with the repo.
                    if ! grep -qF "['v${OLD_VERSION}', 'current']" "$TOC_PATH"; then
                        echo "  ERROR: kafka-connector.ts namedVersions does not list 'v${OLD_VERSION}' as current." >&2
                        echo "  The ToC is out of sync — correct $TOC_PATH before re-running." >&2
                        $DRY_RUN || exit 1
                    else
                        IFS='.' read -r KF_MAJ KF_MIN <<< "$NEW_VERSION"
                        NEXT_VER="${KF_MAJ}.$((KF_MIN + 1))"
                        echo "  $TOC_PATH"
                        echo "    allVersions: append 'v${NEW_VERSION}' after 'v${OLD_VERSION}'"
                        echo "    namedVersions: current 'v${NEW_VERSION}', upcoming 'v${NEXT_VER}'"
                        # allVersions single-line: ends with 'vX.Y'] — insert before ]
                        sub_file "$TOC_PATH" \
                            "'v${OLD_VERSION}']" \
                            "'v${OLD_VERSION}', 'v${NEW_VERSION}']"
                        sub_file "$TOC_PATH" \
                            "['v${OLD_VERSION}', 'current']" \
                            "['v${NEW_VERSION}', 'current']"
                        # Old 'upcoming' was NEW_VERSION (planned); update to NEXT_VER
                        sub_file "$TOC_PATH" \
                            "['v${NEW_VERSION}', 'upcoming']" \
                            "['v${NEXT_VER}', 'upcoming']"
                    fi
                else
                    echo "  (no version array file for $DOCSET $RELEASE_TYPE)"
                fi
                ;;
        esac
    fi
fi

echo ""
echo "── Done ─────────────────────────────────────────────────────────────────"
if $DRY_RUN; then
    echo "Dry-run complete. Re-run without --dry-run to apply."
else
    echo "Changes applied. Review with: git diff"
    echo ""
    echo "Remaining steps for Claude:"
    echo "  Step 3   release notes"
    echo "  Step 8   netlify.toml"
    echo "  Step 10  product-specific steps"
fi
echo ""

#!/usr/bin/env bash

# sync the ignorefiles

set -euo pipefail

readonly SCRIPT_PATH=$(dirname $(realpath ${0}))
cd $SCRIPT_PATH/../

cat .gitignore &> .prettierignore
prettier --write .
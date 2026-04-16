#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./android-env.sh
source "${SCRIPT_DIR}/android-env.sh"

exec npx react-native start --reset-cache --port 8081 "$@"

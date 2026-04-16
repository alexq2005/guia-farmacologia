#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./android-env.sh
source "${SCRIPT_DIR}/android-env.sh"

exec npx react-native run-android --mode freeDebug --active-arch-only --port 8081 "$@"

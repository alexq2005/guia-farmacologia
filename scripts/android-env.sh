#!/usr/bin/env bash
set -euo pipefail

# Configura Java/Android SDK para este proyecto en Git Bash (Windows).
if [[ -z "${JAVA_HOME:-}" ]]; then
  if [[ -d "/c/Program Files/Android/Android Studio/jbr" ]]; then
    export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
  elif [[ -d "/c/Program Files/Android/Android Studio/jre" ]]; then
    export JAVA_HOME="/c/Program Files/Android/Android Studio/jre"
  fi
fi

if [[ -z "${ANDROID_HOME:-}" ]]; then
  if [[ -d "/c/Users/${USERNAME}/AppData/Local/Android/Sdk" ]]; then
    export ANDROID_HOME="/c/Users/${USERNAME}/AppData/Local/Android/Sdk"
  elif [[ -d "/c/Users/${USER}/AppData/Local/Android/Sdk" ]]; then
    export ANDROID_HOME="/c/Users/${USER}/AppData/Local/Android/Sdk"
  fi
fi

if [[ -n "${JAVA_HOME:-}" ]]; then
  export PATH="${JAVA_HOME}/bin:${PATH}"
fi

if [[ -n "${ANDROID_HOME:-}" ]]; then
  export PATH="${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${PATH}"
fi

export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED -XX:HeapBaseMinAddress=0x200000000"

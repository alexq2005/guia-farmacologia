#!/bin/bash
# Build script for Guía Farmacológica APK
# Required because Java 25 restricts native access methods used by CMake

export JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED"
cd android && ./gradlew assembleRelease "$@"
echo ""
echo "APK location: android/app/build/outputs/apk/release/app-release.apk"

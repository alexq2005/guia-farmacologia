# ============================================================
# Guía Farmacológica de Enfermería — ProGuard Rules
# ============================================================

# React Native Core
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Hermes Engine
-keep class com.facebook.hermes.unicode.** { *; }
-dontwarn com.facebook.hermes.**

# React Native internals
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.proguard.annotations.KeepGettersAndSetters *;
}
-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

# Fbjni
-keep class com.facebook.jni.** { *; }

# SoLoader
-keep class com.facebook.soloader.** { *; }
-dontwarn com.facebook.soloader.**

# AndroidX
-keep class androidx.** { *; }
-keep interface androidx.** { *; }
-dontwarn androidx.**

# React Navigation
-keep class com.swmansion.** { *; }
-dontwarn com.swmansion.**
-keep class com.th3rdwave.safeareacontext.** { *; }

# AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Clipboard
-keep class com.reactnativecommunity.clipboard.** { *; }

# SVG
-keep class com.horcrux.svg.** { *; }

# App-specific classes
-keep class com.guiafarmacologica.** { *; }

# Preserve line numbers for crash reporting
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Suppress warnings for common third-party libraries
-dontwarn org.bouncycastle.**
-dontwarn org.conscrypt.**
-dontwarn org.openjsse.**
-dontwarn java.beans.**
-dontwarn javax.annotation.**
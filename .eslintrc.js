module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Demoted from error → warn:
    //
    // unused-vars and exhaustive-deps are code-smell signals, not bugs.
    // Blocking CI on them creates pressure to write `// eslint-disable-next-line`
    // or `_unused` prefixes everywhere, which is worse than leaving them
    // as visible warnings to clean up over time.
    //
    // exhaustive-deps in particular is often intentional (e.g. effects that
    // should run only on mount with `[]`). Treating it as error pushes devs
    // to add deps blindly, introducing bugs.
    //
    // The hard rules of React (rules-of-hooks, no-undef, etc.) remain errors.
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

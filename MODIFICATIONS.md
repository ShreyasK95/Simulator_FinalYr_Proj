# Modifications in this upload copy

Prepared on 2026-11-19 from the merged Simulator project for a source-only public repository. This is an independent modified copy of the open-source KIPR Simulator, not an official KIPR release.

## Known project and packaging changes

- The About Us page was removed in this earlier-feature-set copy. Some Classroom plugin source remains; this repository does not claim a complete implementation of newer Classroom or Limited Challenges features.
- The Firebase project configuration values were cleared from `config.js` and `src/firebase/config.ts` to avoid using the inherited Firebase project in this repository copy. Firebase integration code remains, and Firebase-dependent features require an operator-controlled project and service account to work. This precaution does not guarantee protection from lawsuits or settle other legal and licensing questions.
- Vendored dependency sources are included as ordinary directories at the paths expected by the build scripts. Nested Git metadata and submodule pointers were omitted; the original license and notice files were retained where available.
- Root Git history, package caches, `dist/`, and generated compiler/build outputs were excluded. Run the documented dependency build to create the outputs required for a local build.
- The root README, dependency README, credits, and ignore files were prepared for this source-only distribution.

This list records the known changes made for this upload copy. It is not a per-file diff against the upstream repository; the merged source may already contain earlier project-specific changes. See the root `LICENSE` and dependency-specific notices for license terms.

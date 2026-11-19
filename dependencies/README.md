# Vendored dependencies

This directory keeps dependency source inside the Simulator repository so a clone can be browsed and built without initializing Git submodules. The upstream source layout is retained because the build scripts expect these paths. Nested Git metadata and generated build products were removed; the source files and available license and notice files were retained.

## Source map

| Directory | Upstream project | License reference |
|---|---|---|
| `cpython/` | [python/cpython](https://github.com/python/cpython) | `cpython/LICENSE` and source notices |
| `cpython_patches/` | Simulator build patches for CPython | Review the patch headers and CPython notices |
| `emsdk/` | [emscripten-core/emsdk](https://github.com/emscripten-core/emsdk) | `emsdk/LICENSE` |
| `kipr-scratch/` | [kipr/kipr-scratch](https://github.com/kipr/kipr-scratch) | `kipr-scratch/LICENSE` |
| `kipr-scratch/scratch-blocks/` | [Scratch Foundation Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) | `scratch-blocks/LICENSE` (Apache-2.0) |
| `libwallaby/` | [kipr/libwallaby](https://github.com/kipr/libwallaby) | `libwallaby/LICENSE` |

`kipr-scratch/` also contains its own `libwallaby/` source directory. Both copies are kept at their expected locations. The vendored Scratch Blocks package declares Apache-2.0 in its package metadata; its full license text is included at `kipr-scratch/scratch-blocks/LICENSE`. Each upstream project retains its own license and attribution notices where provided. This source map is informational and does not replace those license files or source headers.

Note that `kipr-scratch/LICENSE` is GNU AGPL version 3, while the repository root `LICENSE` is GNU GPL version 3. Keep both notices with the source and review the component licenses when distributing or hosting a combined application.

## Build the generated dependencies

Run from the repository root after installing the prerequisites listed in the root [README](../README.md):

```bash
yarn run build-deps
```

The script installs and activates Emscripten 3.1.19, builds the WebAssembly versions of CPython and libwallaby, generates documentation data, builds and packages kipr-scratch, and writes `dependencies.json` plus generated runtime files such as `scratch-rt.js`. It downloads toolchain components and may take substantial time, network access, and disk space.

Generated compiler installations, build directories, `dependencies.json`, and `scratch-rt.js` are omitted from this upload copy. The build creates or populates directories such as `emsdk/upstream/`, `emsdk/node/`, `cpython/builddir/`, `libkipr_build_c/`, `libkipr_build_python/`, `libkipr_install_c/`, and `kipr-scratch/libwallaby-build/`, and regenerates the JSON and runtime files. These outputs are not required in a fresh clone before running the build.

Do not run `git submodule update`; the dependency source is already included as ordinary folders. Preserve the upstream license and notice files when making or sharing changes.

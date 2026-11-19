# SVU Simulator (independent replication)

An educational, browser-based robotics simulator based on the open-source [KIPR Simulator](https://github.com/kipr/Simulator). This repository is an independent replication and packaging of an earlier Simulator feature set. It is not an official KIPR release and is not endorsed by KIPR.

The independent replication and repository packaging in this copy were led by **Shreyas Konidala**. See [CREDITS.md](CREDITS.md) for attribution and acknowledgment details.

The project is associated with Somaiya Vidyavihar University's Project USHA and was described in the accepted paper *Design of SVU Simulator for Robotics Learning in School Education*. See [CREDITS.md](CREDITS.md) for acknowledgments, attribution, and the paper citation.

This is a modified source copy prepared for public sharing. Known changes and the preparation date are recorded in [MODIFICATIONS.md](MODIFICATIONS.md).

## What is included

- A 3D robotics simulator and browser-based programming environment
- Source for the simulator, frontend, backend, and programming tools
- Vendored dependency source in `dependencies/`, kept as ordinary folders
- Runtime assets, textures, and icons
- Docker build and run instructions

This copy targets an earlier feature set. The About Us page was removed. Some Classroom plugin source remains, but this repository does not claim to provide a complete implementation of newer Classroom or Limited Challenges features.

## Quick start with Docker

The root Dockerfile installs the build tools, compiles the simulator dependencies, builds the application, and starts the server. The first build downloads and compiles toolchains; allow substantial time, network access, and disk space.

Requirements: Docker Engine or Docker Desktop with Linux containers enabled.

Clone the repository with Git LFS so large tracked assets are downloaded:

```bash
git lfs install
git clone https://github.com/ShreyasK95/Simulator_FinalYr_Proj.git
cd <repository-folder>
git lfs pull
```

Build and run:

```bash
docker build -t svu-simulator:local .
docker run --rm -p 3000:3000 svu-simulator:local
```

Open [http://localhost:3000](http://localhost:3000). Stop the server with Ctrl+C.

## Container architecture

The root [Dockerfile](Dockerfile) defines a Linux build and runtime image. It installs Node.js 18, Yarn, and native build tools; runs the dependency build; builds translations and the frontend bundle; then starts the Express server on port 3000.

- **Frontend and simulator:** React and TypeScript source is under `src/`; runtime images and models are under `static/`, `textures/`, and `icons/`.
- **Server:** `express.js` serves the built application and API routes.
- **Compiled programming dependencies:** `yarn run build-deps` uses the vendored sources in `dependencies/` to generate WebAssembly and related build outputs. See [dependencies/README.md](dependencies/README.md).
- **Configuration:** `config.js` reads server settings from environment variables. Production mode requires a Firebase service-account key; keep it outside the repository.

The Dockerfile provides a containerized build recipe, which can improve environment consistency. It does not pin every base package and tool version, so it does not guarantee byte-for-byte reproducible builds. Confirm a successful image build and application launch in each target environment before describing cross-system validation on a resume.

## Build locally on Ubuntu

The root Dockerfile is the reference for the build environment. For a local build, use Ubuntu 20.04 or a compatible Ubuntu environment. On Windows, use Docker Desktop or Ubuntu under WSL2.

Install Git, Git LFS, Node.js 18, Yarn, Python 3.7 or newer, CMake, Make, SWIG 4 or newer, Doxygen, a C/C++ build toolchain, Java 11 or newer, and `patch`. On Ubuntu, the Dockerfile's system packages can be installed with:

```bash
sudo apt-get update
sudo apt-get install -y git git-lfs wget cmake make build-essential python3 python3-distutils swig zlib1g-dev doxygen default-jre pkg-config patch
```

Install Node.js 18 and Yarn separately. The dependency build downloads Emscripten and compiles CPython and libwallaby for WebAssembly.

After cloning and pulling Git LFS files as above, run these commands from the repository root:

```bash
yarn run build-deps
yarn install --cache-folder ./.yarncache
yarn run build-i18n
NODE_OPTIONS=--openssl-legacy-provider yarn build
node express.js
```

Open [http://localhost:3000](http://localhost:3000). The dependency step creates generated files under `dependencies/`; these are intentionally excluded from the source repository and can take time and disk space to produce.

## Configuration

Local development runs without a Firebase service-account key. Production mode requires a service account supplied through `FIREBASE_SERVICE_ACCOUNT_KEY_STRING` or `FIREBASE_SERVICE_ACCOUNT_KEY_FILE`. Keep service-account files and secret values out of Git.

Firebase project configuration values have been cleared from this public-preparation copy so it does not use the previous project's Firebase configuration. Firebase-dependent features, including sign-in and features that require authenticated database access, will not work until an operator configures a Firebase project and service account they control. The Firebase code remains in the source; this change removes the inherited project configuration, not the integration code. Google Classroom configuration is separate and has not been removed. No Firebase service-account private key is included. Never commit service-account keys, OAuth client secrets, or `.env` files.

This configuration change records a precaution taken by the repository owner. It does not guarantee protection from lawsuits or resolve licensing, attribution, privacy, or asset-redistribution questions; review those separately before publication.

> **Release precaution:** I have taken steps to remove the inherited Firebase project configuration and avoid publishing credentials under my control. This review may not identify every issue. If you notice exposed information or a rights or policy concern, please let me know so I can review and address it. This statement describes my precautions; it does not replace applicable rules or legal obligations.

## License

The main project source is distributed under the **GNU General Public License v3.0 (GPL-3.0)**. See the root [`LICENSE`](LICENSE) file for the full terms. Vendored dependencies and other assets may have separate license terms; retain and review their license and notice files in `dependencies/` and elsewhere before redistributing them.

## Documentation guide

For the quickest path through the project documentation, read:

1. `README.md` - project scope, setup, and run instructions.
2. `MODIFICATIONS.md` - known changes in this upload copy and its preparation date.
3. `dependencies/README.md` - vendored source map and generated dependency build.
4. `CREDITS.md` - acknowledgments, paper citation, and third-party attribution.
5. `LICENSE` and the license or notice files in `dependencies/` - reuse and redistribution terms.
6. [`docs/project-evidence/README.md`](docs/project-evidence/README.md) - simulator screenshot, workflow illustration, festival poster, and achievement certificate, with context on what each item does and does not verify.

## Repository layout

```text
.
├── dependencies/       # Vendored dependency source and its README
├── docs/
│   └── project-evidence/ # Selected project images and presentation material
├── MODIFICATIONS.md    # Known changes and preparation date
├── src/                # Frontend, simulator, backend, and application state
├── static/             # Runtime assets and object binaries
├── textures/           # Simulator textures
├── icons/              # Project and interface images
├── test/               # Tests
├── Dockerfile          # Main container build
├── CREDITS.md          # Acknowledgments and third-party attribution
└── README.md           # Project overview and setup guide
```

See [dependencies/README.md](dependencies/README.md) for the vendored source map and dependency build outputs. Preserve each included license and notice when redistributing; see [CREDITS.md](CREDITS.md) and the license files in the repository.

## License and attribution

This project is based on the KIPR Simulator and contains third-party source. The root `LICENSE` contains the GNU GPL version 3 text. `dependencies/kipr-scratch/LICENSE` is GNU AGPL version 3 and is a separate dependency license. Preserve all notices and review each component's license before modifying or distributing a combined application; the root GPL text does not replace a dependency's own terms. Acknowledgments are in [CREDITS.md](CREDITS.md), and this copy's known changes are in [MODIFICATIONS.md](MODIFICATIONS.md).

# BOS Gateway Template

This repository contains a clean, light-weight gateawy for the [Blockchain Operating System](https://near.org/blog/near-announces-the-blockchain-operating-system) (BOS). It serves as a great starting point for launching a customized BOS gateway. Contributions are most welcome!

## Setup & Development

1. Initialize repo:

    ```bash
    pnpm i
    ```

2. Add .env file:

    ```bash
    cp .env.example .env
    ```

3. The entry component is ```BosMain``` and it's located at ```/src/components/index.tsx```

    It loads the ```ciocan.near/widget/hello-world``` BOS component. The source can be found [here](https://near.org/near/widget/ComponentDetailsPage?src=ciocan.near/widget/hello-world&tab=source).

4. Edit ```web3.js``` and change the projectId and dappUrl for WalletConnect
(dappUrl is required by WalletConnect to work with the MetaMask on mobile)

Start development version:

```bash
pnpm dev:next
```

## Deployment

This is a [Next.js](https://github.com/vercel/next.js/) app and a fork of [NEAR Discovery](https://github.com/near/near-discovery) gateway app.

For static exports just run ```next build``` and upload the build files to your hosting provider. More info [here](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

For Vercel, Cloudflare or others that supports a Next app just connect the repo and follow the deploy steps from the dashboards.

More info on Next.js deployments [here](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

## Running with docker

```bash
docker build -t bos-gateway-template .
docker run -p 3000:3000 bos-gateway-template
```

## Building the native apps

We use [Tauri](https://tauri.app/) to build the native apps.

### Prerequisites

The first step is to install Rust and system dependencies.
More info here [here](https://tauri.app/v1/guides/getting-started/prerequisites).

### Building

Edit the ```src-tauri/tauri.conf.json``` file and change:

- ```productName``` from ```BOS Gateway Template``` to your gateway name.
- ```identifier``` from ```com.bos-gateway-template``` to your gateway identifier.
- ```icon``` array to your gateway icons.
- ```windows.title``` from ```BOS Gateway Template``` to your gateway name.


For the macOS app you need to have a valid Apple Developer account and a valid certificate.
Set these env variables to configure the build:

```bash
export APPLE_ID=your-apple-id
export APPLE_PASSWORD=your-apple-password
export APPLE_CERTIFICATE=your-apple-certificate
export APPLE_CERTIFICATE_PASSWORD=your-apple-certificate-password
export APPLE_DEVELOPER_TEAM_NAME=your-apple-developer-team-name
export APPLE_SIGNING_IDENTITY=your-apple-developer-code-sign-identity
```

More info here about the Apple code signing: [here](https://tauri.app/v1/guides/distribution/sign-macos).

Optionally if you want to use the Tauri updater you need to set the ```TAURI_PRIVATE_KEY``` and ```TAURI_KEY_PASSWORD``` env variable. More info here: [here](https://tauri.app/v1/guides/distribution/updater).


Then run:

```bash
pnpm build
```

The native app will be located in ```src-tauri/target/release/bundle```.

Note: Tauri relies heavily on native libraries and toolchains, so meaningful cross-compilation is not possible at the current moment. The next best option is to compile utilizing a CI/CD pipeline
More info [here](https://tauri.app/v1/guides/building/cross-platform).

To distribute the native app you need Code Signing for specific platforms.
More info [here](https://tauri.app/v1/guides/distribution/sign-macos).

### Publish the release files

Run this action to publish the release files to GitHub:
[```.github/workflows/publish.yml```](https://github.com/NearDeFi/bos-gateway-template/blob/main/.github/workflows/publish.yml)

### Additional notes

You may add a URL parameter on the end in order to utilize [`bos-loader`](https://github.com/near/bos-loader) for development. There are two ways to do this:

1. `http://localhost:3000/?bosLoaderUrl=http://127.0.0.1:3030` — to be explicit
2. `http://localhost:3000/?local` — to use the default (http://127.0.0.1:3030)

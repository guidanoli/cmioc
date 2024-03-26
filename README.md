# Cartesi Machine Input/Output Codec

In the upcoming v2 release of the Cartesi Rollups SDK, inputs and outputs will be encoded as Solidity function calldata.
This repo aims to show front-end developers how inputs and outputs can be encoded or decoded using [`viem`](https://viem.sh/) and the contract ABIs exported by [`@cartesi/rollups`](https://www.npmjs.com/package/@cartesi/rollups).
It also comes with a handy-dandy CLI tool for encoding and decoding of inputs and outputs.

## Dependencies

- `pnpm`

## Setup

First, you'll need to install the Node dependencies.

```sh
pnpm i
```

## CLI

Locally, you can run them with the following commands.
If you install this package globally, you can omit the `pnpm` part.

## Decoding inputs

```sh
pnpm cmioc decode input <INPUT_BLOB>
```

## Decoding outputs

```sh
pnpm cmioc decode output <OUTPUT_BLOB>
```

## Tests

You can run the tests with the following command

```sh
pnpm test
```

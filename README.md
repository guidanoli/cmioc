# Decoding inputs and outputs

On the upcoming Cartesi Rollups SDK v2 release, inputs and outputs will be encoded as Solidity function calldata.
The node will, through the GraphQL server, provide them in encoded form, which means someone has to decode them.

## Dependencies

- `pnpm`

## Setup

First, you'll need to install the Node dependencies.

```sh
pnpm i
```

## CLI

This package comes with a CLI tool called `cmioc`, which stands for "Cartesi Machine Input/Output Codec".
Locally, you can run them with the following commands:

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

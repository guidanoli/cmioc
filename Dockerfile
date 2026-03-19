# syntax=docker.io/docker/dockerfile:1

ARG FOUNDRY_VERSION=1.4.3

#### base stage
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

#### prepare foundry
FROM base AS foundry
ARG FOUNDRY_VERSION
ARG TARGETARCH
ARG TARGETOS
ARG DEBIAN_FRONTEND=noninteractive
SHELL ["/usr/bin/env", "bash", "-euo", "pipefail", "-c"]
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl
curl -fsSL https://github.com/foundry-rs/foundry/releases/download/v${FOUNDRY_VERSION}/foundry_v${FOUNDRY_VERSION}_${TARGETOS}_${TARGETARCH}.tar.gz \
  -o /tmp/foundry.tar.gz
case "${TARGETARCH}" in
    amd64) echo "325ba04dc5cb41c110723b00ac291f8269f8cd785028299aad8252ef980961a7 /tmp/foundry.tar.gz" | sha256sum --check ;;
    arm64) echo "209492cb4ebd723d9eac002fa30f41f53c8810105b67d3c32fe8201cf70f89d4 /tmp/foundry.tar.gz" | sha256sum --check ;;
    *) echo "unsupported architecture: ${TARGETARCH}"; exit 1 ;;
esac
tar -zx -f /tmp/foundry.tar.gz -C /usr/local/bin
EOF

#### install production dependencies
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

#### build project
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY --from=foundry /usr/local/bin/forge   /usr/local/bin/
COPY --from=foundry /usr/local/bin/cast    /usr/local/bin/
COPY --from=foundry /usr/local/bin/anvil   /usr/local/bin/
COPY --from=foundry /usr/local/bin/chisel  /usr/local/bin/
RUN pnpm run-s build:core build:cli

#### final stage
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/core/node_modules /app/packages/core/node_modules
COPY --from=build /app/apps/cli/node_modules /app/apps/cli/node_modules
COPY --from=build /app/packages/core/dist /app/packages/core/dist
COPY --from=build /app/apps/cli/dist /app/apps/cli/dist
EXPOSE 8000
ENTRYPOINT [ "node", "apps/cli/dist/src/index.js" ]

# syntax=docker.io/docker/dockerfile:1

#### base stage
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

#### install production dependencies
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

#### build project
FROM base AS build
RUN pnpm install --frozen-lockfile
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

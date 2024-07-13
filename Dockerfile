FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run --filter @guidanoli/cmioc build
RUN pnpm run --filter @guidanoli/cmioc-cli build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/core/node_modules /app/packages/core/node_modules
COPY --from=build /app/apps/cli/node_modules /app/apps/cli/node_modules
COPY --from=build /app/packages/core/dist /app/packages/core/dist
COPY --from=build /app/apps/cli/dist /app/apps/cli/dist
EXPOSE 8000
ENTRYPOINT [ "node", "apps/cli/dist/src/index.js" ]

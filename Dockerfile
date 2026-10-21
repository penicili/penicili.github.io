FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app ./

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
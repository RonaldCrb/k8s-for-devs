FROM node:lts-alpine AS base
ENV DOCKERIZED true
RUN apk add --no-cache tini curl
WORKDIR /app
EXPOSE 3030
COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH /app/node_modules/.bin/:$PATH

# dev
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --only=development
ENTRYPOINT ["tini", "--"]
CMD ["/app/node_modules/.bin/nodemon", "src/server.ts"]

# build
FROM dev AS build
COPY . .
RUN tsc

# prod 
FROM base as prod
COPY --from=build /app/dist/ .
CMD ["node", "server.js"]

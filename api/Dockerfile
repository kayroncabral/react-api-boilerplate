FROM node:12.16.0
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN yarn
COPY . .
EXPOSE 4000
CMD ["yarn", "dev"]
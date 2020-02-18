FROM node:10.15.3
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN yarn
COPY . .
EXPOSE 4000
CMD ["yarn", "dev"]
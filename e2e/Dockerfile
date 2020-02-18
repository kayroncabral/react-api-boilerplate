FROM cypress/base:10
WORKDIR /usr/src/app
COPY package.json package*.json ./
ENV CI=1
RUN npm ci
COPY . .
RUN npx cypress verify

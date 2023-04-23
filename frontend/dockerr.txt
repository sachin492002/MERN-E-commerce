FROM node:16.13.0

WORKDIR /app

COPY package.json .

RUN npm install react-scripts
# RUN npm audit fix --force


COPY . .

EXPOSE 3000

CMD [ "npm", "start","--openssl-legacy-provider start" ]
FROM node:17.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD ["npm", "run", "docker-build-webapp"]
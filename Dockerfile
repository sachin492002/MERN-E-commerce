FROM node:17.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV NODE_ENV=production

COPY . .

EXPOSE 80
CMD ["npm", "run", "docker-build-webapp"]
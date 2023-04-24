FROM node:17.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
ENV SERVER_URL=http://localhost:80
ENV CLIENT_URL=http://localhost:80
ENV PORT=80
ENV NODE_ENV=production

EXPOSE 80

CMD ["npm", "run", "docker-build-webapp"]
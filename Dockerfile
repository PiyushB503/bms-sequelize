FROM node:22-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8088

CMD ["npm", "run", "dev"]
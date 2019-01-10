FROM mhart/alpine-node:latest

WORKDIR /usr/src/app

#Install dependencies (Only the production dependencies)
COPY package*.json ./

RUN npm install --production

# Copy all files
COPY index.js ./

EXPOSE 3003

CMD [ "npm", "run", "start" ]
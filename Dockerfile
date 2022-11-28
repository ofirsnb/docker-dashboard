FROM node:16

RUN apt-get update
RUN apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
RUN apt-get update
RUN apt-get -y install docker-ce

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/app.js" ]

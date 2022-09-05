FROM node:16-alpine as base

WORKDIR /school-management-server
RUN npm i -g pm2
COPY ./package.json ./ 
RUN npm install 
COPY ./ ./ 
RUN npm run build
EXPOSE  5000

CMD ["npm", "run", "start:production"]

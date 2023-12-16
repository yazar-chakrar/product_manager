FROM node:18.14.0 as base

FROM base as development
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . . 
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM base as production
WORKDIR /app
COPY package.json /app
RUN npm install --only=production
COPY . . 
EXPOSE 3000
EXPOSE 8077
CMD ["npm", "run", "start"]

# docker build -t ib-prod-service  --target production .

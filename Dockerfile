FROM node:16.14.0

COPY . /claimasyl

WORKDIR /claimasyl
RUN npm install --ignore-scripts
RUN npm run build


FROM node:16.14.0

COPY . /claimasyl

WORKDIR /claimasyl
RUN npm install --legacy-peer-deps
RUN npm run build


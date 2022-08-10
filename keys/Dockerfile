FROM alpine:latest
RUN apk add gpg dirmngr
COPY docker-entrypoint.sh /code/docker-entrypoint.sh
COPY gen-key-script /code/gen-key-script
#!/bin/bash
apk add gpg dirmngr gpg-agent
GPG_TTY=/dev/console
echo "generating key"
echo "$EMAIL_PORT"
gpg --batch --passphrase '' --quick-gen-key 1337
gpg --batch --output /code/publickeys/server.asc --armor --export 1337
gpg --batch --output /code/privatekeys/server.pgp --armor --export-secret-key 1337

gpg --batch --passphrase '' --quick-gen-key 1338
gpg --batch --output /code/publickeys/worker.asc --armor --export 1338
gpg --batch --output /code/privatekeys/worker.pgp --armor --export-secret-key 1338
echo "done"

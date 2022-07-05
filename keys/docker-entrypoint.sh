#!/bin/bash
apk add gpg dirmngr gpg-agent
GPG_TTY=/dev/console
echo "generating key"
echo "$EMAIL_PORT"
gpg --batch --passphrase '' --quick-gen-key 1337
gpg --batch --output /code/publickeys/public.asc --armor --export 1337
gpg --batch --output /code/privatekeys/private.pgp --armor --export-secret-key 1337
echo "done"

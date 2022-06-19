## Project
Software to send asylum requests for the schengen area via a web form.

## Project Structure
Currently we use docker-compose to deploy and develop the application. The repo contains the following directories:

```
├── docker-compose.yml
├── backend/  django backend
├── frontend/ react frontend
├── nginx/    serves html from build and django-proxy
├── data/
│   └── db/   pgsql storage used by docker
└── docu/
```
## Install

```
git clone git@gitlab.com:Mareikei/claimasylum.git
docker-compose up
```

## To Do
- [] docker-compose currently only for dev purpose as it is using django dev server. Gunicorn needs to be set up before deployment!

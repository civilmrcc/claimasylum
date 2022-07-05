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
podman-compose --env-file .env up
```


## Contribute
We would love for you to contribute to claimasylum and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](./docu/contributing/issue-reporting-guidelines.md)
- [Pull Request Guidelines](./docu/contributing/pull-request-guideline.md)
- [Code Review Guidelines](./docu/contributing/code-review-guidelines.md)


## To Do
- [] docker-compose currently only for dev purpose as it is using django dev server. Gunicorn needs to be set up before deployment!

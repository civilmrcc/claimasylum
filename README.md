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
git clone git@github.com:civilmrcc/claimasylum.git
podman-compose --env-file .env up
```


### Development
```
git clone git@github.com:civilmrcc/claimasylum.git
podman-compose --env-file .env up
```
To configure graylog login with admin:admin and add the input for django logging:
    1. In the top navigation click on "System/Inputs" and select "Inputs" in the dropdown-menu.
    2. Select Input type "GELF HTTP"
    3. Click "Launch input"
    4. A window appears where you have to enter the title "Claimasylum_Django"
    5. Click on "save"


After docker-compose is up an running you can access the application via:
https://localhost:8080 (web frontend)
https://localhost:9000 (graylog)
### Configure Graylog
After installation log into graylog, select "system" in inputs and create a "gelfhttp" input (default values can be used).

## Contribute
We would love for you to contribute to claimasylum and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](./docu/contributing/issue-reporting-guidelines.md)
- [Pull Request Guidelines](./docu/contributing/pull-request-guideline.md)
- [Code Review Guidelines](./docu/contributing/code-review-guidelines.md)


## To Do
- [] docker-compose currently only for dev purpose as it is using django dev server. Gunicorn needs to be set up before deployment!

# Microblog service build with react / codeigniter (DO NOT USE IN PRODUCTION)

**pre-requirements:**

- Docker
- Docker-compose

**installation:**
$ git clone http://https://github.com/justd88/microblog.git
$ cd microblog
$ docker-compose up

or you can run in the background with "-d" flag

Have a nice coffee ;)
Once the installation done

**The frontend is accessible from http://localhost:3000**

The backend API url is http://localhost:9090/api/

Feature Testing by WebdriverIO

docker-compose run --rm webdriverio wdio

Tests file located at:
/frontend/test/specs/\*

#/bin/sh
docker rm node_app_container
docker run --name node_app_container -p 8081:8081 -v //usr/app/node_modules -v /$(pwd)://usr/app sharmaarun/ci_cd_dev:latest
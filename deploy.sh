docker build -t sharmaarun/ci_cd_tut -t sharmaarun/ci_cd_tut:$GIT_SHA -f  ./moleculer-test/Dockerfile ./moleculer-test
docker push sharmaarun/ci_cd_tut
kubectl apply -f k8s
kubectl set image deployment/client-deployment client=sharmaarun/ci_cd_tut:$GIT_SHA
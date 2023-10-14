
docker-build:
	docker build -t eshurupov/em23-ui:1.0 -t eshurupov/em23-ui:latest .

docker-login:
	docker login

docker-push:
	docker push --all-tags eshurupov/em23-ui

docker-build-push: docker-build docker-push

npm-build:
	npm run build

docker-fast-build: npm-build
	docker build -f DockerfileFast -t eshurupov/em23-ui:1.0 -t eshurupov/em23-ui:latest .

docker-fast-build-push: docker-fast-build docker-push
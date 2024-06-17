docker-build:
	docker build -t mynodejs:latest ./docker/nodejs
	docker build -t mynginx:latest ./docker/nginx

build:
	docker-compose -f docker-compose.build.yaml up
	docker-compose -f docker-compose.build.yaml down

start:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f
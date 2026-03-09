build:
	docker compose -f local.docker-compose up --build -d --remove-orphans

up:
	docker compose -f local.docker-compose up -d

down:
	docker compose -f local.docker-compose down

down-v:
	docker compose -f local.docker-compose down -v

show-logs:
	docker compose -f local.docker-compose logs

show-logs-api:
	docker compose -f local.docker-compose logs api

show-logs-client:
	docker compose -f local.docker-compose logs client

user:
	docker run --rm mern-invoice-api whoami

volume:
	docker volume inspect mern-invoice_mongodb-data

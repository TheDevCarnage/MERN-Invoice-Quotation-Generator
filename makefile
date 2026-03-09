build:
	docker compose -f local.docker-compose.yaml up --build -d --remove-orphans

up:
	docker compose -f local.docker-compose.yaml up -d

down:
	docker compose -f local.docker-compose.yaml down

down-v:
	docker compose -f local.docker-compose.yaml down -v

show-logs:
	docker compose -f local.docker-compose.yaml logs

show-logs-api:
	docker compose -f local.docker-compose.yaml logs api

show-logs-client:
	docker compose -f local.docker-compose.yaml logs client

user:
	docker run --rm mern-invoice-api whoami

volume:
	docker volume inspect mern-invoice_mongodb-data

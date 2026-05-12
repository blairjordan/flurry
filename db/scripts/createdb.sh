#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

$1

# Set environment variables
POSTGRES_CONTAINER_NAME=flurry-postgres
POSTGRES_USER=flurryuser
POSTGRES_PASSWORD=flurrypassword
POSTGRES_DB=flurrydb
POSTGRES_PORT=5432
POSTGRES_HOST_PORT=${1:-5432}
POSTGRES_HOST=localhost

echo "🚧 Stopping and removing existing container ..."
docker stop $POSTGRES_CONTAINER_NAME >/dev/null 2>&1
docker rm $POSTGRES_CONTAINER_NAME >/dev/null 2>&1

sleep 10

echo "🐘 Creating PostgreSQL container (🌐 including GIS) ..."

docker run -d \
  --name $POSTGRES_CONTAINER_NAME \
  -e "POSTGRES_USER=$POSTGRES_USER" \
  -e "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" \
  -e "POSTGRES_DB=$POSTGRES_DB" \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -p "$POSTGRES_HOST_PORT:$POSTGRES_PORT" \
  postgis/postgis:latest >/dev/null 2>&1

sleep 20

echo -n "🌏 Container IP ($POSTGRES_CONTAINER_NAME):"
printf " %s\n" $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $POSTGRES_CONTAINER_NAME)

export DATABASE_URL=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_HOST_PORT/$POSTGRES_DB?sslmode=disable

echo -e "🔗 Connection String:\n\t$DATABASE_URL"


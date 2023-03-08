# media-api

## Installation

run $ yarn install

## running the app

# development

yarn start

## Instructions

I used docker compose to connect to mysql database and run it.
I also pushed my .env file so you can easily run the app.

#to run mysql db in docker
run: docker-compose up

# to apply migrations

run: npx prisma migrate dev

# during a restart

run: npx prisma migrate deploy

## Here is a link to my postman api docs for the app

https://documenter.getpostman.com/view/20114470/2s93JqSQz8

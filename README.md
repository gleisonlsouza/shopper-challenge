# shopper-chalange - building....
Shopper company challenge

build docker-compose
docker-compose up --build

Make migrations
cd backend
npx prisma migrate save --name 01_create_initial_data --create-only

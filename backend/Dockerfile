FROM node:18.12.0

RUN apt-get update && apt-get install -y netcat

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh wait-for-it.sh 
COPY entrypoint-app.sh entrypoint-app.sh
RUN chmod +x wait-for-it.sh 
RUN chmod +x entrypoint-app.sh

ENTRYPOINT ["./entrypoint-app.sh"]






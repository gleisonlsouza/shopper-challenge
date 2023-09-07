#!/bin/sh

# Esperar pelo MySQL
./wait-for-it.sh mysql:3306 -t 0 -- echo "MySQL está pronto."

# Executar as migrações do Prisma e iniciar o servidor

echo "Executando migrações do Prisma..."
npx prisma migrate dev
echo "Migrações do Prisma concluídas."

echo "Gerando arquivos do Prisma..."
npx prisma generate
echo "Arquivos do Prisma gerados."

echo "Iniciando o servidor..."
npm start
echo "Servidor iniciado."

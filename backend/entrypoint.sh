#!/bin/bash

# Função para verificar a disponibilidade do MySQL
wait_for_mysql() {
  echo "Aguardando que o MySQL esteja pronto..."

  until mysqladmin ping -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" &>/dev/null; do
    echo "MySQL não está pronto. Tentando novamente em 2 segundos..."
    sleep 2
  done

  echo "MySQL está pronto."
}

# Carregar variáveis de ambiente do arquivo .env
if [[ -f .env ]]; then
  source .env
fi

# Executar função de espera
wait_for_mysql

# Executar as migrações do Prisma e iniciar o servidor
npx prisma migrate dev
npx prisma generate
npm start

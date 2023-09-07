#!/bin/sh
# wait-for-it.sh
# Espera até que um host/porta esteja disponível antes de executar um comando.
# Inspirado por https://github.com/vishnubob/wait-for-it

set -e

# Argumentos esperados:
# $1 = host:porta
# $2 = comando a ser executado após a espera

hostport="$1"
shift
cmd="$@"

host=$(echo "$hostport" | cut -d ':' -f 1)
port=$(echo "$hostport" | cut -d ':' -f 2)

until nc -z -w 1 "$host" "$port"; do
  echo "Aguardando Banco de dados Shopper..."
  sleep 1
done

echo "Banco de dados Shopper está disponível, inciando backend:"


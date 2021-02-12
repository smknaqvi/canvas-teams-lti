#!/bin/sh
HOST=$(grep TYPEORM_HOST .env | cut -d '=' -f2 | xargs)
USER=$(grep TYPEORM_USERNAME .env | cut -d '=' -f2 | xargs)
DB=$(grep TYPEORM_DATABASE .env | cut -d '=' -f2  | xargs)
PASS=$(grep TYPEORM_PASSWORD .env | cut -d '=' -f2 | xargs)

yarn run cleanBuild
$(PGPASSWORD="$PASS" psql -h "$HOST" -d "$DB" -U "$USER" -q -f db/dropTables.sql)
yarn run synchronize
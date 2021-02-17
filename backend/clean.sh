#!/bin/sh
HOST=$(grep TYPEORM_HOST .env | cut -d '=' -f2 | xargs)
USER=$(grep TYPEORM_USERNAME .env | cut -d '=' -f2 | xargs)
DB=$(grep TYPEORM_DATABASE .env | cut -d '=' -f2  | xargs)
PASS=$(grep TYPEORM_PASSWORD .env | cut -d '=' -f2 | xargs)

yarn run cleanBuild
$(PGPASSWORD="$PASS" psql -h "$HOST" -d "$DB" -U "$USER" -q -f db/dropTables.sql)
    
TYPEORM_SYNCHRONIZE=true node --title=synchronizeServer ./dist/index.js&

sleep 2
pkill synchronizeServer

$(PGPASSWORD="$PASS" psql -h "$HOST" -d "$DB" -U "$USER"  -f db/rolesInit.sql)







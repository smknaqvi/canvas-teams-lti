### Environment Variables

```
cp .env.example .env
```

### Configuration

Run `yarn run synchronize` on first run to generate database tables.
Run `./db/rolesInit.sql` to generate roles.

After changing entities run ./clean.sh to regenerate entities, wipe and update database.

# Simple Supabase Benchmarks

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/)
- [pgbench](https://www.postgresql.org/docs/current/pgbench.html)
- [psql](https://www.postgresql.org/docs/current/app-psql.html)

## Setup

```console
export PGDATABASE=postgresql://postgres:<password>@db.<project-id>.supabase.co:5432/postgres
pgbench --initialize --init-steps dtGvp --scale 200
psql $PGDATABASE <init.sql
```

## Benchmarking PostgreSQL using pgbench

```console
pgbench --builtin simple-update --client $(expr $(psql $PGDATABASE -c 'show max_connections' -t -A) / 4) --jobs $(getconf _NPROCESSORS_ONLN) --progress 10 --protocol prepared --time 180
```

## Benchmarking Supabase REST API using k6

```console
export SUPABASE_URL=https://<project-id>.supabase.co
export SUPABASE_KEY=<anon-key>
psql $PGDATABASE -c 'set statement_timeout = 0' -c 'truncate pgbench_history' -c 'vacuum analyze' && k6 run simple-update.js
```

There are also:

- `select-only.js`, based on `pgbench --builtin select-only`.
- `tpcb-like.js`, based on `pgbench --builtin tpcb-like`.

## Cleanup

```console
pgbench --initialize --init-steps d
```

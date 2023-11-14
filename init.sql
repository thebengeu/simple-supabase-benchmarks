create or replace function simple_update(
    aid integer, bid integer, tid integer, delta integer
) returns void
language sql
as $$
update pgbench_accounts set abalance = abalance + delta where aid = simple_update.aid;
select abalance from pgbench_accounts where aid = simple_update.aid;
insert into pgbench_history (tid, bid, aid, delta, mtime) values (tid, bid, aid, delta, current_timestamp);
$$;

create or replace function tpcb_like(
    aid integer, bid integer, tid integer, delta integer
) returns void
language sql
as $$
update pgbench_accounts set abalance = abalance + delta where aid = tpcb_like.aid;
select abalance from pgbench_accounts where aid = tpcb_like.aid;
update pgbench_tellers set tbalance = tbalance + delta where tid = tpcb_like.tid;
update pgbench_branches set bbalance = bbalance + delta where bid = tpcb_like.bid;
insert into pgbench_history (tid, bid, aid, delta, mtime) values (tid, bid, aid, delta, current_timestamp);
$$;

-- Splits the portfolio into three categories: website, AI automation, AI agent.
--
-- Existing 'ai_system' rows keep that value and are presented as AI Automation,
-- so no row is rewritten and nothing can be lost. A new 'ai_agent' kind is
-- allowed for genuine agent projects added from now on.
--
-- agent_example lets an automation appear in the AI Agents section as a
-- temporary example without duplicating the row. One record, one source of
-- truth, and the placement is a single toggle in the admin console that can be
-- switched off once real agent projects exist.
--
-- Purely additive and safe to run more than once.

alter table public.portfolio_items
  add column if not exists agent_example boolean not null default false;

-- Widen the kind constraint to accept 'ai_agent'. The constraint is dropped by
-- whatever name Postgres gave it, then recreated, so this works regardless of
-- how the original was declared.
do $$
declare
  constraint_name text;
begin
  select con.conname into constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  join pg_namespace nsp on nsp.oid = rel.relnamespace
  where nsp.nspname = 'public'
    and rel.relname = 'portfolio_items'
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%kind%'
  limit 1;

  if constraint_name is not null then
    execute format('alter table public.portfolio_items drop constraint %I', constraint_name);
  end if;

  alter table public.portfolio_items
    add constraint portfolio_items_kind_check
    check (kind in ('website', 'ai_system', 'ai_agent'));
end $$;

-- Only automations are ever borrowed as agent examples; a website project has
-- no business appearing in the agents section.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'portfolio_items_agent_example_kind') then
    alter table public.portfolio_items
      add constraint portfolio_items_agent_example_kind
      check (agent_example = false or kind = 'ai_system');
  end if;
end $$;

create index if not exists portfolio_agent_example_idx
  on public.portfolio_items(agent_example)
  where agent_example = true;

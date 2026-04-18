-- RAG Setup for xueyifan.io chatbot
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Enable pgvector extension
create extension if not exists vector with schema extensions;

-- 2. Create documents table
create table if not exists public.documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536),
  fts tsvector generated always as (to_tsvector('english', content)) stored
);

-- 3. Hybrid search function (vector similarity + BM25 keyword match)
create or replace function hybrid_search (
  query_text text,
  query_embedding vector(1536),
  match_count int default 10,
  semantic_weight float default 0.7,
  keyword_weight float default 0.3,
  filter jsonb default '{}'::jsonb
) returns table (
  id bigint, content text, metadata jsonb, similarity float
) language plpgsql as $$
begin
  return query
  select d.id, d.content, d.metadata,
    (semantic_weight * (1 - (d.embedding <=> query_embedding)) +
     keyword_weight * coalesce(ts_rank(d.fts, websearch_to_tsquery('english', query_text)), 0)
    ) as similarity
  from documents d
  where case when filter != '{}'::jsonb then d.metadata @> filter else true end
  order by similarity desc
  limit match_count;
end; $$;

-- 4. Delete function for re-indexing
create or replace function delete_documents_by_slug(slug text)
returns void language plpgsql as $$
begin
  delete from documents where metadata->>'article_id' = slug;
end; $$;

-- 5. Indices
create index if not exists documents_embedding_idx on documents
  using ivfflat (embedding vector_cosine_ops) with (lists = 10);
create index if not exists documents_fts_idx on documents using gin (fts);
create index if not exists documents_metadata_idx on documents using gin (metadata);

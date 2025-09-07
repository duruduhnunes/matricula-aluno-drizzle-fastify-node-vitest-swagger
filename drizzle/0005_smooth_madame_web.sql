-- precisa do gerador de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- 1) cria a coluna permitindo NULL
ALTER TABLE "enrollments" ADD COLUMN IF NOT EXISTS "id" uuid;

-- 2) preenche as linhas existentes
UPDATE "enrollments" SET "id" = gen_random_uuid() WHERE "id" IS NULL;

-- 3) define default para novos inserts
ALTER TABLE "enrollments" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- 4) agora trava NOT NULL e cria a PK
ALTER TABLE "enrollments" ALTER COLUMN "id" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'enrollments_pkey'
  ) THEN
    ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id");
  END IF;
END$$;

COMMIT;

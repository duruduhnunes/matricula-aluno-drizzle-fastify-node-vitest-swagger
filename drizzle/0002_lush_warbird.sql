ALTER TABLE "courses" DROP CONSTRAINT "courses_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "userId";
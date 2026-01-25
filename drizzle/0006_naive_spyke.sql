ALTER TABLE "user_word_progress" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_word_progress" ALTER COLUMN "updated_at" DROP NOT NULL;
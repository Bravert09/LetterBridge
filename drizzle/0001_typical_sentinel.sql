ALTER TABLE "words" ALTER COLUMN "level" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "words" ALTER COLUMN "level" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "words" ALTER COLUMN "level" DROP NOT NULL;
CREATE TABLE "user_daily_learning" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"learning_date" date NOT NULL,
	"status" varchar(20) DEFAULT 'in_progress' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_daily_learning" ADD CONSTRAINT "user_daily_learning_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_day_unique" ON "user_daily_learning" USING btree ("user_id","learning_date");
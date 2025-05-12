ALTER TABLE "files" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "folder_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "workspace_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "workspace_owner";--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "tiile";--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "logo";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "workspace_owner";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "tiile";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "logo";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN "tiile";
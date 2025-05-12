
import { subscriptionStatus } from '@/migrations/schema';
import { sql } from 'drizzle-orm';
import {

    boolean,
    integer,
    jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';


export const workspaces = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  workspaceOwner: uuid('workspace_owner').notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
});

export const folders = pgTable('folders', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, {
      onDelete: 'cascade',
    }),
});

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, {
      onDelete: 'cascade',
    }),
  folderId: uuid('folder_id')
    .notNull()
    .references(() => folders.id, {
      onDelete: 'cascade',
    }),
});


export const subscriptions = pgTable("subscriptions", {
    id: text().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus(),
    metadata: jsonb(),
    priceId: text("price_id"),
    quantity: integer(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp({ withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
    trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
})
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const personalSubmissions = pgTable("personal_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  parentName: text("parent_name").notNull(),
  parentOccupation: text("parent_occupation").notNull(),
  education: text("education").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  personalSubmissionId: integer("personal_submission_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  percentage: integer("percentage").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  answers: jsonb("answers").notNull(),
  referenceNumber: text("reference_number").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertPersonalSubmissionSchema = createInsertSchema(personalSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  submittedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertPersonalSubmission = z.infer<typeof insertPersonalSubmissionSchema>;
export type PersonalSubmission = typeof personalSubmissions.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

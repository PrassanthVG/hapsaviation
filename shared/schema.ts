import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const personalSubmissions = pgTable("personal_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull(),
  education: text("education").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  personalSubmissionId: integer("personal_submission_id"),
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

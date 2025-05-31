import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPersonalSubmissionSchema, insertTestResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Submit personal information
  app.post("/api/personal-submission", async (req, res) => {
    try {
      const validatedData = insertPersonalSubmissionSchema.parse(req.body);
      const submission = await storage.createPersonalSubmission(validatedData);
      res.json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Submit test results
  app.post("/api/test-result", async (req, res) => {
    try {
      const validatedData = insertTestResultSchema.parse(req.body);
      const testResult = await storage.createTestResult(validatedData);
      res.json(testResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all personal submissions (admin only)
  app.get("/api/admin/personal-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllPersonalSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all test results (admin only)
  app.get("/api/admin/test-results", async (req, res) => {
    try {
      const results = await storage.getAllTestResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get combined data (admin only)
  app.get("/api/admin/combined-data", async (req, res) => {
    try {
      const personalSubmissions = await storage.getAllPersonalSubmissions();
      const testResults = await storage.getAllTestResults();
      
      const combinedData = personalSubmissions.map(submission => {
        const testResult = testResults.find(result => result.personalSubmissionId === submission.id);
        return {
          personal: submission,
          test: testResult || null
        };
      });

      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

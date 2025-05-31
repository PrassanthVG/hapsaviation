import { 
  personalSubmissions, 
  testResults, 
  users, 
  type PersonalSubmission, 
  type InsertPersonalSubmission,
  type TestResult,
  type InsertTestResult,
  type User, 
  type InsertUser 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Personal submission operations
  createPersonalSubmission(submission: InsertPersonalSubmission): Promise<PersonalSubmission>;
  getAllPersonalSubmissions(): Promise<PersonalSubmission[]>;
  getPersonalSubmissionById(id: number): Promise<PersonalSubmission | undefined>;

  // Test result operations
  createTestResult(testResult: InsertTestResult): Promise<TestResult>;
  getAllTestResults(): Promise<TestResult[]>;
  getTestResultById(id: number): Promise<TestResult | undefined>;
  getTestResultByPersonalSubmissionId(personalSubmissionId: number): Promise<TestResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private personalSubmissions: Map<number, PersonalSubmission>;
  private testResults: Map<number, TestResult>;
  private currentUserId: number;
  private currentPersonalSubmissionId: number;
  private currentTestResultId: number;

  constructor() {
    this.users = new Map();
    this.personalSubmissions = new Map();
    this.testResults = new Map();
    this.currentUserId = 1;
    this.currentPersonalSubmissionId = 1;
    this.currentTestResultId = 1;

    // Create default admin user
    this.createUser({ username: "admin", password: "haps2024" });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPersonalSubmission(submission: InsertPersonalSubmission): Promise<PersonalSubmission> {
    const id = this.currentPersonalSubmissionId++;
    const personalSubmission: PersonalSubmission = {
      ...submission,
      id,
      submittedAt: new Date(),
    };
    this.personalSubmissions.set(id, personalSubmission);
    return personalSubmission;
  }

  async getAllPersonalSubmissions(): Promise<PersonalSubmission[]> {
    return Array.from(this.personalSubmissions.values());
  }

  async getPersonalSubmissionById(id: number): Promise<PersonalSubmission | undefined> {
    return this.personalSubmissions.get(id);
  }

  async createTestResult(testResult: InsertTestResult): Promise<TestResult> {
    const id = this.currentTestResultId++;
    const result: TestResult = {
      ...testResult,
      id,
      submittedAt: new Date(),
    };
    this.testResults.set(id, result);
    return result;
  }

  async getAllTestResults(): Promise<TestResult[]> {
    return Array.from(this.testResults.values());
  }

  async getTestResultById(id: number): Promise<TestResult | undefined> {
    return this.testResults.get(id);
  }

  async getTestResultByPersonalSubmissionId(personalSubmissionId: number): Promise<TestResult | undefined> {
    return Array.from(this.testResults.values()).find(
      (result) => result.personalSubmissionId === personalSubmissionId,
    );
  }
}

export const storage = new MemStorage();

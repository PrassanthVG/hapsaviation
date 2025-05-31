import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PersonalSubmission, TestResult } from "@shared/schema";

interface CombinedData {
  personal: PersonalSubmission;
  test: TestResult | null;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const personalQuery = useQuery<PersonalSubmission[]>({
    queryKey: ["/api/admin/personal-submissions"],
  });

  const testQuery = useQuery<TestResult[]>({
    queryKey: ["/api/admin/test-results"],
  });

  const combinedQuery = useQuery<CombinedData[]>({
    queryKey: ["/api/admin/combined-data"],
  });

  const handleLogout = () => {
    setLocation("/");
  };

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || "";
          return typeof value === "string" && value.includes(",") ? `"${value}"` : value;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPersonalData = () => {
    if (!personalQuery.data) return;
    
    const headers = ["firstName", "lastName", "email", "phone", "dateOfBirth", "city", "state", "country", "education", "submittedAt"];
    const data = personalQuery.data.map(item => ({
      ...item,
      submittedAt: new Date(item.submittedAt).toLocaleDateString()
    }));
    
    exportToCSV(data, "personal-submissions.csv", headers);
  };

  const exportTestData = () => {
    if (!testQuery.data) return;
    
    const headers = ["referenceNumber", "score", "totalQuestions", "percentage", "timeSpent", "submittedAt"];
    const data = testQuery.data.map(item => ({
      ...item,
      submittedAt: new Date(item.submittedAt).toLocaleDateString()
    }));
    
    exportToCSV(data, "test-results.csv", headers);
  };

  const exportCombinedData = () => {
    if (!combinedQuery.data) return;
    
    const headers = ["firstName", "lastName", "email", "phone", "education", "score", "percentage", "referenceNumber", "submittedAt"];
    const data = combinedQuery.data.map(item => ({
      firstName: item.personal.firstName,
      lastName: item.personal.lastName,
      email: item.personal.email,
      phone: item.personal.phone,
      education: item.personal.education,
      score: item.test?.score || "N/A",
      percentage: item.test?.percentage || "N/A",
      referenceNumber: item.test?.referenceNumber || "N/A",
      submittedAt: new Date(item.personal.submittedAt).toLocaleDateString()
    }));
    
    exportToCSV(data, "combined-data.csv", headers);
  };

  const calculateStats = () => {
    const personalCount = personalQuery.data?.length || 0;
    const testCount = testQuery.data?.length || 0;
    const avgScore = testQuery.data?.length 
      ? Math.round(testQuery.data.reduce((sum, test) => sum + test.percentage, 0) / testQuery.data.length)
      : 0;
    const highScore = testQuery.data?.length
      ? Math.max(...testQuery.data.map(test => test.percentage))
      : 0;

    return { personalCount, testCount, avgScore, highScore };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F7" }}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">HAPS Aviation Institute - Admin Dashboard</CardTitle>
                <p className="text-gray-600">Manage scholarship applications and test results</p>
              </div>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#1A4FD3" }}>{stats.personalCount}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#1A4FD3" }}>{stats.testCount}</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#1A4FD3" }}>{stats.avgScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: "#1A4FD3" }}>{stats.highScore}%</div>
              <div className="text-sm text-gray-600">Highest Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="tests">Test Results</TabsTrigger>
                <TabsTrigger value="combined">Combined Data</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Personal Details Submissions</h3>
                  <Button onClick={exportPersonalData} style={{ backgroundColor: "#16a34a" }}>
                    Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Education</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {personalQuery.data?.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell>{submission.firstName} {submission.lastName}</TableCell>
                          <TableCell className="text-sm">{submission.email}</TableCell>
                          <TableCell className="text-sm">{submission.phone}</TableCell>
                          <TableCell className="text-sm">{submission.city}, {submission.state}</TableCell>
                          <TableCell className="text-sm">{submission.education}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="tests" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Test Results</h3>
                  <Button onClick={exportTestData} style={{ backgroundColor: "#16a34a" }}>
                    Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Date</TableHead>
                        <TableHead>Reference Number</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Correct Answers</TableHead>
                        <TableHead>Time Used</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testQuery.data?.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell>{new Date(test.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-sm font-mono">{test.referenceNumber}</TableCell>
                          <TableCell><strong>{test.percentage}%</strong></TableCell>
                          <TableCell>{test.score}/{test.totalQuestions}</TableCell>
                          <TableCell className="text-sm">
                            {Math.floor(test.timeSpent / 60)}m {test.timeSpent % 60}s
                          </TableCell>
                          <TableCell>
                            <Badge variant={test.percentage >= 80 ? "default" : test.percentage >= 70 ? "secondary" : "destructive"}>
                              {test.percentage >= 80 ? "Excellent" : test.percentage >= 70 ? "Good" : "Needs Improvement"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="combined" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Combined Data</h3>
                  <Button onClick={exportCombinedData} style={{ backgroundColor: "#16a34a" }}>
                    Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Education</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {combinedQuery.data?.map((item) => (
                        <TableRow key={item.personal.id}>
                          <TableCell>{new Date(item.personal.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell>{item.personal.firstName} {item.personal.lastName}</TableCell>
                          <TableCell className="text-sm">{item.personal.email}</TableCell>
                          <TableCell className="text-sm">{item.personal.education}</TableCell>
                          <TableCell>
                            {item.test ? (
                              <strong>{item.test.percentage}%</strong>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs font-mono">
                            {item.test?.referenceNumber || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

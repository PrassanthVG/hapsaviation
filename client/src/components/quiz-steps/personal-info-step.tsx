import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { insertPersonalSubmissionSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
interface PersonalData {
  fullName: string;
  phone: string;
  email: string;
  parentName: string;
  parentOccupation: string;
  education: string;
}

interface PersonalInfoStepProps {
  onBack: () => void;
  onNext: (data: PersonalData, submissionId: number) => void;
}

const formSchema = insertPersonalSubmissionSchema;

export default function PersonalInfoStep({ onBack, onNext }: PersonalInfoStepProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      parentName: "",
      parentOccupation: "",
      education: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/personal-submission", data);
      return response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "Information saved successfully!",
        description: "Proceeding to the aviation knowledge test.",
      });
      onNext(form.getValues(), result.id);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save information. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitMutation.mutate(values);
  };

  return (
    <Card className="animate-in fade-in-50 duration-500" style={{ 
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      padding: "32px",
      marginBottom: "24px"
    }}>
      <CardContent className="p-0">
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ backgroundColor: "#fef3c7", color: "#f59e0b" }}
          >
            👤
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Personal Information
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Please provide your personal details for the scholarship application. All fields marked with * are required.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="form-input" placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="form-input" placeholder="your.email@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Father/Mother's Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="form-input" placeholder="Enter parent's name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentOccupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Father/Mother's Occupation <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="form-input" placeholder="Enter parent's occupation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-800">
                      Education Qualification <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="form-select">
                          <SelectValue placeholder="Select your qualification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10th">10th</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="10+2">10+2</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-200">
              <Button 
                type="button"
                variant="secondary"
                onClick={onBack}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              <Button 
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full sm:w-auto"
                style={{ backgroundColor: "#5088dd" }}
              >
                {submitMutation.isPending ? "Saving..." : "Continue to Test"}
              </Button>
            </div>
          </form>
        </Form>

        <div 
          className="rounded-xl p-5 mt-6 text-center"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <p className="text-gray-600 mb-3">In case of any doubts you can contact us at</p>
          <a href="tel:+919945244270" className="text-blue-600 font-medium hover:underline">
            +91 99452 44270
          </a>
          <span className="text-gray-400 mx-2">/</span>
          <a href="mailto:marketing@hapsaviation.com" className="text-blue-600 font-medium hover:underline">
            marketing@hapsaviation.com
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

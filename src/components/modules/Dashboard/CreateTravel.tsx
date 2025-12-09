"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --------------------
// ZOD SCHEMA
// --------------------
const travelSchema = z.object({
  title: z.string().min(3, "Title is required"),
  destination: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  budgetRange: z.string().min(1),
  travelType: z.enum(["SOLO", "GROUP", "COUPLE"]),
  description: z.string().optional(),
  visibility: z.boolean().default(true),
  images: z.any().optional(),
});

type TravelValues = z.infer<typeof travelSchema>;

// --------------------
// MAIN COMPONENT
// --------------------
export default function TravelCreateForm() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<TravelValues>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      visibility: true,
      travelType: "SOLO",
    },
  });

  const onSubmit = async (values: TravelValues) => {
    const formData = new FormData();

    // Add normal fields (excluding images)
    Object.entries(values).forEach(([key, value]) => {
      if (key === "images") return;
      formData.append(key, value as any);
    });

    // Add image files
    files.forEach((file) => formData.append("images", file));

    console.log("Submitted:", values);

    // Example API call
    // await fetch("/api/travel", { method: "POST", body: formData });
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Create Travel Plan</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Trip to Cox’s Bazar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESTINATION */}
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* START DATE */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* END DATE */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* BUDGET RANGE */}
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (0 - 5k)</SelectItem>
                    <SelectItem value="medium">Medium (5k - 20k)</SelectItem>
                    <SelectItem value="high">High (20k+)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TRAVEL TYPE */}
          <FormField
            control={form.control}
            name="travelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Type</FormLabel>

                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-5"
                >
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="SOLO" />
                    </FormControl>
                    <FormLabel className="font-normal">Solo</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="GROUP" />
                    </FormControl>
                    <FormLabel className="font-normal">Group</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="COUPLE" />
                    </FormControl>
                    <FormLabel className="font-normal">Couple</FormLabel>
                  </FormItem>
                </RadioGroup>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Describe your travel plan..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VISIBILITY */}
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between border p-3 rounded-lg">
                <FormLabel>Public Visibility</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* IMAGE UPLOAD */}
          <FormItem>
            <FormLabel>Images</FormLabel>
            <Input
              type="file"
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                setFiles(selected);
              }}
            />
            <FormDescription>Upload travel images (optional)</FormDescription>
          </FormItem>

          <Button type="submit" className="w-full">
            Create Travel Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}

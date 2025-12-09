"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import InputFieldError from "@/components/Shared/InputFieldError";

export default function TravelCreateForm({ state, formAction }: any) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [files, setFiles] = useState<File[]>([]);

  return (
    <form action={formAction} className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Create Travel Plan</h2>

      <FieldGroup className="space-y-5">

        {/* TITLE */}
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            placeholder="Trip to Cox's Bazar"
          />
          <InputFieldError field="title" state={state} />
        </Field>

        {/* DESTINATION */}
        <Field>
          <FieldLabel htmlFor="destination">Destination</FieldLabel>
          <Input
            id="destination"
            name="destination"
            placeholder="Enter destination"
          />
          <InputFieldError field="destination" state={state} />
        </Field>

        {/* START DATE */}
        <Field>
          <FieldLabel>Start Date</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full border rounded-md px-3 py-2 flex items-center justify-start",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                }}
              />
            </PopoverContent>
          </Popover>
          {/* Hidden input so server action receives the date */}
          <input type="hidden" name="startDate" value={startDate?.toISOString() || ""} />
          <InputFieldError field="startDate" state={state} />
        </Field>

        {/* END DATE */}
        <Field>
          <FieldLabel>End Date</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full border rounded-md px-3 py-2 flex items-center justify-start",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                }}
              />
            </PopoverContent>
          </Popover>
          {/* Hidden input for server */}
          <input type="hidden" name="endDate" value={endDate?.toISOString() || ""} />
          <InputFieldError field="endDate" state={state} />
        </Field>

        {/* BUDGET RANGE */}
        <Field>
          <FieldLabel>Budget Range</FieldLabel>
          <select
            name="budgetRange"
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select budget range</option>
            <option value="low">Low (0 - 5k)</option>
            <option value="medium">Medium (5k - 20k)</option>
            <option value="high">High (20k+)</option>
          </select>
          <InputFieldError field="budgetRange" state={state} />
        </Field>

        {/* TRAVEL TYPE */}
        <Field>
          <FieldLabel>Travel Type</FieldLabel>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="travelType" value="SOLO" defaultChecked />
              Solo
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="travelType" value="GROUP" />
              Group
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="travelType" value="COUPLE" />
              Couple
            </label>
          </div>
          <InputFieldError field="travelType" state={state} />
        </Field>

        {/* DESCRIPTION */}
        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            name="description"
            placeholder="Describe your travel plan..."
            rows={4}
          />
          <InputFieldError field="description" state={state} />
        </Field>

        {/* VISIBILITY */}
        <Field>
          <FieldLabel>Public Visibility</FieldLabel>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visibility" defaultChecked />
            <span>Make this travel plan public</span>
          </div>
          <InputFieldError field="visibility" state={state} />
        </Field>

        {/* IMAGES */}
        <Field>
          <FieldLabel>Images</FieldLabel>
          <Input
            type="file"
            name="images"
            multiple
            onChange={(e) => {
              const arr = Array.from(e.target.files || []);
              setFiles(arr);
            }}
          />
          <FieldDescription>Upload images for your travel plan</FieldDescription>
          <InputFieldError field="images" state={state} />
        </Field>

        {/* SUBMIT */}
        <Field>
          <Button type="submit">Create Travel Plan</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

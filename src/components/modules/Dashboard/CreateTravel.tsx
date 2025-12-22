"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import InputFieldError from "@/components/Shared/InputFieldError";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { travelCreate } from "@/services/Dashboard/travel.service";
import { showToast } from "@/components/Shared/UniversalToaster";

export default function TravelCreateForm({
  redirect,
}: {
  redirect?: string | undefined;
}) {
  const [state, formAction, isPending] = useActionState(travelCreate, null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [_files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (state && state.success) {
      showToast("Travel created successfully", "success");
    }
    if (state && !state.success && state.message) {
      showToast("unable to create travel", "error");
    }
  }, [state]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <form
      action={formAction}
      className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm"
    >
      <h2 className="text-2xl font-semibold mb-6">Create Travel Plan</h2>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup className="space-y-5">
        {/* TITLE */}
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" name="title" placeholder="Trip to Cox's Bazar" />
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
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
          <input
            type="hidden"
            name="startDate"
            value={startDate?.toISOString() || ""}
          />
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
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
          <input
            type="hidden"
            name="endDate"
            value={endDate?.toISOString() || ""}
          />
          <InputFieldError field="endDate" state={state} />
        </Field>

        {/* BUDGET RANGE */}
        <Field>
          <FieldLabel>Budget Range</FieldLabel>
          <Input
            id="budgetRange"
            name="budgetRange"
            placeholder="Enter budget range"
          />
          <InputFieldError field="budgetRange" state={state} />
        </Field>

        {/* TRAVEL TYPE */}
        <Field>
          <FieldLabel>Travel Type</FieldLabel>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="travelType"
                value="SOLO"
                defaultChecked
              />
              Solo
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="travelType" value="GROUP" />
              Group
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="travelType" value="FRIENDS" />
              Friends
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

        <Field>
          <Button type="submit" disabled={isPending}>
            Create Travel Plan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
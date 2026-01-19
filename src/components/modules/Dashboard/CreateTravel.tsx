/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { travelCreate } from "@/services/Dashboard/travel.server";
import { showToast } from "@/components/Shared/UniversalToaster";

export default function TravelCreateForm({
  redirect,
  sub,
}: {
  redirect?: string;
  sub?: any;
}) {
  const [state, formAction, isPending] = useActionState(travelCreate, null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();



  useEffect(() => {
    if (state?.success) {
      showToast("Travel created successfully", "success");
    }

    if (state && !state.success && state.message) {
      showToast("Unable to create travel", "error");
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

        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" name="title" placeholder="Trip to Cox's Bazar" />
          <InputFieldError field="title" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="destination">Destination</FieldLabel>
          <Input id="destination" name="destination" placeholder="Enter destination" />
          <InputFieldError field="destination" state={state} />
        </Field>


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
                onSelect={setStartDate}
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="startDate" value={startDate?.toISOString() || ""} />
          <InputFieldError field="startDate" state={state} />
        </Field>


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
                onSelect={setEndDate}
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="endDate" value={endDate?.toISOString() || ""} />
          <InputFieldError field="endDate" state={state} />
        </Field>


        <Field>
          <FieldLabel>Budget Range</FieldLabel>
          <Input name="budgetRange" placeholder="Enter budget range" />
          <InputFieldError field="budgetRange" state={state} />
        </Field>


        <Field>
          <FieldLabel>Travel Type</FieldLabel>
          <div className="flex gap-4">
            <label><input type="radio" name="travelType" value="SOLO" defaultChecked /> Solo</label>
            <label><input type="radio" name="travelType" value="GROUP" /> Group</label>
            <label><input type="radio" name="travelType" value="FRIENDS" /> Friends</label>
          </div>
          <InputFieldError field="travelType" state={state} />
        </Field>


        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea name="description" rows={4} placeholder="Describe your travel plan..." />
          <InputFieldError field="description" state={state} />
        </Field>


        <Field>
          <FieldLabel>Public Visibility</FieldLabel>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visibility" defaultChecked />
            <span>Make this travel plan public</span>
          </div>
        </Field>


        <Field>
          <FieldLabel>Images</FieldLabel>
          <Input type="file" name="images" multiple accept="image/*" />
          <FieldDescription>Upload images for your travel plan</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Travel Plan"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createPlan } from "@/services/subscribe/sub.service";
import { toast } from "sonner";


const formSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.number().min(0, "Price must be 0 or more"),
  stripeId: z.string().min(1, "Stripe Price ID is required"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminSubCreate() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: Number(""),
      stripeId: "",
      duration: 30,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createPlan(values);
      toast("Plan created successfully!")
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Error creating plan");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-8 bg-card text-card-foreground border border-border rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Create New Subscription Plan
        </h2>

        {/* Plan Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormDescription>
                Enter a unique name for the plan.
              </FormDescription>
              <FormControl>
                <Input placeholder="Basic Plan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (USD)</FormLabel>
              <FormDescription>
                Set the plan price in USD.
              </FormDescription>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stripe ID */}
        <FormField
          control={form.control}
          name="stripeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stripe Price ID</FormLabel>
              <FormDescription>
                Use the Stripe Price ID from Stripe dashboard.
              </FormDescription>
              <FormControl>
                <Input placeholder="price_1NXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (days)</FormLabel>
              <FormDescription>
                How long the subscription lasts.
              </FormDescription>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create Plan"}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { createPlan } from "@/services/subscribe/sub.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export default function AdminSubCreate() {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stripeId: "",
    duration: 30,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPlan(form);
      alert("Plan created successfully!");
      setForm({ name: "", price: 0, stripeId: "", duration: 30 });
    } catch (err) {
      console.error(err);
      alert("Error creating plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Create New Subscription Plan</h2>

      <Field>
        <FieldLabel>Plan Name</FieldLabel>
        <FieldDescription>Enter a unique name for the plan.</FieldDescription>

          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Basic Plan"
            required
          />

      </Field>

      <Field>
        <FieldLabel>Price</FieldLabel>
        <FieldDescription>Set the plan price in USD.</FieldDescription>

          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="10"
            required
            min={0}
          />

      </Field>

      <Field>
        <FieldLabel>Stripe Price ID</FieldLabel>
        <FieldDescription>Use the Stripe Price ID for this plan.</FieldDescription>

          <Input
            type="text"
            name="stripeId"
            value={form.stripeId}
            onChange={handleChange}
            placeholder="price_1NXXXXXXX"
            required
          />

      </Field>

      <Field>
        <FieldLabel>Duration (days)</FieldLabel>
        <FieldDescription>How long the subscription lasts (in days).</FieldDescription>

          <Input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="30"
            required
            min={1}
          />
      </Field>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Plan"}
      </Button>
    </form>
  );
}

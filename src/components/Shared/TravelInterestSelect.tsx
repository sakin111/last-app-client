"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { TRAVEL_INTERESTS } from "./travelInterest";


interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TravelInterestSelect({ value = [], onChange }: Props) {
  const toggleInterest = (interest: string) => {
    if (value.includes(interest)) {
      onChange(value.filter((v) => v !== interest));
    } else {
      onChange([...value, interest]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value.length > 0
            ? `${value.length} selected`
            : "Select travel interests"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search interests..." />
          <CommandEmpty>No interest found.</CommandEmpty>

          <CommandGroup>
            {TRAVEL_INTERESTS.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => toggleInterest(item.value)}
                className="flex items-center gap-2"
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    value.includes(item.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>

      {/* Selected Badges */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((v) => {
            const label =
              TRAVEL_INTERESTS.find((i) => i.value === v)?.label ?? v;
            return (
              <Badge
                key={v}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleInterest(v)}
              >
                {label} ✕
              </Badge>
            );
          })}
        </div>
      )}
    </Popover>
  );
}

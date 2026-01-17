"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Dropdown() {
  const [open, setOpen] = useState(false)


  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  )


    const drop = [
        {
            name: "Profile", href: "#"
        },
        {
            name: "Billing", href: "#"
        },
        {
            name: "Support", href: "#"
        }
    ]

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)")
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
          onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
          onClick={isMobile ? () => setOpen((p) => !p) : undefined}
        >
          Features
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        sideOffset={12}
        onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
        className="
          w-[90vw] max-w-sm
          rounded-2xl
          border border-border
          bg-background
          p-4
          shadow-xl
          dark:shadow-black/40
        "
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
         {drop.map((item) => (
            <DropdownMenuItem
              key={item.name}
              className="
                flex h-14 items-center
                rounded-xl px-4
                text-sm font-medium
                text-foreground
                bg-muted/40
                transition
                hover:bg-muted
                focus:bg-muted
                cursor-pointer
              "
            >
              <Link href={item.href}>{item.name}</Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

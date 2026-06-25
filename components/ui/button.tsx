import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // primary green CTA
        default:
          "bg-primary text-primary-foreground hover:bg-green-deep shadow-[0_1px_0_oklch(0.2_0.008_90/0.06)]",
        // ink outline
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        // green hairline outline — fills to green with light text
        line: "border border-green/60 bg-transparent text-green-deep hover:bg-green hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-bone",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-green underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-sm px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-sm px-6 has-[>svg]:px-4",
        xl: "h-14 rounded-sm px-9 text-[0.9rem] tracking-[0.02em] has-[>svg]:px-7",
        pill: "h-10 rounded-sm px-6 tracking-[0.02em] has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

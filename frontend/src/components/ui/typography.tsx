import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const typographyVariants = cva("", {
    variants: {
        variant: {
            h1: "text-4xl leading-tight font-bold lg:text-6xl",
            h2: "text-xl font-bold lg:text-4xl",
            h3: "text-lg font-medium",
            p: "text-base",
            span: "[font-size:inherit] leading-[inherit] [font-weight:inherit] text-inherit",
            blockquote: "mt-6 border-l-2 pl-6 italic",
            code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        },
        color: {
            default: "text-foreground",
            muted: "text-muted-foreground",
            primary: "text-primary",
            gradient:
                "to-primary from-foreground block bg-linear-to-r bg-clip-text text-transparent"
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
            "7xl": "text-7xl",
            "8xl": "text-8xl",
            "9xl": "text-9xl"
        },
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right"
        }
    },
    compoundVariants: [
        {
            variant: ["h1", "h2", "h3"],
            className: "scroll-m-20 text-balance"
        },
        {
            variant: "p",
            color: "muted",
            size: undefined,
            className: "text-sm"
        }
    ],
    defaultVariants: {
        variant: "p"
    }
})

const allowedTags = ["h1", "h2", "h3", "p", "span", "div", "label"] as const

type TypographyProps = React.HTMLAttributes<HTMLElement> & {
    as?: (typeof allowedTags)[number]
} & VariantProps<typeof typographyVariants>

export function Typography({
    className,
    variant,
    color,
    align,
    size,
    as,
    ...props
}: TypographyProps) {
    const isValidVariant =
        variant && (allowedTags as readonly string[]).includes(variant)

    const Component = as || (isValidVariant ? variant : "p")

    return (
        <Component
            className={cn(
                typographyVariants({ variant, color, align, size, className })
            )}
            {...props}
        />
    )
}

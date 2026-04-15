import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Container } from "./container"

export const cardVariants = cva(
    "bg-card overflow-hidden rounded-2xl border p-4 shadow-sm",
    {
        variants: {
            variant: {
                "interactive-on-hover":
                    "hover:-translate-y-1 hover:shadow-xl hover:after:opacity-20",
                "interactive-on-focus": "has-focus:after:opacity-20"
            },
            padding: {
                sm: "p-2",
                default: "p-4",
                lg: "p-8"
            }
        },
        compoundVariants: [
            {
                variant: ["interactive-on-hover", "interactive-on-focus"],
                className: [
                    "relative transform-gpu transition-all duration-300",
                    "after:absolute after:inset-0 after:-z-10 after:bg-linear-to-br after:opacity-0 after:transition-opacity after:duration-300",
                    "nth-[4n+1]:after:from-blue-500 nth-[4n+1]:after:to-cyan-500 nth-[4n+2]:after:from-purple-500 nth-[4n+2]:after:to-pink-500 nth-[4n+3]:after:from-green-500 nth-[4n+3]:after:to-emerald-500 nth-[4n+4]:after:from-orange-500 nth-[4n+4]:after:to-yellow-500"
                ]
            }
        ]
    }
)

export const Card = ({
    className,
    variant,
    padding,
    ...props
}: React.ComponentProps<typeof Container> &
    VariantProps<typeof cardVariants>) => {
    return (
        <Container
            className={cn(cardVariants({ variant, padding, className }))}
            {...props}
        />
    )
}

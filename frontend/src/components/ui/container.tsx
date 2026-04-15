import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const containerVariants = cva("flex flex-col", {
    variants: {
        gap: {
            0: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-8",
            xl: "gap-16",
            "2xl": "gap-32"
        },
        layout: {
            true: "max-w-layout mx-auto w-full px-4"
        },
        flexRow: {
            true: "flex-row"
        }
    },
    defaultVariants: {
        gap: "md",
        layout: false,
        flexRow: false
    }
})

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType
} & VariantProps<typeof containerVariants>

export const Container = ({
    className,
    as: Component = "div",
    gap,
    layout,
    flexRow,
    ...props
}: ContainerProps) => {
    return (
        <Component
            className={cn(
                containerVariants({
                    gap,
                    layout,
                    flexRow,
                    className
                })
            )}
            {...props}
        />
    )
}

import type { VariantProps } from "class-variance-authority"
import { Link as RouterLink } from "react-router-dom"
import { buttonVariants } from "./button"

export const Link = ({
    className,
    variant = "default",
    size = "default",
    to,
    animation,
    ...props
}: React.ComponentProps<typeof RouterLink> &
    VariantProps<typeof buttonVariants>) => {
    const isString = typeof to === "string"

    const isExternal = isString && /^(https?:)?\/\//.test(to)

    const isHash = isString && to.startsWith("#")

    const isSpecial = isString && /^(mailto:|tel:)/.test(to)

    const classes = buttonVariants({
        variant,
        size,
        animation,
        className
    })

    if (isExternal || isHash || isSpecial) {
        return <a href={to} className={classes} {...props} />
    }

    return <RouterLink to={to} className={classes} {...props} />
}

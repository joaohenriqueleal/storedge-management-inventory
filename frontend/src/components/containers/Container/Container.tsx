import type { ContainerProps } from "./Container.types"

export default function Container({ ...props }: ContainerProps) {
    return <div {...props} />
}

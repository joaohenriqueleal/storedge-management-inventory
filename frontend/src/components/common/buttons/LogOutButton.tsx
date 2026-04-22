import { useNavigate } from "react-router-dom"

import { deleteCredentials } from "@/lib/storageCredentials"
import { FaSignOutAlt } from "react-icons/fa"
import { Button } from "@/components/ui"


interface LogOutButtonProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogOutButton({ setAuthenticated } : LogOutButtonProps) {
    const navigate = useNavigate()

    const logOut = () => {
        deleteCredentials()
        setAuthenticated(false)
        navigate('/')
    }

    return (
        <Button
            className="dark:bg-red-600/40 p-6 flex gap-3 text-md cursor-pointer
                dark:hover:bg-red-500/40"
            onClick={logOut}
        >
            Sair <FaSignOutAlt />
        </Button>
    )
}

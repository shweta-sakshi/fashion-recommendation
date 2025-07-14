import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const CheckAuth = ({ children, protectedRoute }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (protectedRoute) {
            if (!token) {
                navigate("/login")
            } else {
                setLoading(false)
            }
        } else {
            if (token) {
                navigate("/dashboard")
            } else {
                setLoading(false)
            }
        }

    }, [navigate, protectedRoute])

    if (loading) {
        return <div>loading.....</div>
    }
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {children}
                <Toaster position="top-center" />
            </ThemeProvider>
        </>
    )

}

export default CheckAuth;
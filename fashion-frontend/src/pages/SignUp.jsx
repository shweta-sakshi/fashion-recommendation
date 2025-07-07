import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Minimum six character is required"),
})

export function SignUp() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, data);
            console.log("Response from sign-up API: ", response);

            response.data.success === true
                ? toast.success("Account Created", {
                    description: response.data.message,
                })
                : toast.error("Account creation failed", {
                    description: response.data.message,
                });

            router.replace(`/login`);
            setIsSubmitting(false);
        } catch (e) {
            console.error("Error creating account", e);

            const axiosError = e;
            const errorMessage =
                axiosError.response?.data.message ||
                "An error occurred while creating account";
            toast.error("Account creation failed", { description: errorMessage });

            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-5">
                <div className="col-span-1 row-span-5 ">
                    <BackgroundGradientAnimation>
                        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
                            <p className="bg-clip-text text-transparent drop-shadow-xl bg-gradient-to-b from-white/80 to-white/20">
                                Create Your AI-Powered Wardrobe
                            </p>
                        </div>
                    </BackgroundGradientAnimation>
                </div>
                <div className="col-span-1 row-span-5 flex justify-center items-center">
                    <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-11">
                        <div className="border-r-1 border-b-1 border-b-gray-300 border-r-gray-300 p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg bg-white/5 backdrop-blur-xl">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                            Join Fashion
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                                            Create your account
                                        </p>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base lg:text-lg">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your email"
                                                        {...field}
                                                        className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base lg:text-lg">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        {...field}
                                                        className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-4 flex justify-center">
                                        <HoverBorderGradient
                                            containerClassName="rounded-full w-50"
                                            as="button"
                                            type="submit"
                                            className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 w-full"
                                        >
                                            <span className="flex flex-row items-center">
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
                                                    </>
                                                ) : (
                                                    "Sign Up"
                                                )}
                                            </span>
                                        </HoverBorderGradient>
                                    </div>
                                </form>
                            </Form>
                            <div className="text-center mt-5">
                                <p>
                                    Already a member?{" "}
                                    <Link to="/login" className="ml-2 text-blue-600 hover:text-blue-800">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

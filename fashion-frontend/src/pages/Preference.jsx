import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
    hairstyle: z.string().min(),
    jewels: z.string().min(),
    topwear: z.string().min(),
    bottomwear: z.string().min(),
    footwear: z.string().min(),
    handbag: z.string().min()
})

export function Preference() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hairstyle: "any",
            jewels: "not found of jewels",
            topwear: "any",
            bottomwear: "any",
            footwear: "any",
            handbag: "don't like handbags"
        },
    })

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token')

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/preference/create`, data, {
                headers: {
                    authorization: token
                }
            })

            response.data.success === true
                ? toast.success("Preference saved", {
                    description: response.data.message,
                })
                : toast.error("Try again", {
                    description: response.data.message,
                })

        } catch (e) {
            console.error("Error creating account", e);

            const axiosError = e;
            const errorMessage =
                axiosError.response?.data.message ||
                "An error occurred while saving your preference";
            toast.error("process failed", { description: errorMessage });
        }
    }

    return (
        <>
            <div className="col-span-1 row-span-5 flex justify-center items-center">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-11">
                    <div className="border-r-1 border-b-1 border-b-gray-300 border-r-gray-300 p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg bg-white/5 backdrop-blur-xl">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                        My, Preference
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                                        mention your preference
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="hairstyle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Hair Style</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Hairstyle you prefer"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jewels"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Jewels</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="don't like it/minimal"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="topwear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Top Wear</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="full sleeves with collor"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bottomwear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Bottom Wear</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Non printed flared"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="footwear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Foot Wear</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="flats"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="handbag"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">Hand Bag</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="small"
                                                    {...field}
                                                    className="w-full h-12 lg:h-14 text-base lg:text-lg"
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
                                        <span>Save</span>
                                    </HoverBorderGradient>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

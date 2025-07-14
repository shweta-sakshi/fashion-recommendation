import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import { toast } from "sonner";
import FaceAnalysisStudio from "@/components/Skintone";

const formSchema = z.object({
    faceshape: z.string().min(),
    gender: z.string().min(),
    bodyshape: z.string().min(),
    skintonecolor: z.string().min(),
    region: z.string().min(),
    weather: z.string().min()
})

export function Measurement() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            faceshape: "",
            gender: "",
            bodyshape: "",
            skintonecolor: "",
            region: "",
            weather: ""
        },
    })

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token')
        const tone = localStorage.getItem('skintone')

        if (!tone) {
            toast.error("Try again", {
                description: "set your skintone",
            })
            return
        }
        data.skintonecolor = tone

        try {
            console.log(data);

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/measurement/create`, data, {
                headers: {
                    authorization: token
                }
            })

            response.data.success === true
                ? toast.success("Measurement saved", {
                    description: response.data.message,
                })
                : toast.error("Try again", {
                    description: response.data.message,
                })

        } catch (e) {
            console.error("Error saving your menasurement details", e);

            const axiosError = e;
            const errorMessage =
                axiosError.response?.data.message ||
                "An error occurred while saving your measurement details";
            toast.error("process failed", { description: errorMessage });
        } finally {
            localStorage.removeItem('skintone')
        }
    }

    return (
        <>
            <div className="col-span-1 row-span-5 mt-23 flex justify-center items-center">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-11">
                    <div className="border-r-1 border-b-1 border-b-gray-300 border-r-gray-300 p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg bg-white/5 backdrop-blur-xl">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                        Your Measurement
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                                        get more personalised suggestion
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="faceshape"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">faceshape</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your faceshape"
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
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">gender</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your gender"
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
                                    name="bodyshape"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">bodyshape</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your bodyshape"
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
                                    name="skintonecolor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">skintonecolor</FormLabel>
                                            <AlertDialogForSkinToneDetection {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">region</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your region"
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
                                    name="weather"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base lg:text-lg">weather</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your weather"
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


const AlertDialogForSkinToneDetection = () => {
    return (
        <AlertDialog className="mt-25">
            <AlertDialogTrigger asChild>
                <button variant="outline" className="border-1 p-2 w-40">Analyse</button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0 w-fit h-fit max-w-none border-0 bg-transparent shadow-none">
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <FaceAnalysisStudio />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

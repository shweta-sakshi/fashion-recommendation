import { Textarea } from "@/components/ui/textarea"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Howitwork from "./Helppage/Howitwork";
import BodyMeasurementGuide from "./Helppage/BodyMeasurementGuide";
import FaceShapeGuide from "./Helppage/FaceShapeGuide";
import Fashioninfo from "./Helppage/Fashioninfo";

const formSchema = z.object({
    description: z.string()
})

const Dashboard = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: ""
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/ai/generatestyle`, data, {
                headers: {
                    authorization: `${localStorage.getItem("token")}`
                }
            });

            response.data.success === true
                ? toast.success("style generated", {
                    description: response.data.message,
                })
                : toast.error("fail to generate", {
                    description: response.data.message,
                });


            //array of ai response
            const organisedResponse = [
                response.data.details.summary,
                response.data.details.helpfulNotes,
                response.data.details.relatedStyles
            ]

            console.log("Organised Response 2: ", organisedResponse);

            localStorage.setItem("fashion", organisedResponse);

            router(`/outfitlist`);
            setIsSubmitting(false);
        } catch (e) {
            console.error("Error generating style", e.message);

            const axiosError = e;
            const errorMessage =
                axiosError.response?.data.message ||
                "An error occurred while generating style";
            toast.error("style generation failed", { description: errorMessage });

            setIsSubmitting(false);
        }
    }

    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="p-4 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-20 w-full">
                <div className="max-w-3xl w-full rounded-3xl p-8 lg:p-14">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8 ">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base lg:text-lg">Describe your style in mind</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your description about style"
                                                {...field}
                                                className="w-full h-12 lg:h-14 text-base lg:text-lg"
                                                required
                                                autoFocus
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
                                    className="dark:bg-black dark:hover:bg-purple-950 bg-white text-black dark:text-white flex items-center justify-center space-x-2 w-full"
                                >
                                    <span className="flex flex-row items-center">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Generatin...
                                            </>
                                        ) : (
                                            "Generate Style"
                                        )}
                                    </span>
                                </HoverBorderGradient>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="w-full h-full py-20">
                <h2
                    className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                    Get to know your iSad.
                </h2>
                <Carousel items={cards} />
            </div>
        </div>
    )
}

export default Dashboard

const data = [
    {
        category: "How it works",
        title: "See what you have to do.",
        src: "https://media.istockphoto.com/id/1133508700/photo/women-hand-using-smartphone-do-online-selling-for-people-shopping-online-in-black-friday-with.jpg?s=2048x2048&w=is&k=20&c=ZJ7jKr8TmsmVH4829E80pCGBDe2BLb7fUlrUXeLvtrs=",
        content: <Howitwork />,
    },
    {
        category: "Body shape",
        title: "Know your body shape",
        src: "https://images.unsplash.com/photo-1675270444770-1a6d1f69aefc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <BodyMeasurementGuide />,
    },
    {
        category: "Face shape",
        title: "Know your face shape",
        src: "https://images.unsplash.com/photo-1727386245205-2112b722af99?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <FaceShapeGuide />,
    },

    {
        category: "Information",
        title: "Know more about us",
        src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D",
        content: <Fashioninfo />,
    },
];
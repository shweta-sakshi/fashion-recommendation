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

            console.log("Response from style generating API: ", response);

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


const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                        <p
                            className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },

    {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "iOS",
        title: "Photography just got better.",
        src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "Hiring for a Staff Software Engineer",
        src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
];

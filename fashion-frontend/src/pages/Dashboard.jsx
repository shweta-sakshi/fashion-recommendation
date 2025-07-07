import { Textarea } from "@/components/ui/textarea"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import React from 'react'

const Dashboard = () => {

    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    const handleGenerate = () => {

    }

    return (
        <div className="p-4 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-20 w-screen">
                <Textarea className="" />
                <div className="tooltip flex flex-col justify-center items-center p-1 group w-40 rounded-2xl  h-10 m-15">
                    <div className="tooltip-content">
                        <div className="opacity-0 group-hover:opacity-100 animate-bounce text-blue-400 border-2 rounded-3xl p-1 -rotate-9 text-xl font-black">Go ahead!</div>
                    </div>
                    <button onClick={handleGenerate} className="btn border-b-1 border-b-white rounded-4xl bg-blue-900 shadow-blue-700 shadow-md hover:bg-blue-950 bg-gradient-to-r text-white  p-4">Generate Style</button>
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

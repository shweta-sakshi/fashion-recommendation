import { createAgent, gemini } from "@inngest/agent-kit";

const analyseFashion = async (prefer) => {
    const SupportAgent = createAgent({
        model: gemini({
            model: "gemini-2.0-flash",
            apikey: process.env.GEMINI_API_KEY
        }),

        name: "Fashion Style Assistant",
        system: `You are an expert Fashion assistant that processes the user preference and skin tone. 

                Your job is to:
                1. Suggest style.
                2. Estimate its color.
                3. Provide Short Summary.
                4. List relevant dress or style can follow.

                IMPORTANT:
                - Respond with *only* valid raw JSON.
                - Do NOT include markdown, code fences, comments, or any extra formatting.
                - The format must be a raw JSON object.

                Repeat: Do not wrap your output in markdown or code fences.`
    })

    const response = await SupportAgent.run(`You are a fashion stylist agent. Only return a strict JSON object with no extra text, headers, or markdown.                              
                Analyze the following support ticket and provide a JSON object with:                      
                - summary: A short 1-2 sentence summary of the user preference which matches here.                     
                - helpfulNotes: A detailed style and color explanation that a user can use to decide what to wear. Include useful examples image of personality using that style if possible.                     
                - relatedStyles: An array of relevant dress that to fit the user (e.g., ["flare jeans", "fitted top", "hills", "middle partition your hair"]).
                                    
                Respond ONLY in this JSON format and do not include any other text or markdown in the answer:                      
                {                   "summary": "Short summary of the user prefered style(don't exceed more than 7 lines)",
                                    "helpfulNotes": "Here are useful tips...",
                                    "relatedStyles": [["flare jeans color black or blue", "fitted top color pink or purple", "hills black", "middle partition your hair"], [..other style which suits]]                     
                }   
                -----------------
                User Preference:                     
                -Gender: ${prefer.gender ? prefer.gender : "for both male and female gender"},
                -Body shape:${prefer.bodyshape ? prefer.bodyshape : "not mentioned"},
                -Face shape:${prefer.faceshape ? prefer.faceshape : "not mentioned"}
                -Top: ${prefer.topwear ? prefer.topwear : "not mentioned"},   
                -Bottom: ${prefer.bottomwear ? prefer.bottomwear : "not mentioned"},
                -Footware: ${prefer.footware ? prefer.footware : "not mentioned"},
                -Skintone: ${prefer.skintonecolor ? prefer.skintonecolor : "not mentioned"},
                -Jewels: ${prefer.jewels ? prefer.jewels : "not mentioned"}
                -HairStyle: ${prefer.hairstyle ? prefer.hairstyle : "not mentioned"},
                -HandBags:${prefer.handbag ? prefer.handbag : "not mentioned"},
                -Description: ${prefer.description}`);

    const raw = response.output[0].context ||
        response.output[0].content ||
        response.output[0].text ||
        response.output[0];


    try {
        const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        const jsonString = match ? match[1] : raw.trim()

        return JSON.parse(jsonString)

    } catch (error) {
        return null
    }
}

export default analyseFashion
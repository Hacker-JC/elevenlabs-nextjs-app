import { NextResponse } from "next/server";

const AGENT_ID_MAP = {
    en: process.env.ELEVENLABS_AGENT_ID_EN,
    hi: process.env.ELEVENLABS_AGENT_ID_HI,
    fr: process.env.ELEVENLABS_AGENT_ID_FR,
};

export async function POST(request) {
    // Get language from request body
    const { language } = await request.json();

    if (!language) {
        return NextResponse.json(
            { error: "Language is required" },
            { status: 400 }
        );
    }

    // Get the appropriate agent ID based on language
    const agentId = AGENT_ID_MAP[language];

    if (!agentId) {
        return NextResponse.json(
            {
                error: `Invalid language or agent not configured for: ${language}`,
            },
            { status: 400 }
        );
    }
    const { XI_API_KEY } = process.env;

    if (!XI_API_KEY) {
        console.error("Missing XI_API_KEY required environment variable.");
        return NextResponse.json(
            { error: "Server configuration error." },
            { status: 500 }
        );
    }

    const url = `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`;
    const options = {
        method: "GET",
        headers: {
            "xi-api-key": XI_API_KEY,
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(
                `Failed to get signed URL from ElevenLabs: ${response.status} ${errorBody}`
            );
            return NextResponse.json(
                {
                    error: "Failed to get signed URL from ElevenLabs.",
                    details: errorBody,
                },
                { status: response.status }
            );
        }

        const body = await response.json();
        // The key in the response from ElevenLabs is 'signed_url'
        return NextResponse.json({ url: body.signed_url });
    } catch (error) {
        console.error(
            "An error occurred while fetching the signed URL:",
            error
        );
        return NextResponse.json(
            { error: "An internal server error occurred." },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";

export async function GET() {
    const { XI_API_KEY, ELEVENLABS_AGENT_ID } = process.env;

    if (!XI_API_KEY || !ELEVENLABS_AGENT_ID) {
        console.error("Missing required environment variables.");
        return NextResponse.json(
            { error: "Server configuration error." },
            { status: 500 }
        );
    }

    const url = `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${ELEVENLABS_AGENT_ID}`;
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

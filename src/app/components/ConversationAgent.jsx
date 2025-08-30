"use client";

import { useState, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";

export default function ConversationAgent() {
    const [uiState, setUiState] = useState("disconnected");
    const [statusMessage, setStatusMessage] = useState(
        "Click the button to begin."
    );

    const conversation = useConversation({
        onConnect: () => {
            console.log("Connection is ready.");
            setUiState("connected");
            setStatusMessage("Connection ready. You can start speaking now!");
        },
        onMessage: (message) => {
            console.log("Received message:", message);
        },
        onDisconnect: () => {
            console.log("Connection disconnected.");
            setUiState("disconnected");
            setStatusMessage("Disconnected. Click to start again.");
        },
        onError: (error) => {
            console.error("Connection error:", error);
            setUiState("disconnected");
            setStatusMessage(`An error occurred: ${error.message}`);
        },
    });

    const handleStartConversation = async () => {
        setUiState("connecting");
        setStatusMessage("Connecting...");

        try {
            // Fetch the signed URL from the API route
            const response = await fetch("/api/get-signed-url");

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(
                    `Failed to get signed URL: ${response.status} ${errorDetails}`
                );
            }

            const data = await response.json();
            const signedUrl = data.url;
            console.log("signedUrl:" , signedUrl);
            // Start the conversation session with the signed URL
            await conversation.startSession({
                signedUrl,
                connectionType: "websocket",
            });
        } catch (error) {
            console.error("Error starting conversation:", error);
            setUiState("disconnected");
            setStatusMessage(`Error: ${error.message}`);
        }
    };

    const handleEndConversation = async () => {
        if (conversation) {
            setUiState("disconnecting");
            setStatusMessage("Disconnecting...");
            console.log("Ending session...");
            await conversation.endSession();
        }
    };

    // Button states based on UI state
    const isStartButtonDisabled = uiState !== "disconnected";
    const isEndButtonDisabled = uiState !== "connected";
    const showStartButton =
        uiState === "disconnected" || uiState === "connecting";
    const showEndButton =
        uiState === "connected" || uiState === "disconnecting";

    return (
        <div className="conversation-container">
            <h1>ElevenLabs Conversational Agent</h1>
            <div className="button-container">
                {showStartButton && (
                    <button
                        id="startButton"
                        onClick={handleStartConversation}
                        disabled={isStartButtonDisabled}
                        className="start-button"
                    >
                        Start Conversation
                    </button>
                )}
                {showEndButton && (
                    <button
                        id="closeButton"
                        onClick={handleEndConversation}
                        disabled={isEndButtonDisabled}
                        className="close-button"
                    >
                        End Conversation
                    </button>
                )}
            </div>
            <div className="status">{statusMessage}</div>
        </div>
    );
}

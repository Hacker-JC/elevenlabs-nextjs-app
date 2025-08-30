"use client";

import { useState, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "fr", name: "French" },
];

export default function ConversationAgent() {
    const [uiState, setUiState] = useState("disconnected");
    const [statusMessage, setStatusMessage] = useState(
        "Click the button to begin."
    );
    const [selectedLanguage, setSelectedLanguage] = useState("en");

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
            // Send POST request with language in the body
            const response = await fetch("/api/get-signed-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language: selectedLanguage,
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(
                    `Failed to get signed URL: ${response.status} ${errorDetails}`
                );
            }

            const data = await response.json();
            const signedUrl = data.url;
            console.log("signedUrl:", signedUrl);
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

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        console.log("Language selected:", e.target.value);
    };

    // Button states based on UI state
    const isStartButtonDisabled = uiState !== "disconnected";
    const isEndButtonDisabled = uiState !== "connected";
    const showStartButton =
        uiState === "disconnected" || uiState === "connecting";
    const showEndButton =
        uiState === "connected" || uiState === "disconnecting";
    const isLanguageSelectDisabled = uiState !== "disconnected";

    return (
        <div className="conversation-container">
            <h1>ElevenLabs Conversational Agent</h1>

            <div className="language-selector">
                <label htmlFor="language-select">Select Language: </label>
                <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    disabled={isLanguageSelectDisabled}
                    className="language-dropdown"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>

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

            {uiState === "connected" && (
                <div className="active-language">
                    Active Language:{" "}
                    <strong>
                        {
                            LANGUAGES.find((l) => l.code === selectedLanguage)
                                ?.name
                        }
                    </strong>
                </div>
            )}
        </div>
    );
}

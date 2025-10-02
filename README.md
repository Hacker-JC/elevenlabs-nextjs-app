# ElevenLabs NextJS Conversational Agent

A modern web application that allows users to have voice-based conversations with ElevenLabs AI agents in multiple languages (English, Hindi, and French).

## Features

- **Multilingual Support**: Switch between English, Hindi, and French conversations
- **Voice-Based Interaction**: Real-time voice conversations with ElevenLabs AI agents
- **WebSocket Integration**: Uses WebSocket connections for smooth real-time communication
- **Responsive UI**: Clean and intuitive user interface with status feedback

## Technology Stack

- **Frontend**: Next.js 15.5.2 with React 19.1.0
- **Styling**: CSS with responsive design
- **API Integration**: ElevenLabs Conversational AI API
- **Communication**: WebSocket for real-time voice interaction

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/Hacker-JC/elevenlabs-nextjs-app.git
cd elevenlabs-nextjs-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your ElevenLabs API credentials:
```
XI_API_KEY=your_api_key_here
ELEVENLABS_AGENT_ID_EN=your_english_agent_id
ELEVENLABS_AGENT_ID_HI=your_hindi_agent_id
ELEVENLABS_AGENT_ID_FR=your_french_agent_id
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Language Selection**: Choose your preferred language (English, Hindi, or French)
2. **Start Conversation**: Click the "Start Conversation" button to initialize the connection
3. **Voice Interaction**: Once connected, speak to the AI agent in your selected language
4. **End Session**: Click "End Conversation" to terminate the session

## Environment Variables

This project requires the following environment variables:

| Variable | Description |
|----------|-------------|
| XI_API_KEY | Your ElevenLabs API key |
| ELEVENLABS_AGENT_ID_EN | Agent ID for English conversations |
| ELEVENLABS_AGENT_ID_HI | Agent ID for Hindi conversations |
| ELEVENLABS_AGENT_ID_FR | Agent ID for French conversations |

## Project Structure

```
elevenlabs-nextjs-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── get-signed-url/ - Backend endpoint for ElevenLabs API
│   │   ├── components/
│   │   │   └── ConversationAgent.jsx - Main conversation component
│   │   ├── globals.css - Global styling
│   │   ├── layout.jsx - App layout
│   │   └── page.tsx - Main page component
├── .env.example - Example environment variables
├── package.json - Project dependencies
└── README.md - Project documentation
```

## License

This project is open source and available under the MIT license.

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Uses [ElevenLabs](https://elevenlabs.io/) for conversational AI
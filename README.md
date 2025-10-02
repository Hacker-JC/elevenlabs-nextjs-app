# ElevenLabs NextJS Conversational AI Demo

This project demonstrates how to integrate [ElevenLabs](https://elevenlabs.io) Conversational AI capabilities with a Next.js application. It allows users to have voice conversations with AI agents in multiple languages.

## 🚀 Features

- **Real-time Voice Conversations**: Interact with ElevenLabs AI agents through voice
- **Multilingual Support**: Choose between English, Hindi, and French conversations
- **WebSocket Integration**: Uses ElevenLabs WebSocket API for efficient real-time communication
- **Simple User Interface**: Clean UI for starting/stopping conversations and selecting languages

## 🔧 Tech Stack

- **Frontend**: Next.js, React, CSS
- **API**: ElevenLabs Conversational AI API
- **Communication**: WebSocket for real-time audio streaming

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- ElevenLabs API key (sign up at [elevenlabs.io](https://elevenlabs.io))
- ElevenLabs agent IDs for each supported language

## 🛠️ Setup & Configuration

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/elevenlabs-nextjs-app.git
   cd elevenlabs-nextjs-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the project root with your API keys:
   ```
   XI_API_KEY=your_elevenlabs_api_key
   ELEVENLABS_AGENT_ID_EN=your_english_agent_id
   ELEVENLABS_AGENT_ID_HI=your_hindi_agent_id
   ELEVENLABS_AGENT_ID_FR=your_french_agent_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧰 How It Works

1. The application uses the ElevenLabs React SDK (`@elevenlabs/react`) to manage WebSocket connections
2. When a user selects a language and starts a conversation, the app requests a signed URL from the ElevenLabs API
3. The signed URL is used to establish a WebSocket connection for real-time audio streaming
4. Users can speak to the AI agent and hear responses in their chosen language
5. The connection can be terminated at any time

## 📝 Learn More

- [ElevenLabs Documentation](https://docs.elevenlabs.io)
- [ElevenLabs React SDK](https://www.npmjs.com/package/@elevenlabs/react)
- [Next.js Documentation](https://nextjs.org/docs)

## 📜 License

This project is MIT Licensed.
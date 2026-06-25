# Spotify AI-Native MVP Architecture

Based on the goal of increasing meaningful music discovery, we are adopting a decoupled architecture using Vercel for the frontend and FastAPI (Python) for the backend processing, powered by Gemini 2.5 Flash.

## 5-Phase Implementation Architecture

### Phase 1: Foundation & Data Engineering
**Goal:** Establish the underlying data and project scaffolding.
- **Work:**
  - Initialize the backend repository.
  - Load the user-provided rich mock dataset (containing tracks, artists, genres, energy/danceability scores, and vibe descriptors).
  - Set up environment variables for the Gemini API key.

### Phase 2: AI Agent & Backend API (FastAPI/Python)
**Goal:** Build the "brain" of the application.
- **Work:**
  - Set up a FastAPI server to handle requests.
  - Integrate **Gemini 2.5 Flash** using the official SDK for fast, multi-modal reasoning.
  - Implement the core AI logic: 
    - *Intent Parsing:* AI interprets user prompts (e.g., "upbeat jazz").
    - *Search/Filter:* AI queries the mock database based on the parsed intent.
    - *Response Generation:* AI returns the curated tracklist alongside conversational explanations for its choices.

### Phase 3: Premium Frontend UI (Vercel/Next.js)
**Goal:** Create a visually stunning, Spotify-like user interface.
- **Work:**
  - Initialize a Next.js (or Vite React) project for Vercel deployment.
  - Implement a sleek, dark-mode design system (Tailwind CSS or Vanilla CSS).
  - Build the core components: Chat interface for the AI Sommelier, mock Track List view, and a static music player widget at the bottom.

### Phase 4: Integration & Interactivity
**Goal:** Connect the UI with the AI brain.
- **Work:**
  - Wire up the frontend chat interface to send requests to the Python backend API.
  - Handle loading states (showing a typing indicator while Gemini processes the request).
  - Render the AI's response dynamically, formatting the text explanations and displaying the suggested tracks as playable/clickable UI elements.
  - Enable multi-turn conversation (e.g., allowing the user to say "make it faster" and passing conversation history to Gemini).

### Phase 5: Polish, Optimization & Deployment
**Goal:** Finalize the MVP for production release.
- **Work:**
  - Add micro-animations (hover effects, smooth transitions) to make the app feel "alive" and premium.
  - Implement error handling (e.g., if the AI can't find matching tracks).
  - Deploy the frontend application to **Vercel**.
  - Deploy the Python backend to a platform like Render.
  - Final end-to-end testing.

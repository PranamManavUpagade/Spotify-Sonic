import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv

# Import the search logic we built in Phase 1
from data import search_tracks

# Load environment variables
load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key and api_key != "your_api_key_here":
    genai.configure(api_key=api_key)

app = FastAPI()

# Allow CORS so the Vercel frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class PromptRequest(BaseModel):
    prompt: str

class Track(BaseModel):
    track_id: str
    track_name: str
    artists: str
    album_name: str
    track_genre: str
    popularity: int
    duration_ms: int

class RecommendResponse(BaseModel):
    conversational_response: str
    tracks: list[dict]

# --- Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Spotify AI-Native Backend API is running. API Key Status: " + ("Set" if api_key and api_key != "your_api_key_here" else "Not Set")}

@app.post("/api/recommend", response_model=RecommendResponse)
async def recommend(request: PromptRequest):
    if not api_key or api_key == "your_api_key_here":
         raise HTTPException(status_code=500, detail="Gemini API Key not set. Please update the .env file.")

    # ---------------------------------------------------------
    # STEP 1: Intent Parsing (Gemini 2.5 Flash)
    # ---------------------------------------------------------
    model = genai.GenerativeModel('gemini-2.5-flash')
    parse_prompt = f"""
    You are an expert music curator's assistant. Parse the following user request and extract the parameters needed to search a music database.
    
    User Request: "{request.prompt}"
    
    Return ONLY a valid JSON object with the following keys. Use reasonable defaults if not explicitly mentioned in the prompt:
    - "genre" (string or null): Try to map the vibe to a common genre like 'pop', 'rock', 'acoustic', 'jazz', 'electronic', 'hip-hop'.
    - "min_danceability" (float, 0.0 to 1.0): default to 0.2, increase if user wants upbeat/dance music.
    - "max_energy" (float, 0.0 to 1.0): default to 1.0, lower it if the user wants chill/relaxing music.
    """
    
    try:
        response = model.generate_content(
            parse_prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        params = json.loads(response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse intent with Gemini: {str(e)}")
        
    genre = params.get("genre")
    min_dance = params.get("min_danceability", 0.0)
    max_eng = params.get("max_energy", 1.0)
    
    # ---------------------------------------------------------
    # STEP 2: Search / Filter Tracks
    # ---------------------------------------------------------
    tracks = search_tracks(genre=genre, min_danceability=min_dance, max_energy=max_eng, limit=5)
    
    if not tracks:
        return {
            "conversational_response": "I couldn't find any tracks matching that exact vibe right now. Could you try adjusting your request?",
            "tracks": []
        }
        
    # ---------------------------------------------------------
    # STEP 3: Conversational Response Generation
    # ---------------------------------------------------------
    track_info = "\n".join([f"- {t['track_name']} by {t['artists']} (Genre: {t['track_genre']})" for t in tracks])
    curator_prompt = f"""
    You are "Spotify Sonic", an AI Music Sommelier. The user asked: "{request.prompt}"
    
    You have curated the following tracklist for them:
    {track_info}
    
    Write a brief, conversational, and enthusiastic response explaining *why* you chose these specific tracks based on their vibe. 
    Keep it under 3 sentences. Do NOT list the tracks out again (they are displayed in the UI). Speak directly to the user like a friend showing them new music.
    """
    
    try:
        curator_response = model.generate_content(curator_prompt)
        text_response = curator_response.text
    except Exception as e:
        text_response = "Here is a hand-picked selection of tracks based on your vibe!"
        
    return {
        "conversational_response": text_response,
        "tracks": tracks
    }
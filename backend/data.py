import pandas as pd
import random

# Load dataset globally
df = pd.read_csv('dataset.csv')
# The dataset has an unnamed index column at position 0, let's drop it if it exists
if 'Unnamed: 0' in df.columns:
    df = df.drop(columns=['Unnamed: 0'])

# Drop rows with NaN in important fields
df = df.dropna(subset=['track_name', 'artists', 'track_genre'])

def search_tracks(genre: str = None, min_danceability: float = 0.0, max_energy: float = 1.0, limit: int = 5):
    """
    Search the local mock dataset for tracks matching the AI's intent parameters.
    """
    query_df = df.copy()
    
    if genre:
        # Some tracks have multiple genres or slightly different names, we do a basic string match
        query_df = query_df[query_df['track_genre'].str.contains(genre, case=False, na=False)]
        
    query_df = query_df[(query_df['danceability'] >= min_danceability) & (query_df['energy'] <= max_energy)]
    
    # Sort by popularity to give "good" recommendations, or sample randomly for discovery
    if not query_df.empty:
        # Let's take the top 50 matches by popularity, and pick a random sample of `limit` to ensure variety (discovery!)
        top_matches = query_df.sort_values(by='popularity', ascending=False).head(50)
        sample_size = min(limit, len(top_matches))
        results = top_matches.sample(n=sample_size).to_dict('records')
        return results
    return []

if __name__ == "__main__":
    # Test the data loader
    print("Testing search_tracks for 'acoustic' genre with high danceability...")
    results = search_tracks(genre='acoustic', min_danceability=0.6, limit=2)
    for r in results:
        print(f"{r['track_name']} by {r['artists']} (Pop: {r['popularity']}, Dance: {r['danceability']})")

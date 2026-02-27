// TasteDive API service - proxied through backend function

export interface Movie {
  Name: string;
  Type: string;
  wTeaser?: string;
  wUrl?: string;
  yUrl?: string;
  yID?: string;
}

export interface TasteDiveResponse {
  Similar: {
    Info: Movie[];
    Results: Movie[];
  };
}

export const fetchSimilarMovies = async (query: string): Promise<Movie[]> => {
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const params = new URLSearchParams({ q: query });
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/tastedive-proxy?${params}`,
      { headers: { 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}` } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result: TasteDiveResponse = await response.json();
    return result.Similar.Results;
  } catch (error) {
    console.warn("TasteDive proxy error, using fallback data:", error);
    return getFallbackMovies(query);
  }
};

export const getMovieThumbnail = (movie: Movie): string => {
  if (movie.yID) {
    return `https://img.youtube.com/vi/${movie.yID}/hqdefault.jpg`;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(movie.Name)}/300/450`;
};

// Fallback data when API is unavailable

function getFallbackMovies(query: string): Movie[] {
  const hash = query.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const allMovies = [
    { Name: "The Prestige", Type: "movie", yID: "o4gHRs8CS7Q" },
    { Name: "Memento", Type: "movie", yID: "4CV41hoyS8A" },
    { Name: "Shutter Island", Type: "movie", yID: "5iaYLCiq5DU" },
    { Name: "The Departed", Type: "movie", yID: "iUFMmSEBmjg" },
    { Name: "Prisoners", Type: "movie", yID: "bpXfcTF6iVk" },
    { Name: "Nightcrawler", Type: "movie", yID: "X8RhIm6GOEU" },
    { Name: "Sicario", Type: "movie", yID: "G8tlEbvmvaU" },
    { Name: "Whiplash", Type: "movie", yID: "7d_jQycdQGo" },
    { Name: "Drive", Type: "movie", yID: "KBiOF3y1W0Y" },
    { Name: "Zodiac", Type: "movie", yID: "yNncHPl1UXg" },
    { Name: "The Social Network", Type: "movie", yID: "lB95KLmpLR4" },
    { Name: "Gone Girl", Type: "movie", yID: "2-_-1nJf8Vg" },
    { Name: "Ex Machina", Type: "movie", yID: "EoQuVnKhxaM" },
    { Name: "Arrival", Type: "movie", yID: "tFMo3UJ4B4g" },
    { Name: "Annihilation", Type: "movie", yID: "89OP78l9oF0" },
    { Name: "The Witch", Type: "movie", yID: "iQXmlf3Sefg" },
    { Name: "Get Out", Type: "movie", yID: "DzfpyUB60YY" },
    { Name: "Hereditary", Type: "movie", yID: "V6wWKNij_1M" },
    { Name: "Midsommar", Type: "movie", yID: "1Vnghdsjmd0" },
    { Name: "Parasite", Type: "movie", yID: "5xH0HfJHsaY" },
    { Name: "Jojo Rabbit", Type: "movie", yID: "tL4McUzXfFI" },
    { Name: "1917", Type: "movie", yID: "YqNYrYUiMfg" },
    { Name: "Knives Out", Type: "movie", yID: "qGqiGp2O9Ig" },
    { Name: "The Lighthouse", Type: "movie", yID: "Hyag7lR8CPA" },
  ];

  // Shuffle based on query to get different results per category
  const shuffled = [...allMovies].sort((a, b) => {
    const aHash = (a.Name.charCodeAt(0) + hash) % allMovies.length;
    const bHash = (b.Name.charCodeAt(0) + hash) % allMovies.length;
    return aHash - bHash;
  });

  return shuffled.slice(0, 12);
}

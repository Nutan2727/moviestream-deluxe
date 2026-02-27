import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSimilarMovies, getMovieThumbnail, type Movie } from "@/services/tastedive";

interface MovieRowProps {
  title: string;
  seed: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnail = getMovieThumbnail(movie);

  return (
    <div className="group relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10">
      <div className="relative aspect-[2/3] rounded overflow-hidden bg-secondary">
        <img
          src={imgError ? `https://picsum.photos/seed/${encodeURIComponent(movie.Name)}/300/450` : thumbnail}
          alt={movie.Name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h4 className="text-foreground text-sm font-semibold leading-tight">
            {movie.Name}
          </h4>
          {movie.wTeaser && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-3">
              {movie.wTeaser}
            </p>
          )}
        </div>
      </div>
      {/* Title below card */}
      <p className="text-muted-foreground text-xs mt-2 truncate group-hover:text-foreground transition-colors">
        {movie.Name}
      </p>
    </div>
  );
};

const MovieRow = ({ title, seed }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", seed],
    queryFn: () => fetchSimilarMovies(seed),
    staleTime: 1000 * 60 * 30,
  });

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 md:px-12 mb-8 animate-fade-in">
      <h3 className="text-foreground text-lg md:text-xl font-semibold mb-3">
        {title}
      </h3>

      <div className="group/row relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-8 z-10 w-10 flex items-center justify-center bg-background/50 opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        {/* Movies */}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] aspect-[2/3] rounded bg-secondary animate-pulse"
                />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.Name} movie={movie} />
              ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-8 z-10 w-10 flex items-center justify-center bg-background/50 opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;

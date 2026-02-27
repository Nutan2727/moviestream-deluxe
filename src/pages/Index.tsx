import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import { MOVIE_CATEGORIES } from "@/config/api";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />
      <div className="-mt-24 relative z-10 pb-16">
        {MOVIE_CATEGORIES.map((category) => (
          <MovieRow
            key={category.title}
            title={category.title}
            seed={category.seed}
          />
        ))}
      </div>
      {/* Footer */}
      <footer className="px-4 md:px-12 py-12 text-muted-foreground text-xs">
        <p className="mb-4">Powered by TasteDive API</p>
        <p>© 2026 MovieFlix. A Netflix-inspired movie discovery app.</p>
      </footer>
    </div>
  );
};

export default Index;

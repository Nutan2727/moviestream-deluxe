import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroBanner}
        alt="Featured movie backdrop"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-left)" }}
      />

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-lg animate-fade-in">
        <h2 className="font-display text-5xl md:text-7xl tracking-wide text-foreground mb-3">
          DISCOVER MOVIES
        </h2>
        <p className="text-sm md:text-base text-secondary-foreground leading-relaxed mb-6 line-clamp-3">
          Explore personalized recommendations powered by TasteDive. Find your
          next favorite film from thousands of curated suggestions based on what
          you love.
        </p>
        <div className="flex items-center gap-3">
          <Button className="bg-foreground text-background hover:bg-foreground/80 font-semibold px-6 py-2 rounded-sm flex items-center gap-2">
            <Play className="w-5 h-5 fill-current" />
            Play
          </Button>
          <Button className="bg-muted/70 text-foreground hover:bg-muted font-semibold px-6 py-2 rounded-sm flex items-center gap-2">
            <Info className="w-5 h-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/");
      } else {
        if (!username.trim()) {
          toast.error("Username is required");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: username.trim() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <h1
          className="font-display text-primary text-5xl tracking-wider text-center mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MOVIEFLIX
        </h1>

        {/* Auth Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border">
          <h2 className="text-foreground text-2xl font-semibold mb-6">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                  maxLength={50}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                minLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base rounded-sm"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <p className="text-muted-foreground text-sm mt-6">
            {isLogin ? "New to MovieFlix?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-foreground hover:underline font-medium"
            >
              {isLogin ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

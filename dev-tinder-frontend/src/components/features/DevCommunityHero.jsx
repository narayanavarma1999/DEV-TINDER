import { useState, useEffect } from 'react';

const FEATURE_CARDS = [
  {
    emoji: '👨‍💻',
    title: 'Code Like You',
    color: 'primary',
    description: 'Find collaborators who speak your tech stack'
  },
  {
    emoji: '🧠',
    title: 'Think Like You',
    color: 'secondary',
    description: 'Align with developers who share your mindset'
  },
  {
    emoji: '🎶',
    title: 'Vibe Like You',
    color: 'accent',
    description: 'Connect beyond just the code'
  }
];

const LANGUAGES = ['JavaScript', 'Python', 'TypeScript', 'Go', 'Rust', 'Java'];

export default function DevCommunityHero() {
  const [loaded, setLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);

  useEffect(() => {
    setLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentLanguage(prev => (prev + 1) % LANGUAGES.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-150 to-base-200 flex items-center justify-center p-4 overflow-hidden">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-16">
          {/* Hero Title Section */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
              Find Your <span className="underline decoration-wavy decoration-secondary/50">Coding Partner</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-content/90 max-w-2xl mx-auto relative">
              From <span className="font-mono bg-neutral/20 px-3 py-1 rounded-lg border border-neutral/30 shadow-inner hover:bg-neutral/30 transition-colors duration-300">git commit</span> messages to <span className="relative inline-block group">
                <span className="relative z-10">real connections</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-secondary/30 -rotate-1 -skew-x-6 z-0 group-hover:bg-secondary/50 group-hover:h-3 transition-all duration-300"></span>
              </span>
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center px-4">
            <div className="stats shadow-lg bg-base-200/50 backdrop-blur-sm border border-base-300/50 w-full max-w-2xl">
              <div className="stat place-items-center">
                <div className="stat-title text-neutral-content/80">Language</div>
                <div className="stat-value text-primary">
                  <span className="animate-pulse">{LANGUAGES[currentLanguage]}</span>
                </div>
                <div className="stat-desc text-neutral-content/60">you speak</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title text-neutral-content/80">Developers</div>
                <div className="stat-value text-secondary">10K+</div>
                <div className="stat-desc text-neutral-content/60">already connected</div>
              </div>
              
              <div className="stat place-items-center">
                <div className="stat-title text-neutral-content/80">Projects</div>
                <div className="stat-value text-accent">5K+</div>
                <div className="stat-desc text-neutral-content/60">collaborated on</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            {FEATURE_CARDS.map((card, index) => (
              <div 
                key={index}
                className={`card bg-base-300/50 hover:bg-base-300/70 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300/30 hover:border-${card.color}/30 group h-full`}
              >
                <div className="card-body items-center text-center p-8">
                  <span className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {card.emoji}
                  </span>
                  <h3 className={`card-title text-${card.color} mb-3 text-2xl`}>
                    {card.title}
                  </h3>
                  <p className="text-neutral-content/80 text-lg">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/10 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
const steps = [
  {
    emoji: "🔍",
    title: "Browse & Pick",
    description: "Scroll through 25+ awesome games. Filter by vibes, player count, or how complex you're feeling!",
    color: "bg-info/20 border-info/30",
  },
  {
    emoji: "💸",
    title: "Book & Pay",
    description: "Reserve your pick, pay via UPI, and screenshot that receipt. Easy peasy!",
    color: "bg-warning/20 border-warning/30",
  },
  {
    emoji: "🎮",
    title: "Pick Up & Play",
    description: "Admin gives the thumbs up, you grab your game. Return on time = no drama!",
    color: "bg-success/20 border-success/30",
  },
  {
    emoji: "🎉",
    title: "Join the Party",
    description: "Saturday nights = game nights! Meet cool people, discover new favorites!",
    color: "bg-primary/20 border-primary/30",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-5xl mb-4 block animate-bounce-in">🎯</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            From browsing to playing in four easy steps! No stress, just fun 🌈
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
              )}
              
              <div className={`${step.color} border-2 border-dashed rounded-3xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-elevated h-full`}>
                {/* Step Number */}
                <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full gradient-purple text-white flex items-center justify-center font-display font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                {/* Emoji */}
                <div className="text-5xl mb-4 group-hover:animate-wiggle">
                  {step.emoji}
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

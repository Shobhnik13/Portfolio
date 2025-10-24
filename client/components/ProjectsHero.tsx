export default function ProjectsHero() {
    return (
        <div className="w-full flex flex-col items-center justify-start pt-32">
            {/* Main heading */}
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-6xl md:text-7xl font-light text-center mb-4 text-balance">
                projects
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-8">
                So here’s a little showcase of projects I build for fun, learning, and experimenting.
            </p>

            {/* Bottom border as a separate div */}
            <div className="w-full h-[1px] bg-border mt-20" />
        </div>
    )
}

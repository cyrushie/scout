export function ScoutMascot({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${animated ? "animate-wave" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Scout's body - friendly bug shape */}
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="currentColor" opacity="0.9" />

        {/* Scout's head */}
        <circle cx="50" cy="30" r="18" fill="currentColor" />

        {/* Eyes */}
        <circle cx="44" cy="28" r="3" fill="white" />
        <circle cx="56" cy="28" r="3" fill="white" />
        <circle cx="45" cy="27.5" r="1.5" fill="black" />
        <circle cx="57" cy="27.5" r="1.5" fill="black" />

        {/* Friendly smile */}
        <path d="M 43 34 Q 50 38 57 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Antennae */}
        <line x1="42" y1="15" x2="38" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="58" y1="15" x2="62" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="38" cy="8" r="3" fill="currentColor" />
        <circle cx="62" cy="8" r="3" fill="currentColor" />

        {/* Legs */}
        <line x1="30" y1="60" x2="20" y2="75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="65" x2="30" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="65" x2="70" y2="80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="60" x2="80" y2="75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Spots */}
        <circle cx="45" cy="55" r="3" fill="white" opacity="0.4" />
        <circle cx="55" cy="60" r="2.5" fill="white" opacity="0.4" />
      </svg>
    </div>
  )
}

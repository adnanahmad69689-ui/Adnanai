/**
 * Animated pipeline SVG overlay shown over workflow card images.
 * Nodes: API (left) → two middle nodes → OUT (right), with dashed paths
 * and pulsing traveling dots in accent + cyan.
 */
export function PipelineOverlay({ sub = false }: { sub?: boolean }) {
  return (
    <div className="pipeline-overlay" aria-hidden="true">
      <svg
        className="pipeline-svg"
        viewBox="0 0 200 90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={sub ? "glow-sub" : "glow"}>
            <feGaussianBlur result="coloredBlur" stdDeviation="2" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id={sub ? "pathGrad-sub" : "pathGrad"}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#a8ff3e" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#a8ff3e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a8ff3e" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          className="pipeline-path"
          d="M25,45 L95,20 L175,45"
          style={sub ? { stroke: "url(#pathGrad-sub)" } : undefined}
        />
        <path
          className="pipeline-path"
          d="M25,45 L95,70 L175,45"
          style={sub ? { stroke: "url(#pathGrad-sub)" } : undefined}
        />
        <path className="pipeline-path pipeline-path-vert" d="M95,20 L95,70" />
        <circle
          className="pipeline-node"
          cx="25"
          cy="45"
          fill="#0a0a0a"
          filter={sub ? "url(#glow-sub)" : "url(#glow)"}
          r="8"
          stroke="#a8ff3e"
          strokeWidth="2"
        />
        <circle
          className="pipeline-node"
          cx="95"
          cy="20"
          fill="#0a0a0a"
          filter={sub ? "url(#glow-sub)" : "url(#glow)"}
          r="6"
          stroke="#a8ff3e"
          strokeWidth="2"
        />
        <circle
          className="pipeline-node"
          cx="95"
          cy="70"
          fill="#0a0a0a"
          filter={sub ? "url(#glow-sub)" : "url(#glow)"}
          r="6"
          stroke="#a8ff3e"
          strokeWidth="2"
        />
        <circle
          className="pipeline-node"
          cx="175"
          cy="45"
          fill="#0a0a0a"
          filter={sub ? "url(#glow-sub)" : "url(#glow)"}
          r="8"
          stroke="#a8ff3e"
          strokeWidth="2"
        />
        <circle className="pipeline-node-inner" cx="25" cy="45" fill="#a8ff3e" r="2.5" />
        <circle className="pipeline-node-inner" cx="95" cy="20" fill="#a8ff3e" r="2" />
        <circle className="pipeline-node-inner" cx="95" cy="70" fill="#a8ff3e" r="2" />
        <circle className="pipeline-node-inner" cx="175" cy="45" fill="#a8ff3e" r="2.5" />
        <circle className="pipeline-dot dot-1" fill="#a8ff3e" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="60" cy="32" />
        <circle className="pipeline-dot dot-2" fill="#a8ff3e" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="135" cy="32" />
        <circle className="pipeline-dot dot-3" fill="#a8ff3e" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="60" cy="58" />
        <circle className="pipeline-dot dot-4" fill="#a8ff3e" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="135" cy="58" />
        <circle className="pipeline-dot dot-5" fill="#00eaff" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="95" cy="45" />
        <circle className="pipeline-dot dot-6" fill="#00eaff" filter={sub ? "url(#glow-sub)" : "url(#glow)"} r="3" cx="95" cy="70" />
        <text
          dominantBaseline="central"
          fill="#fff"
          fontSize="7"
          fontWeight="600"
          textAnchor="middle"
          x="25"
          y="45"
        >
          API
        </text>
        <text
          dominantBaseline="central"
          fill="#fff"
          fontSize="7"
          fontWeight="600"
          textAnchor="middle"
          x="175"
          y="45"
        >
          OUT
        </text>
      </svg>
    </div>
  );
}

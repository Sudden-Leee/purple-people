const glints = [
  { x: 82, y: 48, size: 14, delay: "0s" },
  { x: 58, y: 96, size: 10, delay: "1.1s" },
  { x: 252, y: 66, size: 11, delay: "0.8s" },
  { x: 292, y: 122, size: 15, delay: "1.8s" },
  { x: 220, y: 190, size: 10, delay: "2.7s" },
  { x: 268, y: 258, size: 13, delay: "1.4s" },
  { x: 148, y: 318, size: 11, delay: "2.4s" },
];

const flecks = [
  { cx: 112, cy: 62, rx: 4.6, ry: 1.8, delay: "0.5s" },
  { cx: 158, cy: 82, rx: 8, ry: 2.5, delay: "1.4s" },
  { cx: 198, cy: 124, rx: 5.8, ry: 2.1, delay: "2.8s" },
  { cx: 92, cy: 166, rx: 6.8, ry: 2.3, delay: "2s" },
  { cx: 258, cy: 154, rx: 9.2, ry: 2.8, delay: "0.9s" },
  { cx: 306, cy: 74, rx: 5.8, ry: 2, delay: "2.4s" },
  { cx: 232, cy: 228, rx: 7.6, ry: 2.4, delay: "1.9s" },
  { cx: 286, cy: 306, rx: 6.2, ry: 2, delay: "0.7s" },
  { cx: 176, cy: 360, rx: 8.4, ry: 2.6, delay: "3.1s" },
];

export function SparkleOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 360 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="#FFF8DE">
        {flecks.map((fleck) => (
          <ellipse
            key={`${fleck.cx}-${fleck.cy}`}
            className="sparkle-fleck"
            cx={fleck.cx}
            cy={fleck.cy}
            rx={fleck.rx}
            ry={fleck.ry}
            style={{ animationDelay: fleck.delay }}
          />
        ))}
      </g>
      <g stroke="#FFF8DE" strokeLinecap="round">
        {glints.map((glint) => (
          <g
            key={`${glint.x}-${glint.y}`}
            className="sparkle-glint"
            transform={`translate(${glint.x} ${glint.y})`}
            style={{ animationDelay: glint.delay, transformOrigin: `${glint.x}px ${glint.y}px` }}
          >
            <path d={`M0 ${-glint.size}V${glint.size}`} strokeWidth="1.35" />
            <path d={`M${-glint.size * 0.58} 0H${glint.size * 0.58}`} strokeWidth="1.35" />
          </g>
        ))}
      </g>
    </svg>
  );
}

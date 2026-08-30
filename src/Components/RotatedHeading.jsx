// Word-by-word rotated headline — a core Rokad signature.
// Pass words as [{ text, deg, cls?, color? }] or a plain string (auto-slight split).
export default function RotatedHeading({ words, as: Tag = "h2", className = "", color }) {
  const items =
    typeof words === "string"
      ? words.split(" ").map((t, i) => {
          // Very subtle alternating rotations: ±0.5deg pattern
          const pattern = i % 4;
          const deg = pattern === 0 ? 0.5
                    : pattern === 1 ? -0.5
                    : pattern === 2 ? 0.5
                    : -0.5;
          return { text: t, deg };
        })
      : words;
  return (
    <Tag className={`headline ${className}`} style={color ? { color } : undefined}>
      {items.map((w, i) => (
        <span
          key={i}
          className={`word ${w.cls ?? ""}`}
          style={{
            transform: `rotate(${w.deg ?? 0}deg)`,
            transition: "transform 0.3s ease",
            color: w.color ?? undefined,
          }}
        >
          {w.text}
        </span>
      ))}
    </Tag>
  );
}

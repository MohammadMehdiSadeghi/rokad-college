// Word-by-word rotated headline — a core Rokad signature.
// Pass words as [{ text, deg }] or a plain string (auto-slight split).
export default function RotatedHeading({ words, as: Tag = "h2", className = "", color }) {
  const items =
    typeof words === "string"
      ? words.split(" ").map((t, i) => ({
          text: t,
          deg: i % 2 === 0 ? (i % 4 === 0 ? 1.5 : -1.5) : i % 3 === 0 ? 2 : -1,
        }))
      : words;
  return (
    <Tag className={`headline ${className}`} style={color ? { color } : undefined}>
      {items.map((w, i) => (
        <span
          key={i}
          className="word"
          style={{
            transform: `rotate(${w.deg ?? 0}deg)`,
            transition: "transform 0.3s ease",
          }}
        >
          {w.text}
        </span>
      ))}
    </Tag>
  );
}

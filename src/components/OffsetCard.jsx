// Two-layer offset "sticker" card — Rokad signature.
// Back layer is a solid rect offset down-right (RTL-correct); never box-shadow.
export default function OffsetCard({
  children,
  className = "",
  backColor = "var(--shadow-ink)",
  radius = "cut-tl-br",
  rotate = "rotate-3",
  shadowOffset = 5,
  style,
  ...rest
}) {
  return (
    <div className={`relative ${rotate}`} style={style} {...rest}>
      <div
        aria-hidden="true"
        className={`offset-back ${radius}`}
        style={{ background: backColor, top: shadowOffset, left: shadowOffset }}
      />
      <div className={`offset-card ${radius} ${className}`}>{children}</div>
    </div>
  );
}

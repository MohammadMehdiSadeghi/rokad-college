// Two-layer brand button with the Rokad offset-shadow + tilt signature.
export default function BrandButton({
  children,
  href = "#",
  variant = "primary", // primary | teal | white | amber | ghost
  size = "",
  rotate = "rotate-minus",
  className = "",
}) {
  const variantClass = {
    primary: "btn-primary",
    teal: "btn-teal",
    white: "btn-white",
    amber: "btn-amber",
    ghost: "btn-ghost",
  }[variant];
  return (
    <span className={`btn-wrap ${rotate}`}>
      <div aria-hidden="true" className="offset-back" style={{ background: "var(--shadow-ink)" }} />
      <a href={href} className={`btn ${variantClass} ${size} ${className}`}>
        {children}
      </a>
    </span>
  );
}

// Rokad wordmark — navy "رُکاد" + amber "COLLEGE" accent (college-primary branding).
export default function Logo({ withWord = true, size = 40 }) {
  return (
    <a href="#top" className="logo" aria-label="رکاد — کالج" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "14px 0 14px 0",
          background: "var(--college)",
          border: "2.75px solid var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontWeight: 950,
          fontSize: size * 0.5,
          lineHeight: 1,
        }}
      >
        R
      </span>
      {withWord && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <strong style={{ fontSize: 20, color: "var(--navy)", fontWeight: 950 }}>رُکاد</strong>
          <span style={{ fontSize: 10, color: "var(--college-dark)", fontWeight: 700, letterSpacing: 2 }}>ROKAD COLLEGE</span>
        </span>
      )}
    </a>
  );
}

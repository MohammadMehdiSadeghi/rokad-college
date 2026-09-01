// Rokad wordmark — white "Sign W" logo on college background + amber "COLLEGE" accent.
export default function Logo({ withWord = true, size = 40 }) {
  return (
    <a
      href="#top"
      className="logo"
      aria-label="رکاد — کالج"
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "14px 0 14px 0",
          background:
            "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)",
          border: "2.75px solid var(--ink)",
          boxShadow: "3px 3px 0 var(--ink), 0 4px 12px rgba(248,164,29,0.25)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          padding: size * 0.14,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src="/assets/Shared/Logos/logo-white-512.png"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>
      {withWord && (
        <span
          style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
        >
          <strong
            style={{ fontSize: 20, color: "var(--navy)", fontWeight: 950 }}
          >
            رکاد
          </strong>
          <span
            style={{
              fontSize: 10,
              color: "var(--college-dark)",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            ROKAD COLLEGE
          </span>
        </span>
      )}
    </a>
  );
}

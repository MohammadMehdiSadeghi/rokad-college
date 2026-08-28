import { features } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container section-inner">
        <div className="text-center" style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}>
          <span className="tag tag-navy" style={{ marginBottom: "var(--space-6)" }}>ویژگی‌های کالج رکاد</span>
          <RotatedHeading words="یادگیری که از کلاس فراتر می‌رود" className="t-section" color="var(--navy)" />
        </div>
        <div className="grid-4">
          {features.map((f, i) => (
            <OffsetCard key={f.title} backColor="var(--ink)" radius="cut-tl-br" rotate={i % 2 ? "rotate-3" : "rotate-minus3"} className="">
              <div style={{ background: "var(--bg-neutral)", padding: "var(--space-6)", minHeight: 240, display: "flex", flexDirection: "column" }}>
                <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font)", fontWeight: 950, fontSize: 28, color: "#0000001f", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="tag tag-amber" style={{ alignSelf: "flex-start", marginTop: 24, marginBottom: "var(--space-4)" }}>{f.badge}</span>
                <h3 className="t-card" style={{ color: "var(--ink)", marginBottom: "var(--space-3)", fontWeight: 900 }}>{f.title}</h3>
                <p className="t-sm" style={{ color: "var(--ink-subtle)" }}>{f.text}</p>
              </div>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  );
}

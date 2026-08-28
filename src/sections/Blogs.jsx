import { blogs } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

export default function Blogs() {
  return (
    <section className="section" id="blog">
      <div className="container section-inner">
        <div className="text-center" style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}>
          <span className="tag tag-purple" style={{ marginBottom: "var(--space-6)" }}>وبلاگ رکاد</span>
          <RotatedHeading words={blogs.title} className="t-section" color="var(--navy)" />
        </div>
        <div className="grid-3">
          {blogs.items.map((b, i) => (
            <OffsetCard key={b.title} backColor="var(--ink)" radius="cut-tl-br" rotate={i % 2 ? "rotate-3" : "rotate-minus3"}>
              <div style={{ background: "#fff", padding: "var(--space-6)", minHeight: 240, display: "flex", flexDirection: "column" }}>
                <div className="icon-badge" style={{ width: 44, height: 44, fontSize: 22, marginBottom: "var(--space-4)" }}>📝</div>
                <h3 className="t-card" style={{ color: "var(--ink)", marginBottom: "var(--space-3)", fontWeight: 900 }}>{b.title}</h3>
                <p className="t-sm" style={{ color: "var(--ink-subtle)", marginBottom: "var(--space-6)", flex: 1 }}>{b.text}</p>
                <a href="#blog" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }}>{b.cta}</a>
              </div>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  );
}

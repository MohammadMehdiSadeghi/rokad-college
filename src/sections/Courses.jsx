import { courses } from "../data/content.js";
import OffsetCard from "../components/OffsetCard.jsx";
import RotatedHeading from "../components/RotatedHeading.jsx";

const tagClass = (cat) => {
  if (cat === "فناوری اطلاعات") return "tag tag-teal";
  if (cat === "گرافیک") return "tag tag-purple";
  if (cat === "زبان و MBA") return "tag tag-amber";
  return "tag tag-navy";
};

export default function Courses() {
  return (
    <section className="section" id="courses">
      <div className="container section-inner">
        <div className="text-center" style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto" }}>
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-6)" }}>دوره‌های کالج رکاد</span>
          <RotatedHeading words="از فناوری و گرافیک تا زبان و مدیریت" className="t-section" color="var(--navy)" />
        </div>
        <div className="grid-3">
          {courses.map((c, i) => (
            <OffsetCard key={c.title} backColor="var(--ink)" radius="cut-tl-br" rotate={i % 2 ? "rotate-3" : "rotate-minus3"} className="">
              <div style={{ background: "#fff", padding: "var(--space-6)", minHeight: 260, display: "flex", flexDirection: "column" }}>
                <span className={tagClass(c.category)} style={{ alignSelf: "flex-start", marginBottom: "var(--space-4)" }}>{c.category}</span>
                <h3 className="t-card" style={{ color: "var(--ink)", marginBottom: "var(--space-3)", fontWeight: 900 }}>{c.title}</h3>
                <p className="t-sm" style={{ color: "var(--ink-subtle)", marginBottom: "var(--space-6)" }}>{c.text}</p>
                <a href="#courses" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start", marginTop: "auto" }}>{c.cta}</a>
              </div>
            </OffsetCard>
          ))}
        </div>
      </div>
    </section>
  );
}

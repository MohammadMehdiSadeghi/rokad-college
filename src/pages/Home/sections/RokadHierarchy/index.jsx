import "./rokadHierarchy.css";

/* سه شاخهٔ اکوسیستم رکاد — رنگ‌بندی جنسیتی دیزاین سیستم:
   پسرها = سبز (ecosystem) · دخترها = صورتی (female) · مشترک = کهربایی (college) */
const branches = [
  {
    id: "education",
    category: "EDUCATION",
    title: "کالج رکاد",
    desc: "مسیر یادگیری ساختاریافته با اساتید مسلط و پروژه‌های واقعی — مشترک برای همه.",
    cardClass: "card-education",
    link: "#courses-index",
  },
  {
    id: "boys",
    category: "BOYS",
    title: "هنرستان پسرانه",
    desc: "مسیر یادگیری ویژهٔ پسران با منتورشیپ تخصصی و پروژه‌های واقعی.",
    cardClass: "card-boys",
    link: "#panel",
  },
  {
    id: "girls",
    category: "GIRLS",
    title: "هنرستان دخترانه",
    desc: "محیط اختصاصی دختران — شبکه‌سازی، رویدادها و یادگیری در فضایی گرم و پویا.",
    cardClass: "card-girls",
    link: "#panel",
  },
];

export default function RokadHierarchy() {
  return (
    <section className="rokad-hierarchy-section" id="rokad-hierarchy">
      <div className="rokad-hierarchy-container">
        {/* Header: Badge, Title & Colored Subtitle */}
        <header className="rokad-hierarchy-header">
          <div className="rokad-hierarchy-title-col">
            <div className="rokad-hierarchy-badge">
              <span className="rokad-hierarchy-badge-dot" aria-hidden="true" />
              <span>اکوسیستم رکاد</span>
            </div>

            <h2 className="rokad-hierarchy-title">
              <span>
                رکاد، <span className="highlight-teal">فراتر</span> از یک
              </span>
              <span className="highlight-pink">مدرسه</span>
            </h2>
          </div>

          <div className="rokad-hierarchy-desc-col">
            <p className="rokad-hierarchy-desc">
              رکاد یک اکوسیستم آموزشی سه‌شاخه‌ای است. هر شاخه یک نقش دارد:{" "}
              <span className="hl-orange">آموزش</span>،{" "}
              <span className="hl-teal">پسران</span> و{" "}
              <span className="hl-pink">دختران</span>.
            </p>
          </div>
        </header>

        {/* 3 Branches Grid */}
        <div className="rokad-hierarchy-grid">
          {branches.map((b) => (
            <article key={b.id} className={`rokad-branch-card ${b.cardClass}`}>
              <div className="rokad-branch-top">
                <span className="rokad-branch-badge">{b.category}</span>
              </div>

              <div className="rokad-branch-content">
                <h3 className="rokad-branch-title">{b.title}</h3>
                <p className="rokad-branch-desc">{b.desc}</p>
              </div>

              <div className="rokad-branch-footer">
                <a href={b.link} className="rokad-branch-btn">
                  <span>ورود به شاخه</span>
                  <svg
                    className="rokad-branch-arrow"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

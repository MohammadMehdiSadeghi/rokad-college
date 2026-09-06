/* V3 — Editorial Magazine */
import PatternLayer from "@/components/PatternLayer";
import { articles } from "@/data/blogArticles";

export default function Blogs() {
  return (
    <section className="section mag-section" id="blog">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        {/* Section heading */}
        <div className="mag-head">
          <div className="left">
            <h2 className="mag-title">
              <span className="w w1">تیتر</span>
              <span className="w w2">اول</span>
              <span className="w w3">این ماه</span>
            </h2>
          </div>
          <div className="right">
            <a href="#blog-index" className="mag-btn">
              <svg
                className="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              دنبال‌کردن مجله
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mag-grid">
          {articles.map((a) => (
            <article className="mag-card" key={a.slug}>
              <div className="shadow" />
              <div className="body">
                <div className="cover">
                  <span className="num">{a.num}</span>
                  <span className="glyph-lg">{a.glyph}</span>
                </div>
                <div className="info">
                  <div className="cat-row">
                    <span className="cat">{a.cat}</span>
                    <span className="read-time">{a.readTime}</span>
                  </div>
                  <h3>
                    <a href={`#article/${a.slug}`} className="mag-title-link">
                      {a.title}
                    </a>
                  </h3>
                  <p>{a.excerpt}</p>
                  <div className="foot">
                    <div className="author-mini">
                      <span className="dot">{a.initial}</span>
                      <span>{a.author}</span>
                    </div>
                    <a href={`#article/${a.slug}`} className="go">
                      مطالعه
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

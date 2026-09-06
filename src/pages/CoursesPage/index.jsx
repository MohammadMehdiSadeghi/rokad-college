/* ============================================================
   رکاد کالج — صفحهٔ دوره‌ها
   دیزاین: طرح «۱ · فیلتر چسبان» از پک project (8) — با پالت کالج
   ============================================================ */
import { useMemo, useState } from "react";
import {
  courses,
  departments,
  LEVELS,
  MODES,
  SORTS,
  PRICE_MAX,
  toFa,
  formatPrice,
} from "@/data/courses.js";

const ROTATION = ["rotate(-1deg)", "rotate(1deg)", "rotate(-0.5deg)", "rotate(0.5deg)"];
const TAG_CLASS = { college: "college", sec: "sec", girl: "girl" };

export default function CoursesPage() {
  const [mode, setMode] = useState("all");
  const [depts, setDepts] = useState(() => new Set());
  const [levels, setLevels] = useState(() => new Set());
  const [price, setPrice] = useState(PRICE_MAX);
  const [cert, setCert] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");

  const toggleSet = (set, setter, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    const list = courses.filter((c) => {
      if (mode !== "all" && c.mode !== mode) return false;
      if (depts.size > 0 && !depts.has(c.department)) return false;
      if (levels.size > 0 && !levels.has(c.level)) return false;
      if (cert && !c.hasCertificate) return false;
      if ((c.discountPrice || c.price) > price) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.instructor.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sort === "popular") list.sort((a, b) => b.students - a.students);
    if (sort === "newest") list.sort((a, b) => b.id - a.id);
    if (sort === "cheapest") list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [mode, depts, levels, price, cert, search, sort]);

  const reset = () => {
    setMode("all");
    setDepts(new Set());
    setLevels(new Set());
    setPrice(PRICE_MAX);
    setCert(false);
    setSearch("");
    setSort("popular");
  };

  const deptCount = (id) => courses.filter((c) => c.department === id).length;

  return (
    <>
      {/* هدر صفحه */}
      <header className="cp-header">
        <div className="container cp-header-inner">
          <nav className="cp-crumb" aria-label="مسیر">
            <a href="#/">خانه</a>
            <span className="sep">/</span>
            <a href="#courses">کالج</a>
            <span className="sep">/</span>
            <span className="cur">دوره‌ها</span>
          </nav>
          <div className="cp-title-wrap">
            <div>
              <h1 className="cp-title">
                دوره‌های <span className="accent">کالج رکاد</span>
              </h1>
              <p className="cp-lead">۱۸ دوره از دپارتمان‌های مختلف — از طراحی تا کسب‌وکار.</p>
            </div>
            <div className="cp-count-badge">
              <span>{toFa(filtered.length)}</span> دوره فعال
            </div>
          </div>
        </div>
      </header>

      <main className="cp-main">
        {/* ---------- سایدبار فیلترها ---------- */}
        <aside className="cp-side">
          <div className="cp-side-title">
            <span>فیلترها</span>
            <button type="button" className="cp-reset" onClick={reset}>پاک کردن همه</button>
          </div>

          <div className="cp-fgroup">
            <div className="cp-fgroup-title">نوع برگزاری</div>
            <div className="cp-segment">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={mode === m.id ? "on" : ""}
                  onClick={() => setMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cp-fgroup">
            <div className="cp-fgroup-title">دپارتمان‌ها</div>
            <div className="cp-check-list">
              {departments.map((d) => (
                <label className="cp-check-item" key={d.id}>
                  <input
                    type="checkbox"
                    checked={depts.has(d.id)}
                    onChange={() => toggleSet(depts, setDepts, d.id)}
                  />
                  <span className="cp-check-box" />
                  <span className="cp-check-label">{d.name}</span>
                  <span className="cp-check-count">{toFa(deptCount(d.id))}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="cp-fgroup">
            <div className="cp-fgroup-title">سطح</div>
            <div className="cp-check-list">
              {LEVELS.map((l) => (
                <label className="cp-check-item" key={l.id}>
                  <input
                    type="checkbox"
                    checked={levels.has(l.id)}
                    onChange={() => toggleSet(levels, setLevels, l.id)}
                  />
                  <span className="cp-check-box" />
                  <span className="cp-check-label">{l.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="cp-fgroup">
            <div className="cp-fgroup-title">حداکثر قیمت</div>
            <div className="cp-range-wrap">
              <input
                type="range"
                min={1000000}
                max={PRICE_MAX}
                step={500000}
                value={price}
                className="cp-range"
                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              />
              <div className="cp-range-labels">
                <span>۱ میلیون</span>
                <span>۷ میلیون</span>
              </div>
              <div className="cp-range-value">تا {formatPrice(price)}</div>
            </div>
          </div>

          <div className="cp-fgroup">
            <div className="cp-fgroup-title">امکانات</div>
            <div className="cp-check-list">
              <label className="cp-check-item">
                <input type="checkbox" checked={cert} onChange={(e) => setCert(e.target.checked)} />
                <span className="cp-check-box" />
                <span className="cp-check-label">فقط دارای مدرک</span>
              </label>
            </div>
          </div>
        </aside>

        {/* ---------- نتایج ---------- */}
        <section className="cp-results">
          <div className="cp-results-header">
            <div className="cp-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                placeholder="جستجوی دوره یا مدرس..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="cp-sort">
              <span>مرتب‌سازی:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option value={s.id} key={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="cp-empty">هیچ دوره‌ای با این فیلترها پیدا نشد. فیلترها را تغییر دهید.</div>
          ) : (
            <div className="cp-grid">
              {filtered.map((c, i) => (
                <div
                  className={`cp-card ${c.color}`}
                  key={c.id}
                  style={{ "--rot": ROTATION[i % 4] }}
                >
                  {c.tag && (
                    <span className={`cp-tag ${TAG_CLASS[c.tagColor] || ""}`}>{c.tag}</span>
                  )}
                  <div className="cp-card-body">
                    <span className={`cp-mode ${c.mode}`}>{c.modeFa}</span>
                    <div className="cp-dept">{c.departmentFa}</div>
                    <div className="cp-title">{c.title}</div>
                    <div className="cp-instructor">
                      <span className="cp-avatar">{c.instructor.charAt(0)}</span>
                      <span>{c.instructor}</span>
                    </div>
                    <div className="cp-meta">
                      <div>{c.duration}</div>
                      <div>{toFa(c.students)}</div>
                      <div>{toFa(c.rating)}</div>
                    </div>
                    <div className="cp-footer">
                      <div className="cp-price">
                        {c.discountPrice ? (
                          <>
                            <span className="original">{toFa(c.price.toLocaleString("en-US"))}</span>
                            <span className="final">{toFa(c.discountPrice.toLocaleString("en-US"))} ت</span>
                          </>
                        ) : (
                          <span className="final">{toFa(c.price.toLocaleString("en-US"))} ت</span>
                        )}
                      </div>
                      <a className="cp-cta" href="#course/ui-ux">مشاهده</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
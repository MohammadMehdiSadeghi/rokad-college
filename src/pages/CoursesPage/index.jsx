/* ============================================================
   رکاد کالج — صفحهٔ دوره‌ها
   دیزاین: طرح «۱ · فیلتر چسبان» از پک project (8) — با پالت کالج
   ============================================================ */
import { useEffect, useMemo, useRef, useState } from "react";
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

const ROTATION = ["rotate(-0.5deg)", "rotate(0.5deg)", "rotate(-0.25deg)", "rotate(0.25deg)"];
const TAG_CLASS = { college: "college", sec: "sec", girl: "girl" };

export default function CoursesPage({ initialDept }) {
  const [mode, setMode] = useState("all");
  const [depts, setDepts] = useState(() => {
    if (!initialDept) return new Set();
    if (initialDept === "it") return new Set(["coding", "design"]);
    if (initialDept === "business") return new Set(["business", "marketing"]);
    if (departments.some((d) => d.id === initialDept)) return new Set([initialDept]);
    return new Set();
  });
  const [levels, setLevels] = useState(() => new Set());
  const [price, setPrice] = useState(PRICE_MAX);
  const [cert, setCert] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  /* دراپ‌داون سفارشی مرتب‌سازی */
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  /* بستن منوی مرتب‌سازی با کلیک بیرون */
  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

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

  // بستن درِاور فیلتر با Escape و قفل اسکرول بدنه هنگام باز بودن
  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [filterOpen]);

  const filterGroups = (
    <>
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
    </>
  );

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
        {/* ---------- سایدبار فیلترها (دسکتاپ) ---------- */}
        <aside className="cp-side">
          <div className="cp-side-title">
            <span>فیلترها</span>
            <button type="button" className="cp-reset" onClick={reset}>پاک کردن همه</button>
          </div>
          {filterGroups}
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
            <div className="cp-controls">
              <button
                type="button"
                className="cp-filter-btn"
                onClick={() => setFilterOpen(true)}
                aria-haspopup="dialog"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                  <line x1="10" y1="17" x2="14" y2="17" />
                </svg>
                <span>فیلترها</span>
                {(() => {
                  const n = (mode !== "all" ? 1 : 0) + depts.size + levels.size + (cert ? 1 : 0) + (price < PRICE_MAX ? 1 : 0);
                  return n > 0 ? <span className="cp-filter-count">{toFa(n)}</span> : null;
                })()}
              </button>
              {/* مرتب‌سازی — دراپ‌داون سفارشی مثل مجله */}
              <div className="cp-sort" ref={sortRef}>
                <span>مرتب‌سازی:</span>
                <button
                  type="button"
                  className="cp-sort-btn"
                  onClick={() => setSortOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                >
                  {SORTS.find((s) => s.id === sort)?.label} <span className="caret">▼</span>
                </button>
                {sortOpen && (
                  <ul className="cp-sort-menu" role="listbox">
                    {SORTS.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sort === s.id}
                          className={sort === s.id ? "active" : ""}
                          onClick={() => {
                            setSort(s.id);
                            setSortOpen(false);
                          }}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                  <div className="cp-card-cover">
                    <img src={c.image} alt="" aria-hidden="true" loading="lazy" />
                    {c.discountPrice && c.discountPrice < c.price && (
                      <span className="cp-off">
                        {toFa(Math.round((1 - c.discountPrice / c.price) * 100))}٪ تخفیف
                      </span>
                    )}
                  </div>
                  <div className="cp-card-body">
                    <div className="cp-card-head">
                      <div>
                        <div className="cp-dept">{c.departmentFa}</div>
                        <div className="cp-title">{c.title}</div>
                        <div className="cp-instructor">
                          <span className="cp-avatar">{c.instructor.charAt(0)}</span>
                          <span>{c.instructor}</span>
                        </div>
                      </div>
                      <span className={`cp-mode ${c.mode}`}>{c.modeFa}</span>
                    </div>
                    <div className="cp-meta">
                      <div><span className="cp-meta-ico">▤</span>{toFa(c.sessions)} جلسه</div>
                      <div><span className="cp-meta-ico">◔</span>{c.duration}</div>
                      <div><span className="cp-meta-ico">👥</span>{toFa(c.students)}</div>
                      <div className="cp-rate"><span className="cp-meta-ico">★</span>{toFa(c.rating)}</div>
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

      {/* ---------- درِاور فیلتر (فقط موبایل) ---------- */}
      {filterOpen && (
        <div
          className="cp-drawer-scrim"
          onClick={() => setFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="فیلترها"
        >
          <div className="cp-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cp-drawer-head">
              <div className="cp-drawer-actions">
                <button type="button" className="cp-drawer-close" onClick={() => setFilterOpen(false)} aria-label="بستن">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <button type="button" className="cp-reset" onClick={() => { reset(); setFilterOpen(false); }}>پاک کردن همه</button>
              </div>
              <span className="cp-drawer-title">فیلترها</span>
            </div>
            <div className="cp-drawer-body">
              {filterGroups}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
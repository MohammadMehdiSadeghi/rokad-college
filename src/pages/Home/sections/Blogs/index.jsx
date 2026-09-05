/* V3 — Editorial Magazine */
import PatternLayer from "@/components/PatternLayer";

const articles = [
  {
    num: "۰۱",
    glyph: "✦",
    cat: "مسیر شغلی",
    readTime: "۸ دقیقه مطالعه",
    title: "از یک هنرجوی صفر تا اولین قرارداد فریلنسری",
    excerpt:
      "روایت‌های واقعی از هنرجویانی که در کمتر از یک سال، درآمد ماهانه‌شان را از صفر به میلیون‌ها تومان رساندند.",
    author: "کیارش رضایی",
    initial: "ک",
  },
  {
    num: "۰۲",
    glyph: "</>",
    cat: "فرانت‌اند",
    readTime: "۱۲ دقیقه مطالعه",
    title: "چرا JavaScript هنوز اولویت اول تازه‌واردهاست؟",
    excerpt:
      "مقایسهٔ بازار کار و طول یادگیری بین جاوااسکریپت، پایتون و PHP در ایران — به‌همراه دادهٔ واقعی از آگهی‌های استخدام.",
    author: "مریم صالحی",
    initial: "م",
  },
  {
    num: "۰۳",
    glyph: "✎",
    cat: "گرافیک",
    readTime: "۶ دقیقه مطالعه",
    title: "هفت اشتباه رایج در طراحی لوگو که برند شما را می‌کشد",
    excerpt:
      "راهنمایی برای طراحان تازه‌کار و صاحبان کسب‌وکار: چه وقت لوگو کار نمی‌کند و چطور آن را تشخیص دهیم.",
    author: "ایمان کریمی",
    initial: "ا",
  },
  {
    num: "۰۴",
    glyph: "◐",
    cat: "MBA و زبان",
    readTime: "۱۰ دقیقه مطالعه",
    title: "آیا MBA برای نسل جوان ایران ارزش سرمایه‌گذاری دارد؟",
    excerpt:
      "یک نگاه صادقانه به بازگشت سرمایهٔ MBA در بازار کار امروز ایران، بر اساس گفتگو با ۲۰ فارغ‌التحصیل رکاد.",
    author: "نگار موسوی",
    initial: "ن",
  },
];

export default function Blogs() {
  return (
    <section className="section mag-section" id="blog">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />
      <div className="container section-inner">
        {/* Section heading */}
        <div className="mag-head">
          <div className="left">
            <span className="mag-eyebrow">شمارهٔ ۱۲ · مرداد ۱۴۰۴</span>
            <h2 className="mag-title">
              <span className="w w1">تیتر</span>
              <span className="w w2">اول</span>
              <span className="w w3">این ماه</span>
            </h2>
            <p className="mag-desc">
              یک ماهنامهٔ فشرده از بهترین مقاله‌ها، مصاحبه‌ها و تحلیل‌های آموزشی
              رکاد. مطالعه‌ای که در پنج دقیقه شروع می‌شود و در بازار کار
              به‌کار می‌آید.
            </p>
          </div>
          <div className="right">
            <a href="#consult" className="mag-btn">
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
            <article className="mag-card" key={a.num}>
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
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <div className="foot">
                    <div className="author-mini">
                      <span className="dot">{a.initial}</span>
                      <span>{a.author}</span>
                    </div>
                    <a href="#blog" className="go">
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
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import { CompassIcon, FolderOpenIcon, BullseyeIcon, ArrowIcon } from "@/Components/Icons";
import { blogs } from "@/data/content.js";

const [feature, ...minis] = blogs.items;
const miniMeta = [
  { icon: FolderOpenIcon, label: "نمونه‌کار", theme: "var(--teal)" },
  { icon: BullseyeIcon, label: "رشد فردی", theme: "var(--navy)" },
];

const headingWords = [
  { text: "برای", deg: -1.5 },
  { text: "انتخاب", deg: 2 },
  { text: "بهتر، بیشتر", deg: -3 },
  { text: "بدان", deg: 1.5 },
];

export default function BlogSection() {
  return (
    <section className="section" id="blog" style={{ background: "var(--bg-lavender)" }}>
      <div className="container section-inner">
        <div className="section-head">
          <span className="eyebrow-tag">مجلهٔ رُکاد</span>
          <RotatedHeading words={headingWords} className="t-section" />
        </div>

        <div className="blog-grid">
          {/* Featured post */}
          <OffsetCard
            className="blog-feature"
            backColor="var(--navy)"
            radius="cut-tr-bl-lg"
            rotate="rotate-minus1"
            shadowOffset={7}
          >
            <div className="blog-feature-inner">
              <div className="blog-art">
                <span className="blog-art-badge">راهنمای شروع</span>
                <CompassIcon />
                <span className="blog-art-shape blog-art-shape-1" />
                <span className="blog-art-shape blog-art-shape-2" />
              </div>
              <div className="blog-body">
                <span className="blog-meta">{feature.date} · مسیر یادگیری</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <a href="#blog">{feature.cta} <ArrowIcon /></a>
              </div>
            </div>
          </OffsetCard>

          {/* Mini posts */}
          <div className="blog-side">
            {minis.slice(0, 2).map((post, i) => {
              const meta = miniMeta[i % miniMeta.length];
              const Icon = meta.icon;
              return (
                <OffsetCard
                  key={post.title}
                  backColor={meta.theme}
                  borderColor={meta.theme}
                  radius="cut-tr-bl"
                  rotate={i === 0 ? "rotate-2" : "rotate-minus1"}
                  shadowOffset={5}
                >
                  <div className="mini-post-inner">
                    <span className="mini-post-icon"><Icon /></span>
                    <div>
                      <small>{meta.label}</small>
                      <h3>{post.title}</h3>
                      <a href="#blog">{post.cta} <ArrowIcon /></a>
                    </div>
                  </div>
                </OffsetCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
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
  { text: "انتخاب", deg: 2, color: "var(--college)" },
  { text: "بهتر، بیشتر", deg: -3 },
  { text: "بدان", deg: 1.5 },
];

export default function BlogSection() {
  return (
    <section className="section blog-section" id="blog">
      <div className="container section-inner">
        {/* Header — eyebrow right, link left */}
        <div className="section-head section-head-row">
          <div>
            <RotatedHeading words={headingWords} className="t-section" />
          </div>
          <a className="all-courses" href="#blog">همهٔ مقاله‌ها <ArrowIcon width={16} height={16} /></a>
        </div>

        <div className="blog-grid">
          {/* Featured post — white card with amber art */}
          <OffsetCard
            className="blog-feature"
            backColor="var(--ink)"
            borderColor="var(--ink)"
            radius="cut-tr-bl-lg"
            rotate="rotate-minus1"
            shadowOffset={6}
          >
            <div className="blog-feature-inner">
              <div className="blog-art">
                <span className="art-shape art-shape-one" />
                <span className="art-shape art-shape-two" />
              </div>
              <div className="blog-body">
                <span className="blog-meta">{feature.date} · مسیر یادگیری</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <a href="#blog">{feature.cta} <ArrowIcon width={15} height={15} /></a>
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
                  backColor="var(--ink)"
                  borderColor="var(--ink)"
                  radius="cut-tr-bl"
                  rotate={i === 0 ? "rotate-2" : "rotate-minus2"}
                  shadowOffset={5}
                >
                  <div className="mini-post-inner">
                    <span className="mini-post-icon" style={{ background: meta.theme }}><Icon /></span>
                    <div>
                      <small style={{ color: meta.theme }}>{meta.label}</small>
                      <h3>{post.title}</h3>
                      <a href="#blog">{post.cta} <ArrowIcon width={14} height={14} /></a>
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

import { hero } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";
import {
  SparklesIcon, LayerGroupIcon, CommentsIcon, TrendUpIcon,
  CodeIcon, PenRulerIcon, BriefcaseIcon, CheckCircleIcon, ArrowIcon,
} from "@/Components/Icons";

const pattern = "/assets/Hero/Hero-Pattern.png";
const trustPattern = "/assets/Hero/TrustSection-Pattern.png";

const kicker = "ثبت‌نام دوره‌های جدید باز است";

const titleWords = [
  { text: "آینده", deg: -1.5 },
  { text: "از", deg: 2 },
  { text: "اینجا", deg: -3 },
  { text: "شروع", deg: 1.5 },
  { text: "می‌شود!", deg: 2.5 },
];

const chips = [
  { icon: CodeIcon, label: "فناوری", color: "var(--navy)", rot: "-3deg", top: "12%", right: "0" },
  { icon: PenRulerIcon, label: "گرافیک", color: "var(--accent)", rot: "2deg", bottom: "15%", right: "2%" },
  { icon: BriefcaseIcon, label: "کسب‌وکار", color: "var(--teal-dark)", rot: "3deg", top: "18%", left: "-1%" },
  { icon: CheckCircleIcon, label: "پروژه واقعی", color: "var(--college-dark)", rot: "-1.5deg", bottom: "8%", left: "5%" },
];

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        {/* Big amber sticker card — the Hero shell */}
        <div className="hero-shell">
          <div aria-hidden="true" className="hero-shell-back" />
          <div className="hero-shell-card">
            <img src={pattern} alt="" aria-hidden="true" className="hero-shell-pattern" />

            {/* Text column (RTL: right) */}
            <div className="hero-content">
              <span className="hero-kicker">
                <SparklesIcon width={15} height={15} />
                {kicker}
              </span>
              <p className="hero-brandline">{hero.preTitle} — {hero.subtitle}</p>
              <RotatedHeading as="h1" words={titleWords} className="hero-title" />
              <p className="hero-text">{hero.text}</p>

              <div className="hero-buttons">
                <a href="#courses" className="btn btn-primary btn-hero">
                  <LayerGroupIcon width={17} height={17} /> {hero.primaryCta}
                </a>
                <a href="#consult" className="btn btn-white btn-hero">
                  <CommentsIcon width={17} height={17} /> {hero.secondaryCta}
                </a>
              </div>

              <p className="hero-note">
                <span className="double-dot" /> از یادگیری شروع کن، برای آینده آماده شو.
              </p>
            </div>

            {/* Visual column: orbit + career card + chips */}
            <div className="hero-visual" aria-label="نمایش مسیر رشد مهارتی">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />

              <OffsetCard
                className="career-card"
                backColor="var(--navy)"
                radius="cut-tl-br-lg"
                rotate="rotate-2"
                shadowOffset={7}
              >
                <div className="career-card-inner">
                  <span className="career-label">مسیر حرفه‌ای تو</span>
                  <span className="career-icon"><TrendUpIcon /></span>
                  <strong>یاد بگیر<br />بساز<br /><em>وارد بازار شو!</em></strong>
                  <div className="career-progress"><span /></div>
                  <small>از صفر تا حرفه‌ای</small>
                </div>
              </OffsetCard>

              {chips.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <span key={i} className="float-chip" style={{
                    top: chip.top, right: chip.right, left: chip.left, bottom: chip.bottom,
                    "--chip-rot": chip.rot, "--chip-color": chip.color,
                  }}>
                    <Icon width={14} height={14} />
                    {chip.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Trust ribbon */}
          <aside className="trust-ribbon">
            <span className="trust-back" aria-hidden="true" />
            <div className="trust-front">
              <b>کالج مهارت‌محور رکاد</b>
              <span>آموزش کاربردی · پروژه واقعی · مسیر شغلی</span>
              <ArrowIcon />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

import { ArrowIcon } from "@/Components/Icons";

export default function FinalCta() {
  return (
    <section className="section final-cta">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="container final-inner">
        <span className="final-label">یک قدم تا شروع</span>
        <h2 className="final-title">
          <span className="final-word" style={{ "--r": "-3deg" }}>یادگیری</span>{" "}
          <span className="final-word" style={{ "--r": "2deg" }}>را</span>{" "}
          <span className="final-word" style={{ "--r": "-1.5deg" }}>امروز</span>{" "}
          <span className="final-word" style={{ "--r": "3deg" }}>شروع کن.</span>
        </h2>
        <p className="final-text">مسیر حرفه‌ای بعدی تو می‌تواند از همین انتخاب ساده شروع شود.</p>
        <a href="#courses" className="final-btn-wrap">
          <span className="final-btn-back" />
          <span className="final-btn-front">
            مشاهده همه دوره‌ها <ArrowIcon width={16} height={16} />
          </span>
        </a>
      </div>
    </section>
  );
}
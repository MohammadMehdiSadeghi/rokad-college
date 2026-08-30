import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@/Components/Icons";
import { comments } from "@/data/content.js";
import OffsetCard from "@/Components/OffsetCard.jsx";
import RotatedHeading from "@/Components/RotatedHeading.jsx";

import "swiper/css";

// Subtle rotations and colors for comment cards
const themes = [
  { back: "var(--college)", color: "var(--college-dark)", radius: "cut-tl-br", rotate: "rotate-minus1" },
  { back: "var(--navy)",    color: "var(--navy)",        radius: "cut-tr-bl", rotate: "rotate-1" },
  { back: "var(--accent)",  color: "var(--accent-text)", radius: "cut-tl-br", rotate: "rotate-minus1" },
];

function CommentCard({ item, theme }) {
  const t = theme;
  return (
    <OffsetCard
      backColor={t.back}
      radius={t.radius}
      rotate={t.rotate}
      className="animate-fade-in-up"
    >              <div
        style={{
          padding: "var(--space-8) var(--space-6)",
          height: 320,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Quote mark */}
        <div
          style={{
            fontSize: 42,
            color: t.color,
            lineHeight: 1,
            fontWeight: 950,
          }}
          aria-hidden="true"
        >
          "
        </div>

        {/* Comment text */}
        <p
          className="t-sm"
          style={{
            color: "var(--ink)",
            marginBlock: "var(--space-3)",
            lineHeight: 1.9,
            flex: 1,
          }}
        >
          {item.text}
        </p>

        {/* Author info */}
        <div
          style={{
            borderTop: `1.5px dashed ${t.color}`,
            paddingTop: "var(--space-3)",
            marginTop: "var(--space-3)",
          }}
        >
          <p style={{ fontWeight: 900, color: t.color }}>{item.name}</p>
          <p className="t-sm muted">{item.role}</p>
        </div>
      </div>
    </OffsetCard>
  );
}

export default function Comments() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section" id="comments" style={{ background: "var(--college-light)" }}>
      <div className="bg-pattern">
        <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
      </div>
      <div className="container section-inner">
        {/* Section header */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-12)", maxWidth: 760, marginInline: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <span className="tag tag-amber" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            نظرات هنرجویان
          </span>
          <RotatedHeading words={comments.title} className="t-section" color="var(--navy)" />
          <p className="t-body mx-auto" style={{ marginTop: "var(--space-4)" }}>
            {comments.text}
          </p>
        </div>

        {/* ===== CAROUSEL ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          {/* Previous */}
          <div className="blogs-nav-btn-wrap blog-prev">
            <div aria-hidden="true" className="blogs-nav-shadow" />
            <button
              type="button"
              aria-label="نظر قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
              className="blogs-nav-btn"
            >
              <ChevronRightIcon className="blogs-nav-icon" />
            </button>
          </div>

          {/* Swiper — extra vertical padding so shadows aren't clipped */}
          <div style={{ flex: 1, overflow: "hidden", padding: "24px 16px", height: 380 }}>
            <Swiper
              modules={[A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              dir="rtl"
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
            >
              {comments.items.map((c, i) => {
                const t = themes[i % themes.length];
                return (
                  <SwiperSlide key={c.name}>
                    <CommentCard item={c} theme={t} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Next */}
          <div className="blogs-nav-btn-wrap blog-next">
            <div aria-hidden="true" className="blogs-nav-shadow" />
            <button
              type="button"
              aria-label="نظر بعدی"
              onClick={() => swiperRef.current?.slideNext()}
              className="blogs-nav-btn"
            >
              <ChevronLeftIcon className="blogs-nav-icon" />
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: "var(--space-8)",
          }}
        >
          {Array.from({ length: comments.items.length }, (_, i) => (
            <button
              key={i}
              aria-label={`نظر ${i + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              style={{
                width: activeIndex === i ? 28 : 10,
                height: 10,
                borderRadius: 5,
                border: "none",
                background: activeIndex === i ? "var(--college)" : "var(--college-dark)",
                opacity: activeIndex === i ? 1 : 0.3,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

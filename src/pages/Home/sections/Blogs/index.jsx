import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@/common/Icons";

import "swiper/css";

const blogImg = "/assets/Blogs/blog-card-cover.png";
const patternBg = "/assets/Pattern/layout-pattern.png";

const posts = [
  {
    tag: "همه دانش‌آموزان",
    date: "تابستان ۱۴۰۵",
    title: "چطور برای فرزندمون رشته‌ی هنرستان رو انتخاب کنیم؟",
    body: "یه راهنمای عملی برای والدین که می‌خوان بهترین تصمیم رو برای آینده‌ی تحصیلی فرزندشون بگیرن.",
  },
  {
    tag: "دانش‌آموزان هنرستان",
    date: "تابستان ۱۴۰۵",
    title: "چطور برای اولین‌بار وارد بازار کار شی؟",
    body: "قدم‌به‌قدم با تجربه‌ی فارغ‌التحصیلای رکاد که رزومه‌شون رو ساختن و اولین قرارداد کاریشون رو گرفتن.",
  },
  {
    tag: "خانواده‌ها",
    date: "بهار ۱۴۰۵",
    title: "استعدادسنجی؛ اولین قدم مسیر شخصی‌سازی‌شده",
    body: "چرا رکاد قبل از شروع هر چیزی، اول می‌شینه پای حرفت تا مسیر رشدت رو دقیق طراحی کنه.",
  },
  {
    tag: "دانش‌آموزان هنرستان",
    date: "بهار ۱۴۰۵",
    title: "ساخت پروژه‌ی اول؛ از ایده تا اجرا",
    body: "چطور یه پروژه‌ی واقعی رو از صفر شروع کنیم و تا انتها با انگیزه پیش ببریمش.",
  },
  {
    tag: "خانواده‌ها",
    date: "زمستان ۱۴۰۴",
    title: "نقش والدین در انتخاب مسیر شغلی فرزند",
    body: "چه‌جوری بدون فشار زیاد، کنار فرزندمون باشیم تا خودش مسیرش رو پیدا کنه.",
  },
  {
    tag: "همه دانش‌آموزان",
    date: "زمستان ۱۴۰۴",
    title: "مهارت‌هایی که هر هنرجو باید قبل از فارغ‌التحصیلی یاد بگیره",
    body: "لیستی از مهارت‌های عملی که تفاوت رزومه‌ی قوی و ضعیف رو مشخص می‌کنه.",
  },
];

function BlogCard({ tag, date, title, body, rotation = 0 }) {
  return (
    <div
      className="blog-carousel-card"
      style={{
        width: "100%",
        maxWidth: "44rem",
        marginInline: "auto",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Shadow */}
      <div
        aria-hidden="true"
        className="blog-card-shadow"
        style={{
          top: "0.3125rem",
          left: "0.3125rem",
          height: "25.625rem",
        }}
      />

      {/* Card */}
      <article className="blog-carousel-article">
        {/* Image */}
        <img
          src={blogImg}
          alt={title}
          loading="lazy"
          className="blog-card-img"
        />

        {/* Content */}
        <div className="blog-card-content">
          <h4 className="blog-card-title">{title}</h4>

          <p className="blog-card-body">{body}</p>

          {/* Divider */}
          <div className="blog-card-footer">
            <span className="blog-card-date">{date}</span>

            <span className="blog-card-tag">{tag}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Blogs() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="blogs-section" id="blog" dir="rtl">
      {/* Background pattern */}
      <div className="blogs-pattern">
        <img
          src={patternBg}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="blogs-pattern-img"
        />
      </div>

      <div className="blogs-inner">
        {/* ===== HEADER ===== */}
        <div className="blogs-header">
          <h2 className="blogs-heading">
            <span className="blogs-word rotate-3">تازه‌های</span>
            <span className="blogs-word-nav -rotate-3">اکوسیستم</span>
            <span className="blogs-word rotate-3">و</span>
            <span className="blogs-word-magenta rotate-3">آموزش</span>
          </h2>

          {/* Button */}
          <div className="blogs-btn-wrap">
            <div aria-hidden="true" className="blogs-btn-shadow" />
            <a href="#" className="blogs-btn">
              همه مقالات
            </a>
          </div>
        </div>

        {/* ===== CAROUSEL ===== */}
        <div className="blogs-carousel-row">
          {/* Previous */}
          <div className="blogs-nav-btn-wrap blog-prev">
            <div aria-hidden="true" className="blogs-nav-shadow" />
            <button
              type="button"
              aria-label="پست قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
              className="blogs-nav-btn"
            >
              <ChevronRightIcon className="blogs-nav-icon" />
            </button>
          </div>

          {/* Swiper */}
          <div className="blogs-swiper-wrap">
            <Swiper
              modules={[A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              dir="rtl"
              spaceBetween={40}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              className="blogs-swiper"
            >
              {posts.map((post, index) => {
                const rotation = index % 2 === 0 ? -1 : 1;
                return (
                  <SwiperSlide key={`${post.title}-${index}`}>
                    <BlogCard {...post} rotation={rotation} />
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
              aria-label="پست بعدی"
              onClick={() => swiperRef.current?.slideNext()}
              className="blogs-nav-btn"
            >
              <ChevronLeftIcon className="blogs-nav-icon" />
            </button>
          </div>
        </div>

        {/* ===== MOBILE PROGRESS ===== */}
        <div className="blogs-mobile-progress">
          <div className="blogs-progress-track">
            <div
              className="blogs-progress-fill"
              style={{ width: `${((activeIndex + 1) / posts.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
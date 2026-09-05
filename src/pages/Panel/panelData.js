/* ============================================================
   دیتای پنل هنرجو (نمونه — بعداً به API وصل می‌شه)
   ============================================================ */

export const panelUser = {
  firstName: "پارسا",
  fullName: "پارسا محمدی",
  initial: "پ",
  role: "دانشجوی کارشناسی ارشد · هوش مصنوعی",
  greeting: "امروز ۳ کلاس زنده و ۲ تکلیف مهلت‌دار داری.",
  tags: ["Python", "Machine Learning", "NLP", "+۴"],
  stats: [
    { num: "۲۸", label: "دوره" },
    { num: "۱۴", label: "گواهی" },
    { num: "۲,۴۸۰", label: "امتیاز" },
  ],
  level: { title: "محقق برتر", number: "۷", pointsToNext: "۵۲۰ امتیاز تا سطح بعد", pct: 72 },
};

export const streak = {
  days: "۱۲",
  hint: "۴۵ دقیقه دیگه مطالعه کن تا رکورد این هفته‌ات رو بشکنی.",
  week: [
    { on: true }, { on: true }, { on: true }, { on: true },
    { on: true }, { on: false }, { on: false },
  ],
};

export const kpis = [
  { label: "درس‌های تکمیل‌شده", value: "۲۸", chip: "+۴" },
  { label: "ساعت مطالعه این ماه", value: "۴۲", chip: "۸۵٪" },
  { label: "میانگین نمرات", value: "۱۸.۴", chip: "A", dark: true },
  { label: "امتیاز رتبه‌بندی", value: "۲,۴۸۰" },
];

export const learning = [
  {
    title: "ساختمان داده و الگوریتم",
    meta: "فصل ۴ از ۷ · ۲۴ دقیقه باقی‌مانده",
    progress: 62,
    cta: "ادامه",
    image: "/assets/StatCard/blue.png",
  },
  {
    title: "مبانی هوش مصنوعی",
    meta: "فصل ۲ از ۸ · تکلیف باز",
    progress: 28,
    cta: "ادامه",
    image: "/assets/StatCard/green.png",
  },
  {
    title: "معماری کامپیوتر",
    meta: "فصل ۶ از ۶ · آماده امتحان",
    progress: 100,
    cta: "امتحان",
    done: true,
    image: "/assets/StatCard/pink.png",
  },
  {
    title: "آمار و احتمال کاربردی",
    meta: "فصل ۱ از ۵ · تازه شروع کردی",
    progress: 12,
    cta: "ادامه",
    image: "/assets/StatCard/yellow.png",
  },
];

export const schedule = [
  { day: "۱۴", month: "شهریور", title: "کلاس زنده: الگوریتم‌های گراف", time: "۱۰:۳۰ · دکتر رستمی", today: true },
  { day: "۱۴", month: "شهریور", title: "مهلت تحویل تمرین AI", time: "۲۳:۵۹ · تمرین ۴" },
  { day: "۱۵", month: "شهریور", title: "گروه مطالعه معماری", time: "۱۹:۰۰ · Google Meet" },
  { day: "۱۶", month: "شهریور", title: "وبینار: مصاحبه شغلی تکنیکال", time: "۲۰:۰۰ · رایگان" },
];

export const weeklyActivity = [
  { day: "شنبه", hours: "۲", pct: 45 },
  { day: "یکشنبه", hours: "۳.۵", pct: 70 },
  { day: "دوشنبه", hours: "۴.۵", pct: 90, hi: true },
  { day: "سه‌شنبه", hours: "۲.۵", pct: 55 },
  { day: "چهارشنبه", hours: "۴.۲", pct: 85, hi: true },
  { day: "پنجشنبه", hours: "۱.۵", pct: 35 },
  { day: "جمعه", hours: "۱", pct: 20 },
];

export const skills = [
  { name: "یادگیری ماشین", pct: 88 },
  { name: "پردازش زبان طبیعی", pct: 72 },
  { name: "شبکه عصبی عمیق", pct: 64 },
  { name: "آمار و احتمال", pct: 82 },
  { name: "کامپیوتر ویژن", pct: 45 },
];

export const badges = [
  { em: "🎯", label: "اولین ۱۰۰٪", cls: "b1" },
  { em: "🔥", label: "۳۰ روز پیاپی", cls: "b2" },
  { em: "⚡", label: "سرعتی", cls: "b3" },
  { em: "🏆", label: "قهرمان ماه", cls: "b1" },
  { em: "📚", label: "کتاب‌خوان", cls: "b2" },
  { em: "🔒", label: "?", cls: "locked" },
  { em: "🔒", label: "?", cls: "locked" },
  { em: "🔒", label: "?", cls: "locked" },
];

/* ---------- تکالیف (صفحهٔ تکالیف) ----------
   status: open | late | done | graded */
export const assignments = [
  {
    id: 1,
    title: "پیاده‌سازی گراف وزن‌دار و Dijkstra",
    course: "ساختمان داده و الگوریتم",
    due: "مهلت: امروز ۲۳:۵۹",
    no: 4,
    status: "late",
  },
  {
    id: 2,
    title: "آموزش مدل طبقه‌بندی روی دیتاست MNIST",
    course: "مبانی هوش مصنوعی",
    due: "مهلت: ۱۸ شهریور",
    no: 2,
    status: "open",
  },
  {
    id: 3,
    title: "تحلیل حافظه و بهینه‌سازی کش",
    course: "معماری کامپیوتر",
    due: "تحویل ۱۶ شهریور",
    no: 5,
    status: "done",
  },
  {
    id: 4,
    title: "مدل‌سازی توزیع نرمال با پایتون",
    course: "آمار و احتمال کاربردی",
    due: "تحویل ۱۲ شهریور",
    no: 1,
    status: "graded",
    grade: "۱۹",
  },
];

/* ---------- دوره‌های من (صفحهٔ دوره‌ها) ----------
   status: active | done | locked-ish (تازه) */
export const myCourses = [
  {
    id: 1,
    title: "ساختمان داده و الگوریتم",
    teacher: "دکتر رستمی",
    sessions: "۱۲ جلسه · ۲۴ ساعت",
    progress: 62,
    chapter: "فصل ۴ از ۷",
    next: "جلسهٔ بعد: الگوریتم‌های گراف — پنج‌شنبه ۱۰:۳۰",
    status: "active",
    pattern: "/assets/StatCard/blue.png",
  },
  {
    id: 2,
    title: "مبانی هوش مصنوعی",
    teacher: "دکتر عزیزی",
    sessions: "۱۶ جلسه · ۳۲ ساعت",
    progress: 28,
    chapter: "فصل ۲ از ۸",
    next: "تکلیف باز: تمرین ۲ — مهلت ۱۸ شهریور",
    status: "active",
    pattern: "/assets/StatCard/green.png",
  },
  {
    id: 3,
    title: "معماری کامپیوتر",
    teacher: "استاد احمدی",
    sessions: "۱۲ جلسه · ۲۰ ساعت",
    progress: 100,
    chapter: "فصل ۶ از ۶",
    next: "همهٔ درس‌ها کامل شد — آمادهٔ امتحان نهایی",
    status: "done",
    pattern: "/assets/StatCard/pink.png",
  },
  {
    id: 4,
    title: "آمار و احتمال کاربردی",
    teacher: "دکتر رضایی",
    sessions: "۱۰ جلسه · ۱۸ ساعت",
    progress: 12,
    chapter: "فصل ۱ از ۵",
    next: "جلسهٔ بعد: توزیع‌های گسسته — شنبه ۱۴:۰۰",
    status: "new",
    pattern: "/assets/StatCard/yellow.png",
  },
];

/* ---------- درس‌های دورهٔ فعال (بازشو) ---------- */
export const courseLessons = [
  { n: 1, title: "مقدمه‌ای بر ساختمان داده", time: "۲۴ دقیقه", done: true },
  { n: 2, title: "آرایه و لیست پیوندی", time: "۳۱ دقیقه", done: true },
  { n: 3, title: "پشته و صف", time: "۲۸ دقیقه", done: true },
  { n: 4, title: "درخت و پیمایش", time: "۴۲ دقیقه", now: true },
  { n: 5, title: "گراف وزن‌دار و Dijkstra", time: "۳۸ دقیقه", locked: true },
  { n: 6, title: "جدول درهم‌سازی", time: "۳۵ دقیقه", locked: true },
];

/* ---------- گواهی‌ها ---------- */
export const certificates = [
  {
    id: 1,
    title: "مبانی برنامه‌نویسی پایتون",
    date: "اردیبهشت ۱۴۰۴",
    hours: "۴۰ ساعت",
    grade: "۱۹.۵",
    serial: "RK-PY-1404-0812",
  },
  {
    id: 2,
    title: "طراحی وب واکنش‌گرا",
    date: "تیر ۱۴۰۴",
    hours: "۳۵ ساعت",
    grade: "۱۹",
    serial: "RK-WD-1404-1447",
  },
  {
    id: 3,
    title: "ورود به دنیای داده",
    date: "شهریور ۱۴۰۴",
    hours: "۳۰ ساعت",
    grade: "۱۸.۷۵",
    serial: "RK-DS-1404-2133",
  },
];

/* ---------- گفتگو با منتور ---------- */
export const mentorChats = [
  {
    id: 1,
    name: "دکتر رستمی",
    role: "منتور تخصصی · الگوریتم",
    initial: "ر",
    last: "تمرین گراف رو دیدم، ایده‌ت درسته. فقط پیچیدگی زمانی رو بهینه کن.",
    time: "۱۰ دقیقه پیش",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "مهندس کریمی",
    role: "منتور مسیر شغلی",
    initial: "ک",
    last: "رزومه‌ات رو بردم شرکت همکار نشون بدم 👌",
    time: "دیروز",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "دکتر عزیزی",
    role: "منتور · هوش مصنوعی",
    initial: "ع",
    last: "منابع فصل ۲ رو برات فرستادم.",
    time: "۳ روز پیش",
    unread: 0,
    online: false,
  },
];

export const mentorMessages = [
  { from: "me", text: "سلام استاد، تمرین ۴ رو شروع کردم ولی تو بخش Dijkstra گیر کردم." },
  { from: "mentor", text: "سلام پارسا 👋 اول صف اولویت رو پیاده کن، بعد الگوریتم راحت می‌شه." },
  { from: "me", text: "الان امتحانش می‌کنم، ممنون 🙏" },
  { from: "mentor", text: "تمرین گراف رو دیدم، ایده‌ت درسته. فقط پیچیدگی زمانی رو بهینه کن." },
];

/* ---------- گروه مطالعه ---------- */
export const studyGroups = [
  {
    id: 1,
    name: "گروه الگوریتم و مسابقه",
    course: "ساختمان داده و الگوریتم",
    members: 6,
    max: 8,
    next: "جلسهٔ بعد: پنج‌شنبه ۱۹:۰۰ · Google Meet",
    joined: true,
    color: "var(--navy)",
  },
  {
    id: 2,
    name: "یادگیری ماشین از صفر",
    course: "مبانی هوش مصنوعی",
    members: 5,
    max: 8,
    next: "جلسهٔ بعد: جمعه ۱۷:۰۰ · کلاس آنلاین",
    joined: true,
    color: "var(--teal-alt)",
  },
  {
    id: 3,
    name: "پروژه‌محور: معماری کامپیوتر",
    course: "معماری کامپیوتر",
    members: 8,
    max: 8,
    next: "ظرفیت تکمیل — لیست انتظار",
    joined: false,
    color: "var(--accent)",
  },
];

/* ---------- رویدادها ---------- */
export const events = [
  {
    id: 1,
    day: "۱۴",
    month: "شهریور",
    title: "کلاس زنده: الگوریتم‌های گراف",
    time: "۱۰:۳۰",
    host: "دکتر رستمی",
    kind: "کلاس زنده",
    place: "کلاس آنلاین · لینک در پروفایل کلاس",
    registered: true,
    featured: true,
  },
  {
    id: 2,
    day: "۱۶",
    month: "شهریور",
    title: "وبینار: مصاحبه شغلی تکنیکال",
    time: "۲۰:۰۰",
    host: "مهندس کریمی",
    kind: "وبینار",
    place: "آنلاین · رایگان",
    registered: true,
  },
  {
    id: 3,
    day: "۲۴",
    month: "شهریور",
    title: "شب استارتاپ دانشجو",
    time: "۱۸:۰۰",
    host: "میهمانان ویژه",
    kind: "رویداد حضوری",
    place: "پردیس مرکزی · سالن همایش",
    registered: false,
    seats: "۲۰۰ ظرفیت",
    featured: true,
  },
  {
    id: 4,
    day: "۰۵",
    month: "مهر",
    title: "کارگاه عملی: رزومه و لینکدین",
    time: "۱۷:۰۰",
    host: "تیم بازار کار رکاد",
    kind: "کارگاه",
    place: "آنلاین · ویژهٔ هنرجویان",
    registered: false,
  },
];

/* ---------- پشتیبانی ---------- */
export const supportTickets = [
  {
    id: 1,
    subject: "خطا در پخش ویدیوی جلسهٔ ۴",
    dept: "پشتیبانی فنی",
    status: "answering",
    updated: "۲۰ دقیقه پیش",
    messages: 3,
  },
  {
    id: 2,
    subject: "درخواست تمدید دسترسی دوره",
    dept: "امور هنرجویان",
    status: "open",
    updated: "۱ روز پیش",
    messages: 1,
  },
  {
    id: 3,
    subject: "صدور گواهی طراحی وب",
    dept: "امور هنرجویان",
    status: "closed",
    updated: "۱ هفته پیش",
    messages: 5,
  },
];

export const supportFaqs = [
  { q: "چطور ویدیوی دوره رو دانلود کنم؟", a: "ویدیوهای جلسات از پنل کلاس، بخش «منابع» قابل دانلودن." },
  { q: "گواهی کی صادر می‌شه؟", a: "بعد از تکمیل همهٔ فصل‌ها و قبولی در امتحان نهایی، حداکثر ۷۲ ساعت کاری." },
  { q: "می‌تونم منتورم رو عوض کنم؟", a: "بله، از همین صفحه دکمهٔ «تغییر منتور» رو بزن." },
];

# personal-site

سایت شخصی محمد حمزه — رزومه و پورتفولیوی یک‌صفحه‌ای

این مخزن نسخهٔ استاتیک سایت [m-hamza.ir](https://m-hamza.ir) است. داده‌ها به فایل‌های جداگانه بر اساس تب‌ها تقسیم شده‌اند و از طریق `js/i18n.js` بارگذاری و ادغام می‌شوند.

---

## ساختار داده (`data/`)

هر بخش یک پوشه دارد با دو فایل: `fa.json` (پیش‌فرض) و `en.json`.

```
data/
├── meta/           # عنوان صفحه، زبان، توضیحات متا
│   ├── fa.json
│   └── en.json
├── ui/             # متن دکمه‌ها، منوی تب‌ها، عناوین بخش‌ها
│   ├── fa.json
│   └── en.json
├── contacts/       # همه راه‌های ارتباطی (منبع واحد)
│   ├── fa.json
│   └── en.json
├── profile/        # پروفایل، درباره من، مهارت‌ها، تحصیلات
│   ├── fa.json
│   └── en.json
├── services/       # کارت‌های خدمات
│   ├── fa.json
│   └── en.json
├── timeline/       # سوابق و تایم‌لاین فعالیت‌ها
│   ├── fa.json
│   └── en.json
└── projects/       # پروژه‌ها، فیلترها، هاب استارتیچ
    ├── fa.json
    └── en.json
```

---

## تب‌ها و فایل مربوطه

| تب | پوشه | محتوا |
|----|------|--------|
| **۱. تماس** | `contacts/` | همه کانال‌های ارتباطی — تب، dock، فوتر، hero |
| **۲. پروژه‌ها** | `projects/` | کارت‌ها، فیلترها، هاب استارتیچ، `typeLabels` |
| **۳. خدمات** | `services/` | لیست خدمات با مخاطب هدف |
| **۴. سوابق** | `timeline/` | `activityTimeline`, برچسب دسته‌ها |
| **۵. پروفایل** | `profile/` | درباره من، مهارت‌ها، تحصیلات، تألیفات |

### هدر (خارج از تب‌ها)

| بخش | پوشه | کلید |
|-----|------|------|
| نام و عنوان | `profile/` | `profile` |
| آمار hero | `profile/` | `stats` |
| لینک‌های اجتماعی hero | `contacts/` | `channels` با `places: ["hero"]` |
| منوی تب‌ها | `ui/` | `nav` |
| متا | `meta/` | `title`, `description`, `lang`, `dir` |

---

## تماس — منبع واحد

فایل `data/contacts/fa.json` (و `en.json`) تنها منبع راه‌های ارتباطی است.

```json
{
  "channels": [
    {
      "id": "telegram",
      "label": "تلگرام",
      "value": "@hi_helper",
      "href": "https://t.me/hi_helper",
      "icon": "fab fa-telegram-plane",
      "external": true,
      "places": ["tab", "dock", "footer", "hero"]
    }
  ]
}
```

| `places` | کاربرد |
|----------|--------|
| `tab` | تب تماس |
| `dock` | دکمه‌های شناور پایین صفحه |
| `footer` | فوتر |
| `hero` | آیکون‌های اجتماعی زیر معرفی |

دیگر نیازی به `social_links` جداگانه نیست — همه از همین فایل لود می‌شود.

---

## پروژه‌ها — انواع

فایل: `data/projects/fa.json`

| `type` | برچسب |
|--------|--------|
| `platform` | پلتفرم چندسکویی |
| `android` | نرم‌افزار اندرویدی |
| `flutter` | اپ چندسکویی (Flutter) |
| `website` | پروژه تحت وب |
| `pwa` | وب‌اپ / PWA |

---

## بارگذاری در کد

`js/i18n.js`:
- `loadData(lang)` — ادغام `meta`, `ui`, `contacts`, `profile`, `services`, `timeline`
- `loadProjects(lang)` — بارگذاری `data/projects/{lang}.json`

---

## ویرایش سریع

### افزودن راه ارتباطی
`data/contacts/fa.json` → یک آیتم به `channels` اضافه کنید و `places` را تنظیم کنید.

### افزودن پروژه
`data/projects/fa.json` → `projects`

### افزودن سابقه
`data/timeline/fa.json` → `activityTimeline`

### افزودن خدمت
`data/services/fa.json` → `services`

---

## اسکریپت‌ها

```bash
node scripts/split-data.mjs       # تقسیم fa.json/en.json به ماژول‌ها (یک‌بار)
node scripts/patch-projects.mjs   # وزن‌دهی پروژه‌ها
node scripts/gen-projects-en.mjs  # تولید projects/en از fa
node scripts/sync-en-resume.mjs   # همگام‌سازی ماژول‌های انگلیسی
```

---

## اجرای محلی

```bash
python -m http.server 8080
```

زبان انگلیسی: `?lang=en`

---

## ارتباط

- وب: [m-hamza.ir](https://m-hamza.ir)
- استارتیچ: [starteach.ir](https://starteach.ir)
- موبایل: `09394812277`
- تلگرام: [@hi_helper](https://t.me/hi_helper)

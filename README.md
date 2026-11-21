# روان علاء الدين & محمد هلال — دعوة زفاف (18 ديسمبر 2026)

موقع دعوة زفاف فاخرة ثنائية اللغة (**العربية افتراضيًا** مع زر تبديل `عربي | EN`)، مُصمّم بتجربة فتح ظرف عنابي (برغندي) ثلاثي الأبعاد وخلفية زهور ناعمة، ومجهّز للنشر المجاني على **GitHub Pages**.

---

## 1. الصور والأغنية المرفقة

تم تضمين صور العروسين، الرسمة المائية لمكان الحفل، وأغنية الزفاف (`public/assets/wedding-song.m4a`) مباشرةً داخل المشروع ليعمل على GitHub Pages بدون أي روابط خارجية.

---

## 2. تفعيل استقبال ردود الحضور (RSVP) على البريد الإلكتروني

نموذج تأكيد الحضور مضبوط حاليًا لإرسال الردود مباشرةً إلى **`rawanalaaeldin2666@gmail.com`** عبر خدمة **FormSubmit** المجانية (بدون خادم خلفي):

1. عند إرسال **أول رد تجريبي** بعد نشر الموقع، سيصل إلى بريد `rawanalaaeldin2666@gmail.com` رسالة تفعيل من **FormSubmit**.
2. افتح الرسالة واضغط على **Activate Form** مرة واحدة فقط، وبعدها ستصل جميع ردود الضيوف تلقائيًا إلى بريدك.
3. يمكنك أيضًا استخدام رابط **Formspree** بدلاً منه عبر تعبئة `formspreeEndpoint` داخل `src/config/wedding.ts`.

---

## 3. ضبط رابط معاينة واتساب (Open Graph)

لكي تظهر صورة الغروب عند مشاركة رابط الدعوة على **WhatsApp** أو **Facebook** أو **X**:

1. افتح الملف `index.html`.
2. استبدل `YOUR_USERNAME` في وسوم `og:url` و `og:image` و `og:image:secure_url` و `twitter:image` باسم حسابك على GitHub ليصبح الرابط:
   ```html
   <meta property="og:url" content="https://YOUR_USERNAME.github.io/mohamed-and-rawan-wedding-invitation/" />
   <meta property="og:image" content="https://YOUR_USERNAME.github.io/mohamed-and-rawan-wedding-invitation/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.42.55_PM__1__4d66dfa3.jpeg" />
   ```

---

## 4. خطوات النشر على GitHub Pages كملف HTML واحد (بدون تعقيد)

تم توليد ملف **HTML واحد متكامل** يحتوي على التصميم، الصور، والأغنية بداخله مباشرةً (`mohamed-and-rawan-wedding-invitation.html` و `docs/index.html`):

### الطريقة الأسهل (رفع ملف واحد فقط):
1. أنشئ مستودعًا جديدًا (Repository) على [GitHub](https://github.com/new) بالاسم **`mohamed-and-rawan-wedding-invitation`** واجعله **Public**.
2. ارفع الملف **`mohamed-and-rawan-wedding-invitation.html`** فقط، وسمِّه **`index.html`** داخل المستودع.
3. من **Settings ← Pages ← Build and deployment ← Source** اختر **`Deploy from a branch`** ثم **`main`** والمجلد **`/ (root)`** ثم اضغط **Save**.

### أو عند رفع المشروع بالكامل:
- من **Settings ← Pages ← Build and deployment ← Source** اختر **`Deploy from a branch`** ثم **`main`** والمجلد **`/docs`** (أو اختر **GitHub Actions**).
- خلال دقيقة واحدة، سيعمل الموقع مباشرةً على الرابط:
  `https://YOUR_USERNAME.github.io/mohamed-and-rawan-wedding-invitation/`

---

## التشغيل المحلي للمراجعة (اختياري)

```bash
npm install
npm run dev
```

لإخراج ملفات النشر الثابتة في مجلد `dist/`:

```bash
npm run build
```

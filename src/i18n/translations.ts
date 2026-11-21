export type Language = 'ar' | 'en';

export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    coupleShort: string;
    welcome: string;
    countdown: string;
    venue: string;
    details: string;
    rsvp: string;
    toggleAr: string;
    toggleEn: string;
  };
  envelope: {
    invitationTag: string;
    coupleNames: string;
    date: string;
    tapPrompt: string;
    openingStatus: string;
    youreInvited: string;
    ariaOpen: string;
  };
  music: {
    play: string;
    pause: string;
  };
  welcome: {
    eyebrow: string;
    lead: string;
    subtitle: string;
    coupleNames: string;
    date: string;
    portraitAlt: string;
    scrollHint: string;
  };
  monogram: {
    eyebrow: string;
    caption: string;
  };
  countdown: {
    eyebrow: string;
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    cairoNote: string;
    startedMessage: string;
  };
  venue: {
    eyebrow: string;
    heading: string;
    venueName: string;
    venueLocation: string;
    description: string;
    button: string;
    imageAlt: string;
  };
  adultsOnly: {
    eyebrow: string;
    heading: string;
    message: string;
  };
  details: {
    eyebrow: string;
    heading: string;
    date: string;
    dayOfWeek: string;
    time: string;
    timezoneNote: string;
    addToCalendar: string;
    googleCalendar: string;
    icsDownloaded: string;
  };
  rsvp: {
    eyebrow: string;
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    attendYes: string;
    attendNo: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    activationTitle: string;
    activationMessage: string;
    sendViaEmail: string;
    errorMessage: string;
    validationName: string;
  };
  closing: {
    eyebrow: string;
    message: string;
    coupleNames: string;
    date: string;
    sunsetAlt: string;
    footerNote: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  ar: {
    meta: {
      title: 'Mohamed and Rawan Wedding Invitation | دعوة زفاف محمد وروان',
      description: 'بكل الحب، ندعوكم لمشاركتنا أجمل يوم في حياتنا.',
    },
    nav: {
      coupleShort: 'روان & محمد',
      welcome: 'الدعوة',
      countdown: 'العد التنازلي',
      venue: 'المكان',
      details: 'الموعد',
      rsvp: 'تأكيد الحضور',
      toggleAr: 'عربي',
      toggleEn: 'EN',
    },
    envelope: {
      invitationTag: 'دعوة زفاف',
      coupleNames: 'روان علاء الدين & محمد هلال',
      date: '18 ديسمبر 2026',
      tapPrompt: 'اضغط لفتح الدعوة',
      openingStatus: 'تُفتح الدعوة الآن...',
      youreInvited: 'بكل الحب، أنتم مدعوون',
      ariaOpen: 'اضغط لفتح دعوة زفاف روان علاء الدين ومحمد هلال',
    },
    music: {
      play: 'تشغيل الموسيقى',
      pause: 'إيقاف الموسيقى',
    },
    welcome: {
      eyebrow: 'بكل الحب والسعادة',
      lead: 'يسرّنا دعوتكم لمشاركتنا أجمل لحظات حياتنا',
      subtitle: 'حيث تتعانق القلوب على وقع المحبة والفرح، لنبدأ معًا رحلة العمر.',
      coupleNames: 'روان علاء الدين & محمد هلال',
      date: '18 ديسمبر 2026',
      portraitAlt: 'روان علاء الدين ومحمد هلال',
      scrollHint: 'مرّر للأسفل',
    },
    monogram: {
      eyebrow: 'رمز حكايتنا',
      caption: 'حرفان اجتمعا في شعار واحد ليكتبا بداية العمر',
    },
    countdown: {
      eyebrow: 'العد التنازلي',
      title: 'نترقّب لقاءكم بكل شوق',
      days: 'الأيام',
      hours: 'الساعات',
      minutes: 'الدقائق',
      seconds: 'الثواني',
      cairoNote: 'بتوقيت القاهرة — 18 ديسمبر 2026، الساعة 6:00 مساءً',
      startedMessage: 'اليوم بدأت حكايتنا الجميلة',
    },
    venue: {
      eyebrow: 'تفاصيل المكان',
      heading: 'مكان لقائنا',
      venueName: 'هيلتون بيراميدز جولف',
      venueLocation: 'السادس من أكتوبر، الجيزة',
      description: 'في رحاب هذا المكان الهادئ، يسعدنا أن نجتمع بكم لنحتفل معًا بهذه الليلة الساحرة.',
      button: 'افتح الموقع',
      imageAlt: 'رسمة مائية لمكان حفل الزفاف — هيلتون بيراميدز جولف',
    },
    adultsOnly: {
      eyebrow: 'ملاحظة لطيفة',
      heading: 'أمسية للكبار فقط',
      message:
        'حرصًا على أن تكون هذه الأمسية مميزة وهادئة للجميع، نرجو التكرم بالحضور دون أطفال، شاكرين لكم تفهّمكم وتقديركم.',
    },
    details: {
      eyebrow: 'التفاصيل',
      heading: 'موعدنا',
      date: '18 ديسمبر 2026',
      dayOfWeek: 'الجمعة',
      time: 'الساعة 6:00 مساءً تمامًا',
      timezoneNote: 'الساعة السادسة مساءً تمامًا بتوقيت القاهرة',
      addToCalendar: 'أضف إلى التقويم',
      googleCalendar: 'تقويم جوجل',
      icsDownloaded: 'تم تحميل ملف الموعد لتقويمك',
    },
    rsvp: {
      eyebrow: 'سجل التهاني وتأكيد الحضور',
      heading: 'ننتظر تأكيد حضوركم',
      subheading: 'يسعدنا تأكيد حضوركم ومشاركتنا بكلمة من القلب.',
      nameLabel: 'الاسم بالكامل',
      namePlaceholder: 'اكتب اسمك بالكامل',
      attendanceLabel: 'هل ستتمكنون من الحضور؟',
      attendYes: 'نعم، بكل سرور',
      attendNo: 'نعتذر عن عدم الحضور',
      noteLabel: 'رسالة قصيرة للعروسين (اختيارية)',
      notePlaceholder: 'اكتب تهنئة أو رسالة قصيرة للعروسين...',
      submit: 'إرسال',
      submitting: 'جارٍ الإرسال...',
      successTitle: 'تم استلام ردكم بكل محبة',
      successMessage: 'شكرًا لكم، يسعدنا مشاركتكم لنا هذه اللحظة الجميلة.',
      activationTitle: 'تأكيد إرسال الرد عبر البريد الإلكتروني',
      activationMessage:
        'يرجى تأكيد الإرسال مباشرة عبر تطبيق البريد الإلكتروني لديكم أو المحاولة لاحقًا بعد تفعيل البريد المستقبِل (rawanalaaeldin2666@gmail.com).',
      sendViaEmail: 'إرسال عبر البريد الإلكتروني',
      errorMessage: 'تعذّر الإرسال التلقائي حاليًا — يمكنكم إرسال ردكم فورًا عبر البريد الإلكتروني أدناه.',
      validationName: 'يرجى كتابة الاسم بالكامل.',
    },
    closing: {
      eyebrow: 'إلى لقائنا القريب',
      message: 'بكل الحب، ننتظركم لنبدأ معًا أجمل حكايات العمر',
      coupleNames: 'روان علاء الدين & محمد هلال',
      date: '18 ديسمبر 2026',
      sunsetAlt: 'روان علاء الدين ومحمد هلال عند غروب الشمس',
      footerNote: 'دعوة خاصة لحفل زفاف روان علاء الدين ومحمد هلال',
    },
  },
  en: {
    meta: {
      title: 'Mohamed and Rawan Wedding Invitation',
      description: 'With all our love, we invite you to share the most beautiful day of our lives.',
    },
    nav: {
      coupleShort: 'Rawan & Mohamed',
      welcome: 'Invitation',
      countdown: 'Countdown',
      venue: 'Venue',
      details: 'Details',
      rsvp: 'RSVP',
      toggleAr: 'عربي',
      toggleEn: 'EN',
    },
    envelope: {
      invitationTag: 'Wedding Invitation',
      coupleNames: 'روان علاء الدين & محمد هلال',
      date: '18 December 2026',
      tapPrompt: 'Tap to Open Invitation',
      openingStatus: 'Opening invitation...',
      youreInvited: "You're Invited!",
      ariaOpen: 'Tap to open the wedding invitation of Rawan and Mohamed',
    },
    music: {
      play: 'Play music',
      pause: 'Pause music',
    },
    welcome: {
      eyebrow: 'With Love & Joy',
      lead: 'We joyfully invite you to share the happiest moments of our lives',
      subtitle: 'Surrounded by the warmth of family and dear friends, as our forever begins.',
      coupleNames: 'Rawan & Mohamed',
      date: '18 December 2026',
      portraitAlt: 'Rawan & Mohamed portrait',
      scrollHint: 'Scroll to explore',
    },
    monogram: {
      eyebrow: 'Our Emblem',
      caption: 'Two initials intertwined in timeless gold for a lifetime together',
    },
    countdown: {
      eyebrow: 'Countdown',
      title: 'Counting the Moments Until We Celebrate',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      cairoNote: 'Cairo Time — 18 December 2026, 6:00 PM SHARP',
      startedMessage: 'Today, our beautiful forever begins.',
    },
    venue: {
      eyebrow: 'The Setting',
      heading: 'Where We Gather',
      venueName: 'Hilton Pyramids Golf',
      venueLocation: '6th of October, Giza',
      description: 'Join us beneath the evening sky as we celebrate this cherished milestone together.',
      button: 'GET DIRECTIONS',
      imageAlt: 'Watercolor illustration of the wedding venue — Hilton Pyramids Golf',
    },
    adultsOnly: {
      eyebrow: 'A Kind Note',
      heading: 'An Adults-Only Evening',
      message:
        'To make this evening a special and relaxed celebration for everyone, we kindly request that our celebration be adults-only. Thank you for your understanding.',
    },
    details: {
      eyebrow: 'Event Details',
      heading: 'OUR WEDDING',
      date: '18 December 2026',
      dayOfWeek: 'Friday',
      time: '6:00 PM SHARP',
      timezoneNote: 'Promptly at 6:00 PM, Cairo Time',
      addToCalendar: 'Add to Calendar',
      googleCalendar: 'Google Calendar',
      icsDownloaded: 'Calendar invite downloaded',
    },
    rsvp: {
      eyebrow: 'RSVP & Guestbook',
      heading: 'Kindly Confirm Your Attendance',
      subheading: 'Let us know if you will be joining us and leave a warm note for the couple.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      attendanceLabel: 'Will you be able to attend?',
      attendYes: 'Yes, with pleasure',
      attendNo: 'Regretfully unable to attend',
      noteLabel: 'A short note for the couple (optional)',
      notePlaceholder: 'Write a warm wish for Rawan & Mohamed...',
      submit: 'Send',
      submitting: 'Sending...',
      successTitle: 'With Gratitude',
      successMessage: 'Thank you! We’re delighted to share this special moment with you.',
      activationTitle: 'Send Directly via Email',
      activationMessage:
        'Please send your RSVP directly through your email app below while first-time email activation is completed for rawanalaaeldin2666@gmail.com.',
      sendViaEmail: 'Send via Email',
      errorMessage: 'Automatic delivery is unavailable right now — you can send your RSVP directly via email below.',
      validationName: 'Please enter your full name.',
    },
    closing: {
      eyebrow: 'Until We Meet',
      message: 'With all our love, we await you to begin our most beautiful story together',
      coupleNames: 'Rawan & Mohamed',
      date: '18 December 2026',
      sunsetAlt: 'Rawan & Mohamed silhouette at sunset',
      footerNote: 'Wedding invitation of Rawan & Mohamed',
    },
  },
};

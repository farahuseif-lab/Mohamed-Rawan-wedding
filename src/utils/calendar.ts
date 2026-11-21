import { WEDDING_CONFIG } from '../config/wedding';
import type { Language } from '../i18n/translations';

/**
 * Generates and downloads a valid .ics calendar invite with exact Cairo time
 * (18 December 2026, 6:00 PM Africa/Cairo) and no fabricated end time.
 */
export function downloadWeddingIcs(language: Language): void {
  const isAr = language === 'ar';
  const summary = isAr
    ? 'حفل زفاف روان علاء الدين ومحمد هلال'
    : 'Wedding of Rawan & Mohamed';
  const location = isAr
    ? 'هيلتون بيراميدز جولف، السادس من أكتوبر، الجيزة'
    : 'Hilton Pyramids Golf, 6th of October, Giza';
  const description = isAr
    ? `موعد حفل زفاف روان علاء الدين ومحمد هلال الساعة 6:00 مساءً تمامًا بتوقيت القاهرة.\\nالموقع: ${WEDDING_CONFIG.mapsUrl}`
    : `Wedding celebration of Rawan & Mohamed starting at 6:00 PM SHARP (Cairo Time).\\nDirections: ${WEDDING_CONFIG.mapsUrl}`;

  const uid = `rawan-mohamed-20261218@wedding-invitation`;
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

  // Using explicit UTC DTSTART (18 Dec 2026 18:00 EET = 16:00 UTC) plus VTIMEZONE-free universal compatibility
  // without inventing an end time.
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rawan & Mohamed Wedding//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${WEDDING_CONFIG.eventUtcStamp}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    `URL:${WEDDING_CONFIG.mapsUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Rawan-and-Mohamed-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Returns a Google Calendar event creation URL with exact Cairo timezone start.
 */
export function getGoogleCalendarUrl(language: Language): string {
  const isAr = language === 'ar';
  const text = isAr
    ? 'حفل زفاف روان علاء الدين ومحمد هلال'
    : 'Wedding of Rawan & Mohamed';
  const location = isAr
    ? 'هيلتون بيراميدز جولف، السادس من أكتوبر، الجيزة'
    : 'Hilton Pyramids Golf, 6th of October, Giza';
  const details = isAr
    ? `تبدأ الأمسية الساعة 6:00 مساءً تمامًا بتوقيت القاهرة. رابط الموقع: ${WEDDING_CONFIG.mapsUrl}`
    : `Celebration starts at 6:00 PM SHARP (Cairo Time). Directions: ${WEDDING_CONFIG.mapsUrl}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text,
    dates: `${WEDDING_CONFIG.eventCairoLocalStamp}/${WEDDING_CONFIG.eventCairoLocalStamp}`,
    ctz: WEDDING_CONFIG.timeZone,
    location,
    details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

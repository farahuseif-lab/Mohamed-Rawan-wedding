import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Heart, Mail, Send } from 'lucide-react';
import { getRsvpEndpoint, WEDDING_CONFIG } from '../../config/wedding';
import type { Language, TranslationContent } from '../../i18n/translations';
import { BotanicalDivider } from '../BotanicalDivider';

interface RsvpSectionProps {
  t: TranslationContent;
  language: Language;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'activation_needed' | 'error';

export const RsvpSection: React.FC<RsvpSectionProps> = ({ t, language }) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [note, setNote] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [fallbackMailtoHref, setFallbackMailtoHref] = useState('');

  const isAr = language === 'ar';

  const buildMailtoUrl = (guestName: string, guestAttendance: 'yes' | 'no', guestNote: string) => {
    const attendanceLabel =
      guestAttendance === 'yes' ? 'نعم، بكل سرور (Yes, attending)' : 'نعتذر عن عدم الحضور (Regretfully unable)';
    const subject = encodeURIComponent(`تأكيد حضور حفل زفاف روان ومحمد — ${guestName}`);
    const body = encodeURIComponent(
      `الاسم / Name: ${guestName}\nالحضور / Attendance: ${attendanceLabel}\nالرسالة / Note: ${guestNote || '-'}`
    );
    return `mailto:${WEDDING_CONFIG.rsvpEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setValidationError(t.rsvp.validationName);
      return;
    }

    const trimmedNote = note.trim();
    const mailtoHref = buildMailtoUrl(trimmedName, attendance, trimmedNote);
    setFallbackMailtoHref(mailtoHref);
    setSubmitState('submitting');

    try {
      const endpoint = getRsvpEndpoint();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `تأكيد حضور زفاف روان ومحمد — ${trimmedName}`,
          _template: 'table',
          _captcha: 'false',
          name: trimmedName,
          attendance: attendance === 'yes' ? 'نعم، بكل سرور (Yes)' : 'نعتذر عن عدم الحضور (No)',
          message: trimmedNote || '-',
          language,
        }),
      });

      const data = await response.json().catch(() => null);
      const isFormSubmitUnactivated =
        data &&
        (data.success === false || data.success === 'false') &&
        typeof data.message === 'string' &&
        data.message.toLowerCase().includes('activat');

      if (isFormSubmitUnactivated) {
        setSubmitState('activation_needed');
        return;
      }

      if (!response.ok || (data && (data.success === false || data.success === 'false'))) {
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      setName('');
      setNote('');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section id="rsvp" className="py-12 sm:py-20 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-8">
          <p
            className={`text-sm sm:text-base text-[#A48374] mb-2 ${
              isAr ? 'font-ar-serif' : 'font-en-serif uppercase tracking-[0.22em]'
            }`}
          >
            {t.rsvp.eyebrow}
          </p>

          <h2
            className={`text-3xl sm:text-5xl text-[#3A2D28] mb-3 ${
              isAr ? 'font-ar-calligraphy' : 'font-en-serif italic font-normal'
            }`}
            style={{ textWrap: 'balance' }}
          >
            {t.rsvp.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-[#3A2D28]/80 ${
              isAr ? 'font-ar-serif' : 'font-en-serif italic text-xl'
            }`}
          >
            {t.rsvp.subheading}
          </p>
        </div>

        {/* Luxury Stationery RSVP Card */}
        <div className="bg-[#F1EDE6]/95 border border-[#D1C7BD] rounded-[6px] p-6 sm:p-9 shadow-[0_20px_50px_-18px_rgba(58,45,40,0.14)]">
          {submitState === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#EBE3DB] border border-[#CBAD8D]/60 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-[#A48374]" strokeWidth={1.6} />
              </div>
              <h3
                className={`text-2xl text-[#3A2D28] mb-2 ${
                  isAr ? 'font-ar-serif' : 'font-en-serif font-medium'
                }`}
              >
                {t.rsvp.successTitle}
              </h3>
              <p
                className={`text-base text-[#3A2D28]/80 max-w-md leading-relaxed ${
                  isAr ? 'font-ar-sans' : 'font-en-serif text-lg'
                }`}
              >
                {t.rsvp.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="guest-name"
                  className={`block text-sm text-[#3A2D28] mb-2 ${
                    isAr ? 'font-ar-sans font-medium' : 'font-en-serif font-semibold tracking-wide'
                  }`}
                >
                  {t.rsvp.nameLabel}
                </label>
                <input
                  id="guest-name"
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder={t.rsvp.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-[5px] bg-[#EBE3DB]/70 border border-[#D1C7BD] text-[#3A2D28] placeholder-[#A48374]/75 focus:outline-none focus:border-[#A48374] transition-colors ${
                    isAr ? 'font-ar-sans text-sm' : 'font-en-serif text-base'
                  }`}
                />
                {validationError && (
                  <p className="mt-1.5 text-xs text-[#9E3F3B] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationError}</span>
                  </p>
                )}
              </div>

              {/* Attendance Radio Selection */}
              <div>
                <span
                  className={`block text-sm text-[#3A2D28] mb-2.5 ${
                    isAr ? 'font-ar-sans font-medium' : 'font-en-serif font-semibold tracking-wide'
                  }`}
                >
                  {t.rsvp.attendanceLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-[5px] border cursor-pointer transition-colors ${
                      attendance === 'yes'
                        ? 'bg-[#3A2D28] text-[#F1EDE6] border-[#3A2D28]'
                        : 'bg-[#EBE3DB]/60 text-[#3A2D28] border-[#D1C7BD] hover:border-[#A48374]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === 'yes'}
                      onChange={() => setAttendance('yes')}
                      className="sr-only"
                    />
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        attendance === 'yes' ? 'text-[#CBAD8D]' : 'text-[#A48374]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isAr ? 'font-ar-sans font-medium' : 'font-en-serif text-base font-medium'
                      }`}
                    >
                      {t.rsvp.attendYes}
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-[5px] border cursor-pointer transition-colors ${
                      attendance === 'no'
                        ? 'bg-[#3A2D28] text-[#F1EDE6] border-[#3A2D28]'
                        : 'bg-[#EBE3DB]/60 text-[#3A2D28] border-[#D1C7BD] hover:border-[#A48374]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === 'no'}
                      onChange={() => setAttendance('no')}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        attendance === 'no' ? 'border-[#CBAD8D]' : 'border-[#A48374]'
                      }`}
                    >
                      {attendance === 'no' && (
                        <span className="w-2 h-2 rounded-full bg-[#CBAD8D]" />
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        isAr ? 'font-ar-sans font-medium' : 'font-en-serif text-base font-medium'
                      }`}
                    >
                      {t.rsvp.attendNo}
                    </span>
                  </label>
                </div>
              </div>

              {/* Optional Short Message */}
              <div>
                <label
                  htmlFor="guest-note"
                  className={`block text-sm text-[#3A2D28] mb-2 ${
                    isAr ? 'font-ar-sans font-medium' : 'font-en-serif font-semibold tracking-wide'
                  }`}
                >
                  {t.rsvp.noteLabel}
                </label>
                <textarea
                  id="guest-note"
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.rsvp.notePlaceholder}
                  className={`w-full px-4 py-3 rounded-[5px] bg-[#EBE3DB]/70 border border-[#D1C7BD] text-[#3A2D28] placeholder-[#A48374]/75 focus:outline-none focus:border-[#A48374] transition-colors resize-none ${
                    isAr ? 'font-ar-sans text-sm' : 'font-en-serif text-base'
                  }`}
                />
              </div>

              {/* First-time FormSubmit Activation or Fallback Direct Mailto Action */}
              {(submitState === 'activation_needed' || submitState === 'error') && (
                <div
                  role="alert"
                  className="p-4 rounded-[5px] bg-[#EBE3DB] border border-[#A48374]/45 text-[#3A2D28] text-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-[#A48374] shrink-0 mt-0.5" />
                    <div>
                      {submitState === 'activation_needed' && (
                        <p className="font-semibold mb-1">{t.rsvp.activationTitle}</p>
                      )}
                      <p className="text-xs sm:text-sm text-[#3A2D28]/85 leading-relaxed">
                        {submitState === 'activation_needed'
                          ? t.rsvp.activationMessage
                          : t.rsvp.errorMessage}
                      </p>
                    </div>
                  </div>

                  {fallbackMailtoHref && (
                    <a
                      href={fallbackMailtoHref}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[4px] bg-[#3A2D28] text-[#F1EDE6] hover:bg-[#4D3C36] transition-colors text-xs sm:text-sm ${
                        isAr ? 'font-ar-sans font-medium' : 'font-en-serif tracking-wide font-semibold'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#CBAD8D]" />
                      <span>{t.rsvp.sendViaEmail}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[5px] bg-[#3A2D28] text-[#F1EDE6] border border-[#CBAD8D]/55 hover:bg-[#4D3C36] disabled:opacity-65 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A2D28] ${
                  isAr ? 'font-ar-sans text-sm font-medium' : 'font-en-serif text-sm tracking-[0.18em] uppercase font-semibold'
                }`}
              >
                <Send className="w-4 h-4 text-[#CBAD8D]" strokeWidth={1.8} />
                <span>
                  {submitState === 'submitting' ? t.rsvp.submitting : t.rsvp.submit}
                </span>
              </button>
            </form>
          )}
        </div>

        <BotanicalDivider tone="gold" className="mt-16" />
      </motion.div>
    </section>
  );
};

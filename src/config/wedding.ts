export const WEDDING_CONFIG = {
  /**
   * Exact wedding date and time: 18 December 2026, 6:00 PM Africa/Cairo (UTC+02:00 in December)
   */
  eventIsoCairo: '2026-12-18T18:00:00+02:00',
  eventUtcStamp: '20261218T160000Z',
  eventCairoLocalStamp: '20261218T180000',
  timeZone: 'Africa/Cairo',

  /**
   * Verified venue from supplied Google Maps link:
   * https://maps.app.goo.gl/PHmFYU5SgbkppQoe7?g_st=ic
   */
  mapsUrl: 'https://maps.app.goo.gl/PHmFYU5SgbkppQoe7?g_st=ic',

  /**
   * Uploaded media assets preserved inside public/assets/aistudio/.
   * Relative ./ paths ensure seamless GitHub Pages subdirectory compatibility.
   */
  assets: {
    backgroundTexture: './assets/aistudio/image_5a56b3a9.png',
    envelopeTexture: './assets/aistudio/Elegant_Burgundy_Envelope_Reveal_Wedding_Animated_Invitation_52860c9f.jpeg',
    monogramLogo: './assets/monogram-logo-transparent.png',
    venueWatercolor: './assets/aistudio/WhatsApp_Image_2026-11-18_at_6.50.55_PM_d87e1d13.jpeg',
    ogSunsetCouple: './assets/aistudio/WhatsApp_Image_2026-11-18_at_6.42.55_PM__1__4d66dfa3.jpeg',
    closingSunsetCouple: './assets/aistudio/WhatsApp_Image_2026-11-18_at_6.42.55_PM_19580ae6.jpeg',
    weddingSong: './assets/wedding-song.m4a',
  },

  /**
   * RSVP Email & Delivery Endpoints
   * ------------------------------------------------------------------
   * Submissions send directly to rawanalaaeldin2666@gmail.com via FormSubmit AJAX,
   * with a pre-filled email fallback (mailto:) if offline or awaiting activation.
   */
  rsvpEmail: 'rawanalaaeldin2666@gmail.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/rawanalaaeldin2666@gmail.com',
  formspreeEndpoint: '',
} as const;

export function getRsvpEndpoint(): string {
  const customFormspree = WEDDING_CONFIG.formspreeEndpoint.trim();
  if (customFormspree.startsWith('https://formspree.io/f/') && !customFormspree.includes('YOUR_FORM_ID')) {
    return customFormspree;
  }
  return WEDDING_CONFIG.formSubmitEndpoint;
}

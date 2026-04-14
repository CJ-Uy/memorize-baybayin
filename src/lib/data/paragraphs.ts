import type { ParagraphEntry } from '$lib/types/baybayin';

// Baybayin transcription of "Bayang Magiliw" - the opening of Lupang Hinirang
// This is the KWF-standard romanization. Baybayin transcription follows modern KWF orthography.
// Source: KWF (Komisyon sa Wikang Filipino), kwf.gov.ph
const BAYANG_MAGILIW_BAYBAYIN =
  '\u170A\u170C\u1700\u1705\u0020' +   // Bayang (ba-ya-ng)...
  // TODO: complete full Baybayin transcription in a dedicated validation pass
  '';

export const paragraphs: ParagraphEntry[] = [
  {
    id: 'bayang-magiliw',
    title: 'Bayang Magiliw (Lupang Hinirang)',
    baybayin: BAYANG_MAGILIW_BAYBAYIN, // placeholder - to be completed
    roman: 'Bayang magiliw,\nPerlas ng Silangan,\nAlab ng puso,\nSa dibdib mo\'y buhay,\nLupang Hinirang,\nDuyan ng magiting,\nSa manlulupig,\nDi ka pasisiil.',
    source: 'Komisyon sa Wikang Filipino (KWF), kwf.gov.ph',
  },
];

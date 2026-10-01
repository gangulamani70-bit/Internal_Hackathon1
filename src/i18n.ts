import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* ───── All Indian Language Locale Files ───── */
import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import mr from './locales/mr.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import pa from './locales/pa.json';
import ml from './locales/ml.json';
import or_locale from './locales/or.json';
import as_locale from './locales/as.json';
import ur from './locales/ur.json';
import mai from './locales/mai.json';
import bho from './locales/bho.json';
import raj from './locales/raj.json';
import sd from './locales/sd.json';
import sa from './locales/sa.json';
import kok from './locales/kok.json';
import doi from './locales/doi.json';
import mni from './locales/mni.json';
import sat from './locales/sat.json';
import brx from './locales/brx.json';
import hne from './locales/hne.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te },
    ta: { translation: ta },
    kn: { translation: kn },
    mr: { translation: mr },
    bn: { translation: bn },
    gu: { translation: gu },
    pa: { translation: pa },
    ml: { translation: ml },
    or: { translation: or_locale },
    as: { translation: as_locale },
    ur: { translation: ur },
    mai: { translation: mai },
    bho: { translation: bho },
    raj: { translation: raj },
    sd: { translation: sd },
    sa: { translation: sa },
    kok: { translation: kok },
    doi: { translation: doi },
    mni: { translation: mni },
    sat: { translation: sat },
    brx: { translation: brx },
    hne: { translation: hne },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

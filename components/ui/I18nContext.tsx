'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh' | 'hi' | 'vi';

const translations = {
  en: {
    title: 'Rate your prof.',
    subtitle: 'Get GPA',
    desc: 'The simplest way to discover and rate professors at Australian universities.',
    searchPlaceholder: 'Enter unit code (e.g., COMP10001)...',
    joinBeta: 'Join the waitlist',
    waitlistDesc: 'Be the first to access the 2026 survival database.',
    access: 'Access',
    added: 'Added to list',
    trending: 'Quick check',
  },
  zh: {
    title: '给教授打分',
    subtitle: '拿高 GPA',
    desc: '发现和评价澳大利亚大学教授最简单的方式。',
    searchPlaceholder: '输入课程代码 (例如 COMP10001)...',
    joinBeta: '加入候补名单',
    waitlistDesc: '首批获取 2026 选课避坑指南。',
    access: '获取权限',
    added: '已加入名单',
    trending: '快速查询',
  },
  hi: {
    title: 'प्रोफेसर को रेट करें',
    subtitle: 'GPA प्राप्त करें',
    desc: 'ऑस्ट्रेलियाई विश्वविद्यालयों में प्रोफेसरों को खोजने और रेट करने का सबसे सरल तरीका।',
    searchPlaceholder: 'यूनिट कोड दर्ज करें (जैसे, COMP10001)...',
    joinBeta: 'प्रतीक्षा सूची में शामिल हों',
    waitlistDesc: '2026 उत्तरजीविता डेटाबेस तक पहुंचने वाले पहले व्यक्ति बनें।',
    access: 'पहुंच',
    added: 'सूची में जोड़ा गया',
    trending: 'त्वरित जाँच',
  },
  vi: {
    title: 'Đánh giá giảng viên',
    subtitle: 'Lấy GPA',
    desc: 'Cách đơn giản nhất để khám phá và đánh giá giảng viên tại các trường đại học Úc.',
    searchPlaceholder: 'Nhập mã môn học (ví dụ: COMP10001)...',
    joinBeta: 'Tham gia danh sách chờ',
    waitlistDesc: 'Hãy là người đầu tiên truy cập cơ sở dữ liệu năm 2026.',
    access: 'Truy cập',
    added: 'Đã thêm vào danh sách',
    trending: 'Kiểm tra nhanh',
  }
};

const I18nContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.en;
} | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};

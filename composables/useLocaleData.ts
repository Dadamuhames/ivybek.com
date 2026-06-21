import { computed } from "vue";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import uz from "@/locales/uz.json";

const localesMap = {
  en,
  ru,
  uz,
} as const;

type LocaleCode = keyof typeof localesMap;

const normalizeLanguage = (value: string | null | undefined): LocaleCode => {
  if (value && value in localesMap) {
    return value as LocaleCode;
  }

  return "en";
};

export const useLocaleData = () => {
  const { locale, setLocale } = useI18n();

  const selectedLanguage = computed<LocaleCode>({
    get: () => normalizeLanguage(locale.value),
    set: (value) => {
      locale.value = normalizeLanguage(value);
    },
  });

  const getLocaleDataByLanguage = (language: string) => {
    if (language in localesMap) {
      return localesMap[language as LocaleCode];
    }

    return localesMap.en;
  };

  const currentLocaleData = computed(() => {
    return getLocaleDataByLanguage(selectedLanguage.value);
  });

  const setLanguage = async (language: string) => {
    const nextLanguage = normalizeLanguage(language);

    await setLocale(nextLanguage);
  };

  return {
    selectedLanguage,
    currentLocaleData,
    getLocaleDataByLanguage,
    setLanguage,
  };
};

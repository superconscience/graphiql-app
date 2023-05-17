import i18next, { i18n as i18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages, namespaces } from './i18n.constants';
import HttpApi from 'i18next-http-backend';
import * as translation from './locales/translation';

const loadedNamespaces = {
  translation,
};

export type LocaleNamespace = keyof typeof loadedNamespaces;

export const defaultNameSpace: LocaleNamespace = 'translation';
type SupportedLocale = keyof typeof languages;

export const defaultLanguage: SupportedLocale = 'en';
export const keySeparator = '.';

type AllLoadedNameSpaceType = (typeof loadedNamespaces)[LocaleNamespace];
type AllLoadedNameSpaceTypeByLanguage = AllLoadedNameSpaceType[typeof defaultLanguage];
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type RecursiveKeyOf<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends unknown[]
    ? `${TKey}`
    : TObj[TKey] extends Record<string, unknown>
    ? `${TKey}${typeof keySeparator}${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type FlattenTypedKey = UnionToIntersection<AllLoadedNameSpaceTypeByLanguage>;

export type TranslationKey = RecursiveKeyOf<FlattenTypedKey>;

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n.use(HttpApi).init({
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    lng: language,
    fallbackLng: language,
    ns: namespaces.translation,
  });

  return i18n;
};

export const i18n = createI18n(languages.en);

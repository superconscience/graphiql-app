import { Namespace, TFunction, i18n, TOptions } from 'i18next';
import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';
import { LocaleNamespace, TranslationKey } from './i18n';

type TypedNameSpaceOptions = TOptions & { ns?: LocaleNamespace };
type TypedTranslationOptions = string | TypedNameSpaceOptions | undefined;

type TFunctionParams<N extends Namespace> = Parameters<TFunction<N, undefined>>;

type UseTypedTranslationResponse<N extends Namespace> = {
  t: (
    key: TranslationKey,
    options?: TypedTranslationOptions,
    defaultValue?: TFunctionParams<N>[1]
  ) => string;
  i18n: i18n;
  ready: boolean;
};

export function useTypedTranslation<N extends Namespace>(
  ns?: N,
  options?: UseTranslationOptions
): UseTypedTranslationResponse<N> {
  const response: UseTranslationResponse<LocaleNamespace, undefined> = useTranslation(ns, options);

  function _t(
    key: TranslationKey,
    options?: TypedTranslationOptions,
    defaultValue?: TFunctionParams<N>[1]['defaultValue']
  ) {
    return response.t(key, defaultValue, options);
  }

  return { ...response, t: _t };
}

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUrl, setUrl as setEditorUrl } from '../store/slices/editor';
import { AppDispatch } from '../store/store';

export const useEditorUrl = (): [string, (value: string) => ReturnType<AppDispatch>] => {
  const url = useAppSelector(selectUrl);
  const dispatch = useAppDispatch();
  const setUrl = (value: string) => dispatch(setEditorUrl(value));

  return [url, setUrl];
};

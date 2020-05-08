import qs from "query-string";
import { useState, useCallback } from "react";

const setQueryStringWithoutPageReload = (qsValue: string) => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qsValue;

  window.history.pushState({ path: newurl }, "", newurl);
};

const setQueryStringValue = (
  key: string,
  value: string | string[],
  queryString = window.location.search
) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

const getQueryStringValue = (
  key: string,
  queryString = window.location.search
) => {
  const values = qs.parse(queryString);
  return values[key];
};

const useQueryString = (key: string, initialValue?: string | string[]) => {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    (newValue: string | string[]) => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  return { value, onSetValue };
};

export default useQueryString;

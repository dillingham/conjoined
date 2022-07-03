import Axios from "axios";
import { useRouter } from "next/router";
import require$$0, { useState, useEffect } from "react";
const axios = Axios.create({
  baseURL: process.env["NEXT_PUBLIC_BACKEND_URL"],
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
});
function usePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const get = async () => {
    await axios.get(router.asPath).then((res) => setData(res.data)).catch((error) => console.log(error)).finally(() => setLoading(false));
  };
  const api = {
    get
  };
  useEffect(() => {
    if (router.isReady) {
      api.get();
    }
  }, [router.isReady, router.asPath]);
  return {
    ...data,
    loading,
    api
  };
}
async function getServerSideProps(context) {
  let output = {};
  let endpoint = __filename.split(".next/server/pages/")[1].replace(".js", "");
  const variables = [...endpoint.matchAll(/\[(\w+)\]/g)];
  variables.forEach((variable) => {
    endpoint = endpoint.replace(variable[0], context.params[variable[1]]);
  });
  await axios.get(`/${endpoint}`, {
    headers: {
      "Cookie": context.req.headers.cookie
    }
  }).then((response) => {
    output["props"] = response.data;
  });
  return output;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
function useForm(initial = {}) {
  let successCallbacks = [];
  let errorCallbacks = [];
  let initialFormValues = {};
  initialFormValues = initial;
  const router = useRouter();
  const nulledErrors = {};
  Object.keys(initial).forEach((key) => {
    nulledErrors[key] = null;
  });
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(nulledErrors);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    const endpoint = e.target.action ? e.target.getAttribute("action") : router.asPath;
    setProcessing(true);
    await axios.post(endpoint, values).then((res) => {
      setResponse(res);
      successCallbacks.forEach((callback) => callback(res.data));
    }).catch((errors2) => {
      setErrors(errors2.response.data.errors);
      errorCallbacks.forEach((callback) => callback(errors2));
    }).finally(() => {
      setProcessing(false);
    });
  };
  const reset = () => {
    setValues(initialFormValues);
  };
  const bind = (e) => {
    set(e.target.name, e.target.value);
  };
  const set = (key, value) => {
    let payload = {
      ...values
    };
    payload[key] = value;
    setValues(payload);
  };
  const hasError = (key) => {
    return errors[key] != null;
  };
  const success = (callback) => {
    successCallbacks.push(callback);
  };
  const error = (callback) => {
    errorCallbacks.push(callback);
  };
  useEffect(() => {
    setErrors(nulledErrors);
  }, [values]);
  return {
    submit,
    bind,
    set,
    success,
    error,
    reset,
    hasError,
    values,
    processing,
    response,
    errors
  };
}
function Error({
  value,
  className = "text-red-500 text-sm",
  ...props
}) {
  if (value && typeof value !== "string") {
    return /* @__PURE__ */ jsx("p", {
      className,
      ...props,
      children: value[0]
    });
  } else if (value) {
    return /* @__PURE__ */ jsx("p", {
      className,
      ...props,
      children: value
    });
  }
  return /* @__PURE__ */ jsx("span", {});
}
export { Error, getServerSideProps, useForm, usePage };

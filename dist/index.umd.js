(function(a,p){typeof exports=="object"&&typeof module!="undefined"?p(exports,require("axios"),require("next/router"),require("react")):typeof define=="function"&&define.amd?define(["exports","axios","next/router","react"],p):(a=typeof globalThis!="undefined"?globalThis:a||self,p(a.conjoined={},a.Axios,a.router,a.require$$0))})(this,function(a,p,E,i){"use strict";function x(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var O=x(p),w=x(i);const _=O.default.create({baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,headers:{"X-Requested-With":"XMLHttpRequest"},withCredentials:!0});function L(){const e=E.useRouter(),[t,r]=i.useState(!0),[n,o]=i.useState(null),u={get:async()=>{await _.get(e.asPath).then(f=>o(f.data)).catch(f=>console.log(f)).finally(()=>r(!1))}};return i.useEffect(()=>{e.isReady&&u.get()},[e.isReady,e.asPath]),{...n,loading:t,api:u}}async function C(e){let t={},r=__filename.split(".next/server/pages/")[1].replace(".js","");return[...r.matchAll(/\[(\w+)\]/g)].forEach(o=>{r=r.replace(o[0],e.params[o[1]])}),await _.get(`/${r}`,{headers:{Cookie:e.req.headers.cookie}}).then(o=>{t.props=o.data}),t}var S={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D=w.default,k=Symbol.for("react.element"),T=Symbol.for("react.fragment"),A=Object.prototype.hasOwnProperty,F=D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,U={key:!0,ref:!0,__self:!0,__source:!0};function v(e,t,r){var n,o={},l=null,u=null;r!==void 0&&(l=""+r),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(u=t.ref);for(n in t)A.call(t,n)&&!U.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:k,type:e,key:l,ref:u,props:o,_owner:F.current}}h.Fragment=T,h.jsx=v,h.jsxs=v,S.exports=h;const g=S.exports.jsx;function I(e={}){let t=[],r=[],n={};n=e;const o=E.useRouter(),l={};Object.keys(e).forEach(s=>{l[s]=null});const[u,f]=i.useState(e),[R,b]=i.useState(l),[B,P]=i.useState(!1),[M,X]=i.useState(null),V=async s=>{s.preventDefault();const m=s.target.action?s.target.getAttribute("action"):o.asPath;P(!0);let d=new FormData;Object.keys(u).forEach(c=>{s.target.elements[c].type==="file"?d.set(c,s.target.elements[c].files[0]):d.set(c,u[c])}),console.log(s),await _.post(m,d).then(c=>{X(c),t.forEach(y=>y(c.data))}).catch(c=>{b(c.response.data.errors),r.forEach(y=>y(c))}).finally(()=>{P(!1)})},W=()=>{f(n)},q=s=>{j(s.target.name,s.target.value)},j=(s,m)=>{let d={...u};d[s]=m,f(d)},H=s=>R[s]!=null,J=s=>{t.push(s)},K=s=>{r.push(s)};return i.useEffect(()=>{b(l)},[u]),{submit:V,bind:q,set:j,success:J,error:K,reset:W,hasError:H,values:u,processing:B,response:M,errors:R}}function N({value:e,className:t="text-red-500 text-sm",...r}){return e&&typeof e!="string"?g("p",{className:t,...r,children:e[0]}):e?g("p",{className:t,...r,children:e}):g("span",{})}a.Error=N,a.getServerSideProps=C,a.useForm=I,a.usePage=L,Object.defineProperties(a,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});

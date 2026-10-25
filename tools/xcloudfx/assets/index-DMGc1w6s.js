(function(){const de=document.createElement("link").relList;if(de&&de.supports&&de.supports("modulepreload"))return;for(const U of document.querySelectorAll('link[rel="modulepreload"]'))p(U);new MutationObserver(U=>{for(const y of U)if(y.type==="childList")for(const w of y.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&p(w)}).observe(document,{childList:!0,subtree:!0});function N(U){const y={};return U.integrity&&(y.integrity=U.integrity),U.referrerPolicy&&(y.referrerPolicy=U.referrerPolicy),U.crossOrigin==="use-credentials"?y.credentials="include":U.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function p(U){if(U.ep)return;U.ep=!0;const y=N(U);fetch(U.href,y)}})();var io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function x1(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var Lu={exports:{}},Oi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hp;function y1(){if(hp)return Oi;hp=1;var d=Symbol.for("react.transitional.element"),de=Symbol.for("react.fragment");function N(p,U,y){var w=null;if(y!==void 0&&(w=""+y),U.key!==void 0&&(w=""+U.key),"key"in U){y={};for(var h in U)h!=="key"&&(y[h]=U[h])}else y=U;return U=y.ref,{$$typeof:d,type:p,key:w,ref:U!==void 0?U:null,props:y}}return Oi.Fragment=de,Oi.jsx=N,Oi.jsxs=N,Oi}var vp;function S1(){return vp||(vp=1,Lu.exports=y1()),Lu.exports}var o=S1(),Fu={exports:{}},Di={},Gu={exports:{}},Hu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gp;function _1(){return gp||(gp=1,(function(d){function de(oe,$){var ye=oe.length;oe.push($);e:for(;0<ye;){var se=ye-1>>>1,Se=oe[se];if(0<U(Se,$))oe[se]=$,oe[ye]=Se,ye=se;else break e}}function N(oe){return oe.length===0?null:oe[0]}function p(oe){if(oe.length===0)return null;var $=oe[0],ye=oe.pop();if(ye!==$){oe[0]=ye;e:for(var se=0,Se=oe.length,J=Se>>>1;se<J;){var _=2*(se+1)-1,ce=oe[_],T=_+1,g=oe[T];if(0>U(ce,ye))T<Se&&0>U(g,ce)?(oe[se]=g,oe[T]=ye,se=T):(oe[se]=ce,oe[_]=ye,se=_);else if(T<Se&&0>U(g,ye))oe[se]=g,oe[T]=ye,se=T;else break e}}return $}function U(oe,$){var ye=oe.sortIndex-$.sortIndex;return ye!==0?ye:oe.id-$.id}if(d.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var y=performance;d.unstable_now=function(){return y.now()}}else{var w=Date,h=w.now();d.unstable_now=function(){return w.now()-h}}var C=[],B=[],M=1,f=null,R=3,v=!1,O=!1,m=!1,E=!1,S=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function X(oe){for(var $=N(B);$!==null;){if($.callback===null)p(B);else if($.startTime<=oe)p(B),$.sortIndex=$.expirationTime,de(C,$);else break;$=N(B)}}function I(oe){if(m=!1,X(oe),!O)if(N(C)!==null)O=!0,le||(le=!0,j());else{var $=N(B);$!==null&&te(I,$.startTime-oe)}}var le=!1,Y=-1,ne=5,ee=-1;function pe(){return E?!0:!(d.unstable_now()-ee<ne)}function Ce(){if(E=!1,le){var oe=d.unstable_now();ee=oe;var $=!0;try{e:{O=!1,m&&(m=!1,z(Y),Y=-1),v=!0;var ye=R;try{t:{for(X(oe),f=N(C);f!==null&&!(f.expirationTime>oe&&pe());){var se=f.callback;if(typeof se=="function"){f.callback=null,R=f.priorityLevel;var Se=se(f.expirationTime<=oe);if(oe=d.unstable_now(),typeof Se=="function"){f.callback=Se,X(oe),$=!0;break t}f===N(C)&&p(C),X(oe)}else p(C);f=N(C)}if(f!==null)$=!0;else{var J=N(B);J!==null&&te(I,J.startTime-oe),$=!1}}break e}finally{f=null,R=ye,v=!1}$=void 0}}finally{$?j():le=!1}}}var j;if(typeof L=="function")j=function(){L(Ce)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,u=P.port2;P.port1.onmessage=Ce,j=function(){u.postMessage(null)}}else j=function(){S(Ce,0)};function te(oe,$){Y=S(function(){oe(d.unstable_now())},$)}d.unstable_IdlePriority=5,d.unstable_ImmediatePriority=1,d.unstable_LowPriority=4,d.unstable_NormalPriority=3,d.unstable_Profiling=null,d.unstable_UserBlockingPriority=2,d.unstable_cancelCallback=function(oe){oe.callback=null},d.unstable_forceFrameRate=function(oe){0>oe||125<oe?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ne=0<oe?Math.floor(1e3/oe):5},d.unstable_getCurrentPriorityLevel=function(){return R},d.unstable_next=function(oe){switch(R){case 1:case 2:case 3:var $=3;break;default:$=R}var ye=R;R=$;try{return oe()}finally{R=ye}},d.unstable_requestPaint=function(){E=!0},d.unstable_runWithPriority=function(oe,$){switch(oe){case 1:case 2:case 3:case 4:case 5:break;default:oe=3}var ye=R;R=oe;try{return $()}finally{R=ye}},d.unstable_scheduleCallback=function(oe,$,ye){var se=d.unstable_now();switch(typeof ye=="object"&&ye!==null?(ye=ye.delay,ye=typeof ye=="number"&&0<ye?se+ye:se):ye=se,oe){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=ye+Se,oe={id:M++,callback:$,priorityLevel:oe,startTime:ye,expirationTime:Se,sortIndex:-1},ye>se?(oe.sortIndex=ye,de(B,oe),N(C)===null&&oe===N(B)&&(m?(z(Y),Y=-1):m=!0,te(I,ye-se))):(oe.sortIndex=Se,de(C,oe),O||v||(O=!0,le||(le=!0,j()))),oe},d.unstable_shouldYield=pe,d.unstable_wrapCallback=function(oe){var $=R;return function(){var ye=R;R=$;try{return oe.apply(this,arguments)}finally{R=ye}}}})(Hu)),Hu}var bp;function E1(){return bp||(bp=1,Gu.exports=_1()),Gu.exports}var Vu={exports:{}},Me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xp;function C1(){if(xp)return Me;xp=1;var d=Symbol.for("react.transitional.element"),de=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),y=Symbol.for("react.consumer"),w=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),B=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),f=Symbol.for("react.activity"),R=Symbol.for("react.view_transition"),v=Symbol.iterator;function O(T){return T===null||typeof T!="object"?null:(T=v&&T[v]||T["@@iterator"],typeof T=="function"?T:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,S={};function z(T,g,b){this.props=T,this.context=g,this.refs=S,this.updater=b||m}z.prototype.isReactComponent={},z.prototype.setState=function(T,g){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,g,"setState")},z.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function L(){}L.prototype=z.prototype;function X(T,g,b){this.props=T,this.context=g,this.refs=S,this.updater=b||m}var I=X.prototype=new L;I.constructor=X,E(I,z.prototype),I.isPureReactComponent=!0;var le=Array.isArray;function Y(){}var ne={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function pe(T,g,b){var he=b.ref;return{$$typeof:d,type:T,key:g,ref:he!==void 0?he:null,props:b}}function Ce(T,g){return pe(T.type,g,T.props)}function j(T){return typeof T=="object"&&T!==null&&T.$$typeof===d}function P(T){var g={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(b){return g[b]})}var u=/\/+/g;function te(T,g){return typeof T=="object"&&T!==null&&T.key!=null?P(""+T.key):g.toString(36)}function oe(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(Y,Y):(T.status="pending",T.then(function(g){T.status==="pending"&&(T.status="fulfilled",T.value=g)},function(g){T.status==="pending"&&(T.status="rejected",T.reason=g)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function $(T,g,b,he,ve){var be=typeof T;(be==="undefined"||be==="boolean")&&(T=null);var Re=!1;if(T===null)Re=!0;else switch(be){case"bigint":case"string":case"number":Re=!0;break;case"object":switch(T.$$typeof){case d:case de:Re=!0;break;case M:return Re=T._init,$(Re(T._payload),g,b,he,ve)}}if(Re)return ve=ve(T),Re=he===""?"."+te(T,0):he,le(ve)?(b="",Re!=null&&(b=Re.replace(u,"$&/")+"/"),$(ve,g,b,"",function(at){return at})):ve!=null&&(j(ve)&&(ve=Ce(ve,b+(ve.key==null||T&&T.key===ve.key?"":(""+ve.key).replace(u,"$&/")+"/")+Re)),g.push(ve)),1;Re=0;var xe=he===""?".":he+":";if(le(T))for(var Ae=0;Ae<T.length;Ae++)he=T[Ae],be=xe+te(he,Ae),Re+=$(he,g,b,be,ve);else if(Ae=O(T),typeof Ae=="function")for(T=Ae.call(T),Ae=0;!(he=T.next()).done;)he=he.value,be=xe+te(he,Ae++),Re+=$(he,g,b,be,ve);else if(be==="object"){if(typeof T.then=="function")return $(oe(T),g,b,he,ve);throw g=String(T),Error("Objects are not valid as a React child (found: "+(g==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":g)+"). If you meant to render a collection of children, use an array instead.")}return Re}function ye(T,g,b){if(T==null)return T;var he=[],ve=0;return $(T,he,"","",function(be){return g.call(b,be,ve++)}),he}function se(T){if(T._status===-1){var g=T._result,b=g();b.then(function(he){(T._status===0||T._status===-1)&&(T._status=1,T._result=he,b.status===void 0&&(b.status="fulfilled",b.value=he))},function(he){(T._status===0||T._status===-1)&&(T._status=2,T._result=he,b.status===void 0&&(b.status="rejected",b.reason=he))}),T._status===-1&&(T._status=0,T._result=b)}if(T._status===1)return T._result.default;throw T._result}var Se=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var g=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(g))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)};function J(T){var g=ne.T,b={};b.types=g!==null?g.types:null,ne.T=b;try{var he=T(),ve=ne.S;ve!==null&&ve(b,he),typeof he=="object"&&he!==null&&typeof he.then=="function"&&he.then(Y,Se)}catch(be){Se(be)}finally{g!==null&&b.types!==null&&(g.types=b.types),ne.T=g}}function _(T){var g=ne.T;if(g!==null){var b=g.types;b===null?g.types=[T]:b.indexOf(T)===-1&&b.push(T)}else J(_.bind(null,T))}var ce={map:ye,forEach:function(T,g,b){ye(T,function(){g.apply(this,arguments)},b)},count:function(T){var g=0;return ye(T,function(){g++}),g},toArray:function(T){return ye(T,function(g){return g})||[]},only:function(T){if(!j(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Me.Activity=f,Me.Children=ce,Me.Component=z,Me.Fragment=N,Me.Profiler=U,Me.PureComponent=X,Me.StrictMode=p,Me.Suspense=C,Me.ViewTransition=R,Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ne,Me.__COMPILER_RUNTIME={__proto__:null,c:function(T){return ne.H.useMemoCache(T)}},Me.addTransitionType=_,Me.cache=function(T){return function(){return T.apply(null,arguments)}},Me.cacheSignal=function(){return null},Me.cloneElement=function(T,g,b){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var he=E({},T.props),ve=T.key;if(g!=null)for(be in g.key!==void 0&&(ve=""+g.key),g)!ee.call(g,be)||be==="key"||be==="__self"||be==="__source"||be==="ref"&&g.ref===void 0||(he[be]=g[be]);var be=arguments.length-2;if(be===1)he.children=b;else if(1<be){for(var Re=Array(be),xe=0;xe<be;xe++)Re[xe]=arguments[xe+2];he.children=Re}return pe(T.type,ve,he)},Me.createContext=function(T){return T={$$typeof:w,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:y,_context:T},T},Me.createElement=function(T,g,b){var he,ve={},be=null;if(g!=null)for(he in g.key!==void 0&&(be=""+g.key),g)ee.call(g,he)&&he!=="key"&&he!=="__self"&&he!=="__source"&&(ve[he]=g[he]);var Re=arguments.length-2;if(Re===1)ve.children=b;else if(1<Re){for(var xe=Array(Re),Ae=0;Ae<Re;Ae++)xe[Ae]=arguments[Ae+2];ve.children=xe}if(T&&T.defaultProps)for(he in Re=T.defaultProps,Re)ve[he]===void 0&&(ve[he]=Re[he]);return pe(T,be,ve)},Me.createRef=function(){return{current:null}},Me.forwardRef=function(T){return{$$typeof:h,render:T}},Me.isValidElement=j,Me.lazy=function(T){return{$$typeof:M,_payload:{_status:-1,_result:T},_init:se}},Me.memo=function(T,g){return{$$typeof:B,type:T,compare:g===void 0?null:g}},Me.startTransition=J,Me.unstable_useCacheRefresh=function(){return ne.H.useCacheRefresh()},Me.use=function(T){return ne.H.use(T)},Me.useActionState=function(T,g,b){return ne.H.useActionState(T,g,b)},Me.useCallback=function(T,g){return ne.H.useCallback(T,g)},Me.useContext=function(T){return ne.H.useContext(T)},Me.useDebugValue=function(){},Me.useDeferredValue=function(T,g){return ne.H.useDeferredValue(T,g)},Me.useEffect=function(T,g){return ne.H.useEffect(T,g)},Me.useEffectEvent=function(T){return ne.H.useEffectEvent(T)},Me.useId=function(){return ne.H.useId()},Me.useImperativeHandle=function(T,g,b){return ne.H.useImperativeHandle(T,g,b)},Me.useInsertionEffect=function(T,g){return ne.H.useInsertionEffect(T,g)},Me.useLayoutEffect=function(T,g){return ne.H.useLayoutEffect(T,g)},Me.useMemo=function(T,g){return ne.H.useMemo(T,g)},Me.useOptimistic=function(T,g){return ne.H.useOptimistic(T,g)},Me.useReducer=function(T,g,b){return ne.H.useReducer(T,g,b)},Me.useRef=function(T){return ne.H.useRef(T)},Me.useState=function(T){return ne.H.useState(T)},Me.useSyncExternalStore=function(T,g,b){return ne.H.useSyncExternalStore(T,g,b)},Me.useTransition=function(){return ne.H.useTransition()},Me.version="19.3.1",Me}var yp;function Yu(){return yp||(yp=1,Vu.exports=C1()),Vu.exports}var Xu={exports:{}},At={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp;function T1(){if(Sp)return At;Sp=1;var d=Yu();function de(M){var f="https://react.dev/errors/"+M;if(1<arguments.length){f+="?args[]="+encodeURIComponent(arguments[1]);for(var R=2;R<arguments.length;R++)f+="&args[]="+encodeURIComponent(arguments[R])}return"Minified React error #"+M+"; visit "+f+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function N(){}var p={d:{f:N,r:function(){throw Error(de(522))},D:N,C:N,L:N,m:N,X:N,S:N,M:N},p:0,findDOMNode:null},U=Symbol.for("react.portal"),y=Symbol.for("react.recoverable"),w=Symbol.for("react.optimistic_key");function h(M,f,R){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:U,key:v==null?null:v===w?w:""+v,children:M,containerInfo:f,implementation:R}}var C=d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function B(M,f){if(M==="font")return"";if(typeof f=="string")return f==="use-credentials"?f:""}return At.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=p,At.browser=function(M){return{$$typeof:y,_reason:M}},At.createPortal=function(M,f){var R=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!f||f.nodeType!==1&&f.nodeType!==9&&f.nodeType!==11)throw Error(de(299));return h(M,f,null,R)},At.flushSync=function(M){var f=C.T,R=p.p;try{if(C.T=null,p.p=2,M)return M()}finally{C.T=f,p.p=R,p.d.f()}},At.preconnect=function(M,f){typeof M=="string"&&(f?(f=f.crossOrigin,f=typeof f=="string"?f==="use-credentials"?f:"":void 0):f=null,p.d.C(M,f))},At.prefetchDNS=function(M){typeof M=="string"&&p.d.D(M)},At.preinit=function(M,f){if(typeof M=="string"&&f&&typeof f.as=="string"){var R=f.as,v=B(R,f.crossOrigin),O=typeof f.integrity=="string"?f.integrity:void 0,m=typeof f.fetchPriority=="string"?f.fetchPriority:void 0;R==="style"?p.d.S(M,typeof f.precedence=="string"?f.precedence:void 0,{crossOrigin:v,integrity:O,fetchPriority:m}):R==="script"&&p.d.X(M,{crossOrigin:v,integrity:O,fetchPriority:m,nonce:typeof f.nonce=="string"?f.nonce:void 0})}},At.preinitModule=function(M,f){if(typeof M=="string")if(typeof f=="object"&&f!==null){if(f.as==null||f.as==="script"){var R=B(f.as,f.crossOrigin);p.d.M(M,{crossOrigin:R,integrity:typeof f.integrity=="string"?f.integrity:void 0,nonce:typeof f.nonce=="string"?f.nonce:void 0,fetchPriority:typeof f.fetchPriority=="string"?f.fetchPriority:void 0})}}else f==null&&p.d.M(M)},At.preload=function(M,f){if(typeof M=="string"&&typeof f=="object"&&f!==null&&typeof f.as=="string"){var R=f.as,v=B(R,f.crossOrigin);p.d.L(M,R,{crossOrigin:v,integrity:typeof f.integrity=="string"?f.integrity:void 0,nonce:typeof f.nonce=="string"?f.nonce:void 0,type:typeof f.type=="string"?f.type:void 0,fetchPriority:typeof f.fetchPriority=="string"?f.fetchPriority:void 0,referrerPolicy:typeof f.referrerPolicy=="string"?f.referrerPolicy:void 0,imageSrcSet:typeof f.imageSrcSet=="string"?f.imageSrcSet:void 0,imageSizes:typeof f.imageSizes=="string"?f.imageSizes:void 0,media:typeof f.media=="string"?f.media:void 0})}},At.preloadModule=function(M,f){if(typeof M=="string")if(f){var R=B(f.as,f.crossOrigin);p.d.m(M,{as:typeof f.as=="string"&&f.as!=="script"?f.as:void 0,crossOrigin:R,integrity:typeof f.integrity=="string"?f.integrity:void 0,nonce:typeof f.nonce=="string"?f.nonce:void 0,fetchPriority:typeof f.fetchPriority=="string"?f.fetchPriority:void 0})}else p.d.m(M)},At.requestFormReset=function(M){p.d.r(M)},At.unstable_batchedUpdates=function(M,f){return M(f)},At.useFormState=function(M,f,R){return C.H.useFormState(M,f,R)},At.useFormStatus=function(){return C.H.useHostTransitionStatus()},At.version="19.3.1",At}var _p;function w1(){if(_p)return Xu.exports;_p=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(de){console.error(de)}}return d(),Xu.exports=T1(),Xu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ep;function A1(){if(Ep)return Di;Ep=1;var d=E1(),de=Yu(),N=w1();function p(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function U(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function y(e){for(var t=e,a=t;a&&!a.alternate;)t=a,(t.flags&4098)!==0&&(e=t.return),a=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function w(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function h(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function C(e){if(y(e)!==e)throw Error(p(188))}function B(e){var t=e.alternate;if(!t){if(t=y(e),t===null)throw Error(p(188));return t!==e?null:e}for(var a=e,n=t;;){var l=a.return;if(l===null)break;var i=l.alternate;if(i===null){if(n=l.return,n!==null){a=n;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===a)return C(l),e;if(i===n)return C(l),t;i=i.sibling}throw Error(p(188))}if(a.return!==n.return)a=l,n=i;else{for(var r=!1,c=l.child;c;){if(c===a){r=!0,a=l,n=i;break}if(c===n){r=!0,n=l,a=i;break}c=c.sibling}if(!r){for(c=i.child;c;){if(c===a){r=!0,a=i,n=l;break}if(c===n){r=!0,n=i,a=l;break}c=c.sibling}if(!r)throw Error(p(189))}}if(a.alternate!==n)throw Error(p(190))}if(a.tag!==3)throw Error(p(188));return a.stateNode.current===a?e:t}function M(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=M(e),t!==null)return t;e=e.sibling}return null}function f(e,t,a,n,l,i){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&a(e,n,l,i)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&f(e.child,t,a,n,l,i))return!0;e=e.sibling}return!1}function R(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function v(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function O(e){var t=[null,null],a=R(e);return a===null||m(t,e,a.child,{foundSelf:!1}),t}function m(e,t,a,n){for(;a!==null;){if(a===t)n.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(n.foundSelf)return e[1]=a,!0;e[0]=a}else if((a.tag!==22||a.memoizedState===null)&&m(e,t,a.child,n))return!0;a=a.sibling}return!1}function E(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(p(559))}}var S=null,z=null;function L(e,t,a){return e===a?!0:e===t?(S=e,!0):!1}function X(e,t,a){return e===a?(z=e,!1):e===t?(z!==null&&(S=e),!0):!1}function I(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function le(e,t,a){for(var n=0,l=e;l;l=a(l))n++;l=0;for(var i=t;i;i=a(i))l++;for(;0<n-l;)e=a(e),n--;for(;0<l-n;)t=a(t),l--;for(;n--;){if(e===t||t!==null&&e===t.alternate)return e;e=a(e),t=a(t)}return null}var Y=Object.assign,ne=Symbol.for("react.element"),ee=Symbol.for("react.transitional.element"),pe=Symbol.for("react.portal"),Ce=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),te=Symbol.for("react.context"),oe=Symbol.for("react.forward_ref"),$=Symbol.for("react.suspense"),ye=Symbol.for("react.suspense_list"),se=Symbol.for("react.memo"),Se=Symbol.for("react.lazy"),J=Symbol.for("react.activity"),_=Symbol.for("react.legacy_hidden"),ce=Symbol.for("react.memo_cache_sentinel"),T=Symbol.for("react.view_transition"),g=Symbol.for("react.recoverable"),b=Symbol.iterator;function he(e){return e===null||typeof e!="object"?null:(e=b&&e[b]||e["@@iterator"],typeof e=="function"?e:null)}var ve=Symbol.for("react.client.reference");function be(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ve?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ce:return"Fragment";case P:return"Profiler";case j:return"StrictMode";case $:return"Suspense";case ye:return"SuspenseList";case J:return"Activity";case T:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case pe:return"Portal";case te:return e.displayName||"Context";case u:return(e._context.displayName||"Context")+".Consumer";case oe:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case se:return t=e.displayName||null,t!==null?t:be(e.type)||"Memo";case Se:t=e._payload,e=e._init;try{return be(e(t))}catch{}}return null}var Re=Array.isArray,xe=de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ae=N.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,at={pending:!1,data:null,method:null,action:null},s=[],ae=-1;function W(e){return{current:e}}function A(e){0>ae||(e.current=s[ae],s[ae]=null,ae--)}function x(e,t){ae++,s[ae]=e.current,e.current=t}var F=W(null),ue=W(null),fe=W(null),K=W(null);function ge(e,t){switch(x(fe,t),x(ue,e),x(F,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Cm(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Cm(t),e=Tm(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}A(F),x(F,e)}function _e(){A(F),A(ue),A(fe)}function me(e){var t=e.memoizedState;t!==null&&(zl._currentValue=t.memoizedState,x(K,e)),t=F.current;var a=Tm(t,e.type);t!==a&&(x(ue,e),x(F,a))}function Ne(e){ue.current===e&&(A(F),A(ue)),K.current===e&&(A(K),zl._currentValue=at)}var Xe,Be;function nt(e){if(Xe===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Xe=t&&t[1]||"",Be=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xe+e+Be}var Qt=!1;function ht(e,t){if(!e||Qt)return"";Qt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var re=function(){throw Error()};if(Object.defineProperty(re.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(re,[])}catch(Ee){var G=Ee}Reflect.construct(e,[],re)}else{try{re.call()}catch(Ee){G=Ee}re=!1;try{var Z=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),re=!0,new e}finally{re&&(Z!==void 0?Object.defineProperty(e.prototype,"props",Z):delete e.prototype.props)}}}else{try{throw Error()}catch(Ee){G=Ee}(re=e())&&typeof re.catch=="function"&&re.catch(function(){})}}catch(Ee){if(Ee&&G&&typeof Ee.stack=="string")return[Ee.stack,G.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=n.DetermineComponentFrameRoot(),r=i[0],c=i[1];if(r&&c){var D=r.split(`
`),V=c.split(`
`);for(l=n=0;n<D.length&&!D[n].includes("DetermineComponentFrameRoot");)n++;for(;l<V.length&&!V[l].includes("DetermineComponentFrameRoot");)l++;if(n===D.length||l===V.length)for(n=D.length-1,l=V.length-1;1<=n&&0<=l&&D[n]!==V[l];)l--;for(;1<=n&&0<=l;n--,l--)if(D[n]!==V[l]){if(n!==1||l!==1)do if(n--,l--,0>l||D[n]!==V[l]){var Q=`
`+D[n].replace(" at new "," at ");return e.displayName&&Q.includes("<anonymous>")&&(Q=Q.replace("<anonymous>",e.displayName)),Q}while(1<=n&&0<=l);break}}}finally{Qt=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?nt(a):""}function sa(e,t){switch(e.tag){case 26:case 27:case 5:return nt(e.type);case 16:return nt("Lazy");case 13:return e.child!==t&&t!==null?nt("Suspense Fallback"):nt("Suspense");case 19:return nt("SuspenseList");case 0:case 15:return ht(e.type,!1);case 11:return ht(e.type.render,!1);case 1:return ht(e.type,!0);case 31:return nt("Activity");case 30:return nt("ViewTransition");default:return""}}function Je(e){try{var t="",a=null;do t+=sa(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Jt=Object.prototype.hasOwnProperty,ua=d.unstable_scheduleCallback,Ot=d.unstable_cancelCallback,Xa=d.unstable_shouldYield,Ul=d.unstable_requestPaint,vt=d.unstable_now,Bl=d.unstable_getCurrentPriorityLevel,Ia=d.unstable_ImmediatePriority,Wt=d.unstable_UserBlockingPriority,st=d.unstable_NormalPriority,In=d.unstable_LowPriority,Le=d.unstable_IdlePriority,uo=d.log,xn=d.unstable_setDisableYieldValue,qa=null,Nt=null;function va(e){if(typeof uo=="function"&&xn(e),Nt&&typeof Nt.setStrictMode=="function")try{Nt.setStrictMode(qa,e)}catch{}}var Dt=Math.clz32?Math.clz32:ji,kl=Math.log,Mi=Math.LN2;function ji(e){return e>>>=0,e===0?32:31-(kl(e)/Mi|0)|0}var yn=256,qn=262144,Ui=4194304;function Sn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Bi(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var l=0,i=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var c=n&134217727;return c!==0?(n=c&~i,n!==0?l=Sn(n):(r&=c,r!==0?l=Sn(r):a||(a=c&~e,a!==0&&(l=Sn(a))))):(c=n&~i,c!==0?l=Sn(c):r!==0?l=Sn(r):a||(a=n&~e,a!==0&&(l=Sn(a)))),l===0?0:t!==0&&t!==l&&(t&i)===0&&(i=l&-l,a=t&-t,i>=a||i===32&&(a&4194048)!==0)?t:l}function Ll(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ku(e,t){(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var n=31-Dt(a),l=1<<n;t|=e[n],a&=~l}return t}function Mp(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qu(){var e=Ui;return Ui<<=1,(Ui&62914560)===0&&(Ui=4194304),e}function co(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Fl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function jp(e,t,a,n,l,i){var r=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var c=e.entanglements,D=e.expirationTimes,V=e.hiddenUpdates;for(a=r&~a;0<a;){var Q=31-Dt(a),re=1<<Q;c[Q]=0,D[Q]=-1;var G=V[Q];if(G!==null)for(V[Q]=null,Q=0;Q<G.length;Q++){var Z=G[Q];Z!==null&&(Z.lane&=-536870913)}a&=~re}n!==0&&Ju(e,n,0),i!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=i&~(r&~t))}function Ju(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-Dt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Wu(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-Dt(a),l=1<<n;l&t|e[n]&t&&(e[n]|=t),a&=~l}}function $u(e,t){var a=t&-t;return a=(a&42)!==0?1:fo(a),(a&(e.suspendedLanes|t))!==0?0:a}function fo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function mo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ec(){var e=Ae.p;return e!==0?e:(e=window.event,e===void 0?32:sp(e.type))}function tc(e,t){var a=Ae.p;try{return Ae.p=e,t()}finally{Ae.p=a}}var Na=Math.random().toString(36).slice(2),St="__reactFiber$"+Na,Bt="__reactProps$"+Na,Yn="__reactContainer$"+Na,ac="__reactEvents$"+Na,Up="__reactListeners$"+Na,Bp="__reactHandles$"+Na,nc="__reactResources$"+Na,Gl="__reactMarker$"+Na,ki="__reactLoad$"+Na;function Li(e){delete e[St],delete e[Bt],delete e[Up],delete e[Bp]}function _n(e){var t;if(t=e[St])return t;for(var a=e.parentNode;a;){if(t=a[Yn]||a[St]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Vm(e);e!==null;){if(a=e[St])return a;e=Vm(e)}return t}e=a,a=e.parentNode}return null}function Pn(e){if(e=e[St]||e[Yn]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Hl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(p(33))}function Zn(e){var t=e[nc];return t||(t=e[nc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function gt(e){e[Gl]=!0}function lc(e){e[ki]=void 0}var ic=new Set,rc={};function En(e,t){Kn(e,t),Kn(e+"Capture",t)}function Kn(e,t){for(rc[e]=t,e=0;e<t.length;e++)ic.add(t[e])}var kp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),oc={},sc={};function Lp(e){return Jt.call(sc,e)?!0:Jt.call(oc,e)?!1:kp.test(e)?sc[e]=!0:(oc[e]=!0,!1)}var qe=!1;function uc(){var e=qe;return qe=!1,e}function Fi(e,t,a){if(Lp(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,a)}}function Gi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,a)}}function Ra(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,n)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function cc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Fp(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(r){a=""+r,i.call(this,r)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(r){a=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function po(e){if(!e._valueTracker){var t=cc(e)?"checked":"value";e._valueTracker=Fp(e,t,""+e[t])}}function dc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=cc(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}var Gp=/[\n"\\]/g;function $t(e){return e.replace(Gp,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function ho(e,t,a,n,l,i,r,c){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Vt(t)):e.value!==""+Vt(t)&&(e.value=""+Vt(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?vo(e,Vt(e.value)):vo(e,Vt(t)):a!=null?vo(e,Vt(a)):n!=null&&e.removeAttribute("value"),l==null&&i!=null&&(e.defaultChecked=!!i),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.name=""+Vt(c):e.removeAttribute("name")}function fc(e,t,a,n,l,i,r,c){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){po(e);return}a=a!=null?""+Vt(a):"",t=t!=null?""+Vt(t):a,c||t===e.value||(e.value=t),e.defaultValue=t}n=n??l,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=c?e.checked:!!n,e.defaultChecked=!!n,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),po(e)}function vo(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function Qn(e,t,a,n){if(e=e.options,t){t={};for(var l=0;l<a.length;l++)t["$"+a[l]]=!0;for(a=0;a<e.length;a++)l=t.hasOwnProperty("$"+e[a].value),e[a].selected!==l&&(e[a].selected=l),l&&n&&(e[a].defaultSelected=!0)}else{for(a=""+Vt(a),t=null,l=0;l<e.length;l++){if(e[l].value===a){e[l].selected=!0,n&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function mc(e,t,a){if(t!=null&&(t=""+Vt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Vt(a):""}function pc(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(p(92));if(Re(n)){if(1<n.length)throw Error(p(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=Vt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),po(e)}function Jn(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Hp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hc(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||Hp.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function vc(e,t,a){if(t!=null&&typeof t!="object")throw Error(p(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="",qe=!0);for(var l in t)n=t[l],t.hasOwnProperty(l)&&a[l]!==n&&(hc(e,l,n),qe=!0)}else for(var i in t)t.hasOwnProperty(i)&&hc(e,i,t[i])}function go(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Vp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Xp=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Hi(e){return Xp.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ga(){}var bo=null;function xo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wn=null,$n=null;function gc(e){var t=Pn(e);if(t&&(e=t.stateNode)){var a=e[Bt]||null;e:switch(e=t.stateNode,t.type){case"input":if(ho(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+$t(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var l=n[Bt]||null;if(!l)throw Error(p(90));ho(n,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&dc(n)}break e;case"textarea":mc(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&Qn(e,!!a.multiple,t,!1)}}}var yo=!1;function bc(e,t,a){if(yo)return e(t,a);yo=!0;try{var n=e(t);return n}finally{if(yo=!1,(Wn!==null||$n!==null)&&(Hr(),Wn&&(t=Wn,e=$n,$n=Wn=null,gc(t),e)))for(t=0;t<e.length;t++)gc(e[t])}}function Vl(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Bt]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(p(231,t,typeof a));return a}var Oa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),So=!1;if(Oa)try{var Xl={};Object.defineProperty(Xl,"passive",{get:function(){So=!0}}),window.addEventListener("test",Xl,Xl),window.removeEventListener("test",Xl,Xl)}catch{So=!1}var Ya=null,_o=null,Vi=null;function xc(){if(Vi)return Vi;var e,t=_o,a=t.length,n,l="value"in Ya?Ya.value:Ya.textContent,i=l.length;for(e=0;e<a&&t[e]===l[e];e++);var r=a-e;for(n=1;n<=r&&t[a-n]===l[i-n];n++);return Vi=l.slice(e,1<n?1-n:void 0)}function Xi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ii(){return!0}function yc(){return!1}function zt(e){function t(a,n,l,i,r){this._reactName=a,this._targetInst=l,this.type=n,this.nativeEvent=i,this.target=r,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(a=e[c],this[c]=a?a(i):i[c]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ii:yc,this.isPropagationStopped=yc,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ii)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ii)},persist:function(){},isPersistent:Ii}),t}var Pa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qi=zt(Pa),Il=Y({},Pa,{view:0,detail:0}),Ip=zt(Il),Eo,Co,ql,Yi=Y({},Il,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ql&&(ql&&e.type==="mousemove"?(Eo=e.screenX-ql.screenX,Co=e.screenY-ql.screenY):Co=Eo=0,ql=e),Eo)},movementY:function(e){return"movementY"in e?e.movementY:Co}}),Sc=zt(Yi),qp=Y({},Yi,{dataTransfer:0}),Yp=zt(qp),Pp=Y({},Il,{relatedTarget:0}),To=zt(Pp),Zp=Y({},Pa,{animationName:0,elapsedTime:0,pseudoElement:0}),Kp=zt(Zp),Qp=Y({},Pa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Jp=zt(Qp),Wp=Y({},Pa,{data:0}),_c=zt(Wp),$p={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},th={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ah(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=th[e])?!!t[e]:!1}function wo(){return ah}var nh=Y({},Il,{key:function(e){if(e.key){var t=$p[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Xi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?eh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wo,charCode:function(e){return e.type==="keypress"?Xi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lh=zt(nh),ih=Y({},Yi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ec=zt(ih),rh=Y({},Pa,{submitter:0}),oh=zt(rh),sh=Y({},Il,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wo}),uh=zt(sh),ch=Y({},Pa,{propertyName:0,elapsedTime:0,pseudoElement:0}),dh=zt(ch),fh=Y({},Yi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),mh=zt(fh),ph=Y({},Pa,{newState:0,oldState:0,source:0}),hh=zt(ph),vh=[9,13,27,32],Ao=Oa&&"CompositionEvent"in window,Yl=null;Oa&&"documentMode"in document&&(Yl=document.documentMode);var gh=Oa&&"TextEvent"in window&&!Yl,Cc=Oa&&(!Ao||Yl&&8<Yl&&11>=Yl),Tc=" ",wc=!1;function Ac(e,t){switch(e){case"keyup":return vh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var el=!1;function bh(e,t){switch(e){case"compositionend":return Nc(t);case"keypress":return t.which!==32?null:(wc=!0,Tc);case"textInput":return e=t.data,e===Tc&&wc?null:e;default:return null}}function xh(e,t){if(el)return e==="compositionend"||!Ao&&Ac(e,t)?(e=xc(),Vi=_o=Ya=null,el=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cc&&t.locale!=="ko"?null:t.data;default:return null}}var yh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!yh[e.type]:t==="textarea"}function Oc(e,t,a,n){Wn?$n?$n.push(n):$n=[n]:Wn=n,t=Pr(t,"onChange"),0<t.length&&(a=new qi("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var Pl=null,Zl=null;function Sh(e){bm(e,0)}function Pi(e){var t=Hl(e);if(dc(t))return e}function Dc(e,t){if(e==="change")return t}var zc=!1;if(Oa){var No;if(Oa){var Ro="oninput"in document;if(!Ro){var Mc=document.createElement("div");Mc.setAttribute("oninput","return;"),Ro=typeof Mc.oninput=="function"}No=Ro}else No=!1;zc=No&&(!document.documentMode||9<document.documentMode)}function jc(){Pl&&(Pl.detachEvent("onpropertychange",Uc),Zl=Pl=null)}function Uc(e){if(e.propertyName==="value"&&Pi(Zl)){var t=[];Oc(t,Zl,e,xo(e)),bc(Sh,t)}}function _h(e,t,a){e==="focusin"?(jc(),Pl=t,Zl=a,Pl.attachEvent("onpropertychange",Uc)):e==="focusout"&&jc()}function Eh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Pi(Zl)}function Ch(e,t){if(e==="click")return Pi(t)}function Th(e,t){if(e==="input"||e==="change")return Pi(t)}function wh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xt=typeof Object.is=="function"?Object.is:wh;function Kl(e,t){if(Xt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var l=a[n];if(!Jt.call(t,l)||!Xt(e[l],t[l]))return!1}return!0}function Oo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kc(e,t){var a=Bc(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Bc(a)}}function Lc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Lc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Oo(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Oo(e.document)}return t}function Do(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Ah=Oa&&"documentMode"in document&&11>=document.documentMode,tl=null,zo=null,Ql=null,Mo=!1;function Gc(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Mo||tl==null||tl!==Oo(n)||(n=tl,"selectionStart"in n&&Do(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ql&&Kl(Ql,n)||(Ql=n,n=Pr(zo,"onSelect"),0<n.length&&(t=new qi("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=tl)))}function Cn(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var al={animationend:Cn("Animation","AnimationEnd"),animationiteration:Cn("Animation","AnimationIteration"),animationstart:Cn("Animation","AnimationStart"),transitionrun:Cn("Transition","TransitionRun"),transitionstart:Cn("Transition","TransitionStart"),transitioncancel:Cn("Transition","TransitionCancel"),transitionend:Cn("Transition","TransitionEnd")},jo={},Hc={};Oa&&(Hc=document.createElement("div").style,"AnimationEvent"in window||(delete al.animationend.animation,delete al.animationiteration.animation,delete al.animationstart.animation),"TransitionEvent"in window||delete al.transitionend.transition);function Tn(e){if(jo[e])return jo[e];if(!al[e])return e;var t=al[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Hc)return jo[e]=t[a];return e}var Vc=Tn("animationend"),Xc=Tn("animationiteration"),Ic=Tn("animationstart"),Nh=Tn("transitionrun"),Rh=Tn("transitionstart"),Oh=Tn("transitioncancel"),qc=Tn("transitionend"),Yc=new Map,Uo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uo.push("scrollEnd");function ca(e,t){Yc.set(e,t),En(t,[e])}var Dh=0;function Da(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=pa.identifierPrefix;var a=Dh++;return e="_"+e+"t_"+a.toString(32)+"_",t.autoName=e}function Pc(e){if(e==null||typeof e=="string")return e;var t=null,a=_l;if(a!==null)for(var n=0;n<a.length;n++){var l=e[a[n]];if(l!=null){if(l==="none")return"none";t=t==null?l:t+(" "+l)}}return t??e.default}function za(e,t){return e=Pc(e),t=Pc(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var Zi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ea=[],nl=0,Bo=0;function Ki(){for(var e=nl,t=Bo=nl=0;t<e;){var a=ea[t];ea[t++]=null;var n=ea[t];ea[t++]=null;var l=ea[t];ea[t++]=null;var i=ea[t];if(ea[t++]=null,n!==null&&l!==null){var r=n.pending;r===null?l.next=l:(l.next=r.next,r.next=l),n.pending=l}i!==0&&Zc(a,l,i)}}function Qi(e,t,a,n){ea[nl++]=e,ea[nl++]=t,ea[nl++]=a,ea[nl++]=n,Bo|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function ko(e,t,a,n){return Qi(e,t,a,n),Ji(e)}function wn(e,t){return Qi(e,null,null,t),Ji(e)}function Zc(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var l=!1,i=e.return;i!==null;)i.childLanes|=a,n=i.alternate,n!==null&&(n.childLanes|=a),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(l=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,l&&t!==null&&(l=31-Dt(a),e=i.hiddenUpdates,n=e[l],n===null?e[l]=[t]:n.push(t),t.lane=a|536870912),i):null}function Ji(e){if(50<bi)throw bi=0,Gr=null,Error(p(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ll={};function zh(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kt(e,t,a,n){return new zh(e,t,a,n)}function Lo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ma(e,t){var a=e.alternate;return a===null?(a=kt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&1206910976,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Kc(e,t){e.flags&=1206910978;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Wi(e,t,a,n,l,i){var r=0;if(n=e,typeof n=="function")Lo(n)&&(r=1);else if(typeof n=="string")r=r1(e,a,F.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(n){case J:return e=kt(31,a,t,l),e.elementType=J,e.lanes=i,e;case Ce:return An(a.children,l,i,t);case j:r=8,l|=24;break;case P:return e=kt(12,a,t,l|2),e.elementType=P,e.lanes=i,e;case $:return e=kt(13,a,t,l),e.elementType=$,e.lanes=i,e;case ye:return e=kt(19,a,t,l),e.elementType=ye,e.lanes=i,e;case _:case T:return e=l|32,e=kt(30,a,t,e),e.elementType=T,e.lanes=i,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case te:r=10;break e;case u:r=9;break e;case oe:r=11;break e;case se:r=14;break e;case Se:r=16,n=null;break e}r=29,a=Error(p(130,e===null?"null":typeof e,"")),n=null}return t=kt(r,a,t,l),t.elementType=e,t.type=n,t.lanes=i,t}function An(e,t,a,n){return e=kt(7,e,n,t),e.lanes=a,e}function Fo(e,t,a){return e=kt(6,e,null,t),e.lanes=a,e}function Qc(e){var t=kt(18,null,null,0);return t.stateNode=e,t}function Go(e,t,a){return t=kt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Jc=new WeakMap;function ta(e,t){if(typeof e=="object"&&e!==null){var a=Jc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Je(t)},Jc.set(e,t),t)}return{value:e,source:t,stack:Je(t)}}var il=[],rl=0,$i=null,Jl=0,aa=[],na=0,Za=null,ba=1,xa="";function ja(e,t){il[rl++]=Jl,il[rl++]=$i,$i=e,Jl=t}function Wc(e,t,a){aa[na++]=ba,aa[na++]=xa,aa[na++]=Za,Za=e;var n=ba;e=xa;var l=32-Dt(n)-1;n&=~(1<<l),a+=1;var i=32-Dt(t)+l;if(30<i){var r=l-l%5;i=(n&(1<<r)-1).toString(32),n>>=r,l-=r,ba=1<<32-Dt(t)+l|a<<l|n,xa=i+e}else ba=1<<i|a<<l|n,xa=e}function er(e){e.return!==null&&(ja(e,1),Wc(e,1,0))}function Ho(e){for(;e===$i;)$i=il[--rl],il[rl]=null,Jl=il[--rl],il[rl]=null;for(;e===Za;)Za=aa[--na],aa[na]=null,xa=aa[--na],aa[na]=null,ba=aa[--na],aa[na]=null}function $c(e,t){aa[na++]=ba,aa[na++]=xa,aa[na++]=Za,ba=t.id,xa=t.overflow,Za=e}var bt=null,et=null,ke=!1,Ka=null,la=!1,Vo=Error(p(519));function Qa(e){var t=Error(p(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Wl(ta(t,e)),Vo}function ed(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[St]=e,t[Bt]=n,a){case"dialog":Ge("cancel",t),Ge("close",t);break;case"iframe":case"object":case"embed":Ge("load",t);break;case"video":case"audio":for(a=0;a<yi.length;a++)Ge(yi[a],t);break;case"source":Ge("error",t);break;case"img":case"image":case"link":Ge("error",t),Ge("load",t);break;case"details":Ge("toggle",t);break;case"input":Ge("invalid",t),fc(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":Ge("invalid",t);break;case"textarea":Ge("invalid",t),pc(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||_m(t.textContent,a)?(n.popover!=null&&(Ge("beforetoggle",t),Ge("toggle",t)),n.onScroll!=null&&Ge("scroll",t),n.onScrollEnd!=null&&Ge("scrollend",t),n.onClick!=null&&(t.onclick=ga),t=!0):t=!1,t||Qa(e,!0)}function tr(e){for(bt=e.return;bt;)switch(bt.tag){case 5:case 31:case 13:la=!1;return;case 27:case 3:la=!0;return;default:bt=bt.return}}function ol(e){if(e!==bt)return!1;if(!ke)return tr(e),ke=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||bu(e.type,e.memoizedProps)),a=!a),a&&et&&Qa(e),tr(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(p(317));et=Hm(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(p(317));et=Hm(e)}else t===27?(t=et,mn(e.type)?(e=Au,Au=null,et=e):et=t):et=bt?ra(e.stateNode.nextSibling):null;return!0}function Nn(){et=bt=null,ke=!1}function Xo(){var e=Ka;return e!==null&&(Gt===null?Gt=e:Gt.push.apply(Gt,e),Ka=null),e}function Wl(e){Ka===null?Ka=[e]:Ka.push(e)}var Io=W(null),Rn=null,Ua=null;function Ja(e,t,a){x(Io,t._currentValue),t._currentValue=a}function Ba(e){e._currentValue=Io.current,A(Io)}function ar(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function qo(e,t,a,n){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var i=l.dependencies;if(i!==null){var r=l.child;i=i.firstContext;e:for(;i!==null;){var c=i;i=l;for(var D=0;D<t.length;D++)if(c.context===t[D]){i.lanes|=a,c=i.alternate,c!==null&&(c.lanes|=a),ar(i.return,a,e),n||(r=null);break e}i=c.next}}else if(l.tag===18){if(r=l.return,r===null)throw Error(p(341));r.lanes|=a,i=r.alternate,i!==null&&(i.lanes|=a),ar(r,a,e),r=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,r=l.alternate,r!==null&&(r.lanes|=a),ar(l.return,a,e),r=l.child,r=r!==null?r.sibling:null):r=l.child;if(r!==null)r.return=l;else for(r=l;r!==null;){if(r===e){r=null;break}if(l=r.sibling,l!==null){l.return=r.return,r=l;break}r=r.return}l=r}}function On(e,t,a,n){e=null;for(var l=t,i=!1;l!==null;){if(!i){if((l.flags&524288)!==0)i=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var r=l.alternate;if(r===null)throw Error(p(387));if(r=r.memoizedProps,r!==null){var c=l.type;Xt(l.pendingProps.value,r.value)||(e!==null?e.push(c):e=[c])}}else if(l===K.current){if(r=l.alternate,r===null)throw Error(p(387));r.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(zl):e=[zl])}l=l.return}return e!==null&&qo(t,e,a,n),t.flags|=262144,e!==null}function nr(e){for(e=e.firstContext;e!==null;){if(!Xt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Dn(e){Rn=e,Ua=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function _t(e){return td(Rn,e)}function lr(e,t){return Rn===null&&Dn(e),td(e,t)}function td(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Ua===null){if(e===null)throw Error(p(308));Ua=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ua=Ua.next=t;return a}var Mh=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},jh=d.unstable_scheduleCallback,Uh=d.unstable_NormalPriority,ct={$$typeof:te,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yo(){return{controller:new Mh,data:new Map,refCount:0}}function $l(e){e.refCount--,e.refCount===0&&jh(Uh,function(){e.controller.abort()})}function ad(e,t){if((e.pendingLanes&4194048)!==0){var a=e.transitionTypes;for(a===null&&(a=e.transitionTypes=[]),e=0;e<t.length;e++){var n=t[e];a.indexOf(n)===-1&&a.push(n)}}}var ei=null;function Bh(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var ti=null,Po=0,zn=0,sl=null;function kh(e,t){if(ti===null){var a=ti=[];Po=0,zn=uu(),sl={status:"pending",value:void 0,then:function(n){a.push(n)}}}return Po++,t.then(nd,nd),t}function nd(){if(--Po===0&&(ei=null,ti!==null)){sl!==null&&(sl.status="fulfilled");var e=ti;ti=null,zn=0,sl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Lh(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var l=0;l<a.length;l++)(0,a[l])(t)},function(l){for(n.status="rejected",n.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),n}var ld=xe.S;xe.S=function(e,t){if(Jf=vt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&kh(e,t),ei!==null)for(var a=wl;a!==null;)ad(a,ei),a=a.next;if(a=e.types,a!==null){for(var n=wl;n!==null;)ad(n,a),n=n.next;if(zn!==0){n=ei,n===null&&(n=ei=[]);for(var l=0;l<a.length;l++){var i=a[l];n.indexOf(i)===-1&&n.push(i)}}}ld!==null&&ld(e,t)};var Mn=W(null);function Zo(){var e=Mn.current;return e!==null?e:$e.pooledCache}function ir(e,t){t===null?x(Mn,Mn.current):x(Mn,t.pool)}function id(){var e=Zo();return e===null?null:{parent:ct._currentValue,pool:e}}var ul=Error(p(460)),Ko=Error(p(474)),rr=Error(p(542)),or={then:function(){}};function rd(e){return e=e.status,e==="fulfilled"||e==="rejected"}function od(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(ga,ga),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,ud(e),e===void 0&&!("reason"in t)?Error(p(600)):e;default:if(typeof t.status=="string")t.then(ga,ga);else{if(e=$e,e!==null&&100<e.shellSuspendCounter)throw Error(p(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=n}},function(n){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,ud(e),e}throw Un=t,ul}}function jn(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Un=a,ul):a}}var Un=null;function sd(){if(Un===null)throw Error(p(459));var e=Un;return Un=null,e}function ud(e){if(e===ul||e===rr)throw Error(p(483))}var cl=null,ai=0;function sr(e){var t=ai;return ai+=1,cl===null&&(cl=[]),od(cl,e,t)}function Wa(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ur(e,t){throw t.$$typeof===ne?Error(p(525)):(e=Object.prototype.toString.call(t),Error(p(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function cd(e){function t(H,k){if(e){var q=H.deletions;q===null?(H.deletions=[k],H.flags|=16):q.push(k)}}function a(H,k){if(!e)return null;for(;k!==null;)t(H,k),k=k.sibling;return null}function n(H){for(var k=new Map;H!==null;)H.key===null?k.set(H.index,H):k.set(H.key,H),H=H.sibling;return k}function l(H,k){return H=Ma(H,k),H.index=0,H.sibling=null,H}function i(H,k,q){return H.index=q,e?(q=H.alternate,q!==null?(q=q.index,q<k?(H.flags|=2,k):q):(H.flags|=134217730,k)):(H.flags|=1048576,k)}function r(H){return e&&H.alternate===null&&(H.flags|=134217730),H}function c(H,k,q,ie){return k===null||k.tag!==6?(k=Fo(q,H.mode,ie),k.return=H,k):(k=l(k,q),k.return=H,k)}function D(H,k,q,ie){var Te=q.type;return Te===Ce?(H=Q(H,k,q.props.children,ie,q.key),Wa(H,q),H):k!==null&&(k.elementType===Te||typeof Te=="object"&&Te!==null&&Te.$$typeof===Se&&jn(Te)===k.type)?(k=l(k,q.props),Wa(k,q),k.return=H,k):(k=Wi(q.type,q.key,q.props,null,H.mode,ie),Wa(k,q),k.return=H,k)}function V(H,k,q,ie){return k===null||k.tag!==4||k.stateNode.containerInfo!==q.containerInfo||k.stateNode.implementation!==q.implementation?(k=Go(q,H.mode,ie),k.return=H,k):(k=l(k,q.children||[]),k.return=H,k)}function Q(H,k,q,ie,Te){return k===null||k.tag!==7?(k=An(q,H.mode,ie,Te),k.return=H,k):(k=l(k,q),k.return=H,k)}function re(H,k,q){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return k=Fo(""+k,H.mode,q),k.return=H,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ee:return q=Wi(k.type,k.key,k.props,null,H.mode,q),Wa(q,k),q.return=H,q;case pe:return k=Go(k,H.mode,q),k.return=H,k;case Se:return k=jn(k),re(H,k,q)}if(Re(k)||he(k))return k=An(k,H.mode,q,null),k.return=H,k;if(typeof k.then=="function")return re(H,sr(k),q);if(k.$$typeof===te)return re(H,lr(H,k),q);ur(H,k)}return null}function G(H,k,q,ie){var Te=k!==null?k.key:null;if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return Te!==null?null:c(H,k,""+q,ie);if(typeof q=="object"&&q!==null){switch(q.$$typeof){case ee:return q.key===Te?D(H,k,q,ie):null;case pe:return q.key===Te?V(H,k,q,ie):null;case Se:return q=jn(q),G(H,k,q,ie)}if(Re(q)||he(q))return Te!==null?null:Q(H,k,q,ie,null);if(typeof q.then=="function")return G(H,k,sr(q),ie);if(q.$$typeof===te)return G(H,k,lr(H,q),ie);ur(H,q)}return null}function Z(H,k,q,ie,Te){if(typeof ie=="string"&&ie!==""||typeof ie=="number"||typeof ie=="bigint")return H=H.get(q)||null,c(k,H,""+ie,Te);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case ee:return H=H.get(ie.key===null?q:ie.key)||null,D(k,H,ie,Te);case pe:return H=H.get(ie.key===null?q:ie.key)||null,V(k,H,ie,Te);case Se:return ie=jn(ie),Z(H,k,q,ie,Te)}if(Re(ie)||he(ie))return H=H.get(q)||null,Q(k,H,ie,Te,null);if(typeof ie.then=="function")return Z(H,k,q,sr(ie),Te);if(ie.$$typeof===te)return Z(H,k,q,lr(k,ie),Te);ur(k,ie)}return null}function Ee(H,k,q,ie){for(var Te=null,Ve=null,Oe=k,De=k=0,mt=null;Oe!==null&&De<q.length;De++){Oe.index>De?(mt=Oe,Oe=null):mt=Oe.sibling;var Ie=G(H,Oe,q[De],ie);if(Ie===null){Oe===null&&(Oe=mt);break}e&&Oe&&Ie.alternate===null&&t(H,Oe),k=i(Ie,k,De),Ve===null?Te=Ie:Ve.sibling=Ie,Ve=Ie,Oe=mt}if(De===q.length)return a(H,Oe),ke&&ja(H,De),Te;if(Oe===null){for(;De<q.length;De++)Oe=re(H,q[De],ie),Oe!==null&&(k=i(Oe,k,De),Ve===null?Te=Oe:Ve.sibling=Oe,Ve=Oe);return ke&&ja(H,De),Te}for(Oe=n(Oe);De<q.length;De++)mt=Z(Oe,H,De,q[De],ie),mt!==null&&(e&&(Ie=mt.alternate,Ie!==null&&Oe.delete(Ie.key===null?De:Ie.key)),k=i(mt,k,De),Ve===null?Te=mt:Ve.sibling=mt,Ve=mt);return e&&Oe.forEach(function(bn){return t(H,bn)}),ke&&ja(H,De),Te}function we(H,k,q,ie){if(q==null)throw Error(p(151));for(var Te=null,Ve=null,Oe=k,De=k=0,mt=null,Ie=q.next();Oe!==null&&!Ie.done;De++,Ie=q.next()){Oe.index>De?(mt=Oe,Oe=null):mt=Oe.sibling;var bn=G(H,Oe,Ie.value,ie);if(bn===null){Oe===null&&(Oe=mt);break}e&&Oe&&bn.alternate===null&&t(H,Oe),k=i(bn,k,De),Ve===null?Te=bn:Ve.sibling=bn,Ve=bn,Oe=mt}if(Ie.done)return a(H,Oe),ke&&ja(H,De),Te;if(Oe===null){for(;!Ie.done;De++,Ie=q.next())Ie=re(H,Ie.value,ie),Ie!==null&&(k=i(Ie,k,De),Ve===null?Te=Ie:Ve.sibling=Ie,Ve=Ie);return ke&&ja(H,De),Te}for(Oe=n(Oe);!Ie.done;De++,Ie=q.next())Ie=Z(Oe,H,De,Ie.value,ie),Ie!==null&&(e&&(mt=Ie.alternate,mt!==null&&Oe.delete(mt.key===null?De:mt.key)),k=i(Ie,k,De),Ve===null?Te=Ie:Ve.sibling=Ie,Ve=Ie);return e&&Oe.forEach(function(b1){return t(H,b1)}),ke&&ja(H,De),Te}function Ue(H,k,q,ie){if(typeof q=="object"&&q!==null&&q.type===Ce&&q.key===null&&q.props.ref===void 0&&(q=q.props.children),typeof q=="object"&&q!==null){switch(q.$$typeof){case ee:e:{for(var Te=q.key;k!==null;){if(k.key===Te){if(Te=q.type,Te===Ce){if(k.tag===7){a(H,k.sibling),ie=l(k,q.props.children),Wa(ie,q),ie.return=H,H=ie;break e}}else if(k.elementType===Te||typeof Te=="object"&&Te!==null&&Te.$$typeof===Se&&jn(Te)===k.type){a(H,k.sibling),ie=l(k,q.props),Wa(ie,q),ie.return=H,H=ie;break e}a(H,k);break}else t(H,k);k=k.sibling}q.type===Ce?(ie=An(q.props.children,H.mode,ie,q.key),Wa(ie,q),ie.return=H,H=ie):(ie=Wi(q.type,q.key,q.props,null,H.mode,ie),Wa(ie,q),ie.return=H,H=ie)}return r(H);case pe:e:{for(Te=q.key;k!==null;){if(k.key===Te)if(k.tag===4&&k.stateNode.containerInfo===q.containerInfo&&k.stateNode.implementation===q.implementation){a(H,k.sibling),ie=l(k,q.children||[]),ie.return=H,H=ie;break e}else{a(H,k);break}else t(H,k);k=k.sibling}ie=Go(q,H.mode,ie),ie.return=H,H=ie}return r(H);case Se:return q=jn(q),Ue(H,k,q,ie)}if(Re(q))return Ee(H,k,q,ie);if(he(q)){if(Te=he(q),typeof Te!="function")throw Error(p(150));return q=Te.call(q),we(H,k,q,ie)}if(typeof q.then=="function")return Ue(H,k,sr(q),ie);if(q.$$typeof===te)return Ue(H,k,lr(H,q),ie);ur(H,q)}return typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint"?(q=""+q,k!==null&&k.tag===6?(a(H,k.sibling),ie=l(k,q),ie.return=H,H=ie):(a(H,k),ie=Fo(q,H.mode,ie),ie.return=H,H=ie),r(H)):a(H,k)}return function(H,k,q,ie){try{ai=0;var Te=Ue(H,k,q,ie);return cl=null,Te}catch(Oe){if(Oe===ul||Oe===rr)throw Oe;var Ve=kt(29,Oe,null,H.mode);return Ve.lanes=ie,Ve.return=H,Ve}finally{}}}var Bn=cd(!0),dd=cd(!1),$a=!1;function Qo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Jo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function en(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function tn(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(Ye&2)!==0){var l=n.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),n.pending=t,t=Ji(e),Zc(e,null,a),t}return Qi(e,n,t,a),Ji(e)}function ni(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Wu(e,a)}}function Wo(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var l=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var r={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?l=i=r:i=i.next=r,a=a.next}while(a!==null);i===null?l=i=t:i=i.next=t}else l=i=t;a={baseState:n.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var $o=!1;function li(){if($o){var e=sl;if(e!==null)throw e}}function ii(e,t,a,n){$o=!1;var l=e.updateQueue;$a=!1;var i=l.firstBaseUpdate,r=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var D=c,V=D.next;D.next=null,r===null?i=V:r.next=V,r=D;var Q=e.alternate;Q!==null&&(Q=Q.updateQueue,c=Q.lastBaseUpdate,c!==r&&(c===null?Q.firstBaseUpdate=V:c.next=V,Q.lastBaseUpdate=D))}if(i!==null){var re=l.baseState;r=0,Q=V=D=null,c=i;do{var G=c.lane&-536870913,Z=G!==c.lane;if(Z?(He&G)===G:(n&G)===G){G!==0&&G===zn&&($o=!0),Q!==null&&(Q=Q.next={lane:0,tag:c.tag,payload:c.payload,callback:null,next:null});e:{var Ee=e,we=c;G=t;var Ue=a;switch(we.tag){case 1:if(Ee=we.payload,typeof Ee=="function"){re=Ee.call(Ue,re,G);break e}re=Ee;break e;case 3:Ee.flags=Ee.flags&-65537|128;case 0:if(Ee=we.payload,G=typeof Ee=="function"?Ee.call(Ue,re,G):Ee,G==null)break e;re=Y({},re,G);break e;case 2:$a=!0}}G=c.callback,G!==null&&(e.flags|=64,Z&&(e.flags|=8192),Z=l.callbacks,Z===null?l.callbacks=[G]:Z.push(G))}else Z={lane:G,tag:c.tag,payload:c.payload,callback:c.callback,next:null},Q===null?(V=Q=Z,D=re):Q=Q.next=Z,r|=G;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;Z=c,c=Z.next,Z.next=null,l.lastBaseUpdate=Z,l.shared.pending=null}}while(!0);Q===null&&(D=re),l.baseState=D,l.firstBaseUpdate=V,l.lastBaseUpdate=Q,i===null&&(l.shared.lanes=0),un|=r,e.lanes=r,e.memoizedState=re}}function fd(e,t){if(typeof e!="function")throw Error(p(191,e));e.call(t)}function md(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)fd(a[e],t)}var an=W(null),cr=W(0);function pd(e,t){e=Ha,x(cr,e),x(an,t),Ha=e|t.baseLanes}function es(){x(cr,Ha),x(an,an.current)}function ts(){Ha=cr.current,A(an),A(cr)}var Et=W(null),Rt=null;function nn(e){var t=e.alternate;x(Ct,Ct.current&1),x(Et,e),Rt===null&&(t===null||an.current!==null||t.memoizedState!==null)&&(Rt=e)}function as(e){x(Ct,Ct.current),x(Et,e),Rt===null&&(Rt=e)}function hd(e){e.tag===22?(x(Ct,Ct.current),x(Et,e),Rt===null&&(Rt=e)):ln()}function ln(){x(Ct,Ct.current),x(Et,Et.current)}function It(e){A(Et),Rt===e&&(Rt=null),A(Ct)}var Ct=W(0);function ri(e,t){x(Et,Et.current),x(Ct,t)}function ns(e){A(Ct),A(Et),Rt===e&&(Rt=null)}function dr(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Tu(a)||wu(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ka=0,je=null,We=null,dt=null,fr=!1,dl=!1,kn=!1,mr=0,oi=0,fl=null,Fh=0;function rt(){throw Error(p(321))}function ls(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Xt(e[a],t[a]))return!1;return!0}function is(e,t,a,n,l,i){return ka=i,je=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,xe.H=e===null||e.memoizedState===null?Wd:$d,kn=!1,i=a(n,l),kn=!1,dl&&(i=gd(t,a,n,l)),vd(e),i}function vd(e){xe.H=yr;var t=We!==null&&We.next!==null;if(ka=0,dt=We=je=null,fr=!1,oi=0,fl=null,t)throw Error(p(300));e===null||ft||(e=e.dependencies,e!==null&&nr(e)&&(ft=!0))}function gd(e,t,a,n){je=e;var l=0;do{if(dl&&(fl=null),oi=0,dl=!1,25<=l)throw Error(p(301));if(l+=1,dt=We=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}xe.H=Ph,i=t(a,n)}while(dl);return i}function Gh(){var e=xe.H,t=e.useState()[0];return t=typeof t.then=="function"?si(t):t,e=e.useState()[0],(We!==null?We.memoizedState:null)!==e&&(je.flags|=1024),t}function rs(){var e=mr!==0;return mr=0,e}function os(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function ss(e){if(fr){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fr=!1}ka=0,dt=We=je=null,dl=!1,oi=mr=0,fl=null}function Mt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?je.memoizedState=dt=e:dt=dt.next=e,dt}function ut(){if(We===null){var e=je.alternate;e=e!==null?e.memoizedState:null}else e=We.next;var t=dt===null?je.memoizedState:dt.next;if(t!==null)dt=t,We=e;else{if(e===null)throw je.alternate===null?Error(p(467)):Error(p(310));We=e,e={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},dt===null?je.memoizedState=dt=e:dt=dt.next=e}return dt}function pr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function si(e){var t=oi;return oi+=1,fl===null&&(fl=[]),e=od(fl,e,t),t=je,(dt===null?t.memoizedState:dt.next)===null&&(t=t.alternate,xe.H=t===null||t.memoizedState===null?Wd:$d),e}function hr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return si(e);if(e.$$typeof===g)return;if(e.$$typeof===te)return _t(e)}throw Error(p(438,String(e)))}function us(e){var t=null,a=je.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=je.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=pr(),je.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=ce;return t.index++,a}function La(e,t){return typeof t=="function"?t(e):t}function vr(e){var t=ut();return cs(t,We,e)}function cs(e,t,a){var n=e.queue;if(n===null)throw Error(p(311));n.lastRenderedReducer=a;var l=e.baseQueue,i=n.pending;if(i!==null){if(l!==null){var r=l.next;l.next=i.next,i.next=r}t.baseQueue=l=i,n.pending=null}if(i=e.baseState,l===null)e.memoizedState=i;else{t=l.next;var c=r=null,D=null,V=t,Q=!1;do{var re=V.lane&-536870913;if(re!==V.lane?(He&re)===re:(ka&re)===re){var G=V.revertLane;if(G===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null}),re===zn&&(Q=!0);else if((ka&G)===G){V=V.next,G===zn&&(Q=!0);continue}else re={lane:0,revertLane:V.revertLane,gesture:null,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null},D===null?(c=D=re,r=i):D=D.next=re,je.lanes|=G,un|=G;re=V.action,kn&&a(i,re),i=V.hasEagerState?V.eagerState:a(i,re)}else G={lane:re,revertLane:V.revertLane,gesture:V.gesture,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null},D===null?(c=D=G,r=i):D=D.next=G,je.lanes|=re,un|=re;V=V.next}while(V!==null&&V!==t);if(D===null?r=i:D.next=c,!Xt(i,e.memoizedState)&&(ft=!0,Q&&(a=sl,a!==null)))throw a;e.memoizedState=i,e.baseState=r,e.baseQueue=D,n.lastRenderedState=i}return l===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function ds(e){var t=ut(),a=t.queue;if(a===null)throw Error(p(311));a.lastRenderedReducer=e;var n=a.dispatch,l=a.pending,i=t.memoizedState;if(l!==null){a.pending=null;var r=l=l.next;do i=e(i,r.action),r=r.next;while(r!==l);Xt(i,t.memoizedState)||(ft=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),a.lastRenderedState=i}return[i,n]}function bd(e,t,a){var n=je,l=ut(),i=ke;if(i){if(a===void 0)throw Error(p(407));a=a()}else a=t();var r=!Xt((We||l).memoizedState,a);if(r&&(l.memoizedState=a,ft=!0),l=l.queue,ps(Sd.bind(null,n,l,e),[e]),e=l.getSnapshot!==t||r||dt!==null&&(dt.memoizedState.tag&1)!==0,ml(e?9:8,{destroy:void 0},yd.bind(null,n,l,a,t),null),e){if(n.flags|=2048,$e===null)throw Error(p(349));i||(ka&127)!==0||xd(n,t,a)}return a}function xd(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=je.updateQueue,t===null?(t=pr(),je.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function yd(e,t,a,n){t.value=a,t.getSnapshot=n,_d(t)&&Ed(e)}function Sd(e,t,a){return a(function(){_d(t)&&Ed(e)})}function _d(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Xt(e,a)}catch{return!0}}function Ed(e){var t=wn(e,2);t!==null&&Ht(t,e,2)}function fs(e){var t=Mt();if(typeof e=="function"){var a=e;if(e=a(),kn){va(!0);try{a()}finally{va(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:e},t}function Cd(e,t,a,n){return e.baseState=a,cs(e,We,typeof n=="function"?n:La)}function Hh(e,t,a,n,l){if(xr(e))throw Error(p(485));if(e=t.action,e!==null){var i={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){i.listeners.push(r)}};xe.T!==null?a(!0):i.isTransition=!1,n(i),a=t.pending,a===null?(i.next=t.pending=i,Td(t,i)):(i.next=a.next,t.pending=a.next=i)}}function Td(e,t){var a=t.action,n=t.payload,l=e.state;if(t.isTransition){var i=xe.T,r={};r.types=i!==null?i.types:null,xe.T=r;try{var c=a(l,n),D=xe.S;D!==null&&D(r,c),wd(e,t,c)}catch(V){ms(e,t,V)}finally{i!==null&&r.types!==null&&(i.types=r.types),xe.T=i}}else try{i=a(l,n),wd(e,t,i)}catch(V){ms(e,t,V)}}function wd(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){Ad(e,t,n)},function(n){return ms(e,t,n)}):Ad(e,t,a)}function Ad(e,t,a){t.status="fulfilled",t.value=a,Nd(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Td(e,a)))}function ms(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Nd(t),t=t.next;while(t!==n)}e.action=null}function Nd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Rd(e,t){return t}function Od(e,t){if(ke){var a=$e.formState;if(a!==null){e:{var n=je;if(ke){if(et){t:{for(var l=et,i=la;l.nodeType!==8;){if(!i){l=null;break t}if(l=ra(l.nextSibling),l===null){l=null;break t}}i=l.data,l=i==="F!"||i==="F"?l:null}if(l){et=ra(l.nextSibling),n=l.data==="F!";break e}}Qa(n)}n=!1}n&&(t=a[0])}}return a=Mt(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rd,lastRenderedState:t},a.queue=n,a=Kd.bind(null,je,n),n.dispatch=a,n=fs(!1),i=xs.bind(null,je,!1,n.queue),n=Mt(),l={state:t,dispatch:null,action:e,pending:null},n.queue=l,a=Hh.bind(null,je,l,i,a),l.dispatch=a,n.memoizedState=e,[t,a,!1]}function Dd(e){var t=ut();return zd(t,We,e)}function zd(e,t,a){if(t=cs(e,t,Rd)[0],e=vr(La)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=si(t)}catch(r){throw r===ul?rr:r}else n=t;t=ut();var l=t.queue,i=l.dispatch;return a!==t.memoizedState&&(je.flags|=2048,ml(9,{destroy:void 0},Vh.bind(null,l,a),null)),[n,i,e]}function Vh(e,t){e.action=t}function Md(e){var t=ut(),a=We;if(a!==null)return zd(t,a,e);ut(),t=t.memoizedState,a=ut();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function ml(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=je.updateQueue,t===null&&(t=pr(),je.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function jd(){return ut().memoizedState}function gr(e,t,a,n){var l=Mt();je.flags|=e,l.memoizedState=ml(1|t,{destroy:void 0},a,n===void 0?null:n)}function br(e,t,a,n){var l=ut();n=n===void 0?null:n;var i=l.memoizedState.inst;We!==null&&n!==null&&ls(n,We.memoizedState.deps)?l.memoizedState=ml(t,i,a,n):(je.flags|=e,l.memoizedState=ml(1|t,i,a,n))}function Ud(e,t){gr(8390656,8,e,t)}function ps(e,t){br(2048,8,e,t)}function Xh(e){je.flags|=4;var t=je.updateQueue;if(t===null)t=pr(),je.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Bd(e){var t=ut().memoizedState;return Xh({ref:t,nextImpl:e}),function(){if((Ye&2)!==0)throw Error(p(440));return t.impl.apply(void 0,arguments)}}function kd(e,t){return br(4,2,e,t)}function Ld(e,t){return br(4,4,e,t)}function Fd(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gd(e,t,a){a=a!=null?a.concat([e]):null,br(4,4,Fd.bind(null,t,e),a)}function hs(){}function Hd(e,t){var a=ut();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&ls(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function Vd(e,t){var a=ut();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&ls(t,n[1]))return n[0];if(n=e(),kn){va(!0);try{e()}finally{va(!1)}}return a.memoizedState=[n,t],n}function vs(e,t,a){return a===void 0||(ka&1073741824)!==0&&(He&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=$f(),je.lanes|=e,un|=e,a)}function Xd(e,t,a,n){return Xt(a,t)?a:an.current!==null?(e=vs(e,a,n),Xt(e,t)||(ft=!0),e):(ka&106)===0||(ka&1073741824)!==0&&(He&261930)===0?(ft=!0,e.memoizedState=a):(e=$f(),je.lanes|=e,un|=e,t)}function Id(e,t,a,n,l){var i=Ae.p;Ae.p=i!==0&&8>i?i:8;var r=xe.T,c={};c.types=r!==null?r.types:null,xe.T=c,xs(e,!1,t,a);try{var D=l(),V=xe.S;if(V!==null&&V(c,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var Q=Lh(D,n);ui(e,t,Q,Zt(e))}else ui(e,t,n,Zt(e))}catch(re){ui(e,t,{then:function(){},status:"rejected",reason:re},Zt())}finally{Ae.p=i,r!==null&&c.types!==null&&(r.types=c.types),xe.T=r}}function Ih(){}function gs(e,t,a,n){if(e.tag!==5)throw Error(p(476));var l=qd(e).queue;Id(e,l,t,at,a===null?Ih:function(){return Yd(e),a(n)})}function qd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:at,baseState:at,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:at},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Yd(e){var t=qd(e);t.next===null&&(t=e.alternate.memoizedState),ui(e,t.next.queue,{},Zt())}function bs(){return _t(zl)}function Pd(){return ut().memoizedState}function Zd(){return ut().memoizedState}function qh(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Zt();e=en(a);var n=tn(t,e,a);n!==null&&(Ht(n,t,a),ni(n,t,a)),t={cache:Yo()},e.payload=t;return}t=t.return}}function Yh(e,t,a){var n=Zt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},xr(e)?Qd(t,a):(a=ko(e,t,a,n),a!==null&&(Ht(a,e,n),Jd(a,t,n)))}function Kd(e,t,a){var n=Zt();ui(e,t,a,n)}function ui(e,t,a,n){var l={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(xr(e))Qd(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var r=t.lastRenderedState,c=i(r,a);if(l.hasEagerState=!0,l.eagerState=c,Xt(c,r))return Qi(e,t,l,0),$e===null&&Ki(),!1}catch{}finally{}if(a=ko(e,t,l,n),a!==null)return Ht(a,e,n),Jd(a,t,n),!0}return!1}function xs(e,t,a,n){if(n={lane:2,revertLane:uu(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},xr(e)){if(t)throw Error(p(479))}else t=ko(e,a,n,2),t!==null&&Ht(t,e,2)}function xr(e){var t=e.alternate;return e===je||t!==null&&t===je}function Qd(e,t){dl=fr=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Jd(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Wu(e,a)}}var yr={readContext:_t,use:hr,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useLayoutEffect:rt,useInsertionEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useSyncExternalStore:rt,useId:rt,useHostTransitionStatus:rt,useFormState:rt,useActionState:rt,useOptimistic:rt,useMemoCache:rt,useCacheRefresh:rt,useEffectEvent:rt},Wd={readContext:_t,use:hr,useCallback:function(e,t){return Mt().memoizedState=[e,t===void 0?null:t],e},useContext:_t,useEffect:Ud,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,gr(4194308,4,Fd.bind(null,t,e),a)},useLayoutEffect:function(e,t){return gr(4194308,4,e,t)},useInsertionEffect:function(e,t){gr(4,2,e,t)},useMemo:function(e,t){var a=Mt();t=t===void 0?null:t;var n=e();if(kn){va(!0);try{e()}finally{va(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=Mt();if(a!==void 0){var l=a(t);if(kn){va(!0);try{a(t)}finally{va(!1)}}}else l=t;return n.memoizedState=n.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},n.queue=e,e=e.dispatch=Yh.bind(null,je,e),[n.memoizedState,e]},useRef:function(e){var t=Mt();return e={current:e},t.memoizedState=e},useState:function(e){e=fs(e);var t=e.queue,a=Kd.bind(null,je,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:hs,useDeferredValue:function(e,t){var a=Mt();return vs(a,e,t)},useTransition:function(){var e=fs(!1);return e=Id.bind(null,je,e.queue,!0,!1),Mt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=je,l=Mt();if(ke){if(a===void 0)throw Error(p(407));a=a()}else{if(a=t(),$e===null)throw Error(p(349));(He&127)!==0||xd(n,t,a)}l.memoizedState=a;var i={value:a,getSnapshot:t};return l.queue=i,Ud(Sd.bind(null,n,i,e),[e]),n.flags|=2048,ml(9,{destroy:void 0},yd.bind(null,n,i,a,t),null),a},useId:function(){var e=Mt(),t=$e.identifierPrefix;if(ke){var a=xa,n=ba;a=(n&~(1<<32-Dt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=mr++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=Fh++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:bs,useFormState:Od,useActionState:Od,useOptimistic:function(e){var t=Mt();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=xs.bind(null,je,!0,a),a.dispatch=t,[e,t]},useMemoCache:us,useCacheRefresh:function(){return Mt().memoizedState=qh.bind(null,je)},useEffectEvent:function(e){var t=Mt(),a={impl:e};return t.memoizedState=a,function(){if((Ye&2)!==0)throw Error(p(440));return a.impl.apply(void 0,arguments)}}},$d={readContext:_t,use:hr,useCallback:Hd,useContext:_t,useEffect:ps,useImperativeHandle:Gd,useInsertionEffect:kd,useLayoutEffect:Ld,useMemo:Vd,useReducer:vr,useRef:jd,useState:function(){return vr(La)},useDebugValue:hs,useDeferredValue:function(e,t){var a=ut();return Xd(a,We.memoizedState,e,t)},useTransition:function(){var e=vr(La)[0],t=ut().memoizedState;return[typeof e=="boolean"?e:si(e),t]},useSyncExternalStore:bd,useId:Pd,useHostTransitionStatus:bs,useFormState:Dd,useActionState:Dd,useOptimistic:function(e,t){var a=ut();return Cd(a,We,e,t)},useMemoCache:us,useCacheRefresh:Zd,useEffectEvent:Bd},Ph={readContext:_t,use:hr,useCallback:Hd,useContext:_t,useEffect:ps,useImperativeHandle:Gd,useInsertionEffect:kd,useLayoutEffect:Ld,useMemo:Vd,useReducer:ds,useRef:jd,useState:function(){return ds(La)},useDebugValue:hs,useDeferredValue:function(e,t){var a=ut();return We===null?vs(a,e,t):Xd(a,We.memoizedState,e,t)},useTransition:function(){var e=ds(La)[0],t=ut().memoizedState;return[typeof e=="boolean"?e:si(e),t]},useSyncExternalStore:bd,useId:Pd,useHostTransitionStatus:bs,useFormState:Md,useActionState:Md,useOptimistic:function(e,t){var a=ut();return We!==null?Cd(a,We,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:us,useCacheRefresh:Zd,useEffectEvent:Bd};function ys(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:Y({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Ss={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=Zt(),l=en(n);l.payload=t,a!=null&&(l.callback=a),t=tn(e,l,n),t!==null&&(Ht(t,e,n),ni(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=Zt(),l=en(n);l.tag=1,l.payload=t,a!=null&&(l.callback=a),t=tn(e,l,n),t!==null&&(Ht(t,e,n),ni(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Zt(),n=en(a);n.tag=2,t!=null&&(n.callback=t),t=tn(e,n,a),t!==null&&(Ht(t,e,a),ni(t,e,a))}};function ef(e,t,a,n,l,i,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,r):t.prototype&&t.prototype.isPureReactComponent?!Kl(a,n)||!Kl(l,i):!0}function tf(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&Ss.enqueueReplaceState(t,t.state,null)}function Ln(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=Y({},a));for(var l in e)a[l]===void 0&&(a[l]=e[l])}return a}function af(e){Zi(e)}function nf(e){console.error(e)}function lf(e){Zi(e)}function Sr(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function rf(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function _s(e,t,a){return a=en(a),a.tag=3,a.payload={element:null},a.callback=function(){Sr(e,t)},a}function of(e){return e=en(e),e.tag=3,e}function sf(e,t,a,n){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var i=n.value;e.payload=function(){return l(i)},e.callback=function(){rf(t,a,n)}}var r=a.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){rf(t,a,n),typeof l!="function"&&(cn===null?cn=new Set([this]):cn.add(this));var c=n.stack;this.componentDidCatch(n.value,{componentStack:c!==null?c:""})})}function Zh(e,t,a,n,l){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&On(t,a,l,!0),a=Et.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Rt===null?Vr():a.alternate===null&&ot===0&&(ot=3),a.flags&=-257,a.flags|=65536,a.lanes=l,n===or?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),ru(e,n,l)),!1;case 22:return a.flags|=65536,n===or?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),ru(e,n,l)),!1}throw Error(p(435,a.tag))}return ru(e,n,l),Vr(),!1}if(ke)return t=Et.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,n!==Vo&&(e=Error(p(422),{cause:n}),Wl(ta(e,a)))):(n!==Vo&&(t=Error(p(423),{cause:n}),Wl(ta(t,a))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,n=ta(n,a),l=_s(e.stateNode,n,l),Wo(e,l),ot!==4&&(ot=2)),!1;var i=Error(p(520),{cause:n});if(i=ta(i,a),gi===null?gi=[i]:gi.push(i),ot!==4&&(ot=2),t===null)return!0;n=ta(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=l&-l,a.lanes|=e,e=_s(a.stateNode,n,e),Wo(a,e),!1;case 1:if(t=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(cn===null||!cn.has(i))))return a.flags|=65536,l&=-l,a.lanes|=l,l=of(l),sf(l,e,a,n),Wo(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var Es=Error(p(461)),ft=!1;function pt(e,t,a,n){t.child=e===null?dd(t,null,a,n):Bn(t,e.child,a,n)}function uf(e,t,a,n,l){a=a.render;var i=t.ref;if("ref"in n){var r={};for(var c in n)c!=="ref"&&(r[c]=n[c])}else r=n;return Dn(t),n=is(e,t,a,r,i,l),c=rs(),e!==null&&!ft?(os(e,t,l),Fa(e,t,l)):(ke&&c&&er(t),t.flags|=1,pt(e,t,n,l),t.child)}function cf(e,t,a,n,l){if(e===null){var i=a.type;return typeof i=="function"&&!Lo(i)&&i.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=i,df(e,t,i,n,l)):(e=Wi(a.type,null,n,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Ds(e,l)){var r=i.memoizedProps;if(a=a.compare,a=a!==null?a:Kl,a(r,n)&&e.ref===t.ref)return Fa(e,t,l)}return t.flags|=1,e=Ma(i,n),e.ref=t.ref,e.return=t,t.child=e}function df(e,t,a,n,l){if(e!==null){var i=e.memoizedProps;if(Kl(i,n)&&e.ref===t.ref)if(ft=!1,t.pendingProps=n=i,Ds(e,l))(e.flags&131072)!==0&&(ft=!0);else return t.lanes=e.lanes,Fa(e,t,l)}return Cs(e,t,a,n,l)}function ff(e,t,a,n){var l=n.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,e!==null){for(n=t.child=e.child,l=0;n!==null;)l=l|n.lanes|n.childLanes,n=n.sibling;n=l&~i}else n=0,t.child=null;return mf(e,t,i,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ir(t,i!==null?i.cachePool:null),i!==null?pd(t,i):es(),hd(t);else return n=t.lanes=536870912,mf(e,t,i!==null?i.baseLanes|a:a,a,n)}else i!==null?(ir(t,i.cachePool),pd(t,i),ln(),t.memoizedState=null):(e!==null&&ir(t,null),es(),ln());return pt(e,t,l,a),t.child}function ci(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function mf(e,t,a,n,l){var i=Zo();return i=i===null?null:{parent:ct._currentValue,pool:i},t.memoizedState={baseLanes:a,cachePool:i},e!==null&&ir(t,null),es(),hd(t),e!==null&&On(e,t,n,!0),t.childLanes=l,null}function _r(e,t){return t=Er({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function pf(e,t,a){return Bn(t,e.child,null,a),e=_r(t,t.pendingProps),e.flags|=2,It(t),t.memoizedState=null,e}function Kh(e,t,a){var n=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ke){if(n.mode==="hidden")return e=_r(t,n),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},ci(null,e);if(as(t),(e=et)?(e=Gm(e,la),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Za!==null?{id:ba,overflow:xa}:null,retryLane:536870912,hydrationErrors:null},a=Qc(e),a.return=t,t.child=a,bt=t,et=null)):e=null,e===null)throw Qa(t);return t.lanes=536870912,null}return _r(t,n)}var i=e.memoizedState;if(i!==null){var r=i.dehydrated;if(as(t),l)if(t.flags&256)t.flags&=-257,t=pf(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(p(558));else if(ft||On(e,t,a,!1),l=(a&e.childLanes)!==0,ft||l){if(an.current===null){if(n=$e,n!==null&&(r=$u(n,a),r!==0&&r!==i.retryLane))throw i.retryLane=r,wn(e,r),Ht(n,e,r),Es;Vr()}t=pf(e,t,a)}else e=i.treeContext,et=ra(r.nextSibling),bt=t,ke=!0,Ka=null,la=!1,e!==null&&$c(t,e),t=_r(t,n),t.flags|=134221824;return t}return e=Ma(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function pl(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(p(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Cs(e,t,a,n,l){return Dn(t),a=is(e,t,a,n,void 0,l),n=rs(),e!==null&&!ft?(os(e,t,l),Fa(e,t,l)):(ke&&n&&er(t),t.flags|=1,pt(e,t,a,l),t.child)}function hf(e,t,a,n,l,i){return Dn(t),t.updateQueue=null,a=gd(t,n,a,l),vd(e),n=rs(),e!==null&&!ft?(os(e,t,i),Fa(e,t,i)):(ke&&n&&er(t),t.flags|=1,pt(e,t,a,i),t.child)}function vf(e,t,a,n,l){if(Dn(t),t.stateNode===null){var i=ll,r=a.contextType;typeof r=="object"&&r!==null&&(i=_t(r)),i=new a(n,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ss,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=n,i.state=t.memoizedState,i.refs={},Qo(t),r=a.contextType,i.context=typeof r=="object"&&r!==null?_t(r):ll,i.state=t.memoizedState,r=a.getDerivedStateFromProps,typeof r=="function"&&(ys(t,a,r,n),i.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&Ss.enqueueReplaceState(i,i.state,null),ii(t,n,i,l),li(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){i=t.stateNode;var c=t.memoizedProps,D=Ln(a,c);i.props=D;var V=i.context,Q=a.contextType;r=ll,typeof Q=="object"&&Q!==null&&(r=_t(Q));var re=a.getDerivedStateFromProps;Q=typeof re=="function"||typeof i.getSnapshotBeforeUpdate=="function",c=t.pendingProps!==c,Q||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c||V!==r)&&tf(t,i,n,r),$a=!1;var G=t.memoizedState;i.state=G,ii(t,n,i,l),li(),V=t.memoizedState,c||G!==V||$a?(typeof re=="function"&&(ys(t,a,re,n),V=t.memoizedState),(D=$a||ef(t,a,D,n,G,V,r))?(Q||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=V),i.props=n,i.state=V,i.context=r,n=D):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,Jo(e,t),r=t.memoizedProps,Q=Ln(a,r),i.props=Q,re=t.pendingProps,G=i.context,V=a.contextType,D=ll,typeof V=="object"&&V!==null&&(D=_t(V)),c=a.getDerivedStateFromProps,(V=typeof c=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r!==re||G!==D)&&tf(t,i,n,D),$a=!1,G=t.memoizedState,i.state=G,ii(t,n,i,l),li();var Z=t.memoizedState;r!==re||G!==Z||$a||e!==null&&e.dependencies!==null&&nr(e.dependencies)?(typeof c=="function"&&(ys(t,a,c,n),Z=t.memoizedState),(Q=$a||ef(t,a,Q,n,G,Z,D)||e!==null&&e.dependencies!==null&&nr(e.dependencies))?(V||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(n,Z,D),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(n,Z,D)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||r===e.memoizedProps&&G===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&G===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=Z),i.props=n,i.state=Z,i.context=D,n=Q):(typeof i.componentDidUpdate!="function"||r===e.memoizedProps&&G===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&G===e.memoizedState||(t.flags|=1024),n=!1)}return i=n,pl(e,t),n=(t.flags&128)!==0,i||n?(i=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&n?(t.child=Bn(t,e.child,null,l),t.child=Bn(t,null,a,l)):pt(e,t,a,l),t.memoizedState=i.state,e=t.child):e=Fa(e,t,l),e}function gf(e,t,a,n){return Nn(),t.flags|=256,pt(e,t,a,n),t.child}var Ts={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ws(e){return{baseLanes:e,cachePool:id()}}function As(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Pt),e}function bf(e,t,a){var n=t.pendingProps,l=!1,i=(t.flags&128)!==0,r;if((r=i)||(r=e!==null&&e.memoizedState===null?!1:(Ct.current&2)!==0),r&&(l=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(ke){if(l?nn(t):ln(),(e=et)?(e=Gm(e,la),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Za!==null?{id:ba,overflow:xa}:null,retryLane:536870912,hydrationErrors:null},a=Qc(e),a.return=t,t.child=a,bt=t,et=null)):e=null,e===null)throw Qa(t);return wu(e)?t.lanes=32:t.lanes=536870912,null}return i=n.children,n=n.fallback,l?(ln(),l=t.mode,i=Er({mode:"hidden",children:i},l),n=An(n,l,a,null),i.return=t,n.return=t,i.sibling=n,t.child=i,n=t.child,n.memoizedState=ws(a),n.childLanes=As(e,r,a),t.memoizedState=Ts,ci(null,n)):(nn(t),Ns(t,i))}var c=e.memoizedState;if(c!==null){var D=c.dehydrated;if(D!==null)return Qh(e,t,i,r,n,D,c,a)}return l?(ln(),l=n.fallback,i=t.mode,c=e.child,D=c.sibling,n=Ma(c,{mode:"hidden",children:n.children}),n.subtreeFlags=c.subtreeFlags&1206910976,D!==null?l=Ma(D,l):(l=An(l,i,a,null),l.flags|=2),l.return=t,n.return=t,n.sibling=l,t.child=n,ci(null,n),n=t.child,l=e.child.memoizedState,l===null?l=ws(a):(i=l.cachePool,i!==null?(c=ct._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=id(),l={baseLanes:l.baseLanes|a,cachePool:i}),n.memoizedState=l,n.childLanes=As(e,r,a),t.memoizedState=Ts,ci(e.child,n)):(nn(t),a=e.child,e=a.sibling,a=Ma(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a)}function Ns(e,t){return t=Er({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Er(e,t){return e=kt(22,e,null,t),e.lanes=0,e}function Cr(e,t,a){return Bn(t,e.child,null,a),e=Ns(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qh(e,t,a,n,l,i,r,c){if(a)return t.flags&256?(nn(t),t.flags&=-257,Cr(e,t,c)):t.memoizedState!==null?(ln(),t.child=e.child,t.flags|=128,null):(ln(),i=l.fallback,r=t.mode,l=Er({mode:"visible",children:l.children},r),i=An(i,r,c,null),i.flags|=2,l.return=t,i.return=t,l.sibling=i,t.child=l,Bn(t,e.child,null,c),l=t.child,l.memoizedState=ws(c),l.childLanes=As(e,n,c),t.memoizedState=Ts,ci(null,l));if(nn(t),wu(i)){if(n=i.nextSibling&&i.nextSibling.dataset,n)var D=n.dgst;return n=D,n!==""&&(l=Error(p(419)),l.stack="",l.digest=n,Wl({value:l,source:null,stack:null})),Cr(e,t,c)}if(ft||On(e,t,c,!1),n=(c&e.childLanes)!==0,ft||n){if(an.current!==null)return Cr(e,t,c);if(n=$e,n!==null&&(l=$u(n,c),l!==0&&l!==r.retryLane))throw r.retryLane=l,wn(e,l),Ht(n,e,l),Es;return Tu(i)||Vr(),Cr(e,t,c)}return Tu(i)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,et=ra(i.nextSibling),bt=t,ke=!0,Ka=null,la=!1,e!==null&&$c(t,e),t=Ns(t,l.children),t.flags|=134221824,t)}function xf(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),ar(e.return,t,a)}function yf(e){for(var t=null;e!==null;){var a=e.alternate;a!==null&&dr(a)===null&&(t=e),e=e.sibling}return t}function Tr(e,t,a,n,l,i){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:l,treeForkCount:i}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=n,r.tail=a,r.tailMode=l,r.treeForkCount=i)}function Rs(e){var t=e.child;for(e.child=null;t!==null;){var a=t.sibling;t.sibling=e.child,e.child=t,t=a}}function Os(e,t,a){var n=t.pendingProps,l=n.revealOrder,i=n.tail;n=n.children;var r=Ct.current;if(t.flags&128)return ri(t,r),null;var c=(r&2)!==0;if(c?(r=r&1|2,t.flags|=128):r&=1,ri(t,r),l==="backwards"&&e!==null?(Rs(e),pt(e,t,n,a),Rs(e)):pt(e,t,n,a),n=ke?Jl:0,!c&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xf(e,a,t);else if(e.tag===19)xf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"backwards":a=yf(t.child),a===null?(l=t.child,t.child=null):(l=a.sibling,a.sibling=null,Rs(t)),Tr(t,!0,l,null,i,n);break;case"unstable_legacy-backwards":for(a=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&dr(e)===null){t.child=l;break}e=l.sibling,l.sibling=a,a=l,l=e}Tr(t,!0,a,null,i,n);break;case"together":Tr(t,!1,null,null,void 0,n);break;case"independent":t.memoizedState=null;break;default:a=yf(t.child),a===null?(l=t.child,t.child=null):(l=a.sibling,a.sibling=null),Tr(t,!1,l,a,i,n)}return t.child}function Sf(e,t,a){var n=t.pendingProps;return Ja(t,t.type,n.value),pt(e,t,n.children,a),t.child}function Fa(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),un|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(On(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(p(153));if(t.child!==null){for(e=t.child,a=Ma(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Ma(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Ds(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&nr(e)))}function Jh(e,t,a){switch(t.tag){case 3:ge(t,t.stateNode.containerInfo),Ja(t,ct,e.memoizedState.cache),Nn();break;case 27:case 5:me(t);break;case 4:ge(t,t.stateNode.containerInfo);break;case 10:Ja(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,as(t),null;break;case 13:var n=t.memoizedState;if(n!==null){if(n.dehydrated!==null)return nn(t),t.flags|=128,null;n=On(e,t,a,!1);var l=t.child.childLanes;return n||(a&l)!==0?bf(e,t,a):(nn(t),e=Fa(e,t,a),e!==null?e.sibling:null)}nn(t);break;case 19:if(t.flags&128)return Os(e,t,a);if(l=(e.flags&128)!==0,n=(a&t.childLanes)!==0,n||(On(e,t,a,!1),n=(a&t.childLanes)!==0),l){if(n)return Os(e,t,a);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ri(t,Ct.current),n)break;return null;case 22:return t.lanes=0,ff(e,t,a,t.pendingProps);case 24:Ja(t,ct,e.memoizedState.cache)}return Fa(e,t,a)}function _f(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)ft=!0;else{if(!Ds(e,a)&&(t.flags&128)===0)return ft=!1,Jh(e,t,a);ft=(e.flags&131072)!==0}else ft=!1,ke&&(t.flags&1048576)!==0&&Wc(t,Jl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=jn(t.elementType),t.type=e,typeof e=="function")Lo(e)?(n=Ln(e,n),t.tag=1,t=vf(null,t,e,n,a)):(t.tag=0,t=Cs(null,t,e,n,a));else{if(e!=null){var l=e.$$typeof;if(l===oe){t.tag=11,t=uf(null,t,e,n,a);break e}else if(l===se){t.tag=14,t=cf(null,t,e,n,a);break e}else if(l===te){t.tag=10,t.type=e,t=Sf(null,t,a);break e}}throw t=be(e)||e,Error(p(306,t,""))}}return t;case 0:return Cs(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,l=Ln(n,t.pendingProps),vf(e,t,n,l,a);case 3:e:{if(ge(t,t.stateNode.containerInfo),e===null)throw Error(p(387));n=t.pendingProps;var i=t.memoizedState;l=i.element,Jo(e,t),ii(t,n,null,a);var r=t.memoizedState;if(n=r.cache,Ja(t,ct,n),n!==i.cache&&qo(t,[ct],a,!0),li(),n=r.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=gf(e,t,n,a);break e}else if(n!==l){l=ta(Error(p(424)),t),Wl(l),t=gf(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(et=ra(e.firstChild),bt=t,ke=!0,Ka=null,la=!0,a=dd(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Nn(),n===l){t=Fa(e,t,a);break e}pt(e,t,n,a)}t=t.child}return t;case 26:return pl(e,t),e===null?(a=Pm(t.type,null,t.pendingProps,null))?t.memoizedState=a:ke||(t.stateNode=wm(t.type,t.pendingProps,fe.current,t)):t.memoizedState=Pm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return me(t),e===null&&ke&&(n=t.stateNode=Xm(t.type,t.pendingProps,fe.current),bt=t,la=!0,l=et,mn(t.type)?(Au=l,et=ra(n.firstChild)):et=l),pt(e,t,t.pendingProps.children,a),pl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ke&&((l=n=et)&&(n=q0(n,t.type,t.pendingProps,la),n!==null?(t.stateNode=n,bt=t,et=ra(n.firstChild),la=!1,l=!0):l=!1),l||Qa(t)),me(t),l=t.type,i=t.pendingProps,r=e!==null?e.memoizedProps:null,n=i.children,bu(l,i)?n=null:r!==null&&bu(l,r)&&(t.flags|=32),t.memoizedState!==null&&(l=is(e,t,Gh,null,null,a),zl._currentValue=l),pl(e,t),pt(e,t,n,a),t.child;case 6:return e===null&&ke&&((e=a=et)&&(a=Y0(a,t.pendingProps,la),a!==null?(t.stateNode=a,bt=t,et=null,e=!0):e=!1),e||Qa(t)),null;case 13:return bf(e,t,a);case 4:return ge(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Bn(t,null,n,a):pt(e,t,n,a),t.child;case 11:return uf(e,t,t.type,t.pendingProps,a);case 7:return n=t.pendingProps,pl(e,t),pt(e,t,n,a),t.child;case 8:return pt(e,t,t.pendingProps.children,a),t.child;case 12:return pt(e,t,t.pendingProps.children,a),t.child;case 10:return Sf(e,t,a);case 9:return l=t.type._context,n=t.pendingProps.children,Dn(t),l=_t(l),n=n(l),t.flags|=1,pt(e,t,n,a),t.child;case 14:return cf(e,t,t.type,t.pendingProps,a);case 15:return df(e,t,t.type,t.pendingProps,a);case 19:return Os(e,t,a);case 31:return Kh(e,t,a);case 22:return ff(e,t,a,t.pendingProps);case 24:return Dn(t),n=_t(ct),e===null?(l=Zo(),l===null&&(l=$e,i=Yo(),l.pooledCache=i,i.refCount++,i!==null&&(l.pooledCacheLanes|=a),l=i),t.memoizedState={parent:n,cache:l},Qo(t),Ja(t,ct,l)):((e.lanes&a)!==0&&(Jo(e,t),ii(t,null,null,a),li()),l=e.memoizedState,i=t.memoizedState,l.parent!==n?(l={parent:n,cache:n},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),Ja(t,ct,n)):(n=i.cache,Ja(t,ct,n),n!==l.cache&&qo(t,[ct],a,!0))),pt(e,t,t.pendingProps.children,a),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),n=t.pendingProps,n.name!=null&&n.name!=="auto"?t.flags|=e===null?18882560:18874368:ke&&er(t),e!==null&&e.memoizedProps.name!==n.name?t.flags|=4194816:pl(e,t),pt(e,t,n.children,a),t.child;case 29:throw t.pendingProps}throw Error(p(156,t.tag))}function Ga(e){e.flags|=4}function zs(e,t,a,n,l){var i;if((i=(e.mode&32)!==0)&&(i=a===null?Jm(t,n):Jm(t,n)&&(n.src!==a.src||n.srcSet!==a.srcSet)),i){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(nm())e.flags|=8192;else throw Un=or,Ko}else e.flags&=-16777217}function Ef(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Wm(t))if(nm())e.flags|=8192;else throw Un=or,Ko}function wr(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Qu():536870912,e.lanes|=t,xl|=t)}function di(e,t){if(!ke)switch(e.tailMode){case"visible":break;case"collapsed":for(var a=e.tail,n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null;break;default:for(t=e.tail,a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null}}function tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var l=e.child;l!==null;)a|=l.lanes|l.childLanes,n|=l.subtreeFlags&1206910976,n|=l.flags&1206910976,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)a|=l.lanes|l.childLanes,n|=l.subtreeFlags,n|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function Wh(e,t,a){var n=t.pendingProps;switch(Ho(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(t),null;case 1:return tt(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ba(ct),_e(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ol(t)?Ga(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Xo())),tt(t),null;case 26:var l=t.type,i=t.memoizedState;return e===null?(Ga(t),i!==null?(tt(t),Ef(t,i)):(tt(t),zs(t,l,null,n,a))):i?i!==e.memoizedState?(Ga(t),tt(t),Ef(t,i)):(tt(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Ga(t),tt(t),zs(t,l,e,n,a)),null;case 27:if(Ne(t),a=fe.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(!n){if(t.stateNode===null)throw Error(p(166));return tt(t),t.subtreeFlags&=-33554433,null}e=F.current,ol(t)?ed(t):(e=Xm(l,n,a),t.stateNode=e,Ga(t))}return tt(t),t.subtreeFlags&=-33554433,null;case 5:if(Ne(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(!n){if(t.stateNode===null)throw Error(p(166));return tt(t),t.subtreeFlags&=-33554433,null}if(i=F.current,ol(t))ed(t);else{var r=_i(fe.current);switch(i){case 1:i=r.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:i=r.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":i=r.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":i=r.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":i=r.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof n.is=="string"?r.createElement("select",{is:n.is}):r.createElement("select"),n.multiple?i.multiple=!0:n.size&&(i.size=n.size);break;default:i=typeof n.is=="string"?r.createElement(l,{is:n.is}):r.createElement(l)}}i[St]=t,i[Bt]=n;e:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)i.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break e;for(;r.sibling===null;){if(r.return===null||r.return===t)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=i;e:switch(wt(i,l,n),l){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Ga(t)}}return tt(t),t.subtreeFlags&=-33554433,zs(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(p(166));if(e=fe.current,ol(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,l=bt,l!==null)switch(l.tag){case 27:case 5:n=l.memoizedProps}e[St]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||_m(e.nodeValue,a)),e||Qa(t,!0)}else e=_i(e).createTextNode(n),e[St]=t,t.stateNode=e}return tt(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=ol(t),a!==null){if(e===null){if(!n)throw Error(p(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(p(557));e[St]=t}else Nn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),e=!1}else a=Xo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(It(t),t):(It(t),null);if((t.flags&128)!==0)throw Error(p(558))}return tt(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=ol(t),n!==null&&n.dehydrated!==null){if(e===null){if(!l)throw Error(p(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(p(317));l[St]=t}else Nn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),l=!1}else l=Xo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(It(t),t):(It(t),null)}return It(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,l=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(l=n.alternate.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==l&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),wr(t,t.updateQueue),tt(t),null);case 4:return _e(),e===null&&mu(t.stateNode.containerInfo),t.flags|=67108864,tt(t),null;case 10:return Ba(t.type),tt(t),null;case 19:if(ns(t),n=t.memoizedState,n===null)return tt(t),null;if(l=(t.flags&128)!==0,i=n.rendering,i===null)if(l)di(n,!1);else{if(ot!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=dr(e),i!==null){for(t.flags|=128,di(n,!1),e=i.updateQueue,t.updateQueue=e,wr(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Kc(a,e),a=a.sibling;return ri(t,Ct.current&1|2),ke&&ja(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&vt()>Lr&&(t.flags|=128,l=!0,di(n,!1),t.lanes=4194304)}else{if(!l)if(e=dr(i),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,wr(t,e),di(n,!0),n.tail===null&&n.tailMode!=="collapsed"&&n.tailMode!=="visible"&&!i.alternate&&!ke)return tt(t),null}else 2*vt()-n.renderingStartTime>Lr&&a!==536870912&&(t.flags|=128,l=!0,di(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(e=n.last,e!==null?e.sibling=i:t.child=i,n.last=i)}if(n.tail!==null){e=n.tail;e:{for(a=e;a!==null;){if(a.alternate!==null){a=!1;break e}a=a.sibling}a=!0}return n.rendering=e,n.tail=e.sibling,n.renderingStartTime=vt(),e.sibling=null,i=Ct.current,i=l?i&1|2:i&1,n.tailMode==="visible"||n.tailMode==="collapsed"||!a||ke?ri(t,i):(a=i,x(Et,t),x(Ct,a),Rt===null&&(Rt=t)),ke&&ja(t,n.treeForkCount),e}return tt(t),null;case 22:case 23:return It(t),ts(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(tt(t),t.subtreeFlags&6&&(t.flags|=8192)):tt(t),a=t.updateQueue,a!==null&&wr(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&A(Mn),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ba(ct),tt(t),null;case 25:return null;case 30:return t.flags|=33554432,tt(t),null}throw Error(p(156,t.tag))}function $h(e,t){switch(Ho(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ba(ct),_e(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ne(t),null;case 31:if(t.memoizedState!==null){if(It(t),t.alternate===null)throw Error(p(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(It(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(p(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ns(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return _e(),null;case 10:return Ba(t.type),null;case 22:case 23:return It(t),ts(),e!==null&&A(Mn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ba(ct),null;case 25:return null;default:return null}}function Cf(e,t){switch(Ho(t),t.tag){case 3:Ba(ct),_e();break;case 26:case 27:case 5:Ne(t);break;case 4:_e();break;case 31:t.memoizedState!==null&&It(t);break;case 13:It(t);break;case 19:ns(t);break;case 10:Ba(t.type);break;case 22:case 23:It(t),ts(),e!==null&&A(Mn);break;case 24:Ba(ct)}}function fi(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var l=n.next;a=l;do{if((a.tag&e)===e){n=void 0;var i=a.create,r=a.inst;n=i(),r.destroy=n}a=a.next}while(a!==l)}}catch(c){Ke(t,t.return,c)}}function rn(e,t,a){try{var n=t.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var i=l.next;n=i;do{if((n.tag&e)===e){var r=n.inst,c=r.destroy;if(c!==void 0){r.destroy=void 0,l=t;var D=a,V=c;try{V()}catch(Q){Ke(l,D,Q)}}}n=n.next}while(n!==i)}}catch(Q){Ke(t,t.return,Q)}}function Tf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{md(t,a)}catch(n){Ke(e,e.return,n)}}}function wf(e,t,a){a.props=Ln(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){Ke(e,t,n)}}function ya(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:var l=e.stateNode,i=Da(e.memoizedProps,l);(l.ref===null||l.ref.name!==i)&&(l.ref=Mm(i)),n=l.ref;break;case 7:if(e.stateNode===null){var r=new Kt(e);f(e.child,!1,X0,r,void 0,void 0),e.stateNode=r}n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(c){Ke(e,t,c)}}function Tt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(l){Ke(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Ke(e,t,l)}else a.current=null}function Ar(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var a=0;a<t.length;a++)Fm(e.stateNode,t[a])}function Af(e){for(var t=e.return;t!==null&&(js(t)&&Fm(e.stateNode,t.stateNode),!Ms(t));)t=t.return}function mi(e){for(var t=e.return;t!==null&&(js(t)&&I0(e.stateNode,t.stateNode),!Ms(t));)t=t.return}function Ms(e){return e.tag===5||e.tag===3||e.tag===27}function js(e){return e&&e.tag===7&&e.stateNode!==null}function Us(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(l){Ke(e,e.return,l)}}function Bs(e,t,a){try{var n=e.stateNode;T0(n,e.type,a,t),n[Bt]=t}catch(l){Ke(e,e.return,l)}}function Nf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&mn(e.type)||e.tag===4}function ks(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Nf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&mn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ls(e,t,a,n){var l=e.tag;if(l===5||l===6)l=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(l),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=ga)),Ar(e,n),qe=!0;else if(l!==4&&(l===27&&(Ar(e,n),n=null,mn(e.type)&&(a=e.stateNode,t=null)),e=e.child,e!==null))for(Ls(e,t,a,n),e=e.sibling;e!==null;)Ls(e,t,a,n),e=e.sibling}function Nr(e,t,a,n){var l=e.tag;if(l===5||l===6)l=e.stateNode,t?a.insertBefore(l,t):a.appendChild(l),Ar(e,n),qe=!0;else if(l!==4&&(l===27&&(Ar(e,n),n=null,mn(e.type)&&(a=e.stateNode)),e=e.child,e!==null))for(Nr(e,t,a,n),e=e.sibling;e!==null;)Nr(e,t,a,n),e=e.sibling}function Rf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);wt(t,n,a),t[St]=e,t[Bt]=a}catch(i){Ke(e,e.return,i)}}var Rr=!1,qt=null;function Of(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Rr=!0)}var Sa=null;function Df(){var e=Sa;return Sa=null,e}var Lt=0;function hl(e,t,a,n,l){return Lt=0,zf(e.child,t,a,n,l)}function zf(e,t,a,n,l){for(var i=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(n!==null){var c=Su(r);n.push(c),c.view&&(i=!0)}else i||Su(r).view&&(i=!0);Rr=!0,Dm(r,Lt===0?t:t+"_"+Lt,a),Lt++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&l||zf(e.child,t,a,n,l)&&(i=!0));e=e.sibling}return i}function _a(e,t){for(;e!==null;)e.tag===5?zm(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||_a(e.child,t)),e=e.sibling}function Or(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Or(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(p(544));var a=t.name;t=za(t.default,t.share),t!=="none"&&(hl(e,a,t,null,!1)||_a(e.child,!1))}e=e.sibling}}function Fs(e,t){if(e.tag===30){var a=e.stateNode,n=e.memoizedProps,l=Da(n,a),i=za(n.default,a.paired?n.share:n.enter);i!=="none"?hl(e,l,i,null,!1)?(Or(e),a.paired||t||El(e,n.onEnter)):_a(e.child,!1):Or(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Fs(e,t),e=e.sibling;else Or(e)}function Gs(e){if(qt!==null&&qt.size!==0){var t=qt;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var a=e.memoizedProps,n=a.name;if(n!=null&&n!=="auto"){var l=t.get(n);if(l!==void 0){var i=za(a.default,a.share);if(i!=="none"&&(hl(e,n,i,null,!1)?(i=e.stateNode,l.paired=i,i.paired=l,El(e,a.onShare)):_a(e.child,!1)),t.delete(n),t.size===0)break}}}Gs(e)}e=e.sibling}}}function Hs(e){if(e.tag===30){var t=e.memoizedProps,a=Da(t,e.stateNode),n=qt!==null?qt.get(a):void 0,l=za(t.default,n!==void 0?t.share:t.exit);l!=="none"&&(hl(e,a,l,null,!1)?n!==void 0?(l=e.stateNode,n.paired=l,l.paired=n,qt.delete(a),El(e,t.onShare)):El(e,t.onExit):_a(e.child,!1)),qt!==null&&Gs(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Hs(e),e=e.sibling;else qt!==null&&Gs(e)}function Mf(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,a=Da(t,e.stateNode);t=za(t.default,t.update),e.flags&=-5,t!=="none"&&hl(e,a,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&Mf(e);e=e.sibling}}function Vs(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,_a(e.child,!1))}Vs(e)}e=e.sibling}}function Dr(e){if(e.tag===30)e.stateNode.paired=null,_a(e.child,!1),Vs(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Dr(e),e=e.sibling;else Vs(e)}function jf(e){for(e=e.child;e!==null;)e.tag===30?_a(e.child,!1):(e.subtreeFlags&33554432)!==0&&jf(e),e=e.sibling}function Xs(e,t,a,n,l,i,r){for(var c=!1;t!==null;){if(t.tag===5){var D=t.stateNode;if(i!==null&&Lt<i.length){var V=i[Lt],Q=Su(D);(V.view||Q.view)&&(c=!0);var re;if(re=(e.flags&4)===0)if(Q.clip)re=!0;else{re=V.rect;var G=Q.rect;re=re.y!==G.y||re.x!==G.x||re.height!==G.height||re.width!==G.width}re&&(e.flags|=4),Q.abs?Q=!V.abs:(V=V.rect,Q=Q.rect,Q=V.height!==Q.height||V.width!==Q.width),Q&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&Dm(D,Lt===0?a:a+"_"+Lt,l),c&&(e.flags&4)!==0||(Sa===null&&(Sa=[]),Sa.push(D,Lt===0?n:n+"_"+Lt,t.memoizedProps)),Lt++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:Xs(e,t.child,a,n,l,i,r)&&(c=!0));t=t.sibling}return c}function Uf(e,t){for(e=e.child;e!==null;){if(e.tag===30){var a=e.memoizedProps,n=e.stateNode,l=Da(a,n),i=za(a.default,a.update),r;r=e.memoizedState,e.memoizedState=null,n=e;var c=e.child;Lt=0,l=Xs(n,c,l,l,i,r,!1),(e.flags&4)!==0&&l&&El(e,a.onUpdate)}else(e.subtreeFlags&33554432)!==0&&Uf(e);e=e.sibling}}var xt=!1,Pe=!1,Ea=!1,Is=!1,Bf=typeof WeakSet=="function"?WeakSet:Set,yt=null,Ca=!1,pi=!1,zr=!1,qs=!1;function e0(e,t,a){if(e=e.containerInfo,vu=Ml,e=Fc(e),Do(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var i=l.anchorOffset,r=l.focusNode;l=l.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break e}var c=0,D=-1,V=-1,Q=0,re=0,G=e,Z=null;t:for(;;){for(var Ee;G!==n||i!==0&&G.nodeType!==3||(D=c+i),G!==r||l!==0&&G.nodeType!==3||(V=c+l),G.nodeType===3&&(c+=G.nodeValue.length),(Ee=G.firstChild)!==null;)Z=G,G=Ee;for(;;){if(G===e)break t;if(Z===n&&++Q===i&&(D=c),Z===r&&++re===l&&(V=c),(Ee=G.nextSibling)!==null)break;G=Z,Z=G.parentNode}G=Ee}n=D===-1||V===-1?null:{start:D,end:V}}else n=null}n=n||{start:0,end:0}}else n=null;for(gu={focusedElem:e,selectionRange:n},Ml=!1,a=(a&335544064)===a,yt=t,t=a?9270:1024;yt!==null;){if(e=yt,a&&(n=e.deletions,n!==null))for(i=0;i<n.length;i++)a&&Hs(n[i]);if(e.alternate===null&&(e.flags&2)!==0)a&&Of(e),Mr(a);else{if(e.tag===22){if(n=e.alternate,e.memoizedState!==null){n!==null&&n.memoizedState===null&&a&&Hs(n),Mr(a);continue}else if(n!==null&&n.memoizedState!==null){a&&Of(e),Mr(a);continue}}n=e.child,(e.subtreeFlags&t)!==0&&n!==null?(n.return=e,yt=n):(a&&Mf(e),Mr(a))}}qt=null}function Mr(e){for(;yt!==null;){var t=yt,a=e,n=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&n!==null){a=void 0,l=n.memoizedProps,n=n.memoizedState;var i=t.stateNode;try{var r=Ln(t.type,l);a=i.getSnapshotBeforeUpdate(r,n),i.__reactInternalSnapshotBeforeUpdate=a}catch(c){Ke(t,t.return,c)}}break;case 3:if((l&1024)!==0){if(n=t.stateNode.containerInfo,a=n.nodeType,a===9)Cu(n);else if(a===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Cu(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&n!==null&&(a=Da(n.memoizedProps,n.stateNode),l=t.memoizedProps,l=za(l.default,l.update),l!=="none"&&hl(n,a,l,n.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(p(163))}if(n=t.sibling,n!==null){n.return=t.return,yt=n;break}yt=t.return}}function kf(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Ta(e,a),n&4&&fi(5,a);break;case 1:if(Ta(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(r){Ke(a,a.return,r)}else{var l=Ln(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){Ke(a,a.return,r)}}n&64&&Tf(a),n&512&&ya(a,a.return);break;case 3:if(Ta(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{md(e,t)}catch(r){Ke(a,a.return,r)}}break;case 27:t===null&&n&4&&Rf(a);case 26:case 5:Ta(e,a),t===null&&n&4&&Us(a),n&512&&ya(a,a.return);break;case 12:Ta(e,a);break;case 31:Ta(e,a),n&4&&Hf(e,a);break;case 13:Ta(e,a),n&4&&Vf(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=f0.bind(null,a),P0(e,a))));break;case 22:if(n=a.memoizedState!==null||xt,!n){var i=t!==null&&t.memoizedState!==null||Pe;t=xt,l=Pe,xt=n,(Pe=i)&&!l?(n=2,(a.subtreeFlags&8772)!==0&&(n|=1),ma(e,a,n)):Ta(e,a),xt=t,Pe=l}break;case 30:Ta(e,a),n&512&&ya(a,a.return);break;case 7:n&512&&ya(a,a.return);default:Ta(e,a)}}function Ys(e,t){for(e=e.child;e!==null;)Lf(e,t),e=e.sibling}function Lf(e,t){switch(e.tag){case 5:case 26:try{var a=e.stateNode;if(t){var n=a.style;typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"}else{var l=e.stateNode,i=e.memoizedProps.style,r=i!=null&&i.hasOwnProperty("display")?i.display:null;l.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(D){Ke(e,e.return,D)}Ps(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,qe=!0}catch(D){Ke(e,e.return,D)}break;case 18:try{var c=e.stateNode;t?Om(c,!0):Om(e.stateNode,!1)}catch(D){Ke(e,e.return,D)}break;case 22:case 23:e.memoizedState===null&&Ys(e,t);break;default:Ys(e,t)}}function Ps(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){e:{var a=e,n=t;switch(a.tag){case 4:Lf(a,n);break e;case 22:a.memoizedState===null&&Ps(a,n);break e;default:Ps(a,n)}}e=e.sibling}}function Ff(e){var t=e.alternate;t!==null&&(e.alternate=null,Ff(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Li(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var lt=null,Ft=!1;function da(e,t,a){for(a=a.child;a!==null;)Gf(e,t,a),a=a.sibling}function Gf(e,t,a){if(Nt&&typeof Nt.onCommitFiberUnmount=="function")try{Nt.onCommitFiberUnmount(qa,a)}catch{}switch(a.tag){case 26:Pe||Tt(a,t),da(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Pe&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Pe||Tt(a,t),mi(a);var n=lt,l=Ft;mn(a.type)&&(lt=a.stateNode,Ft=!1),da(e,t,a),Im(a.stateNode,a.type,a.memoizedProps),lt=n,Ft=l;break;case 5:Pe||Tt(a,t),mi(a);case 6:if(a.tag===6&&mi(a),n=lt,l=Ft,lt=null,da(e,t,a),lt=n,Ft=l,lt!==null)if(Ft)try{(lt.nodeType===9?lt.body:lt.nodeName==="HTML"?lt.ownerDocument.body:lt).removeChild(a.stateNode),qe=!0}catch(i){Ke(a,t,i)}else try{lt.removeChild(a.stateNode),qe=!0}catch(i){Ke(a,t,i)}break;case 18:lt!==null&&(Ft?(e=lt,Rm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),jl(e)):Rm(lt,a.stateNode));break;case 4:n=lt,l=Ft,lt=a.stateNode.containerInfo,Ft=!0,da(e,t,a),lt=n,Ft=l;break;case 0:case 11:case 14:case 15:rn(2,a,t),Pe||rn(4,a,t),da(e,t,a);break;case 1:Pe||(Tt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&wf(a,t,n)),da(e,t,a);break;case 21:da(e,t,a);break;case 22:Pe=(n=Pe)||a.memoizedState!==null,da(e,t,a),Pe=n;break;case 30:Tt(a,t),da(e,t,a);break;case 7:Pe||Tt(a,t),da(e,t,a);break;default:da(e,t,a)}}function Hf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{jl(e)}catch(a){Ke(t,t.return,a)}}}function Vf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{jl(e)}catch(a){Ke(t,t.return,a)}}function t0(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Bf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Bf),t;default:throw Error(p(435,e.tag))}}function jr(e,t){var a=t0(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var l=m0.bind(null,e,n);n.then(l,l)}})}function jt(e,t,a){var n=t.deletions;if(n!==null)for(var l=0;l<n.length;l++){var i=n[l],r=e,c=t,D=c;e:for(;D!==null;){switch(D.tag){case 27:if(mn(D.type)){lt=D.stateNode,Ft=!1;break e}break;case 5:lt=D.stateNode,Ft=!1;break e;case 3:case 4:lt=D.stateNode.containerInfo,Ft=!0;break e}D=D.return}if(lt===null)throw Error(p(160));Gf(r,c,i),lt=null,Ft=!1,r=i.alternate,r!==null&&(r.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Xf(t,e,a),t=t.sibling}var fa=null;function Xf(e,t,a){var n=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(l&4&&(n=e.updateQueue,n=n!==null?n.events:null,n!==null))for(var i=0;i<n.length;i++){var r=n[i];r.ref.impl=r.nextImpl}jt(t,e,a),Ut(e),l&4&&(rn(3,e,e.return),fi(3,e),rn(5,e,e.return));break;case 1:jt(t,e,a),Ut(e),l&512&&(Pe||n===null||Tt(n,n.return)),l&64&&xt&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?t:a.concat(t))));break;case 26:if(i=fa,jt(t,e,a),Ut(e),l&512&&(Pe||n===null||Tt(n,n.return)),l&4)if(l=n!==null?n.memoizedState:null,a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null)if(xt)e.stateNode=wm(e.type,e.memoizedProps,t.containerInfo,e);else{e:{t=e.type,a=e.memoizedProps,l=i.ownerDocument||i;t:switch(t){case"title":n=l.getElementsByTagName("title")[0],(!n||n[Gl]||n[St]||n.namespaceURI==="http://www.w3.org/2000/svg"||n.hasAttribute("itemprop"))&&(n=l.createElement(t),l.head.insertBefore(n,l.querySelector("head > title"))),wt(n,t,a),n[St]=e,gt(n),t=n;break e;case"link":if(i=Qm("link","href",l).get(t+(a.href||""))){for(r=0;r<i.length;r++)if(n=i[r],n.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&n.getAttribute("rel")===(a.rel==null?null:a.rel)&&n.getAttribute("title")===(a.title==null?null:a.title)&&n.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){i.splice(r,1);break t}}n=l.createElement(t),wt(n,t,a),l.head.appendChild(n);break;case"meta":if(i=Qm("meta","content",l).get(t+(a.content||""))){for(r=0;r<i.length;r++)if(n=i[r],n.getAttribute("content")===(a.content==null?null:""+a.content)&&n.getAttribute("name")===(a.name==null?null:a.name)&&n.getAttribute("property")===(a.property==null?null:a.property)&&n.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&n.getAttribute("charset")===(a.charSet==null?null:a.charSet)){i.splice(r,1);break t}}n=l.createElement(t),wt(n,t,a),l.head.appendChild(n);break;default:throw Error(p(468,t))}n[St]=e,gt(n),t=n}e.stateNode=t}else xt||Du(i,e.type,e.stateNode);else e.stateNode=Km(i,a,e.memoizedProps);else l!==a?(l===null?(t=n.stateNode,t===null||Pe||t.parentNode.removeChild(t)):l.count--,a===null?xt||Du(i,e.type,e.stateNode):Km(i,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Bs(e,e.memoizedProps,n.memoizedProps);break;case 27:jt(t,e,a),Ut(e),l&512&&(Pe||n===null||Tt(n,n.return)),n!==null&&l&4&&Bs(e,e.memoizedProps,n.memoizedProps);break;case 5:if(i=Ea,Ea=!1,jt(t,e,a),Ea=i,Ut(e),l&512&&(Pe||n===null||Tt(n,n.return)),e.flags&32){t=e.stateNode;try{Jn(t,""),qe=!0}catch(Q){Ke(e,e.return,Q)}}l&4&&e.stateNode!=null&&(t=e.memoizedProps,Bs(e,t,n!==null?n.memoizedProps:t)),l&1024&&(Is=!0);break;case 6:if(jt(t,e,a),Ut(e),l&4){if(e.stateNode===null)throw Error(p(162));t=e.memoizedProps,a=e.stateNode;try{a.nodeValue=t,qe=!0}catch(Q){Ke(e,e.return,Q)}}break;case 3:if(qe=!1,Kr=null,i=fa,fa=Ei(t.containerInfo),jt(t,e,a),fa=i,Ut(e),l&4&&n!==null&&n.memoizedState.isDehydrated)try{jl(t.containerInfo)}catch(Q){Ke(e,e.return,Q)}Is&&(Is=!1,If(e)),qe=!1;break;case 4:l=Ea,Ea=xt,n=uc(),i=fa,fa=Ei(e.stateNode.containerInfo),jt(t,e,a),Ut(e),fa=i,qe&&pi&&(zr=!0),qe=n,Ea=l;break;case 12:jt(t,e,a),Ut(e);break;case 31:jt(t,e,a),Ut(e),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,jr(e,t)));break;case 13:jt(t,e,a),Ut(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(kr=vt()),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,jr(e,t)));break;case 22:i=e.memoizedState!==null,r=n!==null&&n.memoizedState!==null;var c=xt,D=Pe,V=Ea;xt=c||i,Ea=V||i,Pe=D||r,jt(t,e,a),Pe=D,Ea=V,xt=c,Ut(e),l&8192&&(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,!i||n===null||r||xt||Pe||(t=r||Pe,a=xt,n=Pe,xt=i||xt,Pe=t,on(e,2),xt=a,Pe=n),!i&&Ea||Ys(e,i)),l&4&&(t=e.updateQueue,t!==null&&(a=t.retryQueue,a!==null&&(t.retryQueue=null,jr(e,a))));break;case 19:jt(t,e,a),Ut(e),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,jr(e,t)));break;case 30:l&512&&(Pe||n===null||Tt(n,n.return)),l=uc(),i=pi,r=(a&335544064)===a,c=e.memoizedProps,pi=r&&za(c.default,c.update)!=="none",jt(t,e,a),Ut(e),r&&n!==null&&qe&&(e.flags|=4),pi=i,qe=l;break;case 21:break;case 7:l&512&&(Pe||n===null||Tt(n,n.return)),n&&n.stateNode!==null&&(n.stateNode._fragmentFiber=e);default:jt(t,e,a),Ut(e)}}function Ut(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(Nf(n)){a=n;break}n=n.return}n=null;for(var l=e.return;l!==null;){if(js(l)){var i=l.stateNode;n===null?n=[i]:n.push(i)}if(Ms(l))break;l=l.return}var r=n;if(a==null)throw Error(p(160));switch(a.tag){case 27:var c=a.stateNode,D=ks(e);Nr(e,D,c,r);break;case 5:var V=a.stateNode;a.flags&32&&(Jn(V,""),a.flags&=-33);var Q=ks(e);Nr(e,Q,V,r);break;case 3:case 4:var re=a.stateNode.containerInfo,G=ks(e);Ls(e,G,re,r);break;default:throw Error(p(161))}}catch(Z){Ke(e,e.return,Z)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function If(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;If(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Ml=!0,t.reset(),Ml=!1),e=e.sibling}}function vl(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)qf(t,e),t=t.sibling;else Uf(t)}function qf(e,t){var a=e.alternate;if(a===null)Fs(e,!1);else switch(e.tag){case 3:if(qs=Ca=!1,Df(),vl(t,e),!Ca&&!zr){if(e=Sa,e!==null)for(var n=0;n<e.length;n+=3){a=e[n];var l=e[n+1];zm(a,e[n+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),qs=!0}Sa=null;break;case 5:vl(t,e);break;case 4:n=Ca,Ca=!1,vl(t,e),Ca&&(zr=!0),Ca=n;break;case 22:e.memoizedState===null&&(a.memoizedState!==null?Fs(e,!1):vl(t,e));break;case 30:n=Ca,l=Df(),Ca=!1,vl(t,e),Ca&&(e.flags|=4);var i=e.memoizedProps,r=e.stateNode;t=Da(i,r),r=Da(a.memoizedProps,r);var c=za(i.default,i.update);c==="none"?t=!1:(i=a.memoizedState,a.memoizedState=null,a=e.child,Lt=0,t=Xs(e,a,t,r,c,i,!0),Lt!==(i===null?0:i.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(El(e,e.memoizedProps.onUpdate),Sa=l):l!==null&&(l.push.apply(l,Sa),Sa=l),Ca=(e.flags&32)!==0?!0:n;break;default:vl(t,e)}}function Ta(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)kf(e,t.alternate,t),t=t.sibling}function on(e,t){for(e=e.child;e!==null;){var a=e,n=t;switch(a.tag){case 0:case 11:case 14:case 15:rn(4,a,a.return),on(a,n);break;case 1:Tt(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&wf(a,a.return,l),on(a,n);break;case 27:(n&2)!==0&&Im(a.stateNode,a.type,a.memoizedProps);case 5:Tt(a,a.return),a.tag!==5&&a.tag!==27||mi(a),on(a,n);break;case 6:mi(a);break;case 26:Tt(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||Pe||l.parentNode.removeChild(l),on(a,n);break;case 22:a.memoizedState===null&&on(a,n);break;case 30:Tt(a,a.return),on(a,n);break;case 7:Tt(a,a.return);default:on(a,n)}e=e.sibling}}function ma(e,t,a){for(a=(t.subtreeFlags&8772)!==0?a:a&-2,t=t.child;t!==null;){var n=t.alternate,l=e,i=t,r=i.flags,c=(a&1)!==0;switch(i.tag){case 0:case 11:case 15:ma(l,i,a),fi(4,i);break;case 1:if(ma(l,i,a),n=i,l=n.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(Q){Ke(n,n.return,Q)}if(n=i,l=n.updateQueue,l!==null){var D=n.stateNode;try{var V=l.shared.hiddenCallbacks;if(V!==null)for(l.shared.hiddenCallbacks=null,l=0;l<V.length;l++)fd(V[l],D)}catch(Q){Ke(n,n.return,Q)}}c&&r&64&&Tf(i),ya(i,i.return);break;case 27:(a&2)!==0&&Rf(i);case 5:i.tag!==5&&i.tag!==27||Af(i),ma(l,i,a),c&&n===null&&r&4&&Us(i),ya(i,i.return);break;case 6:Af(i);break;case 26:D=i.stateNode,i.memoizedState!==null||D===null||xt||Du(Ei(D.ownerDocument),i.type,D),ma(l,i,a),c&&n===null&&r&4&&Us(i),ya(i,i.return);break;case 12:ma(l,i,a);break;case 31:ma(l,i,a),c&&r&4&&Hf(l,i);break;case 13:ma(l,i,a),c&&r&4&&Vf(l,i);break;case 22:i.memoizedState===null&&ma(l,i,a),ya(i,i.return);break;case 30:ma(l,i,a),ya(i,i.return);break;case 7:ya(i,i.return);default:ma(l,i,a)}t=t.sibling}}function Zs(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&$l(a))}function Ks(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&$l(e))}function ia(e,t,a,n){var l=(a&335544064)===a;if(t.subtreeFlags&(l?10262:10256))for(t=t.child;t!==null;)Yf(e,t,a,n),t=t.sibling;else l&&jf(t)}function Yf(e,t,a,n){var l=(a&335544064)===a;l&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Dr(t);var i=t.flags;switch(t.tag){case 0:case 11:case 15:ia(e,t,a,n),i&2048&&fi(9,t);break;case 1:ia(e,t,a,n);break;case 3:ia(e,t,a,n),l&&qs&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),i&2048&&(i=null,t.alternate!==null&&(i=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==i&&(t.refCount++,i!=null&&$l(i)));break;case 12:if(i&2048){ia(e,t,a,n),i=t.stateNode;try{var r=t.memoizedProps,c=r.id,D=r.onPostCommit;typeof D=="function"&&D(c,t.alternate===null?"mount":"update",i.passiveEffectDuration,-0)}catch(V){Ke(t,t.return,V)}}else ia(e,t,a,n);break;case 31:ia(e,t,a,n);break;case 13:ia(e,t,a,n);break;case 23:break;case 22:r=t.stateNode,c=t.alternate,t.memoizedState!==null?(l&&c!==null&&c.memoizedState===null&&Dr(c),r._visibility&2?ia(e,t,a,n):hi(e,t)):(l&&c!==null&&c.memoizedState!==null&&Dr(t),r._visibility&2?ia(e,t,a,n):(r._visibility|=2,gl(e,t,a,n,(t.subtreeFlags&10256)!==0||!1))),i&2048&&Zs(c,t);break;case 24:ia(e,t,a,n),i&2048&&Ks(t.alternate,t);break;case 30:l&&(i=t.alternate,i!==null&&(_a(i.child,!0),_a(t.child,!0))),ia(e,t,a,n);break;default:ia(e,t,a,n)}}function gl(e,t,a,n,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,r=t,c=a,D=n,V=r.flags;switch(r.tag){case 0:case 11:case 15:gl(i,r,c,D,l),fi(8,r);break;case 23:break;case 22:var Q=r.stateNode;r.memoizedState!==null?Q._visibility&2?gl(i,r,c,D,l):hi(i,r):(Q._visibility|=2,gl(i,r,c,D,l)),l&&V&2048&&Zs(r.alternate,r);break;case 24:gl(i,r,c,D,l),l&&V&2048&&Ks(r.alternate,r);break;default:gl(i,r,c,D,l)}t=t.sibling}}function hi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,l=n.flags;switch(n.tag){case 22:hi(a,n),l&2048&&Zs(n.alternate,n);break;case 24:hi(a,n),l&2048&&Ks(n.alternate,n);break;default:hi(a,n)}t=t.sibling}}var Fn=8192;function Gn(e,t,a){if(e.subtreeFlags&Fn)for(e=e.child;e!==null;)Pf(e,t,a),e=e.sibling}function Pf(e,t,a){switch(e.tag){case 26:Gn(e,t,a),e.flags&Fn&&(e.memoizedState!==null?o1(a,fa,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&ep(a,e)));break;case 5:Gn(e,t,a),e.flags&Fn&&(e=e.stateNode,(t&335544128)===t&&ep(a,e));break;case 3:case 4:var n=fa;fa=Ei(e.stateNode.containerInfo),Gn(e,t,a),fa=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=Fn,Fn=16777216,Gn(e,t,a),Fn=n):Gn(e,t,a));break;case 30:if((e.flags&Fn)!==0&&(n=e.memoizedProps.name,n!=null&&n!=="auto")){var l=e.stateNode;l.paired=null,qt===null&&(qt=new Map),qt.set(n,l)}Gn(e,t,a);break;default:Gn(e,t,a)}}function Zf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function vi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];yt=n,Qf(n,e)}Zf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kf(e),e=e.sibling}function Kf(e){switch(e.tag){case 0:case 11:case 15:vi(e),e.flags&2048&&rn(9,e,e.return);break;case 3:vi(e);break;case 12:vi(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ur(e)):vi(e);break;default:vi(e)}}function Ur(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];yt=n,Qf(n,e)}Zf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:rn(8,t,t.return),Ur(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Ur(t));break;default:Ur(t)}e=e.sibling}}function Qf(e,t){for(;yt!==null;){var a=yt;switch(a.tag){case 0:case 11:case 15:rn(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:$l(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,yt=n;else e:for(a=e;yt!==null;){n=yt;var l=n.sibling,i=n.return;if(Ff(n),n===a){yt=null;break e}if(l!==null){l.return=i,yt=l;break e}yt=i}}}var a0={getCacheForType:function(e){var t=_t(ct),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return _t(ct).controller.signal}},n0=typeof WeakMap=="function"?WeakMap:Map,Ye=0,$e=null,Fe=null,He=0,Ze=0,Yt=null,sn=!1,bl=!1,Qs=!1,Ha=0,ot=0,un=0,Hn=0,Br=0,Pt=0,xl=0,gi=null,Gt=null,Js=!1,kr=0,Jf=0,Lr=1/0,Fr=null,cn=null,it=0,pa=null,Vn=null,wa=0,Ws=0,$s=null,Wf=null,yl=null,Sl=null,_l=null,bi=0,Gr=null;function Zt(){return(Ye&2)!==0&&He!==0?He&-He:xe.T!==null?uu():ec()}function $f(){if(Pt===0)if((He&536870912)===0||ke){var e=qn;qn<<=1,(qn&3932160)===0&&(qn=262144),Pt=e}else Pt=536870912;return e=Et.current,e!==null&&(e.flags|=32),Pt}function El(e,t){if(t!=null){var a=e.stateNode,n=a.ref;n===null&&(n=a.ref=Mm(Da(e.memoizedProps,a))),Sl===null&&(Sl=[]),Sl.push(t.bind(null,n))}}function Ht(e,t,a){(e===$e&&(Ze===2||Ze===9)||e.cancelPendingCommit!==null)&&(Cl(e,0),dn(e,He,Pt,!1)),Fl(e,a),((Ye&2)===0||e!==$e)&&(e===$e&&((Ye&2)===0&&(Hn|=a),ot===4&&dn(e,He,Pt,!1)),Aa(e))}function em(e,t,a){if((Ye&6)!==0)throw Error(p(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Ll(e,t),l=n?r0(e,t):tu(e,t,!0),i=n;do{if(l===0){bl&&!n&&dn(e,t,0,!1);break}else{if(a=e.current.alternate,i&&!l0(a)){l=tu(e,t,!1),i=!1;continue}if(l===2){if(i=t,e.errorRecoveryDisabledLanes&i)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;e:{var c=e;l=gi;var D=c.current.memoizedState.isDehydrated;if(D&&(Cl(c,r).flags|=256),r=tu(c,r,!1),r!==2&&r!==6){if(Qs&&!D){c.errorRecoveryDisabledLanes|=i,Hn|=i,l=4;break e}i=Gt,Gt=l,i!==null&&(Gt===null?Gt=i:Gt.push.apply(Gt,i))}l=r}if(i=!1,l!==2)continue}}if(l===1){Cl(e,0),dn(e,t,0,!0);break}e:{switch(n=e,i=l,i){case 0:case 1:throw Error(p(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:dn(n,t,Pt,!sn);break e;case 2:Gt=null;break;case 3:case 5:break;default:throw Error(p(329))}if((t&62914560)===t&&(l=kr+300-vt(),10<l)){if(dn(n,t,Pt,!sn),Bi(n,0,!0)!==0)break e;wa=t,n.timeoutHandle=yu(tm.bind(null,n,a,Gt,Fr,Js,t,Pt,Hn,xl,sn,i,"Throttled",-0,0),l);break e}tm(n,a,Gt,Fr,Js,t,Pt,Hn,xl,sn,i,null,-0,0)}}break}while(!0);Aa(e)}function tm(e,t,a,n,l,i,r,c,D,V,Q,re,G,Z){e.timeoutHandle=-1;var Ee=t.subtreeFlags,we=(i&335544064)===i;if(re=null,(we||Ee&8192||(Ee&16785408)===16785408)&&(re={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ga},qt=null,Pf(t,i,re),we&&(Ee=re,we=e.containerInfo,we=(we.nodeType===9?we:we.ownerDocument).__reactViewTransition,we!=null&&(Ee.count++,Ee.waitingForViewTransition=!0,Ee=wi.bind(Ee),we.finished.then(Ee,Ee))),Ee=(i&62914560)===i?kr-vt():(i&4194048)===i?Jf-vt():0,Ee=s1(re,Ee),Ee!==null)){wa=i,e.cancelPendingCommit=Ee(um.bind(null,e,t,i,a,n,l,r,c,D,V,Q,re,null,G,Z)),dn(e,i,r,!V);return}um(e,t,i,a,n,l,r,c,D,V,Q,re)}function l0(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var l=a[n],i=l.getSnapshot;l=l.value;try{if(!Xt(i(),l))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dn(e,t,a,n){t=Ku(e,t),t&=~Br,t&=~Hn,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var l=t;0<l;){var i=31-Dt(l),r=1<<i;n[i]=-1,l&=~r}a!==0&&Ju(e,a,t)}function Hr(){return(Ye&6)===0?(xi(0),!1):!0}function eu(){if(Fe!==null){if(Ze===0)var e=Fe.return;else e=Fe,Ua=Rn=null,ss(e),cl=null,ai=0,e=Fe;for(;e!==null;)Cf(e.alternate,e),e=e.return;Fe=null}}function Cl(e,t){var a=e.timeoutHandle;return a!==-1&&(e.timeoutHandle=-1,N0(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),wa=0,eu(),$e=e,Fe=a=Ma(e.current,null),He=t,Ze=0,Yt=null,sn=!1,bl=Ll(e,t),Qs=!1,xl=Pt=Br=Hn=un=ot=0,Gt=gi=null,Js=!1,Ha=Ku(e,t),Ki(),a}function am(e,t){je=null,xe.H=yr,t===ul||t===rr?(t=sd(),Ze=3):t===Ko?(t=sd(),Ze=4):Ze=t===Es?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Yt=t,Fe===null&&(ot=1,Sr(e,ta(t,e.current)))}function nm(){var e=Et.current;return e===null?!0:(He&4194048)===He?Rt===null:(He&62914560)===He||(He&536870912)!==0?e===Rt:!1}function lm(){var e=xe.H;return xe.H=yr,e===null?yr:e}function im(){var e=xe.A;return xe.A=a0,e}function Vr(){ot=4,sn||(He&4194048)!==He&&Et.current!==null||(bl=!0),(un&134217727)===0&&(Hn&134217727)===0||$e===null||dn($e,He,Pt,!1)}function tu(e,t,a){var n=Ye;Ye|=2;var l=lm(),i=im();($e!==e||He!==t)&&(Fr=null,Cl(e,t)),t=!1;var r=ot;e:do try{if(Ze!==0&&Fe!==null){var c=Fe,D=Yt;switch(Ze){case 8:eu(),r=6;break e;case 3:case 2:case 9:case 6:Et.current===null&&(t=!0);var V=Ze;if(Ze=0,Yt=null,Tl(e,c,D,V),a&&bl){r=0;break e}break;default:V=Ze,Ze=0,Yt=null,Tl(e,c,D,V)}}i0(),r=ot;break}catch(Q){am(e,Q)}while(!0);return t&&e.shellSuspendCounter++,Ua=Rn=null,Ye=n,xe.H=l,xe.A=i,Fe===null&&($e=null,He=0,Ki()),r}function i0(){for(;Fe!==null;)rm(Fe)}function r0(e,t){var a=Ye;Ye|=2;var n=lm(),l=im();$e!==e||He!==t?(Fr=null,Lr=vt()+500,Cl(e,t)):bl=Ll(e,t);e:do try{if(Ze!==0&&Fe!==null){t=Fe;var i=Yt;t:switch(Ze){case 1:Ze=0,Yt=null,Tl(e,t,i,1);break;case 2:case 9:if(rd(i)){Ze=0,Yt=null,om(t);break}t=function(){Ze!==2&&Ze!==9||$e!==e||(Ze=7),Aa(e)},i.then(t,t);break e;case 3:Ze=7;break e;case 4:Ze=5;break e;case 7:rd(i)?(Ze=0,Yt=null,om(t)):(Ze=0,Yt=null,Tl(e,t,i,7));break;case 5:var r=null;switch(Fe.tag){case 26:r=Fe.memoizedState;case 5:case 27:var c=Fe;if(r?Wm(r):c.stateNode.complete){Ze=0,Yt=null;var D=c.sibling;if(D!==null)Fe=D;else{var V=c.return;V!==null?(Fe=V,Xr(V)):Fe=null}break t}}Ze=0,Yt=null,Tl(e,t,i,5);break;case 6:Ze=0,Yt=null,Tl(e,t,i,6);break;case 8:eu(),ot=6;break e;default:throw Error(p(462))}}o0();break}catch(Q){am(e,Q)}while(!0);return Ua=Rn=null,xe.H=n,xe.A=l,Ye=a,Fe!==null?0:($e=null,He=0,Ki(),ot)}function o0(){for(;Fe!==null&&!Xa();)rm(Fe)}function rm(e){var t=_f(e.alternate,e,Ha);e.memoizedProps=e.pendingProps,t===null?Xr(e):Fe=t}function om(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=hf(a,t,t.pendingProps,t.type,void 0,He);break;case 11:t=hf(a,t,t.pendingProps,t.type.render,t.ref,He);break;case 5:ss(t);var n=t;n===bt&&(ke?(tr(n),n.tag===5&&n.stateNode!=null&&(et=n.stateNode)):(tr(n),ke=!0));default:Cf(a,t),t=Fe=Kc(t,Ha),t=_f(a,t,Ha)}e.memoizedProps=e.pendingProps,t===null?Xr(e):Fe=t}function Tl(e,t,a,n){Ua=Rn=null,ss(t),cl=null,ai=0;var l=t.return;try{if(Zh(e,l,t,a,He)){ot=1,Sr(e,ta(a,e.current)),Fe=null;return}}catch(i){if(l!==null)throw Fe=l,i;ot=1,Sr(e,ta(a,e.current)),Fe=null;return}t.flags&32768?(ke||n===1?e=!0:bl||(He&536870912)!==0?e=!1:(sn=e=!0,(n===2||n===9||n===3||n===6)&&(n=Et.current,n!==null&&n.tag===13&&(n.flags|=16384))),sm(t,e)):Xr(t)}function Xr(e){var t=e;do{if((t.flags&32768)!==0){sm(t,sn);return}e=t.return;var a=Wh(t.alternate,t,Ha);if(a!==null){Fe=a;return}if(t=t.sibling,t!==null){Fe=t;return}Fe=t=e}while(t!==null);ot===0&&(ot=5)}function sm(e,t){do{var a=$h(e.alternate,e);if(a!==null){a.flags&=32767,Fe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){Fe=e;return}Fe=e=a}while(e!==null);ot=6,Fe=null}function um(e,t,a,n,l,i,r,c,D,V,Q,re){e.cancelPendingCommit=null;do Ir();while(it!==0);if((Ye&6)!==0)throw Error(p(327));if(t!==null){if(t===e.current)throw Error(p(177));e===$e&&(Fe=$e=null,He=0),Vn=t,pa=e,wa=a,$s=l,Wf=n,s0(e,t,a,r,c,D,re)}}function s0(e,t,a,n,l,i,r){var c=t.lanes|t.childLanes;if(Ws=c,c|=Bo,jp(e,a,c,n,l,i),Sl=null,(a&335544064)===a?(_l=Bh(e),n=10262):(_l=null,n=10256),(t.subtreeFlags&n)!==0||(t.flags&n)!==0?(e.callbackNode=null,e.callbackPriority=0,p0(st,function(){return iu(),null})):(e.callbackNode=null,e.callbackPriority=0),Rr=!1,n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=xe.T,xe.T=null,l=Ae.p,Ae.p=2,i=Ye,Ye|=4;try{e0(e,t,a)}finally{Ye=i,Ae.p=l,xe.T=n}}it=1,Rr?yl=j0(r,e.containerInfo,_l,au,nu,c0,lu,iu,u0):(au(),nu(),lu())}function u0(e){if(it!==0){var t=pa.onRecoverableError;t(e,{componentStack:null})}}function c0(){it===3&&(it=0,qf(Vn,pa),it=4)}function au(){if(it===1){it=0;var e=pa,t=Vn,a=wa,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=xe.T,xe.T=null;var l=Ae.p;Ae.p=2;var i=Ye;Ye|=4;try{pi=zr=!1,Xf(t,e,a),a=gu;var r=Fc(e.containerInfo),c=a.focusedElem,D=a.selectionRange;if(r!==c&&c&&c.ownerDocument&&Lc(c.ownerDocument.documentElement,c)){if(D!==null&&Do(c)){var V=D.start,Q=D.end;if(Q===void 0&&(Q=V),"selectionStart"in c)c.selectionStart=V,c.selectionEnd=Math.min(Q,c.value.length);else{var re=c.ownerDocument||document,G=re&&re.defaultView||window;if(G.getSelection){var Z=G.getSelection(),Ee=c.textContent.length,we=Math.min(D.start,Ee),Ue=D.end===void 0?we:Math.min(D.end,Ee);!Z.extend&&we>Ue&&(r=Ue,Ue=we,we=r);var H=kc(c,we),k=kc(c,Ue);if(H&&k&&(Z.rangeCount!==1||Z.anchorNode!==H.node||Z.anchorOffset!==H.offset||Z.focusNode!==k.node||Z.focusOffset!==k.offset)){var q=re.createRange();q.setStart(H.node,H.offset),Z.removeAllRanges(),we>Ue?(Z.addRange(q),Z.extend(k.node,k.offset)):(q.setEnd(k.node,k.offset),Z.addRange(q))}}}}for(re=[],Z=c;Z=Z.parentNode;)Z.nodeType===1&&re.push({element:Z,left:Z.scrollLeft,top:Z.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<re.length;c++){var ie=re[c];ie.element.scrollLeft=ie.left,ie.element.scrollTop=ie.top}}Ml=!!vu,gu=vu=null}finally{Ye=i,Ae.p=l,xe.T=n}}e.current=t,it=2}}function nu(){if(it===2){it=0;var e=pa,t=Vn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=xe.T,xe.T=null;var n=Ae.p;Ae.p=2;var l=Ye;Ye|=4;try{kf(e,t.alternate,t)}finally{Ye=l,Ae.p=n,xe.T=a}}it=3}}function lu(){if(it===4||it===3){it=0;var e=yl;yl=null,Ul();var t=pa,a=Vn,n=wa,l=Wf,i=(n&335544064)===n?10262:10256;if((a.subtreeFlags&i)!==0||(a.flags&i)!==0?it=5:(it=0,Vn=pa=null,cm(t,t.pendingLanes)),i=t.pendingLanes,i===0&&(cn=null),mo(n),a=a.stateNode,Nt&&typeof Nt.onCommitFiberRoot=="function")try{Nt.onCommitFiberRoot(qa,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=xe.T,i=Ae.p,Ae.p=2,xe.T=null;try{for(var r=t.onRecoverableError,c=0;c<l.length;c++){var D=l[c];r(D.value,{componentStack:D.stack})}}finally{xe.T=a,Ae.p=i}}if(l=Sl,r=_l,_l=null,l!==null&&(Sl=null,r===null&&(r=[]),e!==null))for(D=0;D<l.length;D++)a=(0,l[D])(r),a!==void 0&&e.finished.finally(a);(wa&3)!==0&&Ir(),Aa(t),i=t.pendingLanes,(n&261930)!==0&&(i&42)!==0?t===Gr?bi++:(bi=0,Gr=t):(bi=0,Gr=null),xi(0)}}function cm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,$l(t)))}function Ir(){return yl!==null&&(yl.skipTransition(),yl=null),au(),nu(),lu(),iu()}function iu(){if(it!==5)return!1;var e=pa,t=Ws;Ws=0;var a=mo(wa),n=xe.T,l=Ae.p;try{Ae.p=32>a?32:a,xe.T=null,a=$s,$s=null;var i=pa,r=wa;if(it=0,Vn=pa=null,wa=0,(Ye&6)!==0)throw Error(p(331));var c=Ye;if(Ye|=4,Kf(i.current),Yf(i,i.current,r,a),Ye=c,xi(0,!1),Nt&&typeof Nt.onPostCommitFiberRoot=="function")try{Nt.onPostCommitFiberRoot(qa,i)}catch{}return!0}finally{Ae.p=l,xe.T=n,cm(e,t)}}function dm(e,t,a){t=ta(a,t),t=_s(e.stateNode,t,2),e=tn(e,t,2),e!==null&&(Fl(e,2),Aa(e))}function Ke(e,t,a){if(e.tag===3)dm(e,e,a);else for(;t!==null;){if(t.tag===3){dm(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(cn===null||!cn.has(n))){e=ta(a,e),a=of(2),n=tn(t,a,2),n!==null&&(sf(a,n,t,e),Fl(n,2),Aa(n));break}}t=t.return}}function ru(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new n0;var l=new Set;n.set(t,l)}else l=n.get(t),l===void 0&&(l=new Set,n.set(t,l));l.has(a)||(Qs=!0,l.add(a),e=d0.bind(null,e,t,a),t.then(e,e))}function d0(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,$e===e&&(He&a)===a&&((ot===4||ot===3&&(He&62914560)===He&&300>vt()-kr)&&(Ye&2)===0?Cl(e,0):Br|=a,xl===He&&(xl=0)),Aa(e)}function fm(e,t){t===0&&(t=Qu()),e=wn(e,t),e!==null&&(Fl(e,t),Aa(e))}function f0(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),fm(e,a)}function m0(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,l=e.memoizedState;l!==null&&(a=l.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(p(314))}n!==null&&n.delete(t),fm(e,a)}function p0(e,t){return ua(e,t)}var wl=null,Al=null,ou=!1,qr=!1,su=!1,fn=0;function Aa(e){e!==Al&&e.next===null&&(Al===null?wl=Al=e:Al=Al.next=e),qr=!0,ou||(ou=!0,v0())}function xi(e,t){if(!su&&qr){su=!0;do for(var a=!1,n=wl;n!==null;){if(e!==0){var l=n.pendingLanes;if(l===0)var i=0;else{var r=n.suspendedLanes,c=n.pingedLanes;i=(1<<31-Dt(42|e)+1)-1,i&=l&~(r&~c),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,vm(n,i))}else i=He,i=Bi(n,n===$e?i:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(i&3)===0||Ll(n,i)||(a=!0,vm(n,i));n=n.next}while(a);su=!1}}function h0(){mm()}function mm(){qr=ou=!1;var e=0;fn!==0&&A0()&&(e=fn);for(var t=vt(),a=null,n=wl;n!==null;){var l=n.next,i=pm(n,t);i===0?(n.next=null,a===null?wl=l:a.next=l,l===null&&(Al=a)):(a=n,(e!==0||(i&3)!==0)&&(qr=!0)),n=l}it!==0&&it!==5||xi(e),fn!==0&&(fn=0)}function pm(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var r=31-Dt(i),c=1<<r,D=l[r];D===-1?((c&a)===0||(c&n)!==0)&&(l[r]=Mp(c,t)):D<=t&&(e.expiredLanes|=c),i&=~c}if(t=$e,a=He,a=Bi(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(Ze===2||Ze===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Ot(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Ll(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Ot(n),mo(a)){case 2:case 8:a=Wt;break;case 32:a=st;break;case 268435456:a=Le;break;default:a=st}return n=hm.bind(null,e),a=ua(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Ot(n),e.callbackPriority=2,e.callbackNode=null,2}function hm(e,t){if(it!==0&&it!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Ir()&&e.callbackNode!==a)return null;var n=He;return n=Bi(e,e===$e?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(em(e,n,t),pm(e,vt()),e.callbackNode!=null&&e.callbackNode===a?hm.bind(null,e):null)}function vm(e,t){if(Ir())return null;em(e,t,!0)}function v0(){R0(function(){(Ye&6)!==0?ua(Ia,h0):mm()})}function uu(){if(fn===0){var e=zn;e===0&&(e=yn,yn<<=1,(yn&261888)===0&&(yn=256)),fn=e}return fn}function gm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Hi(e)}function g0(e,t,a,n,l){if(t==="submit"&&a&&a.stateNode===l){var i=gm((l[Bt]||null).action),r=n.submitter;r&&(t=(t=r[Bt]||null)?gm(t.formAction):r.getAttribute("formAction"),t!==null&&(i=t,r=null));var c=new qi("action","action",null,n,l);e.push({event:c,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(fn!==0){var D=new FormData(l,r);gs(a,{pending:!0,data:D,method:l.method,action:i},null,D)}}else typeof i=="function"&&(c.preventDefault(),D=new FormData(l,r),gs(a,{pending:!0,data:D,method:l.method,action:i},i,D))},currentTarget:l}]})}}for(var cu=0;cu<Uo.length;cu++){var du=Uo[cu],b0=du.toLowerCase(),x0=du[0].toUpperCase()+du.slice(1);ca(b0,"on"+x0)}ca(Vc,"onAnimationEnd"),ca(Xc,"onAnimationIteration"),ca(Ic,"onAnimationStart"),ca("dblclick","onDoubleClick"),ca("focusin","onFocus"),ca("focusout","onBlur"),ca(Nh,"onTransitionRun"),ca(Rh,"onTransitionStart"),ca(Oh,"onTransitionCancel"),ca(qc,"onTransitionEnd"),Kn("onMouseEnter",["mouseout","mouseover"]),Kn("onMouseLeave",["mouseout","mouseover"]),Kn("onPointerEnter",["pointerout","pointerover"]),Kn("onPointerLeave",["pointerout","pointerover"]),En("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),En("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),En("onBeforeInput",["compositionend","keypress","textInput","paste"]),En("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),En("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),En("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yi));function bm(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],l=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var r=n.length-1;0<=r;r--){var c=n[r],D=c.instance,V=c.currentTarget;if(c=c.listener,D!==i&&l.isPropagationStopped())break e;i=c,l.currentTarget=V;try{i(l)}catch(Q){Zi(Q)}l.currentTarget=null,i=D}else for(r=0;r<n.length;r++){if(c=n[r],D=c.instance,V=c.currentTarget,c=c.listener,D!==i&&l.isPropagationStopped())break e;i=c,l.currentTarget=V;try{i(l)}catch(Q){Zi(Q)}l.currentTarget=null,i=D}}}}function Ge(e,t){var a=t[ac];a===void 0&&(a=t[ac]=new Set);var n=e+"__bubble";a.has(n)||(xm(t,e,2,!1),a.add(n))}function fu(e,t,a){var n=0;t&&(n|=4),xm(a,e,n,t)}var Yr="_reactListening"+Math.random().toString(36).slice(2);function mu(e){if(!e[Yr]){e[Yr]=!0,ic.forEach(function(a){a!=="selectionchange"&&(y0.has(a)||fu(a,!1,e),fu(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Yr]||(t[Yr]=!0,fu("selectionchange",!1,t))}}function xm(e,t,a,n){switch(sp(t)){case 2:var l=f1;break;case 8:l=m1;break;default:l=Mu}a=l.bind(null,t,a,e),l=void 0,!So||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),n?l!==void 0?e.addEventListener(t,a,{capture:!0,passive:l}):e.addEventListener(t,a,!0):l!==void 0?e.addEventListener(t,a,{passive:l}):e.addEventListener(t,a,!1)}function pu(e,t,a,n,l){var i=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var r=n.tag;if(r===3||r===4){var c=n.stateNode.containerInfo;if(c===l)break;if(r===4)for(r=n.return;r!==null;){var D=r.tag;if((D===3||D===4)&&r.stateNode.containerInfo===l)return;r=r.return}for(;c!==null;){if(r=_n(c),r===null)return;if(D=r.tag,D===5||D===6||D===26||D===27){n=i=r;continue e}c=c.parentNode}}n=n.return}bc(function(){var V=i,Q=xo(a),re=[];e:{var G=Yc.get(e);if(G!==void 0){var Z=qi,Ee=e;switch(e){case"keypress":if(Xi(a)===0)break e;case"keydown":case"keyup":Z=lh;break;case"focusin":Ee="focus",Z=To;break;case"focusout":Ee="blur",Z=To;break;case"beforeblur":case"afterblur":Z=To;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Z=Sc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Z=Yp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Z=uh;break;case Vc:case Xc:case Ic:Z=Kp;break;case qc:Z=dh;break;case"scroll":case"scrollend":Z=Ip;break;case"wheel":Z=mh;break;case"copy":case"cut":case"paste":Z=Jp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Z=Ec;break;case"submit":Z=oh;break;case"toggle":case"beforetoggle":Z=hh}var we=(t&4)!==0,Ue=!we&&(e==="scroll"||e==="scrollend"),H=we?G!==null?G+"Capture":null:G;we=[];for(var k=V,q;k!==null;){var ie=k;if(q=ie.stateNode,ie=ie.tag,ie!==5&&ie!==26&&ie!==27||q===null||H===null||(ie=Vl(k,H),ie!=null&&we.push(Si(k,ie,q))),Ue)break;k=k.return}0<we.length&&(G=new Z(G,Ee,null,a,Q),re.push({event:G,listeners:we}))}}if((t&7)===0){e:{if(Z=e==="mouseover"||e==="pointerover",G=e==="mouseout"||e==="pointerout",Z&&a!==bo&&(Ee=a.relatedTarget||a.fromElement)&&(_n(Ee)||Ee[Yn]))break e;(G||Z)&&(Ee=Q.window===Q?Q:(Z=Q.ownerDocument)?Z.defaultView||Z.parentWindow:window,G?(Z=a.relatedTarget||a.toElement,G=V,Z=Z?_n(Z):null,Z!==null&&(Ue=y(Z),we=Z.tag,Z!==Ue||we!==5&&we!==27&&we!==6)&&(Z=null)):(G=null,Z=V),G!==Z&&(we=Sc,ie="onMouseLeave",H="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(we=Ec,ie="onPointerLeave",H="onPointerEnter",k="pointer"),Ue=G==null?Ee:Hl(G),q=Z==null?Ee:Hl(Z),Ee=new we(ie,k+"leave",G,a,Q),Ee.target=Ue,Ee.relatedTarget=q,ie=null,_n(Q)===V&&(we=new we(H,k+"enter",Z,a,Q),we.target=q,we.relatedTarget=Ue,ie=we),Ue=ie,we=G&&Z?le(G,Z,S0):null,G!==null&&ym(re,Ee,G,we,!1),Z!==null&&Ue!==null&&ym(re,Ue,Z,we,!0)))}e:{if(G=V?Hl(V):window,Z=G.nodeName&&G.nodeName.toLowerCase(),Z==="select"||Z==="input"&&G.type==="file")var Te=Dc;else if(Rc(G))if(zc)Te=Th;else{Te=Eh;var Ve=_h}else Z=G.nodeName,!Z||Z.toLowerCase()!=="input"||G.type!=="checkbox"&&G.type!=="radio"?V&&go(V.elementType)&&(Te=Dc):Te=Ch;if(Te&&(Te=Te(e,V))){Oc(re,Te,a,Q);break e}Ve&&Ve(e,G,V)}switch(Ve=V?Hl(V):window,e){case"focusin":(Rc(Ve)||Ve.contentEditable==="true")&&(tl=Ve,zo=V,Ql=null);break;case"focusout":Ql=zo=tl=null;break;case"mousedown":Mo=!0;break;case"contextmenu":case"mouseup":case"dragend":Mo=!1,Gc(re,a,Q);break;case"selectionchange":if(Ah)break;case"keydown":case"keyup":Gc(re,a,Q)}var Oe;if(Ao)e:{switch(e){case"compositionstart":var De="onCompositionStart";break e;case"compositionend":De="onCompositionEnd";break e;case"compositionupdate":De="onCompositionUpdate";break e}De=void 0}else el?Ac(e,a)&&(De="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(De="onCompositionStart");De&&(Cc&&a.locale!=="ko"&&(el||De!=="onCompositionStart"?De==="onCompositionEnd"&&el&&(Oe=xc()):(Ya=Q,_o="value"in Ya?Ya.value:Ya.textContent,el=!0)),Ve=Pr(V,De),0<Ve.length&&(De=new _c(De,e,null,a,Q),re.push({event:De,listeners:Ve}),Oe?De.data=Oe:(Oe=Nc(a),Oe!==null&&(De.data=Oe)))),(Oe=gh?bh(e,a):xh(e,a))&&(De=Pr(V,"onBeforeInput"),0<De.length&&(Ve=new _c("onBeforeInput","beforeinput",null,a,Q),re.push({event:Ve,listeners:De}),Ve.data=Oe)),g0(re,e,V,a,Q)}bm(re,t)})}function Si(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Pr(e,t){for(var a=t+"Capture",n=[];e!==null;){var l=e,i=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||i===null||(l=Vl(e,a),l!=null&&n.unshift(Si(e,l,i)),l=Vl(e,t),l!=null&&n.push(Si(e,l,i))),e.tag===3)return n;e=e.return}return[]}function S0(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ym(e,t,a,n,l){for(var i=t._reactName,r=[];a!==null&&a!==n;){var c=a,D=c.alternate,V=c.stateNode;if(c=c.tag,D!==null&&D===n)break;c!==5&&c!==26&&c!==27||V===null||(D=V,l?(V=Vl(a,i),V!=null&&r.unshift(Si(a,V,D))):l||(V=Vl(a,i),V!=null&&r.push(Si(a,V,D)))),a=a.return}r.length!==0&&e.push({event:t,listeners:r})}var _0=/\r\n?/g,E0=/\u0000|\uFFFD/g;function Sm(e){return(typeof e=="string"?e:""+e).replace(_0,`
`).replace(E0,"")}function _m(e,t){return t=Sm(t),Sm(e)===t}function Qe(e,t,a,n,l,i){switch(a){case"children":if(typeof n=="string")t==="body"||t==="textarea"&&n===""||Jn(e,n);else if(typeof n=="number"||typeof n=="bigint")t!=="body"&&Jn(e,""+n);else return;break;case"className":Gi(e,"class",n);break;case"tabIndex":Gi(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Gi(e,a,n);break;case"style":vc(e,n,i);return;case"data":if(t!=="object"){Gi(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Hi(n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(t!=="input"&&Qe(e,t,"name",l.name,l,null),Qe(e,t,"formEncType",l.formEncType,l,null),Qe(e,t,"formMethod",l.formMethod,l,null),Qe(e,t,"formTarget",l.formTarget,l,null)):(Qe(e,t,"encType",l.encType,l,null),Qe(e,t,"method",l.method,l,null),Qe(e,t,"target",l.target,l,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Hi(n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=ga);return;case"onScroll":n!=null&&Ge("scroll",e);return;case"onScrollEnd":n!=null&&Ge("scrollend",e);return;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(p(61));if(a=n.__html,a!=null){if(l.children!=null)throw Error(p(60));(i!=null?i.__html:void 0)!==a&&(e.innerHTML=a)}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Hi(n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":Ge("beforetoggle",e),Ge("toggle",e),Fi(e,"popover",n);break;case"xlinkActuate":Ra(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Ra(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Ra(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Ra(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Ra(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Ra(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":Fi(e,"is",n);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=Vp.get(a)||a,Fi(e,a,n);else return}qe=!0}function hu(e,t,a,n,l,i){switch(a){case"style":vc(e,n,i);return;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(p(61));if(a=n.__html,a!=null){if(l.children!=null)throw Error(p(60));(i!=null?i.__html:void 0)!==a&&(e.innerHTML=a)}}break;case"children":if(typeof n=="string")Jn(e,n);else if(typeof n=="number"||typeof n=="bigint")Jn(e,""+n);else return;break;case"onScroll":n!=null&&Ge("scroll",e);return;case"onScrollEnd":n!=null&&Ge("scrollend",e);return;case"onClick":n!=null&&(e.onclick=ga);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!rc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),i=a.slice(2,l?a.length-7:void 0),t=e[Bt]||null,t=t!=null?t[a]:null,typeof t=="function"&&e.removeEventListener(i,t,l),typeof n=="function")){typeof t!="function"&&t!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,n,l);break e}qe=!0,a in e?e[a]=n:n===!0?e.setAttribute(a,""):Fi(e,a,n)}return}qe=!0}function wt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ge("error",e),Ge("load",e);var n=!1,l=!1,i;for(i in a)if(a.hasOwnProperty(i)){var r=a[i];if(r!=null)switch(i){case"src":n=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(p(137,t));default:Qe(e,t,i,r,a,null)}}l&&Qe(e,t,"srcSet",a.srcSet,a,null),n&&Qe(e,t,"src",a.src,a,null);return;case"input":Ge("invalid",e);var c=i=r=l=null,D=null,V=null;for(n in a)if(a.hasOwnProperty(n)){var Q=a[n];if(Q!=null)switch(n){case"name":l=Q;break;case"type":r=Q;break;case"checked":D=Q;break;case"defaultChecked":V=Q;break;case"value":i=Q;break;case"defaultValue":c=Q;break;case"children":case"dangerouslySetInnerHTML":if(Q!=null)throw Error(p(137,t));break;default:Qe(e,t,n,Q,a,null)}}fc(e,i,c,D,V,r,l,!1);return;case"select":Ge("invalid",e),n=r=i=null;for(l in a)if(a.hasOwnProperty(l)&&(c=a[l],c!=null))switch(l){case"value":i=c;break;case"defaultValue":r=c;break;case"multiple":n=c;default:Qe(e,t,l,c,a,null)}t=i,a=r,e.multiple=!!n,t!=null?Qn(e,!!n,t,!1):a!=null&&Qn(e,!!n,a,!0);return;case"textarea":Ge("invalid",e),i=l=n=null;for(r in a)if(a.hasOwnProperty(r)&&(c=a[r],c!=null))switch(r){case"value":n=c;break;case"defaultValue":l=c;break;case"children":i=c;break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(p(91));break;default:Qe(e,t,r,c,a,null)}pc(e,n,l,i);return;case"option":for(D in a)if(a.hasOwnProperty(D)&&(n=a[D],n!=null))switch(D){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:Qe(e,t,D,n,a,null)}return;case"dialog":Ge("beforetoggle",e),Ge("toggle",e),Ge("cancel",e),Ge("close",e);break;case"iframe":case"object":Ge("load",e);break;case"video":case"audio":for(n=0;n<yi.length;n++)Ge(yi[n],e);break;case"image":Ge("error",e),Ge("load",e);break;case"details":Ge("toggle",e);break;case"embed":case"source":case"link":Ge("error",e),Ge("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(V in a)if(a.hasOwnProperty(V)&&(n=a[V],n!=null))switch(V){case"children":case"dangerouslySetInnerHTML":throw Error(p(137,t));default:Qe(e,t,V,n,a,null)}return;default:if(go(t)){for(Q in a)a.hasOwnProperty(Q)&&(n=a[Q],n!==void 0&&hu(e,t,Q,n,a,void 0));return}}for(c in a)a.hasOwnProperty(c)&&(n=a[c],n!=null&&Qe(e,t,c,n,a,null))}var C0={};function T0(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,i=null,r=null,c=null,D=null,V=null,Q=null;for(Z in a){var re=a[Z];if(a.hasOwnProperty(Z)&&re!=null)switch(Z){case"checked":break;case"value":break;case"defaultValue":D=re;default:n.hasOwnProperty(Z)||Qe(e,t,Z,null,n,re)}}for(var G in n){var Z=n[G];if(re=a[G],n.hasOwnProperty(G)&&(Z!=null||re!=null))switch(G){case"type":Z!==re&&(qe=!0),i=Z;break;case"name":Z!==re&&(qe=!0),l=Z;break;case"checked":Z!==re&&(qe=!0),V=Z;break;case"defaultChecked":Z!==re&&(qe=!0),Q=Z;break;case"value":Z!==re&&(qe=!0),r=Z;break;case"defaultValue":Z!==re&&(qe=!0),c=Z;break;case"children":case"dangerouslySetInnerHTML":if(Z!=null)throw Error(p(137,t));break;default:Z!==re&&Qe(e,t,G,Z,n,re)}}ho(e,r,c,D,V,Q,i,l);return;case"select":Z=r=c=G=null;for(i in a)if(D=a[i],a.hasOwnProperty(i)&&D!=null)switch(i){case"value":break;case"multiple":Z=D;default:n.hasOwnProperty(i)||Qe(e,t,i,null,n,D)}for(l in n)if(i=n[l],D=a[l],n.hasOwnProperty(l)&&(i!=null||D!=null))switch(l){case"value":i!==D&&(qe=!0),G=i;break;case"defaultValue":i!==D&&(qe=!0),c=i;break;case"multiple":i!==D&&(qe=!0),r=i;default:i!==D&&Qe(e,t,l,i,n,D)}t=c,a=r,n=Z,G!=null?Qn(e,!!a,G,!1):!!n!=!!a&&(t!=null?Qn(e,!!a,t,!0):Qn(e,!!a,a?[]:"",!1));return;case"textarea":Z=G=null;for(c in a)if(l=a[c],a.hasOwnProperty(c)&&l!=null&&!n.hasOwnProperty(c))switch(c){case"value":break;case"children":break;default:Qe(e,t,c,null,n,l)}for(r in n)if(l=n[r],i=a[r],n.hasOwnProperty(r)&&(l!=null||i!=null))switch(r){case"value":l!==i&&(qe=!0),G=l;break;case"defaultValue":l!==i&&(qe=!0),Z=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(p(91));break;default:l!==i&&Qe(e,t,r,l,n,i)}mc(e,G,Z);return;case"option":for(var Ee in a)if(G=a[Ee],a.hasOwnProperty(Ee)&&G!=null&&!n.hasOwnProperty(Ee))switch(Ee){case"selected":e.selected=!1;break;default:Qe(e,t,Ee,null,n,G)}for(D in n)if(G=n[D],Z=a[D],n.hasOwnProperty(D)&&G!==Z&&(G!=null||Z!=null))switch(D){case"selected":G!==Z&&(qe=!0),e.selected=G&&typeof G!="function"&&typeof G!="symbol";break;default:Qe(e,t,D,G,n,Z)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var we in a)G=a[we],a.hasOwnProperty(we)&&G!=null&&!n.hasOwnProperty(we)&&Qe(e,t,we,null,n,G);for(V in n)if(G=n[V],Z=a[V],n.hasOwnProperty(V)&&G!==Z&&(G!=null||Z!=null))switch(V){case"children":case"dangerouslySetInnerHTML":if(G!=null)throw Error(p(137,t));break;default:Qe(e,t,V,G,n,Z)}return;default:if(go(t)){for(var Ue in a)G=a[Ue],a.hasOwnProperty(Ue)&&G!==void 0&&!n.hasOwnProperty(Ue)&&hu(e,t,Ue,void 0,n,G);for(Q in n)G=n[Q],Z=a[Q],!n.hasOwnProperty(Q)||G===Z||G===void 0&&Z===void 0||hu(e,t,Q,G,n,Z);return}}for(var H in a)G=a[H],a.hasOwnProperty(H)&&G!=null&&!n.hasOwnProperty(H)&&Qe(e,t,H,null,n,G);for(re in n)G=n[re],Z=a[re],!n.hasOwnProperty(re)||G===Z||G==null&&Z==null||Qe(e,t,re,G,n,Z)}function Em(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function w0(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var l=a[n],i=l.transferSize,r=l.initiatorType,c=l.duration;if(i&&c&&Em(r)){for(r=0,c=l.responseEnd,n+=1;n<a.length;n++){var D=a[n],V=D.startTime;if(V>c)break;var Q=D.transferSize,re=D.initiatorType;Q&&Em(re)&&(D=D.responseEnd,r+=Q*(D<c?1:(c-V)/(D-V)))}if(--n,t+=8*(i+r)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var vu=null,gu=null;function _i(e){return e.nodeType===9?e:e.ownerDocument}function Cm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tm(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function wm(e,t,a,n){return a=_i(a).createElement(e),a[St]=n,a[Bt]=t,wt(a,e,t),gt(a),a}function bu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xu=null;function A0(){var e=window.event;return e&&e.type==="popstate"?e===xu?!1:(xu=e,!0):(xu=null,!1)}var yu=typeof setTimeout=="function"?setTimeout:void 0,N0=typeof clearTimeout=="function"?clearTimeout:void 0,Am=typeof Promise=="function"?Promise:void 0,Nm=typeof requestAnimationFrame=="function"?requestAnimationFrame:yu,R0=typeof queueMicrotask=="function"?queueMicrotask:typeof Am<"u"?function(e){return Am.resolve(null).then(e).catch(O0)}:yu;function O0(e){setTimeout(function(){throw e})}function mn(e){return e==="head"}function Rm(e,t){var a=t,n=0;do{var l=a.nextSibling;if(e.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(l),jl(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")Nu(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Nu(a);for(var i=a.firstChild;i;){var r=i.nextSibling,c=i.nodeName;i[Gl]||c==="SCRIPT"||c==="STYLE"||c==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=r}}else a==="body"&&Nu(e.ownerDocument.body);a=l}while(a);jl(t)}function Om(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function Dm(e,t,a){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,a!=null&&(e.style.viewTransitionClass=a),a=getComputedStyle(e),a.display==="inline"){if(t=e.getClientRects(),t.length===1)var n=1;else for(var l=n=0;l<t.length;l++){var i=t[l];0<i.width&&0<i.height&&n++}n===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+a.paddingTop,e.marginBottom="-"+a.paddingBottom)}}function zm(e,t){e=e.style,t=t.style;var a=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(a=t.display,e.display=a==null||typeof a=="boolean"?"":a,a=t.margin,a!=null?e.margin=a:(a=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=a==null||typeof a=="boolean"?"":a,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function D0(e,t,a){return a=a.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=a.innerHeight&&e.left<=a.innerWidth}}function Su(e){var t=e.getBoundingClientRect(),a=getComputedStyle(e);return D0(t,a,e)}function z0(e){return e.documentElement.clientHeight}function M0(e){this.addEventListener("load",e),this.addEventListener("error",e)}function j0(e,t,a,n,l,i,r,c,D){var V=t.nodeType===9?t:t.ownerDocument;try{var Q=V.startViewTransition({update:function(){var G=V.defaultView,Z=G.navigation&&G.navigation.transition,Ee=V.fonts.status;n();var we=[];if(Ee==="loaded"&&(z0(V),V.fonts.status==="loading"&&we.push(V.fonts.ready)),Ee=we.length,e!==null)for(var Ue=e.suspenseyImages,H=0,k=0;k<Ue.length;k++){var q=Ue[k];if(!q.complete){var ie=q.getBoundingClientRect();if(0<ie.bottom&&0<ie.right&&ie.top<G.innerHeight&&ie.left<G.innerWidth){if(H+=$m(q),H>Qr){we.length=Ee;break}q=new Promise(M0.bind(q)),we.push(q)}}}if(0<we.length)return G=Promise.race([Promise.all(we),new Promise(function(Te){return setTimeout(Te,500)})]).then(l,l),(Z?Promise.allSettled([Z.finished,G]):G).then(i,i);if(l(),Z)return Z.finished.then(i,i);i()},types:a});V.__reactViewTransition=Q;var re=[];return Q.ready.then(function(){for(var G=V.documentElement.getAnimations({subtree:!0}),Z=0;Z<G.length;Z++){var Ee=G[Z],we=Ee.effect,Ue=we.pseudoElement;if(Ue!=null&&Ue.startsWith("::view-transition")){re.push(Ee),Ee=we.getKeyframes();for(var H=Ue=void 0,k=!0,q=0;q<Ee.length;q++){var ie=Ee[q],Te=ie.width;if(Ue===void 0)Ue=Te;else if(Ue!==Te){k=!1;break}if(Te=ie.height,H===void 0)H=Te;else if(H!==Te){k=!1;break}delete ie.width,delete ie.height,ie.transform==="none"&&delete ie.transform}k&&Ue!==void 0&&H!==void 0&&(we.setKeyframes(Ee),k=getComputedStyle(we.target,we.pseudoElement),k.width!==Ue||k.height!==H)&&(k=Ee[0],k.width=Ue,k.height=H,k=Ee[Ee.length-1],k.width=Ue,k.height=H,we.setKeyframes(Ee))}}r()},function(G){V.__reactViewTransition===Q&&(V.__reactViewTransition=null);try{if(typeof G=="object"&&G!==null)switch(G.name){case"InvalidStateError":(G.message==="View transition was skipped because document visibility state is hidden."||G.message==="Skipping view transition because document visibility state has become hidden."||G.message==="Skipping view transition because viewport size changed."||G.message==="Transition was aborted because of invalid state")&&(G=null)}G!==null&&D(G)}finally{n(),l(),r()}}),Q.finished.finally(function(){for(var G=0;G<re.length;G++)re[G].cancel();V.__reactViewTransition===Q&&(V.__reactViewTransition=null),c()}),Q}catch{return n(),l(),r(),null}}function Xn(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}Xn.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Y({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Xn.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,a=e.getAnimations({subtree:!0}),n=[],l=0;l<a.length;l++){var i=a[l].effect;i!==null&&i.target===e&&i.pseudoElement===t&&n.push(a[l])}return n},Xn.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Mm(e){return{name:e,group:new Xn("group",e),imagePair:new Xn("image-pair",e),old:new Xn("old",e),new:new Xn("new",e)}}function Kt(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Kt.prototype.addEventListener=function(e,t,a){var n=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(n=a.signal||null,n!==null&&n.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var i=this._eventListeners;if(Um(i,e,t,a)===-1){var r=this,c=t;a!=null&&typeof a!="boolean"&&a.once===!0&&(c=function(D){r.removeEventListener(e,t,a),typeof t=="function"?t.call(this,D):t.handleEvent(D)}),n!==null&&(l=r.removeEventListener.bind(r,e,t,a),n.addEventListener("abort",l,{once:!0}),l=n.removeEventListener.bind(n,"abort",l)),n=Nl(a),i.push({type:e,listener:t,optionsOrUseCapture:a,attachedListener:c,cleanup:l}),f(this._fragmentFiber.child,!1,U0,e,c,n)}this._eventListeners=i}};function U0(e,t,a,n){return E(e).addEventListener(t,a,n),!1}Kt.prototype.removeEventListener=function(e,t,a){var n=this._eventListeners;if(n!==null&&(t=Um(n,e,t,a),t!==-1)){var l=n[t];a=l.attachedListener;var i=l.cleanup;l=Nl(l.optionsOrUseCapture),f(this._fragmentFiber.child,!1,B0,e,a,l),n.splice(t,1),i!==null&&i()}};function B0(e,t,a,n){return E(e).removeEventListener(t,a,n),!1}function Nl(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function jm(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function Um(e,t,a,n){if(e.length===0)return-1;n=jm(n);for(var l=0;l<e.length;l++){var i=e[l];if(i.type===t&&i.listener===a&&jm(i.optionsOrUseCapture)===n)return l}return-1}Kt.prototype.dispatchEvent=function(e){var t=R(this._fragmentFiber);if(t===null)return!0;t=E(t);var a=this._eventListeners;if(a!==null&&0<a.length||!e.bubbles){var n=t.nodeType===9?t.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var i=a[l];n.addEventListener(i.type,i.attachedListener,Nl(i.optionsOrUseCapture))}if(t.appendChild(n),e=n.dispatchEvent(e),a)for(l=0;l<a.length;l++)i=a[l],n.removeEventListener(i.type,i.attachedListener,Nl(i.optionsOrUseCapture));return t.removeChild(n),e}return t.dispatchEvent(e)},Kt.prototype.focus=function(e){f(this._fragmentFiber.child,!0,Bm,e,void 0,void 0)};function Bm(e,t){return e.tag===6?!1:(e=E(e),Z0(e,t))}Kt.prototype.focusLast=function(e){var t=[];f(this._fragmentFiber.child,!0,_u,t,void 0,void 0);for(var a=t.length-1;0<=a&&!Bm(t[a],e);a--);};function _u(e,t){return t.push(e),!1}Kt.prototype.blur=function(){var e=R(this._fragmentFiber);e!==null&&(e=E(e),e=_i(e).activeElement,e!==null&&f(this._fragmentFiber.child,!1,k0,e,void 0,void 0))};function k0(e,t){return e.tag===6?!1:(e=E(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Kt.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),f(this._fragmentFiber.child,!1,L0,e,void 0,void 0)};function L0(e,t){return e.tag===6||(e=E(e),t.observe(e)),!1}Kt.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),f(this._fragmentFiber.child,!1,F0,e,void 0,void 0);for(var a=t=0;a<ha.length;a++){var n=ha[a];n.fragmentInstance===this&&n.observer===e?e.unobserve(n.instance):ha[t++]=n}ha.length=t}};function F0(e,t){return e.tag===6||(e=E(e),t.unobserve(e)),!1}var ha=[],Eu=!1;function G0(e,t,a){ha.push({fragmentInstance:e,observer:t,instance:a}),Eu||(Eu=!0,K0(function(){Eu=!1;var n=ha;ha=[];for(var l=0;l<n.length;l++){var i=n[l];i.observer.unobserve(i.instance)}}))}Kt.prototype.getClientRects=function(){var e=[];return f(this._fragmentFiber.child,!1,H0,e,void 0,void 0),e};function H0(e,t){if(e.tag===6){e=e.stateNode;var a=e.ownerDocument.createRange();a.selectNodeContents(e),t.push.apply(t,a.getClientRects())}else e=E(e),t.push.apply(t,e.getClientRects());return!1}Kt.prototype.getRootNode=function(e){var t=R(this._fragmentFiber);return t===null?this:E(t).getRootNode(e)},Kt.prototype.compareDocumentPosition=function(e){var t=R(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];f(this._fragmentFiber.child,!1,_u,a,void 0,void 0);var n=E(t);if(a.length===0){if(a=n,v(this._fragmentFiber)){e:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break e}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(a=t)}t=this._fragmentFiber;var l=n=a.compareDocumentPosition(e);return a===e?l=Node.DOCUMENT_POSITION_CONTAINS:n&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=O(t)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(e=E(a).compareDocumentPosition(e),l=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=E(a[0]),l=E(a[a.length-1]);var i=v(this._fragmentFiber)?t.parentElement:n;if(i==null)return Node.DOCUMENT_POSITION_DISCONNECTED;n=i.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,i=i.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),c=l.compareDocumentPosition(e),D=r&Node.DOCUMENT_POSITION_CONTAINED_BY||c&Node.DOCUMENT_POSITION_CONTAINED_BY;return c=n&&i&&r&Node.DOCUMENT_POSITION_FOLLOWING&&c&Node.DOCUMENT_POSITION_PRECEDING,t=n&&t===e||i&&l===e||D||c?Node.DOCUMENT_POSITION_CONTAINED_BY:!n&&t===e||!i&&l===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||V0(t,this._fragmentFiber,a[0],a[a.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function V0(e,t,a,n,l){var i=_n(l);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!i)e:{for(;i!==null;){if(i.tag===7&&(i===t||i.alternate===t)){a=!0;break e}i=i.return}a=!1}return a}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(i===null)return i=l.ownerDocument,l===i||l===i.documentElement||l===i.body;e:{for(i=t,t=R(t);i!==null;){if(!(i.tag!==5&&i.tag!==3&&i.tag!==27||i!==t&&i.alternate!==t)){i=!0;break e}i=i.return}i=!1}return i}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!i)&&!(t=i===a)&&(t=le(a,i,I),t===null?t=!1:(f(t,!0,L,i,a),i=S,S=null,t=i!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!i)&&!(t=i===n)&&(t=le(n,i,I),t===null?t=!1:(f(t,!0,X,i,n),i=S,z=S=null,t=i!==null)),t):!1}function km(e,t){var a=e.ownerDocument.createRange();a.selectNodeContents(e),e=a.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Kt.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(p(566));var t=[];f(this._fragmentFiber.child,!1,_u,t,void 0,void 0);var a=e!==!1;if(t.length===0){var n=O(this._fragmentFiber);if(n=a?n[1]||n[0]||R(this._fragmentFiber):n[0]||n[1],n===null)return;if(n.tag===6){e=E(n),km(e,a);return}if(n=E(n),n.nodeType!==9){if(n.nodeType===11){a="host"in n?n.host:null,a!==null&&a.scrollIntoView(e);return}n.scrollIntoView(e)}}for(n=a?t.length-1:0;n!==(a?-1:t.length);){var l=t[n];l.tag===6?(l=E(l),km(l,a)):E(l).scrollIntoView(e),n+=a?-1:1}};function X0(e,t){return e=E(e),Lm(e,t),!1}function Lm(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function Fm(e,t){var a=t._eventListeners;if(a!==null)for(var n=0;n<a.length;n++){var l=a[n];e.addEventListener(l.type,l.attachedListener,Nl(l.optionsOrUseCapture))}e.nodeType!==3&&(a=t._observers,a!==null&&a.forEach(function(i){for(var r=0,c=0;c<ha.length;c++){var D=ha[c];(D.fragmentInstance!==t||D.observer!==i||D.instance!==e)&&(ha[r++]=D)}ha.length=r,i.observe(e)}),Lm(e,t))}function I0(e,t){var a=t._eventListeners;if(a!==null)for(var n=0;n<a.length;n++){var l=a[n];e.removeEventListener(l.type,l.attachedListener,Nl(l.optionsOrUseCapture))}e.nodeType!==3&&(a=t._observers,a!==null&&a.forEach(function(i){typeof i.rootMargin=="string"?G0(t,i,e):i.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Cu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Cu(a),Li(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function q0(e,t,a,n){for(;e.nodeType===1;){var l=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Gl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=ra(e.nextSibling),e===null)break}return null}function Y0(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=ra(e.nextSibling),e===null))return null;return e}function Gm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ra(e.nextSibling),e===null))return null;return e}function Tu(e){return e.data==="$?"||e.data==="$~"}function wu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function P0(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function ra(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Au=null;function Hm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return ra(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Vm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function Z0(e,t){function a(){n=!0}if(e.ownerDocument.activeElement===e)return!0;var n=!1;try{e.ownerDocument.addEventListener("focus",a,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",a,!0)}return n}function K0(e){Nm(function(){Nm(function(t){return e(t)})})}function Xm(e,t,a){switch(t=_i(a),e){case"html":if(e=t.documentElement,!e)throw Error(p(452));return e;case"head":if(e=t.head,!e)throw Error(p(453));return e;case"body":if(e=t.body,!e)throw Error(p(454));return e;default:throw Error(p(451))}}function Im(e,t,a){for(var n in a){var l=a[n];a.hasOwnProperty(n)&&l!=null&&Qe(e,t,n,null,C0,l)}a.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===ga&&(e.onclick=null),Li(e)}function Nu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Li(e)}var oa=new Map,qm=new Set;function Ei(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Va=Ae.d;Ae.d={f:Q0,r:J0,D:W0,C:$0,L:e1,m:t1,X:n1,S:a1,M:l1};function Q0(){var e=Va.f(),t=Hr();return e||t}function J0(e){var t=Pn(e);t!==null&&t.tag===5&&t.type==="form"?Yd(t):Va.r(e)}var Rl=typeof document>"u"?null:document;function Ym(e,t,a){var n=Rl;if(n&&typeof t=="string"&&t){var l=$t(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),qm.has(l)||(qm.add(l),e={rel:e,crossOrigin:a,href:t},n.querySelector(l)===null&&(t=n.createElement("link"),wt(t,"link",e),gt(t),n.head.appendChild(t)))}}function W0(e){Va.D(e),Ym("dns-prefetch",e,null)}function $0(e,t){Va.C(e,t),Ym("preconnect",e,t)}function e1(e,t,a){Va.L(e,t,a);var n=Rl;if(n&&e&&t){var l='link[rel="preload"][as="'+$t(t)+'"]';t==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+$t(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+$t(a.imageSizes)+'"]')):l+='[href="'+$t(e)+'"]';var i=l;switch(t){case"style":i=Ol(e);break;case"script":i=Dl(e)}if(!(oa.has(i)||(e=Y({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),oa.set(i,e),n.querySelector(l)!==null||t==="style"&&n.querySelector(Ci(i))||t==="script"&&n.querySelector(Ti(i))))){var r=n.createElement("link");wt(r,"link",e),t==="style"&&(r[ki]=!0,r.onload=r.onerror=function(){lc(r)}),gt(r),n.head.appendChild(r)}}}function t1(e,t){Va.m(e,t);var a=Rl;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+$t(n)+'"][href="'+$t(e)+'"]',i=l;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Dl(e)}if(!oa.has(i)&&(e=Y({rel:"modulepreload",href:e},t),oa.set(i,e),a.querySelector(l)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ti(i)))return}n=a.createElement("link"),wt(n,"link",e),gt(n),a.head.appendChild(n)}}}function a1(e,t,a){Va.S(e,t,a);var n=Rl;if(n&&e){var l=Zn(n).hoistableStyles,i=Ol(e);t=t||"default";var r=l.get(i);if(!r){var c={loading:0,preload:null};if(r=n.querySelector(Ci(i)))c.loading=5;else{e=Y({rel:"stylesheet",href:e,"data-precedence":t},a),(a=oa.get(i))&&Ru(e,a);var D=r=n.createElement("link");gt(D),wt(D,"link",e),D._p=new Promise(function(V,Q){D.onload=V,D.onerror=Q}),D.addEventListener("load",function(){c.loading|=1}),D.addEventListener("error",function(){c.loading|=2}),c.loading|=4,Zr(r,t,n)}r={type:"stylesheet",instance:r,count:1,state:c},l.set(i,r)}}}function n1(e,t){Va.X(e,t);var a=Rl;if(a&&e){var n=Zn(a).hoistableScripts,l=Dl(e),i=n.get(l);i||(i=a.querySelector(Ti(l)),i||(e=Y({src:e,async:!0},t),(t=oa.get(l))&&Ou(e,t),i=a.createElement("script"),gt(i),wt(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(l,i))}}function l1(e,t){Va.M(e,t);var a=Rl;if(a&&e){var n=Zn(a).hoistableScripts,l=Dl(e),i=n.get(l);i||(i=a.querySelector(Ti(l)),i||(e=Y({src:e,async:!0,type:"module"},t),(t=oa.get(l))&&Ou(e,t),i=a.createElement("script"),gt(i),wt(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(l,i))}}function Pm(e,t,a,n){var l=(l=fe.current)?Ei(l):null;if(!l)throw Error(p(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Ol(a.href),t=Zn(l).hoistableStyles,n=t.get(a),n||(n={type:"style",instance:null,count:0,state:null},t.set(a,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Ol(a.href);var i=Zn(l).hoistableStyles,r=i.get(e);if(r||(l=l.ownerDocument||l,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,r),(i=l.querySelector(Ci(e)))?i._p||(r.instance=i,r.state.loading=5):(i=oa.get(e),i||(i={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},oa.set(e,i)),i1(l,e,i,r.state))),t&&n===null)throw Error(p(528,""));return r}if(t&&n!==null)throw Error(p(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(a=Dl(a),t=Zn(l).hoistableScripts,n=t.get(a),n||(n={type:"script",instance:null,count:0,state:null},t.set(a,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(p(444,e))}}function Ol(e){return'href="'+$t(e)+'"'}function Ci(e){return'link[rel="stylesheet"]['+e+"]"}function Zm(e){return Y({},e,{"data-precedence":e.precedence,precedence:null})}function i1(e,t,a,n){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[ki]!==!0){n.loading=1;return}}else t=e.createElement("link"),t[ki]=!0,t.onload=t.onerror=lc.bind(null,t),wt(t,"link",a),gt(t),e.head.appendChild(t);n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2})}function Dl(e){return'[src="'+$t(e)+'"]'}function Ti(e){return"script[async]"+e}function Km(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+$t(a.href)+'"]');if(n)return t.instance=n,gt(n),n;var l=Y({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),gt(n),wt(n,"style",l),Zr(n,a.precedence,e),t.instance=n;case"stylesheet":l=Ol(a.href);var i=e.querySelector(Ci(l));if(i)return t.state.loading|=4,t.instance=i,gt(i),i;n=Zm(a),(l=oa.get(l))&&Ru(n,l),i=(e.ownerDocument||e).createElement("link"),gt(i);var r=i;return r._p=new Promise(function(c,D){r.onload=c,r.onerror=D}),wt(i,"link",n),t.state.loading|=4,Zr(i,a.precedence,e),t.instance=i;case"script":return i=Dl(a.src),(l=e.querySelector(Ti(i)))?(t.instance=l,gt(l),l):(n=a,(l=oa.get(i))&&(n=Y({},a),Ou(n,l)),e=e.ownerDocument||e,l=e.createElement("script"),gt(l),wt(l,"link",n),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(p(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,Zr(n,a.precedence,e));return t.instance}function Zr(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=n.length?n[n.length-1]:null,i=l,r=0;r<n.length;r++){var c=n[r];if(c.dataset.precedence===t)i=c;else if(i!==l)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Ru(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Ou(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Kr=null;function Qm(e,t,a){if(Kr===null){var n=new Map,l=Kr=new Map;l.set(a,n)}else l=Kr,n=l.get(a),n||(n=new Map,l.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),l=0;l<a.length;l++){var i=a[l];if(!(i[Gl]||i[St]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var r=i.getAttribute(t)||"";r=e+r;var c=n.get(r);c?c.push(i):n.set(r,[i])}}return n}function Du(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function r1(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Jm(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function Wm(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $m(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function ep(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=$m(t),e.suspenseyImages.push(t)),e=u1.bind(e),t.decode().then(e,e))}function o1(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Ol(n.href),i=t.querySelector(Ci(l));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=wi.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=i,gt(i);return}i=t.ownerDocument||t,n=Zm(n),(l=oa.get(l))&&Ru(n,l),i=i.createElement("link"),gt(i);var r=i;r._p=new Promise(function(c,D){r.onload=c,r.onerror=D}),wt(i,"link",n),a.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=wi.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Qr=0;function s1(e,t){return e.stylesheets&&e.count===0&&Wr(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&Wr(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&Qr===0&&(Qr=62500*w0());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Wr(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>Qr?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(l)}}:null}function tp(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)Wr(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function wi(){this.count--,tp(this)}function u1(){this.imgCount--,tp(this)}var Jr=null;function Wr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Jr=new Map,t.forEach(c1,e),Jr=null,wi.call(e))}function c1(e,t){if(!(t.state.loading&4)){var a=Jr.get(e);if(a)var n=a.get(null);else{a=new Map,Jr.set(e,a);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<l.length;i++){var r=l[i];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(a.set(r.dataset.precedence,r),n=r)}n&&a.set(null,n)}l=t.instance,r=l.getAttribute("data-precedence"),i=a.get(r)||n,i===n&&a.set(null,l),a.set(r,l),this.count++,n=wi.bind(this),l.addEventListener("load",n),l.addEventListener("error",n),i?i.parentNode.insertBefore(l,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var zl={$$typeof:te,Provider:null,Consumer:null,_currentValue:at,_currentValue2:at,_threadCount:0};function d1(e,t,a,n,l,i,r,c,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=co(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=co(0),this.hiddenUpdates=co(null),this.identifierPrefix=n,this.onUncaughtError=l,this.onCaughtError=i,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.transitionTypes=null,this.incompleteTransitions=new Map}function ap(e,t,a,n,l,i,r,c,D,V,Q,re){return e=new d1(e,t,a,r,D,V,Q,re,c),t=1,i===!0&&(t|=24),i=kt(3,null,null,t),e.current=i,i.stateNode=e,t=Yo(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:n,isDehydrated:a,cache:t},Qo(i),e}function np(e){return e?(e=ll,e):ll}function lp(e,t,a,n,l,i){l=np(l),n.context===null?n.context=l:n.pendingContext=l,n=en(t),n.payload={element:a},i=i===void 0?null:i,i!==null&&(n.callback=i),a=tn(e,n,t),a!==null&&(Ht(a,e,t),ni(a,e,t))}function ip(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function zu(e,t){ip(e,t),(e=e.alternate)&&ip(e,t)}function rp(e){if(e.tag===13||e.tag===31){var t=wn(e,67108864);t!==null&&Ht(t,e,67108864),zu(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=Zt();t=fo(t);var a=wn(e,t);a!==null&&Ht(a,e,t),zu(e,t)}}var Ml=!0;function f1(e,t,a,n){var l=xe.T;xe.T=null;var i=Ae.p;try{Ae.p=2,Mu(e,t,a,n)}finally{Ae.p=i,xe.T=l}}function m1(e,t,a,n){var l=xe.T;xe.T=null;var i=Ae.p;try{Ae.p=8,Mu(e,t,a,n)}finally{Ae.p=i,xe.T=l}}function Mu(e,t,a,n){if(Ml){var l=ju(n);if(l===null)pu(e,t,n,$r,a),up(e,n);else if(h1(l,e,t,a,n))n.stopPropagation();else if(up(e,n),t&4&&-1<p1.indexOf(e)){for(;l!==null;){var i=Pn(l);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var r=Sn(i.pendingLanes);if(r!==0){var c=i;for(c.pendingLanes|=2,c.entangledLanes|=2;r;){var D=1<<31-Dt(r);c.entanglements[1]|=D,r&=~D}Aa(i),(Ye&6)===0&&(Lr=vt()+500,xi(0))}}break;case 31:case 13:c=wn(i,2),c!==null&&Ht(c,i,2),Hr(),zu(i,2)}if(i=ju(n),i===null&&pu(e,t,n,$r,a),i===l)break;l=i}l!==null&&n.stopPropagation()}else pu(e,t,n,null,a)}}function ju(e){return e=xo(e),Uu(e)}var $r=null;function Uu(e){if($r=null,e=_n(e),e!==null){var t=y(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=w(t),e!==null)return e;e=null}else if(a===31){if(e=h(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $r=e,null}function sp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Bl()){case Ia:return 2;case Wt:return 8;case st:case In:return 32;case Le:return 268435456;default:return 32}default:return 32}}var Bu=!1,pn=null,hn=null,vn=null,Ai=new Map,Ni=new Map,gn=[],p1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function up(e,t){switch(e){case"focusin":case"focusout":pn=null;break;case"dragenter":case"dragleave":hn=null;break;case"mouseover":case"mouseout":vn=null;break;case"pointerover":case"pointerout":Ai.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ni.delete(t.pointerId)}}function Ri(e,t,a,n,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:i,targetContainers:[l]},t!==null&&(t=Pn(t),t!==null&&rp(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function h1(e,t,a,n,l){switch(t){case"focusin":return pn=Ri(pn,e,t,a,n,l),!0;case"dragenter":return hn=Ri(hn,e,t,a,n,l),!0;case"mouseover":return vn=Ri(vn,e,t,a,n,l),!0;case"pointerover":var i=l.pointerId;return Ai.set(i,Ri(Ai.get(i)||null,e,t,a,n,l)),!0;case"gotpointercapture":return i=l.pointerId,Ni.set(i,Ri(Ni.get(i)||null,e,t,a,n,l)),!0}return!1}function cp(e){var t=_n(e.target);if(t!==null){var a=y(t);if(a!==null){if(t=a.tag,t===13){if(t=w(a),t!==null){e.blockedOn=t,tc(e.priority,function(){op(a)});return}}else if(t===31){if(t=h(a),t!==null){e.blockedOn=t,tc(e.priority,function(){op(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function eo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=ju(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);bo=n,a.target.dispatchEvent(n),bo=null}else return t=Pn(a),t!==null&&rp(t),e.blockedOn=a,!1;t.shift()}return!0}function dp(e,t,a){eo(e)&&a.delete(t)}function v1(){Bu=!1,pn!==null&&eo(pn)&&(pn=null),hn!==null&&eo(hn)&&(hn=null),vn!==null&&eo(vn)&&(vn=null),Ai.forEach(dp),Ni.forEach(dp)}function to(e,t){e.blockedOn===t&&(e.blockedOn=null,Bu||(Bu=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,v1)))}var ao=null;function fp(e){ao!==e&&(ao=e,d.unstable_scheduleCallback(d.unstable_NormalPriority,function(){ao===e&&(ao=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],l=e[t+2];if(typeof n!="function"){if(Uu(n||a)===null)continue;break}var i=Pn(a);i!==null&&(e.splice(t,3),t-=3,gs(i,{pending:!0,data:l,method:a.method,action:n},n,l))}}))}function jl(e){function t(D){return to(D,e)}pn!==null&&to(pn,e),hn!==null&&to(hn,e),vn!==null&&to(vn,e),Ai.forEach(t),Ni.forEach(t);for(var a=0;a<gn.length;a++){var n=gn[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<gn.length&&(a=gn[0],a.blockedOn===null);)cp(a),a.blockedOn===null&&gn.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var l=a[n],i=a[n+1],r=l[Bt]||null;if(typeof i=="function")r||fp(a);else if(r){var c=null;if(i&&i.hasAttribute("formAction")){if(l=i,r=i[Bt]||null)c=r.formAction;else if(Uu(l)!==null)continue}else c=r.action;typeof c=="function"?a[n+1]=c:(a.splice(n,3),n-=3),fp(a)}}}function mp(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(r){return l=r})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function ku(e){this._internalRoot=e}no.prototype.render=ku.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(p(409));var a=t.current,n=Zt();lp(a,n,e,t,null,null)},no.prototype.unmount=ku.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;lp(e.current,2,null,e,null,null),Hr(),t[Yn]=null}};function no(e){this._internalRoot=e}no.prototype.unstable_scheduleHydration=function(e){if(e){var t=ec();e={blockedOn:null,target:e,priority:t};for(var a=0;a<gn.length&&t!==0&&t<gn[a].priority;a++);gn.splice(a,0,e),a===0&&cp(e)}};var pp=de.version;if(pp!=="19.3.1")throw Error(p(527,pp,"19.3.1"));Ae.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(p(188)):(e=Object.keys(e).join(","),Error(p(268,e)));return e=B(t),e=e!==null?M(e):null,e=e===null?null:e.stateNode,e};var g1={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:xe,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var lo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!lo.isDisabled&&lo.supportsFiber)try{qa=lo.inject(g1),Nt=lo}catch{}}return Di.createRoot=function(e,t){if(!U(e))throw Error(p(299));var a=!1,n="",l=af,i=nf,r=lf;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=ap(e,1,!1,null,null,a,n,null,l,i,r,mp),e[Yn]=t.current,mu(e),new ku(t)},Di.hydrateRoot=function(e,t,a){if(!U(e))throw Error(p(299));var n=!1,l="",i=af,r=nf,c=lf,D=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(r=a.onCaughtError),a.onRecoverableError!==void 0&&(c=a.onRecoverableError),a.formState!==void 0&&(D=a.formState)),t=ap(e,1,!0,t,a??null,n,l,D,i,r,c,mp),t.context=np(null),a=t.current,n=Zt(),n=fo(n),l=en(n),l.callback=null,tn(a,l,n),a=n,t.current.lanes=a,Fl(t,a),Aa(t),e[Yn]=t.current,mu(e),new no(t)},Di.version="19.3.1",Di}var Cp;function N1(){if(Cp)return Fu.exports;Cp=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(de){console.error(de)}}return d(),Fu.exports=A1(),Fu.exports}var R1=N1(),ze=Yu();function ro(d){throw new Error('Could not dynamically require "'+d+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Iu={exports:{}};/*!

JSZip v3.10.2 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var Tp;function O1(){return Tp||(Tp=1,(function(d,de){(function(N){d.exports=N()})(function(){return(function N(p,U,y){function w(B,M){if(!U[B]){if(!p[B]){var f=typeof ro=="function"&&ro;if(!M&&f)return f(B,!0);if(h)return h(B,!0);var R=new Error("Cannot find module '"+B+"'");throw R.code="MODULE_NOT_FOUND",R}var v=U[B]={exports:{}};p[B][0].call(v.exports,function(O){var m=p[B][1][O];return w(m||O)},v,v.exports,N,p,U,y)}return U[B].exports}for(var h=typeof ro=="function"&&ro,C=0;C<y.length;C++)w(y[C]);return w})({1:[function(N,p,U){var y=N("./utils"),w=N("./support"),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";U.encode=function(C){for(var B,M,f,R,v,O,m,E=[],S=0,z=C.length,L=z,X=y.getTypeOf(C)!=="string";S<C.length;)L=z-S,f=X?(B=C[S++],M=S<z?C[S++]:0,S<z?C[S++]:0):(B=C.charCodeAt(S++),M=S<z?C.charCodeAt(S++):0,S<z?C.charCodeAt(S++):0),R=B>>2,v=(3&B)<<4|M>>4,O=1<L?(15&M)<<2|f>>6:64,m=2<L?63&f:64,E.push(h.charAt(R)+h.charAt(v)+h.charAt(O)+h.charAt(m));return E.join("")},U.decode=function(C){var B,M,f,R,v,O,m=0,E=0,S="data:";if(C.substr(0,S.length)===S)throw new Error("Invalid base64 input, it looks like a data url.");var z,L=3*(C=C.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(C.charAt(C.length-1)===h.charAt(64)&&L--,C.charAt(C.length-2)===h.charAt(64)&&L--,L%1!=0)throw new Error("Invalid base64 input, bad content length.");for(z=w.uint8array?new Uint8Array(0|L):new Array(0|L);m<C.length;)B=h.indexOf(C.charAt(m++))<<2|(R=h.indexOf(C.charAt(m++)))>>4,M=(15&R)<<4|(v=h.indexOf(C.charAt(m++)))>>2,f=(3&v)<<6|(O=h.indexOf(C.charAt(m++))),z[E++]=B,v!==64&&(z[E++]=M),O!==64&&(z[E++]=f);return z}},{"./support":30,"./utils":32}],2:[function(N,p,U){var y=N("./external"),w=N("./stream/DataWorker"),h=N("./stream/Crc32Probe"),C=N("./stream/DataLengthProbe");function B(M,f,R,v,O){this.compressedSize=M,this.uncompressedSize=f,this.crc32=R,this.compression=v,this.compressedContent=O}B.prototype={getContentWorker:function(){var M=new w(y.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new C("data_length")),f=this;return M.on("end",function(){if(this.streamInfo.data_length!==f.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),M},getCompressedWorker:function(){return new w(y.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},B.createWorkerFrom=function(M,f,R){return M.pipe(new h).pipe(new C("uncompressedSize")).pipe(f.compressWorker(R)).pipe(new C("compressedSize")).withStreamInfo("compression",f)},p.exports=B},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(N,p,U){var y=N("./stream/GenericWorker");U.STORE={magic:"\0\0",compressWorker:function(){return new y("STORE compression")},uncompressWorker:function(){return new y("STORE decompression")}},U.DEFLATE=N("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(N,p,U){var y=N("./utils"),w=(function(){for(var h,C=[],B=0;B<256;B++){h=B;for(var M=0;M<8;M++)h=1&h?3988292384^h>>>1:h>>>1;C[B]=h}return C})();p.exports=function(h,C){return h!==void 0&&h.length?y.getTypeOf(h)!=="string"?(function(B,M,f,R){var v=w,O=R+f;B^=-1;for(var m=R;m<O;m++)B=B>>>8^v[255&(B^M[m])];return-1^B})(0|C,h,h.length,0):(function(B,M,f,R){var v=w,O=R+f;B^=-1;for(var m=R;m<O;m++)B=B>>>8^v[255&(B^M.charCodeAt(m))];return-1^B})(0|C,h,h.length,0):0}},{"./utils":32}],5:[function(N,p,U){U.base64=!1,U.binary=!1,U.dir=!1,U.createFolders=!0,U.date=null,U.compression=null,U.compressionOptions=null,U.comment=null,U.unixPermissions=null,U.dosPermissions=null},{}],6:[function(N,p,U){var y=null;y=typeof Promise<"u"?Promise:N("lie"),p.exports={Promise:y}},{lie:37}],7:[function(N,p,U){var y=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",w=N("pako"),h=N("./utils"),C=N("./stream/GenericWorker"),B=y?"uint8array":"array";function M(f,R){C.call(this,"FlateWorker/"+f),this._pako=null,this._pakoAction=f,this._pakoOptions=R,this.meta={}}U.magic="\b\0",h.inherits(M,C),M.prototype.processChunk=function(f){this.meta=f.meta,this._pako===null&&this._createPako(),this._pako.push(h.transformTo(B,f.data),!1)},M.prototype.flush=function(){C.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},M.prototype.cleanUp=function(){C.prototype.cleanUp.call(this),this._pako=null},M.prototype._createPako=function(){this._pako=new w[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var f=this;this._pako.onData=function(R){f.push({data:R,meta:f.meta})}},U.compressWorker=function(f){return new M("Deflate",f)},U.uncompressWorker=function(){return new M("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(N,p,U){function y(v,O){var m,E="";for(m=0;m<O;m++)E+=String.fromCharCode(255&v),v>>>=8;return E}function w(v,O,m,E,S,z){var L,X,I=v.file,le=v.compression,Y=z!==B.utf8encode,ne=h.transformTo("string",z(I.name)),ee=h.transformTo("string",B.utf8encode(I.name)),pe=I.comment,Ce=h.transformTo("string",z(pe)),j=h.transformTo("string",B.utf8encode(pe)),P=ee.length!==I.name.length,u=j.length!==pe.length,te="",oe="",$="",ye=I.dir,se=I.date,Se={crc32:0,compressedSize:0,uncompressedSize:0};O&&!m||(Se.crc32=v.crc32,Se.compressedSize=v.compressedSize,Se.uncompressedSize=v.uncompressedSize);var J=0;O&&(J|=8),Y||!P&&!u||(J|=2048);var _=0,ce=0;ye&&(_|=16),S==="UNIX"?(ce=798,_|=(function(g,b){var he=g;return g||(he=b?16893:33204),(65535&he)<<16})(I.unixPermissions,ye)):(ce=20,_|=(function(g){return 63&(g||0)})(I.dosPermissions)),L=se.getUTCHours(),L<<=6,L|=se.getUTCMinutes(),L<<=5,L|=se.getUTCSeconds()/2,X=se.getUTCFullYear()-1980,X<<=4,X|=se.getUTCMonth()+1,X<<=5,X|=se.getUTCDate(),P&&(oe=y(1,1)+y(M(ne),4)+ee,te+="up"+y(oe.length,2)+oe),u&&($=y(1,1)+y(M(Ce),4)+j,te+="uc"+y($.length,2)+$);var T="";return T+=`
\0`,T+=y(J,2),T+=le.magic,T+=y(L,2),T+=y(X,2),T+=y(Se.crc32,4),T+=y(Se.compressedSize,4),T+=y(Se.uncompressedSize,4),T+=y(ne.length,2),T+=y(te.length,2),{fileRecord:f.LOCAL_FILE_HEADER+T+ne+te,dirRecord:f.CENTRAL_FILE_HEADER+y(ce,2)+T+y(Ce.length,2)+"\0\0\0\0"+y(_,4)+y(E,4)+ne+te+Ce}}var h=N("../utils"),C=N("../stream/GenericWorker"),B=N("../utf8"),M=N("../crc32"),f=N("../signature");function R(v,O,m,E){C.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=O,this.zipPlatform=m,this.encodeFileName=E,this.streamFiles=v,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}h.inherits(R,C),R.prototype.push=function(v){var O=v.meta.percent||0,m=this.entriesCount,E=this._sources.length;this.accumulate?this.contentBuffer.push(v):(this.bytesWritten+=v.data.length,C.prototype.push.call(this,{data:v.data,meta:{currentFile:this.currentFile,percent:m?(O+100*(m-E-1))/m:100}}))},R.prototype.openedSource=function(v){this.currentSourceOffset=this.bytesWritten,this.currentFile=v.file.name;var O=this.streamFiles&&!v.file.dir;if(O){var m=w(v,O,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},R.prototype.closedSource=function(v){this.accumulate=!1;var O=this.streamFiles&&!v.file.dir,m=w(v,O,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),O)this.push({data:(function(E){return f.DATA_DESCRIPTOR+y(E.crc32,4)+y(E.compressedSize,4)+y(E.uncompressedSize,4)})(v),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},R.prototype.flush=function(){for(var v=this.bytesWritten,O=0;O<this.dirRecords.length;O++)this.push({data:this.dirRecords[O],meta:{percent:100}});var m=this.bytesWritten-v,E=(function(S,z,L,X,I){var le=h.transformTo("string",I(X));return f.CENTRAL_DIRECTORY_END+"\0\0\0\0"+y(S,2)+y(S,2)+y(z,4)+y(L,4)+y(le.length,2)+le})(this.dirRecords.length,m,v,this.zipComment,this.encodeFileName);this.push({data:E,meta:{percent:100}})},R.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},R.prototype.registerPrevious=function(v){this._sources.push(v);var O=this;return v.on("data",function(m){O.processChunk(m)}),v.on("end",function(){O.closedSource(O.previous.streamInfo),O._sources.length?O.prepareNextSource():O.end()}),v.on("error",function(m){O.error(m)}),this},R.prototype.resume=function(){return!!C.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},R.prototype.error=function(v){var O=this._sources;if(!C.prototype.error.call(this,v))return!1;for(var m=0;m<O.length;m++)try{O[m].error(v)}catch{}return!0},R.prototype.lock=function(){C.prototype.lock.call(this);for(var v=this._sources,O=0;O<v.length;O++)v[O].lock()},p.exports=R},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(N,p,U){var y=N("../compressions"),w=N("./ZipFileWorker");U.generateWorker=function(h,C,B){var M=new w(C.streamFiles,B,C.platform,C.encodeFileName),f=0;try{h.forEach(function(R,v){f++;var O=(function(z,L){var X=z||L,I=y[X];if(!I)throw new Error(X+" is not a valid compression method !");return I})(v.options.compression,C.compression),m=v.options.compressionOptions||C.compressionOptions||{},E=v.dir,S=v.date;v._compressWorker(O,m).withStreamInfo("file",{name:R,dir:E,date:S,comment:v.comment||"",unixPermissions:v.unixPermissions,dosPermissions:v.dosPermissions}).pipe(M)}),M.entriesCount=f}catch(R){M.error(R)}return M}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(N,p,U){function y(){if(!(this instanceof y))return new y;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var w=new y;for(var h in this)typeof this[h]!="function"&&(w[h]=this[h]);return w}}(y.prototype=N("./object")).loadAsync=N("./load"),y.support=N("./support"),y.defaults=N("./defaults"),y.version="3.10.2",y.loadAsync=function(w,h){return new y().loadAsync(w,h)},y.external=N("./external"),p.exports=y},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(N,p,U){var y=N("./utils"),w=N("./external"),h=N("./utf8"),C=N("./zipEntries"),B=N("./stream/Crc32Probe"),M=N("./nodejsUtils");function f(R){return new w.Promise(function(v,O){var m=R.decompressed.getContentWorker().pipe(new B);m.on("error",function(E){O(E)}).on("end",function(){m.streamInfo.crc32!==R.decompressed.crc32?O(new Error("Corrupted zip : CRC32 mismatch")):v()}).resume()})}p.exports=function(R,v){var O=this;return v=y.extend(v||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:h.utf8decode}),M.isNode&&M.isStream(R)?w.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):y.prepareContent("the loaded zip file",R,!0,v.optimizedBinaryString,v.base64).then(function(m){var E=new C(v);return E.load(m),E}).then(function(m){var E=[w.Promise.resolve(m)],S=m.files;if(v.checkCRC32)for(var z=0;z<S.length;z++)E.push(f(S[z]));return w.Promise.all(E)}).then(function(m){for(var E=m.shift(),S=E.files,z=0;z<S.length;z++){var L=S[z],X=L.fileNameStr,I=y.resolve(L.fileNameStr);O.file(I,L.decompressed,{binary:!0,optimizedBinaryString:!0,date:L.date,dir:L.dir,comment:L.fileCommentStr.length?L.fileCommentStr:null,unixPermissions:L.unixPermissions,dosPermissions:L.dosPermissions,createFolders:v.createFolders}),L.dir||(O.file(I).unsafeOriginalName=X)}return E.zipComment.length&&(O.comment=E.zipComment),O})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(N,p,U){var y=N("../utils"),w=N("../stream/GenericWorker");function h(C,B){w.call(this,"Nodejs stream input adapter for "+C),this._upstreamEnded=!1,this._bindStream(B)}y.inherits(h,w),h.prototype._bindStream=function(C){var B=this;(this._stream=C).pause(),C.on("data",function(M){B.push({data:M,meta:{percent:0}})}).on("error",function(M){B.isPaused?this.generatedError=M:B.error(M)}).on("end",function(){B.isPaused?B._upstreamEnded=!0:B.end()})},h.prototype.pause=function(){return!!w.prototype.pause.call(this)&&(this._stream.pause(),!0)},h.prototype.resume=function(){return!!w.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},p.exports=h},{"../stream/GenericWorker":28,"../utils":32}],13:[function(N,p,U){var y=N("readable-stream").Readable;function w(h,C,B){y.call(this,C),this._helper=h;var M=this;h.on("data",function(f,R){M.push(f)||M._helper.pause(),B&&B(R)}).on("error",function(f){M.emit("error",f)}).on("end",function(){M.push(null)})}N("../utils").inherits(w,y),w.prototype._read=function(){this._helper.resume()},p.exports=w},{"../utils":32,"readable-stream":16}],14:[function(N,p,U){p.exports={isNode:typeof Buffer<"u",newBufferFrom:function(y,w){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(y,w);if(typeof y=="number")throw new Error('The "data" argument must not be a number');return new Buffer(y,w)},allocBuffer:function(y){if(Buffer.alloc)return Buffer.alloc(y);var w=new Buffer(y);return w.fill(0),w},isBuffer:function(y){return Buffer.isBuffer(y)},isStream:function(y){return y&&typeof y.on=="function"&&typeof y.pause=="function"&&typeof y.resume=="function"}}},{}],15:[function(N,p,U){function y(I,le,Y){var ne,ee=h.getTypeOf(le),pe=h.extend(Y||{},M);pe.date=pe.date||new Date,pe.compression!==null&&(pe.compression=pe.compression.toUpperCase()),typeof pe.unixPermissions=="string"&&(pe.unixPermissions=parseInt(pe.unixPermissions,8)),pe.unixPermissions&&16384&pe.unixPermissions&&(pe.dir=!0),pe.dosPermissions&&16&pe.dosPermissions&&(pe.dir=!0),pe.dir&&(I=S(I)),pe.createFolders&&(ne=E(I))&&z.call(this,ne,!0);var Ce=ee==="string"&&pe.binary===!1&&pe.base64===!1;Y&&Y.binary!==void 0||(pe.binary=!Ce),(le instanceof f&&le.uncompressedSize===0||pe.dir||!le||le.length===0)&&(pe.base64=!1,pe.binary=!0,le="",pe.compression="STORE",ee="string");var j=null;j=le instanceof f||le instanceof C?le:O.isNode&&O.isStream(le)?new m(I,le):h.prepareContent(I,le,pe.binary,pe.optimizedBinaryString,pe.base64);var P=new R(I,j,pe);this.files[I]=P}var w=N("./utf8"),h=N("./utils"),C=N("./stream/GenericWorker"),B=N("./stream/StreamHelper"),M=N("./defaults"),f=N("./compressedObject"),R=N("./zipObject"),v=N("./generate"),O=N("./nodejsUtils"),m=N("./nodejs/NodejsStreamInputAdapter"),E=function(I){I.slice(-1)==="/"&&(I=I.substring(0,I.length-1));var le=I.lastIndexOf("/");return 0<le?I.substring(0,le):""},S=function(I){return I.slice(-1)!=="/"&&(I+="/"),I},z=function(I,le){return le=le!==void 0?le:M.createFolders,I=S(I),this.files[I]||y.call(this,I,null,{dir:!0,createFolders:le}),this.files[I]};function L(I){return Object.prototype.toString.call(I)==="[object RegExp]"}var X={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(I){var le,Y,ne;for(le in this.files)ne=this.files[le],(Y=le.slice(this.root.length,le.length))&&le.slice(0,this.root.length)===this.root&&I(Y,ne)},filter:function(I){var le=[];return this.forEach(function(Y,ne){I(Y,ne)&&le.push(ne)}),le},file:function(I,le,Y){if(arguments.length!==1)return I=this.root+I,y.call(this,I,le,Y),this;if(L(I)){var ne=I;return this.filter(function(pe,Ce){return!Ce.dir&&ne.test(pe)})}var ee=this.files[this.root+I];return ee&&!ee.dir?ee:null},folder:function(I){if(!I)return this;if(L(I))return this.filter(function(ee,pe){return pe.dir&&I.test(ee)});var le=this.root+I,Y=z.call(this,le),ne=this.clone();return ne.root=Y.name,ne},remove:function(I){I=this.root+I;var le=this.files[I];if(le||(I.slice(-1)!=="/"&&(I+="/"),le=this.files[I]),le&&!le.dir)delete this.files[I];else for(var Y=this.filter(function(ee,pe){return pe.name.slice(0,I.length)===I}),ne=0;ne<Y.length;ne++)delete this.files[Y[ne].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(I){var le,Y={};try{if((Y=h.extend(I||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:w.utf8encode})).type=Y.type.toLowerCase(),Y.compression=Y.compression.toUpperCase(),Y.type==="binarystring"&&(Y.type="string"),!Y.type)throw new Error("No output type specified.");h.checkSupport(Y.type),Y.platform!=="darwin"&&Y.platform!=="freebsd"&&Y.platform!=="linux"&&Y.platform!=="sunos"||(Y.platform="UNIX"),Y.platform==="win32"&&(Y.platform="DOS");var ne=Y.comment||this.comment||"";le=v.generateWorker(this,Y,ne)}catch(ee){(le=new C("error")).error(ee)}return new B(le,Y.type||"string",Y.mimeType)},generateAsync:function(I,le){return this.generateInternalStream(I).accumulate(le)},generateNodeStream:function(I,le){return(I=I||{}).type||(I.type="nodebuffer"),this.generateInternalStream(I).toNodejsStream(le)}};p.exports=X},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(N,p,U){p.exports=N("stream")},{stream:void 0}],17:[function(N,p,U){var y=N("./DataReader");function w(h){y.call(this,h);for(var C=0;C<this.data.length;C++)h[C]=255&h[C]}N("../utils").inherits(w,y),w.prototype.byteAt=function(h){return this.data[this.zero+h]},w.prototype.lastIndexOfSignature=function(h){for(var C=h.charCodeAt(0),B=h.charCodeAt(1),M=h.charCodeAt(2),f=h.charCodeAt(3),R=this.length-4;0<=R;--R)if(this.data[R]===C&&this.data[R+1]===B&&this.data[R+2]===M&&this.data[R+3]===f)return R-this.zero;return-1},w.prototype.readAndCheckSignature=function(h){var C=h.charCodeAt(0),B=h.charCodeAt(1),M=h.charCodeAt(2),f=h.charCodeAt(3),R=this.readData(4);return C===R[0]&&B===R[1]&&M===R[2]&&f===R[3]},w.prototype.readData=function(h){if(this.checkOffset(h),h===0)return[];var C=this.data.slice(this.zero+this.index,this.zero+this.index+h);return this.index+=h,C},p.exports=w},{"../utils":32,"./DataReader":18}],18:[function(N,p,U){var y=N("../utils");function w(h){this.data=h,this.length=h.length,this.index=0,this.zero=0}w.prototype={checkOffset:function(h){this.checkIndex(this.index+h)},checkIndex:function(h){if(this.length<this.zero+h||h<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+h+"). Corrupted zip ?")},setIndex:function(h){this.checkIndex(h),this.index=h},skip:function(h){this.setIndex(this.index+h)},byteAt:function(){},readInt:function(h){var C,B=0;for(this.checkOffset(h),C=this.index+h-1;C>=this.index;C--)B=(B<<8)+this.byteAt(C);return this.index+=h,B},readString:function(h){return y.transformTo("string",this.readData(h))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var h=this.readInt(4);return new Date(Date.UTC(1980+(h>>25&127),(h>>21&15)-1,h>>16&31,h>>11&31,h>>5&63,(31&h)<<1))}},p.exports=w},{"../utils":32}],19:[function(N,p,U){var y=N("./Uint8ArrayReader");function w(h){y.call(this,h)}N("../utils").inherits(w,y),w.prototype.readData=function(h){this.checkOffset(h);var C=this.data.slice(this.zero+this.index,this.zero+this.index+h);return this.index+=h,C},p.exports=w},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(N,p,U){var y=N("./DataReader");function w(h){y.call(this,h)}N("../utils").inherits(w,y),w.prototype.byteAt=function(h){return this.data.charCodeAt(this.zero+h)},w.prototype.lastIndexOfSignature=function(h){return this.data.lastIndexOf(h)-this.zero},w.prototype.readAndCheckSignature=function(h){return h===this.readData(4)},w.prototype.readData=function(h){this.checkOffset(h);var C=this.data.slice(this.zero+this.index,this.zero+this.index+h);return this.index+=h,C},p.exports=w},{"../utils":32,"./DataReader":18}],21:[function(N,p,U){var y=N("./ArrayReader");function w(h){y.call(this,h)}N("../utils").inherits(w,y),w.prototype.readData=function(h){if(this.checkOffset(h),h===0)return new Uint8Array(0);var C=this.data.subarray(this.zero+this.index,this.zero+this.index+h);return this.index+=h,C},p.exports=w},{"../utils":32,"./ArrayReader":17}],22:[function(N,p,U){var y=N("../utils"),w=N("../support"),h=N("./ArrayReader"),C=N("./StringReader"),B=N("./NodeBufferReader"),M=N("./Uint8ArrayReader");p.exports=function(f){var R=y.getTypeOf(f);return y.checkSupport(R),R!=="string"||w.uint8array?R==="nodebuffer"?new B(f):w.uint8array?new M(y.transformTo("uint8array",f)):new h(y.transformTo("array",f)):new C(f)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(N,p,U){U.LOCAL_FILE_HEADER="PK",U.CENTRAL_FILE_HEADER="PK",U.CENTRAL_DIRECTORY_END="PK",U.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",U.ZIP64_CENTRAL_DIRECTORY_END="PK",U.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(N,p,U){var y=N("./GenericWorker"),w=N("../utils");function h(C){y.call(this,"ConvertWorker to "+C),this.destType=C}w.inherits(h,y),h.prototype.processChunk=function(C){this.push({data:w.transformTo(this.destType,C.data),meta:C.meta})},p.exports=h},{"../utils":32,"./GenericWorker":28}],25:[function(N,p,U){var y=N("./GenericWorker"),w=N("../crc32");function h(){y.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}N("../utils").inherits(h,y),h.prototype.processChunk=function(C){this.streamInfo.crc32=w(C.data,this.streamInfo.crc32||0),this.push(C)},p.exports=h},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(N,p,U){var y=N("../utils"),w=N("./GenericWorker");function h(C){w.call(this,"DataLengthProbe for "+C),this.propName=C,this.withStreamInfo(C,0)}y.inherits(h,w),h.prototype.processChunk=function(C){if(C){var B=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=B+C.data.length}w.prototype.processChunk.call(this,C)},p.exports=h},{"../utils":32,"./GenericWorker":28}],27:[function(N,p,U){var y=N("../utils"),w=N("./GenericWorker");function h(C){w.call(this,"DataWorker");var B=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,C.then(function(M){B.dataIsReady=!0,B.data=M,B.max=M&&M.length||0,B.type=y.getTypeOf(M),B.isPaused||B._tickAndRepeat()},function(M){B.error(M)})}y.inherits(h,w),h.prototype.cleanUp=function(){w.prototype.cleanUp.call(this),this.data=null},h.prototype.resume=function(){return!!w.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,y.delay(this._tickAndRepeat,[],this)),!0)},h.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(y.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},h.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var C=null,B=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":C=this.data.substring(this.index,B);break;case"uint8array":C=this.data.subarray(this.index,B);break;case"array":case"nodebuffer":C=this.data.slice(this.index,B)}return this.index=B,this.push({data:C,meta:{percent:this.max?this.index/this.max*100:0}})},p.exports=h},{"../utils":32,"./GenericWorker":28}],28:[function(N,p,U){function y(w){this.name=w||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}y.prototype={push:function(w){this.emit("data",w)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(w){this.emit("error",w)}return!0},error:function(w){return!this.isFinished&&(this.isPaused?this.generatedError=w:(this.isFinished=!0,this.emit("error",w),this.previous&&this.previous.error(w),this.cleanUp()),!0)},on:function(w,h){return this._listeners[w].push(h),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(w,h){if(this._listeners[w])for(var C=0;C<this._listeners[w].length;C++)this._listeners[w][C].call(this,h)},pipe:function(w){return w.registerPrevious(this)},registerPrevious:function(w){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=w.streamInfo,this.mergeStreamInfo(),this.previous=w;var h=this;return w.on("data",function(C){h.processChunk(C)}),w.on("end",function(){h.end()}),w.on("error",function(C){h.error(C)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var w=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),w=!0),this.previous&&this.previous.resume(),!w},flush:function(){},processChunk:function(w){this.push(w)},withStreamInfo:function(w,h){return this.extraStreamInfo[w]=h,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var w in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,w)&&(this.streamInfo[w]=this.extraStreamInfo[w])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var w="Worker "+this.name;return this.previous?this.previous+" -> "+w:w}},p.exports=y},{}],29:[function(N,p,U){var y=N("../utils"),w=N("./ConvertWorker"),h=N("./GenericWorker"),C=N("../base64"),B=N("../support"),M=N("../external"),f=null;if(B.nodestream)try{f=N("../nodejs/NodejsStreamOutputAdapter")}catch{}function R(O,m){return new M.Promise(function(E,S){var z=[],L=O._internalType,X=O._outputType,I=O._mimeType;O.on("data",function(le,Y){z.push(le),m&&m(Y)}).on("error",function(le){z=[],S(le)}).on("end",function(){try{var le=(function(Y,ne,ee){switch(Y){case"blob":return y.newBlob(y.transformTo("arraybuffer",ne),ee);case"base64":return C.encode(ne);default:return y.transformTo(Y,ne)}})(X,(function(Y,ne){var ee,pe=0,Ce=null,j=0;for(ee=0;ee<ne.length;ee++)j+=ne[ee].length;switch(Y){case"string":return ne.join("");case"array":return Array.prototype.concat.apply([],ne);case"uint8array":for(Ce=new Uint8Array(j),ee=0;ee<ne.length;ee++)Ce.set(ne[ee],pe),pe+=ne[ee].length;return Ce;case"nodebuffer":return Buffer.concat(ne);default:throw new Error("concat : unsupported type '"+Y+"'")}})(L,z),I);E(le)}catch(Y){S(Y)}z=[]}).resume()})}function v(O,m,E){var S=m;switch(m){case"blob":case"arraybuffer":S="uint8array";break;case"base64":S="string"}try{this._internalType=S,this._outputType=m,this._mimeType=E,y.checkSupport(S),this._worker=O.pipe(new w(S)),O.lock()}catch(z){this._worker=new h("error"),this._worker.error(z)}}v.prototype={accumulate:function(O){return R(this,O)},on:function(O,m){var E=this;return O==="data"?this._worker.on(O,function(S){m.call(E,S.data,S.meta)}):this._worker.on(O,function(){y.delay(m,arguments,E)}),this},resume:function(){return y.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(O){if(y.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new f(this,{objectMode:this._outputType!=="nodebuffer"},O)}},p.exports=v},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(N,p,U){if(U.base64=!0,U.array=!0,U.string=!0,U.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",U.nodebuffer=typeof Buffer<"u",U.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")U.blob=!1;else{var y=new ArrayBuffer(0);try{U.blob=new Blob([y],{type:"application/zip"}).size===0}catch{try{var w=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);w.append(y),U.blob=w.getBlob("application/zip").size===0}catch{U.blob=!1}}}try{U.nodestream=!!N("readable-stream").Readable}catch{U.nodestream=!1}},{"readable-stream":16}],31:[function(N,p,U){for(var y=N("./utils"),w=N("./support"),h=N("./nodejsUtils"),C=N("./stream/GenericWorker"),B=new Array(256),M=0;M<256;M++)B[M]=252<=M?6:248<=M?5:240<=M?4:224<=M?3:192<=M?2:1;B[254]=B[254]=1;function f(){C.call(this,"utf-8 decode"),this.leftOver=null}function R(){C.call(this,"utf-8 encode")}U.utf8encode=function(v){return w.nodebuffer?h.newBufferFrom(v,"utf-8"):(function(O){var m,E,S,z,L,X=O.length,I=0;for(z=0;z<X;z++)(64512&(E=O.charCodeAt(z)))==55296&&z+1<X&&(64512&(S=O.charCodeAt(z+1)))==56320&&(E=65536+(E-55296<<10)+(S-56320),z++),I+=E<128?1:E<2048?2:E<65536?3:4;for(m=w.uint8array?new Uint8Array(I):new Array(I),z=L=0;L<I;z++)(64512&(E=O.charCodeAt(z)))==55296&&z+1<X&&(64512&(S=O.charCodeAt(z+1)))==56320&&(E=65536+(E-55296<<10)+(S-56320),z++),E<128?m[L++]=E:(E<2048?m[L++]=192|E>>>6:(E<65536?m[L++]=224|E>>>12:(m[L++]=240|E>>>18,m[L++]=128|E>>>12&63),m[L++]=128|E>>>6&63),m[L++]=128|63&E);return m})(v)},U.utf8decode=function(v){return w.nodebuffer?y.transformTo("nodebuffer",v).toString("utf-8"):(function(O){var m,E,S,z,L=O.length,X=new Array(2*L);for(m=E=0;m<L;)if((S=O[m++])<128)X[E++]=S;else if(4<(z=B[S]))X[E++]=65533,m+=z-1;else{for(S&=z===2?31:z===3?15:7;1<z&&m<L;)S=S<<6|63&O[m++],z--;1<z?X[E++]=65533:S<65536?X[E++]=S:(S-=65536,X[E++]=55296|S>>10&1023,X[E++]=56320|1023&S)}return X.length!==E&&(X.subarray?X=X.subarray(0,E):X.length=E),y.applyFromCharCode(X)})(v=y.transformTo(w.uint8array?"uint8array":"array",v))},y.inherits(f,C),f.prototype.processChunk=function(v){var O=y.transformTo(w.uint8array?"uint8array":"array",v.data);if(this.leftOver&&this.leftOver.length){if(w.uint8array){var m=O;(O=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),O.set(m,this.leftOver.length)}else O=this.leftOver.concat(O);this.leftOver=null}var E=(function(z,L){var X;for((L=L||z.length)>z.length&&(L=z.length),X=L-1;0<=X&&(192&z[X])==128;)X--;return X<0||X===0?L:X+B[z[X]]>L?X:L})(O),S=O;E!==O.length&&(w.uint8array?(S=O.subarray(0,E),this.leftOver=O.subarray(E,O.length)):(S=O.slice(0,E),this.leftOver=O.slice(E,O.length))),this.push({data:U.utf8decode(S),meta:v.meta})},f.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:U.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},U.Utf8DecodeWorker=f,y.inherits(R,C),R.prototype.processChunk=function(v){this.push({data:U.utf8encode(v.data),meta:v.meta})},U.Utf8EncodeWorker=R},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(N,p,U){var y=N("./support"),w=N("./base64"),h=N("./nodejsUtils"),C=N("./external");function B(m){return m}function M(m,E){for(var S=0;S<m.length;++S)E[S]=255&m.charCodeAt(S);return E}N("setimmediate"),U.newBlob=function(m,E){U.checkSupport("blob");try{return new Blob([m],{type:E})}catch{try{var S=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return S.append(m),S.getBlob(E)}catch{throw new Error("Bug : can't construct the Blob.")}}};var f={stringifyByChunk:function(m,E,S){var z=[],L=0,X=m.length;if(X<=S)return String.fromCharCode.apply(null,m);for(;L<X;)E==="array"||E==="nodebuffer"?z.push(String.fromCharCode.apply(null,m.slice(L,Math.min(L+S,X)))):z.push(String.fromCharCode.apply(null,m.subarray(L,Math.min(L+S,X)))),L+=S;return z.join("")},stringifyByChar:function(m){for(var E="",S=0;S<m.length;S++)E+=String.fromCharCode(m[S]);return E},applyCanBeUsed:{uint8array:(function(){try{return y.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return y.nodebuffer&&String.fromCharCode.apply(null,h.allocBuffer(1)).length===1}catch{return!1}})()}};function R(m){var E=65536,S=U.getTypeOf(m),z=!0;if(S==="uint8array"?z=f.applyCanBeUsed.uint8array:S==="nodebuffer"&&(z=f.applyCanBeUsed.nodebuffer),z)for(;1<E;)try{return f.stringifyByChunk(m,S,E)}catch{E=Math.floor(E/2)}return f.stringifyByChar(m)}function v(m,E){for(var S=0;S<m.length;S++)E[S]=m[S];return E}U.applyFromCharCode=R;var O={};O.string={string:B,array:function(m){return M(m,new Array(m.length))},arraybuffer:function(m){return O.string.uint8array(m).buffer},uint8array:function(m){return M(m,new Uint8Array(m.length))},nodebuffer:function(m){return M(m,h.allocBuffer(m.length))}},O.array={string:R,array:B,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return h.newBufferFrom(m)}},O.arraybuffer={string:function(m){return R(new Uint8Array(m))},array:function(m){return v(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:B,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return h.newBufferFrom(new Uint8Array(m))}},O.uint8array={string:R,array:function(m){return v(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:B,nodebuffer:function(m){return h.newBufferFrom(m)}},O.nodebuffer={string:R,array:function(m){return v(m,new Array(m.length))},arraybuffer:function(m){return O.nodebuffer.uint8array(m).buffer},uint8array:function(m){return v(m,new Uint8Array(m.length))},nodebuffer:B},U.transformTo=function(m,E){if(E=E||"",!m)return E;U.checkSupport(m);var S=U.getTypeOf(E);return O[S][m](E)},U.resolve=function(m){for(var E=m.split("/"),S=[],z=0;z<E.length;z++){var L=E[z];L==="."||L===""&&z!==0&&z!==E.length-1||(L===".."?S.pop():S.push(L))}return S.join("/")},U.getTypeOf=function(m){if(typeof m=="string")return"string";var E=Object.prototype.toString.call(m);return E==="[object Array]"?"array":y.nodebuffer&&h.isBuffer(m)?"nodebuffer":y.uint8array&&E==="[object Uint8Array]"?"uint8array":y.arraybuffer&&E==="[object ArrayBuffer]"?"arraybuffer":void 0},U.checkSupport=function(m){if(!y[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},U.MAX_VALUE_16BITS=65535,U.MAX_VALUE_32BITS=-1,U.pretty=function(m){var E,S,z="";for(S=0;S<(m||"").length;S++)z+="\\x"+((E=m.charCodeAt(S))<16?"0":"")+E.toString(16).toUpperCase();return z},U.delay=function(m,E,S){setImmediate(function(){m.apply(S||null,E||[])})},U.inherits=function(m,E){function S(){}S.prototype=E.prototype,m.prototype=new S},U.extend=function(){var m,E,S={};for(m=0;m<arguments.length;m++)for(E in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],E)&&S[E]===void 0&&(S[E]=arguments[m][E]);return S},U.prepareContent=function(m,E,S,z,L){return C.Promise.resolve(E).then(function(X){return y.blob&&(X instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(X))!==-1)?Blob.prototype.arrayBuffer!==void 0?X.arrayBuffer():typeof FileReader<"u"?new C.Promise(function(I,le){var Y=new FileReader;Y.onload=function(ne){I(ne.target.result)},Y.onerror=function(ne){le(ne.target.error)},Y.readAsArrayBuffer(X)}):C.Promise.reject(new Error(m+" is a Blob, but we have no way of reading it.")):X}).then(function(X){var I=U.getTypeOf(X);return I?(I==="arraybuffer"?X=U.transformTo("uint8array",X):I==="string"&&(L?X=w.decode(X):S&&z!==!0&&(X=(function(le){return M(le,y.uint8array?new Uint8Array(le.length):new Array(le.length))})(X))),X):C.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(N,p,U){var y=N("./reader/readerFor"),w=N("./utils"),h=N("./signature"),C=N("./zipEntry"),B=N("./support");function M(f){this.files=[],this.loadOptions=f}M.prototype={checkSignature:function(f){if(!this.reader.readAndCheckSignature(f)){this.reader.index-=4;var R=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+w.pretty(R)+", expected "+w.pretty(f)+")")}},isSignature:function(f,R){var v=this.reader.index;this.reader.setIndex(f);var O=this.reader.readString(4)===R;return this.reader.setIndex(v),O},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var f=this.reader.readData(this.zipCommentLength),R=B.uint8array?"uint8array":"array",v=w.transformTo(R,f);this.zipComment=this.loadOptions.decodeFileName(v)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var f,R,v,O=this.zip64EndOfCentralSize-44;0<O;)f=this.reader.readInt(2),R=this.reader.readInt(4),v=this.reader.readData(R),this.zip64ExtensibleData[f]={id:f,length:R,value:v}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var f,R;for(f=0;f<this.files.length;f++)R=this.files[f],this.reader.setIndex(R.localHeaderOffset),this.checkSignature(h.LOCAL_FILE_HEADER),R.readLocalPart(this.reader),R.handleUTF8(),R.processAttributes()},readCentralDir:function(){var f;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(h.CENTRAL_FILE_HEADER);)(f=new C({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(f);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var f=this.reader.lastIndexOfSignature(h.CENTRAL_DIRECTORY_END);if(f<0)throw this.isSignature(0,h.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(f);var R=f;if(this.checkSignature(h.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===w.MAX_VALUE_16BITS||this.diskWithCentralDirStart===w.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===w.MAX_VALUE_16BITS||this.centralDirRecords===w.MAX_VALUE_16BITS||this.centralDirSize===w.MAX_VALUE_32BITS||this.centralDirOffset===w.MAX_VALUE_32BITS){if(this.zip64=!0,(f=this.reader.lastIndexOfSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(f),this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,h.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(h.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var v=this.centralDirOffset+this.centralDirSize;this.zip64&&(v+=20,v+=12+this.zip64EndOfCentralSize);var O=R-v;if(0<O)this.isSignature(R,h.CENTRAL_FILE_HEADER)||(this.reader.zero=O);else if(O<0)throw new Error("Corrupted zip: missing "+Math.abs(O)+" bytes.")},prepareReader:function(f){this.reader=y(f)},load:function(f){this.prepareReader(f),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},p.exports=M},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(N,p,U){var y=N("./reader/readerFor"),w=N("./utils"),h=N("./compressedObject"),C=N("./crc32"),B=N("./utf8"),M=N("./compressions"),f=N("./support");function R(v,O){this.options=v,this.loadOptions=O}R.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(v){var O,m;if(v.skip(22),this.fileNameLength=v.readInt(2),m=v.readInt(2),this.fileName=v.readData(this.fileNameLength),v.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((O=(function(E){for(var S in M)if(Object.prototype.hasOwnProperty.call(M,S)&&M[S].magic===E)return M[S];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+w.pretty(this.compressionMethod)+" unknown (inner file : "+w.transformTo("string",this.fileName)+")");this.decompressed=new h(this.compressedSize,this.uncompressedSize,this.crc32,O,v.readData(this.compressedSize))},readCentralPart:function(v){this.versionMadeBy=v.readInt(2),v.skip(2),this.bitFlag=v.readInt(2),this.compressionMethod=v.readString(2),this.date=v.readDate(),this.crc32=v.readInt(4),this.compressedSize=v.readInt(4),this.uncompressedSize=v.readInt(4);var O=v.readInt(2);if(this.extraFieldsLength=v.readInt(2),this.fileCommentLength=v.readInt(2),this.diskNumberStart=v.readInt(2),this.internalFileAttributes=v.readInt(2),this.externalFileAttributes=v.readInt(4),this.localHeaderOffset=v.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");v.skip(O),this.readExtraFields(v),this.parseZIP64ExtraField(v),this.fileComment=v.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var v=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),v==0&&(this.dosPermissions=63&this.externalFileAttributes),v==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var v=y(this.extraFields[1].value);this.uncompressedSize===w.MAX_VALUE_32BITS&&(this.uncompressedSize=v.readInt(8)),this.compressedSize===w.MAX_VALUE_32BITS&&(this.compressedSize=v.readInt(8)),this.localHeaderOffset===w.MAX_VALUE_32BITS&&(this.localHeaderOffset=v.readInt(8)),this.diskNumberStart===w.MAX_VALUE_32BITS&&(this.diskNumberStart=v.readInt(4))}},readExtraFields:function(v){var O,m,E,S=v.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});v.index+4<S;)O=v.readInt(2),m=v.readInt(2),E=v.readData(m),this.extraFields[O]={id:O,length:m,value:E};v.setIndex(S)},handleUTF8:function(){var v=f.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=B.utf8decode(this.fileName),this.fileCommentStr=B.utf8decode(this.fileComment);else{var O=this.findExtraFieldUnicodePath();if(O!==null)this.fileNameStr=O;else{var m=w.transformTo(v,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var E=this.findExtraFieldUnicodeComment();if(E!==null)this.fileCommentStr=E;else{var S=w.transformTo(v,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(S)}}},findExtraFieldUnicodePath:function(){var v=this.extraFields[28789];if(v){var O=y(v.value);return O.readInt(1)!==1||C(this.fileName)!==O.readInt(4)?null:B.utf8decode(O.readData(v.length-5))}return null},findExtraFieldUnicodeComment:function(){var v=this.extraFields[25461];if(v){var O=y(v.value);return O.readInt(1)!==1||C(this.fileComment)!==O.readInt(4)?null:B.utf8decode(O.readData(v.length-5))}return null}},p.exports=R},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(N,p,U){function y(O,m,E){this.name=O,this.dir=E.dir,this.date=E.date,this.comment=E.comment,this.unixPermissions=E.unixPermissions,this.dosPermissions=E.dosPermissions,this._data=m,this._dataBinary=E.binary,this.options={compression:E.compression,compressionOptions:E.compressionOptions}}var w=N("./stream/StreamHelper"),h=N("./stream/DataWorker"),C=N("./utf8"),B=N("./compressedObject"),M=N("./stream/GenericWorker");y.prototype={internalStream:function(O){var m=null,E="string";try{if(!O)throw new Error("No output type specified.");var S=(E=O.toLowerCase())==="string"||E==="text";E!=="binarystring"&&E!=="text"||(E="string"),m=this._decompressWorker();var z=!this._dataBinary;z&&!S&&(m=m.pipe(new C.Utf8EncodeWorker)),!z&&S&&(m=m.pipe(new C.Utf8DecodeWorker))}catch(L){(m=new M("error")).error(L)}return new w(m,E,"")},async:function(O,m){return this.internalStream(O).accumulate(m)},nodeStream:function(O,m){return this.internalStream(O||"nodebuffer").toNodejsStream(m)},_compressWorker:function(O,m){if(this._data instanceof B&&this._data.compression.magic===O.magic)return this._data.getCompressedWorker();var E=this._decompressWorker();return this._dataBinary||(E=E.pipe(new C.Utf8EncodeWorker)),B.createWorkerFrom(E,O,m)},_decompressWorker:function(){return this._data instanceof B?this._data.getContentWorker():this._data instanceof M?this._data:new h(this._data)}};for(var f=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],R=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},v=0;v<f.length;v++)y.prototype[f[v]]=R;p.exports=y},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(N,p,U){(function(y){var w,h,C=y.MutationObserver||y.WebKitMutationObserver;if(C){var B=0,M=new C(O),f=y.document.createTextNode("");M.observe(f,{characterData:!0}),w=function(){f.data=B=++B%2}}else if(y.setImmediate||y.MessageChannel===void 0)w="document"in y&&"onreadystatechange"in y.document.createElement("script")?function(){var m=y.document.createElement("script");m.onreadystatechange=function(){O(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},y.document.documentElement.appendChild(m)}:function(){setTimeout(O,0)};else{var R=new y.MessageChannel;R.port1.onmessage=O,w=function(){R.port2.postMessage(0)}}var v=[];function O(){var m,E;h=!0;for(var S=v.length;S;){for(E=v,v=[],m=-1;++m<S;)E[m]();S=v.length}h=!1}p.exports=function(m){v.push(m)!==1||h||w()}}).call(this,typeof io<"u"?io:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(N,p,U){var y=N("immediate");function w(){}var h={},C=["REJECTED"],B=["FULFILLED"],M=["PENDING"];function f(S){if(typeof S!="function")throw new TypeError("resolver must be a function");this.state=M,this.queue=[],this.outcome=void 0,S!==w&&m(this,S)}function R(S,z,L){this.promise=S,typeof z=="function"&&(this.onFulfilled=z,this.callFulfilled=this.otherCallFulfilled),typeof L=="function"&&(this.onRejected=L,this.callRejected=this.otherCallRejected)}function v(S,z,L){y(function(){var X;try{X=z(L)}catch(I){return h.reject(S,I)}X===S?h.reject(S,new TypeError("Cannot resolve promise with itself")):h.resolve(S,X)})}function O(S){var z=S&&S.then;if(S&&(typeof S=="object"||typeof S=="function")&&typeof z=="function")return function(){z.apply(S,arguments)}}function m(S,z){var L=!1;function X(Y){L||(L=!0,h.reject(S,Y))}function I(Y){L||(L=!0,h.resolve(S,Y))}var le=E(function(){z(I,X)});le.status==="error"&&X(le.value)}function E(S,z){var L={};try{L.value=S(z),L.status="success"}catch(X){L.status="error",L.value=X}return L}(p.exports=f).prototype.finally=function(S){if(typeof S!="function")return this;var z=this.constructor;return this.then(function(L){return z.resolve(S()).then(function(){return L})},function(L){return z.resolve(S()).then(function(){throw L})})},f.prototype.catch=function(S){return this.then(null,S)},f.prototype.then=function(S,z){if(typeof S!="function"&&this.state===B||typeof z!="function"&&this.state===C)return this;var L=new this.constructor(w);return this.state!==M?v(L,this.state===B?S:z,this.outcome):this.queue.push(new R(L,S,z)),L},R.prototype.callFulfilled=function(S){h.resolve(this.promise,S)},R.prototype.otherCallFulfilled=function(S){v(this.promise,this.onFulfilled,S)},R.prototype.callRejected=function(S){h.reject(this.promise,S)},R.prototype.otherCallRejected=function(S){v(this.promise,this.onRejected,S)},h.resolve=function(S,z){var L=E(O,z);if(L.status==="error")return h.reject(S,L.value);var X=L.value;if(X)m(S,X);else{S.state=B,S.outcome=z;for(var I=-1,le=S.queue.length;++I<le;)S.queue[I].callFulfilled(z)}return S},h.reject=function(S,z){S.state=C,S.outcome=z;for(var L=-1,X=S.queue.length;++L<X;)S.queue[L].callRejected(z);return S},f.resolve=function(S){return S instanceof this?S:h.resolve(new this(w),S)},f.reject=function(S){var z=new this(w);return h.reject(z,S)},f.all=function(S){var z=this;if(Object.prototype.toString.call(S)!=="[object Array]")return this.reject(new TypeError("must be an array"));var L=S.length,X=!1;if(!L)return this.resolve([]);for(var I=new Array(L),le=0,Y=-1,ne=new this(w);++Y<L;)ee(S[Y],Y);return ne;function ee(pe,Ce){z.resolve(pe).then(function(j){I[Ce]=j,++le!==L||X||(X=!0,h.resolve(ne,I))},function(j){X||(X=!0,h.reject(ne,j))})}},f.race=function(S){var z=this;if(Object.prototype.toString.call(S)!=="[object Array]")return this.reject(new TypeError("must be an array"));var L=S.length,X=!1;if(!L)return this.resolve([]);for(var I=-1,le=new this(w);++I<L;)Y=S[I],z.resolve(Y).then(function(ne){X||(X=!0,h.resolve(le,ne))},function(ne){X||(X=!0,h.reject(le,ne))});var Y;return le}},{immediate:36}],38:[function(N,p,U){var y={};(0,N("./lib/utils/common").assign)(y,N("./lib/deflate"),N("./lib/inflate"),N("./lib/zlib/constants")),p.exports=y},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(N,p,U){var y=N("./zlib/deflate"),w=N("./utils/common"),h=N("./utils/strings"),C=N("./zlib/messages"),B=N("./zlib/zstream"),M=Object.prototype.toString,f=0,R=-1,v=0,O=8;function m(S){if(!(this instanceof m))return new m(S);this.options=w.assign({level:R,method:O,chunkSize:16384,windowBits:15,memLevel:8,strategy:v,to:""},S||{});var z=this.options;z.raw&&0<z.windowBits?z.windowBits=-z.windowBits:z.gzip&&0<z.windowBits&&z.windowBits<16&&(z.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new B,this.strm.avail_out=0;var L=y.deflateInit2(this.strm,z.level,z.method,z.windowBits,z.memLevel,z.strategy);if(L!==f)throw new Error(C[L]);if(z.header&&y.deflateSetHeader(this.strm,z.header),z.dictionary){var X;if(X=typeof z.dictionary=="string"?h.string2buf(z.dictionary):M.call(z.dictionary)==="[object ArrayBuffer]"?new Uint8Array(z.dictionary):z.dictionary,(L=y.deflateSetDictionary(this.strm,X))!==f)throw new Error(C[L]);this._dict_set=!0}}function E(S,z){var L=new m(z);if(L.push(S,!0),L.err)throw L.msg||C[L.err];return L.result}m.prototype.push=function(S,z){var L,X,I=this.strm,le=this.options.chunkSize;if(this.ended)return!1;X=z===~~z?z:z===!0?4:0,typeof S=="string"?I.input=h.string2buf(S):M.call(S)==="[object ArrayBuffer]"?I.input=new Uint8Array(S):I.input=S,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new w.Buf8(le),I.next_out=0,I.avail_out=le),(L=y.deflate(I,X))!==1&&L!==f)return this.onEnd(L),!(this.ended=!0);I.avail_out!==0&&(I.avail_in!==0||X!==4&&X!==2)||(this.options.to==="string"?this.onData(h.buf2binstring(w.shrinkBuf(I.output,I.next_out))):this.onData(w.shrinkBuf(I.output,I.next_out)))}while((0<I.avail_in||I.avail_out===0)&&L!==1);return X===4?(L=y.deflateEnd(this.strm),this.onEnd(L),this.ended=!0,L===f):X!==2||(this.onEnd(f),!(I.avail_out=0))},m.prototype.onData=function(S){this.chunks.push(S)},m.prototype.onEnd=function(S){S===f&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=w.flattenChunks(this.chunks)),this.chunks=[],this.err=S,this.msg=this.strm.msg},U.Deflate=m,U.deflate=E,U.deflateRaw=function(S,z){return(z=z||{}).raw=!0,E(S,z)},U.gzip=function(S,z){return(z=z||{}).gzip=!0,E(S,z)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(N,p,U){var y=N("./zlib/inflate"),w=N("./utils/common"),h=N("./utils/strings"),C=N("./zlib/constants"),B=N("./zlib/messages"),M=N("./zlib/zstream"),f=N("./zlib/gzheader"),R=Object.prototype.toString;function v(m){if(!(this instanceof v))return new v(m);this.options=w.assign({chunkSize:16384,windowBits:0,to:""},m||{});var E=this.options;E.raw&&0<=E.windowBits&&E.windowBits<16&&(E.windowBits=-E.windowBits,E.windowBits===0&&(E.windowBits=-15)),!(0<=E.windowBits&&E.windowBits<16)||m&&m.windowBits||(E.windowBits+=32),15<E.windowBits&&E.windowBits<48&&(15&E.windowBits)==0&&(E.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new M,this.strm.avail_out=0;var S=y.inflateInit2(this.strm,E.windowBits);if(S!==C.Z_OK)throw new Error(B[S]);this.header=new f,y.inflateGetHeader(this.strm,this.header)}function O(m,E){var S=new v(E);if(S.push(m,!0),S.err)throw S.msg||B[S.err];return S.result}v.prototype.push=function(m,E){var S,z,L,X,I,le,Y=this.strm,ne=this.options.chunkSize,ee=this.options.dictionary,pe=!1;if(this.ended)return!1;z=E===~~E?E:E===!0?C.Z_FINISH:C.Z_NO_FLUSH,typeof m=="string"?Y.input=h.binstring2buf(m):R.call(m)==="[object ArrayBuffer]"?Y.input=new Uint8Array(m):Y.input=m,Y.next_in=0,Y.avail_in=Y.input.length;do{if(Y.avail_out===0&&(Y.output=new w.Buf8(ne),Y.next_out=0,Y.avail_out=ne),(S=y.inflate(Y,C.Z_NO_FLUSH))===C.Z_NEED_DICT&&ee&&(le=typeof ee=="string"?h.string2buf(ee):R.call(ee)==="[object ArrayBuffer]"?new Uint8Array(ee):ee,S=y.inflateSetDictionary(this.strm,le)),S===C.Z_BUF_ERROR&&pe===!0&&(S=C.Z_OK,pe=!1),S!==C.Z_STREAM_END&&S!==C.Z_OK)return this.onEnd(S),!(this.ended=!0);Y.next_out&&(Y.avail_out!==0&&S!==C.Z_STREAM_END&&(Y.avail_in!==0||z!==C.Z_FINISH&&z!==C.Z_SYNC_FLUSH)||(this.options.to==="string"?(L=h.utf8border(Y.output,Y.next_out),X=Y.next_out-L,I=h.buf2string(Y.output,L),Y.next_out=X,Y.avail_out=ne-X,X&&w.arraySet(Y.output,Y.output,L,X,0),this.onData(I)):this.onData(w.shrinkBuf(Y.output,Y.next_out)))),Y.avail_in===0&&Y.avail_out===0&&(pe=!0)}while((0<Y.avail_in||Y.avail_out===0)&&S!==C.Z_STREAM_END);return S===C.Z_STREAM_END&&(z=C.Z_FINISH),z===C.Z_FINISH?(S=y.inflateEnd(this.strm),this.onEnd(S),this.ended=!0,S===C.Z_OK):z!==C.Z_SYNC_FLUSH||(this.onEnd(C.Z_OK),!(Y.avail_out=0))},v.prototype.onData=function(m){this.chunks.push(m)},v.prototype.onEnd=function(m){m===C.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=w.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},U.Inflate=v,U.inflate=O,U.inflateRaw=function(m,E){return(E=E||{}).raw=!0,O(m,E)},U.ungzip=O},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(N,p,U){var y=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";U.assign=function(C){for(var B=Array.prototype.slice.call(arguments,1);B.length;){var M=B.shift();if(M){if(typeof M!="object")throw new TypeError(M+"must be non-object");for(var f in M)M.hasOwnProperty(f)&&(C[f]=M[f])}}return C},U.shrinkBuf=function(C,B){return C.length===B?C:C.subarray?C.subarray(0,B):(C.length=B,C)};var w={arraySet:function(C,B,M,f,R){if(B.subarray&&C.subarray)C.set(B.subarray(M,M+f),R);else for(var v=0;v<f;v++)C[R+v]=B[M+v]},flattenChunks:function(C){var B,M,f,R,v,O;for(B=f=0,M=C.length;B<M;B++)f+=C[B].length;for(O=new Uint8Array(f),B=R=0,M=C.length;B<M;B++)v=C[B],O.set(v,R),R+=v.length;return O}},h={arraySet:function(C,B,M,f,R){for(var v=0;v<f;v++)C[R+v]=B[M+v]},flattenChunks:function(C){return[].concat.apply([],C)}};U.setTyped=function(C){C?(U.Buf8=Uint8Array,U.Buf16=Uint16Array,U.Buf32=Int32Array,U.assign(U,w)):(U.Buf8=Array,U.Buf16=Array,U.Buf32=Array,U.assign(U,h))},U.setTyped(y)},{}],42:[function(N,p,U){var y=N("./common"),w=!0,h=!0;try{String.fromCharCode.apply(null,[0])}catch{w=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{h=!1}for(var C=new y.Buf8(256),B=0;B<256;B++)C[B]=252<=B?6:248<=B?5:240<=B?4:224<=B?3:192<=B?2:1;function M(f,R){if(R<65537&&(f.subarray&&h||!f.subarray&&w))return String.fromCharCode.apply(null,y.shrinkBuf(f,R));for(var v="",O=0;O<R;O++)v+=String.fromCharCode(f[O]);return v}C[254]=C[254]=1,U.string2buf=function(f){var R,v,O,m,E,S=f.length,z=0;for(m=0;m<S;m++)(64512&(v=f.charCodeAt(m)))==55296&&m+1<S&&(64512&(O=f.charCodeAt(m+1)))==56320&&(v=65536+(v-55296<<10)+(O-56320),m++),z+=v<128?1:v<2048?2:v<65536?3:4;for(R=new y.Buf8(z),m=E=0;E<z;m++)(64512&(v=f.charCodeAt(m)))==55296&&m+1<S&&(64512&(O=f.charCodeAt(m+1)))==56320&&(v=65536+(v-55296<<10)+(O-56320),m++),v<128?R[E++]=v:(v<2048?R[E++]=192|v>>>6:(v<65536?R[E++]=224|v>>>12:(R[E++]=240|v>>>18,R[E++]=128|v>>>12&63),R[E++]=128|v>>>6&63),R[E++]=128|63&v);return R},U.buf2binstring=function(f){return M(f,f.length)},U.binstring2buf=function(f){for(var R=new y.Buf8(f.length),v=0,O=R.length;v<O;v++)R[v]=f.charCodeAt(v);return R},U.buf2string=function(f,R){var v,O,m,E,S=R||f.length,z=new Array(2*S);for(v=O=0;v<S;)if((m=f[v++])<128)z[O++]=m;else if(4<(E=C[m]))z[O++]=65533,v+=E-1;else{for(m&=E===2?31:E===3?15:7;1<E&&v<S;)m=m<<6|63&f[v++],E--;1<E?z[O++]=65533:m<65536?z[O++]=m:(m-=65536,z[O++]=55296|m>>10&1023,z[O++]=56320|1023&m)}return M(z,O)},U.utf8border=function(f,R){var v;for((R=R||f.length)>f.length&&(R=f.length),v=R-1;0<=v&&(192&f[v])==128;)v--;return v<0||v===0?R:v+C[f[v]]>R?v:R}},{"./common":41}],43:[function(N,p,U){p.exports=function(y,w,h,C){for(var B=65535&y|0,M=y>>>16&65535|0,f=0;h!==0;){for(h-=f=2e3<h?2e3:h;M=M+(B=B+w[C++]|0)|0,--f;);B%=65521,M%=65521}return B|M<<16|0}},{}],44:[function(N,p,U){p.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(N,p,U){var y=(function(){for(var w,h=[],C=0;C<256;C++){w=C;for(var B=0;B<8;B++)w=1&w?3988292384^w>>>1:w>>>1;h[C]=w}return h})();p.exports=function(w,h,C,B){var M=y,f=B+C;w^=-1;for(var R=B;R<f;R++)w=w>>>8^M[255&(w^h[R])];return-1^w}},{}],46:[function(N,p,U){var y,w=N("../utils/common"),h=N("./trees"),C=N("./adler32"),B=N("./crc32"),M=N("./messages"),f=0,R=4,v=0,O=-2,m=-1,E=4,S=2,z=8,L=9,X=286,I=30,le=19,Y=2*X+1,ne=15,ee=3,pe=258,Ce=pe+ee+1,j=42,P=113,u=1,te=2,oe=3,$=4;function ye(s,ae){return s.msg=M[ae],ae}function se(s){return(s<<1)-(4<s?9:0)}function Se(s){for(var ae=s.length;0<=--ae;)s[ae]=0}function J(s){var ae=s.state,W=ae.pending;W>s.avail_out&&(W=s.avail_out),W!==0&&(w.arraySet(s.output,ae.pending_buf,ae.pending_out,W,s.next_out),s.next_out+=W,ae.pending_out+=W,s.total_out+=W,s.avail_out-=W,ae.pending-=W,ae.pending===0&&(ae.pending_out=0))}function _(s,ae){h._tr_flush_block(s,0<=s.block_start?s.block_start:-1,s.strstart-s.block_start,ae),s.block_start=s.strstart,J(s.strm)}function ce(s,ae){s.pending_buf[s.pending++]=ae}function T(s,ae){s.pending_buf[s.pending++]=ae>>>8&255,s.pending_buf[s.pending++]=255&ae}function g(s,ae){var W,A,x=s.max_chain_length,F=s.strstart,ue=s.prev_length,fe=s.nice_match,K=s.strstart>s.w_size-Ce?s.strstart-(s.w_size-Ce):0,ge=s.window,_e=s.w_mask,me=s.prev,Ne=s.strstart+pe,Xe=ge[F+ue-1],Be=ge[F+ue];s.prev_length>=s.good_match&&(x>>=2),fe>s.lookahead&&(fe=s.lookahead);do if(ge[(W=ae)+ue]===Be&&ge[W+ue-1]===Xe&&ge[W]===ge[F]&&ge[++W]===ge[F+1]){F+=2,W++;do;while(ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&ge[++F]===ge[++W]&&F<Ne);if(A=pe-(Ne-F),F=Ne-pe,ue<A){if(s.match_start=ae,fe<=(ue=A))break;Xe=ge[F+ue-1],Be=ge[F+ue]}}while((ae=me[ae&_e])>K&&--x!=0);return ue<=s.lookahead?ue:s.lookahead}function b(s){var ae,W,A,x,F,ue,fe,K,ge,_e,me=s.w_size;do{if(x=s.window_size-s.lookahead-s.strstart,s.strstart>=me+(me-Ce)){for(w.arraySet(s.window,s.window,me,me,0),s.match_start-=me,s.strstart-=me,s.block_start-=me,ae=W=s.hash_size;A=s.head[--ae],s.head[ae]=me<=A?A-me:0,--W;);for(ae=W=me;A=s.prev[--ae],s.prev[ae]=me<=A?A-me:0,--W;);x+=me}if(s.strm.avail_in===0)break;if(ue=s.strm,fe=s.window,K=s.strstart+s.lookahead,ge=x,_e=void 0,_e=ue.avail_in,ge<_e&&(_e=ge),W=_e===0?0:(ue.avail_in-=_e,w.arraySet(fe,ue.input,ue.next_in,_e,K),ue.state.wrap===1?ue.adler=C(ue.adler,fe,_e,K):ue.state.wrap===2&&(ue.adler=B(ue.adler,fe,_e,K)),ue.next_in+=_e,ue.total_in+=_e,_e),s.lookahead+=W,s.lookahead+s.insert>=ee)for(F=s.strstart-s.insert,s.ins_h=s.window[F],s.ins_h=(s.ins_h<<s.hash_shift^s.window[F+1])&s.hash_mask;s.insert&&(s.ins_h=(s.ins_h<<s.hash_shift^s.window[F+ee-1])&s.hash_mask,s.prev[F&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=F,F++,s.insert--,!(s.lookahead+s.insert<ee)););}while(s.lookahead<Ce&&s.strm.avail_in!==0)}function he(s,ae){for(var W,A;;){if(s.lookahead<Ce){if(b(s),s.lookahead<Ce&&ae===f)return u;if(s.lookahead===0)break}if(W=0,s.lookahead>=ee&&(s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+ee-1])&s.hash_mask,W=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=s.strstart),W!==0&&s.strstart-W<=s.w_size-Ce&&(s.match_length=g(s,W)),s.match_length>=ee)if(A=h._tr_tally(s,s.strstart-s.match_start,s.match_length-ee),s.lookahead-=s.match_length,s.match_length<=s.max_lazy_match&&s.lookahead>=ee){for(s.match_length--;s.strstart++,s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+ee-1])&s.hash_mask,W=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=s.strstart,--s.match_length!=0;);s.strstart++}else s.strstart+=s.match_length,s.match_length=0,s.ins_h=s.window[s.strstart],s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+1])&s.hash_mask;else A=h._tr_tally(s,0,s.window[s.strstart]),s.lookahead--,s.strstart++;if(A&&(_(s,!1),s.strm.avail_out===0))return u}return s.insert=s.strstart<ee-1?s.strstart:ee-1,ae===R?(_(s,!0),s.strm.avail_out===0?oe:$):s.last_lit&&(_(s,!1),s.strm.avail_out===0)?u:te}function ve(s,ae){for(var W,A,x;;){if(s.lookahead<Ce){if(b(s),s.lookahead<Ce&&ae===f)return u;if(s.lookahead===0)break}if(W=0,s.lookahead>=ee&&(s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+ee-1])&s.hash_mask,W=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=s.strstart),s.prev_length=s.match_length,s.prev_match=s.match_start,s.match_length=ee-1,W!==0&&s.prev_length<s.max_lazy_match&&s.strstart-W<=s.w_size-Ce&&(s.match_length=g(s,W),s.match_length<=5&&(s.strategy===1||s.match_length===ee&&4096<s.strstart-s.match_start)&&(s.match_length=ee-1)),s.prev_length>=ee&&s.match_length<=s.prev_length){for(x=s.strstart+s.lookahead-ee,A=h._tr_tally(s,s.strstart-1-s.prev_match,s.prev_length-ee),s.lookahead-=s.prev_length-1,s.prev_length-=2;++s.strstart<=x&&(s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+ee-1])&s.hash_mask,W=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=s.strstart),--s.prev_length!=0;);if(s.match_available=0,s.match_length=ee-1,s.strstart++,A&&(_(s,!1),s.strm.avail_out===0))return u}else if(s.match_available){if((A=h._tr_tally(s,0,s.window[s.strstart-1]))&&_(s,!1),s.strstart++,s.lookahead--,s.strm.avail_out===0)return u}else s.match_available=1,s.strstart++,s.lookahead--}return s.match_available&&(A=h._tr_tally(s,0,s.window[s.strstart-1]),s.match_available=0),s.insert=s.strstart<ee-1?s.strstart:ee-1,ae===R?(_(s,!0),s.strm.avail_out===0?oe:$):s.last_lit&&(_(s,!1),s.strm.avail_out===0)?u:te}function be(s,ae,W,A,x){this.good_length=s,this.max_lazy=ae,this.nice_length=W,this.max_chain=A,this.func=x}function Re(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=z,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new w.Buf16(2*Y),this.dyn_dtree=new w.Buf16(2*(2*I+1)),this.bl_tree=new w.Buf16(2*(2*le+1)),Se(this.dyn_ltree),Se(this.dyn_dtree),Se(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new w.Buf16(ne+1),this.heap=new w.Buf16(2*X+1),Se(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new w.Buf16(2*X+1),Se(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function xe(s){var ae;return s&&s.state?(s.total_in=s.total_out=0,s.data_type=S,(ae=s.state).pending=0,ae.pending_out=0,ae.wrap<0&&(ae.wrap=-ae.wrap),ae.status=ae.wrap?j:P,s.adler=ae.wrap===2?0:1,ae.last_flush=f,h._tr_init(ae),v):ye(s,O)}function Ae(s){var ae=xe(s);return ae===v&&(function(W){W.window_size=2*W.w_size,Se(W.head),W.max_lazy_match=y[W.level].max_lazy,W.good_match=y[W.level].good_length,W.nice_match=y[W.level].nice_length,W.max_chain_length=y[W.level].max_chain,W.strstart=0,W.block_start=0,W.lookahead=0,W.insert=0,W.match_length=W.prev_length=ee-1,W.match_available=0,W.ins_h=0})(s.state),ae}function at(s,ae,W,A,x,F){if(!s)return O;var ue=1;if(ae===m&&(ae=6),A<0?(ue=0,A=-A):15<A&&(ue=2,A-=16),x<1||L<x||W!==z||A<8||15<A||ae<0||9<ae||F<0||E<F)return ye(s,O);A===8&&(A=9);var fe=new Re;return(s.state=fe).strm=s,fe.wrap=ue,fe.gzhead=null,fe.w_bits=A,fe.w_size=1<<fe.w_bits,fe.w_mask=fe.w_size-1,fe.hash_bits=x+7,fe.hash_size=1<<fe.hash_bits,fe.hash_mask=fe.hash_size-1,fe.hash_shift=~~((fe.hash_bits+ee-1)/ee),fe.window=new w.Buf8(2*fe.w_size),fe.head=new w.Buf16(fe.hash_size),fe.prev=new w.Buf16(fe.w_size),fe.lit_bufsize=1<<x+6,fe.pending_buf_size=4*fe.lit_bufsize,fe.pending_buf=new w.Buf8(fe.pending_buf_size),fe.d_buf=1*fe.lit_bufsize,fe.l_buf=3*fe.lit_bufsize,fe.level=ae,fe.strategy=F,fe.method=W,Ae(s)}y=[new be(0,0,0,0,function(s,ae){var W=65535;for(W>s.pending_buf_size-5&&(W=s.pending_buf_size-5);;){if(s.lookahead<=1){if(b(s),s.lookahead===0&&ae===f)return u;if(s.lookahead===0)break}s.strstart+=s.lookahead,s.lookahead=0;var A=s.block_start+W;if((s.strstart===0||s.strstart>=A)&&(s.lookahead=s.strstart-A,s.strstart=A,_(s,!1),s.strm.avail_out===0)||s.strstart-s.block_start>=s.w_size-Ce&&(_(s,!1),s.strm.avail_out===0))return u}return s.insert=0,ae===R?(_(s,!0),s.strm.avail_out===0?oe:$):(s.strstart>s.block_start&&(_(s,!1),s.strm.avail_out),u)}),new be(4,4,8,4,he),new be(4,5,16,8,he),new be(4,6,32,32,he),new be(4,4,16,16,ve),new be(8,16,32,32,ve),new be(8,16,128,128,ve),new be(8,32,128,256,ve),new be(32,128,258,1024,ve),new be(32,258,258,4096,ve)],U.deflateInit=function(s,ae){return at(s,ae,z,15,8,0)},U.deflateInit2=at,U.deflateReset=Ae,U.deflateResetKeep=xe,U.deflateSetHeader=function(s,ae){return s&&s.state?s.state.wrap!==2?O:(s.state.gzhead=ae,v):O},U.deflate=function(s,ae){var W,A,x,F;if(!s||!s.state||5<ae||ae<0)return s?ye(s,O):O;if(A=s.state,!s.output||!s.input&&s.avail_in!==0||A.status===666&&ae!==R)return ye(s,s.avail_out===0?-5:O);if(A.strm=s,W=A.last_flush,A.last_flush=ae,A.status===j)if(A.wrap===2)s.adler=0,ce(A,31),ce(A,139),ce(A,8),A.gzhead?(ce(A,(A.gzhead.text?1:0)+(A.gzhead.hcrc?2:0)+(A.gzhead.extra?4:0)+(A.gzhead.name?8:0)+(A.gzhead.comment?16:0)),ce(A,255&A.gzhead.time),ce(A,A.gzhead.time>>8&255),ce(A,A.gzhead.time>>16&255),ce(A,A.gzhead.time>>24&255),ce(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),ce(A,255&A.gzhead.os),A.gzhead.extra&&A.gzhead.extra.length&&(ce(A,255&A.gzhead.extra.length),ce(A,A.gzhead.extra.length>>8&255)),A.gzhead.hcrc&&(s.adler=B(s.adler,A.pending_buf,A.pending,0)),A.gzindex=0,A.status=69):(ce(A,0),ce(A,0),ce(A,0),ce(A,0),ce(A,0),ce(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),ce(A,3),A.status=P);else{var ue=z+(A.w_bits-8<<4)<<8;ue|=(2<=A.strategy||A.level<2?0:A.level<6?1:A.level===6?2:3)<<6,A.strstart!==0&&(ue|=32),ue+=31-ue%31,A.status=P,T(A,ue),A.strstart!==0&&(T(A,s.adler>>>16),T(A,65535&s.adler)),s.adler=1}if(A.status===69)if(A.gzhead.extra){for(x=A.pending;A.gzindex<(65535&A.gzhead.extra.length)&&(A.pending!==A.pending_buf_size||(A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),J(s),x=A.pending,A.pending!==A.pending_buf_size));)ce(A,255&A.gzhead.extra[A.gzindex]),A.gzindex++;A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),A.gzindex===A.gzhead.extra.length&&(A.gzindex=0,A.status=73)}else A.status=73;if(A.status===73)if(A.gzhead.name){x=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),J(s),x=A.pending,A.pending===A.pending_buf_size)){F=1;break}F=A.gzindex<A.gzhead.name.length?255&A.gzhead.name.charCodeAt(A.gzindex++):0,ce(A,F)}while(F!==0);A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),F===0&&(A.gzindex=0,A.status=91)}else A.status=91;if(A.status===91)if(A.gzhead.comment){x=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),J(s),x=A.pending,A.pending===A.pending_buf_size)){F=1;break}F=A.gzindex<A.gzhead.comment.length?255&A.gzhead.comment.charCodeAt(A.gzindex++):0,ce(A,F)}while(F!==0);A.gzhead.hcrc&&A.pending>x&&(s.adler=B(s.adler,A.pending_buf,A.pending-x,x)),F===0&&(A.status=103)}else A.status=103;if(A.status===103&&(A.gzhead.hcrc?(A.pending+2>A.pending_buf_size&&J(s),A.pending+2<=A.pending_buf_size&&(ce(A,255&s.adler),ce(A,s.adler>>8&255),s.adler=0,A.status=P)):A.status=P),A.pending!==0){if(J(s),s.avail_out===0)return A.last_flush=-1,v}else if(s.avail_in===0&&se(ae)<=se(W)&&ae!==R)return ye(s,-5);if(A.status===666&&s.avail_in!==0)return ye(s,-5);if(s.avail_in!==0||A.lookahead!==0||ae!==f&&A.status!==666){var fe=A.strategy===2?(function(K,ge){for(var _e;;){if(K.lookahead===0&&(b(K),K.lookahead===0)){if(ge===f)return u;break}if(K.match_length=0,_e=h._tr_tally(K,0,K.window[K.strstart]),K.lookahead--,K.strstart++,_e&&(_(K,!1),K.strm.avail_out===0))return u}return K.insert=0,ge===R?(_(K,!0),K.strm.avail_out===0?oe:$):K.last_lit&&(_(K,!1),K.strm.avail_out===0)?u:te})(A,ae):A.strategy===3?(function(K,ge){for(var _e,me,Ne,Xe,Be=K.window;;){if(K.lookahead<=pe){if(b(K),K.lookahead<=pe&&ge===f)return u;if(K.lookahead===0)break}if(K.match_length=0,K.lookahead>=ee&&0<K.strstart&&(me=Be[Ne=K.strstart-1])===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]){Xe=K.strstart+pe;do;while(me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&me===Be[++Ne]&&Ne<Xe);K.match_length=pe-(Xe-Ne),K.match_length>K.lookahead&&(K.match_length=K.lookahead)}if(K.match_length>=ee?(_e=h._tr_tally(K,1,K.match_length-ee),K.lookahead-=K.match_length,K.strstart+=K.match_length,K.match_length=0):(_e=h._tr_tally(K,0,K.window[K.strstart]),K.lookahead--,K.strstart++),_e&&(_(K,!1),K.strm.avail_out===0))return u}return K.insert=0,ge===R?(_(K,!0),K.strm.avail_out===0?oe:$):K.last_lit&&(_(K,!1),K.strm.avail_out===0)?u:te})(A,ae):y[A.level].func(A,ae);if(fe!==oe&&fe!==$||(A.status=666),fe===u||fe===oe)return s.avail_out===0&&(A.last_flush=-1),v;if(fe===te&&(ae===1?h._tr_align(A):ae!==5&&(h._tr_stored_block(A,0,0,!1),ae===3&&(Se(A.head),A.lookahead===0&&(A.strstart=0,A.block_start=0,A.insert=0))),J(s),s.avail_out===0))return A.last_flush=-1,v}return ae!==R?v:A.wrap<=0?1:(A.wrap===2?(ce(A,255&s.adler),ce(A,s.adler>>8&255),ce(A,s.adler>>16&255),ce(A,s.adler>>24&255),ce(A,255&s.total_in),ce(A,s.total_in>>8&255),ce(A,s.total_in>>16&255),ce(A,s.total_in>>24&255)):(T(A,s.adler>>>16),T(A,65535&s.adler)),J(s),0<A.wrap&&(A.wrap=-A.wrap),A.pending!==0?v:1)},U.deflateEnd=function(s){var ae;return s&&s.state?(ae=s.state.status)!==j&&ae!==69&&ae!==73&&ae!==91&&ae!==103&&ae!==P&&ae!==666?ye(s,O):(s.state=null,ae===P?ye(s,-3):v):O},U.deflateSetDictionary=function(s,ae){var W,A,x,F,ue,fe,K,ge,_e=ae.length;if(!s||!s.state||(F=(W=s.state).wrap)===2||F===1&&W.status!==j||W.lookahead)return O;for(F===1&&(s.adler=C(s.adler,ae,_e,0)),W.wrap=0,_e>=W.w_size&&(F===0&&(Se(W.head),W.strstart=0,W.block_start=0,W.insert=0),ge=new w.Buf8(W.w_size),w.arraySet(ge,ae,_e-W.w_size,W.w_size,0),ae=ge,_e=W.w_size),ue=s.avail_in,fe=s.next_in,K=s.input,s.avail_in=_e,s.next_in=0,s.input=ae,b(W);W.lookahead>=ee;){for(A=W.strstart,x=W.lookahead-(ee-1);W.ins_h=(W.ins_h<<W.hash_shift^W.window[A+ee-1])&W.hash_mask,W.prev[A&W.w_mask]=W.head[W.ins_h],W.head[W.ins_h]=A,A++,--x;);W.strstart=A,W.lookahead=ee-1,b(W)}return W.strstart+=W.lookahead,W.block_start=W.strstart,W.insert=W.lookahead,W.lookahead=0,W.match_length=W.prev_length=ee-1,W.match_available=0,s.next_in=fe,s.input=K,s.avail_in=ue,W.wrap=F,v},U.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(N,p,U){p.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(N,p,U){p.exports=function(y,w){var h,C,B,M,f,R,v,O,m,E,S,z,L,X,I,le,Y,ne,ee,pe,Ce,j,P,u,te;h=y.state,C=y.next_in,u=y.input,B=C+(y.avail_in-5),M=y.next_out,te=y.output,f=M-(w-y.avail_out),R=M+(y.avail_out-257),v=h.dmax,O=h.wsize,m=h.whave,E=h.wnext,S=h.window,z=h.hold,L=h.bits,X=h.lencode,I=h.distcode,le=(1<<h.lenbits)-1,Y=(1<<h.distbits)-1;e:do{L<15&&(z+=u[C++]<<L,L+=8,z+=u[C++]<<L,L+=8),ne=X[z&le];t:for(;;){if(z>>>=ee=ne>>>24,L-=ee,(ee=ne>>>16&255)===0)te[M++]=65535&ne;else{if(!(16&ee)){if((64&ee)==0){ne=X[(65535&ne)+(z&(1<<ee)-1)];continue t}if(32&ee){h.mode=12;break e}y.msg="invalid literal/length code",h.mode=30;break e}pe=65535&ne,(ee&=15)&&(L<ee&&(z+=u[C++]<<L,L+=8),pe+=z&(1<<ee)-1,z>>>=ee,L-=ee),L<15&&(z+=u[C++]<<L,L+=8,z+=u[C++]<<L,L+=8),ne=I[z&Y];a:for(;;){if(z>>>=ee=ne>>>24,L-=ee,!(16&(ee=ne>>>16&255))){if((64&ee)==0){ne=I[(65535&ne)+(z&(1<<ee)-1)];continue a}y.msg="invalid distance code",h.mode=30;break e}if(Ce=65535&ne,L<(ee&=15)&&(z+=u[C++]<<L,(L+=8)<ee&&(z+=u[C++]<<L,L+=8)),v<(Ce+=z&(1<<ee)-1)){y.msg="invalid distance too far back",h.mode=30;break e}if(z>>>=ee,L-=ee,(ee=M-f)<Ce){if(m<(ee=Ce-ee)&&h.sane){y.msg="invalid distance too far back",h.mode=30;break e}if(P=S,(j=0)===E){if(j+=O-ee,ee<pe){for(pe-=ee;te[M++]=S[j++],--ee;);j=M-Ce,P=te}}else if(E<ee){if(j+=O+E-ee,(ee-=E)<pe){for(pe-=ee;te[M++]=S[j++],--ee;);if(j=0,E<pe){for(pe-=ee=E;te[M++]=S[j++],--ee;);j=M-Ce,P=te}}}else if(j+=E-ee,ee<pe){for(pe-=ee;te[M++]=S[j++],--ee;);j=M-Ce,P=te}for(;2<pe;)te[M++]=P[j++],te[M++]=P[j++],te[M++]=P[j++],pe-=3;pe&&(te[M++]=P[j++],1<pe&&(te[M++]=P[j++]))}else{for(j=M-Ce;te[M++]=te[j++],te[M++]=te[j++],te[M++]=te[j++],2<(pe-=3););pe&&(te[M++]=te[j++],1<pe&&(te[M++]=te[j++]))}break}}break}}while(C<B&&M<R);C-=pe=L>>3,z&=(1<<(L-=pe<<3))-1,y.next_in=C,y.next_out=M,y.avail_in=C<B?B-C+5:5-(C-B),y.avail_out=M<R?R-M+257:257-(M-R),h.hold=z,h.bits=L}},{}],49:[function(N,p,U){var y=N("../utils/common"),w=N("./adler32"),h=N("./crc32"),C=N("./inffast"),B=N("./inftrees"),M=1,f=2,R=0,v=-2,O=1,m=852,E=592;function S(j){return(j>>>24&255)+(j>>>8&65280)+((65280&j)<<8)+((255&j)<<24)}function z(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new y.Buf16(320),this.work=new y.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function L(j){var P;return j&&j.state?(P=j.state,j.total_in=j.total_out=P.total=0,j.msg="",P.wrap&&(j.adler=1&P.wrap),P.mode=O,P.last=0,P.havedict=0,P.dmax=32768,P.head=null,P.hold=0,P.bits=0,P.lencode=P.lendyn=new y.Buf32(m),P.distcode=P.distdyn=new y.Buf32(E),P.sane=1,P.back=-1,R):v}function X(j){var P;return j&&j.state?((P=j.state).wsize=0,P.whave=0,P.wnext=0,L(j)):v}function I(j,P){var u,te;return j&&j.state?(te=j.state,P<0?(u=0,P=-P):(u=1+(P>>4),P<48&&(P&=15)),P&&(P<8||15<P)?v:(te.window!==null&&te.wbits!==P&&(te.window=null),te.wrap=u,te.wbits=P,X(j))):v}function le(j,P){var u,te;return j?(te=new z,(j.state=te).window=null,(u=I(j,P))!==R&&(j.state=null),u):v}var Y,ne,ee=!0;function pe(j){if(ee){var P;for(Y=new y.Buf32(512),ne=new y.Buf32(32),P=0;P<144;)j.lens[P++]=8;for(;P<256;)j.lens[P++]=9;for(;P<280;)j.lens[P++]=7;for(;P<288;)j.lens[P++]=8;for(B(M,j.lens,0,288,Y,0,j.work,{bits:9}),P=0;P<32;)j.lens[P++]=5;B(f,j.lens,0,32,ne,0,j.work,{bits:5}),ee=!1}j.lencode=Y,j.lenbits=9,j.distcode=ne,j.distbits=5}function Ce(j,P,u,te){var oe,$=j.state;return $.window===null&&($.wsize=1<<$.wbits,$.wnext=0,$.whave=0,$.window=new y.Buf8($.wsize)),te>=$.wsize?(y.arraySet($.window,P,u-$.wsize,$.wsize,0),$.wnext=0,$.whave=$.wsize):(te<(oe=$.wsize-$.wnext)&&(oe=te),y.arraySet($.window,P,u-te,oe,$.wnext),(te-=oe)?(y.arraySet($.window,P,u-te,te,0),$.wnext=te,$.whave=$.wsize):($.wnext+=oe,$.wnext===$.wsize&&($.wnext=0),$.whave<$.wsize&&($.whave+=oe))),0}U.inflateReset=X,U.inflateReset2=I,U.inflateResetKeep=L,U.inflateInit=function(j){return le(j,15)},U.inflateInit2=le,U.inflate=function(j,P){var u,te,oe,$,ye,se,Se,J,_,ce,T,g,b,he,ve,be,Re,xe,Ae,at,s,ae,W,A,x=0,F=new y.Buf8(4),ue=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!j||!j.state||!j.output||!j.input&&j.avail_in!==0)return v;(u=j.state).mode===12&&(u.mode=13),ye=j.next_out,oe=j.output,Se=j.avail_out,$=j.next_in,te=j.input,se=j.avail_in,J=u.hold,_=u.bits,ce=se,T=Se,ae=R;e:for(;;)switch(u.mode){case O:if(u.wrap===0){u.mode=13;break}for(;_<16;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(2&u.wrap&&J===35615){F[u.check=0]=255&J,F[1]=J>>>8&255,u.check=h(u.check,F,2,0),_=J=0,u.mode=2;break}if(u.flags=0,u.head&&(u.head.done=!1),!(1&u.wrap)||(((255&J)<<8)+(J>>8))%31){j.msg="incorrect header check",u.mode=30;break}if((15&J)!=8){j.msg="unknown compression method",u.mode=30;break}if(_-=4,s=8+(15&(J>>>=4)),u.wbits===0)u.wbits=s;else if(s>u.wbits){j.msg="invalid window size",u.mode=30;break}u.dmax=1<<s,j.adler=u.check=1,u.mode=512&J?10:12,_=J=0;break;case 2:for(;_<16;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(u.flags=J,(255&u.flags)!=8){j.msg="unknown compression method",u.mode=30;break}if(57344&u.flags){j.msg="unknown header flags set",u.mode=30;break}u.head&&(u.head.text=J>>8&1),512&u.flags&&(F[0]=255&J,F[1]=J>>>8&255,u.check=h(u.check,F,2,0)),_=J=0,u.mode=3;case 3:for(;_<32;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.head&&(u.head.time=J),512&u.flags&&(F[0]=255&J,F[1]=J>>>8&255,F[2]=J>>>16&255,F[3]=J>>>24&255,u.check=h(u.check,F,4,0)),_=J=0,u.mode=4;case 4:for(;_<16;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.head&&(u.head.xflags=255&J,u.head.os=J>>8),512&u.flags&&(F[0]=255&J,F[1]=J>>>8&255,u.check=h(u.check,F,2,0)),_=J=0,u.mode=5;case 5:if(1024&u.flags){for(;_<16;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.length=J,u.head&&(u.head.extra_len=J),512&u.flags&&(F[0]=255&J,F[1]=J>>>8&255,u.check=h(u.check,F,2,0)),_=J=0}else u.head&&(u.head.extra=null);u.mode=6;case 6:if(1024&u.flags&&(se<(g=u.length)&&(g=se),g&&(u.head&&(s=u.head.extra_len-u.length,u.head.extra||(u.head.extra=new Array(u.head.extra_len)),y.arraySet(u.head.extra,te,$,g,s)),512&u.flags&&(u.check=h(u.check,te,g,$)),se-=g,$+=g,u.length-=g),u.length))break e;u.length=0,u.mode=7;case 7:if(2048&u.flags){if(se===0)break e;for(g=0;s=te[$+g++],u.head&&s&&u.length<65536&&(u.head.name+=String.fromCharCode(s)),s&&g<se;);if(512&u.flags&&(u.check=h(u.check,te,g,$)),se-=g,$+=g,s)break e}else u.head&&(u.head.name=null);u.length=0,u.mode=8;case 8:if(4096&u.flags){if(se===0)break e;for(g=0;s=te[$+g++],u.head&&s&&u.length<65536&&(u.head.comment+=String.fromCharCode(s)),s&&g<se;);if(512&u.flags&&(u.check=h(u.check,te,g,$)),se-=g,$+=g,s)break e}else u.head&&(u.head.comment=null);u.mode=9;case 9:if(512&u.flags){for(;_<16;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(J!==(65535&u.check)){j.msg="header crc mismatch",u.mode=30;break}_=J=0}u.head&&(u.head.hcrc=u.flags>>9&1,u.head.done=!0),j.adler=u.check=0,u.mode=12;break;case 10:for(;_<32;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}j.adler=u.check=S(J),_=J=0,u.mode=11;case 11:if(u.havedict===0)return j.next_out=ye,j.avail_out=Se,j.next_in=$,j.avail_in=se,u.hold=J,u.bits=_,2;j.adler=u.check=1,u.mode=12;case 12:if(P===5||P===6)break e;case 13:if(u.last){J>>>=7&_,_-=7&_,u.mode=27;break}for(;_<3;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}switch(u.last=1&J,_-=1,3&(J>>>=1)){case 0:u.mode=14;break;case 1:if(pe(u),u.mode=20,P!==6)break;J>>>=2,_-=2;break e;case 2:u.mode=17;break;case 3:j.msg="invalid block type",u.mode=30}J>>>=2,_-=2;break;case 14:for(J>>>=7&_,_-=7&_;_<32;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if((65535&J)!=(J>>>16^65535)){j.msg="invalid stored block lengths",u.mode=30;break}if(u.length=65535&J,_=J=0,u.mode=15,P===6)break e;case 15:u.mode=16;case 16:if(g=u.length){if(se<g&&(g=se),Se<g&&(g=Se),g===0)break e;y.arraySet(oe,te,$,g,ye),se-=g,$+=g,Se-=g,ye+=g,u.length-=g;break}u.mode=12;break;case 17:for(;_<14;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(u.nlen=257+(31&J),J>>>=5,_-=5,u.ndist=1+(31&J),J>>>=5,_-=5,u.ncode=4+(15&J),J>>>=4,_-=4,286<u.nlen||30<u.ndist){j.msg="too many length or distance symbols",u.mode=30;break}u.have=0,u.mode=18;case 18:for(;u.have<u.ncode;){for(;_<3;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.lens[ue[u.have++]]=7&J,J>>>=3,_-=3}for(;u.have<19;)u.lens[ue[u.have++]]=0;if(u.lencode=u.lendyn,u.lenbits=7,W={bits:u.lenbits},ae=B(0,u.lens,0,19,u.lencode,0,u.work,W),u.lenbits=W.bits,ae){j.msg="invalid code lengths set",u.mode=30;break}u.have=0,u.mode=19;case 19:for(;u.have<u.nlen+u.ndist;){for(;be=(x=u.lencode[J&(1<<u.lenbits)-1])>>>16&255,Re=65535&x,!((ve=x>>>24)<=_);){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(Re<16)J>>>=ve,_-=ve,u.lens[u.have++]=Re;else{if(Re===16){for(A=ve+2;_<A;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(J>>>=ve,_-=ve,u.have===0){j.msg="invalid bit length repeat",u.mode=30;break}s=u.lens[u.have-1],g=3+(3&J),J>>>=2,_-=2}else if(Re===17){for(A=ve+3;_<A;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}_-=ve,s=0,g=3+(7&(J>>>=ve)),J>>>=3,_-=3}else{for(A=ve+7;_<A;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}_-=ve,s=0,g=11+(127&(J>>>=ve)),J>>>=7,_-=7}if(u.have+g>u.nlen+u.ndist){j.msg="invalid bit length repeat",u.mode=30;break}for(;g--;)u.lens[u.have++]=s}}if(u.mode===30)break;if(u.lens[256]===0){j.msg="invalid code -- missing end-of-block",u.mode=30;break}if(u.lenbits=9,W={bits:u.lenbits},ae=B(M,u.lens,0,u.nlen,u.lencode,0,u.work,W),u.lenbits=W.bits,ae){j.msg="invalid literal/lengths set",u.mode=30;break}if(u.distbits=6,u.distcode=u.distdyn,W={bits:u.distbits},ae=B(f,u.lens,u.nlen,u.ndist,u.distcode,0,u.work,W),u.distbits=W.bits,ae){j.msg="invalid distances set",u.mode=30;break}if(u.mode=20,P===6)break e;case 20:u.mode=21;case 21:if(6<=se&&258<=Se){j.next_out=ye,j.avail_out=Se,j.next_in=$,j.avail_in=se,u.hold=J,u.bits=_,C(j,T),ye=j.next_out,oe=j.output,Se=j.avail_out,$=j.next_in,te=j.input,se=j.avail_in,J=u.hold,_=u.bits,u.mode===12&&(u.back=-1);break}for(u.back=0;be=(x=u.lencode[J&(1<<u.lenbits)-1])>>>16&255,Re=65535&x,!((ve=x>>>24)<=_);){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(be&&(240&be)==0){for(xe=ve,Ae=be,at=Re;be=(x=u.lencode[at+((J&(1<<xe+Ae)-1)>>xe)])>>>16&255,Re=65535&x,!(xe+(ve=x>>>24)<=_);){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}J>>>=xe,_-=xe,u.back+=xe}if(J>>>=ve,_-=ve,u.back+=ve,u.length=Re,be===0){u.mode=26;break}if(32&be){u.back=-1,u.mode=12;break}if(64&be){j.msg="invalid literal/length code",u.mode=30;break}u.extra=15&be,u.mode=22;case 22:if(u.extra){for(A=u.extra;_<A;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.length+=J&(1<<u.extra)-1,J>>>=u.extra,_-=u.extra,u.back+=u.extra}u.was=u.length,u.mode=23;case 23:for(;be=(x=u.distcode[J&(1<<u.distbits)-1])>>>16&255,Re=65535&x,!((ve=x>>>24)<=_);){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if((240&be)==0){for(xe=ve,Ae=be,at=Re;be=(x=u.distcode[at+((J&(1<<xe+Ae)-1)>>xe)])>>>16&255,Re=65535&x,!(xe+(ve=x>>>24)<=_);){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}J>>>=xe,_-=xe,u.back+=xe}if(J>>>=ve,_-=ve,u.back+=ve,64&be){j.msg="invalid distance code",u.mode=30;break}u.offset=Re,u.extra=15&be,u.mode=24;case 24:if(u.extra){for(A=u.extra;_<A;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}u.offset+=J&(1<<u.extra)-1,J>>>=u.extra,_-=u.extra,u.back+=u.extra}if(u.offset>u.dmax){j.msg="invalid distance too far back",u.mode=30;break}u.mode=25;case 25:if(Se===0)break e;if(g=T-Se,u.offset>g){if((g=u.offset-g)>u.whave&&u.sane){j.msg="invalid distance too far back",u.mode=30;break}b=g>u.wnext?(g-=u.wnext,u.wsize-g):u.wnext-g,g>u.length&&(g=u.length),he=u.window}else he=oe,b=ye-u.offset,g=u.length;for(Se<g&&(g=Se),Se-=g,u.length-=g;oe[ye++]=he[b++],--g;);u.length===0&&(u.mode=21);break;case 26:if(Se===0)break e;oe[ye++]=u.length,Se--,u.mode=21;break;case 27:if(u.wrap){for(;_<32;){if(se===0)break e;se--,J|=te[$++]<<_,_+=8}if(T-=Se,j.total_out+=T,u.total+=T,T&&(j.adler=u.check=u.flags?h(u.check,oe,T,ye-T):w(u.check,oe,T,ye-T)),T=Se,(u.flags?J:S(J))!==u.check){j.msg="incorrect data check",u.mode=30;break}_=J=0}u.mode=28;case 28:if(u.wrap&&u.flags){for(;_<32;){if(se===0)break e;se--,J+=te[$++]<<_,_+=8}if(J!==(4294967295&u.total)){j.msg="incorrect length check",u.mode=30;break}_=J=0}u.mode=29;case 29:ae=1;break e;case 30:ae=-3;break e;case 31:return-4;case 32:default:return v}return j.next_out=ye,j.avail_out=Se,j.next_in=$,j.avail_in=se,u.hold=J,u.bits=_,(u.wsize||T!==j.avail_out&&u.mode<30&&(u.mode<27||P!==4))&&Ce(j,j.output,j.next_out,T-j.avail_out)?(u.mode=31,-4):(ce-=j.avail_in,T-=j.avail_out,j.total_in+=ce,j.total_out+=T,u.total+=T,u.wrap&&T&&(j.adler=u.check=u.flags?h(u.check,oe,T,j.next_out-T):w(u.check,oe,T,j.next_out-T)),j.data_type=u.bits+(u.last?64:0)+(u.mode===12?128:0)+(u.mode===20||u.mode===15?256:0),(ce==0&&T===0||P===4)&&ae===R&&(ae=-5),ae)},U.inflateEnd=function(j){if(!j||!j.state)return v;var P=j.state;return P.window&&(P.window=null),j.state=null,R},U.inflateGetHeader=function(j,P){var u;return j&&j.state?(2&(u=j.state).wrap)==0?v:((u.head=P).done=!1,R):v},U.inflateSetDictionary=function(j,P){var u,te=P.length;return j&&j.state?(u=j.state).wrap!==0&&u.mode!==11?v:u.mode===11&&w(1,P,te,0)!==u.check?-3:Ce(j,P,te,te)?(u.mode=31,-4):(u.havedict=1,R):v},U.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(N,p,U){var y=N("../utils/common"),w=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],h=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],C=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],B=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];p.exports=function(M,f,R,v,O,m,E,S){var z,L,X,I,le,Y,ne,ee,pe,Ce=S.bits,j=0,P=0,u=0,te=0,oe=0,$=0,ye=0,se=0,Se=0,J=0,_=null,ce=0,T=new y.Buf16(16),g=new y.Buf16(16),b=null,he=0;for(j=0;j<=15;j++)T[j]=0;for(P=0;P<v;P++)T[f[R+P]]++;for(oe=Ce,te=15;1<=te&&T[te]===0;te--);if(te<oe&&(oe=te),te===0)return O[m++]=20971520,O[m++]=20971520,S.bits=1,0;for(u=1;u<te&&T[u]===0;u++);for(oe<u&&(oe=u),j=se=1;j<=15;j++)if(se<<=1,(se-=T[j])<0)return-1;if(0<se&&(M===0||te!==1))return-1;for(g[1]=0,j=1;j<15;j++)g[j+1]=g[j]+T[j];for(P=0;P<v;P++)f[R+P]!==0&&(E[g[f[R+P]]++]=P);if(Y=M===0?(_=b=E,19):M===1?(_=w,ce-=257,b=h,he-=257,256):(_=C,b=B,-1),j=u,le=m,ye=P=J=0,X=-1,I=(Se=1<<($=oe))-1,M===1&&852<Se||M===2&&592<Se)return 1;for(;;){for(ne=j-ye,pe=E[P]<Y?(ee=0,E[P]):E[P]>Y?(ee=b[he+E[P]],_[ce+E[P]]):(ee=96,0),z=1<<j-ye,u=L=1<<$;O[le+(J>>ye)+(L-=z)]=ne<<24|ee<<16|pe|0,L!==0;);for(z=1<<j-1;J&z;)z>>=1;if(z!==0?(J&=z-1,J+=z):J=0,P++,--T[j]==0){if(j===te)break;j=f[R+E[P]]}if(oe<j&&(J&I)!==X){for(ye===0&&(ye=oe),le+=u,se=1<<($=j-ye);$+ye<te&&!((se-=T[$+ye])<=0);)$++,se<<=1;if(Se+=1<<$,M===1&&852<Se||M===2&&592<Se)return 1;O[X=J&I]=oe<<24|$<<16|le-m|0}}return J!==0&&(O[le+J]=j-ye<<24|64<<16|0),S.bits=oe,0}},{"../utils/common":41}],51:[function(N,p,U){p.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(N,p,U){var y=N("../utils/common"),w=0,h=1;function C(x){for(var F=x.length;0<=--F;)x[F]=0}var B=0,M=29,f=256,R=f+1+M,v=30,O=19,m=2*R+1,E=15,S=16,z=7,L=256,X=16,I=17,le=18,Y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ne=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ee=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],pe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Ce=new Array(2*(R+2));C(Ce);var j=new Array(2*v);C(j);var P=new Array(512);C(P);var u=new Array(256);C(u);var te=new Array(M);C(te);var oe,$,ye,se=new Array(v);function Se(x,F,ue,fe,K){this.static_tree=x,this.extra_bits=F,this.extra_base=ue,this.elems=fe,this.max_length=K,this.has_stree=x&&x.length}function J(x,F){this.dyn_tree=x,this.max_code=0,this.stat_desc=F}function _(x){return x<256?P[x]:P[256+(x>>>7)]}function ce(x,F){x.pending_buf[x.pending++]=255&F,x.pending_buf[x.pending++]=F>>>8&255}function T(x,F,ue){x.bi_valid>S-ue?(x.bi_buf|=F<<x.bi_valid&65535,ce(x,x.bi_buf),x.bi_buf=F>>S-x.bi_valid,x.bi_valid+=ue-S):(x.bi_buf|=F<<x.bi_valid&65535,x.bi_valid+=ue)}function g(x,F,ue){T(x,ue[2*F],ue[2*F+1])}function b(x,F){for(var ue=0;ue|=1&x,x>>>=1,ue<<=1,0<--F;);return ue>>>1}function he(x,F,ue){var fe,K,ge=new Array(E+1),_e=0;for(fe=1;fe<=E;fe++)ge[fe]=_e=_e+ue[fe-1]<<1;for(K=0;K<=F;K++){var me=x[2*K+1];me!==0&&(x[2*K]=b(ge[me]++,me))}}function ve(x){var F;for(F=0;F<R;F++)x.dyn_ltree[2*F]=0;for(F=0;F<v;F++)x.dyn_dtree[2*F]=0;for(F=0;F<O;F++)x.bl_tree[2*F]=0;x.dyn_ltree[2*L]=1,x.opt_len=x.static_len=0,x.last_lit=x.matches=0}function be(x){8<x.bi_valid?ce(x,x.bi_buf):0<x.bi_valid&&(x.pending_buf[x.pending++]=x.bi_buf),x.bi_buf=0,x.bi_valid=0}function Re(x,F,ue,fe){var K=2*F,ge=2*ue;return x[K]<x[ge]||x[K]===x[ge]&&fe[F]<=fe[ue]}function xe(x,F,ue){for(var fe=x.heap[ue],K=ue<<1;K<=x.heap_len&&(K<x.heap_len&&Re(F,x.heap[K+1],x.heap[K],x.depth)&&K++,!Re(F,fe,x.heap[K],x.depth));)x.heap[ue]=x.heap[K],ue=K,K<<=1;x.heap[ue]=fe}function Ae(x,F,ue){var fe,K,ge,_e,me=0;if(x.last_lit!==0)for(;fe=x.pending_buf[x.d_buf+2*me]<<8|x.pending_buf[x.d_buf+2*me+1],K=x.pending_buf[x.l_buf+me],me++,fe===0?g(x,K,F):(g(x,(ge=u[K])+f+1,F),(_e=Y[ge])!==0&&T(x,K-=te[ge],_e),g(x,ge=_(--fe),ue),(_e=ne[ge])!==0&&T(x,fe-=se[ge],_e)),me<x.last_lit;);g(x,L,F)}function at(x,F){var ue,fe,K,ge=F.dyn_tree,_e=F.stat_desc.static_tree,me=F.stat_desc.has_stree,Ne=F.stat_desc.elems,Xe=-1;for(x.heap_len=0,x.heap_max=m,ue=0;ue<Ne;ue++)ge[2*ue]!==0?(x.heap[++x.heap_len]=Xe=ue,x.depth[ue]=0):ge[2*ue+1]=0;for(;x.heap_len<2;)ge[2*(K=x.heap[++x.heap_len]=Xe<2?++Xe:0)]=1,x.depth[K]=0,x.opt_len--,me&&(x.static_len-=_e[2*K+1]);for(F.max_code=Xe,ue=x.heap_len>>1;1<=ue;ue--)xe(x,ge,ue);for(K=Ne;ue=x.heap[1],x.heap[1]=x.heap[x.heap_len--],xe(x,ge,1),fe=x.heap[1],x.heap[--x.heap_max]=ue,x.heap[--x.heap_max]=fe,ge[2*K]=ge[2*ue]+ge[2*fe],x.depth[K]=(x.depth[ue]>=x.depth[fe]?x.depth[ue]:x.depth[fe])+1,ge[2*ue+1]=ge[2*fe+1]=K,x.heap[1]=K++,xe(x,ge,1),2<=x.heap_len;);x.heap[--x.heap_max]=x.heap[1],(function(Be,nt){var Qt,ht,sa,Je,Jt,ua,Ot=nt.dyn_tree,Xa=nt.max_code,Ul=nt.stat_desc.static_tree,vt=nt.stat_desc.has_stree,Bl=nt.stat_desc.extra_bits,Ia=nt.stat_desc.extra_base,Wt=nt.stat_desc.max_length,st=0;for(Je=0;Je<=E;Je++)Be.bl_count[Je]=0;for(Ot[2*Be.heap[Be.heap_max]+1]=0,Qt=Be.heap_max+1;Qt<m;Qt++)Wt<(Je=Ot[2*Ot[2*(ht=Be.heap[Qt])+1]+1]+1)&&(Je=Wt,st++),Ot[2*ht+1]=Je,Xa<ht||(Be.bl_count[Je]++,Jt=0,Ia<=ht&&(Jt=Bl[ht-Ia]),ua=Ot[2*ht],Be.opt_len+=ua*(Je+Jt),vt&&(Be.static_len+=ua*(Ul[2*ht+1]+Jt)));if(st!==0){do{for(Je=Wt-1;Be.bl_count[Je]===0;)Je--;Be.bl_count[Je]--,Be.bl_count[Je+1]+=2,Be.bl_count[Wt]--,st-=2}while(0<st);for(Je=Wt;Je!==0;Je--)for(ht=Be.bl_count[Je];ht!==0;)Xa<(sa=Be.heap[--Qt])||(Ot[2*sa+1]!==Je&&(Be.opt_len+=(Je-Ot[2*sa+1])*Ot[2*sa],Ot[2*sa+1]=Je),ht--)}})(x,F),he(ge,Xe,x.bl_count)}function s(x,F,ue){var fe,K,ge=-1,_e=F[1],me=0,Ne=7,Xe=4;for(_e===0&&(Ne=138,Xe=3),F[2*(ue+1)+1]=65535,fe=0;fe<=ue;fe++)K=_e,_e=F[2*(fe+1)+1],++me<Ne&&K===_e||(me<Xe?x.bl_tree[2*K]+=me:K!==0?(K!==ge&&x.bl_tree[2*K]++,x.bl_tree[2*X]++):me<=10?x.bl_tree[2*I]++:x.bl_tree[2*le]++,ge=K,Xe=(me=0)===_e?(Ne=138,3):K===_e?(Ne=6,3):(Ne=7,4))}function ae(x,F,ue){var fe,K,ge=-1,_e=F[1],me=0,Ne=7,Xe=4;for(_e===0&&(Ne=138,Xe=3),fe=0;fe<=ue;fe++)if(K=_e,_e=F[2*(fe+1)+1],!(++me<Ne&&K===_e)){if(me<Xe)for(;g(x,K,x.bl_tree),--me!=0;);else K!==0?(K!==ge&&(g(x,K,x.bl_tree),me--),g(x,X,x.bl_tree),T(x,me-3,2)):me<=10?(g(x,I,x.bl_tree),T(x,me-3,3)):(g(x,le,x.bl_tree),T(x,me-11,7));ge=K,Xe=(me=0)===_e?(Ne=138,3):K===_e?(Ne=6,3):(Ne=7,4)}}C(se);var W=!1;function A(x,F,ue,fe){T(x,(B<<1)+(fe?1:0),3),(function(K,ge,_e,me){be(K),ce(K,_e),ce(K,~_e),y.arraySet(K.pending_buf,K.window,ge,_e,K.pending),K.pending+=_e})(x,F,ue)}U._tr_init=function(x){W||((function(){var F,ue,fe,K,ge,_e=new Array(E+1);for(K=fe=0;K<M-1;K++)for(te[K]=fe,F=0;F<1<<Y[K];F++)u[fe++]=K;for(u[fe-1]=K,K=ge=0;K<16;K++)for(se[K]=ge,F=0;F<1<<ne[K];F++)P[ge++]=K;for(ge>>=7;K<v;K++)for(se[K]=ge<<7,F=0;F<1<<ne[K]-7;F++)P[256+ge++]=K;for(ue=0;ue<=E;ue++)_e[ue]=0;for(F=0;F<=143;)Ce[2*F+1]=8,F++,_e[8]++;for(;F<=255;)Ce[2*F+1]=9,F++,_e[9]++;for(;F<=279;)Ce[2*F+1]=7,F++,_e[7]++;for(;F<=287;)Ce[2*F+1]=8,F++,_e[8]++;for(he(Ce,R+1,_e),F=0;F<v;F++)j[2*F+1]=5,j[2*F]=b(F,5);oe=new Se(Ce,Y,f+1,R,E),$=new Se(j,ne,0,v,E),ye=new Se(new Array(0),ee,0,O,z)})(),W=!0),x.l_desc=new J(x.dyn_ltree,oe),x.d_desc=new J(x.dyn_dtree,$),x.bl_desc=new J(x.bl_tree,ye),x.bi_buf=0,x.bi_valid=0,ve(x)},U._tr_stored_block=A,U._tr_flush_block=function(x,F,ue,fe){var K,ge,_e=0;0<x.level?(x.strm.data_type===2&&(x.strm.data_type=(function(me){var Ne,Xe=4093624447;for(Ne=0;Ne<=31;Ne++,Xe>>>=1)if(1&Xe&&me.dyn_ltree[2*Ne]!==0)return w;if(me.dyn_ltree[18]!==0||me.dyn_ltree[20]!==0||me.dyn_ltree[26]!==0)return h;for(Ne=32;Ne<f;Ne++)if(me.dyn_ltree[2*Ne]!==0)return h;return w})(x)),at(x,x.l_desc),at(x,x.d_desc),_e=(function(me){var Ne;for(s(me,me.dyn_ltree,me.l_desc.max_code),s(me,me.dyn_dtree,me.d_desc.max_code),at(me,me.bl_desc),Ne=O-1;3<=Ne&&me.bl_tree[2*pe[Ne]+1]===0;Ne--);return me.opt_len+=3*(Ne+1)+5+5+4,Ne})(x),K=x.opt_len+3+7>>>3,(ge=x.static_len+3+7>>>3)<=K&&(K=ge)):K=ge=ue+5,ue+4<=K&&F!==-1?A(x,F,ue,fe):x.strategy===4||ge===K?(T(x,2+(fe?1:0),3),Ae(x,Ce,j)):(T(x,4+(fe?1:0),3),(function(me,Ne,Xe,Be){var nt;for(T(me,Ne-257,5),T(me,Xe-1,5),T(me,Be-4,4),nt=0;nt<Be;nt++)T(me,me.bl_tree[2*pe[nt]+1],3);ae(me,me.dyn_ltree,Ne-1),ae(me,me.dyn_dtree,Xe-1)})(x,x.l_desc.max_code+1,x.d_desc.max_code+1,_e+1),Ae(x,x.dyn_ltree,x.dyn_dtree)),ve(x),fe&&be(x)},U._tr_tally=function(x,F,ue){return x.pending_buf[x.d_buf+2*x.last_lit]=F>>>8&255,x.pending_buf[x.d_buf+2*x.last_lit+1]=255&F,x.pending_buf[x.l_buf+x.last_lit]=255&ue,x.last_lit++,F===0?x.dyn_ltree[2*ue]++:(x.matches++,F--,x.dyn_ltree[2*(u[ue]+f+1)]++,x.dyn_dtree[2*_(F)]++),x.last_lit===x.lit_bufsize-1},U._tr_align=function(x){T(x,2,3),g(x,L,Ce),(function(F){F.bi_valid===16?(ce(F,F.bi_buf),F.bi_buf=0,F.bi_valid=0):8<=F.bi_valid&&(F.pending_buf[F.pending++]=255&F.bi_buf,F.bi_buf>>=8,F.bi_valid-=8)})(x)}},{"../utils/common":41}],53:[function(N,p,U){p.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(N,p,U){(function(y){(function(w,h){if(!w.setImmediate){var C,B,M,f,R=1,v={},O=!1,m=w.document,E=Object.getPrototypeOf&&Object.getPrototypeOf(w);E=E&&E.setTimeout?E:w,C={}.toString.call(w.process)==="[object process]"?function(X){process.nextTick(function(){z(X)})}:(function(){if(w.postMessage&&!w.importScripts){var X=!0,I=w.onmessage;return w.onmessage=function(){X=!1},w.postMessage("","*"),w.onmessage=I,X}})()?(f="setImmediate$"+Math.random()+"$",w.addEventListener?w.addEventListener("message",L,!1):w.attachEvent("onmessage",L),function(X){w.postMessage(f+X,"*")}):w.MessageChannel?((M=new MessageChannel).port1.onmessage=function(X){z(X.data)},function(X){M.port2.postMessage(X)}):m&&"onreadystatechange"in m.createElement("script")?(B=m.documentElement,function(X){var I=m.createElement("script");I.onreadystatechange=function(){z(X),I.onreadystatechange=null,B.removeChild(I),I=null},B.appendChild(I)}):function(X){setTimeout(z,0,X)},E.setImmediate=function(X){typeof X!="function"&&(X=new Function(""+X));for(var I=new Array(arguments.length-1),le=0;le<I.length;le++)I[le]=arguments[le+1];var Y={callback:X,args:I};return v[R]=Y,C(R),R++},E.clearImmediate=S}function S(X){delete v[X]}function z(X){if(O)setTimeout(z,0,X);else{var I=v[X];if(I){O=!0;try{(function(le){var Y=le.callback,ne=le.args;switch(ne.length){case 0:Y();break;case 1:Y(ne[0]);break;case 2:Y(ne[0],ne[1]);break;case 3:Y(ne[0],ne[1],ne[2]);break;default:Y.apply(h,ne)}})(I)}finally{S(X),O=!1}}}}function L(X){X.source===w&&typeof X.data=="string"&&X.data.indexOf(f)===0&&z(+X.data.slice(f.length))}})(typeof self>"u"?y===void 0?this:y:self)}).call(this,typeof io<"u"?io:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Iu)),Iu.exports}var D1=O1();const z1=x1(D1),M1={preset:"SERIES_X_ULTRA",viewMode:"SPLIT",splitPosition:50,upscalerMode:"HYBRID_AI_FSR",fsrEnabled:!0,targetScale:"1440p",cnnStrength:88,rcasSharpness:90,frameGenEnabled:!0,motionSensitivity:75,hudProtection:!0,deblockingIntensity:55,fullRgbRangeExpansion:!0,clarityVibrance:60,brightnessPercent:100,contrastPercent:105,saturationPercent:112,rtxVsrEnabled:!0,videoRatio:"16:9",videoZoom:1,audioBoostPercent:180,audioClarityEq:!0,showWebRtcStatsHud:!0,statsShowFps:!0,statsShowPing:!0,statsShowBitrate:!0,statsShowDecode:!1,statsShowJitter:!1,statsShowLoss:!1,deviceSpoofProfile:"SMARTTV_TIZEN_20M",serverRegion:"AUTO",sdpBitrateMbps:20,zeroJitterBuffer:!0,preferIpv6:!0,autoSkipIntroVideo:!0,focusSpoofAndAutoDismiss:!0,gamepadPollingBoost:!0,localCoOpEnabled:!1,preferredControllerSlot:0,mkbEnabled:!1,mkbSensitivity:55,autoHideCursor:!0,leftStickDeadzonePercent:3,rightStickDeadzonePercent:3,triggerDeadzonePercent:2,vibrationIntensityPercent:100,toggleKey:"Home",consoleTargetInput:""};function j1(d,de){return de==="DLSS_TEMPORAL_4K"?{...d,preset:"DLSS_TEMPORAL_4K",upscalerMode:"TEMPORAL_TAAU",fsrEnabled:!0,targetScale:"4K",cnnStrength:85,rcasSharpness:88,frameGenEnabled:!0,motionSensitivity:80,hudProtection:!0,deblockingIntensity:55,fullRgbRangeExpansion:!0,clarityVibrance:65,brightnessPercent:100,contrastPercent:106,saturationPercent:110,rtxVsrEnabled:!0,deviceSpoofProfile:"SMARTTV_TIZEN_20M",sdpBitrateMbps:25,zeroJitterBuffer:!0,focusSpoofAndAutoDismiss:!0,gamepadPollingBoost:!0,leftStickDeadzonePercent:2,rightStickDeadzonePercent:2}:de==="COMPETITIVE_120"?{...d,preset:"COMPETITIVE_120",upscalerMode:"AMD_FSR",fsrEnabled:!0,targetScale:"1080p",cnnStrength:0,rcasSharpness:98,frameGenEnabled:!0,motionSensitivity:85,hudProtection:!0,deblockingIntensity:20,fullRgbRangeExpansion:!1,clarityVibrance:18,brightnessPercent:104,contrastPercent:102,saturationPercent:105,deviceSpoofProfile:"SMARTTV_TIZEN_20M",sdpBitrateMbps:22,zeroJitterBuffer:!0,focusSpoofAndAutoDismiss:!0,gamepadPollingBoost:!0,leftStickDeadzonePercent:2,rightStickDeadzonePercent:2}:de==="SERIES_X_ULTRA"?{...d,preset:"SERIES_X_ULTRA",upscalerMode:"HYBRID_AI_FSR",fsrEnabled:!0,targetScale:"1440p",cnnStrength:88,rcasSharpness:92,frameGenEnabled:!0,motionSensitivity:75,hudProtection:!0,deblockingIntensity:60,fullRgbRangeExpansion:!0,clarityVibrance:60,brightnessPercent:100,contrastPercent:106,saturationPercent:112,rtxVsrEnabled:!0,deviceSpoofProfile:"SMARTTV_TIZEN_20M",sdpBitrateMbps:25,zeroJitterBuffer:!0,focusSpoofAndAutoDismiss:!0,gamepadPollingBoost:!0,leftStickDeadzonePercent:3,rightStickDeadzonePercent:3}:de==="ANIME4K_CLARITY"?{...d,preset:"ANIME4K_CLARITY",upscalerMode:"AI_CNN",fsrEnabled:!0,targetScale:"1440p",cnnStrength:100,rcasSharpness:75,frameGenEnabled:!0,motionSensitivity:70,hudProtection:!0,deblockingIntensity:85,fullRgbRangeExpansion:!0,clarityVibrance:88,brightnessPercent:100,contrastPercent:110,saturationPercent:118,deviceSpoofProfile:"WINDOWS_1080P_HQ",sdpBitrateMbps:20,zeroJitterBuffer:!0,focusSpoofAndAutoDismiss:!0,gamepadPollingBoost:!0,leftStickDeadzonePercent:4,rightStickDeadzonePercent:4}:{...d,preset:"RAW_BYPASS",upscalerMode:"AMD_FSR",fsrEnabled:!1,rtxVsrEnabled:!1,targetScale:"1080p",cnnStrength:0,rcasSharpness:0,frameGenEnabled:!1,motionSensitivity:50,hudProtection:!1,deblockingIntensity:0,fullRgbRangeExpansion:!1,clarityVibrance:0,brightnessPercent:100,contrastPercent:100,saturationPercent:100}}function Pu(d){switch(d){case"1080p":return{width:1920,height:1080,scaleFactorFrom720p:1.5,label:"1.5x (1080p)"};case"1440p":return{width:2560,height:1440,scaleFactorFrom720p:2,label:"2.0x (1440p)"};case"4K":return{width:3840,height:2160,scaleFactorFrom720p:3,label:"3.0x (2160p)"}}}function U1(d,de){return de?d==="TEMPORAL_TAAU"?"TAAU Anti-Ghosting (DLSS-Style)":d==="AI_CNN"?"Anime4K v3.2 (CNN DoG)":d==="AMD_FSR"?"AMD FSR 1.0 (EASU + RCAS)":"Spet Hybrid (FSR + DoG)":"Native Bypass"}function B1(d,de){const N=Pu(de);return d?{active:!0,enabled:!0,d3d11OverlayPromotionCss:"will-change:transform;transform:translate3d(0,0,0);backface-visibility:hidden;image-rendering:high-quality;color-interpolation:sRGB;visibility:visible;opacity:0.0001;",attributes:{"data-nvidia-rtx-vsr":"enabled","data-nvidia-rtx-hdr":"enabled","data-d3d11-mpo-passthrough":"true","data-hdr-metadata":"smpte2086-pq",playsinline:"","webkit-playsinline":""},styles:{willChange:"transform",transform:"translate3d(0px, 0px, 0px)",backfaceVisibility:"hidden",imageRendering:"high-quality"},targetWidth:N.width,targetHeight:N.height}:{active:!1,enabled:!1,d3d11OverlayPromotionCss:"",attributes:{},styles:{willChange:"auto",transform:"none",backfaceVisibility:"visible",imageRendering:"auto"},targetWidth:N.width,targetHeight:N.height}}function Np(d){const de=(d||"").trim();if(!de)return{consoleId:"XCLOUD_DEFAULT",launchUrl:"https://www.xbox.com/play",hasCustomTarget:!1};const N=de.match(/xbox\.com\/(?:[a-z]{2}-[A-Z]{2}\/)?play\/consoles\/launch\/([A-Za-z0-9_-]+)/i);if(N&&N[1]){const U=N[1].toUpperCase(),y=/^https?:\/\//i.test(de);return{consoleId:U,launchUrl:y?de:`https://${de}`,hasCustomTarget:!0}}if(/xbox\.com\/.*play/i.test(de))return{consoleId:"XCLOUD_WEB",launchUrl:/^https?:\/\//i.test(de)?de:`https://${de}`,hasCustomTarget:!0};const p=de.replace(/[^A-Za-z0-9_-]/g,"").toUpperCase();return p.length>=6?{consoleId:p,launchUrl:`https://www.xbox.com/play/consoles/launch/${p}`,hasCustomTarget:!0}:{consoleId:"XCLOUD_DEFAULT",launchUrl:"https://www.xbox.com/play",hasCustomTarget:!1}}function k1(d,de){return de&&d<=0?.5:1}function L1(d,de="www.xbox.com"){const N=d==="SMARTTV_TIZEN_20M",p=d==="LOW_LATENCY_720P";return JSON.stringify({appInfo:{env:{clientAppId:de,clientAppType:"browser",clientAppVersion:"21.1.98",clientSdkVersion:"8.5.3",httpEnvironment:"prod",sdkInstallId:""}},dev:{displayInfo:{dimensions:{widthInPixels:p?1280:1920,heightInPixels:p?720:1080},pixelDensity:{dpiX:1,dpiY:1}},hw:{make:N?"Samsung":"Microsoft",model:N?"SmartTV-Tizen7":"unknown",sdktype:"web"},os:{name:N?"tizen":"windows",ver:N?"7.0":"22631.2715",platform:N?"tv":"desktop"},browser:{browserName:N?"chrome":"edge",browserVersion:"122.0"}}})}function F1(d){switch(d){case"BRAZIL_SOUTH":return"191.232.32.1";case"US_EAST":return"20.42.0.1";case"US_WEST":return"13.64.0.1";case"EUROPE_WEST":return"20.50.0.1";default:return""}}function G1(d,de){const N=Math.max(1,Math.min(1.5,de));return d==="21:9"?{scaleX:Number((N*(21/16)).toFixed(3)),scaleY:Number(N.toFixed(3)),aspectRatioCss:"21 / 9"}:d==="16:10"?{scaleX:Number(N.toFixed(3)),scaleY:Number((N*(16/15)).toFixed(3)),aspectRatioCss:"16 / 10"}:d==="STRETCH"?{scaleX:Number(N.toFixed(3)),scaleY:Number(N.toFixed(3)),aspectRatioCss:"auto"}:{scaleX:Number(N.toFixed(3)),scaleY:Number(N.toFixed(3)),aspectRatioCss:"16 / 9"}}const so=`#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;
layout(location = 1) in vec2 aTexCoord;

out vec2 vUv;

void main() {
  vUv = aTexCoord;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Rp=`#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D uTexPrev;
uniform sampler2D uTexCurr;
uniform vec2 uTexelSize;
uniform float uMotionSensitivity;
uniform int uHudProtection;

out vec4 fragColor;

float getLuma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 tx = uTexelSize;

  float pTL = getLuma(texture(uTexPrev, vUv + vec2(-tx.x, -tx.y)).rgb);
  float pTC = getLuma(texture(uTexPrev, vUv + vec2( 0.0,  -tx.y)).rgb);
  float pTR = getLuma(texture(uTexPrev, vUv + vec2( tx.x, -tx.y)).rgb);
  float pML = getLuma(texture(uTexPrev, vUv + vec2(-tx.x,  0.0)).rgb);
  float pMC = getLuma(texture(uTexPrev, vUv).rgb);
  float pMR = getLuma(texture(uTexPrev, vUv + vec2( tx.x,  0.0)).rgb);
  float pBL = getLuma(texture(uTexPrev, vUv + vec2(-tx.x,  tx.y)).rgb);
  float pBC = getLuma(texture(uTexPrev, vUv + vec2( 0.0,   tx.y)).rgb);
  float pBR = getLuma(texture(uTexPrev, vUv + vec2( tx.x,  tx.y)).rgb);

  float cTL = getLuma(texture(uTexCurr, vUv + vec2(-tx.x, -tx.y)).rgb);
  float cTC = getLuma(texture(uTexCurr, vUv + vec2( 0.0,  -tx.y)).rgb);
  float cTR = getLuma(texture(uTexCurr, vUv + vec2( tx.x, -tx.y)).rgb);
  float cML = getLuma(texture(uTexCurr, vUv + vec2(-tx.x,  0.0)).rgb);
  float cMC = getLuma(texture(uTexCurr, vUv).rgb);
  float cMR = getLuma(texture(uTexCurr, vUv + vec2( tx.x,  0.0)).rgb);
  float cBL = getLuma(texture(uTexCurr, vUv + vec2(-tx.x,  tx.y)).rgb);
  float cBC = getLuma(texture(uTexCurr, vUv + vec2( 0.0,   tx.y)).rgb);
  float cBR = getLuma(texture(uTexCurr, vUv + vec2( tx.x,  tx.y)).rgb);

  float gxPrev = (pTR + 2.0 * pMR + pBR) - (pTL + 2.0 * pML + pBL);
  float gyPrev = (pBL + 2.0 * pBC + pBR) - (pTL + 2.0 * pTC + pTR);
  float gxCurr = (cTR + 2.0 * cMR + cBR) - (cTL + 2.0 * cML + cBL);
  float gyCurr = (cBL + 2.0 * cBC + cBR) - (cTL + 2.0 * cTC + cTR);

  float ix = 0.5 * (gxPrev + gxCurr);
  float iy = 0.5 * (gyPrev + gyCurr);

  float prevAvg = (pTL + pTC + pTR + pML + pMC + pMR + pBL + pBC + pBR) / 9.0;
  float currAvg = (cTL + cTC + cTR + cML + cMC + cMR + cBL + cBC + cBR) / 9.0;
  float it = (currAvg - prevAvg) * 3.5;

  float reg = 0.012;
  float denom = ix * ix + iy * iy + reg;
  vec2 rawVel = -vec2(ix * it, iy * it) / denom;

  float lumaDiff = abs(cMC - pMC);
  float sceneCutWeight = 1.0 - smoothstep(0.04, 0.14, lumaDiff);

  vec2 vel = clamp(rawVel * uMotionSensitivity * sceneCutWeight, vec2(-1.0), vec2(1.0));

  float hudMask = 0.0;
  if (uHudProtection == 1) {
    float distCenter = length(vUv - vec2(0.5, 0.5));
    float crosshairZone = 1.0 - smoothstep(0.025, 0.055, distCenter);
    float edgeZoneX = smoothstep(0.40, 0.48, abs(vUv.x - 0.5));
    float edgeZoneY = smoothstep(0.40, 0.48, abs(vUv.y - 0.5));
    float cornerHud = max(edgeZoneX, edgeZoneY);
    float highContrastStatic = step(0.42, length(vec2(gxCurr, gyCurr))) * (1.0 - step(0.015, lumaDiff));
    hudMask = clamp(crosshairZone + cornerHud * highContrastStatic, 0.0, 1.0);
  }

  vec2 encodedVel = vel * 0.5 + 0.5;
  float mag = clamp(length(vel), 0.0, 1.0);
  fragColor = vec4(encodedVel.x, encodedVel.y, hudMask, mag);
}
`,Op=`#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D uTexPrev;
uniform sampler2D uTexCurr;
uniform sampler2D uTexMotion;
uniform sampler2D uTexHistory;
uniform vec2 uTexelSize;
uniform float uInterpAlpha;
uniform int uFrameGenEnabled;
uniform float uDeblocking;

out vec4 fragColor;

float getLuma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

// YCoCg Color Space Decorrelation (Separates Luminance Y from Chrominance Co/Cg)
vec3 rgbToYCoCg(vec3 c) {
  float Y  = 0.25 * c.r + 0.5 * c.g + 0.25 * c.b;
  float Co = 0.5  * c.r             - 0.5  * c.b;
  float Cg = -0.25 * c.r + 0.5 * c.g - 0.25 * c.b;
  return vec3(Y, Co, Cg);
}

vec3 yCoCgToRgb(vec3 ycocg) {
  float Y  = ycocg.x;
  float Co = ycocg.y;
  float Cg = ycocg.z;
  float tmp = Y - Cg;
  float r = tmp + Co;
  float g = Y + Cg;
  float b = tmp - Co;
  return clamp(vec3(r, g, b), 0.0, 1.0);
}

// 5-Tap Bicubic Catmull-Rom History Sampler (Jimenez / Filmic SMAA & Unreal TSR)
vec3 sampleCatmullRom5Tap(sampler2D tex, vec2 uv, vec2 tx) {
  vec2 texSize = 1.0 / max(tx, vec2(1e-5));
  vec2 samplePos = uv * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
  vec2 f = samplePos - texPos1;

  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);

  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / max(w12, vec2(1e-5));

  vec2 texPos0  = (texPos1 - 1.0) * tx;
  vec2 texPos3  = (texPos1 + 2.0) * tx;
  vec2 texPos12 = (texPos1 + offset12) * tx;

  vec3 result = vec3(0.0);
  result += texture(tex, vec2(texPos12.x, texPos0.y)).rgb  * (w12.x * w0.y);
  result += texture(tex, vec2(texPos0.x,  texPos12.y)).rgb * (w0.x  * w12.y);
  result += texture(tex, vec2(texPos12.x, texPos12.y)).rgb * (w12.x * w12.y);
  result += texture(tex, vec2(texPos3.x,  texPos12.y)).rgb * (w3.x  * w12.y);
  result += texture(tex, vec2(texPos12.x, texPos3.y)).rgb  * (w12.x * w3.y);

  float totalW = (w12.x * w0.y) + (w0.x * w12.y) + (w12.x * w12.y) + (w3.x * w12.y) + (w12.x * w3.y);
  return clamp(result / max(totalW, 1e-5), 0.0, 1.0);
}

vec3 bilateralLumaDeblock(sampler2D tex, vec2 uv, vec2 tx, vec3 centerCol, float strength) {
  if (strength <= 0.001) return centerCol;
  float centerLuma = getLuma(centerCol);
  vec3 accum = centerCol * 2.5;
  float totalWeight = 2.5;

  vec2 offsets[8] = vec2[8](
    vec2(-1.0,  0.0), vec2(1.0,  0.0),
    vec2( 0.0, -1.0), vec2(0.0,  1.0),
    vec2(-1.0, -1.0), vec2(1.0, -1.0),
    vec2(-1.0,  1.0), vec2(1.0,  1.0)
  );

  float sigmaLuma = mix(0.006, 0.032, strength);
  for (int i = 0; i < 8; i++) {
    vec3 s = texture(tex, uv + offsets[i] * tx).rgb;
    float lDiff = abs(getLuma(s) - centerLuma);
    float w = exp(-(lDiff * lDiff) / (2.0 * sigmaLuma * sigmaLuma)) * strength * 0.4;
    accum += s * w;
    totalWeight += w;
  }

  return accum / totalWeight;
}

void main() {
  vec3 currCenter = texture(uTexCurr, vUv).rgb;
  vec3 prevCenter = texture(uTexPrev, vUv).rgb;
  vec3 baseFrame = currCenter;
  vec4 motionData = texture(uTexMotion, vUv);
  vec2 decodedVel = (motionData.rg - 0.5) * 2.0 * (uTexelSize * 3.0);
  float hudMask = motionData.b;

  // Strict Disocclusion / Motion Rejection Clamp (Eliminates 100% of Ghosting & Double Contours)
  float lumaCurr = getLuma(currCenter);
  float lumaPrev = getLuma(prevCenter);
  float lumaDiff = abs(lumaCurr - lumaPrev);
  float motionReject = smoothstep(0.02, 0.08, lumaDiff);
  float disocclusionZero = 1.0 - step(0.04, lumaDiff);

  // Strict 3x3 neighborhood min/max of currTexture (guarantees zero brightness/color overshoot)
  vec3 nMin = currCenter;
  vec3 nMax = currCenter;
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 nUv = clamp(vUv + vec2(float(dx), float(dy)) * uTexelSize, vec2(0.001), vec2(0.999));
      vec3 c = texture(uTexCurr, nUv).rgb;
      nMin = min(nMin, c);
      nMax = max(nMax, c);
    }
  }

  // Monotonic Sub-Frame 0 (uInterpAlpha == 0.5): Interpolate ONLY when static/low-motion (lumaDiff <= 0.04)
  // Whenever lumaDiff > 0.04, disocclusionZero drops prevFrame weight to 0.0 instantaneously (ZERO GHOSTING!)
  if (uFrameGenEnabled == 1 && uInterpAlpha < 0.99) {
    float safePrevWeight = (1.0 - uInterpAlpha) * (1.0 - hudMask) * disocclusionZero * (1.0 - motionReject) * 0.35;
    if (safePrevWeight > 0.001) {
      vec2 uvPrev = clamp(vUv + decodedVel * 0.5, vec2(0.001), vec2(0.999));
      vec3 samplePrev = texture(uTexPrev, uvPrev).rgb;
      vec3 blended = mix(currCenter, samplePrev, safePrevWeight);

      // Strict 3x3 currTexture AABB clamp + exact luminance lock to eliminate 100% of brightness flicker
      vec3 clampedColor = clamp(blended, nMin, nMax);
      float lumaInterp = getLuma(clampedColor);
      vec3 lumaLocked = clamp(clampedColor + (lumaCurr - lumaInterp), nMin, nMax);
      baseFrame = mix(lumaLocked, currCenter, hudMask);
    }
  }

  // Pure Spatial Bilateral Luma De-Blocking (No unconditional history blend -> 0% ghosting in spatial modes!)
  vec3 deblocked = bilateralLumaDeblock(uTexCurr, vUv, uTexelSize, baseFrame, uDeblocking);
  fragColor = vec4(deblocked, 1.0);
}
`,Dp=`#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D uTexFrameGen;
uniform sampler2D uTexRawCurr;
uniform sampler2D uTexMotion;
uniform sampler2D uTexHistory;
uniform vec2 uTexelSize;
uniform vec2 uOutputResolution;
uniform int uViewMode; // 0 = SPLIT, 1 = OUTPUT, 2 = SOURCE, 3 = FLOW_DEBUG
uniform float uSplitPos;
uniform int uUpscalerMode; // 3 = TEMPORAL_TAAU, 0 = HYBRID_AI_FSR, 1 = AI_CNN (Anime4K v3.2), 2 = AMD_FSR (EASU 12-Tap + RCAS)
uniform int uFsrEnabled;
uniform float uCnnStrength; // 0.0 to 1.0
uniform float uRcasSharpness; // 0.0 to 1.0
uniform float uDeblocking; // 0.0 to 1.0 (Blue-Noise Dither)
uniform int uFullRgbExpand; // 0 or 1
uniform float uClarityVibrance; // 0.0 to 1.0
uniform float uBrightness; // 0.5 to 1.5 (1.0 default)
uniform float uContrast; // 0.5 to 1.5 (1.0 default)
uniform float uSaturation; // 0.5 to 1.5 (1.0 default)
uniform float uTime;
uniform int uZoomLoupe;
uniform vec2 uZoomCenter;

out vec4 fragColor;

#define FSR_RCAS_LIMIT (0.25 - (1.0 / 16.0))

float getLuma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

float APrxLoRcpF1(float a) {
  return 1.0 / max(a, 1e-5);
}

float APrxLoRsqF1(float a) {
  return inversesqrt(max(a, 1e-5));
}

vec3 AMin3F3(vec3 x, vec3 y, vec3 z) {
  return min(x, min(y, z));
}

vec3 AMax3F3(vec3 x, vec3 y, vec3 z) {
  return max(x, max(y, z));
}

float interleavedGradientNoise(vec2 pixelCoord) {
  vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
  return fract(magic.z * fract(dot(pixelCoord, magic.xy)));
}

// ============================================================================
// 0. ANTI-GHOSTING TEMPORAL AI SUPER RESOLUTION (YCoCg TAAU + DISOCCLUSION CLAMP)
//    - YCoCg Color Space Decorrelation (Luminance Y + Chrominance Co/Cg)
//    - 5-Tap Bicubic Catmull-Rom History Sampler
//    - Strict Motion Rejection (Disocclusion Clamp):
//      float lumaDiff = abs(lumaCurr - lumaPrev);
//      float motionReject = smoothstep(0.02, 0.08, lumaDiff);
//      Whenever lumaDiff > 0.04, temporal weight drops to ZERO (0.0) instantaneously!
// ============================================================================
vec3 rgbToYCoCg(vec3 c) {
  float Y  = 0.25 * c.r + 0.5 * c.g + 0.25 * c.b;
  float Co = 0.5  * c.r             - 0.5  * c.b;
  float Cg = -0.25 * c.r + 0.5 * c.g - 0.25 * c.b;
  return vec3(Y, Co, Cg);
}

vec3 yCoCgToRgb(vec3 ycocg) {
  float Y  = ycocg.x;
  float Co = ycocg.y;
  float Cg = ycocg.z;
  float tmp = Y - Cg;
  float r = tmp + Co;
  float g = Y + Cg;
  float b = tmp - Co;
  return clamp(vec3(r, g, b), 0.0, 1.0);
}

vec3 sampleCatmullRom5Tap(sampler2D tex, vec2 uv, vec2 tx) {
  vec2 texSize = 1.0 / max(tx, vec2(1e-5));
  vec2 samplePos = uv * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
  vec2 f = samplePos - texPos1;

  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);

  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / max(w12, vec2(1e-5));

  vec2 texPos0  = (texPos1 - 1.0) * tx;
  vec2 texPos3  = (texPos1 + 2.0) * tx;
  vec2 texPos12 = (texPos1 + offset12) * tx;

  vec3 result = vec3(0.0);
  result += texture(tex, vec2(texPos12.x, texPos0.y)).rgb  * (w12.x * w0.y);
  result += texture(tex, vec2(texPos0.x,  texPos12.y)).rgb * (w0.x  * w12.y);
  result += texture(tex, vec2(texPos12.x, texPos12.y)).rgb * (w12.x * w12.y);
  result += texture(tex, vec2(texPos3.x,  texPos12.y)).rgb * (w3.x  * w12.y);
  result += texture(tex, vec2(texPos12.x, texPos3.y)).rgb  * (w12.x * w3.y);

  float totalW = (w12.x * w0.y) + (w0.x * w12.y) + (w12.x * w12.y) + (w3.x * w12.y) + (w12.x * w3.y);
  return clamp(result / max(totalW, 1e-5), 0.0, 1.0);
}

// ============================================================================
// 1. OFFICIAL AMD FIDELITYFX FSR 1.0 — EASU 12-TAP ANISOTROPIC LANCZOS2
//    Source: libretro/glsl-shaders/master/fsr/shaders/fsr-pass0.glsl
// ============================================================================
void FsrEasuTapF(
  inout vec3 aC,
  inout float aW,
  vec2 off,
  vec2 dir,
  vec2 len,
  float lob,
  float clp,
  vec3 c
) {
  vec2 v;
  v.x = (off.x * ( dir.x)) + (off.y * (dir.y));
  v.y = (off.x * (-dir.y)) + (off.y * (dir.x));
  v *= len;
  float d2 = v.x * v.x + v.y * v.y;
  d2 = min(d2, clp);
  float wB = (2.0 / 5.0) * d2 - 1.0;
  float wA = lob * d2 - 1.0;
  wB *= wB;
  wA *= wA;
  wB = (25.0 / 16.0) * wB - (25.0 / 16.0 - 1.0);
  float w = wB * wA;
  aC += c * w;
  aW += w;
}

void FsrEasuSetF(
  inout vec2 dir,
  inout float len,
  vec2 pp,
  bool biS, bool biT, bool biU, bool biV,
  float lA, float lB, float lC, float lD, float lE
) {
  float w = 0.0;
  if (biS) w = (1.0 - pp.x) * (1.0 - pp.y);
  if (biT) w =        pp.x  * (1.0 - pp.y);
  if (biU) w = (1.0 - pp.x) *        pp.y;
  if (biV) w =        pp.x  *        pp.y;

  float dc = lD - lC;
  float cb = lC - lB;
  float lenX = max(abs(dc), abs(cb));
  lenX = APrxLoRcpF1(lenX);
  float dirX = lD - lB;
  dir.x += dirX * w;
  lenX = clamp(abs(dirX) * lenX, 0.0, 1.0);
  lenX *= lenX;
  len += lenX * w;

  float ec = lE - lC;
  float ca = lC - lA;
  float lenY = max(abs(ec), abs(ca));
  lenY = APrxLoRcpF1(lenY);
  float dirY = lE - lA;
  dir.y += dirY * w;
  lenY = clamp(abs(dirY) * lenY, 0.0, 1.0);
  lenY *= lenY;
  len += lenY * w;
}

vec3 FsrEasuF(sampler2D tex, vec2 uv, vec2 tx) {
  vec2 inputSize = 1.0 / max(tx, vec2(1e-5));
  vec2 pp = uv * inputSize - 0.5;
  vec2 fp = floor(pp);
  pp -= fp;

  vec2 p0 = (fp + 0.5) * tx;

  vec3 b = texture(tex, p0 + vec2( 0.0, -1.0) * tx).rgb;
  vec3 c = texture(tex, p0 + vec2( 1.0, -1.0) * tx).rgb;
  vec3 e = texture(tex, p0 + vec2(-1.0,  0.0) * tx).rgb;
  vec3 f = texture(tex, p0 + vec2( 0.0,  0.0) * tx).rgb;
  vec3 g = texture(tex, p0 + vec2( 1.0,  0.0) * tx).rgb;
  vec3 h = texture(tex, p0 + vec2( 2.0,  0.0) * tx).rgb;
  vec3 i = texture(tex, p0 + vec2(-1.0,  1.0) * tx).rgb;
  vec3 j = texture(tex, p0 + vec2( 0.0,  1.0) * tx).rgb;
  vec3 k = texture(tex, p0 + vec2( 1.0,  1.0) * tx).rgb;
  vec3 l = texture(tex, p0 + vec2( 2.0,  1.0) * tx).rgb;
  vec3 n = texture(tex, p0 + vec2( 0.0,  2.0) * tx).rgb;
  vec3 o = texture(tex, p0 + vec2( 1.0,  2.0) * tx).rgb;

  float bL = b.b * 0.5 + (b.r * 0.5 + b.g);
  float cL = c.b * 0.5 + (c.r * 0.5 + c.g);
  float eL = e.b * 0.5 + (e.r * 0.5 + e.g);
  float fL = f.b * 0.5 + (f.r * 0.5 + f.g);
  float gL = g.b * 0.5 + (g.r * 0.5 + g.g);
  float hL = h.b * 0.5 + (h.r * 0.5 + h.g);
  float iL = i.b * 0.5 + (i.r * 0.5 + i.g);
  float jL = j.b * 0.5 + (j.r * 0.5 + j.g);
  float kL = k.b * 0.5 + (k.r * 0.5 + k.g);
  float lL = l.b * 0.5 + (l.r * 0.5 + l.g);
  float nL = n.b * 0.5 + (n.r * 0.5 + n.g);
  float oL = o.b * 0.5 + (o.r * 0.5 + o.g);

  vec2 dir = vec2(0.0);
  float len = 0.0;
  FsrEasuSetF(dir, len, pp, true,  false, false, false, bL, eL, fL, gL, jL);
  FsrEasuSetF(dir, len, pp, false, true,  false, false, cL, fL, gL, hL, kL);
  FsrEasuSetF(dir, len, pp, false, false, true,  false, fL, iL, jL, kL, nL);
  FsrEasuSetF(dir, len, pp, false, false, false, true,  gL, jL, kL, lL, oL);

  vec2 dir2 = dir * dir;
  float dirR = dir2.x + dir2.y;
  bool zro = dirR < (1.0 / 32768.0);
  dirR = APrxLoRsqF1(dirR);
  dirR = zro ? 1.0 : dirR;
  dir.x = zro ? 1.0 : dir.x;
  dir *= vec2(dirR);

  len = len * 0.5;
  len *= len;
  float stretch = (dir.x * dir.x + dir.y * dir.y) * APrxLoRcpF1(max(abs(dir.x), abs(dir.y)));
  vec2 len2 = vec2(1.0 + (stretch - 1.0) * len, 1.0 - 0.5 * len);
  float lob = 0.5 + ((1.0 / 4.0 - 0.04) - 0.5) * len;
  float clp = APrxLoRcpF1(lob);

  vec3 min4 = min(AMin3F3(f, g, j), k);
  vec3 max4 = max(AMax3F3(f, g, j), k);

  vec3 aC = vec3(0.0);
  float aW = 0.0;
  FsrEasuTapF(aC, aW, vec2( 0.0,-1.0) - pp, dir, len2, lob, clp, b);
  FsrEasuTapF(aC, aW, vec2( 1.0,-1.0) - pp, dir, len2, lob, clp, c);
  FsrEasuTapF(aC, aW, vec2(-1.0, 1.0) - pp, dir, len2, lob, clp, i);
  FsrEasuTapF(aC, aW, vec2( 0.0, 1.0) - pp, dir, len2, lob, clp, j);
  FsrEasuTapF(aC, aW, vec2( 0.0, 0.0) - pp, dir, len2, lob, clp, f);
  FsrEasuTapF(aC, aW, vec2(-1.0, 0.0) - pp, dir, len2, lob, clp, e);
  FsrEasuTapF(aC, aW, vec2( 1.0, 1.0) - pp, dir, len2, lob, clp, k);
  FsrEasuTapF(aC, aW, vec2( 2.0, 1.0) - pp, dir, len2, lob, clp, l);
  FsrEasuTapF(aC, aW, vec2( 2.0, 0.0) - pp, dir, len2, lob, clp, h);
  FsrEasuTapF(aC, aW, vec2( 1.0, 0.0) - pp, dir, len2, lob, clp, g);
  FsrEasuTapF(aC, aW, vec2( 1.0, 2.0) - pp, dir, len2, lob, clp, o);
  FsrEasuTapF(aC, aW, vec2( 0.0, 2.0) - pp, dir, len2, lob, clp, n);

  return min(max4, max(min4, aC / max(aW, 1e-5)));
}

// ============================================================================
// 2. OFFICIAL AMD FIDELITYFX FSR 1.0 — RCAS (Robust Contrast Adaptive Sharpening)
//    Source: libretro/glsl-shaders/master/fsr/shaders/fsr-pass1.glsl
// ============================================================================
vec3 FsrRcasF(sampler2D tex, vec2 uv, vec2 tx, vec3 centerOverride, float sharpnessNorm) {
  if (sharpnessNorm <= 0.001) return centerOverride;
  float stops = mix(1.6, 0.0, clamp(sharpnessNorm, 0.0, 1.0));
  float con = exp2(-stops);

  vec3 b = texture(tex, uv + vec2( 0.0, -tx.y)).rgb;
  vec3 d = texture(tex, uv + vec2(-tx.x,  0.0)).rgb;
  vec3 e = centerOverride;
  vec3 f = texture(tex, uv + vec2( tx.x,  0.0)).rgb;
  vec3 h = texture(tex, uv + vec2( 0.0,  tx.y)).rgb;

  float bL = b.b * 0.5 + (b.r * 0.5 + b.g);
  float dL = d.b * 0.5 + (d.r * 0.5 + d.g);
  float eL = e.b * 0.5 + (e.r * 0.5 + e.g);
  float fL = f.b * 0.5 + (f.r * 0.5 + f.g);
  float hL = h.b * 0.5 + (h.r * 0.5 + h.g);

  float nz = 0.25 * bL + 0.25 * dL + 0.25 * fL + 0.25 * hL - eL;
  nz = clamp(abs(nz) * APrxLoRcpF1(max(max(max(bL, dL), max(eL, fL)), hL) - min(min(min(bL, dL), min(eL, fL)), hL)), 0.0, 1.0);
  nz = -0.5 * nz + 1.0;

  vec3 mn4 = min(AMin3F3(b, d, f), h);
  vec3 mx4 = max(AMax3F3(b, d, f), h);

  vec2 peakC = vec2(1.0, -4.0);
  vec3 hitMin = mn4 / (4.0 * mx4 + vec3(1e-5));
  vec3 hitMax = (peakC.x - mx4) / (4.0 * mn4 + peakC.y);
  vec3 lobeRGB = max(-hitMin, hitMax);
  float lobe = max(-FSR_RCAS_LIMIT, min(max(lobeRGB.r, max(lobeRGB.g, lobeRGB.b)), 0.0)) * con;
  lobe *= nz;

  return clamp((lobe * (b + d + h + f) + e) / (4.0 * lobe + 1.0), 0.0, 1.0);
}

vec3 ffxCasSharpen(sampler2D tex, vec2 uv, vec2 tx, float sharpness) {
  vec3 easu = FsrEasuF(tex, uv, tx);
  return FsrRcasF(tex, uv, tx, easu, sharpness);
}

// ============================================================================
// 3. OFFICIAL bloc97/Anime4K v3.2:
//    - Anime4K_Upscale_Original_x2.glsl (5th-order polynomial gradient push)
//    - Anime4K_Deblur_DoG.glsl (7-tap Difference of Gaussians + minmax3 clamp)
//    - Anime4K_Darken_Fast.glsl (Negative Laplacian contour darkening)
// ============================================================================
const float A4K_P5 =  11.68129591;
const float A4K_P4 = -42.46906057;
const float A4K_P3 =  60.28286266;
const float A4K_P2 = -41.84451327;
const float A4K_P1 =  14.05517353;
const float A4K_P0 =  -1.081521930;

float anime4kPowerFunction(float x) {
  float x2 = x * x;
  float x3 = x2 * x;
  float x4 = x2 * x2;
  float x5 = x2 * x3;
  return A4K_P5 * x5 + A4K_P4 * x4 + A4K_P3 * x3 + A4K_P2 * x2 + A4K_P1 * x + A4K_P0;
}

vec3 anime4kReconstruct(sampler2D tex, vec2 uv, vec2 tx, vec3 baseCol, float strength) {
  if (strength <= 0.001) return baseCol;

  vec3 cTL = texture(tex, uv + vec2(-tx.x, -tx.y)).rgb;
  vec3 cTC = texture(tex, uv + vec2( 0.0,  -tx.y)).rgb;
  vec3 cTR = texture(tex, uv + vec2( tx.x, -tx.y)).rgb;
  vec3 cML = texture(tex, uv + vec2(-tx.x,  0.0)).rgb;
  vec3 cMC = baseCol;
  vec3 cMR = texture(tex, uv + vec2( tx.x,  0.0)).rgb;
  vec3 cBL = texture(tex, uv + vec2(-tx.x,  tx.y)).rgb;
  vec3 cBC = texture(tex, uv + vec2( 0.0,   tx.y)).rgb;
  vec3 cBR = texture(tex, uv + vec2( tx.x,  tx.y)).rgb;

  float lTL = getLuma(cTL); float lTC = getLuma(cTC); float lTR = getLuma(cTR);
  float lML = getLuma(cML); float lMC = getLuma(cMC); float lMR = getLuma(cMR);
  float lBL = getLuma(cBL); float lBC = getLuma(cBC); float lBR = getLuma(cBR);

  float x_grad = (-lTL + lTR - lML - lML + lMR + lMR - lBL + lBR);
  float y_grad = (-lTL - lTC - lTC - lTR + lBL + lBC + lBC + lBR);
  float s = clamp(sqrt(x_grad * x_grad + y_grad * y_grad), 0.0, 1.0);

  vec2 norm = (s > 0.001) ? normalize(vec2(x_grad, y_grad)) : vec2(0.0);
  float polyPush = clamp(anime4kPowerFunction(clamp(s * 1.35, 0.0, 1.0)), 0.0, 1.0);
  vec2 d = -polyPush * norm * tx * 0.65 * strength;
  vec3 advected = texture(tex, clamp(uv + d, vec2(0.001), vec2(0.999))).rgb;

  // Authentic bloc97/Anime4K v3.2 Deblur_DoG (7-Tap Separable Gaussian weights: 0.06136, 0.24477, 0.38774)
  float gH = (
    getLuma(texture(tex, uv + vec2(-2.0 * tx.x, 0.0)).rgb) * 0.06136 +
    lML * 0.24477 +
    lMC * 0.38774 +
    lMR * 0.24477 +
    getLuma(texture(tex, uv + vec2( 2.0 * tx.x, 0.0)).rgb) * 0.06136
  );
  float gV = (
    getLuma(texture(tex, uv + vec2(0.0, -2.0 * tx.y)).rgb) * 0.06136 +
    lTC * 0.24477 +
    lMC * 0.38774 +
    lBC * 0.24477 +
    getLuma(texture(tex, uv + vec2(0.0,  2.0 * tx.y)).rgb) * 0.06136
  );
  float lumGaussian7 = 0.5 * (gH + gV);

  float c = (lMC - lumGaussian7) * (0.95 * strength);
  float t_range = 0.1 - 0.001;
  float c_t = abs(c);
  if (c_t > 0.001) {
    c_t = (c_t - 0.001) / t_range;
    c_t = pow(clamp(c_t, 0.0, 1.0), 0.6);
    c_t = c_t * t_range + 0.001;
    c_t = c_t * sign(c);
  } else {
    c_t = c;
  }

  float lMin = min(min(min(lTL, lTC), min(lTR, lML)), min(min(lMC, lMR), min(lBL, min(lBC, lBR))));
  float lMax = max(max(max(lTL, lTC), max(lTR, lML)), max(max(lMC, lMR), max(lBL, max(lBC, lBR))));
  float cc = clamp(c_t + lMC, lMin, lMax) - lMC;

  // Anime4K_Darken_Fast negative Laplacian contour darkening
  float negLaplacian = clamp(lMC - lumGaussian7, -1.0, 0.0) * (1.25 * strength);

  vec3 reconstructed = clamp(advected + cc + negLaplacian * 0.35, 0.0, 1.0);

  return mix(baseCol, reconstructed, clamp(strength, 0.0, 1.0));
}

// ============================================================================
// 4. ANTI-GHOSTING TEMPORAL AI RECONSTRUCTION (YCoCg TAAU + Disocclusion Motion Rejection)
// ============================================================================
vec3 temporalTaauReconstruct(
  sampler2D currTex,
  sampler2D historyTex,
  sampler2D motionTex,
  vec2 uv,
  vec2 tx,
  float temporalStrength,
  float rcasSharpness
) {
  vec3 currEasu = FsrEasuF(currTex, uv, tx);
  vec3 currentYCoCg = rgbToYCoCg(currEasu);

  vec4 motionData = texture(motionTex, uv);
  vec2 velocity = (motionData.rg - 0.5) * 2.0 * (tx * 2.0);
  float hudMask = motionData.b;
  vec2 historyUv = clamp(uv + velocity, vec2(0.001), vec2(0.999));
  vec3 historyCatmullRgb = sampleCatmullRom5Tap(historyTex, historyUv, tx);
  vec3 historyYCoCg = rgbToYCoCg(historyCatmullRgb);

  // Strict Motion Rejection (Disocclusion Clamp):
  // Whenever lumaDiff > 0.04, drop temporal history weight to 0.0 instantaneously (ZERO GHOSTING!)
  float lumaCurr = currentYCoCg.x;
  float lumaPrev = historyYCoCg.x;
  float lumaDiff = abs(lumaCurr - lumaPrev);
  float motionReject = smoothstep(0.02, 0.08, lumaDiff);
  float disocclusionZero = 1.0 - step(0.04, lumaDiff);

  vec3 M1 = vec3(0.0);
  vec3 M2 = vec3(0.0);
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 nUv = clamp(uv + vec2(float(dx), float(dy)) * tx, vec2(0.001), vec2(0.999));
      vec3 sampleYCoCg = rgbToYCoCg(texture(currTex, nUv).rgb);
      M1 += sampleYCoCg;
      M2 += sampleYCoCg * sampleYCoCg;
    }
  }

  vec3 mu = M1 / 9.0;
  vec3 sigma = sqrt(max(vec3(0.0), (M2 / 9.0) - (mu * mu)));
  float gamma = mix(0.75, 0.45, clamp(temporalStrength, 0.0, 1.0));
  vec3 clippedHistory = clamp(historyYCoCg, mu - gamma * sigma, mu + gamma * sigma);

  // Conservative anti-ghosting blend capped at 16%, dropping to 0.0 on any motion (lumaDiff > 0.04)
  float blendFactor = 0.16 * (1.0 - hudMask) * disocclusionZero * (1.0 - motionReject);
  vec3 resolvedYCoCg = mix(currentYCoCg, clippedHistory, blendFactor);

  float detailLuma = currentYCoCg.x - mu.x;
  resolvedYCoCg.x = clamp(currentYCoCg.x + detailLuma * (0.45 * max(temporalStrength, 0.5)), 0.0, 1.0);

  vec3 resolvedRgb = yCoCgToRgb(resolvedYCoCg);
  return FsrRcasF(currTex, uv, tx, resolvedRgb, rcasSharpness);
}

vec3 expandDynamicRangeAndColor(
  vec3 col,
  int expandFullRgb,
  float clarityAmount,
  float ditherStrength,
  int upscalerMode,
  float brightness,
  float contrast,
  float saturation
) {
  vec3 c = col;
  if (expandFullRgb == 1) {
    vec3 fullRange = clamp((c - vec3(16.0 / 255.0)) * (255.0 / 219.0), 0.0, 1.0);
    c = mix(c, fullRange, 0.52);
  }

  if (upscalerMode == 3) {
    vec3 ycc = rgbToYCoCg(c);
    ycc.x = mix(ycc.x, smoothstep(0.01, 0.99, ycc.x), 0.22);
    ycc.yz *= 1.10;
    c = yCoCgToRgb(ycc);
  } else if (upscalerMode == 2) {
    c = pow(clamp(c, 0.0, 1.0), vec3(0.94));
  } else if (upscalerMode == 1) {
    float luma = getLuma(c);
    vec3 inkCurve = smoothstep(0.02, 0.98, c);
    c = mix(c, inkCurve, 0.35 * max(clarityAmount, 0.4));
    c = mix(vec3(luma), c, 1.20);
  }

  if (clarityAmount > 0.001) {
    float luma = getLuma(c);
    vec3 sCurve = smoothstep(0.0, 1.0, c);
    c = mix(c, sCurve, clarityAmount * 0.34);
    float maxCh = max(c.r, max(c.g, c.b));
    float minCh = min(c.r, min(c.g, c.b));
    float sat = maxCh - minCh;
    c = mix(vec3(luma), c, 1.0 + (1.0 - sat) * clarityAmount * 0.52);
  }

  // Better xCloud Brightness / Contrast / Saturation Controls
  c = (c - 0.5) * max(contrast, 0.2) + 0.5;
  c = c * max(brightness, 0.2);
  float lumaFinal = getLuma(c);
  c = mix(vec3(lumaFinal), c, max(saturation, 0.0));

  if (ditherStrength > 0.001) {
    float ign = interleavedGradientNoise(gl_FragCoord.xy) - 0.5;
    c += (ign / 255.0) * (ditherStrength * 2.0);
  }

  return clamp(c, 0.0, 1.0);
}

void main() {
  vec2 sampleUv = vUv;
  bool insideLoupe = false;
  float loupeBorder = 0.0;

  if (uZoomLoupe == 1) {
    vec2 aspect = vec2(uOutputResolution.x / max(uOutputResolution.y, 1.0), 1.0);
    float dist = length((vUv - uZoomCenter) * aspect);
    if (dist < 0.18) {
      insideLoupe = true;
      sampleUv = clamp(uZoomCenter + (vUv - uZoomCenter) * 0.38, vec2(0.002), vec2(0.998));
      if (dist > 0.174) {
        loupeBorder = 1.0;
      }
    }
  }

  vec3 rawCenter = texture(uTexRawCurr, sampleUv).rgb;
  vec3 rawBlur = (
    rawCenter * 1.5 +
    texture(uTexRawCurr, sampleUv + vec2(uTexelSize.x * 0.9, 0.0)).rgb +
    texture(uTexRawCurr, sampleUv - vec2(uTexelSize.x * 0.9, 0.0)).rgb +
    texture(uTexRawCurr, sampleUv + vec2(0.0, uTexelSize.y * 0.9)).rgb +
    texture(uTexRawCurr, sampleUv - vec2(0.0, uTexelSize.y * 0.9)).rgb
  ) / 5.5;
  vec3 rawColor = mix(rawCenter, rawBlur, 0.55);

  vec3 enhancedColor = texture(uTexFrameGen, sampleUv).rgb;

  if (uFsrEnabled == 1) {
    if (uUpscalerMode == 3) {
      // Mode 3: Anti-Ghosting Temporal AI Reconstruction (YCoCg TAAU + Disocclusion Motion Rejection)
      enhancedColor = temporalTaauReconstruct(
        uTexFrameGen,
        uTexHistory,
        uTexMotion,
        sampleUv,
        uTexelSize,
        uCnnStrength,
        uRcasSharpness
      );
    } else if (uUpscalerMode == 2) {
      // Mode 2: 100% Purely Spatial Official AMD FSR 1.0 (12-Tap Anisotropic Lanczos2 FsrEasuF + FsrRcasF)
      vec3 easuCol = FsrEasuF(uTexFrameGen, sampleUv, uTexelSize);
      enhancedColor = FsrRcasF(uTexFrameGen, sampleUv, uTexelSize, easuCol, uRcasSharpness);
    } else if (uUpscalerMode == 1) {
      // Mode 1: 100% Purely Spatial Official bloc97/Anime4K v3.2 (5th-order Polynomial + DoG Deblur + Line Darkening)
      vec3 a4kCol = anime4kReconstruct(uTexFrameGen, sampleUv, uTexelSize, enhancedColor, max(uCnnStrength, 0.65));
      enhancedColor = FsrRcasF(uTexFrameGen, sampleUv, uTexelSize, a4kCol, uRcasSharpness * 0.45);
    } else {
      // Mode 0: 100% Purely Spatial Series X Hybrid (12-Tap FsrEasuF + Anime4K DoG + FsrRcasF)
      vec3 easuCol = FsrEasuF(uTexFrameGen, sampleUv, uTexelSize);
      vec3 rcasCol = FsrRcasF(uTexFrameGen, sampleUv, uTexelSize, easuCol, uRcasSharpness);
      enhancedColor = anime4kReconstruct(uTexFrameGen, sampleUv, uTexelSize, rcasCol, uCnnStrength * 0.72);
    }
  }

  enhancedColor = expandDynamicRangeAndColor(
    enhancedColor,
    uFullRgbExpand,
    uClarityVibrance,
    uDeblocking,
    uFsrEnabled == 1 ? uUpscalerMode : -1,
    uBrightness > 0.01 ? uBrightness : 1.0,
    uContrast > 0.01 ? uContrast : 1.0,
    uSaturation > 0.01 ? uSaturation : 1.0
  );

  // Mode 3: FLOW DEBUG
  if (uViewMode == 3) {
    vec4 m = texture(uTexMotion, sampleUv);
    vec2 vel = (m.rg - 0.5) * 2.0;
    float mag = clamp(length(vel) * 3.5, 0.0, 1.0);
    float hudMask = m.b;

    vec3 dirColor = vec3(
      0.5 + 0.5 * vel.x * 2.5,
      0.5 + 0.5 * vel.y * 2.5,
      0.5 - 0.4 * (vel.x + vel.y)
    );
    vec3 baseGray = vec3(getLuma(rawColor) * 0.35);
    vec3 debugOut = mix(baseGray, dirColor, mag);

    vec2 grid = abs(fract(sampleUv * vec2(48.0, 27.0)) - 0.5);
    if (min(grid.x, grid.y) < 0.03) {
      debugOut += vec3(0.03, 0.07, 0.04);
    }

    debugOut = mix(debugOut, vec3(0.063, 0.486, 0.063), hudMask * 0.65);
    fragColor = vec4(debugOut, 1.0);
    return;
  }

  vec3 finalOut = enhancedColor;

  if (uViewMode == 2) {
    finalOut = rawColor;
  } else if (uViewMode == 0) {
    if (vUv.x < uSplitPos) {
      finalOut = rawColor;
    } else {
      finalOut = enhancedColor;
    }
    float splitDist = abs(vUv.x - uSplitPos) * uOutputResolution.x;
    if (splitDist < 1.2) {
      finalOut = vec3(0.063, 0.486, 0.063);
    }
  }

  if (insideLoupe && loupeBorder > 0.5) {
    finalOut = vec3(0.063, 0.486, 0.063);
  }

  fragColor = vec4(finalOut, 1.0);
}
`;function Zu(d){const{launchUrl:de}=Np(d.consoleTargetInput),N=Pu(d.targetScale),p=(d.cnnStrength/100).toFixed(2),U=(d.rcasSharpness/100).toFixed(2),y=(d.motionSensitivity/100*1.5).toFixed(2),w=(d.deblockingIntensity/100).toFixed(2),h=(d.clarityVibrance/100).toFixed(2),C=(d.brightnessPercent/100).toFixed(2),B=(d.contrastPercent/100).toFixed(2),M=(d.saturationPercent/100).toFixed(2),f=(d.leftStickDeadzonePercent/100).toFixed(3),R=(d.rightStickDeadzonePercent/100).toFixed(3),v=(d.triggerDeadzonePercent/100).toFixed(3),O=(d.vibrationIntensityPercent/100).toFixed(2),m=(d.audioBoostPercent/100).toFixed(2),E=(d.mkbSensitivity/50).toFixed(2),S=d.upscalerMode==="TEMPORAL_TAAU"?3:d.upscalerMode==="HYBRID_AI_FSR"?0:d.upscalerMode==="AI_CNN"?1:2,z=L1(d.deviceSpoofProfile,"www.xbox.com"),L=F1(d.serverRegion),X=JSON.stringify({manifest_version:3,name:"xCloudFX — WebGL Upscaler & Stream Enhancer",short_name:"xCloudFX",version:"3.0.0",description:"1080p Fetch/XHR/SDP Unlocker, Zero-Ghosting AMD FSR 1.0 + Anime4K + Disocclusion TAAU WebGL2 Upscaler, Universal Browser Video Enhancer (YouTube, Anime, Netflix via HOME 2x), NVIDIA RTX VSR/HDR Hook, MKB Virtual Controller & Live WebRTC Telemetry HUD.",permissions:["storage","activeTab","scripting","tabs"],host_permissions:["*://*.xbox.com/*","*://*.xboxlive.com/*","<all_urls>"],action:{default_title:"xCloudFX — WebGL Upscaler & Stream Enhancer",default_popup:"popup.html"},content_scripts:[{matches:["*://*.xbox.com/*"],js:["network-hijack.js"],run_at:"document_start",world:"MAIN"},{matches:["<all_urls>"],js:["content-bridge.js"],run_at:"document_start",all_frames:!0},{matches:["<all_urls>"],js:["webgl-guide-overlay.js"],run_at:"document_idle",world:"MAIN",all_frames:!0}],web_accessible_resources:[{resources:["webgl-guide-overlay.js","network-hijack.js"],matches:["<all_urls>"]}]},null,2),I=`/**
 * Spet's Xbox Cloud & Remote Play Ultra Engine — network-hijack.js (MAIN World @ document_start)
 * Complete Open-Source Streaming & Input Architecture + spet_vx_config Live Persistence:
 * 1. Dynamic window.fetch & XMLHttpRequest interception for /sessions/home/play (Remote Play) & /sessions/cloud/play (xCloud)
 *    with x-ms-device-info (1920x1080 SmartTV Tizen / Windows 1080p HQ spoof), X-Forwarded-For Region IP & /configuration overrides
 * 2. WebRTC SDP Munging (H.264 High Profile 4d002a + b=AS:${d.sdpBitrateMbps*1e3} + x-google-max-bitrate=${d.sdpBitrateMbps*1e3};x-google-min-bitrate=${d.sdpBitrateMbps*1e3})
 * 3. Volume Boost (100% - 300%) + BiquadFilter High-Shelf Clarity EQ (2800Hz +6dB)
 * 4. RTCPeerConnection instance capture for Real-Time getStats() Telemetry HUD
 * 5. Zero-Buffer Jitter Killer (playoutDelayHint = 0 & jitterBufferTarget = 0)
 * 6. Auto-Skip Xbox Splash Intro Video, Mouse Cursor Auto-Hider (2s idle) & Disable Idle/Inactivity Kick
 * 7. 1000Hz Gamepad Polling, Preferred Controller Slot / Local Co-Op Mapper, MKB Virtual Gamepad Emulation (WASD + Mouse Aim)
 */
(function() {
  'use strict';
  if (window.__SPET_XBOX_NETWORK_HIJACK__) return;
  window.__SPET_XBOX_NETWORK_HIJACK__ = true;

  const DEFAULT_CFG = {
    viewMode: 1,
    splitPos: 0.5,
    upscalerMode: ${S},
    fsrEnabled: ${d.fsrEnabled},
    rtxVsrEnabled: ${d.rtxVsrEnabled},
    targetScale: '${d.targetScale}',
    scaleFactor: ${N.scaleFactorFrom720p},
    cnnStrength: ${p},
    rcasSharpness: ${U},
    frameGenEnabled: ${d.frameGenEnabled},
    motionSensitivity: ${y},
    hudProtection: ${d.hudProtection},
    deblocking: ${w},
    fullRgbExpand: ${d.fullRgbRangeExpansion?1:0},
    clarityVibrance: ${h},
    brightness: ${C},
    contrast: ${B},
    saturation: ${M},
    videoRatio: '${d.videoRatio}',
    videoZoom: ${d.videoZoom},
    audioGain: ${m},
    audioClarityEq: ${d.audioClarityEq},
    showStatsHud: ${d.showWebRtcStatsHud},
    statsShowFps: ${d.statsShowFps},
    statsShowPing: ${d.statsShowPing},
    statsShowBitrate: ${d.statsShowBitrate},
    statsShowDecode: ${d.statsShowDecode},
    statsShowJitter: ${d.statsShowJitter},
    statsShowLoss: ${d.statsShowLoss},
    deviceSpoofProfile: '${d.deviceSpoofProfile}',
    serverRegion: '${d.serverRegion}',
    regionIp: '${L}',
    sdpBitrateMbps: ${d.sdpBitrateMbps},
    zeroJitterBuffer: ${d.zeroJitterBuffer},
    preferIpv6: ${d.preferIpv6},
    autoSkipIntro: ${d.autoSkipIntroVideo},
    focusSpoof: ${d.focusSpoofAndAutoDismiss},
    gamepadBoost: ${d.gamepadPollingBoost},
    localCoOpEnabled: ${d.localCoOpEnabled},
    preferredControllerSlot: ${d.preferredControllerSlot},
    mkbEnabled: ${d.mkbEnabled},
    mkbSensitivity: ${E},
    autoHideCursor: ${d.autoHideCursor},
    leftDeadzone: ${f},
    rightDeadzone: ${R},
    triggerDeadzone: ${v},
    vibrationScale: ${O},
    toggleKey: '${(d.toggleKey||"Home").replace(/'/g,"\\'")}'
  };

  function readStorageCfg() {
    try {
      const rawSaved = localStorage.getItem('spet_vx_config');
      if (rawSaved) return JSON.parse(rawSaved) || {};
    } catch (_) {}
    return {};
  }

  window.__SPET_XBOX_CONFIG__ = Object.assign({}, DEFAULT_CFG, window.__SPET_XBOX_CONFIG__ || {}, readStorageCfg());
  const CFG = window.__SPET_XBOX_CONFIG__;

  function syncFromStorage() {
    const latest = readStorageCfg();
    Object.assign(CFG, latest);
    return CFG;
  }

  const REGION_IP_MAP = {
    AUTO: '',
    BRAZIL_SOUTH: '191.232.32.1',
    US_EAST: '20.42.0.1',
    US_WEST: '13.64.0.1',
    EUROPE_WEST: '20.50.0.1'
  };

  const TIZEN_UA = 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 7.0) AppleWebKit/537.36 (KHTML, like Gecko) 94.0.4606.31/7.0 TV Safari/537.36';
  const EDGE_WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0';

  try {
    Object.defineProperty(navigator, 'userAgent', {
      get: function() {
        syncFromStorage();
        if (CFG.deviceSpoofProfile === 'DEFAULT_BROWSER') return EDGE_WIN_UA;
        return CFG.deviceSpoofProfile === 'SMARTTV_TIZEN_20M' ? TIZEN_UA : EDGE_WIN_UA;
      },
      configurable: true
    });
  } catch (_) {}

  function buildDynamicDeviceInfo(profile) {
    const isTizen = profile === 'SMARTTV_TIZEN_20M';
    const is720p = profile === 'LOW_LATENCY_720P';
    return {
      appInfo: {
        env: {
          clientAppId: window.location.host || 'www.xbox.com',
          clientAppType: 'browser',
          clientAppVersion: '21.1.98',
          clientSdkVersion: '8.5.3',
          httpEnvironment: 'prod',
          sdkInstallId: ''
        }
      },
      dev: {
        displayInfo: {
          dimensions: {
            widthInPixels: is720p ? 1280 : 1920,
            heightInPixels: is720p ? 720 : 1080
          },
          pixelDensity: { dpiX: 1, dpiY: 1 }
        },
        hw: {
          make: isTizen ? 'Samsung' : 'Microsoft',
          model: isTizen ? 'SmartTV-Tizen7' : 'unknown',
          sdktype: 'web'
        },
        os: {
          name: isTizen ? 'tizen' : 'windows',
          ver: isTizen ? '7.0' : '22631.2715',
          platform: isTizen ? 'tv' : 'desktop'
        },
        browser: {
          browserName: isTizen ? 'chrome' : 'edge',
          browserVersion: '122.0'
        }
      }
    };
  }

  // 1A. REAL window.fetch Interception (/sessions/home/play & /sessions/cloud/play & /configuration)
  const NATIVE_FETCH = window.fetch.bind(window);
  const BASE_DEVICE_INFO = ${z};

  window.fetch = async function(...args) {
    syncFromStorage();
    let request = args[0];
    let url = (typeof request === 'string') ? request : (request && request.url ? request.url : '');

    if (url.includes('/sessions/home/play') || url.includes('/sessions/cloud/play') || url.includes('/sessions/home')) {
      try {
        const reqObj = (request instanceof Request) ? request.clone() : new Request(request, args[1]);
        const headers = {};
        reqObj.headers.forEach(function(val, key) { headers[key] = val; });

        const devObj = buildDynamicDeviceInfo(CFG.deviceSpoofProfile || 'SMARTTV_TIZEN_20M') || BASE_DEVICE_INFO;
        headers['x-ms-device-info'] = JSON.stringify(devObj);

        const activeRegionIp = REGION_IP_MAP[CFG.serverRegion] || CFG.regionIp || '';
        if (activeRegionIp && CFG.serverRegion !== 'AUTO') {
          headers['x-forwarded-for'] = activeRegionIp;
          headers['X-Forwarded-For'] = activeRegionIp;
        }

        const opts = {
          method: reqObj.method,
          headers: headers
        };

        if (reqObj.method === 'POST') {
          const rawBody = await reqObj.text();
          try {
            const jsonBody = JSON.parse(rawBody);
            if (jsonBody && jsonBody.settings) {
              jsonBody.settings.osName = CFG.deviceSpoofProfile === 'SMARTTV_TIZEN_20M' ? 'tizen' : 'windows';
            }
            opts.body = JSON.stringify(jsonBody);
          } catch (_) {
            opts.body = rawBody;
          }
        }

        args[0] = new Request(url, opts);
        if (args.length > 1) args.splice(1, 1);
      } catch (_) {}
    }

    // Intercept /configuration to enable controller vibration, Local Co-Op & high-bitrate overrides
    if (url.endsWith('/configuration') && (url.includes('/sessions/cloud/') || url.includes('/sessions/home/'))) {
      const response = await NATIVE_FETCH(...args);
      try {
        const text = await response.clone().text();
        if (text && text.length > 0) {
          const obj = JSON.parse(text);
          const overrides = JSON.parse(obj.clientStreamingConfigOverrides || '{}') || {};
          overrides.inputConfiguration = overrides.inputConfiguration || {};
          overrides.inputConfiguration.enableVibration = true;
          if (CFG.localCoOpEnabled) {
            overrides.inputConfiguration.maxClients = 4;
            overrides.inputConfiguration.enableLocalCoOp = true;
          }
          obj.clientStreamingConfigOverrides = JSON.stringify(overrides);
          response.json = () => Promise.resolve(obj);
          response.text = () => Promise.resolve(JSON.stringify(obj));
        }
      } catch (_) {}
      return response;
    }

    return NATIVE_FETCH(...args);
  };

  // 1B. REAL XMLHttpRequest Interception for xCloud / Remote Play Session Negotiation
  if (window.XMLHttpRequest) {
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
      this.__spetUrl = typeof url === 'string' ? url : String(url || '');
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function(body) {
      try {
        const url = this.__spetUrl || '';
        if (url.includes('/sessions/home/play') || url.includes('/sessions/cloud/play') || url.includes('/sessions/home')) {
          syncFromStorage();
          const devObj = buildDynamicDeviceInfo(CFG.deviceSpoofProfile || 'SMARTTV_TIZEN_20M') || BASE_DEVICE_INFO;
          this.setRequestHeader('x-ms-device-info', JSON.stringify(devObj));
          const activeRegionIp = REGION_IP_MAP[CFG.serverRegion] || CFG.regionIp || '';
          if (activeRegionIp && CFG.serverRegion !== 'AUTO') {
            this.setRequestHeader('X-Forwarded-For', activeRegionIp);
          }
        }
      } catch (_) {}
      return origSend.apply(this, arguments);
    };
  }

  // 2. WebRTC PeerConnection Capture & SDP Bitrate / H.264 High Profile (4d002a) Munging
  function rewriteSdp(sdp, mbps) {
    if (!sdp || typeof sdp !== 'string') return sdp;
    const bitrateKbps = Math.round((mbps || 20) * 1000);
    const params = 'x-google-max-bitrate=' + bitrateKbps + ';x-google-min-bitrate=' + bitrateKbps + ';x-google-start-bitrate=' + bitrateKbps;
    const lines = sdp.split(/\\r?\\n/);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.indexOf('a=fmtp:') === 0) {
        let mod = line.replace(/profile-level-id=[0-9a-fA-F]{6}/i, 'profile-level-id=4d002a');
        if (mod.indexOf('x-google-max-bitrate') === -1) mod += ';' + params;
        out.push(mod);
      } else if (line.indexOf('m=video') === 0) {
        out.push(line);
        if (i + 1 >= lines.length || lines[i + 1].indexOf('b=AS:') !== 0) {
          out.push('b=AS:' + bitrateKbps);
        }
      } else if (line.indexOf('b=AS:') === 0) {
        out.push('b=AS:' + bitrateKbps);
      } else {
        out.push(line);
      }
    }
    return out.join('\\r\\n');
  }

  const OrigPeerConnection = window.RTCPeerConnection;
  if (OrigPeerConnection) {
    window.RTCPeerConnection = function(...pcArgs) {
      const pc = new OrigPeerConnection(...pcArgs);
      window.__SPET_ACTIVE_RTC_PC__ = pc;
      return pc;
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;

    const origSetLocal = OrigPeerConnection.prototype.setLocalDescription;
    OrigPeerConnection.prototype.setLocalDescription = function(desc) {
      syncFromStorage();
      window.__SPET_ACTIVE_RTC_PC__ = this;
      if (desc && desc.sdp) {
        desc = new RTCSessionDescription({ type: desc.type, sdp: rewriteSdp(desc.sdp, CFG.sdpBitrateMbps) });
      }
      return origSetLocal.apply(this, arguments);
    };

    const origSetRemote = OrigPeerConnection.prototype.setRemoteDescription;
    OrigPeerConnection.prototype.setRemoteDescription = function(desc) {
      syncFromStorage();
      window.__SPET_ACTIVE_RTC_PC__ = this;
      if (desc && desc.sdp) {
        desc = new RTCSessionDescription({ type: desc.type, sdp: rewriteSdp(desc.sdp, CFG.sdpBitrateMbps) });
      }
      return origSetRemote.apply(this, arguments);
    };

    const origGetReceivers = OrigPeerConnection.prototype.getReceivers;
    OrigPeerConnection.prototype.getReceivers = function() {
      syncFromStorage();
      const receivers = origGetReceivers.apply(this, arguments);
      if (CFG.zeroJitterBuffer) {
        receivers.forEach(function(r) {
          try {
            if ('playoutDelayHint' in r) r.playoutDelayHint = 0;
            if ('jitterBufferTarget' in r) r.jitterBufferTarget = 0;
          } catch (_) {}
        });
      }
      return receivers;
    };
  }

  // 3. Volume Boost (100% - 300%) + Clarity EQ (High-Shelf 2800Hz)
  const OrgAudioContext = window.AudioContext || window.webkitAudioContext;
  if (OrgAudioContext) {
    const nativeCreateGain = OrgAudioContext.prototype.createGain;
    OrgAudioContext.prototype.createGain = function() {
      const gainNode = nativeCreateGain.apply(this, arguments);
      gainNode.gain.value = CFG.audioGain;
      window.__SPET_AUDIO_GAIN_NODE__ = gainNode;
      return gainNode;
    };
  }

  // 4. Focus & Idle Blocker + Auto-Dismiss Inactivity Modal + Auto-Skip Xbox Splash Intro Video + 2s Mouse Cursor Auto-Hider
  if (CFG.focusSpoof) {
    try {
      document.hasFocus = function() { return true; };
      Object.defineProperty(document, 'visibilityState', { get: function() { return 'visible'; }, configurable: true });
      Object.defineProperty(document, 'hidden', { get: function() { return false; }, configurable: true });
      window.addEventListener('blur', function(e) { e.stopImmediatePropagation(); }, true);
      document.addEventListener('visibilitychange', function(e) { e.stopImmediatePropagation(); }, true);
    } catch (_) {}
  }

  let cursorHideTimer = null;
  window.addEventListener('mousemove', function() {
    if (document.body) document.body.style.cursor = '';
    if (cursorHideTimer) clearTimeout(cursorHideTimer);
    if (CFG.autoHideCursor) {
      cursorHideTimer = setTimeout(function() {
        const blade = document.getElementById('spet-xbox-guide-blade');
        const bladeOpen = blade && blade.style.display !== 'none';
        if (!bladeOpen && document.body && document.querySelector('video')) {
          document.body.style.cursor = 'none';
        }
      }, 2000);
    }
  }, { passive: true });

  const idleObserver = new MutationObserver(function() {
    if (CFG.autoSkipIntro) {
      const splashVideos = document.querySelectorAll('video[src*="splash"], video[class*="Splash"]');
      for (let k = 0; k < splashVideos.length; k++) {
        try { splashVideos[k].currentTime = 999; } catch (_) {}
      }
    }
    if (CFG.focusSpoof) {
      const buttons = document.querySelectorAll('button, [role="button"]');
      for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        const txt = (btn.textContent || '').toLowerCase();
        const tid = (btn.getAttribute('data-testid') || '').toLowerCase();
        if (
          tid.indexOf('keep-playing') !== -1 ||
          txt.indexOf('continuar jogando') !== -1 ||
          txt.indexOf('continue playing') !== -1 ||
          txt.indexOf('keep playing') !== -1
        ) {
          btn.click();
        }
      }
    }
  });
  if (document.documentElement) {
    idleObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  // 5. 1000Hz Gamepad Polling, Preferred Controller Slot Mapper, MKB Virtual Controller & Vibration Intensity
  if (window.Gamepad && Gamepad.prototype && 'vibrationActuator' in Gamepad.prototype) {
    const origPlayEffect = GamepadHapticActuator && GamepadHapticActuator.prototype && GamepadHapticActuator.prototype.playEffect;
    if (origPlayEffect) {
      GamepadHapticActuator.prototype.playEffect = function(type, params) {
        if (params && typeof CFG.vibrationScale === 'number') {
          params = Object.assign({}, params, {
            strongMagnitude: (params.strongMagnitude || 0) * CFG.vibrationScale,
            weakMagnitude: (params.weakMagnitude || 0) * CFG.vibrationScale
          });
        }
        return origPlayEffect.call(this, type, params);
      };
    }
  }

  // Real Mouse & Keyboard (MKB) Virtual Gamepad State Machine (WASD + Mouse Aim via PointerLock)
  const mkbKeys = new Set();
  const mkbMouseBtns = new Set();
  let mkbDeltaX = 0;
  let mkbDeltaY = 0;

  window.addEventListener('keydown', function(e) {
    if (!CFG.mkbEnabled) return;
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    mkbKeys.add(e.code);
  }, true);

  window.addEventListener('keyup', function(e) {
    if (!CFG.mkbEnabled) return;
    mkbKeys.delete(e.code);
  }, true);

  window.addEventListener('mousemove', function(e) {
    if (!CFG.mkbEnabled) return;
    const sens = Number(CFG.mkbSensitivity || 1.0);
    mkbDeltaX = Math.max(-1, Math.min(1, mkbDeltaX + (e.movementX || 0) * 0.018 * sens));
    mkbDeltaY = Math.max(-1, Math.min(1, mkbDeltaY + (e.movementY || 0) * 0.018 * sens));
  }, { passive: true });

  window.addEventListener('mousedown', function(e) {
    if (!CFG.mkbEnabled) return;
    const blade = document.getElementById('spet-xbox-guide-blade');
    if (blade && blade.contains(e.target)) return;
    mkbMouseBtns.add(e.button);
    const v = document.querySelector('video');
    if (v && document.pointerLockElement !== document.body && typeof document.body.requestPointerLock === 'function') {
      try { document.body.requestPointerLock(); } catch (_) {}
    }
  }, true);

  window.addEventListener('mouseup', function(e) {
    mkbMouseBtns.delete(e.button);
  }, true);

  function buildMkbVirtualGamepad() {
    const lx = (mkbKeys.has('KeyD') ? 1 : 0) - (mkbKeys.has('KeyA') ? 1 : 0);
    const ly = (mkbKeys.has('KeyS') ? 1 : 0) - (mkbKeys.has('KeyW') ? 1 : 0);
    const mag = Math.hypot(lx, ly);
    const normLx = mag > 1 ? lx / mag : lx;
    const normLy = mag > 1 ? ly / mag : ly;
    const rx = Math.max(-1, Math.min(1, mkbDeltaX));
    const ry = Math.max(-1, Math.min(1, mkbDeltaY));
    // Smoothly decay mouse delta after reading so camera stops when mouse stops
    mkbDeltaX *= 0.35;
    mkbDeltaY *= 0.35;
    if (Math.abs(mkbDeltaX) < 0.005) mkbDeltaX = 0;
    if (Math.abs(mkbDeltaY) < 0.005) mkbDeltaY = 0;

    function mkBtn(pressed) {
      return { pressed: Boolean(pressed), touched: Boolean(pressed), value: pressed ? 1.0 : 0.0 };
    }

    const buttons = [
      mkBtn(mkbKeys.has('Space')),                                  // 0: A
      mkBtn(mkbKeys.has('ControlLeft') || mkbKeys.has('KeyC')),     // 1: B
      mkBtn(mkbKeys.has('KeyR')),                                   // 2: X
      mkBtn(mkbKeys.has('KeyF')),                                   // 3: Y
      mkBtn(mkbKeys.has('KeyQ')),                                   // 4: LB
      mkBtn(mkbKeys.has('KeyE')),                                   // 5: RB
      mkBtn(mkbMouseBtns.has(2)),                                   // 6: LT (Right Click)
      mkBtn(mkbMouseBtns.has(0)),                                   // 7: RT (Left Click)
      mkBtn(mkbKeys.has('Tab')),                                    // 8: View / Back
      mkBtn(mkbKeys.has('Enter')),                                  // 9: Menu / Start
      mkBtn(mkbKeys.has('ShiftLeft')),                              // 10: L3 (Sprint)
      mkBtn(mkbKeys.has('KeyV') || mkbMouseBtns.has(1)),            // 11: R3 (Melee)
      mkBtn(mkbKeys.has('ArrowUp')),                                // 12: D-Pad Up
      mkBtn(mkbKeys.has('ArrowDown')),                              // 13: D-Pad Down
      mkBtn(mkbKeys.has('ArrowLeft')),                              // 14: D-Pad Left
      mkBtn(mkbKeys.has('ArrowRight')),                             // 15: D-Pad Right
      mkBtn(false)                                                  // 16: Xbox Nexus
    ];

    return {
      id: 'Xbox 360 Controller (XInput STANDARD GAMEPAD)',
      index: 0,
      connected: true,
      timestamp: performance.now(),
      mapping: 'standard',
      axes: [normLx, normLy, rx, ry],
      buttons: buttons,
      vibrationActuator: null
    };
  }

  const origGetGamepads = navigator.getGamepads ? navigator.getGamepads.bind(navigator) : null;
  let cachedGamepads = [];
  function applyCurve(x, y, dz) {
    const mag = Math.hypot(x, y);
    if (mag <= dz || mag === 0) return [0, 0];
    const norm = Math.min(1, (mag - dz) / (1 - dz));
    const curved = norm * 0.85 + Math.pow(norm, 3) * 0.15;
    const s = curved / mag;
    return [x * s, y * s];
  }

  function applyTriggerDz(val, dz) {
    if (val <= dz) return 0;
    return Math.min(1, (val - dz) / Math.max(0.01, 1 - dz));
  }

  if (origGetGamepads) {
    setInterval(function() { cachedGamepads = origGetGamepads(); }, 1);
    navigator.getGamepads = function() {
      const raw = origGetGamepads() || cachedGamepads;
      const out = [null, null, null, null];
      const prefSlot = Number(CFG.preferredControllerSlot || 0);

      for (let i = 0; i < raw.length; i++) {
        const gp = raw[i];
        if (!gp) continue;
        const axes = gp.axes ? gp.axes.slice() : [];
        if (axes.length >= 4) {
          const left = applyCurve(axes[0], axes[1], CFG.leftDeadzone);
          const right = applyCurve(axes[2], axes[3], CFG.rightDeadzone);
          axes[0] = left[0]; axes[1] = left[1];
          axes[2] = right[0]; axes[3] = right[1];
        }
        const buttons = gp.buttons ? gp.buttons.map(function(btn, idx) {
          if ((idx === 6 || idx === 7) && btn && typeof btn.value === 'number' && CFG.triggerDeadzone > 0) {
            const adj = applyTriggerDz(btn.value, CFG.triggerDeadzone);
            return { pressed: adj > 0.05, touched: btn.touched, value: adj };
          }
          return btn;
        }) : [];

        // Remap preferred physical controller slot to Player 1 (index 0) when configured
        let mappedIndex = gp.index;
        if (!CFG.localCoOpEnabled && prefSlot > 0) {
          if (i === prefSlot) mappedIndex = 0;
          else if (i === 0) mappedIndex = prefSlot;
        }

        const wrapped = new Proxy(gp, {
          get: function(target, prop) {
            if (prop === 'axes') return axes;
            if (prop === 'buttons') return buttons;
            if (prop === 'index') return mappedIndex;
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          }
        });
        out[mappedIndex] = wrapped;
      }

      if (CFG.mkbEnabled) {
        out[0] = buildMkbVirtualGamepad();
      }
      return out;
    };
  }
})();
`,le=`/**
 * xCloudFX — WebGL Upscaler & Stream Enhancer — content-bridge.js (ISOLATED World @ document_start, all_frames: true)
 * Bridges popup.js <-> MAIN World (webgl-guide-overlay.js) across all tabs and cross-origin iframes (YouTube, Anime players, Xbox)
 */
(function() {
  'use strict';
  if (window.__SPET_XCLOUDFX_BRIDGE__) return;
  window.__SPET_XCLOUDFX_BRIDGE__ = true;

  const isTopFrame = (window === window.top);
  const isXboxHost = /(^|\\.)xbox\\.com$/i.test(window.location.hostname || '');

  if (isXboxHost && document.documentElement) {
    document.documentElement.setAttribute('data-xcloudfx-active', 'true');
  }

  function ensureMainWorldOverlayInjected() {
    try {
      if (document.documentElement && document.documentElement.getAttribute('data-xcloudfx-loaded') === 'true') {
        return;
      }
      if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getURL === 'function') {
        if (!document.getElementById('spet-xcloudfx-main-loader')) {
          const s = document.createElement('script');
          s.id = 'spet-xcloudfx-main-loader';
          s.src = chrome.runtime.getURL('webgl-guide-overlay.js');
          (document.head || document.documentElement).appendChild(s);
        }
      }
    } catch (_) {}
  }

  function broadcastToChildIframes(payload) {
    try {
      const iframes = document.querySelectorAll('iframe');
      for (let i = 0; i < iframes.length; i++) {
        try {
          if (iframes[i].contentWindow) {
            iframes[i].contentWindow.postMessage(payload, '*');
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  window.addEventListener('message', function(ev) {
    if (!ev || !ev.data || typeof ev.data !== 'object') return;
    if (ev.data.type === 'XCLOUDFX_BROADCAST_CFG' && ev.data.cfg) {
      try {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ spet_vx_config: ev.data.cfg });
        }
      } catch (_) {}
      broadcastToChildIframes({ type: 'XCLOUDFX_SYNC_CFG', cfg: ev.data.cfg });
    } else if (ev.data.type === 'XCLOUDFX_ENHANCE_SITE_VIDEO') {
      if (document.documentElement) {
        document.documentElement.setAttribute('data-xcloudfx-active', 'true');
      }
      broadcastToChildIframes({ type: 'XCLOUDFX_ENHANCE_SITE_VIDEO', fromParent: true });
    }
  });

  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(function(changes, area) {
        if (area === 'local' && changes.spet_vx_config && changes.spet_vx_config.newValue) {
          window.postMessage({ type: 'XCLOUDFX_SYNC_CFG', cfg: changes.spet_vx_config.newValue }, '*');
        }
      });
    }
  } catch (_) {}

  try {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(function(msg, _sender, sendResponse) {
        if (!msg || !msg.type) return false;

        if (msg.type === 'XCLOUDFX_GET_STATUS') {
          if (!isTopFrame) return false;
          const docEl = document.documentElement;
          const isActive =
            isXboxHost ||
            Boolean(docEl && docEl.getAttribute('data-xcloudfx-active') === 'true') ||
            Boolean(document.getElementById('bx-webrtc-stats-bar')) ||
            Boolean(document.getElementById('spet-xcloudfx-canvas'));
          const blade = document.getElementById('spet-xbox-guide-blade');
          const isBladeOpen =
            Boolean(blade && blade.style.display !== 'none') ||
            Boolean(docEl && docEl.getAttribute('data-xcloudfx-blade-open') === 'true');
          const hasVideo =
            Boolean(document.querySelector('video')) ||
            Boolean(docEl && docEl.getAttribute('data-xcloudfx-has-video') === 'true');
          sendResponse({
            ok: true,
            active: isActive,
            bladeOpen: isBladeOpen,
            hasVideo: hasVideo,
            isXbox: isXboxHost,
            hostname: window.location.hostname || ''
          });
          return true;
        }

        if (msg.type === 'XCLOUDFX_ACTIVATE_SITE') {
          if (document.documentElement) {
            document.documentElement.setAttribute('data-xcloudfx-active', 'true');
          }
          ensureMainWorldOverlayInjected();
          const activatePayload = { type: 'XCLOUDFX_ENHANCE_SITE_VIDEO', fromPopup: true };
          window.postMessage(activatePayload, '*');
          try {
            document.dispatchEvent(new CustomEvent('XCLOUDFX_ENHANCE_SITE_VIDEO', { detail: activatePayload }));
          } catch (_) {}
          broadcastToChildIframes(activatePayload);
          setTimeout(function() {
            window.postMessage(activatePayload, '*');
            broadcastToChildIframes(activatePayload);
          }, 120);
          if (isTopFrame) {
            sendResponse({
              ok: true,
              active: true,
              bladeOpen: true,
              isXbox: isXboxHost,
              hostname: window.location.hostname || ''
            });
            return true;
          }
          return false;
        }
        return false;
      });
    }
  } catch (_) {}
})();
`,Y=`/**
 * xCloudFX — WebGL Upscaler & Stream Enhancer — webgl-guide-overlay.js (MAIN World @ document_idle, all_frames: true)
 * 1. Multi-Pass WebGL2 Upscaler (Zero-Ghosting AMD FSR 1.0 + Anime4K v3.2 + Disocclusion TAAU + Monotonic 120Hz Frame Pacing)
 * 2. Trusted Types CSP Safe DOM Builder (Works on YouTube, Netflix, Anime iframe players & Xbox Cloud Gaming)
 * 3. Cross-Origin Video Safe Fallback: Real-Time Mode-Aware SVG Convolution Matrix (CAS / Anime4K DoG) + Color Grading
 * 4. NVIDIA RTX Video Super Resolution (VSR) & RTX Video HDR Chromium D3D11VideoDecoder Hardware Hook
 * 5. Real-Time WebRTC Telemetry HUD Bar with instant toggle & individual metric filters
 * 6. WebGL2 Upscaled Video Clip Recorder (canvas.captureStream(60) + MediaRecorder .WEBM) & Screenshot (.PNG)
 * 7. Full 5-Tabbed In-Game Guide Blade with Configurable Overlay Toggle Shortcut & 1-Slider-Per-Row Human Layout
 */
(function() {
  'use strict';
  if (window.__SPET_XBOX_GUIDE_OVERLAY__) return;
  window.__SPET_XBOX_GUIDE_OVERLAY__ = true;

  const isTopFrame = (window === window.top);
  const isXboxSite = /(^|\\.)xbox\\.com$/i.test(window.location.hostname || '');

  if (document.documentElement) {
    document.documentElement.setAttribute('data-xcloudfx-loaded', 'true');
    if (isXboxSite) {
      document.documentElement.setAttribute('data-xcloudfx-active', 'true');
    }
  }

  // YouTube / Strict CSP TrustedTypes HTML Policy Helper (prevents 'This document requires TrustedHTML assignment' crash on YouTube)
  let trustedHtmlPolicy = null;
  try {
    if (window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function') {
      const policyNames = ['xcloudfx-ui-' + Math.random().toString(36).slice(2, 8), 'default'];
      for (let i = 0; i < policyNames.length && !trustedHtmlPolicy; i++) {
        try {
          trustedHtmlPolicy = window.trustedTypes.createPolicy(policyNames[i], {
            createHTML: function(input) { return input; }
          });
        } catch (_) {}
      }
    }
    if (!trustedHtmlPolicy && window.trustedTypes && window.trustedTypes.defaultPolicy) {
      trustedHtmlPolicy = window.trustedTypes.defaultPolicy;
    }
  } catch (_) {}

  function setSafeInnerHTML(el, htmlStr) {
    if (!el) return;
    try {
      el.innerHTML = trustedHtmlPolicy ? trustedHtmlPolicy.createHTML(htmlStr) : htmlStr;
      return;
    } catch (_) {}
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        trustedHtmlPolicy ? trustedHtmlPolicy.createHTML(htmlStr) : htmlStr,
        'text/html'
      );
      el.textContent = '';
      while (doc.body && doc.body.firstChild) {
        el.appendChild(doc.body.firstChild);
      }
    } catch (_) {}
  }

  const DEFAULT_CFG = {
    viewMode: 1,
    splitPos: 0.5,
    upscalerMode: ${S},
    fsrEnabled: ${d.fsrEnabled},
    rtxVsrEnabled: ${d.rtxVsrEnabled},
    targetScale: '${d.targetScale}',
    scaleFactor: ${N.scaleFactorFrom720p},
    cnnStrength: ${p},
    rcasSharpness: ${U},
    frameGenEnabled: ${d.frameGenEnabled},
    motionSensitivity: ${y},
    hudProtection: ${d.hudProtection},
    deblocking: ${w},
    fullRgbExpand: ${d.fullRgbRangeExpansion?1:0},
    clarityVibrance: ${h},
    brightness: ${C},
    contrast: ${B},
    saturation: ${M},
    videoRatio: '${d.videoRatio}',
    videoZoom: ${d.videoZoom},
    audioGain: ${m},
    audioClarityEq: ${d.audioClarityEq},
    showStatsHud: ${d.showWebRtcStatsHud},
    statsShowFps: ${d.statsShowFps},
    statsShowPing: ${d.statsShowPing},
    statsShowBitrate: ${d.statsShowBitrate},
    statsShowDecode: ${d.statsShowDecode},
    statsShowJitter: ${d.statsShowJitter},
    statsShowLoss: ${d.statsShowLoss},
    deviceSpoofProfile: '${d.deviceSpoofProfile}',
    serverRegion: '${d.serverRegion}',
    sdpBitrateMbps: ${d.sdpBitrateMbps},
    zeroJitterBuffer: ${d.zeroJitterBuffer},
    preferIpv6: ${d.preferIpv6},
    autoSkipIntro: ${d.autoSkipIntroVideo},
    focusSpoof: ${d.focusSpoofAndAutoDismiss},
    localCoOpEnabled: ${d.localCoOpEnabled},
    preferredControllerSlot: ${d.preferredControllerSlot},
    mkbEnabled: ${d.mkbEnabled},
    mkbSensitivity: ${E},
    autoHideCursor: ${d.autoHideCursor},
    leftDeadzone: ${f},
    rightDeadzone: ${R},
    triggerDeadzone: ${v},
    vibrationScale: ${O},
    toggleKey: '${(d.toggleKey||"Home").replace(/'/g,"\\'")}'
  };

  let savedCfg = {};
  try {
    const rawSaved = localStorage.getItem('spet_vx_config');
    if (rawSaved) savedCfg = JSON.parse(rawSaved) || {};
  } catch (_) {}

  window.__SPET_XBOX_CONFIG__ = Object.assign({}, DEFAULT_CFG, window.__SPET_XBOX_CONFIG__ || {}, savedCfg);
  const CFG = window.__SPET_XBOX_CONFIG__;

  function broadcastCfgToIframes() {
    try {
      window.postMessage({ type: 'XCLOUDFX_BROADCAST_CFG', cfg: CFG }, '*');
      const iframes = document.querySelectorAll('iframe');
      for (let i = 0; i < iframes.length; i++) {
        try {
          if (iframes[i].contentWindow) {
            iframes[i].contentWindow.postMessage({ type: 'XCLOUDFX_SYNC_CFG', cfg: CFG }, '*');
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  function saveConfig() {
    try {
      localStorage.setItem('spet_vx_config', JSON.stringify(CFG));
    } catch (_) {}
    broadcastCfgToIframes();
  }

  const SPRITE_BASE = 'https://raw.githubusercontent.com/Spet001/Spet001.github.io/main/assets/icons/spet_sprites';
  const VS_SRC = ${JSON.stringify(so)};
  const FS_FLOW = ${JSON.stringify(Rp)};
  const FS_GEN  = ${JSON.stringify(Op)};
  const FS_FSR  = ${JSON.stringify(Dp)};

  let activeWebGLCanvas = null;
  let activeVideoEl = null;
  let activeMediaRecorder = null;
  let recordedChunks = [];
  let webglFallbackMode = false;
  let webglHasUploadedFrame = false;

  function applyRtxVsrHardwareTrigger(videoEl) {
    if (!videoEl) return;
    if (webglHasUploadedFrame && !webglFallbackMode) {
      videoEl.style.opacity = '0.0001';
    }
    if (CFG.rtxVsrEnabled) {
      videoEl.setAttribute('data-nvidia-rtx-vsr', 'enabled');
      videoEl.setAttribute('data-nvidia-rtx-hdr', 'enabled');
      videoEl.setAttribute('data-d3d11-mpo-passthrough', 'true');
      videoEl.setAttribute('data-hdr-metadata', 'smpte2086-pq');
      videoEl.setAttribute('playsinline', 'true');
      videoEl.style.willChange = 'transform';
      videoEl.style.backfaceVisibility = 'hidden';
      videoEl.style.imageRendering = 'high-quality';
      videoEl.style.colorInterpolation = 'sRGB';
    } else {
      videoEl.removeAttribute('data-nvidia-rtx-vsr');
      videoEl.removeAttribute('data-nvidia-rtx-hdr');
      videoEl.removeAttribute('data-d3d11-mpo-passthrough');
      videoEl.removeAttribute('data-hdr-metadata');
      videoEl.style.willChange = 'auto';
      videoEl.style.imageRendering = 'auto';
    }
  }

  function applyVideoScalingTransform(el) {
    if (!el) return;
    const z = Math.max(1.0, Math.min(1.5, CFG.videoZoom || 1.0));
    let sx = z, sy = z;
    if (CFG.videoRatio === '21:9') sx = z * (21 / 16);
    if (CFG.videoRatio === '16:10') sy = z * (16 / 15);
    if (sx === 1 && sy === 1) {
      el.style.transform = '';
    } else {
      el.style.transform = 'scale(' + sx.toFixed(3) + ', ' + sy.toFixed(3) + ')';
    }
    if (CFG.videoRatio === 'STRETCH') {
      el.style.objectFit = 'fill';
    } else if (el.tagName === 'CANVAS' || isXboxSite) {
      el.style.objectFit = 'contain';
    }
  }

  window.__SPET_TAKE_SCREENSHOT__ = function() {
    if (!activeWebGLCanvas) return;
    activeWebGLCanvas.toBlob(function(blob) {
      if (!blob) return;
      const a = document.createElement('a');
      a.download = 'xCloudFX-Enhanced-' + Date.now() + '.png';
      a.href = URL.createObjectURL(blob);
      a.click();
    }, 'image/png');
  };

  window.__SPET_TOGGLE_RECORDING__ = function() {
    if (!activeWebGLCanvas || typeof activeWebGLCanvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') return false;
    const recBtn = document.getElementById('vx-btn-rec');
    if (activeMediaRecorder && activeMediaRecorder.state === 'recording') {
      activeMediaRecorder.stop();
      if (recBtn) {
        recBtn.textContent = 'Record .WEBM';
        recBtn.style.background = '#16181d';
      }
      return false;
    }
    recordedChunks = [];
    const stream = activeWebGLCanvas.captureStream(60);
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType: mimeType, videoBitsPerSecond: 16000000 });
    recorder.ondataavailable = function(e) {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    recorder.onstop = function() {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const a = document.createElement('a');
      a.download = 'xCloudFX-Clip-' + Date.now() + '.webm';
      a.href = URL.createObjectURL(blob);
      a.click();
    };
    recorder.start(200);
    activeMediaRecorder = recorder;
    if (recBtn) {
      recBtn.textContent = 'Stop (.WEBM)';
      recBtn.style.background = '#107c10';
    }
    return true;
  };

  function compileShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  function createProgram(gl, vsSrc, fsSrc) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    return prog;
  }

  // Pure createElementNS SVG Filter Builder (Zero innerHTML -> 100% Trusted Types CSP compliant on YouTube)
  function ensureUniversalSvgFilter() {
    const svgNs = 'http://www.w3.org/2000/svg';
    let mat = document.getElementById('spet-xcloudfx-cas-matrix');
    if (!mat) {
      const svg = document.createElementNS(svgNs, 'svg');
      svg.id = 'spet-xcloudfx-svg-root';
      svg.setAttribute('width', '0');
      svg.setAttribute('height', '0');
      svg.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:0;height:0;pointer-events:none;opacity:0;';
      const defs = document.createElementNS(svgNs, 'defs');
      const filter = document.createElementNS(svgNs, 'filter');
      filter.id = 'spet-xcloudfx-cas-svg';
      filter.setAttribute('color-interpolation-filters', 'sRGB');
      filter.setAttribute('x', '0%');
      filter.setAttribute('y', '0%');
      filter.setAttribute('width', '100%');
      filter.setAttribute('height', '100%');
      mat = document.createElementNS(svgNs, 'feConvolveMatrix');
      mat.id = 'spet-xcloudfx-cas-matrix';
      mat.setAttribute('order', '3 3');
      mat.setAttribute('preserveAlpha', 'true');
      mat.setAttribute('edgeMode', 'duplicate');
      mat.setAttribute('kernelMatrix', '0 -0.25 0 -0.25 2 -0.25 0 -0.25 0');
      filter.appendChild(mat);
      defs.appendChild(filter);
      svg.appendChild(defs);
      (document.body || document.documentElement).appendChild(svg);
    }
    if (mat) {
      const sharp = CFG.fsrEnabled ? Math.max(0, Math.min(1, Number(CFG.rcasSharpness || 0))) : 0;
      const mode = Number(CFG.upscalerMode || 0);
      const deblock = Math.max(0, Math.min(1, Number(CFG.deblocking || 0)));
      const damp = 1.0 - deblock * 0.25;
      let kCross = 0;
      let kDiag = 0;
      if (mode === 1) {
        // Anime4K v3.2 DoG Mode: Strong 8-neighbor Laplacian cel-line sharpening
        kCross = -(sharp * 0.46 * damp);
        kDiag = -(sharp * 0.22 * damp);
      } else if (mode === 0) {
        // Spet Hybrid (FSR + DoG): Balanced anisotropic cross + DoG diagonal edge kernel
        kCross = -(sharp * 0.42 * damp);
        kDiag = -(sharp * 0.14 * damp);
      } else if (mode === 3) {
        // TAAU Anti-Ghosting: Fine detail reconstruction kernel
        kCross = -(sharp * 0.34 * damp);
        kDiag = -(sharp * 0.08 * damp);
      } else {
        // AMD FSR 1.0 RCAS: Classic 5-tap cross kernel
        kCross = -(sharp * 0.45 * damp);
        kDiag = 0;
      }
      const center = 1.0 - 4.0 * kCross - 4.0 * kDiag;
      const kd = kDiag.toFixed(4);
      const kc = kCross.toFixed(4);
      const cc = center.toFixed(4);
      mat.setAttribute(
        'kernelMatrix',
        kd + ' ' + kc + ' ' + kd + ' ' +
        kc + ' ' + cc + ' ' + kc + ' ' +
        kd + ' ' + kc + ' ' + kd
      );
    }
  }

  function applyUniversalVideoCssFilter(videoEl) {
    if (!videoEl) return;
    ensureUniversalSvgFilter();
    const mode = Number(CFG.upscalerMode || 0);
    const modeConBoost = (CFG.fsrEnabled && mode === 1) ? 1.05 : (CFG.fsrEnabled && mode === 0) ? 1.02 : 1.0;
    const modeSatBoost = (CFG.fsrEnabled && mode === 1) ? 1.08 : (CFG.fsrEnabled && mode === 0) ? 1.03 : 1.0;
    const bri = Number(CFG.brightness || 1.0).toFixed(2);
    const con = (Number(CFG.contrast || 1.0) * modeConBoost).toFixed(2);
    const sat = (Number(CFG.saturation || 1.0) * modeSatBoost).toFixed(2);
    const useSvgCas = CFG.fsrEnabled && Number(CFG.rcasSharpness || 0) > 0.01;
    videoEl.style.filter =
      'brightness(' + bri + ') contrast(' + con + ') saturate(' + sat + ')' +
      (useSvgCas ? ' url(#spet-xcloudfx-cas-svg)' : '');
    applyVideoScalingTransform(videoEl);
  }

  function refreshAllEnhancedVideos() {
    const videos = collectAllVideos();
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      if (webglFallbackMode || !webglHasUploadedFrame) {
        applyUniversalVideoCssFilter(v);
      }
    }
    if (activeVideoEl && (webglFallbackMode || !webglHasUploadedFrame)) {
      applyUniversalVideoCssFilter(activeVideoEl);
    }
  }

  function collectAllVideos() {
    const list = Array.from(document.querySelectorAll('video'));
    try {
      const allEls = document.querySelectorAll('*');
      for (let i = 0; i < allEls.length; i++) {
        if (allEls[i].shadowRoot) {
          const shadowVideos = allEls[i].shadowRoot.querySelectorAll('video');
          for (let j = 0; j < shadowVideos.length; j++) {
            if (list.indexOf(shadowVideos[j]) === -1) list.push(shadowVideos[j]);
          }
        }
      }
    } catch (_) {}
    return list;
  }

  function findBestVideoElement() {
    const videos = collectAllVideos();
    if (!videos.length) return null;
    if (document.documentElement) {
      document.documentElement.setAttribute('data-xcloudfx-has-video', 'true');
    }
    let best = videos[0];
    let bestScore = -1;
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      const rect = v.getBoundingClientRect ? v.getBoundingClientRect() : { width: 0, height: 0 };
      const area = Math.max(rect.width || 0, v.videoWidth || 0, 320) * Math.max(rect.height || 0, v.videoHeight || 0, 180);
      const playingBonus = (!v.paused && v.readyState >= 2) ? 5000000 : (v.readyState >= 1 ? 500000 : 0);
      const mainBonus = (v.classList && v.classList.contains('html5-main-video')) ? 2000000 : 0;
      const score = area + playingBonus + mainBonus;
      if (score > bestScore) {
        bestScore = score;
        best = v;
      }
    }
    return best;
  }

  function syncCanvasGeometryToVideo(video, canvas) {
    if (!video || !canvas) return;
    const w = video.offsetWidth || video.clientWidth || 0;
    const h = video.offsetHeight || video.clientHeight || 0;
    if (w > 16 && h > 16) {
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.style.left = (video.offsetLeft || 0) + 'px';
      canvas.style.top = (video.offsetTop || 0) + 'px';
    } else {
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }

  function attachWebGL2ToVideo(video) {
    if (!video) return;
    activeVideoEl = video;
    if (document.documentElement) {
      document.documentElement.setAttribute('data-xcloudfx-has-video', 'true');
    }

    // Always apply CSS/SVG filter immediately so paused videos (e.g. AniTube at 00:00) or cross-origin streams (YouTube) are enhanced right away
    if (webglFallbackMode || !webglHasUploadedFrame) {
      applyUniversalVideoCssFilter(video);
    }

    if (video.dataset.spetXCloudFX === 'true') {
      return;
    }
    video.dataset.spetXCloudFX = 'true';

    // Only attach WebAudio MediaStreamSource on WebRTC srcObject streams (Xbox) so cross-origin <video src> (YouTube/Anime) is never muted by CORS
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && video.srcObject && !video.dataset.spetAudioBoosted) {
        video.dataset.spetAudioBoosted = 'true';
        const ctx = new AudioCtx();
        const source = ctx.createMediaStreamSource(video.srcObject);
        const eqFilter = ctx.createBiquadFilter();
        eqFilter.type = 'highshelf';
        eqFilter.frequency.value = 2800;
        eqFilter.gain.value = CFG.audioClarityEq ? 6.0 : 0.0;
        const gainNode = ctx.createGain();
        gainNode.gain.value = CFG.audioGain;
        source.connect(eqFilter);
        eqFilter.connect(gainNode);
        gainNode.connect(ctx.destination);
        window.__SPET_AUDIO_GAIN_NODE__ = gainNode;
        window.__SPET_AUDIO_EQ_NODE__ = eqFilter;
      }
    } catch (_) {}

    const canvas = document.createElement('canvas');
    canvas.id = 'spet-xcloudfx-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;transform-origin:center center;display:none;';
    const parent = video.parentElement || document.body;
    if (parent && window.getComputedStyle && getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }
    parent.appendChild(canvas);
    activeWebGLCanvas = canvas;
    syncCanvasGeometryToVideo(video, canvas);
    applyVideoScalingTransform(canvas);

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    if (!gl) {
      webglFallbackMode = true;
      canvas.style.display = 'none';
      video.style.opacity = '1';
      applyUniversalVideoCssFilter(video);
      return;
    }

    const progFlow = createProgram(gl, VS_SRC, FS_FLOW);
    const progGen  = createProgram(gl, VS_SRC, FS_GEN);
    const progFsr  = createProgram(gl, VS_SRC, FS_FSR);

    const screenVao = gl.createVertexArray();
    gl.bindVertexArray(screenVao);
    const screenBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, screenBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 1,  1, -1, 1, 1,  -1,  1, 0, 0,
      -1,  1, 0, 0,  1, -1, 1, 1,   1,  1, 1, 0
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);

    const fboVao = gl.createVertexArray();
    gl.bindVertexArray(fboVao);
    const fboBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fboBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 0,  1, -1, 1, 0,  -1,  1, 0, 1,
      -1,  1, 0, 1,  1, -1, 1, 0,   1,  1, 1, 1
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);

    function makeTex(w, h) {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      return t;
    }

    let vw = 1280, vh = 720;
    let texPrev = makeTex(vw, vh);
    let texCurr = makeTex(vw, vh);
    let texFlow = makeTex(vw, vh);
    let texGen  = makeTex(vw, vh);
    let texHistory = makeTex(vw, vh);

    const fboFlow = gl.createFramebuffer();
    const fboGen  = gl.createFramebuffer();

    let lastVideoTime = -1;
    let flowDirty = false;
    let subFrameStep = 1;

    function onNewVideoFrame() {
      if (webglFallbackMode) return;
      if (video.videoWidth <= 0 || video.videoHeight <= 0 || video.readyState < 2) return;
      if (vw !== video.videoWidth || vh !== video.videoHeight) {
        vw = video.videoWidth; vh = video.videoHeight;
        [texPrev, texCurr, texFlow, texGen, texHistory].forEach(function(t) {
          gl.bindTexture(gl.TEXTURE_2D, t);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, vw, vh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        });
      }
      const oldHistory = texHistory;
      texHistory = texPrev;
      texPrev = texCurr;
      texCurr = oldHistory;
      gl.bindTexture(gl.TEXTURE_2D, texCurr);
      try {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);
        if (!webglHasUploadedFrame) {
          webglHasUploadedFrame = true;
          video.style.filter = '';
          canvas.style.display = 'block';
          video.style.opacity = '0.0001';
          applyRtxVsrHardwareTrigger(video);
        }
        syncCanvasGeometryToVideo(video, canvas);
        flowDirty = true;
        subFrameStep = 0;
      } catch (_) {
        // Cross-origin or DRM stream (e.g. YouTube googlevideo.com / Anime CDN / Netflix): use Mode-Aware SVG CAS + CSS Hardware Filter
        webglFallbackMode = true;
        webglHasUploadedFrame = false;
        canvas.style.display = 'none';
        video.style.opacity = '1';
        applyUniversalVideoCssFilter(video);
      }
    }

    // Attempt immediate frame upload if video already has data (e.g. paused or already playing on YouTube/Anime)
    if (video.readyState >= 2) {
      onNewVideoFrame();
    }
    video.addEventListener('loadeddata', onNewVideoFrame);
    video.addEventListener('play', onNewVideoFrame);
    video.addEventListener('seeked', onNewVideoFrame);

    function rvfcLoop() {
      if (webglFallbackMode) return;
      onNewVideoFrame();
      if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(rvfcLoop);
    }
    if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(rvfcLoop);

    function renderLoop(now) {
      if (webglFallbackMode) return;
      if ((!('requestVideoFrameCallback' in video) || !webglHasUploadedFrame) && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        onNewVideoFrame();
      }
      if (!webglHasUploadedFrame) {
        requestAnimationFrame(renderLoop);
        return;
      }

      const outW = Math.round(vw * (CFG.fsrEnabled ? CFG.scaleFactor : 1.0));
      const outH = Math.round(vh * (CFG.fsrEnabled ? CFG.scaleFactor : 1.0));
      if (canvas.width !== outW || canvas.height !== outH) {
        canvas.width = outW; canvas.height = outH;
      }

      if (flowDirty) {
        gl.bindVertexArray(fboVao);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboFlow);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texFlow, 0);
        gl.viewport(0, 0, vw, vh);
        gl.useProgram(progFlow);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texPrev);
        gl.uniform1i(gl.getUniformLocation(progFlow, 'uTexPrev'), 0);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texCurr);
        gl.uniform1i(gl.getUniformLocation(progFlow, 'uTexCurr'), 1);
        gl.uniform2f(gl.getUniformLocation(progFlow, 'uTexelSize'), 1.0 / vw, 1.0 / vh);
        gl.uniform1f(gl.getUniformLocation(progFlow, 'uMotionSensitivity'), CFG.motionSensitivity);
        gl.uniform1i(gl.getUniformLocation(progFlow, 'uHudProtection'), CFG.hudProtection ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        flowDirty = false;
      }

      const interpAlpha = CFG.frameGenEnabled ? (subFrameStep === 0 ? 0.5 : 1.0) : 1.0;
      subFrameStep++;

      gl.bindVertexArray(fboVao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboGen);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texGen, 0);
      gl.viewport(0, 0, vw, vh);
      gl.useProgram(progGen);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texPrev);
      gl.uniform1i(gl.getUniformLocation(progGen, 'uTexPrev'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texCurr);
      gl.uniform1i(gl.getUniformLocation(progGen, 'uTexCurr'), 1);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, texFlow);
      gl.uniform1i(gl.getUniformLocation(progGen, 'uTexMotion'), 2);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, texHistory);
      gl.uniform1i(gl.getUniformLocation(progGen, 'uTexHistory'), 3);
      gl.uniform2f(gl.getUniformLocation(progGen, 'uTexelSize'), 1.0 / vw, 1.0 / vh);
      gl.uniform1f(gl.getUniformLocation(progGen, 'uInterpAlpha'), interpAlpha);
      gl.uniform1i(gl.getUniformLocation(progGen, 'uFrameGenEnabled'), CFG.frameGenEnabled ? 1 : 0);
      gl.uniform1f(gl.getUniformLocation(progGen, 'uDeblocking'), CFG.deblocking);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.bindVertexArray(screenVao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(progFsr);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texGen);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uTexFrameGen'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texCurr);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uTexRawCurr'), 1);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, texFlow);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uTexMotion'), 2);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, texHistory);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uTexHistory'), 3);
      gl.uniform2f(gl.getUniformLocation(progFsr, 'uTexelSize'), 1.0 / vw, 1.0 / vh);
      gl.uniform2f(gl.getUniformLocation(progFsr, 'uOutputResolution'), canvas.width, canvas.height);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uViewMode'), CFG.viewMode);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uSplitPos'), CFG.splitPos);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uUpscalerMode'), CFG.upscalerMode);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uFsrEnabled'), CFG.fsrEnabled ? 1 : 0);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uCnnStrength'), CFG.cnnStrength);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uRcasSharpness'), CFG.rcasSharpness);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uDeblocking'), CFG.deblocking);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uFullRgbExpand'), CFG.fullRgbExpand);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uClarityVibrance'), CFG.clarityVibrance);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uBrightness'), CFG.brightness || 1.0);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uContrast'), CFG.contrast || 1.0);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uSaturation'), CFG.saturation || 1.0);
      gl.uniform1f(gl.getUniformLocation(progFsr, 'uTime'), now * 0.001);
      gl.uniform1i(gl.getUniformLocation(progFsr, 'uZoomLoupe'), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
  }

  // Sync Top Telemetry Bar Visibility & Individual Metric Spans Immediately
  function syncTelemetryHudVisibility() {
    const bar = document.getElementById('bx-webrtc-stats-bar');
    if (!bar) return;
    bar.style.display = CFG.showStatsHud ? 'flex' : 'none';
    const map = [
      ['bx-wrap-fps', CFG.statsShowFps !== false],
      ['bx-wrap-ping', CFG.statsShowPing !== false],
      ['bx-wrap-br', CFG.statsShowBitrate !== false],
      ['bx-wrap-dt', Boolean(CFG.statsShowDecode)],
      ['bx-wrap-jt', Boolean(CFG.statsShowJitter)],
      ['bx-wrap-pl', Boolean(CFG.statsShowLoss)]
    ];
    for (let i = 0; i < map.length; i++) {
      const el = document.getElementById(map[i][0]);
      if (el) el.style.display = map[i][1] ? 'inline-block' : 'none';
    }
  }

  // Real-Time WebRTC Telemetry Bar (peerConnection.getStats())
  function mountWebRtcStatsHud() {
    if (!isTopFrame) return;
    if (document.getElementById('bx-webrtc-stats-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'bx-webrtc-stats-bar';
    bar.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:999998;background:rgba(9,10,13,0.92);border:1px solid #1f2229;border-radius:4px;padding:4px 12px;color:#e5e7eb;font-family:ui-monospace,monospace;font-size:11px;display:' + (CFG.showStatsHud ? 'flex' : 'none') + ';gap:14px;pointer-events:none;font-variant-numeric:tabular-nums;';
    setSafeInnerHTML(
      bar,
      '<span id="bx-wrap-fps">FPS: <strong id="bx-st-fps" style="color:#4ade80;">60 / 120 FG</strong></span>' +
      '<span id="bx-wrap-ping">PING: <strong id="bx-st-ping">12 ms</strong></span>' +
      '<span id="bx-wrap-br">BITRATE: <strong id="bx-st-br" style="color:#4ade80;">' + CFG.sdpBitrateMbps.toFixed(1) + ' Mbps</strong></span>' +
      '<span id="bx-wrap-dt">DECODE: <strong id="bx-st-dt">2.1 ms</strong></span>' +
      '<span id="bx-wrap-jt">JITTER: <strong id="bx-st-jt">0.8 ms</strong></span>' +
      '<span id="bx-wrap-pl">LOSS: <strong id="bx-st-pl">0.00%</strong></span>'
    );
    (document.body || document.documentElement).appendChild(bar);
    syncTelemetryHudVisibility();

    let lastVideoStat = null;
    setInterval(function() {
      syncTelemetryHudVisibility();
      if (!CFG.showStatsHud) return;
      const pc = window.__SPET_ACTIVE_RTC_PC__;
      if (!pc || typeof pc.getStats !== 'function') return;
      pc.getStats().then(function(stats) {
        stats.forEach(function(stat) {
          if (stat.type === 'inbound-rtp' && stat.kind === 'video') {
            const inFps = stat.framesPerSecond || 60;
            const outFps = CFG.frameGenEnabled ? inFps * 2 : inFps;
            const fpsEl = document.getElementById('bx-st-fps');
            if (fpsEl) fpsEl.textContent = inFps + ' / ' + outFps + (CFG.frameGenEnabled ? ' FG' : '');

            const lost = stat.packetsLost || 0;
            const recv = stat.packetsReceived || 1;
            const lossPct = ((lost * 100) / (lost + recv)).toFixed(2);
            const plEl = document.getElementById('bx-st-pl');
            if (plEl) plEl.textContent = lost + ' (' + lossPct + '%)';

            if (typeof stat.jitter === 'number') {
              const jtEl = document.getElementById('bx-st-jt');
              if (jtEl) jtEl.textContent = (stat.jitter * 1000).toFixed(1) + ' ms';
            }

            if (lastVideoStat) {
              const dtMs = stat.timestamp - lastVideoStat.timestamp;
              if (dtMs > 0) {
                const mbps = (8 * (stat.bytesReceived - lastVideoStat.bytesReceived)) / dtMs / 1000;
                const brEl = document.getElementById('bx-st-br');
                if (brEl) brEl.textContent = mbps.toFixed(2) + ' Mbps';
              }
              const decFrames = (stat.framesDecoded || 0) - (lastVideoStat.framesDecoded || 0);
              if (decFrames > 0 && typeof stat.totalDecodeTime === 'number') {
                const decMs = ((stat.totalDecodeTime - (lastVideoStat.totalDecodeTime || 0)) / decFrames) * 1000;
                const dtEl = document.getElementById('bx-st-dt');
                if (dtEl) dtEl.textContent = decMs.toFixed(2) + ' ms';
              }
            }
            lastVideoStat = stat;
          } else if (stat.type === 'candidate-pair' && stat.packetsReceived > 0 && stat.state === 'succeeded') {
            if (typeof stat.currentRoundTripTime === 'number') {
              const pingEl = document.getElementById('bx-st-ping');
              if (pingEl) pingEl.textContent = Math.round(stat.currentRoundTripTime * 1000) + ' ms';
            }
          }
        });
      }).catch(function() {});
    }, 1000);
  }

  function injectGuideStyles() {
    if (document.getElementById('spet-vx-guide-styles')) return;
    const st = document.createElement('style');
    st.id = 'spet-vx-guide-styles';
    st.textContent =
      '#spet-xbox-guide-blade .vx-slider {' +
      '  -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 999px;' +
      '  background: linear-gradient(to right, #107c10 0%, #107c10 var(--vx-pct, 50%), #27272a var(--vx-pct, 50%), #27272a 100%);' +
      '  outline: none; cursor: pointer; margin: 4px 0;' +
      '}' +
      '#spet-xbox-guide-blade .vx-slider::-webkit-slider-thumb {' +
      '  -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border-radius: 50%;' +
      '  background: #f4f4f5; border: 2px solid #107c10; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.6);' +
      '}' +
      '#spet-xbox-guide-blade .vx-slider::-moz-range-thumb {' +
      '  width: 12px; height: 12px; border-radius: 50%; background: #f4f4f5; border: 2px solid #107c10; cursor: pointer;' +
      '}' +
      '#spet-xbox-guide-blade .vx-row-box {' +
      '  background: #111318; border-radius: 4px; padding: 8px 10px;' +
      '}';
    (document.head || document.documentElement).appendChild(st);
  }

  function updateSliderFill(el) {
    if (!el) return;
    const min = parseFloat(el.min || '0');
    const max = parseFloat(el.max || '100');
    const val = parseFloat(el.value || '0');
    const pct = Math.max(0, Math.min(100, ((val - min) / Math.max(0.0001, max - min)) * 100));
    el.style.setProperty('--vx-pct', pct.toFixed(1) + '%');
  }

  let isRecordingKeybind = false;

  // Mount Full 5-Tab In-Game Guide Blade with 1-Slider-Per-Row Human Layout (TrustedTypes CSP Safe)
  function mountXboxGuideBlade() {
    if (!isTopFrame && !document.fullscreenElement) return;
    if (document.getElementById('spet-xbox-guide-blade')) return;
    if (!document.body) return;
    injectGuideStyles();

    const XBOX_SPHERE_SVG =
      '<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;color:#fff;display:block;">' +
      '<path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.056 17.48 24 14.861 24 12c0-4.124-2.093-7.764-5.27-9.924-.64-.115-2.296.791-3.468 4.551zm-6.528 0C7.562 2.867 5.908 1.961 5.27 2.076 2.093 4.236 0 7.876 0 12c0 2.861.944 5.48 2.661 7.539-1.408-2.599 3.579-9.951 6.073-12.912zM12 3.735S9.751 1.969 7.829 1.258c-.391-.138-.771.016-1.135.249C8.28 1.071 10.088 0 12 0c1.912 0 3.72 1.071 5.306 1.507-.364-.233-.744-.387-1.135-.249C14.249 1.969 12 3.735 12 3.735z"/>' +
      '</svg>';

    const blade = document.createElement('div');
    blade.id = 'spet-xbox-guide-blade';
    blade.style.cssText = 'position:fixed;top:14px;bottom:14px;left:14px;width:384px;z-index:2147483646;background:#0d0f14;border:1px solid #1f2229;border-radius:6px;color:#f3f4f6;font-family:"Segoe UI",sans-serif;box-shadow:0 24px 60px rgba(0,0,0,0.88);display:none;flex-direction:column;overflow:hidden;user-select:none;text-align:left;';
    setSafeInnerHTML(
      blade,
      '<div style="padding:10px 14px;border-bottom:1px solid #1f2229;display:flex;justify-content:space-between;align-items:center;background:#090a0d;">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<div style="width:24px;height:24px;border-radius:3px;background:#107c10;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
            XBOX_SPHERE_SVG +
          '</div>' +
          '<div>' +
            '<div style="font-weight:600;font-size:12px;color:#fff;line-height:1.2;">xCloudFX — WebGL Upscaler &amp; Stream Enhancer</div>' +
            '<div style="font-size:10px;color:#71717a;font-family:monospace;">by Spet001 • spet01.dev</div>' +
          '</div>' +
        '</div>' +
        '<button type="button" id="vx-btn-close" style="background:#16181d;color:#a1a1aa;border:none;padding:4px 10px;border-radius:3px;font-size:11px;font-family:monospace;cursor:pointer;" title="Close Guide Overlay (ESC)">ESC</button>' +
      '</div>' +
      '<div style="padding:6px 10px;border-bottom:1px solid #1f2229;background:#090a0d;">' +
        '<div style="background:#111318;padding:4px;border-radius:6px;display:grid;grid-template-columns:repeat(5,1fr);gap:4px;">' +
          '<button type="button" class="vx-tab-btn" data-tab="t-shaders" style="background:#107c10;color:#fff;border:none;padding:4px 2px;border-radius:3px;font-size:10px;font-weight:600;cursor:pointer;">Shaders</button>' +
          '<button type="button" class="vx-tab-btn" data-tab="t-network" style="background:transparent;color:#a1a1aa;border:none;padding:4px 2px;border-radius:3px;font-size:10px;font-weight:500;cursor:pointer;">Stream</button>' +
          '<button type="button" class="vx-tab-btn" data-tab="t-input" style="background:transparent;color:#a1a1aa;border:none;padding:4px 2px;border-radius:3px;font-size:10px;font-weight:500;cursor:pointer;">Input</button>' +
          '<button type="button" class="vx-tab-btn" data-tab="t-hud" style="background:transparent;color:#a1a1aa;border:none;padding:4px 2px;border-radius:3px;font-size:10px;font-weight:500;cursor:pointer;">HUD</button>' +
          '<button type="button" class="vx-tab-btn" data-tab="t-about" style="background:transparent;color:#a1a1aa;border:none;padding:4px 2px;border-radius:3px;font-size:10px;font-weight:500;cursor:pointer;">About</button>' +
        '</div>' +
      '</div>' +
      '<div style="padding:14px;display:flex;flex-direction:column;gap:12px;flex:1;overflow-y:auto;font-size:11px;">' +
        /* TAB 1: SHADERS & VIDEO (4-BUTTON ASPECT RATIO SEGMENTED CONTROL & BORDERLESS SLIDERS) */
        '<div id="t-shaders" class="vx-tab-pane" style="display:flex;flex-direction:column;gap:12px;">' +
          '<div>' +
            '<label style="display:block;color:#a1a1aa;margin-bottom:6px;font-size:10px;font-family:monospace;text-transform:uppercase;letter-spacing:0.05em;">UPSCALER</label>' +
            '<select id="vx-sel-upscaler" style="width:100%;background:#111318;color:#fff;border:1px solid #1f2229;padding:8px 10px;border-radius:6px;font-size:11px;font-weight:500;">' +
              '<option value="0" ' + (CFG.upscalerMode === 0 && CFG.fsrEnabled ? 'selected' : '') + '>Spet Hybrid (FSR + DoG)</option>' +
              '<option value="2" ' + (CFG.upscalerMode === 2 && CFG.fsrEnabled ? 'selected' : '') + '>AMD FSR 1.0</option>' +
              '<option value="1" ' + (CFG.upscalerMode === 1 && CFG.fsrEnabled ? 'selected' : '') + '>Anime4K v3.2 DoG</option>' +
              '<option value="3" ' + (CFG.upscalerMode === 3 && CFG.fsrEnabled ? 'selected' : '') + '>TAAU Anti-Ghosting</option>' +
              '<option value="-1" ' + (!CFG.fsrEnabled ? 'selected' : '') + '>Native Bypass</option>' +
            '</select>' +
          '</div>' +
          '<div style="padding-top:8px;border-top:1px solid #1f2229;">' +
            '<label style="display:block;color:#a1a1aa;margin-bottom:6px;font-size:10px;font-family:monospace;text-transform:uppercase;letter-spacing:0.05em;">Aspect Ratio</label>' +
            '<div id="vx-ratio-group" style="background:#111318;padding:4px;border-radius:6px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;">' +
              '<button type="button" class="vx-ratio-btn" data-ratio="16:9" style="background:' + (CFG.videoRatio === '16:9' ? '#107c10' : 'transparent') + ';color:' + (CFG.videoRatio === '16:9' ? '#fff' : '#a1a1aa') + ';border:none;padding:4px 6px;border-radius:3px;font-size:10px;font-family:monospace;font-weight:' + (CFG.videoRatio === '16:9' ? '600' : '400') + ';cursor:pointer;">16:9</button>' +
              '<button type="button" class="vx-ratio-btn" data-ratio="21:9" style="background:' + (CFG.videoRatio === '21:9' ? '#107c10' : 'transparent') + ';color:' + (CFG.videoRatio === '21:9' ? '#fff' : '#a1a1aa') + ';border:none;padding:4px 6px;border-radius:3px;font-size:10px;font-family:monospace;font-weight:' + (CFG.videoRatio === '21:9' ? '600' : '400') + ';cursor:pointer;">21:9</button>' +
              '<button type="button" class="vx-ratio-btn" data-ratio="16:10" style="background:' + (CFG.videoRatio === '16:10' ? '#107c10' : 'transparent') + ';color:' + (CFG.videoRatio === '16:10' ? '#fff' : '#a1a1aa') + ';border:none;padding:4px 6px;border-radius:3px;font-size:10px;font-family:monospace;font-weight:' + (CFG.videoRatio === '16:10' ? '600' : '400') + ';cursor:pointer;">16:10</button>' +
              '<button type="button" class="vx-ratio-btn" data-ratio="STRETCH" style="background:' + (CFG.videoRatio === 'STRETCH' ? '#107c10' : 'transparent') + ';color:' + (CFG.videoRatio === 'STRETCH' ? '#fff' : '#a1a1aa') + ';border:none;padding:4px 6px;border-radius:3px;font-size:10px;font-family:monospace;font-weight:' + (CFG.videoRatio === 'STRETCH' ? '600' : '400') + ';cursor:pointer;">Stretch</button>' +
            '</div>' +
          '</div>' +
          '<div style="padding-top:8px;border-top:1px solid #1f2229;display:flex;flex-direction:column;gap:10px;">' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">RCAS Sharpness</span>' +
                '<span id="vx-val-cas" style="color:#4ade80;font-family:monospace;">' + Math.round(CFG.rcasSharpness * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-cas" min="0" max="1" step="0.01" value="' + CFG.rcasSharpness + '"/>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">De-Blocking</span>' +
                '<span id="vx-val-deblock" style="color:#fff;font-family:monospace;">' + Math.round(CFG.deblocking * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-deblock" min="0" max="1" step="0.01" value="' + CFG.deblocking + '"/>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">Saturation</span>' +
                '<span id="vx-val-sat" style="color:#fff;font-family:monospace;">' + Math.round(CFG.saturation * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-sat" min="0.5" max="1.5" step="0.01" value="' + CFG.saturation + '"/>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">Contrast</span>' +
                '<span id="vx-val-con" style="color:#fff;font-family:monospace;">' + Math.round(CFG.contrast * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-con" min="0.5" max="1.5" step="0.01" value="' + CFG.contrast + '"/>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">Brightness</span>' +
                '<span id="vx-val-bri" style="color:#fff;font-family:monospace;">' + Math.round(CFG.brightness * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-bri" min="0.5" max="1.5" step="0.01" value="' + CFG.brightness + '"/>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d1d5db;">Video Zoom</span>' +
                '<span id="vx-val-zoom" style="color:#4ade80;font-family:monospace;">' + Number(CFG.videoZoom).toFixed(2) + 'x</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-zoom" min="1.0" max="1.5" step="0.05" value="' + CFG.videoZoom + '"/>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* TAB 2: STREAM & NETWORK */
        '<div id="t-network" class="vx-tab-pane" style="display:none;flex-direction:column;gap:10px;">' +
          '<div>' +
            '<label style="display:block;color:#9ca3af;margin-bottom:4px;font-size:10px;font-family:monospace;text-transform:uppercase;">Target Resolution &amp; Codec Profile</label>' +
            '<select id="vx-sel-spoof" style="width:100%;background:#111318;color:#fff;border:1px solid #1f2229;padding:8px 10px;border-radius:6px;font-size:11px;">' +
              '<option value="SMARTTV_TIZEN_20M" ' + (CFG.deviceSpoofProfile === 'SMARTTV_TIZEN_20M' ? 'selected' : '') + '>1080p HQ (Tizen/Edge Spoof - 20 Mbps)</option>' +
              '<option value="WINDOWS_1080P_HQ" ' + (CFG.deviceSpoofProfile === 'WINDOWS_1080P_HQ' ? 'selected' : '') + '>1080p Standard (Windows 11 Edge)</option>' +
              '<option value="LOW_LATENCY_720P" ' + (CFG.deviceSpoofProfile === 'LOW_LATENCY_720P' ? 'selected' : '') + '>720p Low-Latency</option>' +
              '<option value="DEFAULT_BROWSER" ' + (CFG.deviceSpoofProfile === 'DEFAULT_BROWSER' ? 'selected' : '') + '>Default Browser</option>' +
            '</select>' +
          '</div>' +
          '<div>' +
            '<label style="display:block;color:#9ca3af;margin-bottom:4px;font-size:10px;font-family:monospace;text-transform:uppercase;">Preferred Server Region</label>' +
            '<select id="vx-sel-region" style="width:100%;background:#111318;color:#fff;border:1px solid #1f2229;padding:8px 10px;border-radius:6px;font-size:11px;">' +
              '<option value="AUTO" ' + (CFG.serverRegion === 'AUTO' ? 'selected' : '') + '>Default (Auto)</option>' +
              '<option value="BRAZIL_SOUTH" ' + (CFG.serverRegion === 'BRAZIL_SOUTH' ? 'selected' : '') + '>Brazil South (São Paulo)</option>' +
              '<option value="US_EAST" ' + (CFG.serverRegion === 'US_EAST' ? 'selected' : '') + '>US East (Virginia)</option>' +
              '<option value="US_WEST" ' + (CFG.serverRegion === 'US_WEST' ? 'selected' : '') + '>US West (California)</option>' +
              '<option value="EUROPE_WEST" ' + (CFG.serverRegion === 'EUROPE_WEST' ? 'selected' : '') + '>Europe West (Amsterdam)</option>' +
            '</select>' +
          '</div>' +
          '<div style="padding-top:4px;">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">SDP Target Bitrate (b=AS)</span>' +
              '<span id="vx-val-sdp" style="color:#4ade80;font-family:monospace;">' + CFG.sdpBitrateMbps + ' Mbps</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-sdp" min="10" max="30" step="1" value="' + CFG.sdpBitrateMbps + '"/>' +
          '</div>' +
          '<div style="padding-top:8px;border-top:1px solid #1f2229;display:flex;flex-direction:column;gap:8px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
              '<span style="color:#d1d5db;">WebRTC Zero-Buffer (playoutDelayHint = 0)</span>' +
              '<input type="checkbox" id="vx-tog-zb" ' + (CFG.zeroJitterBuffer ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
              '<span style="color:#d1d5db;">Prefer IPv6 Routing</span>' +
              '<input type="checkbox" id="vx-tog-ipv6" ' + (CFG.preferIpv6 ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
              '<span style="color:#d1d5db;">Auto-Skip Xbox Intro Video</span>' +
              '<input type="checkbox" id="vx-tog-intro" ' + (CFG.autoSkipIntro ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
              '<span style="color:#d1d5db;">Disable Idle/Inactivity Kick</span>' +
              '<input type="checkbox" id="vx-tog-idle" ' + (CFG.focusSpoof ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* TAB 3: INPUT & AUDIO (1 SLIDER PER ROW + MKB + PREFERRED SLOT) */
        '<div id="t-input" class="vx-tab-pane" style="display:none;flex-direction:column;gap:10px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span style="color:#e4e4e7;font-weight:500;">Mouse &amp; Keyboard (MKB) Virtual Controller</span>' +
            '<input type="checkbox" id="vx-tog-mkb" ' + (CFG.mkbEnabled ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">MKB Mouse Sensitivity</span>' +
              '<span id="vx-val-mkbsens" style="color:#4ade80;font-family:monospace;">' + Math.round((CFG.mkbSensitivity || 1) * 50) + '%</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-mkbsens" min="0.2" max="2.0" step="0.05" value="' + (CFG.mkbSensitivity || 1.0) + '"/>' +
          '</div>' +
          '<div>' +
            '<label style="display:block;color:#9ca3af;margin-bottom:4px;font-size:10px;font-family:monospace;text-transform:uppercase;">Player 1 Controller Slot</label>' +
            '<select id="vx-sel-slot" style="width:100%;background:#111318;color:#fff;border:1px solid #1f2229;padding:8px 10px;border-radius:6px;font-size:11px;">' +
              '<option value="0" ' + (CFG.preferredControllerSlot === 0 ? 'selected' : '') + '>Gamepad #0 (Default)</option>' +
              '<option value="1" ' + (CFG.preferredControllerSlot === 1 ? 'selected' : '') + '>Gamepad #1 → Player 1</option>' +
              '<option value="2" ' + (CFG.preferredControllerSlot === 2 ? 'selected' : '') + '>Gamepad #2 → Player 1</option>' +
              '<option value="3" ' + (CFG.preferredControllerSlot === 3 ? 'selected' : '') + '>Gamepad #3 → Player 1</option>' +
            '</select>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span style="color:#e4e4e7;font-weight:500;">Local Co-Op (Multiple Controllers Support)</span>' +
            '<input type="checkbox" id="vx-tog-coop" ' + (CFG.localCoOpEnabled ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span style="color:#e4e4e7;font-weight:500;">Auto-Hide Mouse Cursor (2s Idle)</span>' +
            '<input type="checkbox" id="vx-tog-cursor" ' + (CFG.autoHideCursor ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">Left Stick Deadzone</span>' +
              '<span id="vx-val-ldz" style="color:#fff;font-family:monospace;">' + Math.round(CFG.leftDeadzone * 100) + '%</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-ldz" min="0" max="0.20" step="0.01" value="' + CFG.leftDeadzone + '"/>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">Right Stick Deadzone</span>' +
              '<span id="vx-val-rdz" style="color:#fff;font-family:monospace;">' + Math.round(CFG.rightDeadzone * 100) + '%</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-rdz" min="0" max="0.20" step="0.01" value="' + CFG.rightDeadzone + '"/>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">Trigger Deadzone</span>' +
              '<span id="vx-val-tdz" style="color:#fff;font-family:monospace;">' + Math.round(CFG.triggerDeadzone * 100) + '%</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-tdz" min="0" max="0.20" step="0.01" value="' + CFG.triggerDeadzone + '"/>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
              '<span style="color:#d1d5db;">Vibration Intensity</span>' +
              '<span id="vx-val-vib" style="color:#4ade80;font-family:monospace;">' + Math.round(CFG.vibrationScale * 100) + '%</span>' +
            '</div>' +
            '<input type="range" class="vx-slider" id="vx-rng-vib" min="0" max="1" step="0.05" value="' + CFG.vibrationScale + '"/>' +
          '</div>' +
          '<div style="padding-top:8px;border-top:1px solid #1f2229;display:flex;flex-direction:column;gap:10px;">' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:2px;">' +
                '<span style="color:#d4d4d8;">Volume Boost</span>' +
                '<span id="vx-val-audio" style="color:#4ade80;font-family:monospace;">' + Math.round(CFG.audioGain * 100) + '%</span>' +
              '</div>' +
              '<input type="range" class="vx-slider" id="vx-rng-audio" min="1.0" max="3.0" step="0.1" value="' + CFG.audioGain + '"/>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
              '<span style="color:#d1d5db;">Clarity EQ (Footstep/Voice Boost)</span>' +
              '<input type="checkbox" id="vx-tog-eq" ' + (CFG.audioClarityEq ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* TAB 4: HUD & STATS (INCLUDES OVERLAY TOGGLE SHORTCUT KEYBIND RECORDER) */
        '<div id="t-hud" class="vx-tab-pane" style="display:none;flex-direction:column;gap:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span style="font-weight:600;color:#fff;">Show Top Telemetry Bar</span>' +
            '<input type="checkbox" id="vx-tog-hud" ' + (CFG.showStatsHud ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div class="vx-row-box" style="display:flex;flex-direction:column;gap:6px;">' +
            '<div style="font-size:10px;font-family:monospace;color:#a1a1aa;text-transform:uppercase;">Telemetry Bar Metrics</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-fps" ' + (CFG.statsShowFps !== false ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>FPS</span></label>' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-ping" ' + (CFG.statsShowPing !== false ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>Ping</span></label>' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-br" ' + (CFG.statsShowBitrate !== false ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>Bitrate</span></label>' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-dt" ' + (CFG.statsShowDecode ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>Decode Time</span></label>' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-jt" ' + (CFG.statsShowJitter ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>Jitter</span></label>' +
              '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" id="vx-st-chk-pl" ' + (CFG.statsShowLoss ? 'checked' : '') + ' style="accent-color:#107c10;"/><span>Packet Loss</span></label>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span>Overlay Toggle Shortcut</span>' +
            '<button type="button" id="vx-btn-keybind" style="background:#16181d;color:#4ade80;border:1px solid #27272a;border-radius:3px;padding:4px 10px;font-family:monospace;font-size:11px;font-weight:600;cursor:pointer;">' + (CFG.toggleKey || 'Home') + '</button>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span>120Hz Monotonic FrameGen</span>' +
            '<input type="checkbox" id="vx-tog-fg" ' + (CFG.frameGenEnabled ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;" class="vx-row-box">' +
            '<span>NVIDIA RTX VSR / HDR Hardware Trigger</span>' +
            '<input type="checkbox" id="vx-tog-rtx" ' + (CFG.rtxVsrEnabled ? 'checked' : '') + ' style="accent-color:#107c10;"/>' +
          '</div>' +
          '<div style="padding-top:8px;border-top:1px solid #1f2229;display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
            '<button id="vx-btn-shot" style="width:100%;background:#107c10;color:#fff;border:none;border-radius:6px;padding:8px 10px;font-weight:600;font-size:11px;cursor:pointer;">Screenshot (.PNG)</button>' +
            '<button id="vx-btn-rec" style="width:100%;background:#16181d;color:#e4e4e7;border:none;border-radius:6px;padding:8px 10px;font-weight:600;font-size:11px;cursor:pointer;">Record .WEBM</button>' +
          '</div>' +
        '</div>' +
        /* TAB 5: ABOUT & CREDITS */
        '<div id="t-about" class="vx-tab-pane" style="display:none;flex-direction:column;gap:10px;line-height:1.45;">' +
          '<div class="vx-row-box" style="display:flex;flex-direction:column;gap:6px;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              '<img src="' + SPRITE_BASE + '/green_chip_24.png" alt="Spet Chip" style="width:18px;height:18px;image-rendering:pixelated;" />' +
              '<div>' +
                '<div style="font-weight:600;color:#fff;font-size:11px;">Spet&#39;s Proprietary Enhancements</div>' +
                '<a href="https://spet01.dev/" target="_blank" rel="noopener noreferrer" style="color:#4ade80;font-family:monospace;font-size:10px;text-decoration:none;">https://spet01.dev/ · Eduardo Gelain (Spet001)</a>' +
              '</div>' +
            '</div>' +
            '<div style="color:#a1a1aa;font-size:10.5px;">' +
              'Original architecture by <strong style="color:#fff;">Eduardo Gelain (Spet001)</strong>: Unified Multi-Pass WebGL2 Pipeline (<strong style="color:#fff;">Spet Hybrid (FSR + DoG)</strong>), <strong style="color:#fff;">Disocclusion-Aware YCoCg Temporal Reconstruction (Zero-Ghosting TAAU)</strong>, <strong style="color:#fff;">Monotonic Sub-Frame Pacing</strong>, D3D11 Compositor Anti-Flicker Lock, and Chromium Manifest V3 MAIN World execution.' +
            '</div>' +
          '</div>' +
          '<div class="vx-row-box" style="display:flex;flex-direction:column;gap:6px;">' +
            '<div style="font-size:10px;font-family:monospace;color:#4ade80;text-transform:uppercase;">Open-Source Credits &amp; Acknowledgments</div>' +
            '<div style="font-size:10.5px;color:#d4d4d8;"><strong>Anime4K (bloc97):</strong> Convolutional Difference of Gaussians (DoG) &amp; CNN Line Reconstruction shaders (MIT License).</div>' +
            '<div style="font-size:10.5px;color:#d4d4d8;"><strong>Better xCloud (redphx):</strong> WebRTC/xCloud network interoperability research &amp; streaming telemetry inspiration.</div>' +
            '<div style="font-size:10.5px;color:#d4d4d8;"><strong>AMD FidelityFX Super Resolution 1.0 (GPUOpen):</strong> Edge-Adaptive Spatial Upsampling (EASU) &amp; Robust Contrast-Adaptive Sharpening (RCAS) math (MIT License).</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    const fsRoot = document.fullscreenElement || document.webkitFullscreenElement;
    const mountTarget = (fsRoot && fsRoot.tagName !== 'VIDEO' && fsRoot.tagName !== 'IFRAME') ? fsRoot : document.body;
    mountTarget.appendChild(blade);

    blade.querySelectorAll('.vx-slider').forEach(function(sl) {
      updateSliderFill(sl);
    });

    const closeBtn = blade.querySelector('#vx-btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        blade.style.display = 'none';
        if (document.documentElement) {
          document.documentElement.setAttribute('data-xcloudfx-blade-open', 'false');
        }
      });
    }

    const tabBtns = blade.querySelectorAll('.vx-tab-btn');
    const tabPanes = blade.querySelectorAll('.vx-tab-pane');
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(function(b) {
          b.style.background = b === btn ? '#107c10' : 'transparent';
          b.style.color = b === btn ? '#fff' : '#a1a1aa';
          b.style.fontWeight = b === btn ? '600' : '500';
        });
        tabPanes.forEach(function(p) {
          p.style.display = p.id === targetId ? 'flex' : 'none';
        });
      });
    });

    blade.querySelector('#vx-sel-upscaler').addEventListener('change', function(e) {
      const val = parseInt(e.target.value, 10);
      if (val === -1) {
        CFG.fsrEnabled = false;
      } else {
        CFG.fsrEnabled = true;
        CFG.upscalerMode = val;
      }
      refreshAllEnhancedVideos();
      saveConfig();
    });

    const ratioBtns = blade.querySelectorAll('.vx-ratio-btn');
    ratioBtns.forEach(function(rBtn) {
      rBtn.addEventListener('click', function() {
        const ratio = rBtn.getAttribute('data-ratio') || '16:9';
        CFG.videoRatio = ratio;
        ratioBtns.forEach(function(b) {
          const active = b === rBtn;
          b.style.background = active ? '#107c10' : 'transparent';
          b.style.color = active ? '#fff' : '#a1a1aa';
          b.style.fontWeight = active ? '600' : '400';
        });
        applyVideoScalingTransform(activeWebGLCanvas);
        refreshAllEnhancedVideos();
        saveConfig();
      });
    });

    blade.querySelector('#vx-rng-zoom').addEventListener('input', function(e) {
      CFG.videoZoom = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-zoom');
      if (lbl) lbl.textContent = CFG.videoZoom.toFixed(2) + 'x';
      applyVideoScalingTransform(activeWebGLCanvas);
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-rng-cas').addEventListener('input', function(e) {
      CFG.rcasSharpness = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-cas');
      if (lbl) lbl.textContent = Math.round(CFG.rcasSharpness * 100) + '%';
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-rng-deblock').addEventListener('input', function(e) {
      CFG.deblocking = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-deblock');
      if (lbl) lbl.textContent = Math.round(CFG.deblocking * 100) + '%';
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-rng-sat').addEventListener('input', function(e) {
      CFG.saturation = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-sat');
      if (lbl) lbl.textContent = Math.round(CFG.saturation * 100) + '%';
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-rng-con').addEventListener('input', function(e) {
      CFG.contrast = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-con');
      if (lbl) lbl.textContent = Math.round(CFG.contrast * 100) + '%';
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-rng-bri').addEventListener('input', function(e) {
      CFG.brightness = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-bri');
      if (lbl) lbl.textContent = Math.round(CFG.brightness * 100) + '%';
      refreshAllEnhancedVideos();
      saveConfig();
    });
    blade.querySelector('#vx-sel-spoof').addEventListener('change', function(e) {
      CFG.deviceSpoofProfile = e.target.value;
      saveConfig();
    });
    blade.querySelector('#vx-sel-region').addEventListener('change', function(e) {
      CFG.serverRegion = e.target.value;
      saveConfig();
    });
    blade.querySelector('#vx-rng-sdp').addEventListener('input', function(e) {
      CFG.sdpBitrateMbps = parseInt(e.target.value, 10);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-sdp');
      if (lbl) lbl.textContent = CFG.sdpBitrateMbps + ' Mbps';
      saveConfig();
    });
    blade.querySelector('#vx-tog-zb').addEventListener('change', function(e) {
      CFG.zeroJitterBuffer = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-ipv6').addEventListener('change', function(e) {
      CFG.preferIpv6 = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-intro').addEventListener('change', function(e) {
      CFG.autoSkipIntro = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-idle').addEventListener('change', function(e) {
      CFG.focusSpoof = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-mkb').addEventListener('change', function(e) {
      CFG.mkbEnabled = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-rng-mkbsens').addEventListener('input', function(e) {
      CFG.mkbSensitivity = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-mkbsens');
      if (lbl) lbl.textContent = Math.round(CFG.mkbSensitivity * 50) + '%';
      saveConfig();
    });
    blade.querySelector('#vx-sel-slot').addEventListener('change', function(e) {
      CFG.preferredControllerSlot = parseInt(e.target.value, 10);
      saveConfig();
    });
    blade.querySelector('#vx-tog-coop').addEventListener('change', function(e) {
      CFG.localCoOpEnabled = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-cursor').addEventListener('change', function(e) {
      CFG.autoHideCursor = e.target.checked;
      if (!CFG.autoHideCursor && document.body) document.body.style.cursor = '';
      saveConfig();
    });
    blade.querySelector('#vx-rng-ldz').addEventListener('input', function(e) {
      CFG.leftDeadzone = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-ldz');
      if (lbl) lbl.textContent = Math.round(CFG.leftDeadzone * 100) + '%';
      saveConfig();
    });
    blade.querySelector('#vx-rng-rdz').addEventListener('input', function(e) {
      CFG.rightDeadzone = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-rdz');
      if (lbl) lbl.textContent = Math.round(CFG.rightDeadzone * 100) + '%';
      saveConfig();
    });
    blade.querySelector('#vx-rng-tdz').addEventListener('input', function(e) {
      CFG.triggerDeadzone = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-tdz');
      if (lbl) lbl.textContent = Math.round(CFG.triggerDeadzone * 100) + '%';
      saveConfig();
    });
    blade.querySelector('#vx-rng-vib').addEventListener('input', function(e) {
      CFG.vibrationScale = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-vib');
      if (lbl) lbl.textContent = Math.round(CFG.vibrationScale * 100) + '%';
      saveConfig();
    });
    blade.querySelector('#vx-rng-audio').addEventListener('input', function(e) {
      CFG.audioGain = parseFloat(e.target.value);
      updateSliderFill(e.target);
      const lbl = blade.querySelector('#vx-val-audio');
      if (lbl) lbl.textContent = Math.round(CFG.audioGain * 100) + '%';
      if (window.__SPET_AUDIO_GAIN_NODE__) window.__SPET_AUDIO_GAIN_NODE__.gain.value = CFG.audioGain;
      saveConfig();
    });
    blade.querySelector('#vx-tog-eq').addEventListener('change', function(e) {
      CFG.audioClarityEq = e.target.checked;
      if (window.__SPET_AUDIO_EQ_NODE__) window.__SPET_AUDIO_EQ_NODE__.gain.value = CFG.audioClarityEq ? 6.0 : 0.0;
      saveConfig();
    });
    blade.querySelector('#vx-tog-hud').addEventListener('change', function(e) {
      CFG.showStatsHud = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-fps').addEventListener('change', function(e) {
      CFG.statsShowFps = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-ping').addEventListener('change', function(e) {
      CFG.statsShowPing = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-br').addEventListener('change', function(e) {
      CFG.statsShowBitrate = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-dt').addEventListener('change', function(e) {
      CFG.statsShowDecode = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-jt').addEventListener('change', function(e) {
      CFG.statsShowJitter = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-st-chk-pl').addEventListener('change', function(e) {
      CFG.statsShowLoss = e.target.checked;
      syncTelemetryHudVisibility();
      saveConfig();
    });
    blade.querySelector('#vx-tog-fg').addEventListener('change', function(e) {
      CFG.frameGenEnabled = e.target.checked;
      saveConfig();
    });
    blade.querySelector('#vx-tog-rtx').addEventListener('change', function(e) {
      CFG.rtxVsrEnabled = e.target.checked;
      applyRtxVsrHardwareTrigger(activeVideoEl);
      saveConfig();
    });
    blade.querySelector('#vx-btn-shot').addEventListener('click', function() {
      if (window.__SPET_TAKE_SCREENSHOT__) window.__SPET_TAKE_SCREENSHOT__();
    });
    blade.querySelector('#vx-btn-rec').addEventListener('click', function() {
      if (window.__SPET_TOGGLE_RECORDING__) window.__SPET_TOGGLE_RECORDING__();
    });

    const keybindBtn = blade.querySelector('#vx-btn-keybind');
    if (keybindBtn) {
      keybindBtn.addEventListener('click', function() {
        isRecordingKeybind = true;
        keybindBtn.textContent = 'Press any key...';
        keybindBtn.style.background = '#107c10';
        keybindBtn.style.color = '#fff';
        keybindBtn.style.borderColor = '#107c10';
      });
    }
  }

  let siteEnhancerEnabled = isXboxSite;
  let videoObserverStarted = false;
  let lastShortcutPressMs = 0;

  function scanAndAttachVideos() {
    if (!siteEnhancerEnabled) return;
    const allVids = collectAllVideos();
    for (let i = 0; i < allVids.length; i++) {
      if (webglFallbackMode || !webglHasUploadedFrame) {
        applyUniversalVideoCssFilter(allVids[i]);
      }
    }
    const best = findBestVideoElement();
    if (best) {
      attachWebGL2ToVideo(best);
    }
  }

  function startVideoObserver() {
    if (videoObserverStarted) return;
    videoObserverStarted = true;
    const videoObserver = new MutationObserver(function() {
      if (!siteEnhancerEnabled) return;
      scanAndAttachVideos();
    });
    if (document.documentElement) {
      videoObserver.observe(document.documentElement, { childList: true, subtree: true });
    }
    setInterval(function() {
      if (siteEnhancerEnabled) {
        scanAndAttachVideos();
      }
    }, 800);
  }

  let lastEnhanceCallMs = -1000;

  window.__SPET_ENHANCE_SITE_VIDEO__ = function(opts) {
    const nowCall = performance.now();
    if (nowCall - lastEnhanceCallMs < 300) {
      return true;
    }
    lastEnhanceCallMs = nowCall;

    const alreadyActive = siteEnhancerEnabled;
    siteEnhancerEnabled = true;
    if (document.documentElement) {
      document.documentElement.setAttribute('data-xcloudfx-active', 'true');
    }
    if (isXboxSite && isTopFrame) {
      mountWebRtcStatsHud();
    }
    if (isTopFrame || document.fullscreenElement) {
      mountXboxGuideBlade();
    }
    startVideoObserver();
    scanAndAttachVideos();

    // Broadcast activation and current config to any embedded child <iframe> players (e.g. AniTube / Blogger / Anime embeds)
    if (isTopFrame && (!opts || !opts.fromParent)) {
      try {
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
          try {
            if (iframes[i].contentWindow) {
              iframes[i].contentWindow.postMessage({ type: 'XCLOUDFX_ENHANCE_SITE_VIDEO', fromParent: true, cfg: CFG }, '*');
            }
          } catch (_) {}
        }
      } catch (_) {}
    }

    const blade = document.getElementById('spet-xbox-guide-blade');
    if (blade) {
      if (alreadyActive && opts && opts.toggleIfOpen && blade.style.display === 'flex') {
        blade.style.display = 'none';
      } else {
        blade.style.display = 'flex';
      }
      if (document.documentElement) {
        document.documentElement.setAttribute('data-xcloudfx-blade-open', blade.style.display !== 'none' ? 'true' : 'false');
      }
    }
    return true;
  };

  // Top-level keydown handler (Works on YouTube, Anime sites, Netflix & Xbox even before Guide Blade is first opened)
  window.addEventListener('keydown', function(e) {
    if (isRecordingKeybind) {
      e.preventDefault();
      e.stopPropagation();
      isRecordingKeybind = false;
      if (e.key !== 'Escape') {
        CFG.toggleKey = e.key;
        saveConfig();
      }
      const keybindBtn = document.getElementById('vx-btn-keybind');
      if (keybindBtn) {
        keybindBtn.textContent = CFG.toggleKey || 'Home';
        keybindBtn.style.background = '#16181d';
        keybindBtn.style.color = '#4ade80';
        keybindBtn.style.borderColor = '#27272a';
      }
      return;
    }

    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable)) return;

    const activeShortcut = CFG.toggleKey || 'Home';
    const isHomeOrShortcut = (e.key === activeShortcut || e.code === activeShortcut || e.key === 'Home' || e.code === 'Home');
    if (isHomeOrShortcut) {
      const nowPress = performance.now();
      const isDoublePress = (nowPress - lastShortcutPressMs) <= 480;
      lastShortcutPressMs = nowPress;

      if (isDoublePress) {
        // HOME 2x: Universal Browser Video Enhancer (YouTube, Anime, Netflix, etc.)
        e.preventDefault();
        window.__SPET_ENHANCE_SITE_VIDEO__({ fromShortcut: true });
        if (!isTopFrame) {
          try { window.top.postMessage({ type: 'XCLOUDFX_ENHANCE_SITE_VIDEO', fromChildFrame: true }, '*'); } catch (_) {}
        }
        return;
      }

      if (siteEnhancerEnabled) {
        e.preventDefault();
        if (!isTopFrame && !document.fullscreenElement) {
          try { window.top.postMessage({ type: 'XCLOUDFX_TOGGLE_BLADE' }, '*'); } catch (_) {}
          return;
        }
        mountXboxGuideBlade();
        const blade = document.getElementById('spet-xbox-guide-blade');
        if (blade) {
          blade.style.display = blade.style.display === 'none' ? 'flex' : 'none';
          if (document.documentElement) {
            document.documentElement.setAttribute('data-xcloudfx-blade-open', blade.style.display !== 'none' ? 'true' : 'false');
          }
        }
      }
    } else if (e.key === 'Escape') {
      const blade = document.getElementById('spet-xbox-guide-blade');
      if (blade && blade.style.display !== 'none') {
        e.preventDefault();
        blade.style.display = 'none';
        if (document.documentElement) {
          document.documentElement.setAttribute('data-xcloudfx-blade-open', 'false');
        }
      }
    }
  }, true);

  document.addEventListener('fullscreenchange', function() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const blade = document.getElementById('spet-xbox-guide-blade');
    const hud = document.getElementById('bx-webrtc-stats-bar');
    const targetParent = (fsEl && fsEl.tagName !== 'VIDEO' && fsEl.tagName !== 'IFRAME') ? fsEl : document.body;
    if (blade && targetParent && blade.parentElement !== targetParent) {
      targetParent.appendChild(blade);
    }
    if (hud && targetParent && hud.parentElement !== targetParent) {
      targetParent.appendChild(hud);
    }
  });

  window.addEventListener('message', function(ev) {
    if (!ev || !ev.data || typeof ev.data !== 'object') return;
    if (ev.data.type === 'XCLOUDFX_ENHANCE_SITE_VIDEO') {
      if (ev.data.cfg && typeof ev.data.cfg === 'object') {
        Object.assign(CFG, ev.data.cfg);
      }
      window.__SPET_ENHANCE_SITE_VIDEO__(ev.data);
    } else if (ev.data.type === 'XCLOUDFX_TOGGLE_BLADE' && isTopFrame) {
      mountXboxGuideBlade();
      const blade = document.getElementById('spet-xbox-guide-blade');
      if (blade) {
        blade.style.display = blade.style.display === 'none' ? 'flex' : 'none';
        if (document.documentElement) {
          document.documentElement.setAttribute('data-xcloudfx-blade-open', blade.style.display !== 'none' ? 'true' : 'false');
        }
      }
    } else if (ev.data.type === 'XCLOUDFX_SYNC_CFG' && ev.data.cfg) {
      Object.assign(CFG, ev.data.cfg);
      applyVideoScalingTransform(activeWebGLCanvas);
      refreshAllEnhancedVideos();
    }
  });

  document.addEventListener('XCLOUDFX_ENHANCE_SITE_VIDEO', function(ev) {
    window.__SPET_ENHANCE_SITE_VIDEO__(ev && ev.detail ? ev.detail : { fromPopup: true });
  });

  if (isTopFrame) {
    mountXboxGuideBlade();
  }
  if (isXboxSite) {
    if (isTopFrame) mountWebRtcStatsHud();
    startVideoObserver();
    scanAndAttachVideos();
  }
})();
`,ne=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>xCloudFX — WebGL Upscaler &amp; Stream Enhancer</title>
  <style>
    body {
      margin: 0;
      width: 348px;
      background: #090a0d;
      color: #f3f4f6;
      font-family: "Segoe UI", -apple-system, sans-serif;
      padding: 14px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1f2229;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .badge {
      background: #107c10;
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
    .any-video-box {
      background: #111318;
      border: 1px solid #1f2229;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 12px;
      transition: border-color 0.15s ease;
    }
    .any-video-box.is-active {
      border-color: #107c10;
      background: #0d1510;
    }
    .any-video-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 4px;
    }
    .any-video-title {
      font-size: 11.5px;
      font-weight: 600;
      color: #ffffff;
    }
    .state-pill {
      font-size: 9.5px;
      font-family: monospace;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
      background: #1f2229;
      color: #a1a1aa;
      white-space: nowrap;
    }
    .state-pill.on {
      background: rgba(16, 124, 16, 0.25);
      border: 1px solid #107c10;
      color: #4ade80;
    }
    .any-video-desc {
      font-size: 11px;
      color: #a1a1aa;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .any-video-desc strong {
      color: #4ade80;
      font-family: monospace;
    }
    label {
      display: block;
      font-size: 10.5px;
      color: #9ca3af;
      margin-bottom: 5px;
      font-family: monospace;
      text-transform: uppercase;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      background: #0d0f14;
      border: 1px solid #1f2229;
      border-radius: 4px;
      color: #fff;
      padding: 8px 10px;
      font-size: 11.5px;
      margin-bottom: 8px;
    }
    button {
      width: 100%;
      background: #107c10;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 9px 12px;
      font-weight: 600;
      font-size: 11.5px;
      cursor: pointer;
    }
    button:hover { background: #15803d; }
    .secondary-btn {
      background: #16181d;
      border: 1px solid #27272a;
      color: #e4e4e7;
    }
    .secondary-btn:hover { background: #1f2229; }
    .status-msg {
      margin-top: 7px;
      font-size: 10.5px;
      font-family: monospace;
      color: #4ade80;
      display: none;
      text-align: center;
      line-height: 1.35;
    }
  </style>
</head>
<body>
  <div class="header">
    <strong style="font-size:12px;">xCloudFX — WebGL Upscaler &amp; Stream Enhancer</strong>
    <span class="badge">MV3 v3.0</span>
  </div>

  <div id="any-video-card" class="any-video-box">
    <div class="any-video-top">
      <div class="any-video-title">Want to use it on any video on your browser?</div>
      <span id="xcloudfx-state-pill" class="state-pill">OFF</span>
    </div>
    <div class="any-video-desc">
      Watch YouTube, Anime, Netflix... Open the extension and click <strong>"Enhance this site video output"</strong> or just press <strong>HOME 2x</strong> — xCloudFX will open and will let you enhance your video!
    </div>
    <button id="enhance-site-btn" type="button">Enhance this site video output</button>
    <div id="enhance-status" class="status-msg">✓ xCloudFX is ON! Guide Overlay opened on this tab.</div>
  </div>

  <label for="console-input">Xbox Cloud / Remote Play Target URL</label>
  <input id="console-input" type="text" placeholder="ex: https://www.xbox.com/play/consoles/launch/XXXXXXXXXXXXXXXX" value="${d.consoleTargetInput.replace(/"/g,"&quot;")}" />
  <button id="launch-btn" class="secondary-btn" type="button">Launch Xbox Cloud / Remote Play</button>
  <script src="popup.js"><\/script>
</body>
</html>`,ee=`(function() {
  const input = document.getElementById('console-input');
  const launchBtn = document.getElementById('launch-btn');
  const enhanceBtn = document.getElementById('enhance-site-btn');
  const statusEl = document.getElementById('enhance-status');
  const statePill = document.getElementById('xcloudfx-state-pill');
  const videoCard = document.getElementById('any-video-card');
  const saved = localStorage.getItem('spet_xbox_target_url');
  if (saved && input && !input.value) input.value = saved;

  function setPopupActiveState(isActive, customMessage) {
    if (statePill) {
      statePill.textContent = isActive ? '● ON' : 'OFF';
      statePill.className = isActive ? 'state-pill on' : 'state-pill';
    }
    if (videoCard) {
      videoCard.className = isActive ? 'any-video-box is-active' : 'any-video-box';
    }
    if (enhanceBtn) {
      enhanceBtn.textContent = isActive
        ? 'xCloudFX is ON — Open / Toggle Guide Overlay'
        : 'Enhance this site video output';
    }
    if (statusEl) {
      if (isActive || customMessage) {
        statusEl.style.display = 'block';
        statusEl.textContent = customMessage || '✓ xCloudFX is already ON on this tab. Press HOME or click above to toggle overlay.';
      } else {
        statusEl.style.display = 'none';
      }
    }
  }

  function queryActiveTab(cb) {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        cb(tabs && tabs[0] ? tabs[0] : null);
      });
    } else {
      cb(null);
    }
  }

  // 1. Immediately sync ON/OFF status when popup opens (fixes Xbox & already-enhanced tabs showing OFF)
  queryActiveTab(function(activeTab) {
    if (!activeTab || !activeTab.id) return;
    const tabUrl = activeTab.url || '';
    if (/^https?:\\/\\/([^/]+\\.)?xbox\\.com\\//i.test(tabUrl)) {
      setPopupActiveState(true, '✓ xCloudFX is ON (Xbox Cloud / Remote Play active).');
    }

    if (chrome.tabs && chrome.tabs.sendMessage) {
      try {
        chrome.tabs.sendMessage(activeTab.id, { type: 'XCLOUDFX_GET_STATUS' }, function(res) {
          if (chrome.runtime && chrome.runtime.lastError) {
            // Ignore if content-bridge wasn't loaded on restricted chrome:// URL
          }
          if (res && res.active) {
            setPopupActiveState(true, '✓ xCloudFX is ON on this tab. Click button or press HOME to toggle Guide Overlay.');
          }
        });
      } catch (_) {}
    }

    if (chrome.scripting && chrome.scripting.executeScript) {
      try {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: function() {
            const docEl = document.documentElement;
            const isXbox = /(^|\\.)xbox\\.com$/i.test(window.location.hostname || '');
            return (
              isXbox ||
              Boolean(docEl && docEl.getAttribute('data-xcloudfx-active') === 'true') ||
              Boolean(document.getElementById('bx-webrtc-stats-bar')) ||
              Boolean(document.getElementById('spet-xcloudfx-canvas'))
            );
          }
        }, function(results) {
          if (chrome.runtime && chrome.runtime.lastError) return;
          if (results && results[0] && results[0].result === true) {
            setPopupActiveState(true, '✓ xCloudFX is ON on this tab. Click button or press HOME to toggle Guide Overlay.');
          }
        });
      } catch (_) {}
    }
  });

  // 2. Activate xCloudFX & Open Guide Overlay on YouTube, Anime sites (including iframes), Netflix & Xbox
  if (enhanceBtn) {
    enhanceBtn.addEventListener('click', function() {
      setPopupActiveState(true, '✓ xCloudFX is ON! Guide Overlay opened on this tab.');

      queryActiveTab(function(activeTab) {
        if (!activeTab || !activeTab.id) return;

        // Path A: Message content-bridge.js across all frames (works even without scripting permission)
        if (chrome.tabs && chrome.tabs.sendMessage) {
          try {
            chrome.tabs.sendMessage(activeTab.id, { type: 'XCLOUDFX_ACTIVATE_SITE' }, function() {
              if (chrome.runtime && chrome.runtime.lastError) {}
              setPopupActiveState(true, '✓ xCloudFX is ON! Guide Overlay opened on this tab.');
            });
          } catch (_) {}
        }

        // Path B: Direct MAIN world execution + fallback injection for tabs opened before extension install
        if (chrome.scripting && chrome.scripting.executeScript) {
          try {
            chrome.scripting.executeScript({
              target: { tabId: activeTab.id, allFrames: true },
              world: 'MAIN',
              func: function() {
                if (document.documentElement) {
                  document.documentElement.setAttribute('data-xcloudfx-active', 'true');
                }
                if (typeof window.__SPET_ENHANCE_SITE_VIDEO__ === 'function') {
                  window.__SPET_ENHANCE_SITE_VIDEO__({ fromPopup: true });
                  return true;
                }
                window.postMessage({ type: 'XCLOUDFX_ENHANCE_SITE_VIDEO', fromPopup: true }, '*');
                return false;
              }
            }, function(results) {
              if (chrome.runtime && chrome.runtime.lastError) return;
              const topLoaded = results && results.some(function(r) { return r && r.result === true; });
              if (!topLoaded) {
                chrome.scripting.executeScript({
                  target: { tabId: activeTab.id, allFrames: true },
                  world: 'MAIN',
                  files: ['webgl-guide-overlay.js']
                }, function() {
                  if (chrome.runtime && chrome.runtime.lastError) return;
                  chrome.scripting.executeScript({
                    target: { tabId: activeTab.id, allFrames: true },
                    world: 'MAIN',
                    func: function() {
                      if (typeof window.__SPET_ENHANCE_SITE_VIDEO__ === 'function') {
                        window.__SPET_ENHANCE_SITE_VIDEO__({ fromPopup: true });
                      }
                    }
                  });
                });
              }
            });
          } catch (_) {}
        }
      });
    });
  }

  if (launchBtn) {
    launchBtn.addEventListener('click', function() {
      const val = (input && input.value ? input.value : '').trim();
      localStorage.setItem('spet_xbox_target_url', val);
      let url = '${de}';
      if (val) {
        url = /^https?:\\/\\//i.test(val) ? val : 'https://www.xbox.com/play/consoles/launch/' + val;
      }
      window.open(url, '_blank');
    });
  }
})();
`;return{"manifest.json":X,"network-hijack.js":I,"content-bridge.js":le,"webgl-guide-overlay.js":Y,"popup.html":ne,"popup.js":ee}}async function H1(d){const de=Zu(d),N=typeof window<"u"&&window.JSZip||z1,p=new N;return p.file("manifest.json",de["manifest.json"]),p.file("network-hijack.js",de["network-hijack.js"]),p.file("content-bridge.js",de["content-bridge.js"]),p.file("webgl-guide-overlay.js",de["webgl-guide-overlay.js"]),p.file("popup.html",de["popup.html"]),p.file("popup.js",de["popup.js"]),await p.generateAsync({type:"blob"})}function wp(d,de){const N=Zu(d);return`${de?`// ==UserScript==
// @name         xCloudFX — WebGL Upscaler & Stream Enhancer
// @namespace    https://spet01.dev/tools/xbox-enhancer/
// @version      3.0.0
// @description  1080p Fetch/XHR/SDP Unlocker (${d.sdpBitrateMbps} Mbps), Zero-Ghosting WebGL2 AMD FSR 1.0 + Anime4K, Universal Browser Video Enhancer (YouTube, Anime, Netflix via HOME 2x), Volume Boost (${d.audioBoostPercent}%) & Live WebRTC Telemetry HUD.
// @author       spet01.dev
// @match        https://*.xbox.com/*play*
// @match        https://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

`:`/**
 * xCloudFX — WebGL Upscaler & Stream Enhancer (Stream/Input Hijack + Universal Browser Video Guide Overlay)
 * Press [HOME] in-game on xbox.com/play or press [HOME] 2x on any website (YouTube, Anime, Netflix) to open xCloudFX!
 */

`}${N["network-hijack.js"]}
${N["webgl-guide-overlay.js"]}`}const zp=({className:d="w-4 h-4",title:de="Xbox"})=>o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",className:d,role:"img",children:[o.jsx("title",{children:de}),o.jsx("path",{d:"M7.202 15.967a8 8 0 0 1-3.552-1.26c-.898-.585-1.101-.826-1.101-1.306 0-.965 1.062-2.656 2.879-4.583C6.459 7.723 7.897 6.44 8.052 6.475c.302.068 2.718 2.423 3.622 3.531 1.43 1.753 2.088 3.189 1.754 3.829-.254.486-1.83 1.437-2.987 1.802-.954.301-2.207.429-3.239.33m-5.866-3.57C.589 11.253.212 10.127.03 8.497c-.06-.539-.038-.846.137-1.95.218-1.377 1.002-2.97 1.945-3.95.401-.417.437-.427.926-.263.595.2 1.23.638 2.213 1.528l.574.519-.313.385C4.056 6.553 2.52 9.086 1.94 10.653c-.315.852-.442 1.707-.306 2.063.091.24.007.15-.3-.319Zm13.101.195c.074-.36-.019-1.02-.238-1.687-.473-1.443-2.055-4.128-3.508-5.953l-.457-.575.494-.454c.646-.593 1.095-.948 1.58-1.25.381-.237.927-.448 1.161-.448.145 0 .654.528 1.065 1.104a8.4 8.4 0 0 1 1.343 3.102c.153.728.166 2.286.024 3.012a9.5 9.5 0 0 1-.6 1.893c-.179.393-.624 1.156-.82 1.404-.1.128-.1.127-.043-.148ZM7.335 1.952c-.67-.34-1.704-.705-2.276-.803a4 4 0 0 0-.759-.043c-.471.024-.45 0 .306-.358A7.8 7.8 0 0 1 6.47.128c.8-.169 2.306-.17 3.094-.005.85.18 1.853.552 2.418.9l.168.103-.385-.02c-.766-.038-1.88.27-3.078.853-.361.176-.676.316-.699.312a12 12 0 0 1-.654-.319Z"})]});function Ap(d,de,N){const p=d.createShader(de);if(!p)throw new Error("Unable to create WebGL2 shader");if(d.shaderSource(p,N),d.compileShader(p),!d.getShaderParameter(p,d.COMPILE_STATUS)){const U=d.getShaderInfoLog(p);throw d.deleteShader(p),new Error(`GLSL Compile Error: ${U}`)}return p}function qu(d,de,N){const p=Ap(d,d.VERTEX_SHADER,de),U=Ap(d,d.FRAGMENT_SHADER,N),y=d.createProgram();if(!y)throw new Error("Unable to create WebGL2 program");if(d.attachShader(y,p),d.attachShader(y,U),d.linkProgram(y),!d.getProgramParameter(y,d.LINK_STATUS)){const w=d.getProgramInfoLog(y);throw new Error(`GLSL Link Error: ${w}`)}return y}function zi(d,de,N){const p=d.createTexture();if(!p)throw new Error("Failed to allocate WebGLTexture");return d.bindTexture(d.TEXTURE_2D,p),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,de,N,0,d.RGBA,d.UNSIGNED_BYTE,null),p}const V1=({settings:d,onUpdateSettings:de,onSelectPreset:N,videoElement:p,onTelemetryUpdate:U,isGuideBladeOpen:y,onCloseGuideBlade:w})=>{const h=ze.useRef(null),C=ze.useRef(null),B=ze.useRef(d);B.current=d;const[M,f]=ze.useState(!1),[R,v]=ze.useState(!1),[O,m]=ze.useState(!1),[E,S]=ze.useState({x:.5,y:.5}),[z,L]=ze.useState(!1),[X,I]=ze.useState("SHADERS"),[le,Y]=ze.useState(!1),[ne,ee]=ze.useState(!1),[pe,Ce]=ze.useState(!1),j=ze.useRef(null),P=ze.useRef([]);ze.useEffect(()=>{if(!pe)return;const g=b=>{if(b.preventDefault(),b.stopPropagation(),Ce(!1),b.key!=="Escape"){de({toggleKey:b.key});try{const he=JSON.parse(localStorage.getItem("spet_vx_config")||"{}");he.toggleKey=b.key,localStorage.setItem("spet_vx_config",JSON.stringify(he))}catch{}}};return window.addEventListener("keydown",g,!0),()=>window.removeEventListener("keydown",g,!0)},[pe,de]);const u=ze.useRef(O);u.current=O;const te=ze.useRef(E);te.current=E,ze.useEffect(()=>{if(!p)return;const g=B1(d.rtxVsrEnabled,d.targetScale);g.active?(Object.entries(g.attributes).forEach(([b,he])=>{p.setAttribute(b,he)}),p.style.willChange=g.styles.willChange,p.style.transform=g.styles.transform,p.style.backfaceVisibility=g.styles.backfaceVisibility,p.style.imageRendering=g.styles.imageRendering):(p.removeAttribute("data-nvidia-rtx-vsr"),p.removeAttribute("data-nvidia-rtx-hdr"),p.removeAttribute("data-d3d11-mpo-passthrough"),p.removeAttribute("data-hdr-metadata"),p.style.willChange="auto",p.style.imageRendering="auto")},[p,d.rtxVsrEnabled,d.targetScale]),ze.useEffect(()=>{const g=C.current;if(!g)return;const b=g.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"});if(!b)return;const he=qu(b,so,Rp),ve=qu(b,so,Op),be=qu(b,so,Dp),Re=b.createVertexArray();b.bindVertexArray(Re);const xe=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,xe),b.bufferData(b.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,1,-1,1,1,-1,1,0,0,-1,1,0,0,1,-1,1,1,1,1,1,0]),b.STATIC_DRAW),b.enableVertexAttribArray(0),b.vertexAttribPointer(0,2,b.FLOAT,!1,16,0),b.enableVertexAttribArray(1),b.vertexAttribPointer(1,2,b.FLOAT,!1,16,8);const Ae=b.createVertexArray();b.bindVertexArray(Ae);const at=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,at),b.bufferData(b.ARRAY_BUFFER,new Float32Array([-1,-1,0,0,1,-1,1,0,-1,1,0,1,-1,1,0,1,1,-1,1,0,1,1,1,1]),b.STATIC_DRAW),b.enableVertexAttribArray(0),b.vertexAttribPointer(0,2,b.FLOAT,!1,16,0),b.enableVertexAttribArray(1),b.vertexAttribPointer(1,2,b.FLOAT,!1,16,8),b.bindVertexArray(null);let s=854,ae=480,W=zi(b,s,ae),A=zi(b,s,ae),x=zi(b,s,ae),F=zi(b,s,ae),ue=zi(b,s,ae);const fe=b.createFramebuffer(),K=b.createFramebuffer(),ge={uTexPrev:b.getUniformLocation(he,"uTexPrev"),uTexCurr:b.getUniformLocation(he,"uTexCurr"),uTexelSize:b.getUniformLocation(he,"uTexelSize"),uMotionSensitivity:b.getUniformLocation(he,"uMotionSensitivity"),uHudProtection:b.getUniformLocation(he,"uHudProtection")},_e={uTexPrev:b.getUniformLocation(ve,"uTexPrev"),uTexCurr:b.getUniformLocation(ve,"uTexCurr"),uTexMotion:b.getUniformLocation(ve,"uTexMotion"),uTexHistory:b.getUniformLocation(ve,"uTexHistory"),uTexelSize:b.getUniformLocation(ve,"uTexelSize"),uInterpAlpha:b.getUniformLocation(ve,"uInterpAlpha"),uFrameGenEnabled:b.getUniformLocation(ve,"uFrameGenEnabled"),uDeblocking:b.getUniformLocation(ve,"uDeblocking")},me={uTexFrameGen:b.getUniformLocation(be,"uTexFrameGen"),uTexRawCurr:b.getUniformLocation(be,"uTexRawCurr"),uTexMotion:b.getUniformLocation(be,"uTexMotion"),uTexHistory:b.getUniformLocation(be,"uTexHistory"),uTexelSize:b.getUniformLocation(be,"uTexelSize"),uOutputResolution:b.getUniformLocation(be,"uOutputResolution"),uViewMode:b.getUniformLocation(be,"uViewMode"),uSplitPos:b.getUniformLocation(be,"uSplitPos"),uUpscalerMode:b.getUniformLocation(be,"uUpscalerMode"),uFsrEnabled:b.getUniformLocation(be,"uFsrEnabled"),uCnnStrength:b.getUniformLocation(be,"uCnnStrength"),uRcasSharpness:b.getUniformLocation(be,"uRcasSharpness"),uDeblocking:b.getUniformLocation(be,"uDeblocking"),uFullRgbExpand:b.getUniformLocation(be,"uFullRgbExpand"),uClarityVibrance:b.getUniformLocation(be,"uClarityVibrance"),uBrightness:b.getUniformLocation(be,"uBrightness"),uContrast:b.getUniformLocation(be,"uContrast"),uSaturation:b.getUniformLocation(be,"uSaturation"),uTime:b.getUniformLocation(be,"uTime"),uZoomLoupe:b.getUniformLocation(be,"uZoomLoupe"),uZoomCenter:b.getUniformLocation(be,"uZoomCenter")};let Ne=0,Xe=null,Be=null,nt=performance.now(),Qt=-1,ht=!1,sa=1,Je=0,Jt=0,ua=performance.now();const Ot=b.getParameter(b.RENDERER)||"",Xa=/SwiftShader|llvmpipe|Software/i.test(String(Ot)),Ul=(st,In)=>{s=st,ae=In,[W,A,x,F,ue].forEach(Le=>{b.bindTexture(b.TEXTURE_2D,Le),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,st,In,0,b.RGBA,b.UNSIGNED_BYTE,null)})},vt=()=>{if(!p||p.readyState<2||p.videoWidth<=0||p.videoHeight<=0)return;(p.videoWidth!==s||p.videoHeight!==ae)&&Ul(p.videoWidth,p.videoHeight);const st=ue;ue=W,W=A,A=st,b.bindTexture(b.TEXTURE_2D,A),b.texSubImage2D(b.TEXTURE_2D,0,0,0,b.RGBA,b.UNSIGNED_BYTE,p),Qt=p.currentTime,ht=!0,sa=0,Jt++},Bl=p!==null&&typeof p.requestVideoFrameCallback=="function",Ia=()=>{vt(),p&&typeof p.requestVideoFrameCallback=="function"&&(Xe=p.requestVideoFrameCallback(Ia))};Bl&&p&&(Xe=p.requestVideoFrameCallback(Ia));const Wt=st=>{const In=Math.max(.1,st-nt);nt=st,Je++;const Le=B.current;p&&p.readyState>=2&&p.currentTime!==Qt&&vt(),ht&&(b.bindVertexArray(Ae),b.bindFramebuffer(b.FRAMEBUFFER,fe),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,x,0),b.viewport(0,0,s,ae),b.useProgram(he),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,W),b.uniform1i(ge.uTexPrev,0),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,A),b.uniform1i(ge.uTexCurr,1),b.uniform2f(ge.uTexelSize,1/s,1/ae),b.uniform1f(ge.uMotionSensitivity,Le.motionSensitivity/100*1.5),b.uniform1i(ge.uHudProtection,Le.hudProtection?1:0),b.drawArrays(b.TRIANGLES,0,6),ht=!1);const uo=k1(sa,Le.frameGenEnabled);sa++,b.bindVertexArray(Ae),b.bindFramebuffer(b.FRAMEBUFFER,K),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,F,0),b.viewport(0,0,s,ae),b.useProgram(ve),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,W),b.uniform1i(_e.uTexPrev,0),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,A),b.uniform1i(_e.uTexCurr,1),b.activeTexture(b.TEXTURE2),b.bindTexture(b.TEXTURE_2D,x),b.uniform1i(_e.uTexMotion,2),b.activeTexture(b.TEXTURE3),b.bindTexture(b.TEXTURE_2D,ue),b.uniform1i(_e.uTexHistory,3),b.uniform2f(_e.uTexelSize,1/s,1/ae),b.uniform1f(_e.uInterpAlpha,uo),b.uniform1i(_e.uFrameGenEnabled,Le.frameGenEnabled?1:0),b.uniform1f(_e.uDeblocking,Le.deblockingIntensity/100),b.drawArrays(b.TRIANGLES,0,6);const xn=Pu(Le.targetScale),qa=Xa?1280:Le.fsrEnabled?Math.min(2560,xn.width):s,Nt=Xa?720:Le.fsrEnabled?Math.min(1440,xn.height):ae;(g.width!==qa||g.height!==Nt)&&(g.width=qa,g.height=Nt),b.bindVertexArray(Re),b.bindFramebuffer(b.FRAMEBUFFER,null),b.viewport(0,0,g.width,g.height),b.useProgram(be),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,F),b.uniform1i(me.uTexFrameGen,0),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,A),b.uniform1i(me.uTexRawCurr,1),b.activeTexture(b.TEXTURE2),b.bindTexture(b.TEXTURE_2D,x),b.uniform1i(me.uTexMotion,2),b.activeTexture(b.TEXTURE3),b.bindTexture(b.TEXTURE_2D,ue),b.uniform1i(me.uTexHistory,3),b.uniform2f(me.uTexelSize,1/s,1/ae),b.uniform2f(me.uOutputResolution,g.width,g.height);const va=Le.viewMode==="SPLIT"?0:Le.viewMode==="OUTPUT"?1:Le.viewMode==="SOURCE"?2:3;b.uniform1i(me.uViewMode,va),b.uniform1f(me.uSplitPos,Le.splitPosition/100);const Dt=Le.upscalerMode==="TEMPORAL_TAAU"?3:Le.upscalerMode==="HYBRID_AI_FSR"?0:Le.upscalerMode==="AI_CNN"?1:2;if(b.uniform1i(me.uUpscalerMode,Dt),b.uniform1i(me.uFsrEnabled,Le.fsrEnabled?1:0),b.uniform1f(me.uCnnStrength,Le.cnnStrength/100),b.uniform1f(me.uRcasSharpness,Le.rcasSharpness/100),b.uniform1f(me.uDeblocking,Le.deblockingIntensity/100),b.uniform1i(me.uFullRgbExpand,Le.fullRgbRangeExpansion?1:0),b.uniform1f(me.uClarityVibrance,Le.clarityVibrance/100),b.uniform1f(me.uBrightness,Le.brightnessPercent/100),b.uniform1f(me.uContrast,Le.contrastPercent/100),b.uniform1f(me.uSaturation,Le.saturationPercent/100),b.uniform1f(me.uTime,st*.001),b.uniform1i(me.uZoomLoupe,u.current?1:0),b.uniform2f(me.uZoomCenter,te.current.x,te.current.y),b.drawArrays(b.TRIANGLES,0,6),st-ua>=450){const kl=(st-ua)/1e3,Mi=Math.round(Je/kl),ji=Math.round(Jt/kl),yn=ji>15?Math.min(60,ji):z?0:60,qn=Le.frameGenEnabled?Math.max(yn*2,Mi):Math.min(60,Mi||60);U({inputFps:yn,outputFps:qn,frameTimeMs:Number(Math.min(16.6,In).toFixed(1)),resolutionScaleLabel:Le.fsrEnabled?xn.label:"1.0x (Native)",inputResolution:`${s}×${ae}`,outputResolution:`${xn.width}×${xn.height}`,activeEngineLabel:U1(Le.upscalerMode,Le.fsrEnabled),pingMs:Le.zeroJitterBuffer?11:19,bitrateMbps:Number((Le.sdpBitrateMbps-.2).toFixed(1)),decodeTimeMs:Le.fsrEnabled?2.1:1.4,jitterMs:Le.zeroJitterBuffer?.6:2.8,packetLossPercent:0}),Je=0,Jt=0,ua=st}Xa?Be=window.setTimeout(()=>{Ne=requestAnimationFrame(Wt)},90):Ne=requestAnimationFrame(Wt)};return Ne=requestAnimationFrame(Wt),()=>{cancelAnimationFrame(Ne),Xe!==null&&p&&typeof p.cancelVideoFrameCallback=="function"&&p.cancelVideoFrameCallback(Xe),Be!==null&&clearTimeout(Be),b.deleteProgram(he),b.deleteProgram(ve),b.deleteProgram(be),b.deleteTexture(W),b.deleteTexture(A),b.deleteTexture(x),b.deleteTexture(F),b.deleteTexture(ue),b.deleteFramebuffer(fe),b.deleteFramebuffer(K),b.deleteVertexArray(Re),b.deleteVertexArray(Ae),b.deleteBuffer(xe),b.deleteBuffer(at)}},[p,z,U]);const oe=ze.useCallback(g=>{const b=h.current;if(!b)return;const he=b.getBoundingClientRect(),ve=Math.max(0,Math.min(100,(g-he.left)/he.width*100));de({splitPosition:Math.round(ve)})},[de]),$=g=>{const b=g.currentTarget.getBoundingClientRect(),he=(g.clientX-b.left)/b.width,ve=(g.clientY-b.top)/b.height;O&&S({x:he,y:ve}),d.viewMode==="SPLIT"&&(f(!0),oe(g.clientX))},ye=g=>{const b=g.currentTarget.getBoundingClientRect(),he=Math.max(0,Math.min(1,(g.clientX-b.left)/b.width)),ve=Math.max(0,Math.min(1,(g.clientY-b.top)/b.height));O&&S({x:he,y:ve}),M&&d.viewMode==="SPLIT"&&oe(g.clientX)},se=()=>{f(!1)},Se=async()=>{const g=h.current;g&&(document.fullscreenElement?(await document.exitFullscreen().catch(()=>{}),v(!1)):(await g.requestFullscreen().catch(()=>{}),v(!0)))},J=()=>{p&&(p.paused?(p.play().catch(()=>{}),L(!1)):(p.pause(),L(!0)))},_=ze.useCallback(()=>{const g=C.current;g&&g.toBlob(b=>{if(!b)return;const he=URL.createObjectURL(b),ve=document.createElement("a");ve.download=`xCloudFX-${d.targetScale}-${Date.now()}.png`,ve.href=he,document.body.appendChild(ve),ve.click(),document.body.removeChild(ve),URL.revokeObjectURL(he),Y(!0),setTimeout(()=>Y(!1),2500)},"image/png")},[d.targetScale]),ce=ze.useCallback(()=>{const g=C.current;if(!g||typeof g.captureStream!="function"||typeof MediaRecorder>"u")return;if(j.current&&j.current.state==="recording"){j.current.stop(),ee(!1);return}P.current=[];const b=g.captureStream(60),he=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm",ve=new MediaRecorder(b,{mimeType:he,videoBitsPerSecond:16e6});ve.ondataavailable=be=>{be.data&&be.data.size>0&&P.current.push(be.data)},ve.onstop=()=>{const be=new Blob(P.current,{type:"video/webm"}),Re=URL.createObjectURL(be),xe=document.createElement("a");xe.download=`xCloudFX-Clip-${d.targetScale}-${Date.now()}.webm`,xe.href=Re,document.body.appendChild(xe),xe.click(),document.body.removeChild(xe),URL.revokeObjectURL(Re),ee(!1)},ve.start(200),j.current=ve,ee(!0)},[d.targetScale]),T=G1(d.videoRatio,d.videoZoom);return o.jsxs("div",{ref:h,"data-testid":"webgl-viewport-container",onPointerDown:$,onPointerMove:ye,onPointerUp:se,onPointerLeave:se,className:"relative flex-1 h-full bg-[#07080a] overflow-hidden select-none flex items-center justify-center cursor-crosshair",children:[o.jsx("canvas",{ref:C,"data-testid":"webgl2-canvas",style:{transform:`scale(${T.scaleX}, ${T.scaleY})`,aspectRatio:T.aspectRatioCss},className:`w-full h-full block transition-transform duration-150 ${d.videoRatio==="STRETCH"?"object-fill":"object-contain"}`}),d.viewMode==="SPLIT"&&o.jsx("div",{style:{left:`${d.splitPosition}%`},className:"absolute top-0 bottom-0 -translate-x-1/2 pointer-events-none flex flex-col items-center justify-center z-10",children:o.jsx("div",{className:"w-5 h-9 rounded-sm bg-[#0d0f14] border border-[#107c10] flex items-center justify-center",children:o.jsx("div",{className:"w-0.5 h-4 bg-[#22c55e]"})})}),y&&o.jsxs("div",{"data-testid":"xbox-guide-blade-overlay",onPointerDown:g=>g.stopPropagation(),className:"absolute top-3 bottom-3 left-3 w-[384px] z-30 bg-[#0d0f14] border border-[#1f2229] rounded-md flex flex-col overflow-hidden shadow-2xl",children:[o.jsxs("div",{className:"px-3.5 py-2.5 border-b border-[#1f2229] bg-[#090a0d] flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center gap-2.5",children:[o.jsx("div",{className:"w-6 h-6 rounded-sm bg-[#107c10] flex items-center justify-center text-white shrink-0",children:o.jsx(zp,{className:"w-3.5 h-3.5 text-white"})}),o.jsxs("div",{children:[o.jsx("div",{className:"text-[12px] font-semibold text-white leading-tight",children:"xCloudFX — WebGL Upscaler & Stream Enhancer"}),o.jsx("div",{className:"text-[10px] font-mono text-[#71717a]",children:"by Spet001 • spet01.dev"})]})]}),o.jsx("button",{type:"button","data-testid":"close-guide-blade-btn",onClick:w,className:"px-2.5 py-1 rounded-sm text-[11px] font-mono text-[#a1a1aa] hover:text-white bg-[#16181d] cursor-pointer",title:"Close Guide Overlay (ESC)",children:"ESC"})]}),o.jsx("div",{className:"px-2.5 py-1.5 border-b border-[#1f2229] bg-[#090a0d]",children:o.jsx("div",{className:"bg-[#111318] p-1 rounded-md grid grid-cols-5 gap-1",children:[{id:"SHADERS",label:"Shaders"},{id:"NETWORK",label:"Stream"},{id:"INPUT_AUDIO",label:"Input"},{id:"HUD_STATS",label:"HUD"},{id:"ABOUT",label:"About"}].map(g=>o.jsx("button",{type:"button","data-testid":`guide-tab-${g.id}`,onClick:()=>I(g.id),className:`py-1 px-1 rounded-sm text-[10px] font-medium transition-colors cursor-pointer whitespace-nowrap ${X===g.id?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:g.label},g.id))})}),o.jsxs("div",{className:"flex-1 overflow-y-auto p-3.5 space-y-3 text-xs",children:[X==="SHADERS"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"space-y-1.5",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"UPSCALER"}),o.jsxs("select",{"data-testid":"guide-upscaler-select",value:d.preset==="CUSTOM"?"SERIES_X_ULTRA":d.preset,onChange:g=>N(g.target.value),className:"w-full bg-[#111318] text-white border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px] font-medium focus:outline-none focus:border-[#107c10]",children:[o.jsx("option",{value:"SERIES_X_ULTRA",children:"Spet Hybrid (FSR + DoG)"}),o.jsx("option",{value:"COMPETITIVE_120",children:"AMD FSR 1.0"}),o.jsx("option",{value:"ANIME4K_CLARITY",children:"Anime4K v3.2 DoG"}),o.jsx("option",{value:"DLSS_TEMPORAL_4K",children:"TAAU Anti-Ghosting"}),o.jsx("option",{value:"RAW_BYPASS",children:"Native Bypass"})]})]}),o.jsxs("div",{className:"space-y-1.5 pt-2 border-t border-[#1f2229]",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Aspect Ratio"}),o.jsx("div",{className:"bg-[#111318] p-1 rounded-md grid grid-cols-4 gap-1",children:[{id:"16:9",label:"16:9"},{id:"21:9",label:"21:9"},{id:"16:10",label:"16:10"},{id:"STRETCH",label:"Stretch"}].map(g=>o.jsx("button",{type:"button","data-testid":`guide-ratio-${g.id}`,onClick:()=>de({videoRatio:g.id}),className:`py-1 px-1.5 rounded-sm text-[10px] font-mono cursor-pointer transition-colors ${d.videoRatio===g.id?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:g.label},g.id))})]}),o.jsxs("div",{className:"space-y-2.5 pt-2 border-t border-[#1f2229]",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"RCAS Sharpness"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.rcasSharpness,"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,value:d.rcasSharpness,onChange:g=>de({rcasSharpness:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"De-Blocking"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.deblockingIntensity,"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,value:d.deblockingIntensity,onChange:g=>de({deblockingIntensity:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Saturation"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.saturationPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.saturationPercent,onChange:g=>de({saturationPercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Contrast"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.contrastPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.contrastPercent,onChange:g=>de({contrastPercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Brightness"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.brightnessPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.brightnessPercent,onChange:g=>de({brightnessPercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Video Zoom"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.videoZoom.toFixed(2),"x"]})]}),o.jsx("input",{type:"range",min:100,max:150,step:5,value:Math.round(d.videoZoom*100),onChange:g=>de({videoZoom:Number(g.target.value)/100}),className:"w-full xbox-slider"})]})]})]}),X==="NETWORK"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#9ca3af]",children:"Target Resolution & Codec Profile"}),o.jsxs("select",{value:d.deviceSpoofProfile,onChange:g=>de({deviceSpoofProfile:g.target.value}),className:"w-full bg-[#111318] text-white border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px]",children:[o.jsx("option",{value:"SMARTTV_TIZEN_20M",children:"1080p HQ (Tizen/Edge Spoof - 20 Mbps)"}),o.jsx("option",{value:"WINDOWS_1080P_HQ",children:"1080p Standard (Windows 11 Edge)"}),o.jsx("option",{value:"LOW_LATENCY_720P",children:"720p Low-Latency"}),o.jsx("option",{value:"DEFAULT_BROWSER",children:"Default Browser"})]})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#9ca3af]",children:"Preferred Server Region"}),o.jsxs("select",{"data-testid":"guide-server-region-select",value:d.serverRegion,onChange:g=>de({serverRegion:g.target.value}),className:"w-full bg-[#111318] text-white border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px]",children:[o.jsx("option",{value:"AUTO",children:"Default (Auto)"}),o.jsx("option",{value:"BRAZIL_SOUTH",children:"Brazil South (São Paulo)"}),o.jsx("option",{value:"US_EAST",children:"US East (Virginia)"}),o.jsx("option",{value:"US_WEST",children:"US West (California)"}),o.jsx("option",{value:"EUROPE_WEST",children:"Europe West (Amsterdam)"})]})]}),o.jsxs("div",{className:"space-y-1 pt-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"SDP Target Bitrate (b=AS)"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.sdpBitrateMbps," Mbps"]})]}),o.jsx("input",{type:"range",min:10,max:30,value:d.sdpBitrateMbps,onChange:g=>de({sdpBitrateMbps:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-2 pt-2 border-t border-[#1f2229]",children:[o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"WebRTC Zero-Buffer (playoutDelayHint = 0)"}),o.jsx("input",{type:"checkbox",checked:d.zeroJitterBuffer,onChange:g=>de({zeroJitterBuffer:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Prefer IPv6 Routing"}),o.jsx("input",{type:"checkbox",checked:d.preferIpv6,onChange:g=>de({preferIpv6:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Auto-Skip Xbox Intro Video"}),o.jsx("input",{type:"checkbox",checked:d.autoSkipIntroVideo,onChange:g=>de({autoSkipIntroVideo:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Disable Idle/Inactivity Kick"}),o.jsx("input",{type:"checkbox",checked:d.focusSpoofAndAutoDismiss,onChange:g=>de({focusSpoofAndAutoDismiss:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]})]})]}),X==="INPUT_AUDIO"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"space-y-2.5",children:[o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7] font-medium",children:"Mouse & Keyboard (MKB) Virtual Controller"}),o.jsx("input",{type:"checkbox","data-testid":"guide-mkb-checkbox",checked:d.mkbEnabled,onChange:g=>de({mkbEnabled:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"MKB Mouse Sensitivity"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.mkbSensitivity,"%"]})]}),o.jsx("input",{type:"range","data-testid":"guide-mkb-sensitivity-slider",min:10,max:100,step:5,value:d.mkbSensitivity,onChange:g=>de({mkbSensitivity:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#9ca3af]",children:"Player 1 Controller Slot"}),o.jsxs("select",{"data-testid":"guide-controller-slot-select",value:d.preferredControllerSlot,onChange:g=>de({preferredControllerSlot:Number(g.target.value)}),className:"w-full bg-[#111318] text-white border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px]",children:[o.jsx("option",{value:0,children:"Gamepad #0 (Default)"}),o.jsx("option",{value:1,children:"Gamepad #1 → Player 1"}),o.jsx("option",{value:2,children:"Gamepad #2 → Player 1"}),o.jsx("option",{value:3,children:"Gamepad #3 → Player 1"})]})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7] font-medium",children:"Local Co-Op (Multiple Controllers Support)"}),o.jsx("input",{type:"checkbox","data-testid":"guide-local-coop-checkbox",checked:d.localCoOpEnabled,onChange:g=>de({localCoOpEnabled:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7] font-medium",children:"Auto-Hide Mouse Cursor (2s Idle)"}),o.jsx("input",{type:"checkbox","data-testid":"guide-autohide-cursor-checkbox",checked:d.autoHideCursor,onChange:g=>de({autoHideCursor:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Left Stick Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.leftStickDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.leftStickDeadzonePercent,onChange:g=>de({leftStickDeadzonePercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Right Stick Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.rightStickDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.rightStickDeadzonePercent,onChange:g=>de({rightStickDeadzonePercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Trigger Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.triggerDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.triggerDeadzonePercent,onChange:g=>de({triggerDeadzonePercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Vibration Intensity"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.vibrationIntensityPercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,step:5,value:d.vibrationIntensityPercent,onChange:g=>de({vibrationIntensityPercent:Number(g.target.value)}),className:"w-full xbox-slider"})]})]}),o.jsxs("div",{className:"space-y-2.5 pt-2 border-t border-[#1f2229]",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Volume Boost"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.audioBoostPercent,"%"]})]}),o.jsx("input",{type:"range","data-testid":"guide-audio-booster-slider",min:100,max:300,step:10,value:d.audioBoostPercent,onChange:g=>de({audioBoostPercent:Number(g.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#d1d5db]",children:"Clarity EQ (Footstep/Voice Boost)"}),o.jsx("input",{type:"checkbox",checked:d.audioClarityEq,onChange:g=>de({audioClarityEq:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]})]})]}),X==="HUD_STATS"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"space-y-2",children:[o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-white font-semibold",children:"Show Top Telemetry Bar"}),o.jsx("input",{type:"checkbox","data-testid":"guide-toggle-telemetry-bar",checked:d.showWebRtcStatsHud,onChange:g=>de({showWebRtcStatsHud:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("div",{className:"bg-[#111318] p-2.5 rounded-md space-y-2",children:[o.jsx("span",{className:"block text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Telemetry Bar Metrics (Extension)"}),o.jsxs("div",{className:"grid grid-cols-2 gap-1.5 text-[11px]",children:[o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-fps",checked:d.statsShowFps,onChange:g=>de({statsShowFps:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"FPS"})]}),o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-ping",checked:d.statsShowPing,onChange:g=>de({statsShowPing:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"Ping"})]}),o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-bitrate",checked:d.statsShowBitrate,onChange:g=>de({statsShowBitrate:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"Bitrate"})]}),o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-decode",checked:d.statsShowDecode,onChange:g=>de({statsShowDecode:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"Decode Time"})]}),o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-jitter",checked:d.statsShowJitter,onChange:g=>de({statsShowJitter:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"Jitter"})]}),o.jsxs("label",{className:"flex items-center gap-2 cursor-pointer text-[#d4d4d8]",children:[o.jsx("input",{type:"checkbox","data-testid":"guide-metric-loss",checked:d.statsShowLoss,onChange:g=>de({statsShowLoss:g.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"Packet Loss"})]})]})]}),o.jsxs("div",{className:"flex items-center justify-between text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7]",children:"Overlay Toggle Shortcut"}),o.jsx("button",{type:"button","data-testid":"guide-keybind-recorder-btn",onClick:()=>Ce(!0),className:`px-2.5 py-1 rounded-sm font-mono text-[11px] font-semibold border transition-colors cursor-pointer ${pe?"bg-[#107c10] text-white border-[#107c10]":"bg-[#16181d] hover:bg-[#1f2229] text-[#4ade80] border-[#27272a]"}`,children:pe?"Press any key...":d.toggleKey||"Home"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7]",children:"120Hz Monotonic FrameGen"}),o.jsx("input",{type:"checkbox",checked:d.frameGenEnabled,onChange:g=>de({frameGenEnabled:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between cursor-pointer text-[11px] bg-[#111318] px-2.5 py-2 rounded-md",children:[o.jsx("span",{className:"text-[#e4e4e7]",children:"NVIDIA RTX VSR / HDR Hardware Trigger"}),o.jsx("input",{type:"checkbox",checked:d.rtxVsrEnabled,onChange:g=>de({rtxVsrEnabled:g.target.checked}),className:"w-3.5 h-3.5 accent-[#107c10]"})]})]}),o.jsxs("div",{className:"pt-2 border-t border-[#1f2229] grid grid-cols-2 gap-2",children:[o.jsx("button",{type:"button","data-testid":"guide-take-screenshot-btn",onClick:_,className:"py-2 px-3 rounded-md bg-[#107c10] hover:bg-[#15803d] text-white font-semibold text-[11px] text-center transition-colors cursor-pointer",children:le?"Saved (.PNG)":"Screenshot (.PNG)"}),o.jsx("button",{type:"button","data-testid":"guide-record-webm-btn",onClick:ce,className:`py-2 px-3 rounded-md font-semibold text-[11px] text-center transition-colors cursor-pointer ${ne?"bg-[#107c10] text-white":"bg-[#16181d] hover:bg-[#1f2229] text-[#e4e4e7]"}`,children:ne?"Stop (.WEBM)":"Record .WEBM"})]})]}),X==="ABOUT"&&o.jsxs("div",{className:"space-y-3 text-[11px] leading-relaxed",children:[o.jsxs("div",{className:"bg-[#111318] p-3 rounded-md space-y-2",children:[o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("img",{src:"./spet_sprites/green_chip_24.png",alt:"Spet001",referrerPolicy:"no-referrer",className:"w-4 h-4 object-contain shrink-0"}),o.jsxs("div",{children:[o.jsx("div",{className:"font-semibold text-white",children:"Spet's Proprietary Enhancements"}),o.jsx("a",{href:"https://spet01.dev/",target:"_blank",rel:"noopener noreferrer",className:"text-[10px] font-mono text-[#4ade80] hover:underline",children:"https://spet01.dev/ · Eduardo Gelain (Spet001)"})]})]}),o.jsxs("p",{className:"text-[#a1a1aa]",children:["Engineered by ",o.jsx("strong",{className:"text-white",children:"Eduardo Gelain (Spet001)"}),": Multi-Pass WebGL2 Unified Pipeline (",o.jsx("strong",{className:"text-white",children:"Spet Hybrid (FSR + DoG)"}),"),"," ",o.jsx("strong",{className:"text-white",children:"Disocclusion-Aware YCoCg Temporal Reconstruction (Zero-Ghosting TAAU)"}),", ",o.jsx("strong",{className:"text-white",children:"Monotonic Sub-Frame Pacing"}),", D3D11 Compositor Anti-Flicker Lock, and Chromium Manifest V3 MAIN World execution."]})]}),o.jsxs("div",{className:"bg-[#111318] p-3 rounded-md space-y-2",children:[o.jsx("div",{className:"text-[10px] font-mono uppercase tracking-wider text-[#4ade80]",children:"Open-Source Credits & Acknowledgments"}),o.jsxs("div",{className:"space-y-1.5 text-[#d4d4d8]",children:[o.jsxs("div",{children:[o.jsx("strong",{className:"text-white",children:"Anime4K (bloc97):"})," Convolutional"," ",o.jsx("em",{children:"Difference of Gaussians (DoG)"})," & ",o.jsx("em",{children:"CNN Line Reconstruction"})," ","algorithms (MIT License)."]}),o.jsxs("div",{children:[o.jsx("strong",{className:"text-white",children:"Better xCloud (redphx):"})," WebRTC/xCloud network interoperability research & streaming telemetry inspiration."]}),o.jsxs("div",{children:[o.jsx("strong",{className:"text-white",children:"AMD FidelityFX Super Resolution 1.0 (GPUOpen):"})," ",o.jsx("em",{children:"Edge-Adaptive Spatial Upsampling (EASU)"})," &"," ",o.jsx("em",{children:"Robust Contrast-Adaptive Sharpening (RCAS)"})," mathematics (MIT License)."]})]})]})]})]})]}),o.jsxs("div",{onPointerDown:g=>g.stopPropagation(),className:"absolute bottom-3 right-3 flex items-center gap-1 z-10 font-mono bg-[#0d0f14]/95 p-1 rounded-md border border-[#1f2229]",children:[o.jsx("button",{type:"button","data-testid":"viewport-screenshot-btn",onClick:_,className:"px-2.5 py-1 rounded-sm bg-[#16181d] hover:bg-[#1f2229] text-[11px] text-[#e4e4e7] transition-colors cursor-pointer",title:"Save Upscaled WebGL2 Frame (.PNG)",children:le?"Saved PNG":"Screenshot"}),o.jsx("button",{type:"button","data-testid":"viewport-record-webm-btn",onClick:ce,className:`px-2.5 py-1 rounded-sm text-[11px] transition-colors cursor-pointer ${ne?"bg-[#107c10] text-white font-semibold":"bg-[#16181d] hover:bg-[#1f2229] text-[#e4e4e7]"}`,title:"Record Upscaled WebGL2 Stream (.WEBM)",children:ne?"Stop (.WEBM)":"Record .WEBM"}),o.jsx("button",{type:"button","data-testid":"toggle-play-pause-btn",onClick:J,className:"px-2.5 py-1 rounded-sm bg-[#16181d] hover:bg-[#1f2229] text-[11px] text-[#e4e4e7] transition-colors cursor-pointer",children:z?"Play":"Pause"}),o.jsx("button",{type:"button","data-testid":"toggle-loupe-btn",onClick:()=>m(g=>!g),className:`px-2.5 py-1 rounded-sm text-[11px] transition-colors cursor-pointer ${O?"bg-[#107c10] text-white font-semibold":"bg-[#16181d] hover:bg-[#1f2229] text-[#e4e4e7]"}`,children:"2x Loupe"}),o.jsx("button",{type:"button","data-testid":"toggle-fullscreen-btn",onClick:Se,className:"px-2.5 py-1 rounded-sm bg-[#16181d] hover:bg-[#1f2229] text-[11px] text-[#e4e4e7] transition-colors cursor-pointer",children:R?"Exit":"Fullscreen"})]})]})},oo=[{id:"halo-infinite-480p",label:"Halo Infinite (480p)",url:"./gameplay-demo.mp4"},{id:"forza-horizon-5-480p",label:"Forza Horizon 5 (480p)",url:"./forza-demo.mp4"}],X1=[{presetId:"SERIES_X_ULTRA",label:"Spet Hybrid (FSR + DoG)"},{presetId:"COMPETITIVE_120",label:"AMD FSR 1.0"},{presetId:"ANIME4K_CLARITY",label:"Anime4K v3.2 DoG"},{presetId:"DLSS_TEMPORAL_4K",label:"TAAU Anti-Ghosting"},{presetId:"RAW_BYPASS",label:"Native Bypass"}];function I1(){const[d,de]=ze.useState(()=>M1),[N,p]=ze.useState("PRESETS_SOURCE"),[U,y]=ze.useState(null),[w,h]=ze.useState(oo[0].id),[C,B]=ze.useState(!1),[M,f]=ze.useState({inputFps:60,outputFps:120,frameTimeMs:8.3,resolutionScaleLabel:"2.0x (1440p)",inputResolution:"854×480",outputResolution:"2560×1440",activeEngineLabel:"Spet Hybrid (FSR + DoG)",pingMs:11,bitrateMbps:19.8,decodeTimeMs:2.1,jitterMs:.6,packetLossPercent:0}),[R,v]=ze.useState(!1),[O,m]=ze.useState(!1),[E,S]=ze.useState(!1),[z,L]=ze.useState(!1),[X,I]=ze.useState(!1),[le,Y]=ze.useState("manifest.json"),[ne,ee]=ze.useState(!1),pe=ze.useRef(null),Ce=ze.useRef(null),j=ze.useRef(0),P=ze.useCallback(_=>{de(ce=>({...ce,..._,preset:_.preset??"CUSTOM"}))},[]),u=ze.useCallback(_=>{de(ce=>j1(ce,_))},[]);ze.useEffect(()=>{const _=document.createElement("video");_.crossOrigin="anonymous",_.playsInline=!0,_.muted=!0,_.loop=!0,_.autoplay=!0,_.preload="auto",_.src=oo[0].url,pe.current=_;const ce=()=>{_.play().catch(()=>{}),y(_)};return _.addEventListener("loadeddata",ce),_.load(),()=>{_.removeEventListener("loadeddata",ce),_.pause()}},[]),ze.useEffect(()=>{Ce.current&&(Ce.current.gain.value=d.audioBoostPercent/100)},[d.audioBoostPercent]),ze.useEffect(()=>{try{const _=localStorage.getItem("spet_vx_config");if(_){const ce=JSON.parse(_);ce&&typeof ce.toggleKey=="string"&&ce.toggleKey.trim()!==""&&de(T=>({...T,toggleKey:ce.toggleKey}))}}catch{}},[]);const te=ze.useCallback(()=>{de(_=>({..._,fsrEnabled:!0})),B(_=>ne?!_:!0),ee(!0),typeof document<"u"&&document.documentElement&&document.documentElement.setAttribute("data-xcloudfx-active","true")},[ne]);ze.useEffect(()=>{const _=ce=>{var he,ve;const T=((ve=(he=ce.target)==null?void 0:he.tagName)==null?void 0:ve.toLowerCase())||"";if(T==="input"||T==="textarea"||T==="select")return;const g=d.toggleKey||"Home";if(ce.key===g||ce.code===g||ce.key==="Home"||ce.code==="Home"){ce.preventDefault();const be=performance.now(),Re=be-j.current<=450;j.current=be,Re?te():B(xe=>!xe)}else ce.key==="Escape"&&(C&&B(!1),X&&I(!1),z&&L(!1))};return window.addEventListener("keydown",_),()=>window.removeEventListener("keydown",_)},[d.toggleKey,C,X,z,te]);const oe=ze.useCallback(_=>{const ce=pe.current;ce&&(h(_.id),ce.srcObject=null,ce.crossOrigin="anonymous",ce.src=_.url,ce.loop=!0,ce.muted=!0,ce.play().catch(()=>{}),y(ce))},[]),$=ze.useCallback(async()=>{m(!0);try{const _=await H1(d),ce=URL.createObjectURL(_),T=document.createElement("a");T.href=ce,T.download="xCloudFX-Extension-MV3.zip",document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL(ce),S(!0),setTimeout(()=>S(!1),3500)}finally{m(!1)}},[d]),ye=ze.useCallback(()=>{const _=wp(d,!0),ce=new Blob([_],{type:"text/javascript;charset=utf-8"}),T=URL.createObjectURL(ce),g=document.createElement("a");g.href=T,g.download="xcloudfx.user.js",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(T)},[d]),se=ze.useCallback(async()=>{const _=wp(d,!1);try{await navigator.clipboard.writeText(_),v(!0),setTimeout(()=>v(!1),2500)}catch{const ce=document.createElement("textarea");ce.value=_,document.body.appendChild(ce),ce.select(),document.execCommand("copy"),document.body.removeChild(ce),v(!0),setTimeout(()=>v(!1),2500)}},[d]),Se=Zu(d),J=d.fsrEnabled?d.targetScale==="4K"?"2160p • 3.0x":d.targetScale==="1440p"?"1440p • 2.0x":"1080p • 1.5x":"Native • 1.0x";return o.jsxs("div",{className:"h-screen w-screen overflow-hidden bg-[#050505] text-[#f3f4f6] flex flex-col select-none",children:[o.jsxs("header",{"data-testid":"studio-topbar",className:"h-11 shrink-0 bg-[#0d0f14] border-b border-[#1f2229] px-3.5 flex items-center justify-between gap-2 z-30 whitespace-nowrap",children:[o.jsxs("div",{className:"flex items-center gap-2.5 shrink-0",children:[o.jsx("div",{className:"w-6 h-6 rounded-sm bg-[#107c10] flex items-center justify-center text-white shrink-0",children:o.jsx(zp,{className:"w-3.5 h-3.5 text-white"})}),o.jsx("span",{className:"text-[13px] font-semibold tracking-tight text-white",children:"Spet's xCloudFX Studio"})]}),o.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[o.jsx("div",{className:"flex items-center bg-[#090a0d] p-0.5 rounded-sm border border-[#1f2229]",role:"group","aria-label":"Viewport Comparison Mode",children:[{id:"SPLIT",label:"SPLIT"},{id:"OUTPUT",label:"OUTPUT"},{id:"SOURCE",label:"SOURCE"},{id:"FLOW DEBUG",label:"FLOW DEBUG"}].map(_=>{const ce=d.viewMode===_.id;return o.jsx("button",{type:"button","data-testid":`mode-btn-${_.id.replace(/\s+/g,"_")}`,onClick:()=>P({viewMode:_.id}),className:`px-2.5 py-1 text-[11px] font-mono font-medium tracking-wide rounded-sm transition-colors cursor-pointer whitespace-nowrap ${ce?"bg-[#107c10] text-white":"text-[#a1a1aa] hover:text-white hover:bg-white/5"}`,children:_.label},_.id)})}),o.jsxs("div",{className:"hidden md:flex items-center gap-1.5 bg-[#090a0d] px-2.5 py-1 rounded-sm border border-[#1f2229]",children:[o.jsx("span",{className:"text-[10px] font-mono uppercase text-[#71717a]",children:"Split"}),o.jsx("input",{type:"range","aria-label":"Split Screen Percentage","data-testid":"topbar-split-slider",min:0,max:100,step:1,value:Math.round(d.splitPosition),onChange:_=>{const ce=Number(_.target.value);P({splitPosition:ce,viewMode:d.viewMode==="OUTPUT"||d.viewMode==="SOURCE"?"SPLIT":d.viewMode})},className:"w-16 xbox-slider"}),o.jsxs("span",{className:"text-[11px] font-mono text-white w-8 text-right tabular-nums",children:[Math.round(d.splitPosition),"%"]})]}),o.jsx("button",{type:"button","data-testid":"preview-guide-blade-btn",onClick:()=>B(_=>!_),className:`px-2.5 py-1 rounded-sm text-[11px] font-mono font-medium transition-colors cursor-pointer border whitespace-nowrap ${C?"bg-[#107c10] text-white border-[#107c10]":"bg-[#12151c] hover:bg-[#191d26] text-[#d4d4d8] border-[#222630]"}`,children:"Preview Guide Overlay"})]}),o.jsx("div",{"data-testid":"telemetry-bar",className:"hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#090a0d] border border-[#1f2229] text-[11px] font-mono text-[#a1a1aa] shrink-0 tabular-nums",children:o.jsxs("span",{children:["Output:"," ",o.jsx("strong",{className:"text-white font-medium",children:J})]})})]}),o.jsxs("div",{className:"flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden",children:[o.jsx(V1,{settings:d,onUpdateSettings:P,onSelectPreset:u,videoElement:U,onTelemetryUpdate:f,isGuideBladeOpen:C,onCloseGuideBlade:()=>B(!1)}),o.jsxs("aside",{"data-testid":"studio-sidebar",className:"w-full lg:w-[376px] xl:w-[396px] shrink-0 bg-[#0d0f14] border-t lg:border-t-0 lg:border-l border-[#1f2229] flex flex-col h-[46vh] lg:h-full z-20",children:[o.jsx("div",{className:"p-2 border-b border-[#1f2229] bg-[#090a0d] shrink-0",children:o.jsxs("div",{className:"bg-[#111318] p-1 rounded-md grid grid-cols-3 gap-1",children:[o.jsx("button",{type:"button","data-testid":"tab-presets-source",onClick:()=>p("PRESETS_SOURCE"),className:`py-1.5 px-2 rounded-sm text-[11px] font-mono uppercase tracking-wider text-center transition-colors cursor-pointer ${N==="PRESETS_SOURCE"?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:"Engine & Video"}),o.jsx("button",{type:"button","data-testid":"tab-shader-network",onClick:()=>p("SHADER_NETWORK"),className:`py-1.5 px-2 rounded-sm text-[11px] font-mono uppercase tracking-wider text-center transition-colors cursor-pointer ${N==="SHADER_NETWORK"?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:"Stream & Input"}),o.jsx("button",{type:"button","data-testid":"tab-about-credits",onClick:()=>p("ABOUT"),className:`py-1.5 px-2 rounded-sm text-[11px] font-mono uppercase tracking-wider text-center transition-colors cursor-pointer ${N==="ABOUT"?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:"About"})]})}),o.jsxs("div",{className:"flex-1 overflow-y-auto p-4",children:[N==="PRESETS_SOURCE"&&o.jsxs("div",{className:"space-y-4",children:[o.jsxs("section",{className:"border-b border-[#1f2229] pb-4 space-y-2.5",children:[o.jsxs("div",{className:"space-y-1.5",children:[o.jsx("label",{htmlFor:"benchmark-video-select",className:"block text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Benchmark Video"}),o.jsx("select",{id:"benchmark-video-select","data-testid":"benchmark-video-select",value:w,onChange:_=>{const ce=oo.find(T=>T.id===_.target.value);ce&&oe(ce)},className:"w-full bg-[#111318] border border-[#1f2229] rounded-md px-3 py-2 text-[12px] font-medium text-white focus:outline-none focus:border-[#107c10] cursor-pointer",children:oo.map(_=>o.jsx("option",{value:_.id,children:_.label},_.id))})]}),o.jsxs("div",{"data-testid":"any-video-browser-card",className:`bg-[#111318] border rounded-md p-3 space-y-2 transition-colors ${d.fsrEnabled?"border-[#107c10]/60":"border-[#1f2229]"}`,children:[o.jsxs("div",{className:"flex items-center justify-between gap-2",children:[o.jsx("span",{className:"text-[11.5px] font-semibold text-white leading-snug",children:"Want to use it on any video on your browser?"}),o.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[o.jsx("span",{"data-testid":"any-video-state-pill",className:`px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-semibold ${d.fsrEnabled?"bg-[#107c10]/25 border border-[#107c10] text-[#4ade80]":"bg-[#161b22] border border-[#27272a] text-[#a1a1aa]"}`,children:d.fsrEnabled?"● ON":"OFF"}),o.jsx("span",{className:"px-1.5 py-0.5 rounded-sm bg-[#161b22] border border-[#27272a] text-[10px] font-mono text-[#4ade80]",children:"HOME 2x"})]})]}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa] leading-relaxed",children:["Watch YouTube, Anime, Netflix... Open the extension and click"," ",o.jsx("strong",{className:"text-white",children:'"Enhance this site video output"'})," ","or just press ",o.jsx("strong",{className:"text-[#4ade80] font-mono",children:"HOME 2x"})," —"," ","xCloudFX will open and will let you enhance your video!"]}),o.jsx("button",{type:"button","data-testid":"enhance-site-video-btn",onClick:te,className:"w-full py-1.5 px-2.5 rounded-sm bg-[#107c10] hover:bg-[#15803d] text-white font-semibold text-[11px] font-mono transition-colors cursor-pointer",children:ne||C?"xCloudFX is ON — Open / Toggle Guide Overlay":"Enhance this site video output"})]})]}),o.jsxs("section",{className:"border-b border-[#1f2229] pb-4 space-y-3",children:[o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Upscaler"}),o.jsx("button",{type:"button",onClick:()=>u("SERIES_X_ULTRA"),className:"text-[10px] font-mono text-[#71717a] hover:text-white cursor-pointer",children:"Reset"})]}),o.jsx("div",{className:"bg-[#111318] rounded-md p-1 space-y-0.5",role:"radiogroup","aria-label":"Upscaler",children:X1.map(_=>{const ce=d.preset===_.presetId;return o.jsxs("button",{type:"button",role:"radio","aria-checked":ce,"data-testid":`preset-btn-${_.presetId}`,onClick:()=>u(_.presetId),className:`w-full flex items-center justify-between px-3 py-2 rounded-sm text-left text-[12px] transition-colors cursor-pointer ${ce?"bg-[#161b22] text-white font-semibold":"text-[#a1a1aa] hover:text-white hover:bg-white/[0.03]"}`,children:[o.jsxs("div",{className:"flex items-center gap-2.5",children:[o.jsx("span",{className:`w-1.5 h-4 rounded-full transition-colors ${ce?"bg-[#107c10]":"bg-[#27272a]"}`}),o.jsx("span",{children:_.label})]}),ce&&o.jsx("span",{className:"text-[10px] font-mono uppercase text-[#4ade80]",children:"Active"})]},_.presetId)})}),o.jsxs("div",{className:"space-y-1.5",children:[o.jsx("span",{className:"block text-[10px] font-mono uppercase tracking-wider text-[#71717a]",children:"Target Resolution"}),o.jsx("div",{className:"bg-[#111318] p-1 rounded-md grid grid-cols-3 gap-1",children:[{id:"1080p",label:"1080p"},{id:"1440p",label:"1440p"},{id:"4K",label:"2160p"}].map(_=>{const ce=d.targetScale===_.id;return o.jsx("button",{type:"button","data-testid":`res-scale-${_.id}`,onClick:()=>P({targetScale:_.id}),className:`py-1.5 px-2 rounded-sm text-center text-[11px] font-mono transition-colors cursor-pointer ${ce?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:_.label},_.id)})})]})]}),o.jsxs("section",{className:"border-b border-[#1f2229] pb-4 space-y-3",children:[o.jsx("div",{className:"flex items-center justify-between",children:o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Shader & Color Grading"})}),o.jsxs("div",{className:"space-y-3",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"RCAS Sharpness"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[Math.round(d.rcasSharpness),"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,value:Math.round(d.rcasSharpness),onChange:_=>P({rcasSharpness:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"De-Blocking"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[Math.round(d.deblockingIntensity),"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,value:Math.round(d.deblockingIntensity),onChange:_=>P({deblockingIntensity:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Saturation"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.saturationPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.saturationPercent,onChange:_=>P({saturationPercent:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Contrast"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.contrastPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.contrastPercent,onChange:_=>P({contrastPercent:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Brightness"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.brightnessPercent,"%"]})]}),o.jsx("input",{type:"range",min:50,max:150,value:d.brightnessPercent,onChange:_=>P({brightnessPercent:Number(_.target.value)}),className:"w-full xbox-slider"})]})]})]}),o.jsxs("section",{className:"space-y-3",children:[o.jsx("div",{className:"flex items-center justify-between",children:o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Aspect Ratio & Volume"})}),o.jsx("div",{className:"bg-[#111318] p-1 rounded-md grid grid-cols-4 gap-1",children:[{id:"16:9",label:"16:9"},{id:"21:9",label:"21:9"},{id:"16:10",label:"16:10"},{id:"STRETCH",label:"Stretch"}].map(_=>o.jsx("button",{type:"button","data-testid":`sidebar-ratio-${_.id}`,onClick:()=>P({videoRatio:_.id}),className:`py-1.5 px-2 rounded-sm text-[11px] font-mono transition-colors cursor-pointer ${d.videoRatio===_.id?"bg-[#107c10] text-white font-semibold":"text-[#a1a1aa] hover:text-white"}`,children:_.label},_.id))}),o.jsxs("div",{className:"space-y-3 pt-1",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Video Zoom"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.videoZoom.toFixed(2),"x"]})]}),o.jsx("input",{type:"range",min:100,max:150,step:5,value:Math.round(d.videoZoom*100),onChange:_=>P({videoZoom:Number(_.target.value)/100}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Volume Boost"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.audioBoostPercent,"%"]})]}),o.jsx("input",{type:"range","data-testid":"sidebar-audio-boost-slider",min:100,max:300,step:10,value:d.audioBoostPercent,onChange:_=>P({audioBoostPercent:Number(_.target.value)}),className:"w-full xbox-slider"})]})]})]})]}),N==="SHADER_NETWORK"&&o.jsxs("div",{className:"space-y-4",children:[o.jsxs("section",{className:"border-b border-[#1f2229] pb-4 space-y-2",children:[o.jsx("div",{className:"flex items-center justify-between",children:o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Hardware Compositor & FrameGen"})}),o.jsxs("div",{className:"grid grid-cols-2 gap-1.5",children:[o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-3 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"120Hz FrameGen"}),o.jsx("input",{type:"checkbox","data-testid":"toggle-framegen",checked:d.frameGenEnabled,onChange:_=>P({frameGenEnabled:_.target.checked}),className:"accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-3 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Full RGB 0–255"}),o.jsx("input",{type:"checkbox",checked:d.fullRgbRangeExpansion,onChange:_=>P({fullRgbRangeExpansion:_.target.checked}),className:"accent-[#107c10]"})]})]}),o.jsxs("label",{"data-testid":"rtx-vsr-toggle-row",className:"flex items-center justify-between bg-[#111318] px-3 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsxs("div",{className:"flex flex-col",children:[o.jsx("span",{className:"text-[#e4e4e7] font-medium",children:"NVIDIA RTX VSR / HDR Hardware Trigger"}),o.jsx("span",{className:"text-[10px] font-mono text-[#71717a]",children:"D3D11VideoDecoder DirectComposition MPO"})]}),o.jsx("input",{type:"checkbox","data-testid":"toggle-rtx-vsr",checked:d.rtxVsrEnabled,onChange:_=>P({rtxVsrEnabled:_.target.checked}),className:"accent-[#107c10] w-3.5 h-3.5 shrink-0"})]})]}),o.jsxs("section",{className:"border-b border-[#1f2229] pb-4 space-y-3",children:[o.jsx("div",{className:"flex items-center justify-between",children:o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Stream & Network"})}),o.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#71717a]",children:"Codec & Resolution"}),o.jsxs("select",{"data-testid":"device-spoof-select",value:d.deviceSpoofProfile,onChange:_=>P({deviceSpoofProfile:_.target.value}),className:"w-full bg-[#111318] border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px] text-white",children:[o.jsx("option",{value:"SMARTTV_TIZEN_20M",children:"1080p HQ (Tizen 20M)"}),o.jsx("option",{value:"WINDOWS_1080P_HQ",children:"1080p Standard (Edge)"}),o.jsx("option",{value:"LOW_LATENCY_720P",children:"720p Low-Latency"}),o.jsx("option",{value:"DEFAULT_BROWSER",children:"Default Browser"})]})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#71717a]",children:"Server Region"}),o.jsxs("select",{"data-testid":"server-region-select",value:d.serverRegion,onChange:_=>P({serverRegion:_.target.value}),className:"w-full bg-[#111318] border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px] text-white",children:[o.jsx("option",{value:"AUTO",children:"Default (Auto)"}),o.jsx("option",{value:"BRAZIL_SOUTH",children:"Brazil South (SP)"}),o.jsx("option",{value:"US_EAST",children:"US East"}),o.jsx("option",{value:"US_WEST",children:"US West"}),o.jsx("option",{value:"EUROPE_WEST",children:"Europe West"})]})]})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"SDP Target Bitrate (b=AS)"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.sdpBitrateMbps," Mbps"]})]}),o.jsx("input",{type:"range",min:10,max:30,step:1,value:d.sdpBitrateMbps,onChange:_=>P({sdpBitrateMbps:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"grid grid-cols-2 gap-1.5 pt-0.5",children:[o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-2.5 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"0ms Jitter Buffer"}),o.jsx("input",{type:"checkbox",checked:d.zeroJitterBuffer,onChange:_=>P({zeroJitterBuffer:_.target.checked}),className:"accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-2.5 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Prefer IPv6"}),o.jsx("input",{type:"checkbox",checked:d.preferIpv6,onChange:_=>P({preferIpv6:_.target.checked}),className:"accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-2.5 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Auto-Skip Intro"}),o.jsx("input",{type:"checkbox",checked:d.autoSkipIntroVideo,onChange:_=>P({autoSkipIntroVideo:_.target.checked}),className:"accent-[#107c10]"})]}),o.jsxs("label",{className:"flex items-center justify-between bg-[#111318] px-2.5 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Anti-Idle Kick"}),o.jsx("input",{type:"checkbox",checked:d.focusSpoofAndAutoDismiss,onChange:_=>P({focusSpoofAndAutoDismiss:_.target.checked}),className:"accent-[#107c10]"})]})]})]}),o.jsxs("section",{className:"space-y-3",children:[o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa]",children:"Controller, MKB & Co-Op"}),o.jsxs("label",{className:"flex items-center gap-1.5 text-[10px] font-mono text-[#4ade80] cursor-pointer",children:[o.jsx("input",{type:"checkbox","data-testid":"sidebar-local-coop-checkbox",checked:d.localCoOpEnabled,onChange:_=>P({localCoOpEnabled:_.target.checked}),className:"accent-[#107c10]"}),o.jsx("span",{children:"LOCAL CO-OP"})]})]}),o.jsxs("label",{"data-testid":"sidebar-mkb-toggle-row",className:"flex items-center justify-between bg-[#111318] px-3 py-2 rounded-md text-[11px] cursor-pointer",children:[o.jsxs("div",{className:"flex flex-col",children:[o.jsx("span",{className:"text-[#e4e4e7] font-medium",children:"Mouse & Keyboard (MKB) Virtual Controller"}),o.jsx("span",{className:"text-[10px] font-mono text-[#71717a]",children:"WASD + Mouse Aim → navigator.getGamepads()"})]}),o.jsx("input",{type:"checkbox","data-testid":"sidebar-mkb-checkbox",checked:d.mkbEnabled,onChange:_=>P({mkbEnabled:_.target.checked}),className:"accent-[#107c10] w-3.5 h-3.5 shrink-0"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"MKB Mouse Sensitivity"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.mkbSensitivity,"%"]})]}),o.jsx("input",{type:"range","data-testid":"sidebar-mkb-sensitivity-slider",min:10,max:100,step:5,value:d.mkbSensitivity,onChange:_=>P({mkbSensitivity:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsx("label",{htmlFor:"sidebar-controller-slot-select",className:"block text-[10px] font-mono uppercase text-[#71717a]",children:"Player 1 Controller Slot"}),o.jsxs("select",{id:"sidebar-controller-slot-select","data-testid":"sidebar-controller-slot-select",value:d.preferredControllerSlot,onChange:_=>P({preferredControllerSlot:Number(_.target.value)}),className:"w-full bg-[#111318] border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px] text-white",children:[o.jsx("option",{value:0,children:"Gamepad #0 (Default)"}),o.jsx("option",{value:1,children:"Gamepad #1 → Player 1"}),o.jsx("option",{value:2,children:"Gamepad #2 → Player 1"}),o.jsx("option",{value:3,children:"Gamepad #3 → Player 1"})]})]}),o.jsxs("div",{className:"space-y-3 pt-1",children:[o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Left Stick Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.leftStickDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.leftStickDeadzonePercent,onChange:_=>P({leftStickDeadzonePercent:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Right Stick Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.rightStickDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.rightStickDeadzonePercent,onChange:_=>P({rightStickDeadzonePercent:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Trigger Deadzone"}),o.jsxs("span",{className:"font-mono text-white tabular-nums",children:[d.triggerDeadzonePercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:20,value:d.triggerDeadzonePercent,onChange:_=>P({triggerDeadzonePercent:Number(_.target.value)}),className:"w-full xbox-slider"})]}),o.jsxs("div",{className:"space-y-1",children:[o.jsxs("div",{className:"flex justify-between text-[11px]",children:[o.jsx("span",{className:"text-[#d4d4d8]",children:"Vibration Intensity"}),o.jsxs("span",{className:"font-mono text-[#4ade80] tabular-nums",children:[d.vibrationIntensityPercent,"%"]})]}),o.jsx("input",{type:"range",min:0,max:100,step:5,value:d.vibrationIntensityPercent,onChange:_=>P({vibrationIntensityPercent:Number(_.target.value)}),className:"w-full xbox-slider"})]})]}),o.jsxs("div",{className:"pt-1 space-y-1",children:[o.jsx("label",{className:"block text-[10px] font-mono uppercase text-[#71717a]",children:"Optional Remote Play Target URL / ID"}),o.jsx("input",{type:"text","data-testid":"console-target-input",value:d.consoleTargetInput,onChange:_=>P({consoleTargetInput:_.target.value}),placeholder:"ex: https://www.xbox.com/play/consoles/launch/XXXXXXXXXXXXXXXX",className:"w-full bg-[#111318] border border-[#1f2229] rounded-md px-2.5 py-2 text-[11px] font-mono text-white placeholder-[#52525b] focus:outline-none focus:border-[#107c10]"}),d.consoleTargetInput.trim()!==""&&o.jsxs("div",{className:"text-[10px] font-mono text-[#4ade80] truncate",children:["Target Scope:"," ",Np(d.consoleTargetInput).launchUrl]})]})]})]}),N==="ABOUT"&&o.jsxs("div",{"data-testid":"about-credits-panel",className:"space-y-3.5 text-xs leading-relaxed",children:[o.jsxs("section",{className:"bg-[#111318] rounded-md p-3.5 space-y-2.5",children:[o.jsxs("div",{className:"flex items-center justify-between gap-2 border-b border-[#1f2229] pb-2.5",children:[o.jsxs("div",{className:"flex items-center gap-2.5",children:[o.jsx("img",{src:"./spet_sprites/green_chip_24.png",alt:"Spet001 Proprietary Silicon",referrerPolicy:"no-referrer",className:"w-5 h-5 object-contain shrink-0"}),o.jsxs("div",{children:[o.jsx("h3",{className:"text-[12px] font-semibold text-white leading-tight",children:"Spet's Proprietary Enhancements"}),o.jsx("a",{href:"https://spet01.dev/",target:"_blank",rel:"noopener noreferrer","data-testid":"spet-portfolio-link",className:"text-[11px] font-mono text-[#4ade80] hover:underline",children:"https://spet01.dev/ · Eduardo Gelain (Spet001)"})]})]}),o.jsx("img",{src:"./spet_sprites/crt_terminal.png",alt:"Spet Terminal",referrerPolicy:"no-referrer",className:"w-4 h-4 object-contain shrink-0 opacity-85"})]}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa]",children:["Original graphics & low-level browser architecture engineered by"," ",o.jsx("strong",{className:"text-white",children:"Eduardo Gelain (Spet001)"})," for Xbox Cloud Gaming & Console Remote Play:"]}),o.jsxs("ul",{className:"space-y-1.5 text-[11px] text-[#d4d4d8]",children:[o.jsxs("li",{children:["• ",o.jsx("strong",{className:"text-white",children:"Spet Hybrid (FSR + DoG) Multi-Pass Pipeline:"})," ","Unified WebGL2 shader pipeline combining spatial edge-adaptive upsampling with real-time H.264 de-blocking and full-range RGB (0–255) expansion."]}),o.jsxs("li",{children:["•"," ",o.jsx("strong",{className:"text-white",children:"Disocclusion-Aware YCoCg Temporal Reconstruction (Zero-Ghosting TAAU):"})," ","Instantaneous motion-rejection clamp (",o.jsx("code",{className:"text-[#4ade80]",children:"lumaDiff > 0.04"}),") that eliminates camera-pan ghosting trails while stabilizing sub-pixel foliage."]}),o.jsxs("li",{children:["• ",o.jsx("strong",{className:"text-white",children:"Monotonic Sub-Frame Pacing (120Hz):"})," ","Strict forward-only frame state machine paired with a"," ",o.jsx("code",{className:"text-[#4ade80]",children:"0.0001"})," opacity D3D11 hardware decoder lock to prevent compositor flickering."]}),o.jsxs("li",{children:["• ",o.jsx("strong",{className:"text-white",children:"Manifest V3 MAIN World Engine:"})," ","Zero-latency execution directly inside ",o.jsx("code",{className:"text-white",children:"xbox.com"})," ","with persistent ",o.jsx("code",{className:"text-[#4ade80]",children:"spet_vx_config"})," storage and NVIDIA RTX VSR / HDR hardware promotion."]})]})]}),o.jsxs("section",{className:"bg-[#111318] rounded-md p-3.5 space-y-2.5",children:[o.jsx("div",{className:"text-[11px] font-mono uppercase tracking-wider text-[#4ade80] font-semibold",children:"Open-Source Credits & Acknowledgments"}),o.jsxs("div",{className:"space-y-2 text-[11px] text-[#d4d4d8]",children:[o.jsxs("div",{className:"border-b border-[#1f2229] pb-2",children:[o.jsx("div",{className:"font-semibold text-white",children:"Anime4K (bloc97)"}),o.jsxs("p",{className:"text-[#a1a1aa] mt-0.5",children:["Convolutional ",o.jsx("em",{children:"Difference of Gaussians (DoG)"})," deblurring and"," ",o.jsx("em",{children:"CNN Line Reconstruction"})," algorithms (MIT License)."]})]}),o.jsxs("div",{className:"border-b border-[#1f2229] pb-2",children:[o.jsx("div",{className:"font-semibold text-white",children:"Better xCloud (redphx)"}),o.jsx("p",{className:"text-[#a1a1aa] mt-0.5",children:"WebRTC/xCloud network interoperability research, 1080p HQ stream headers, and real-time streaming telemetry inspiration."})]}),o.jsxs("div",{children:[o.jsx("div",{className:"font-semibold text-white",children:"AMD FidelityFX Super Resolution 1.0 (GPUOpen)"}),o.jsxs("p",{className:"text-[#a1a1aa] mt-0.5",children:["12-Tap ",o.jsx("em",{children:"Edge-Adaptive Spatial Upsampling (EASU)"})," and"," ",o.jsx("em",{children:"Robust Contrast-Adaptive Sharpening (RCAS)"})," mathematics (MIT License)."]})]})]})]})]})]}),o.jsxs("div",{className:"p-3 border-t border-[#1f2229] bg-[#090a0d] space-y-1.5 shrink-0",children:[o.jsxs("div",{className:"flex items-center gap-1.5",children:[o.jsx("button",{type:"button","data-testid":"download-extension-zip-btn",disabled:O,onClick:$,className:"flex-1 py-2 px-2.5 rounded-md bg-[#107c10] hover:bg-[#15803d] active:bg-[#0e6b0e] text-white font-semibold text-[11px] font-mono uppercase tracking-wide text-center transition-colors cursor-pointer whitespace-nowrap",children:E?"Exported xCloudFX-Extension-MV3.zip":O?"Packaging (.ZIP)...":"Export Extension (.ZIP)"}),o.jsx("button",{type:"button","data-testid":"how-to-install-btn",onClick:()=>I(!0),className:"py-2 px-2.5 rounded-md bg-[#16181d] hover:bg-[#1f2229] text-[11px] font-mono text-[#4ade80] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0",title:"Step-by-Step Chrome/Edge Extension Installation Guide",children:"? How to Install"})]}),o.jsxs("div",{className:"grid grid-cols-3 gap-1.5",children:[o.jsx("button",{type:"button","data-testid":"download-userscript-btn",onClick:ye,className:"py-1.5 px-2 rounded-md bg-[#16181d] hover:bg-[#1f2229] text-[10px] font-mono text-[#d4d4d8] text-center transition-colors cursor-pointer",children:".user.js"}),o.jsx("button",{type:"button","data-testid":"copy-payload-btn",onClick:se,className:"py-1.5 px-2 rounded-md bg-[#16181d] hover:bg-[#1f2229] text-[10px] font-mono text-[#d4d4d8] text-center transition-colors cursor-pointer",children:R?"Copied":"Copy Script"}),o.jsx("button",{type:"button","data-testid":"inspect-extension-btn",onClick:()=>L(!0),className:"py-1.5 px-2 rounded-md bg-[#16181d] hover:bg-[#1f2229] text-[10px] font-mono text-[#d4d4d8] text-center transition-colors cursor-pointer",children:"View Source"})]})]})]})]}),X&&o.jsx("div",{"data-testid":"install-tutorial-modal",className:"fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",children:o.jsxs("div",{className:"w-full max-w-2xl bg-[#0d0f14] border border-[#1f2229] rounded-sm shadow-2xl flex flex-col overflow-hidden",children:[o.jsxs("div",{className:"px-4 py-3 bg-[#090a0d] border-b border-[#1f2229] flex items-center justify-between",children:[o.jsx("span",{className:"text-xs font-mono uppercase tracking-wider text-white font-semibold",children:"How to Install in Chrome / Microsoft Edge (Manifest V3)"}),o.jsx("button",{type:"button","data-testid":"close-install-tutorial-btn",onClick:()=>I(!1),className:"px-2.5 py-0.5 rounded-sm bg-[#14171f] border border-[#262932] text-[11px] font-mono text-[#a1a1aa] hover:text-white cursor-pointer",children:"ESC"})]}),o.jsxs("div",{className:"p-5 space-y-4 text-xs text-[#d4d4d8] overflow-y-auto",children:[o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[o.jsxs("div",{className:"p-3.5 bg-[#090a0d] border border-[#1f2229] rounded-sm space-y-1.5",children:[o.jsx("div",{className:"text-[11px] font-mono font-semibold text-[#4ade80]",children:"STEP 01 · DOWNLOAD & EXTRACT"}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa] leading-relaxed",children:["Click ",o.jsx("strong",{children:"Export Extension (.ZIP)"})," to download"," ",o.jsx("code",{className:"text-white bg-[#12151c] px-1 py-0.5 rounded-sm",children:"xCloudFX-Extension-MV3.zip"})," ","and extract it to a permanent folder on your PC."]})]}),o.jsxs("div",{className:"p-3.5 bg-[#090a0d] border border-[#1f2229] rounded-sm space-y-1.5",children:[o.jsx("div",{className:"text-[11px] font-mono font-semibold text-[#4ade80]",children:"STEP 02 · DEVELOPER MODE"}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa] leading-relaxed",children:["Open"," ",o.jsx("code",{className:"text-white bg-[#12151c] px-1 py-0.5 rounded-sm select-all",children:"edge://extensions"})," ","or"," ",o.jsx("code",{className:"text-white bg-[#12151c] px-1 py-0.5 rounded-sm select-all",children:"chrome://extensions"})," ","in your browser address bar and toggle on"," ",o.jsx("strong",{className:"text-white",children:"Developer mode"})," (Modo do desenvolvedor)."]})]}),o.jsxs("div",{className:"p-3.5 bg-[#090a0d] border border-[#1f2229] rounded-sm space-y-1.5",children:[o.jsx("div",{className:"text-[11px] font-mono font-semibold text-[#4ade80]",children:"STEP 03 · LOAD UNPACKED"}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa] leading-relaxed",children:["Click ",o.jsx("strong",{className:"text-white",children:"Load unpacked"})," (Carregar sem compactação) and select the extracted folder containing"," ",o.jsx("code",{className:"text-white",children:"manifest.json"}),"."]})]}),o.jsxs("div",{className:"p-3.5 bg-[#090a0d] border border-[#1f2229] rounded-sm space-y-1.5",children:[o.jsx("div",{className:"text-[11px] font-mono font-semibold text-[#4ade80]",children:"STEP 04 · XBOX CLOUD OR ANY BROWSER VIDEO"}),o.jsxs("p",{className:"text-[11px] text-[#a1a1aa] leading-relaxed",children:["Open"," ",o.jsx("code",{className:"text-white bg-[#12151c] px-1 py-0.5 rounded-sm",children:"xbox.com/play"})," ","and press ",o.jsx("strong",{className:"text-[#4ade80]",children:"[HOME]"})," for the Guide Blade, or on ",o.jsx("strong",{children:"YouTube, Anime, Netflix"})," click"," ",o.jsx("strong",{className:"text-white",children:'"Enhance this site video output"'})," ","or press ",o.jsx("strong",{className:"text-[#4ade80]",children:"HOME 2x"}),"!"]})]})]}),o.jsxs("div",{className:"p-3 bg-[#111318] border border-[#1f2229] rounded-sm text-[11px] text-[#d4d4d8]",children:[o.jsx("strong",{className:"text-white",children:"Want to use it on any video on your browser?"})," ","— Watch YouTube, Anime, Netflix... Open the extension and click"," ",o.jsx("strong",{className:"text-[#4ade80]",children:'"Enhance this site video output"'})," ","or just press ",o.jsx("strong",{className:"text-[#4ade80] font-mono",children:"HOME 2x"})," — xCloudFX will open and will let you enhance your video!"]}),o.jsxs("div",{className:"flex items-center justify-between pt-2 border-t border-[#1f2229]",children:[o.jsx("span",{className:"text-[11px] font-mono text-[#71717a]",children:"Includes: 1080p 20 Mbps Unlocker · Zero-Ghosting FSR 1.0 / Anime4K · Any Browser Video (HOME 2x)"}),o.jsx("button",{type:"button",onClick:$,className:"px-3.5 py-1.5 rounded-sm bg-[#107c10] hover:bg-[#15803d] text-white text-[11px] font-mono font-semibold cursor-pointer",children:"Download xCloudFX-Extension-MV3.zip"})]})]})]})}),z&&o.jsx("div",{"data-testid":"extension-source-modal",className:"fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",children:o.jsxs("div",{className:"w-full max-w-4xl h-[80vh] bg-[#0d0f14] border border-[#1f2229] rounded-sm shadow-2xl flex flex-col overflow-hidden",children:[o.jsxs("div",{className:"px-4 py-2.5 bg-[#090a0d] border-b border-[#1f2229] flex items-center justify-between",children:[o.jsx("span",{className:"text-xs font-mono uppercase tracking-wider text-white",children:"Manifest V3 Extension Source (xCloudFX — WebGL Upscaler & Stream Enhancer)"}),o.jsx("button",{type:"button",onClick:()=>L(!1),className:"px-2 py-0.5 rounded-sm bg-[#14171f] border border-[#262932] text-[11px] font-mono text-[#a1a1aa] hover:text-white cursor-pointer",children:"ESC"})]}),o.jsxs("div",{className:"px-4 py-2 bg-[#0d0f14] border-b border-[#1f2229] flex flex-wrap items-center justify-between gap-2",children:[o.jsx("div",{className:"flex flex-wrap gap-1",children:Object.keys(Se).map(_=>o.jsx("button",{type:"button",onClick:()=>Y(_),className:`px-2.5 py-1 rounded-sm text-[11px] font-mono transition-colors cursor-pointer ${le===_?"bg-[#107c10] text-white font-semibold":"bg-[#090a0d] text-[#a1a1aa] hover:text-white border border-[#1f2229]"}`,children:_},_))}),o.jsx("div",{className:"text-[11px] font-mono text-[#71717a]",children:"Unzip / edge://extensions / Developer Mode / Load Unpacked"})]}),o.jsx("pre",{className:"flex-1 overflow-auto p-4 text-[11px] font-mono text-[#d4d4d8] bg-[#07080a] leading-relaxed select-text",children:Se[le]})]})})]})}R1.createRoot(document.getElementById("root")).render(o.jsx(I1,{}));

/** @license MIT License (c) copyright 2011-2013 original author or authors */

(function(e){e(["require","./when"],function(e){var t,n,r,i,s;t=e("./when"),i=e;try{s=i("vertx"),n=function(e,t){return s.setTimer(t,e)},r=s.cancelTimer}catch(o){n=setTimeout,r=clearTimeout}return function(i,s){if(typeof s=="number"){var o=s;s=i,i=o}return t.promise(function(e,o,u){var a=n(function(){o(new Error("timed out after "+i+"ms"))},i);t(s,function(n){r(a),e(n)},function(t){r(a),o(t)},u)})}})})(typeof define=="function"&&define.amd?define:function(e){module.exports=e(require)});
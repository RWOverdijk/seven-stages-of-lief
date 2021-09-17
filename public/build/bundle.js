var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let a,i;function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function p(){return t=" ",document.createTextNode(t);var t}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t){i=t}function m(t){(function(){if(!i)throw new Error("Function called outside component initialization");return i})().$$.on_mount.push(t)}const g=[],y=[],w=[],T=[],b=Promise.resolve();let v=!1;function M(t){w.push(t)}let $=!1;const O=new Set;function P(){if(!$){$=!0;do{for(let t=0;t<g.length;t+=1){const e=g[t];d(e),I(e.$$)}for(d(null),g.length=0;y.length;)y.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];O.has(e)||(O.add(e),e())}w.length=0}while(g.length);for(;T.length;)T.pop()();v=!1,$=!1,O.clear()}}function I(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const E=new Set;function k(t,e){-1===t.$$.dirty[0]&&(g.push(t),v||(v=!0,b.then(P)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function _(o,a,l,c,f,p,h,m=[-1]){const g=i;d(o);const y=o.$$={fragment:null,ctx:null,props:p,update:t,not_equal:f,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:a.context||[]),callbacks:n(),dirty:m,skip_bound:!1,root:a.target||g.$$.root};h&&h(y.root);let w=!1;if(y.ctx=l?l(o,a.props||{},((t,e,...n)=>{const s=n.length?n[0]:e;return y.ctx&&f(y.ctx[t],y.ctx[t]=s)&&(!y.skip_bound&&y.bound[t]&&y.bound[t](s),w&&k(o,t)),e})):[],y.update(),w=!0,s(y.before_update),y.fragment=!!c&&c(y.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);y.fragment&&y.fragment.l(t),t.forEach(u)}else y.fragment&&y.fragment.c();a.intro&&((T=o.$$.fragment)&&T.i&&(E.delete(T),T.i(b))),function(t,n,o,a){const{fragment:i,on_mount:l,on_destroy:c,after_update:u}=t.$$;i&&i.m(n,o),a||M((()=>{const n=l.map(e).filter(r);c?c.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(M)}(o,a.target,a.anchor,a.customElement),P()}var T,b;d(g)}function j(t,e,n,s){if("a"===n&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?s:"a"===n?s.call(t):s?s.value:e.get(t)}function D(t,e,n,s,r){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?r.call(t,n):r?r.value=n:e.set(t,n),n}var x,C,S,N,U;class A{constructor(t){x.set(this,null),C.set(this,0),D(this,x,new DataView(t.buffer,t.byteOffset,t.byteLength),"f")}movePointer(t){return D(this,C,j(this,C,"f")+t,"f")}readInt(t){var e,n;if((t=Math.min(t,j(this,x,"f").byteLength-j(this,C,"f")))<1)return-1;let s=0;if(t>1)for(let n=1;n<=t-1;n++)s+=j(this,x,"f").getUint8(j(this,C,"f"))*Math.pow(256,t-n),D(this,C,(e=j(this,C,"f"),++e),"f");return s+=j(this,x,"f").getUint8(j(this,C,"f")),D(this,C,(n=j(this,C,"f"),++n),"f"),s}readInts(t,e){const n=[];for(let s=0;s<e;s++)n.push(this.readInt(t));return n}readStr(t){let e="";for(let n=1;n<=t;n++)e+=String.fromCharCode(this.readInt(1));return e}readIntVLV(){let t=0;if(j(this,C,"f")>=j(this,x,"f").byteLength)return-1;if(j(this,x,"f").getUint8(j(this,C,"f"))<128)return this.readInt(1);let e=[];for(;j(this,x,"f").getUint8(j(this,C,"f"))>=128;)e.push(this.readInt(1)-128);for(let n=1;n<=e.length;n++)t+=e[e.length-n]*Math.pow(128,n);return t+this.readInt(1)}}x=new WeakMap,C=new WeakMap;class F{constructor(t){this.tracks=[],this.meta=null,this.meta=t}}class L{}L.FileHeader=1297377380,L.TrackHeader=1297379947,L.TimeDivisionPPQ="PPQ",L.TimeDivisionFPS="FPS",L.TempoMessage=81,L.MetaMessage=255,L.ControlMessage=11,L.StringMetaTypes=[1,2,3,4,5,7,6],L.IntMetaTypes=[33,89,81],L.EndMetaTypes=[47,-1],L.MultiIntMetaTypes={84:5,88:4},L.DualIntTypes=[10,11,14,8,9],L.IntTypes=[12,13];class q{constructor(t){S.set(this,null),N.set(this,null),D(this,S,new A(t),"f")}static parse(t){return new q(t).parse()}validateHeader(t){const e=j(this,S,"f").readInt(4);return-1===e?null:e===t&&(j(this,S,"f").movePointer(4),!0)}parseFileMeta(){const t=j(this,S,"f").readInt(2),e=j(this,S,"f").readInt(2),n=j(this,S,"f").readInt(2);return{type:t,trackCount:e,timeDivision:{type:0==(1&n)?L.TimeDivisionPPQ:L.TimeDivisionFPS,value:-2&n}}}parseMessageMetaData(t,e){return L.StringMetaTypes.includes(t)?j(this,S,"f").readStr(e):L.IntMetaTypes.includes(t)?j(this,S,"f").readInt(e):L.MultiIntMetaTypes[t]?j(this,S,"f").readInts(1,L.MultiIntMetaTypes[t]):null}parseMessageData(t){return L.DualIntTypes.includes(t)?j(this,S,"f").readInts(1,2):L.IntTypes.includes(t)?j(this,S,"f").readInt(1):null}parseMessage(t){const e=t.toString(16).split("");e[1]||e.unshift("0");const n=parseInt(e[0],16);return{type:n,channel:parseInt(e[1],16),data:this.parseMessageData(n)}}parseMetaMessage(){const t=j(this,S,"f").readInt(1);return{metaType:t,data:this.parseMessageMetaData(t,j(this,S,"f").readIntVLV())}}readStatusType(){const t=j(this,S,"f").readInt(1);return-1===t?null:(t>=128?D(this,N,t,"f"):j(this,S,"f").movePointer(-1),j(this,N,"f"))}readMessage(){const t=j(this,S,"f").readIntVLV(),e=this.readStatusType();return e?Object.assign({deltaTime:t,statusType:e},e===L.MetaMessage?this.parseMetaMessage():this.parseMessage(e)):null}parse(){if(!this.validateHeader(L.FileHeader))throw new Error("Invalid or corrupt midi file; header check failed.");const t=new F(this.parseFileMeta()),e=[];for(let n=0;n<t.meta.trackCount;n++){const t={messages:[]},n=this.validateHeader(L.TrackHeader);if(null===n)break;if(!1===n)throw new Error("Invalid track found; header check failed.");for(;;){const e=this.readMessage();if(!e||!e.data)break;t.messages.push(e)}e.push(t)}return t.tracks=e,t}}S=new WeakMap,N=new WeakMap;class H{constructor(t,e=!1){this.debug=e,U.set(this,null),this.bpm=120,this.multiplier=1,D(this,U,t,"f"),this.resetTempo()}resetTempo(){const t=j(this,U,"f");if(0===t.meta.type)return;const e=t.tracks[0].messages.find((({metaType:t})=>t===L.TempoMessage));e&&1===t.meta.type&&this.updateTempo(e.data)}updateTempo(t){this.bpm=Math.round(6e7/t),this.multiplier=6e4/(this.bpm*j(this,U,"f").meta.timeDivision.value)}play(t,e=null){this.resetTempo(),"function"==typeof t&&(e=t,t=0===j(this,U,"f").meta.type?0:1);let n=0;const s={highest:-1/0,lowest:1/0};j(this,U,"f").tracks[t].messages.forEach((t=>{const r=this.read(t),{type:o}=r,a=
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
function(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]])}return n}(r,["type"]);a.note>s.highest&&(s.highest=a.note),a.note<s.lowest&&(s.lowest=a.note),n+=a.scaledDeltaTime,o===H.TypeNote&&setTimeout((()=>{e(a)}),n)})),this.debug&&console.log({stats:s})}read(t,e=!0){const{statusType:n,metaType:s,deltaTime:r,data:o,type:a}=t,i={deltaTime:r,scaledDeltaTime:r*this.multiplier};if(a===L.ControlMessage)return 64===o[0]?Object.assign(Object.assign({},i),{type:H.TypePedal,position:0===o[1]?H.PositionUp:H.PositionDown}):Object.assign(Object.assign({},i),{type:H.TypeUnknownControl,data:o,message:t});if(n===L.MetaMessage)return s!==L.TempoMessage?Object.assign(Object.assign({},i),{type:H.TypeUnknownMeta}):(e&&this.updateTempo(o),Object.assign(Object.assign({},i),{type:H.TypeTempoChange}));const[l,c]=o;return Object.assign(Object.assign(Object.assign({},i),this.noteInfo(l)),{type:H.TypeNote,position:0===c?H.PositionUp:H.PositionDown,velocity:c})}noteInfo(t){return Object.assign(Object.assign({note:t},H.Notes[(t+3)%H.Notes.length]),{scale:Math.floor(t/H.Notes.length-1)})}}function V(t,e,n){const s=t.slice();return s[8]=e[n],s}function W(e){let n,s,r;return{c(){n=f("button"),n.textContent="Play",h(n,"class","svelte-q8o1lr")},m(t,o){var a,i,l,u;c(t,n,o),s||(a=n,i="click",l=e[3],u={once:!0},a.addEventListener(i,l,u),r=()=>a.removeEventListener(i,l,u),s=!0)},p:t,d(t){t&&u(n),s=!1,r()}}}function Y(t){let e,n,s,r,o=t[2],a=[];for(let e=0;e<o.length;e+=1)a[e]=G(V(t,o,e));return{c(){e=f("p"),e.textContent="Seven stages of lief",n=p(),s=f("div"),r=f("div");for(let t=0;t<a.length;t+=1)a[t].c();h(e,"class","svelte-q8o1lr"),h(r,"id","notes"),h(r,"class","svelte-q8o1lr"),h(s,"id","content"),h(s,"class","svelte-q8o1lr")},m(t,o){c(t,e,o),c(t,n,o),c(t,s,o),l(s,r);for(let t=0;t<a.length;t+=1)a[t].m(r,null)},p(t,e){if(4&e){let n;for(o=t[2],n=0;n<o.length;n+=1){const s=V(t,o,n);a[n]?a[n].p(s,e):(a[n]=G(s),a[n].c(),a[n].m(r,null))}for(;n<a.length;n+=1)a[n].d(1);a.length=o.length}},d(t){t&&u(e),t&&u(n),t&&u(s),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(a,t)}}}function B(t){let e;return{c(){e=f("div"),h(e,"class","sharp svelte-q8o1lr")},m(t,n){c(t,e,n)},d(t){t&&u(e)}}}function G(t){let e,n,s,r=t[8].isSharp&&B();return{c(){e=f("div"),r&&r.c(),n=p(),h(e,"class",s="note"+(t[8].down?" down":"")+(t[8].isSharp?" sharp-parent":"")+" svelte-q8o1lr")},m(t,s){c(t,e,s),r&&r.m(e,null),l(e,n)},p(t,o){t[8].isSharp?r||(r=B(),r.c(),r.m(e,n)):r&&(r.d(1),r=null),4&o&&s!==(s="note"+(t[8].down?" down":"")+(t[8].isSharp?" sharp-parent":"")+" svelte-q8o1lr")&&h(e,"class",s)},d(t){t&&u(e),r&&r.d()}}}function Q(e){let n,s,r,o;function i(t,e){return t[1]?Y:W}let d=i(e),m=d(e);return{c(){var t,e;n=f("main"),s=f("audio"),s.textContent="Error: your web browser does not support this audio player.",o=p(),m.c(),t=s.src,e=r="song.mp3",a||(a=document.createElement("a")),a.href=e,t!==a.href&&h(s,"src","song.mp3"),h(n,"class","svelte-q8o1lr")},m(t,r){c(t,n,r),l(n,s),e[4](s),l(n,o),m.m(n,null)},p(t,[e]){d===(d=i(t))&&m?m.p(t,e):(m.d(1),m=d(t),m&&(m.c(),m.m(n,null)))},i:t,o:t,d(t){t&&u(n),e[4](null),m.d()}}}function K(t,e,n){var s=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))((function(r,o){function a(t){try{l(s.next(t))}catch(t){o(t)}}function i(t){try{l(s.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,i)}l((s=s.apply(t,e||[])).next())}))};let r,o=null,a=!1,i=[];return m((()=>s(void 0,void 0,void 0,(function*(){n(0,o.oncanplay=()=>{},o),n(0,o.onplay=()=>{r.play((t=>{n(2,i=i.map((e=>e.note===t.note?Object.assign(Object.assign({},e),{down:t.position===H.PositionDown}):e)))})),n(1,a=!0)},o);let t=yield fetch("/cute-tempo.mid");if(!t.ok)throw new Error(`HTTP ${t.status} - ${t.statusText}`);let e=yield t.arrayBuffer();const s=q.parse(new Uint8Array(e));r=new H(s);const l={};for(let t=24;t<=96;t++)l[t]=Object.assign(Object.assign({},r.noteInfo(t)),{down:!1});n(2,i=Object.values(l))})))),[o,a,i,function(){o.play()},function(t){y[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}U=new WeakMap,H.Notes=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"].map((t=>({noteName:t,isSharp:2===t.length}))),H.TypeTempoChange="TYPE_TEMPO_CHANGE",H.TypePedal="TYPE_PEDAL",H.TypeNote="TYPE_NOTE",H.TypeUnknownMeta="TYPE_UNKNOWN_META",H.TypeUnknownControl="TYPE_UNKNOWN_CONTROL",H.PositionUp="Up",H.PositionDown="Down";return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),_(this,t,K,Q,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
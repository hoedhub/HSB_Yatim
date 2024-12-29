(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const Vr=!1;var Br=Array.isArray,jr=Array.from,Yr=Object.defineProperty,ar=Object.getOwnPropertyDescriptor,Ur=Object.getOwnPropertyDescriptors,$r=Object.getPrototypeOf;const x=2,pr=4,tr=8,nr=16,T=32,W=64,X=128,I=256,U=512,w=1024,O=2048,V=4096,$=8192,M=16384,Hr=32768,Kr=65536,Wr=1<<19,zr=1<<20;function Gr(r){return r===this.v}function Jr(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Qr(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function Xr(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let er=!1;function Zr(){er=!0}const rt=2;function dr(r,t){var n={f:0,v:r,reactions:null,equals:Gr,version:0};return n}function tt(r){return nt(dr(r))}function nt(r){return d!==null&&d.f&x&&(E===null?gt([r]):E.push(r)),r}function et(r,t){return d!==null&&or()&&d.f&(x|nr)&&(E===null||!E.includes(r))&&Xr(),lt(r,t)}function lt(r,t){return r.equals(t)||(r.v=t,r.version=Cr(),hr(r,O),or()&&c!==null&&c.f&w&&!(c.f&T)&&(p!==null&&p.includes(r)?(b(c,O),Q(c)):k===null?mt([r]):k.push(r))),t}function hr(r,t){var n=r.reactions;if(n!==null)for(var e=or(),l=n.length,o=0;o<l;o++){var u=n[o],i=u.f;i&O||!e&&u===c||(b(u,t),i&(w|I)&&(i&x?hr(u,V):Q(u)))}}var sr,gr,mr;function ot(){if(sr===void 0){sr=window;var r=Element.prototype,t=Node.prototype;gr=ar(t,"firstChild").get,mr=ar(t,"nextSibling").get,r.__click=void 0,r.__className="",r.__attributes=null,r.__styles=null,r.__e=void 0,Text.prototype.__t=void 0}}function ut(r=""){return document.createTextNode(r)}function wr(r){return gr.call(r)}function Er(r){return mr.call(r)}function A(r,t){return wr(r)}function fr(r,t=1,n=!1){let e=r;for(;t--;)e=Er(e);return e}function yr(r){var t=r.children;if(t!==null){r.children=null;for(var n=0;n<t.length;n+=1){var e=t[n];e.f&x?lr(e):S(e)}}}function it(r){for(var t=r.parent;t!==null;){if(!(t.f&x))return t;t=t.parent}return null}function xr(r){var t,n=c;R(it(r));try{yr(r),t=Ar(r)}finally{R(n)}return t}function br(r){var t=xr(r),n=(F||r.f&I)&&r.deps!==null?V:w;b(r,n),r.equals(t)||(r.v=t,r.version=Cr())}function lr(r){yr(r),q(r,0),b(r,M),r.v=r.children=r.deps=r.ctx=r.reactions=null}function at(r,t){var n=t.last;n===null?t.last=t.first=r:(n.next=r,r.prev=n,t.last=r)}function z(r,t,n,e=!0){var l=(r&W)!==0,o=c,u={ctx:m,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:r|O,first:null,fn:t,last:null,next:null,parent:l?null:o,prev:null,teardown:null,transitions:null,version:0};if(n){var i=D;try{cr(!0),ur(u),u.f|=Hr}catch(f){throw S(u),f}finally{cr(i)}}else t!==null&&Q(u);var s=n&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&zr)===0;if(!s&&!l&&e&&(o!==null&&at(u,o),d!==null&&d.f&x)){var v=d;(v.children??(v.children=[])).push(u)}return u}function st(r){const t=z(W,r,!0);return(n={})=>new Promise(e=>{n.outro?dt(t,()=>{S(t),e(void 0)}):(S(t),e(void 0))})}function ft(r){return z(pr,r,!1)}function ct(r){return vt(r)}function vt(r,t=0){return z(tr|nr|t,r,!0)}function _t(r,t=!0){return z(tr|T,r,!0,t)}function kr(r){var t=r.teardown;if(t!==null){const n=d;L(null);try{t.call(null)}finally{L(n)}}}function Tr(r){var t=r.deriveds;if(t!==null){r.deriveds=null;for(var n=0;n<t.length;n+=1)lr(t[n])}}function Nr(r,t=!1){var n=r.first;for(r.first=r.last=null;n!==null;){var e=n.next;S(n,t),n=e}}function pt(r){for(var t=r.first;t!==null;){var n=t.next;t.f&T||S(t),t=n}}function S(r,t=!0){var n=!1;if((t||r.f&Wr)&&r.nodes_start!==null){for(var e=r.nodes_start,l=r.nodes_end;e!==null;){var o=e===l?null:Er(e);e.remove(),e=o}n=!0}Nr(r,t&&!n),Tr(r),q(r,0),b(r,M);var u=r.transitions;if(u!==null)for(const s of u)s.stop();kr(r);var i=r.parent;i!==null&&i.first!==null&&Fr(r),r.next=r.prev=r.teardown=r.ctx=r.deps=r.fn=r.nodes_start=r.nodes_end=null}function Fr(r){var t=r.parent,n=r.prev,e=r.next;n!==null&&(n.next=e),e!==null&&(e.prev=n),t!==null&&(t.first===r&&(t.first=e),t.last===r&&(t.last=n))}function dt(r,t){var n=[];Or(r,n,!0),ht(n,()=>{S(r),t()})}function ht(r,t){var n=r.length;if(n>0){var e=()=>--n||t();for(var l of r)l.out(e)}else t()}function Or(r,t,n){if(!(r.f&$)){if(r.f^=$,r.transitions!==null)for(const u of r.transitions)(u.is_global||n)&&t.push(u);for(var e=r.first;e!==null;){var l=e.next,o=(e.f&Kr)!==0||(e.f&T)!==0;Or(e,t,o?n:!1),e=l}}}let Y=!1,H=!1,K=null,D=!1;function cr(r){D=r}let Z=[],P=0;let d=null;function L(r){d=r}let c=null;function R(r){c=r}let E=null;function gt(r){E=r}let p=null,g=0,k=null;function mt(r){k=r}let Sr=1,F=!1,m=null;function Cr(){return++Sr}function or(){return!er||m!==null&&m.l===null}function G(r){var u,i;var t=r.f;if(t&O)return!0;if(t&V){var n=r.deps,e=(t&I)!==0;if(n!==null){var l;if(t&U){for(l=0;l<n.length;l++)((u=n[l]).reactions??(u.reactions=[])).push(r);r.f^=U}for(l=0;l<n.length;l++){var o=n[l];if(G(o)&&br(o),e&&c!==null&&!F&&!((i=o==null?void 0:o.reactions)!=null&&i.includes(r))&&(o.reactions??(o.reactions=[])).push(r),o.version>r.version)return!0}}(!e||c!==null&&!F)&&b(r,w)}return!1}function wt(r,t){for(var n=t;n!==null;){if(n.f&X)try{n.fn(r);return}catch{n.f^=X}n=n.parent}throw Y=!1,r}function Et(r){return(r.f&M)===0&&(r.parent===null||(r.parent.f&X)===0)}function J(r,t,n,e){if(Y){if(n===null&&(Y=!1),Et(t))throw r;return}n!==null&&(Y=!0);{wt(r,t);return}}function Ar(r){var _;var t=p,n=g,e=k,l=d,o=F,u=E,i=m,s=r.f;p=null,g=0,k=null,d=s&(T|W)?null:r,F=!D&&(s&I)!==0,E=null,m=r.ctx;try{var v=(0,r.fn)(),f=r.deps;if(p!==null){var a;if(q(r,g),f!==null&&g>0)for(f.length=g+p.length,a=0;a<p.length;a++)f[g+a]=p[a];else r.deps=f=p;if(!F)for(a=g;a<f.length;a++)((_=f[a]).reactions??(_.reactions=[])).push(r)}else f!==null&&g<f.length&&(q(r,g),f.length=g);return v}finally{p=t,g=n,k=e,d=l,F=o,E=u,m=i}}function yt(r,t){let n=t.reactions;if(n!==null){var e=n.indexOf(r);if(e!==-1){var l=n.length-1;l===0?n=t.reactions=null:(n[e]=n[l],n.pop())}}n===null&&t.f&x&&(p===null||!p.includes(t))&&(b(t,V),t.f&(I|U)||(t.f^=U),q(t,0))}function q(r,t){var n=r.deps;if(n!==null)for(var e=t;e<n.length;e++)yt(r,n[e])}function ur(r){var t=r.f;if(!(t&M)){b(r,w);var n=c,e=m;c=r;try{t&nr?pt(r):Nr(r),Tr(r),kr(r);var l=Ar(r);r.teardown=typeof l=="function"?l:null,r.version=Sr}catch(o){J(o,r,n,e||r.ctx)}finally{c=n}}}function xt(){if(P>1e3){P=0;try{Jr()}catch(r){if(K!==null)J(r,K,null);else throw r}}P++}function bt(r){var t=r.length;if(t!==0){xt();var n=D;D=!0;try{for(var e=0;e<t;e++){var l=r[e];l.f&w||(l.f^=w);var o=[];Dr(l,o),kt(o)}}finally{D=n}}}function kt(r){var t=r.length;if(t!==0)for(var n=0;n<t;n++){var e=r[n];if(!(e.f&(M|$)))try{G(e)&&(ur(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Fr(e):e.fn=null))}catch(l){J(l,e,null,e.ctx)}}}function Tt(){if(H=!1,P>1001)return;const r=Z;Z=[],bt(r),H||(P=0,K=null)}function Q(r){H||(H=!0,queueMicrotask(Tt)),K=r;for(var t=r;t.parent!==null;){t=t.parent;var n=t.f;if(n&(W|T)){if(!(n&w))return;t.f^=w}}Z.push(t)}function Dr(r,t){var n=r.first,e=[];r:for(;n!==null;){var l=n.f,o=(l&T)!==0,u=o&&(l&w)!==0,i=n.next;if(!u&&!(l&$))if(l&tr){if(o)n.f^=w;else try{G(n)&&ur(n)}catch(a){J(a,n,null,n.ctx)}var s=n.first;if(s!==null){n=s;continue}}else l&pr&&e.push(n);if(i===null){let a=n.parent;for(;a!==null;){if(r===a)break r;var v=a.next;if(v!==null){n=v;continue r}a=a.parent}}n=i}for(var f=0;f<e.length;f++)s=e[f],t.push(s),Dr(s,t)}function Lr(r){var f;var t=r.f,n=(t&x)!==0;if(n&&t&M){var e=xr(r);return lr(r),e}if(d!==null){E!==null&&E.includes(r)&&Qr();var l=d.deps;p===null&&l!==null&&l[g]===r?g++:p===null?p=[r]:p.push(r),k!==null&&c!==null&&c.f&w&&!(c.f&T)&&k.includes(r)&&(b(c,O),Q(c))}else if(n&&r.deps===null)for(var o=r,u=o.parent,i=o;u!==null;)if(u.f&x){var s=u;i=s,u=s.parent}else{var v=u;(f=v.deriveds)!=null&&f.includes(i)||(v.deriveds??(v.deriveds=[])).push(i);break}return n&&(o=r,G(o)&&br(o)),r.v}const Nt=~(O|V|w);function b(r,t){r.f=r.f&Nt|t}function Ft(r,t=!1,n){m={p:m,c:null,e:null,m:!1,s:r,x:null,l:null},er&&!t&&(m.l={s:null,u:null,r1:[],r2:dr(!1)})}function Ot(r){const t=m;if(t!==null){const u=t.e;if(u!==null){var n=c,e=d;t.e=null;try{for(var l=0;l<u.length;l++){var o=u[l];R(o.effect),L(o.reaction),ft(o.fn)}}finally{R(n),L(e)}}m=t.p,t.m=!0}return{}}const St=["touchstart","touchmove"];function Ct(r){return St.includes(r)}const Rr=new Set,rr=new Set;function At(r){for(var t=0;t<r.length;t++)Rr.add(r[t]);for(var n of rr)n(r)}function j(r){var ir;var t=this,n=t.ownerDocument,e=r.type,l=((ir=r.composedPath)==null?void 0:ir.call(r))||[],o=l[0]||r.target,u=0,i=r.__root;if(i){var s=l.indexOf(i);if(s!==-1&&(t===document||t===window)){r.__root=t;return}var v=l.indexOf(t);if(v===-1)return;s<=v&&(u=s)}if(o=l[u]||r.target,o!==t){Yr(r,"currentTarget",{configurable:!0,get(){return o||n}});var f=d,a=c;L(null),R(null);try{for(var _,h=[];o!==null;){var y=o.assignedSlot||o.parentNode||o.host||null;try{var N=o["__"+e];if(N!==void 0&&!o.disabled)if(Br(N)){var[qr,...Ir]=N;qr.apply(o,[r,...Ir])}else N.call(o,r)}catch(B){_?h.push(B):_=B}if(r.cancelBubble||y===t||y===null)break;o=y}if(_){for(let B of h)queueMicrotask(()=>{throw B});throw _}}finally{r.__root=t,delete r.currentTarget,L(f),R(a)}}}function Dt(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function Lt(r,t){var n=c;n.nodes_start===null&&(n.nodes_start=r,n.nodes_end=t)}function Mr(r,t){var n=(t&rt)!==0,e,l=!r.startsWith("<!>");return()=>{e===void 0&&(e=Dt(l?r:"<!>"+r),e=wr(e));var o=n?document.importNode(e,!0):e.cloneNode(!0);return Lt(o,o),o}}function Pr(r,t){r!==null&&r.before(t)}function Rt(r,t){var n=t==null?"":typeof t=="object"?t+"":t;n!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=n,r.nodeValue=n==null?"":n+"")}function Mt(r,t){return Pt(r,t)}const C=new Map;function Pt(r,{target:t,anchor:n,props:e={},events:l,context:o,intro:u=!0}){ot();var i=new Set,s=a=>{for(var _=0;_<a.length;_++){var h=a[_];if(!i.has(h)){i.add(h);var y=Ct(h);t.addEventListener(h,j,{passive:y});var N=C.get(h);N===void 0?(document.addEventListener(h,j,{passive:y}),C.set(h,1)):C.set(h,N+1)}}};s(jr(Rr)),rr.add(s);var v=void 0,f=st(()=>{var a=n??t.appendChild(ut());return _t(()=>{if(o){Ft({});var _=m;_.c=o}l&&(e.$$events=l),v=r(a,e)||{},o&&Ot()}),()=>{var y;for(var _ of i){t.removeEventListener(_,j);var h=C.get(_);--h===0?(document.removeEventListener(_,j),C.delete(_)):C.set(_,h)}rr.delete(s),a!==n&&((y=a.parentNode)==null||y.removeChild(a))}});return qt.set(v,f),v}let qt=new WeakMap;function vr(r,t,n,e){var l=r.__attributes??(r.__attributes={});l[t]!==(l[t]=n)&&(n==null?r.removeAttribute(t):typeof n!="string"&&It(r).includes(t)?r[t]=n:r.setAttribute(t,n))}var _r=new Map;function It(r){var t=_r.get(r.nodeName);if(t)return t;_r.set(r.nodeName,t=[]);for(var n,e=r,l=Element.prototype;l!==e;){n=Ur(e);for(var o in n)n[o].set&&t.push(o);e=$r(e)}return t}const Vt="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Vt);Zr();const Bt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",jt="/vite.svg",Yt=(r,t)=>{et(t,Lr(t)+1)};var Ut=Mr("<button> </button>");function $t(r){let t=tt(0);var n=Ut();n.__click=[Yt,t];var e=A(n);ct(()=>Rt(e,`count is ${Lr(t)??""}`)),Pr(r,n)}At(["click"]);var Ht=Mr('<main><div><a href="https://vite.dev" target="_blank" rel="noreferrer"><img class="logo svelte-11cv5lq" alt="Vite Logo"></a> <a href="https://svelte.dev" target="_blank" rel="noreferrer"><img class="logo svelte svelte-11cv5lq" alt="Svelte Logo"></a></div> <h1>Vite + Svelte</h1> <div class="card"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-11cv5lq">Click on the Vite and Svelte logos to learn more</p></main>');function Kt(r){var t=Ht(),n=A(t),e=A(n),l=A(e);vr(l,"src",jt);var o=fr(e,2),u=A(o);vr(u,"src",Bt);var i=fr(n,4),s=A(i);$t(s),Pr(r,t)}Mt(Kt,{target:document.getElementById("app")});

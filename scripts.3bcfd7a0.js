parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vKjy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(){var e,t,n,i=0,l=0,o=[],a=function(){!function(){e.addEventListener("mousedown",function(t){c.down=!0,c.x=e.offsetLeft-t.clientX,c.y=e.offsetTop-t.clientY,e.style.cursor="grabbing"},!0),e.addEventListener("mousemove",function(t){var n=t.clientX,o=t.clientY;if(c.down){var a=c.x+n,s=c.y+o;s>=window.innerHeight&&(s=window.innerHeight-l,c.x=e.offsetLeft-t.clientX,c.y=e.offsetTop-t.clientY),s<=-l&&(s=0,c.x=e.offsetLeft-t.clientX,c.y=e.offsetTop-t.clientY),a<=-i&&(a=0,c.x=e.offsetLeft-t.clientX,c.y=e.offsetTop-t.clientY),a>=window.innerWidth&&(a=window.innerWidth-i,c.x=e.offsetLeft-t.clientX,c.y=e.offsetTop-t.clientY),d(a,s)}},!0),window.addEventListener("mouseup",function(){if(!c.down)return;c.down=!1,e.style.cursor=""},!0)}()},s=function(){for(var o=Math.ceil(window.innerWidth/i),a=Math.ceil(window.innerHeight/l),s=0;s<o;s++){var c=n.cloneNode(!0);c.classList.add("infinite-gallery-dummy"),c.style.left="-".concat((i+t.gap)*(s+1),"px"),c.style.top="0px",e.appendChild(c)}for(var d=0;d<o;d++){var r=n.cloneNode(!0);r.classList.add("infinite-gallery-dummy"),r.style.left="".concat((i+t.gap)*(d+1),"px"),r.style.top="0px",e.appendChild(r)}for(var p=0;p<a;p++){var f=n.cloneNode(!0);f.classList.add("infinite-gallery-dummy"),f.style.left="0px",f.style.top="".concat((l+t.gap)*(p+1),"px"),e.appendChild(f)}for(var y=0;y<a;y++){var m=n.cloneNode(!0);m.classList.add("infinite-gallery-dummy"),m.style.left="0px",m.style.top="-".concat((l+t.gap)*(y+1),"px"),e.appendChild(m)}for(var u=0;u<a;u++){for(var g=0;g<o;g++){var v=n.cloneNode(!0);v.classList.add("infinite-gallery-dummy"),v.style.left="".concat((i+t.gap)*(g+1),"px"),v.style.top="-".concat((l+t.gap)*(u+1),"px"),e.appendChild(v)}for(var x=0;x<o;x++){var h=n.cloneNode(!0);h.classList.add("infinite-gallery-dummy"),h.style.left="".concat((i+t.gap)*(x+1),"px"),h.style.top="".concat((l+t.gap)*(u+1),"px"),e.appendChild(h)}for(var w=0;w<o;w++){var L=n.cloneNode(!0);L.classList.add("infinite-gallery-dummy"),L.style.left="-".concat((i+t.gap)*(w+1),"px"),L.style.top="-".concat((l+t.gap)*(u+1),"px"),e.appendChild(L)}for(var C=0;C<o;C++){var N=n.cloneNode(!0);N.classList.add("infinite-gallery-dummy"),N.style.left="-".concat((i+t.gap)*(C+1),"px"),N.style.top="".concat((l+t.gap)*(u+1),"px"),e.appendChild(N)}}},c={down:!1,x:0,y:0},d=function(t,n){e.style.top="".concat(n,"px"),e.style.left="".concat(t,"px")};return{mount:function(c){var d,r,p,f,y,m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(r=(d={}).itemElementClassName,itemElementClassName=void 0===r?".image":r,p=d.gap,gap=void 0===p?30:p,f=d.itemsX,itemsX=void 0===f?4:f,y=d.itemsY,itemsY=void 0===y?4:y,d);(e=document.querySelector(c)).classList.add("infinite-gallery"),n=e.querySelector(".infinite-gallery-body");var u=e.querySelectorAll(m.itemElementClassName),g=e.querySelector(m.itemElementClassName).clientWidth,v=e.querySelector(m.itemElementClassName).clientHeight;i=g*m.itemsX+(m.itemsX-1)*m.gap,l=v*m.itemsY+(m.itemsY-1)*m.gap,n.style.width="".concat(i,"px"),n.style.height="".concat(l,"px"),u.forEach(function(e,t){var n=e.clientWidth,i=e.clientHeight;e.style.position="absolute";var l=Math.floor(t/m.itemsX),a=t%m.itemsX,s=0===a?0:m.gap*a,c=0===l?0:m.gap*l;e.style.top="".concat(l*i+c,"px"),e.style.left="".concat(a*n+s,"px"),o.push({x:l*i+c,y:a*n+s,element:e})}),t=m,s(),a()}}},t=e();exports.default=t;
},{}],"Aa3Y":[function(require,module,exports) {
"use strict";var e=t(require("./infinite-gallery"));function t(e){return e&&e.__esModule?e:{default:e}}e.default.mount("#gallery",{itemsX:4,itemsY:4,itemElementClassName:".image",gap:30});
},{"./infinite-gallery":"vKjy"}]},{},["Aa3Y"], null)
//# sourceMappingURL=/infinite-2d-gallery/scripts.3bcfd7a0.js.map
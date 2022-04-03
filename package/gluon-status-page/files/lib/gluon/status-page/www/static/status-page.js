"use strict";!function(){var r=JSON.parse(document.body.getAttribute("data-translations"));function i(t,e){return t.toFixed(e).replace(/\./,r["."])}function a(t,e){e--;for(var n=t;10<=n&&0<e;n/=10)e--;return i(t,e)}function o(t){var e=["","K","M","G","T"],n=1024,i=t,r=0;if(void 0===i)return"- ";for(;n<i&&r<e.length-1;)i/=n,r++;return(i=a(i,3))+" "+e[r]}String.prototype.sprintf=function(){var t=0,e=arguments;return this.replace(/%s/g,function(){return e[t++]})};var l={id:function(t){return t},decimal:function(t){return i(t,2)},percent:function(t){return r["%s used"].sprintf(a(100*t,3)+"%")},memory:function(t){t=1-t.available/t.total;return l.percent(t)},time:function(t){var t=Math.round(t/60),e=Math.floor(t/1440),n=Math.floor(t%1440/60),t=Math.floor(t%60),i="";return 1===e?i+=r["1 day"]+", ":1<e&&(i+=r["%s days"].sprintf(e)+", "),i+=n+":",t<10&&(i+="0"),i+=t},packetsDiff:function(t,e,n){if(0<n)return t=(t-e)/n,r["%s packets/s"].sprintf(i(t,0))},bytesDiff:function(t,e,n){if(0<n)return o(8*((t-e)/n))+"bps"},bytes:function(t){return o(t)+"B"},neighbour:function(t){if(!t)return"";for(var e in c){var n,i,r=c[e].lookup_neigh(t);if(r)return n=document.createElement("span"),i=(n.appendChild(document.createTextNode("via ")),document.createElement("a")),i.href="http://["+r.get_addr()+"]/",i.textContent=r.get_hostname(),n.appendChild(i),n.appendChild(document.createTextNode(" ("+e+")")),n}return"via "+t+" (unknown iface)"}};function s(e,t){return t.split("/").forEach(function(t){e=e&&e[t]}),e}function d(t,e){var n=new EventSource(t),i={};n.onmessage=function(t){t=JSON.parse(t.data);e(t,i),i=t},n.onerror=function(){n.close(),window.setTimeout(function(){d(t,e)},3e3)}}var x,k=document.body.getAttribute("data-node-address");try{x=JSON.parse(document.body.getAttribute("data-node-location"))}catch(t){}function t(t){var e=document.getElementById("mesh-vpn");if(t){e.style.display="";for(var i=document.getElementById("mesh-vpn-peers");i.firstElementChild.lastChild;)i.firstElementChild.removeChild(i.firstElementChild.lastChild);t=function e(n,i){return Object.keys(i.peers||{}).forEach(function(t){n.push([t,i.peers[t]])}),Object.keys(i.groups||{}).forEach(function(t){e(n,i.groups[t])}),n}([],t);t.sort(),t.forEach(function(t){var e=document.createElement("tr"),n=document.createElement("th"),n=(n.textContent=t[0],e.appendChild(n),document.createElement("td"));t[1]?n.textContent=r.connected+" ("+l.time(t[1].established)+")":n.textContent=r["not connected"],e.appendChild(n),i.firstElementChild.appendChild(e)})}else e.style.display="none"}var e=document.querySelectorAll("[data-statistics]");d("/cgi-bin/dyn/statistics",function(a,o){var c=a.uptime-o.uptime;e.forEach(function(t){var e=t.getAttribute("data-statistics"),n=t.getAttribute("data-format"),i=s(o,e),e=s(a,e);try{var r=l[n](e,i,c);"object"==typeof r?(t.lastChild&&t.removeChild(t.lastChild),t.appendChild(r)):t.textContent=r}catch(t){console.error(t)}});try{t(a.mesh_vpn)}catch(t){console.error(t)}});var c={};function A(n){var i=document.createElement("canvas"),r=i.getContext("2d"),a=null;return{canvas:i,highlight:!1,resize:function(t,e){var n;try{n=r.getImageData(0,0,t,e)}catch(t){}i.width=t,i.height=e,n&&r.putImageData(n,0,0)},draw:function(t,e){var e=e(a);r.clearRect(t,0,5,i.height),e&&(t=t,e=e,r.beginPath(),r.fillStyle=n,r.arc(t,e,1.2,0,2*Math.PI,!1),r.closePath(),r.fill())},set:function(t){a=t}}}function h(){var a=-100,o=0,c=0,l=[],s=document.createElement("canvas"),u=(s.className="signalgraph",s.height=200,s.getContext("2d"));function d(){s.width=s.clientWidth,l.forEach(function(t){t.resize(s.width,s.height)})}function n(){if(0!==s.clientWidth){s.width!==s.clientWidth&&d(),u.clearRect(0,0,s.width,s.height);var e=!1,t=(l.forEach(function(t){t.highlight&&(e=!0)}),u.save(),l.forEach(function(t){e&&(u.globalAlpha=.2),t.highlight&&(u.globalAlpha=1),t.draw(c,function(t){return e=s.height,(1-(t-a)/(o-a))*e;var e}),u.drawImage(t.canvas,0,0)}),u.restore(),u.save(),u.beginPath(),u.strokeStyle="rgba(255, 180, 0, 0.15)",u.lineWidth=5,u.moveTo(c+2.5,0),u.lineTo(c+2.5,s.height),u.stroke(),Math.floor(s.height/40));u.save(),u.lineWidth=.5,u.strokeStyle="rgba(0, 0, 0, 0.25)",u.fillStyle="rgba(0, 0, 0, 0.5)",u.textAlign="end",u.textBaseline="bottom",u.beginPath();for(var n=0;n<t;n++){var i=s.height-40*n,r=(u.moveTo(0,i-.5),u.lineTo(s.width,i-.5),Math.round((r=s.height,(a*i+o*(r-i))/r))+" dBm");u.save(),u.strokeStyle="rgba(255, 255, 255, 0.9)",u.lineWidth=4,u.miterLimit=2,u.strokeText(r,s.width-5,i-2.5),u.fillText(r,s.width-5,i-2.5),u.restore()}u.stroke(),u.strokeStyle="rgba(0, 0, 0, 0.83)",u.lineWidth=1.5,u.strokeRect(.5,.5,s.width-1,s.height-1),u.restore()}}d(),window.addEventListener("resize",n);var i=0;return window.requestAnimationFrame(function t(e){40<e-i&&(n(),c=(c+1)%s.width,i=e),window.requestAnimationFrame(t)}),{el:s,addSignal:function(t){l.push(t),t.resize(s.width,s.height)},removeSignal:function(t){l.splice(l.indexOf(t),1)}}}function f(t,o,e,n){var i,r=t.table.firstElementChild.firstElementChild,a=t.table.firstElementChild.insertRow(),c=a.insertCell(),l=(c.setAttribute("data-label",r.children[0].textContent),t.wireless&&((i=document.createElement("span")).textContent="⬤ ",i.style.color=e,c.appendChild(i)),document.createElement("span")),s=(l.textContent=o,c.appendChild(l),{});for(var u,d,h,f,g,m,p,v,b,C=0;C<r.children.length;C++)u=r.children[C],f=h=d=void 0,(f=u.getAttribute("data-key"))&&(d=u.getAttribute("data-suffix")||"",(h=a.insertCell()).textContent="-",h.setAttribute("data-label",u.textContent),s[f]={td:h,suffix:d});function y(){b&&window.clearTimeout(b),b=window.setTimeout(function(){v&&t.signalgraph.removeSignal(v),a.parentNode.removeChild(a),n()},6e4)}function E(t){var e,t=function(t){"::"==(t="::"==t.slice(0,2)?"0"+t:t).slice(-2)&&(t+="0");for(var e=t.split(":"),n=e.length,i=[],r=0;r<e.length;r++){var a=e[r];if(""===a)for(;n++<=8;)i.push(0);else{if(!/^[a-f0-9]{1,4}$/i.test(a))return;i.push(parseInt(a,16))}}return i}(t);if(t)return e="",t.forEach(function(t){e+=("0000000000000000"+t.toString(2)).slice(-16)}),e}function w(t){var i=E(k);if(t&&t[0])return(t=t.map(function(t){var e=E(t);if(!e)return[-1];var n=0;return[n=i?function(t,e){for(var n=0;n<t.length&&n<e.length&&t[n]===e[n];n++);return n}(i,e):n,e,t]})).sort(function(t,e){return t[0]<e[0]?1:t[0]>e[0]||t[1]<e[1]?-1:t[1]>e[1]?1:0}),t=t[0][2],t&&!/^fe80:/i.test(t)?t:void 0}return t.wireless&&((g=a.insertCell()).textContent="-",g.setAttribute("data-label",r.children[Object.keys(s).length+1].textContent),(m=a.insertCell()).textContent="-",m.setAttribute("data-label",r.children[Object.keys(s).length+2].textContent),(p=a.insertCell()).textContent="-",p.setAttribute("data-label",r.children[Object.keys(s).length+3].textContent),v=A(e),t.signalgraph.addSignal(v)),a.onmouseenter=function(){a.classList.add("highlight"),v&&(v.highlight=!0)},a.onmouseleave=function(){a.classList.remove("highlight"),v&&(v.highlight=!1)},y(),{get_hostname:function(){return l.textContent},get_addr:function(){return o},update_nodeinfo:function(t){var e,n,i,r,a;(o=w(t.network.addresses))&&("span"===l.nodeName.toLowerCase()&&(e=l,l=document.createElement("a"),e.parentNode.replaceChild(l,e)),l.href="http://["+o+"]/"),l.textContent=t.hostname,x&&t.location&&(e=x.latitude,n=x.longitude,i=t.location.latitude,t=t.location.longitude,r=Math.PI/180,a=(i*=r)-(e*=r),t=(t*=r)-(n*=r),r=Math.sin(a/2)*Math.sin(a/2)+Math.sin(t/2)*Math.sin(t/2)*Math.cos(e)*Math.cos(i),n=6372.8*(2*Math.asin(Math.sqrt(r))),m.textContent=Math.round(1e3*n)+" m"),y()},update_mesh:function(n){Object.keys(s).forEach(function(t){var e=s[t];e.td.textContent=n[t]+e.suffix}),y()},update_wifi:function(t){g.textContent=t.signal,p.textContent=Math.round(t.inactive/1e3)+" s",a.classList.toggle("inactive",200<t.inactive),v.set(200<t.inactive?null:t.signal),y()}}}function u(t,e,n){var i,a={},r=(n&&(i=h(),t.appendChild(i.el)),{table:t.firstElementChild,signalgraph:i,ifname:e,wireless:n}),o=!1,c={},l=[];function s(){var t;o||(o=!0,(t=new EventSource("/cgi-bin/dyn/neighbours-nodeinfo?"+encodeURIComponent(e))).addEventListener("neighbour",function(t){try{var n=JSON.parse(t.data);i=[],r=n.network.mesh,Object.keys(r).forEach(function(t){var e=r[t].interfaces;Object.keys(e).forEach(function(t){e[t].forEach(function(t){i.push(t)})})}),i.forEach(function(t){var e=a[t];if(e){delete c[t];try{e.update_nodeinfo(n)}catch(t){console.error(t)}}})}catch(t){console.error(t)}var i,r},!1),t.onerror=function(){t.close(),o=!1,Object.keys(c).forEach(function(t){0<c[t]&&(c[t]--,s())})})}function u(t){var e=a[t];return e||(c[t]=3,e=a[t]=f(r,t,(l=l[0]?l:["#396AB1","#DA7C30","#3E9651","#CC2529","#535154","#6B4C9A","#922428","#948B3D"]).shift(),function(){delete c[t],delete a[t]}),s()),e}return n&&d("/cgi-bin/dyn/stations?"+encodeURIComponent(e),function(n){Object.keys(n).forEach(function(t){var e=n[t];u(t).update_wifi(e)})}),{get_neigh:u,lookup_neigh:function(t){return a[t]}}}document.querySelectorAll("[data-interface]").forEach(function(t){var e=t.getAttribute("data-interface"),n=(t.getAttribute("data-interface-address"),!!t.getAttribute("data-interface-wireless"));c[e]=u(t,e,n)});var n=document.body.getAttribute("data-mesh-provider");n&&d(n,function(i){Object.keys(i).forEach(function(t){var e=i[t],n=c[e.ifname];n&&n.get_neigh(t).update_mesh(e)})})}();
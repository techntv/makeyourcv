/*! leipzig.js v0.8.0 | ISC License | github.com/bdchauvette/leipzig.js */
!function(e,t){if("function"==typeof define&&define.amd)define("Leipzig",["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var i={exports:{}};t(i.exports,i),e.Leipzig=i.exports}}(this,function(e,t){"use strict";function i(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function n(e,t){var i;if(e.classList)i=e.classList.contains(t);else{var t=new RegExp("(^| )"+t+"( |$)","gi");i=new RegExp(t).test(e.className)}return i}function r(e,t){var i=void 0;return window.CustomEvent?i=new CustomEvent(e,{detail:t,bubbles:!0,cancelable:!0}):(i=document.createEvent("CustomEvent"),i.initCustomEvent(e,!0,!0,t)),i}function s(e,t,i){var n=new r(t,i);e.dispatchEvent(n)}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},a={1:"first person",2:"second person",3:"third person",A:"agent-like argument of canonical transitive verb",ABL:"ablative",ABS:"absolutive",ACC:"accusative",ADJ:"adjective",ADV:"adverb(ial)",AGR:"agreement",ALL:"allative",ANTIP:"antipassive",APPL:"applicative",ART:"article",AUX:"auxiliary",BEN:"benefactive",CAUS:"causative",CLF:"classifier",COM:"comitative",COMP:"complementizer",COMPL:"completive",COND:"conditional",COP:"copula",CVB:"converb",DAT:"dative",DECL:"declarative",DEF:"definite",DEM:"demonstrative",DET:"determiner",DIST:"distal",DISTR:"distributive",DU:"dual",DUR:"durative",ERG:"ergative",EXCL:"exclusive",F:"feminine",FOC:"focus",FUT:"future",GEN:"genitive",IMP:"imperative",INCL:"inclusive",IND:"indicative",INDF:"indefinite",INF:"infinitive",INS:"instrumental",INTR:"intransitive",IPFV:"imperfective",IRR:"irrealis",LOC:"locative",M:"masculine",N:"neuter",NEG:"negation / negative",NMLZ:"nominalizer / nominalization",NOM:"nominative",OBJ:"object",OBL:"oblique",P:"patient-like argument of canonical transitive verb",PASS:"passive",PFV:"perfective",PL:"plural",POSS:"possessive",PRED:"predicative",PRF:"perfect",PRS:"present",PROG:"progressive",PROH:"prohibitive",PROX:"proximal / proximate",PST:"past",PTCP:"participle",PURP:"purposive",Q:"question particle / marker",QUOT:"quotative",RECP:"reciprocal",REFL:"reflexive",REL:"relative",RES:"resultative",S:"single argument of canonical intransitive verb",SBJ:"subject",SBJV:"subjunctive",SG:"singular",TOP:"topic",TR:"transitive",VOC:"vocative"},l=function c(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!(this instanceof c))return new c(e,t);if("undefined"!=typeof e)if("string"==typeof e||e instanceof NodeList||e instanceof Element)t.selector=e;else{if("object"!=typeof e)throw new Error("Invalid selector");t=e}this.config(t)};l.prototype.config=function(e){var t={selector:"[data-gloss]",lastLineFree:!0,firstLineOrig:!1,spacing:!0,autoTag:!0,async:!1,lexer:/{(.*?)}|([^\s]+)/g,events:{beforeGloss:"gloss:beforeGloss",afterGloss:"gloss:afterGloss",beforeLex:"gloss:beforeLex",afterLex:"gloss:afterLex",beforeAlign:"gloss:beforeAlign",afterAlign:"gloss:afterAlign",beforeFormat:"gloss:beforeFormat",afterFormat:"gloss:afterFormat",start:"gloss:start",complete:"gloss:complete"},classes:{glossed:"gloss--glossed",noSpace:"gloss--no-space",words:"gloss__words",word:"gloss__word",spacer:"gloss__word--spacer",abbr:"gloss__abbr",line:"gloss__line",lineNum:"gloss__line--",original:"gloss__line--original",freeTranslation:"gloss__line--free",noAlign:"gloss__line--no-align",hidden:"gloss__line--hidden"},abbreviations:a};if(o(t,e),!("string"==typeof t.selector||t.selector instanceof NodeList||t.selector instanceof Element))throw new Error("Invalid selector");if(!(t.lexer instanceof RegExp))if("string"==typeof t.lexer)t.lexer=new RegExp(t.lexer,"g");else{if(!(t.lexer instanceof Array))throw new Error("Invalid lexer");var i=t.lexer.join("|");t.lexer=new RegExp(i,"g")}o(this,t)},l.prototype.addAbbreviations=function(e){if("object"!=typeof e)throw new Error("Invalid abbreviations");o(this.abbreviations,e)},l.prototype.setAbbreviations=function(e){if("object"!=typeof e)throw new Error("Invalid abbreviations");this.abbreviations=e},l.prototype.lex=function(e){var t=this.lexer,i=e.match(t).map(function(e){var t=e[0],i=e[e.length-1];if("{"===t&&"}"===i){var n=/(?:{)(.*)(?:})/;e=n.exec(e)[1]}return e});return i},l.prototype.tag=function(e){var t=this.classes,i=this.abbreviations,n=/(\b[0-4])(?=[A-Z]|\b)|(N?[A-Z]+\b)/g,r=e.replace(n,function(e){var n="N"===e[0]&&e.length>1,r=n?e.slice(1):e,s=void 0,o=void 0;return i[e]?(o=i[e],s='<abbr class="'+t.abbr+'" title="'+o+'">'+e+"</abbr>"):n&&i[r]?(o=i[r],s='<abbr class="'+t.abbr+'" title="non-'+o+'">'+e+"</abbr>"):s='<abbr class="'+t.abbr+'">'+e+"</abbr>",s});return r},l.prototype.align=function(e){var t=e.reduce(function(e,t){return e.length>t.length?e:t},[]);return t.map(function(t,i){return e.map(function(e){return"undefined"==typeof e[i]?"":e[i]})})},l.prototype.format=function(e,t,n){var r=this,s=(this.tag,this.spacing),o=this.autoTag,a=this.classes,l=document.createElement(t),c=[];return i(l,a.words),e.forEach(function(e){var t=[],i=!0;e.forEach(function(e,s){var l=n+s,c=[a.line,a.lineNum+l];e.length&&(i=!1),s>0&&o&&(e=r.tag(e)),t.push('<p class="'+c.join(" ")+'">'+e+"</p>")});var l=a.word;i&&!s&&(l+=" "+a.spacer),c.push('<div class="'+l+'">',t.join(""),"</div>")}),l.innerHTML=c.join(""),l},l.prototype.gloss=function(e){var t=this,r=this.selector,o=this.classes,a=this.events,l=this.firstLineOrig,c=this.lastLineFree,f=this.spacing,u=this.async,v=function(e,r){if(!(e instanceof Element)){var u=new Error("Invalid gloss element");if("function"!=typeof r)throw u;r(u)}var v=Array.prototype.slice.call(e.children),p=[],g=null,d=0;if(s(e,a.beforeGloss),l){var m=v[0];i(m,o.original)}if(c){var b=v[v.length-1];i(b,o.freeTranslation)}v.forEach(function(e,r){var l=n(e,o.original),c=n(e,o.freeTranslation),f=n(e,o.noAlign),u=!l&&!c&&!f;if(u){s(e,a.beforeLex,{lineNum:r});var v=t.lex(e.innerHTML);s(e,a.afterLex,{tokens:v,lineNum:r}),p.push(v),i(e,o.hidden),g||(g=e,d=r)}else i(e,o.line),i(e,o.lineNum+r)});var h=d+(p.length-1);s(e,a.beforeAlign,{lines:p,firstLineNum:d,lastLineNum:h});var L=t.align(p);s(e,a.afterAlign,{lines:L,firstLineNum:d,lastLineNum:h});var E=void 0;E="UL"===e.tagName||"OL"===e.tagName?"li":"div",s(e,a.beforeFormat,{lines:L,firstLineNum:d,lastLineNum:h});var x=t.format(L,E,d);e.insertBefore(x,g),s(x,a.afterFormat,{firstLineNum:d,lastLineNum:h}),f||i(e,o.noSpace),i(e,o.glossed),s(e,a.afterGloss)},p=void 0;if(r instanceof NodeList)p=r;else if("string"==typeof r)p=document.querySelectorAll(r);else if(r instanceof Element)p=[r];else{var g=new Error("Invalid selector");if("function"!=typeof e)throw g;e(g)}s(document,a.start,{glosses:p});for(var d=Array.prototype.slice.call(p),m=function(t){var i=d[t];u?window.setTimeout(function(){return v(i,e)}):v(i,e)},b=0;b<d.length;b++)m(b);window.setTimeout(function(){"function"==typeof e&&e(null,p),s(document,a.complete,{glosses:p})})},t.exports=l});

//Loader:
window.registerCSS(false,".gloss--glossed{border-left:3px solid #bbb;border-top:2px solid #bbb;padding-left:6px;margin-top:6px}.gloss--glossed:after{clear:left;content:'';display:block}ul.gloss--glossed,ol.gloss--glossed{padding-left:0}ul.gloss--glossed li,ol.gloss--glossed li{list-style-type:none}.gloss__abbr{font-variant:small-caps;font-variant-numeric:oldstyle-nums;text-transform:lowercase}.gloss__word{float:left;margin-bottom:1em;margin-right:1em}.gloss__word p{margin:0}.gloss--no-space .gloss__word{margin-right:0}.gloss--no-space .gloss__word.gloss__word--spacer{margin-right:1.5em}.gloss__words:first-child,.gloss--glossed li:first-child{margin-top:1em}.gloss--glossed li:last-child{margin-bottom:1em}.gloss__word .gloss__line:first-child{font-style:italic}.gloss__line--original{font-weight:700}.gloss__line--free,.gloss__line--no-align{clear:left}.gloss__line--hidden{display:none}.negative-gloss .gloss--glossed,div.negative-gloss{border-left:3px solid #f66 !important;border-top:2px solid #f66 !important}.negative-gloss .gloss__line--free::before{display:block-inline;content:'!';font-weight:700;color:#000;padding:0 6px;border:1px solid #f66;background:rgba(255,102,102,0.4);margin-right:8px}.negative-gloss .gloss__line--original::before{content:'*'}");
window.registerLoadScript(function(){
  var leipzig = new Leipzig(window.leipzigConfig||{firstLineOrig:true});
  leipzig.addAbbreviations(window.leipzigAbbreviations||{});
  leipzig.gloss();
});
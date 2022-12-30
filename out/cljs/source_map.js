// Compiled by ClojureScript 1.11.54 {:optimize-constants false, :optimizations :simple}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
goog.require('goog.object');
goog.scope(function(){
cljs.source_map.goog$module$goog$object = goog.module.get('goog.object');
});
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__2237){
var vec__2238 = p__2237;
var i = cljs.core.nth.call(null,vec__2238,(0),null);
var v = cljs.core.nth.call(null,vec__2238,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__2241 = seg;
var gcol = cljs.core.nth.call(null,vec__2241,(0),null);
var source = cljs.core.nth.call(null,vec__2241,(1),null);
var line = cljs.core.nth.call(null,vec__2241,(2),null);
var col = cljs.core.nth.call(null,vec__2241,(3),null);
var name = cljs.core.nth.call(null,vec__2241,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(cljs.source_map.goog$module$goog$object.get.call(null,source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5457__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__5457__auto__)){
var name__$1 = temp__5457__auto__;
return (cljs.source_map.goog$module$goog$object.get.call(null,source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__2244 = seg;
var gcol = cljs.core.nth.call(null,vec__2244,(0),null);
var source = cljs.core.nth.call(null,vec__2244,(1),null);
var line = cljs.core.nth.call(null,vec__2244,(2),null);
var col = cljs.core.nth.call(null,vec__2244,(3),null);
var name = cljs.core.nth.call(null,vec__2244,(4),null);
var vec__2247 = relseg;
var rgcol = cljs.core.nth.call(null,vec__2247,(0),null);
var rsource = cljs.core.nth.call(null,vec__2247,(1),null);
var rline = cljs.core.nth.call(null,vec__2247,(2),null);
var rcol = cljs.core.nth.call(null,vec__2247,(3),null);
var rname = cljs.core.nth.call(null,vec__2247,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__5043__auto__ = source;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__5043__auto__ = line;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__5043__auto__ = col;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__5043__auto__ = name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__2250 = segmap;
var map__2250__$1 = cljs.core.__destructure_map.call(null,map__2250);
var gcol = cljs.core.get.call(null,map__2250__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__2250__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__2250__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__2250__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__2250__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,(function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,(function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,(function (v){
return cljs.core.conj.call(null,v,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map.call(null)));
}),cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__2252 = arguments.length;
switch (G__2252) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,cljs.source_map.goog$module$goog$object.get.call(null,source_map,"mappings"),source_map);
}));

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = cljs.source_map.goog$module$goog$object.get.call(null,source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__2256 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__2260 = cljs.core.next.call(null,segs__$1);
var G__2261 = nrelseg;
var G__2262 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__2260;
relseg__$1 = G__2261;
result__$1 = G__2262;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__2256,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__2256,(1),null);
var G__2263 = (gline + (1));
var G__2264 = cljs.core.next.call(null,lines__$1);
var G__2265 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__2266 = result__$1;
gline = G__2263;
lines__$1 = G__2264;
relseg = G__2265;
result = G__2266;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2);

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__2268 = segmap;
var map__2268__$1 = cljs.core.__destructure_map.call(null,map__2268);
var gcol = cljs.core.get.call(null,map__2268__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__2268__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__2268__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__2268__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__2268__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,(function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,(function (p1__2267_SHARP_){
return cljs.core.conj.call(null,p1__2267_SHARP_,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__2270 = arguments.length;
switch (G__2270) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,cljs.source_map.goog$module$goog$object.get.call(null,source_map,"mappings"),source_map);
}));

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = cljs.source_map.goog$module$goog$object.get.call(null,source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__2274 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__2278 = cljs.core.next.call(null,segs__$1);
var G__2279 = nrelseg;
var G__2280 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__2278;
relseg__$1 = G__2279;
result__$1 = G__2280;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__2274,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__2274,(1),null);
var G__2281 = (gline + (1));
var G__2282 = cljs.core.next.call(null,lines__$1);
var G__2283 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__2284 = result__$1;
gline = G__2281;
lines__$1 = G__2282;
relseg = G__2283;
result = G__2284;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode.cljs$lang$maxFixedArity = 2);

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,(function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,(function (p__2285){
var vec__2286 = p__2285;
var _ = cljs.core.nth.call(null,vec__2286,(0),null);
var source = cljs.core.nth.call(null,vec__2286,(1),null);
var line = cljs.core.nth.call(null,vec__2286,(2),null);
var col = cljs.core.nth.call(null,vec__2286,(3),null);
var name = cljs.core.nth.call(null,vec__2286,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
}));

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,(function (cols__$1,p__2289){
var vec__2290 = p__2289;
var gcol = cljs.core.nth.call(null,vec__2290,(0),null);
var sidx = cljs.core.nth.call(null,vec__2290,(1),null);
var line = cljs.core.nth.call(null,vec__2290,(2),null);
var col = cljs.core.nth.call(null,vec__2290,(3),null);
var name = cljs.core.nth.call(null,vec__2290,(4),null);
var seg = vec__2290;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,(function (p__2293){
var vec__2294 = p__2293;
var _ = cljs.core.nth.call(null,vec__2294,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__2294,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__2294,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__2294,(3),null);
var lname = cljs.core.nth.call(null,vec__2294,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__5043__auto__ = name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return lname;
}
})()], null);
}));

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
}),cljs.core.PersistentVector.EMPTY,cols));
}),cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__5043__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5455__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5455__auto__)){
var name = temp__5455__auto__;
var idx = (function (){var temp__5455__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__5455__auto____$1)){
var idx = temp__5455__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});
var encode_cols = (function (infos,source_idx,line,col){
var seq__2300 = cljs.core.seq.call(null,infos);
var chunk__2301 = null;
var count__2302 = (0);
var i__2303 = (0);
while(true){
if((i__2303 < count__2302)){
var info = cljs.core._nth.call(null,chunk__2301,i__2303);
var segv_2654 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_2655 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_2656 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_2655 > (lc_2656 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__2300,chunk__2301,count__2302,i__2303,segv_2654,gline_2655,lc_2656,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_2655 - (lc_2656 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_2654], null));
});})(seq__2300,chunk__2301,count__2302,i__2303,segv_2654,gline_2655,lc_2656,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__2300,chunk__2301,count__2302,i__2303,segv_2654,gline_2655,lc_2656,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_2655], null),cljs.core.conj,segv_2654);
});})(seq__2300,chunk__2301,count__2302,i__2303,segv_2654,gline_2655,lc_2656,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__2657 = seq__2300;
var G__2658 = chunk__2301;
var G__2659 = count__2302;
var G__2660 = (i__2303 + (1));
seq__2300 = G__2657;
chunk__2301 = G__2658;
count__2302 = G__2659;
i__2303 = G__2660;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__2300);
if(temp__5457__auto__){
var seq__2300__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2300__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__2300__$1);
var G__2661 = cljs.core.chunk_rest.call(null,seq__2300__$1);
var G__2662 = c__5565__auto__;
var G__2663 = cljs.core.count.call(null,c__5565__auto__);
var G__2664 = (0);
seq__2300 = G__2661;
chunk__2301 = G__2662;
count__2302 = G__2663;
i__2303 = G__2664;
continue;
} else {
var info = cljs.core.first.call(null,seq__2300__$1);
var segv_2665 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_2666 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_2667 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_2666 > (lc_2667 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__2300,chunk__2301,count__2302,i__2303,segv_2665,gline_2666,lc_2667,info,seq__2300__$1,temp__5457__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_2666 - (lc_2667 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_2665], null));
});})(seq__2300,chunk__2301,count__2302,i__2303,segv_2665,gline_2666,lc_2667,info,seq__2300__$1,temp__5457__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__2300,chunk__2301,count__2302,i__2303,segv_2665,gline_2666,lc_2667,info,seq__2300__$1,temp__5457__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_2666], null),cljs.core.conj,segv_2665);
});})(seq__2300,chunk__2301,count__2302,i__2303,segv_2665,gline_2666,lc_2667,info,seq__2300__$1,temp__5457__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__2668 = cljs.core.next.call(null,seq__2300__$1);
var G__2669 = null;
var G__2670 = (0);
var G__2671 = (0);
seq__2300 = G__2668;
chunk__2301 = G__2669;
count__2302 = G__2670;
i__2303 = G__2671;
continue;
}
} else {
return null;
}
}
break;
}
});
var seq__2304_2672 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__2305_2673 = null;
var count__2306_2674 = (0);
var i__2307_2675 = (0);
while(true){
if((i__2307_2675 < count__2306_2674)){
var vec__2480_2676 = cljs.core._nth.call(null,chunk__2305_2673,i__2307_2675);
var source_idx_2677 = cljs.core.nth.call(null,vec__2480_2676,(0),null);
var vec__2483_2678 = cljs.core.nth.call(null,vec__2480_2676,(1),null);
var __2679 = cljs.core.nth.call(null,vec__2483_2678,(0),null);
var lines_2680__$1 = cljs.core.nth.call(null,vec__2483_2678,(1),null);
var seq__2486_2681 = cljs.core.seq.call(null,lines_2680__$1);
var chunk__2487_2682 = null;
var count__2488_2683 = (0);
var i__2489_2684 = (0);
while(true){
if((i__2489_2684 < count__2488_2683)){
var vec__2528_2685 = cljs.core._nth.call(null,chunk__2487_2682,i__2489_2684);
var line_2686 = cljs.core.nth.call(null,vec__2528_2685,(0),null);
var cols_2687 = cljs.core.nth.call(null,vec__2528_2685,(1),null);
var seq__2531_2688 = cljs.core.seq.call(null,cols_2687);
var chunk__2532_2689 = null;
var count__2533_2690 = (0);
var i__2534_2691 = (0);
while(true){
if((i__2534_2691 < count__2533_2690)){
var vec__2541_2692 = cljs.core._nth.call(null,chunk__2532_2689,i__2534_2691);
var col_2693 = cljs.core.nth.call(null,vec__2541_2692,(0),null);
var infos_2694 = cljs.core.nth.call(null,vec__2541_2692,(1),null);
encode_cols.call(null,infos_2694,source_idx_2677,line_2686,col_2693);


var G__2695 = seq__2531_2688;
var G__2696 = chunk__2532_2689;
var G__2697 = count__2533_2690;
var G__2698 = (i__2534_2691 + (1));
seq__2531_2688 = G__2695;
chunk__2532_2689 = G__2696;
count__2533_2690 = G__2697;
i__2534_2691 = G__2698;
continue;
} else {
var temp__5457__auto___2699 = cljs.core.seq.call(null,seq__2531_2688);
if(temp__5457__auto___2699){
var seq__2531_2700__$1 = temp__5457__auto___2699;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2531_2700__$1)){
var c__5565__auto___2701 = cljs.core.chunk_first.call(null,seq__2531_2700__$1);
var G__2702 = cljs.core.chunk_rest.call(null,seq__2531_2700__$1);
var G__2703 = c__5565__auto___2701;
var G__2704 = cljs.core.count.call(null,c__5565__auto___2701);
var G__2705 = (0);
seq__2531_2688 = G__2702;
chunk__2532_2689 = G__2703;
count__2533_2690 = G__2704;
i__2534_2691 = G__2705;
continue;
} else {
var vec__2544_2706 = cljs.core.first.call(null,seq__2531_2700__$1);
var col_2707 = cljs.core.nth.call(null,vec__2544_2706,(0),null);
var infos_2708 = cljs.core.nth.call(null,vec__2544_2706,(1),null);
encode_cols.call(null,infos_2708,source_idx_2677,line_2686,col_2707);


var G__2709 = cljs.core.next.call(null,seq__2531_2700__$1);
var G__2710 = null;
var G__2711 = (0);
var G__2712 = (0);
seq__2531_2688 = G__2709;
chunk__2532_2689 = G__2710;
count__2533_2690 = G__2711;
i__2534_2691 = G__2712;
continue;
}
} else {
}
}
break;
}


var G__2713 = seq__2486_2681;
var G__2714 = chunk__2487_2682;
var G__2715 = count__2488_2683;
var G__2716 = (i__2489_2684 + (1));
seq__2486_2681 = G__2713;
chunk__2487_2682 = G__2714;
count__2488_2683 = G__2715;
i__2489_2684 = G__2716;
continue;
} else {
var temp__5457__auto___2717 = cljs.core.seq.call(null,seq__2486_2681);
if(temp__5457__auto___2717){
var seq__2486_2718__$1 = temp__5457__auto___2717;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2486_2718__$1)){
var c__5565__auto___2719 = cljs.core.chunk_first.call(null,seq__2486_2718__$1);
var G__2720 = cljs.core.chunk_rest.call(null,seq__2486_2718__$1);
var G__2721 = c__5565__auto___2719;
var G__2722 = cljs.core.count.call(null,c__5565__auto___2719);
var G__2723 = (0);
seq__2486_2681 = G__2720;
chunk__2487_2682 = G__2721;
count__2488_2683 = G__2722;
i__2489_2684 = G__2723;
continue;
} else {
var vec__2547_2724 = cljs.core.first.call(null,seq__2486_2718__$1);
var line_2725 = cljs.core.nth.call(null,vec__2547_2724,(0),null);
var cols_2726 = cljs.core.nth.call(null,vec__2547_2724,(1),null);
var seq__2550_2727 = cljs.core.seq.call(null,cols_2726);
var chunk__2551_2728 = null;
var count__2552_2729 = (0);
var i__2553_2730 = (0);
while(true){
if((i__2553_2730 < count__2552_2729)){
var vec__2560_2731 = cljs.core._nth.call(null,chunk__2551_2728,i__2553_2730);
var col_2732 = cljs.core.nth.call(null,vec__2560_2731,(0),null);
var infos_2733 = cljs.core.nth.call(null,vec__2560_2731,(1),null);
encode_cols.call(null,infos_2733,source_idx_2677,line_2725,col_2732);


var G__2734 = seq__2550_2727;
var G__2735 = chunk__2551_2728;
var G__2736 = count__2552_2729;
var G__2737 = (i__2553_2730 + (1));
seq__2550_2727 = G__2734;
chunk__2551_2728 = G__2735;
count__2552_2729 = G__2736;
i__2553_2730 = G__2737;
continue;
} else {
var temp__5457__auto___2738__$1 = cljs.core.seq.call(null,seq__2550_2727);
if(temp__5457__auto___2738__$1){
var seq__2550_2739__$1 = temp__5457__auto___2738__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2550_2739__$1)){
var c__5565__auto___2740 = cljs.core.chunk_first.call(null,seq__2550_2739__$1);
var G__2741 = cljs.core.chunk_rest.call(null,seq__2550_2739__$1);
var G__2742 = c__5565__auto___2740;
var G__2743 = cljs.core.count.call(null,c__5565__auto___2740);
var G__2744 = (0);
seq__2550_2727 = G__2741;
chunk__2551_2728 = G__2742;
count__2552_2729 = G__2743;
i__2553_2730 = G__2744;
continue;
} else {
var vec__2563_2745 = cljs.core.first.call(null,seq__2550_2739__$1);
var col_2746 = cljs.core.nth.call(null,vec__2563_2745,(0),null);
var infos_2747 = cljs.core.nth.call(null,vec__2563_2745,(1),null);
encode_cols.call(null,infos_2747,source_idx_2677,line_2725,col_2746);


var G__2748 = cljs.core.next.call(null,seq__2550_2739__$1);
var G__2749 = null;
var G__2750 = (0);
var G__2751 = (0);
seq__2550_2727 = G__2748;
chunk__2551_2728 = G__2749;
count__2552_2729 = G__2750;
i__2553_2730 = G__2751;
continue;
}
} else {
}
}
break;
}


var G__2752 = cljs.core.next.call(null,seq__2486_2718__$1);
var G__2753 = null;
var G__2754 = (0);
var G__2755 = (0);
seq__2486_2681 = G__2752;
chunk__2487_2682 = G__2753;
count__2488_2683 = G__2754;
i__2489_2684 = G__2755;
continue;
}
} else {
}
}
break;
}


var G__2756 = seq__2304_2672;
var G__2757 = chunk__2305_2673;
var G__2758 = count__2306_2674;
var G__2759 = (i__2307_2675 + (1));
seq__2304_2672 = G__2756;
chunk__2305_2673 = G__2757;
count__2306_2674 = G__2758;
i__2307_2675 = G__2759;
continue;
} else {
var temp__5457__auto___2760 = cljs.core.seq.call(null,seq__2304_2672);
if(temp__5457__auto___2760){
var seq__2304_2761__$1 = temp__5457__auto___2760;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2304_2761__$1)){
var c__5565__auto___2762 = cljs.core.chunk_first.call(null,seq__2304_2761__$1);
var G__2763 = cljs.core.chunk_rest.call(null,seq__2304_2761__$1);
var G__2764 = c__5565__auto___2762;
var G__2765 = cljs.core.count.call(null,c__5565__auto___2762);
var G__2766 = (0);
seq__2304_2672 = G__2763;
chunk__2305_2673 = G__2764;
count__2306_2674 = G__2765;
i__2307_2675 = G__2766;
continue;
} else {
var vec__2566_2767 = cljs.core.first.call(null,seq__2304_2761__$1);
var source_idx_2768 = cljs.core.nth.call(null,vec__2566_2767,(0),null);
var vec__2569_2769 = cljs.core.nth.call(null,vec__2566_2767,(1),null);
var __2770 = cljs.core.nth.call(null,vec__2569_2769,(0),null);
var lines_2771__$1 = cljs.core.nth.call(null,vec__2569_2769,(1),null);
var seq__2572_2772 = cljs.core.seq.call(null,lines_2771__$1);
var chunk__2573_2773 = null;
var count__2574_2774 = (0);
var i__2575_2775 = (0);
while(true){
if((i__2575_2775 < count__2574_2774)){
var vec__2614_2776 = cljs.core._nth.call(null,chunk__2573_2773,i__2575_2775);
var line_2777 = cljs.core.nth.call(null,vec__2614_2776,(0),null);
var cols_2778 = cljs.core.nth.call(null,vec__2614_2776,(1),null);
var seq__2617_2779 = cljs.core.seq.call(null,cols_2778);
var chunk__2618_2780 = null;
var count__2619_2781 = (0);
var i__2620_2782 = (0);
while(true){
if((i__2620_2782 < count__2619_2781)){
var vec__2627_2783 = cljs.core._nth.call(null,chunk__2618_2780,i__2620_2782);
var col_2784 = cljs.core.nth.call(null,vec__2627_2783,(0),null);
var infos_2785 = cljs.core.nth.call(null,vec__2627_2783,(1),null);
encode_cols.call(null,infos_2785,source_idx_2768,line_2777,col_2784);


var G__2786 = seq__2617_2779;
var G__2787 = chunk__2618_2780;
var G__2788 = count__2619_2781;
var G__2789 = (i__2620_2782 + (1));
seq__2617_2779 = G__2786;
chunk__2618_2780 = G__2787;
count__2619_2781 = G__2788;
i__2620_2782 = G__2789;
continue;
} else {
var temp__5457__auto___2790__$1 = cljs.core.seq.call(null,seq__2617_2779);
if(temp__5457__auto___2790__$1){
var seq__2617_2791__$1 = temp__5457__auto___2790__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2617_2791__$1)){
var c__5565__auto___2792 = cljs.core.chunk_first.call(null,seq__2617_2791__$1);
var G__2793 = cljs.core.chunk_rest.call(null,seq__2617_2791__$1);
var G__2794 = c__5565__auto___2792;
var G__2795 = cljs.core.count.call(null,c__5565__auto___2792);
var G__2796 = (0);
seq__2617_2779 = G__2793;
chunk__2618_2780 = G__2794;
count__2619_2781 = G__2795;
i__2620_2782 = G__2796;
continue;
} else {
var vec__2630_2797 = cljs.core.first.call(null,seq__2617_2791__$1);
var col_2798 = cljs.core.nth.call(null,vec__2630_2797,(0),null);
var infos_2799 = cljs.core.nth.call(null,vec__2630_2797,(1),null);
encode_cols.call(null,infos_2799,source_idx_2768,line_2777,col_2798);


var G__2800 = cljs.core.next.call(null,seq__2617_2791__$1);
var G__2801 = null;
var G__2802 = (0);
var G__2803 = (0);
seq__2617_2779 = G__2800;
chunk__2618_2780 = G__2801;
count__2619_2781 = G__2802;
i__2620_2782 = G__2803;
continue;
}
} else {
}
}
break;
}


var G__2804 = seq__2572_2772;
var G__2805 = chunk__2573_2773;
var G__2806 = count__2574_2774;
var G__2807 = (i__2575_2775 + (1));
seq__2572_2772 = G__2804;
chunk__2573_2773 = G__2805;
count__2574_2774 = G__2806;
i__2575_2775 = G__2807;
continue;
} else {
var temp__5457__auto___2808__$1 = cljs.core.seq.call(null,seq__2572_2772);
if(temp__5457__auto___2808__$1){
var seq__2572_2809__$1 = temp__5457__auto___2808__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2572_2809__$1)){
var c__5565__auto___2810 = cljs.core.chunk_first.call(null,seq__2572_2809__$1);
var G__2811 = cljs.core.chunk_rest.call(null,seq__2572_2809__$1);
var G__2812 = c__5565__auto___2810;
var G__2813 = cljs.core.count.call(null,c__5565__auto___2810);
var G__2814 = (0);
seq__2572_2772 = G__2811;
chunk__2573_2773 = G__2812;
count__2574_2774 = G__2813;
i__2575_2775 = G__2814;
continue;
} else {
var vec__2633_2815 = cljs.core.first.call(null,seq__2572_2809__$1);
var line_2816 = cljs.core.nth.call(null,vec__2633_2815,(0),null);
var cols_2817 = cljs.core.nth.call(null,vec__2633_2815,(1),null);
var seq__2636_2818 = cljs.core.seq.call(null,cols_2817);
var chunk__2637_2819 = null;
var count__2638_2820 = (0);
var i__2639_2821 = (0);
while(true){
if((i__2639_2821 < count__2638_2820)){
var vec__2646_2822 = cljs.core._nth.call(null,chunk__2637_2819,i__2639_2821);
var col_2823 = cljs.core.nth.call(null,vec__2646_2822,(0),null);
var infos_2824 = cljs.core.nth.call(null,vec__2646_2822,(1),null);
encode_cols.call(null,infos_2824,source_idx_2768,line_2816,col_2823);


var G__2825 = seq__2636_2818;
var G__2826 = chunk__2637_2819;
var G__2827 = count__2638_2820;
var G__2828 = (i__2639_2821 + (1));
seq__2636_2818 = G__2825;
chunk__2637_2819 = G__2826;
count__2638_2820 = G__2827;
i__2639_2821 = G__2828;
continue;
} else {
var temp__5457__auto___2829__$2 = cljs.core.seq.call(null,seq__2636_2818);
if(temp__5457__auto___2829__$2){
var seq__2636_2830__$1 = temp__5457__auto___2829__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2636_2830__$1)){
var c__5565__auto___2831 = cljs.core.chunk_first.call(null,seq__2636_2830__$1);
var G__2832 = cljs.core.chunk_rest.call(null,seq__2636_2830__$1);
var G__2833 = c__5565__auto___2831;
var G__2834 = cljs.core.count.call(null,c__5565__auto___2831);
var G__2835 = (0);
seq__2636_2818 = G__2832;
chunk__2637_2819 = G__2833;
count__2638_2820 = G__2834;
i__2639_2821 = G__2835;
continue;
} else {
var vec__2649_2836 = cljs.core.first.call(null,seq__2636_2830__$1);
var col_2837 = cljs.core.nth.call(null,vec__2649_2836,(0),null);
var infos_2838 = cljs.core.nth.call(null,vec__2649_2836,(1),null);
encode_cols.call(null,infos_2838,source_idx_2768,line_2816,col_2837);


var G__2839 = cljs.core.next.call(null,seq__2636_2830__$1);
var G__2840 = null;
var G__2841 = (0);
var G__2842 = (0);
seq__2636_2818 = G__2839;
chunk__2637_2819 = G__2840;
count__2638_2820 = G__2841;
i__2639_2821 = G__2842;
continue;
}
} else {
}
}
break;
}


var G__2843 = cljs.core.next.call(null,seq__2572_2809__$1);
var G__2844 = null;
var G__2845 = (0);
var G__2846 = (0);
seq__2572_2772 = G__2843;
chunk__2573_2773 = G__2844;
count__2574_2774 = G__2845;
i__2575_2775 = G__2846;
continue;
}
} else {
}
}
break;
}


var G__2847 = cljs.core.next.call(null,seq__2304_2761__$1);
var G__2848 = null;
var G__2849 = (0);
var G__2850 = (0);
seq__2304_2672 = G__2847;
chunk__2305_2673 = G__2848;
count__2306_2674 = G__2849;
i__2307_2675 = G__2850;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__2652 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?(function (p1__2297_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__2297_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
}):cljs.core.identity),(function (p1__2298_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__2298_SHARP_,/\//));
}));
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,(function (p1__2299_SHARP_){
return clojure.string.join.call(null,",",p1__2299_SHARP_);
}),cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__2653 = G__2652;
cljs.source_map.goog$module$goog$object.set.call(null,G__2653,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__2653;
} else {
return G__2652;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__2851 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__2851,(0),null);
var col_map = cljs.core.nth.call(null,vec__2851,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__2854 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__2854,(0),null);
var infos = cljs.core.nth.call(null,vec__2854,(1),null);
var G__2859 = cljs.core.next.call(null,col_map_seq);
var G__2860 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__2854,col,infos,vec__2851,line,col_map){
return (function (v,p__2857){
var map__2858 = p__2857;
var map__2858__$1 = cljs.core.__destructure_map.call(null,map__2858);
var gline = cljs.core.get.call(null,map__2858__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__2858__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__2854,col,infos,vec__2851,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__2859;
new_cols = G__2860;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__2861 = cljs.core.next.call(null,line_map_seq);
var G__2862 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__2861;
new_lines = G__2862;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__2863_3071 = cljs.core.seq.call(null,reverse_map);
var chunk__2864_3072 = null;
var count__2865_3073 = (0);
var i__2866_3074 = (0);
while(true){
if((i__2866_3074 < count__2865_3073)){
var vec__2969_3075 = cljs.core._nth.call(null,chunk__2864_3072,i__2866_3074);
var line_3076 = cljs.core.nth.call(null,vec__2969_3075,(0),null);
var columns_3077 = cljs.core.nth.call(null,vec__2969_3075,(1),null);
var seq__2972_3078 = cljs.core.seq.call(null,columns_3077);
var chunk__2973_3079 = null;
var count__2974_3080 = (0);
var i__2975_3081 = (0);
while(true){
if((i__2975_3081 < count__2974_3080)){
var vec__2998_3082 = cljs.core._nth.call(null,chunk__2973_3079,i__2975_3081);
var column_3083 = cljs.core.nth.call(null,vec__2998_3082,(0),null);
var column_info_3084 = cljs.core.nth.call(null,vec__2998_3082,(1),null);
var seq__3001_3085 = cljs.core.seq.call(null,column_info_3084);
var chunk__3002_3086 = null;
var count__3003_3087 = (0);
var i__3004_3088 = (0);
while(true){
if((i__3004_3088 < count__3003_3087)){
var map__3007_3089 = cljs.core._nth.call(null,chunk__3002_3086,i__3004_3088);
var map__3007_3090__$1 = cljs.core.__destructure_map.call(null,map__3007_3089);
var gline_3091 = cljs.core.get.call(null,map__3007_3090__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3092 = cljs.core.get.call(null,map__3007_3090__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3093 = cljs.core.get.call(null,map__3007_3090__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3091], null),cljs.core.fnil.call(null,((function (seq__3001_3085,chunk__3002_3086,count__3003_3087,i__3004_3088,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3007_3089,map__3007_3090__$1,gline_3091,gcol_3092,name_3093,vec__2998_3082,column_3083,column_info_3084,vec__2969_3075,line_3076,columns_3077,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3092], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3076,new cljs.core.Keyword(null,"col","col",-1959363084),column_3083,new cljs.core.Keyword(null,"name","name",1843675177),name_3093], null));
});})(seq__3001_3085,chunk__3002_3086,count__3003_3087,i__3004_3088,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3007_3089,map__3007_3090__$1,gline_3091,gcol_3092,name_3093,vec__2998_3082,column_3083,column_info_3084,vec__2969_3075,line_3076,columns_3077,inverted))
,cljs.core.sorted_map.call(null)));


var G__3094 = seq__3001_3085;
var G__3095 = chunk__3002_3086;
var G__3096 = count__3003_3087;
var G__3097 = (i__3004_3088 + (1));
seq__3001_3085 = G__3094;
chunk__3002_3086 = G__3095;
count__3003_3087 = G__3096;
i__3004_3088 = G__3097;
continue;
} else {
var temp__5457__auto___3098 = cljs.core.seq.call(null,seq__3001_3085);
if(temp__5457__auto___3098){
var seq__3001_3099__$1 = temp__5457__auto___3098;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3001_3099__$1)){
var c__5565__auto___3100 = cljs.core.chunk_first.call(null,seq__3001_3099__$1);
var G__3101 = cljs.core.chunk_rest.call(null,seq__3001_3099__$1);
var G__3102 = c__5565__auto___3100;
var G__3103 = cljs.core.count.call(null,c__5565__auto___3100);
var G__3104 = (0);
seq__3001_3085 = G__3101;
chunk__3002_3086 = G__3102;
count__3003_3087 = G__3103;
i__3004_3088 = G__3104;
continue;
} else {
var map__3008_3105 = cljs.core.first.call(null,seq__3001_3099__$1);
var map__3008_3106__$1 = cljs.core.__destructure_map.call(null,map__3008_3105);
var gline_3107 = cljs.core.get.call(null,map__3008_3106__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3108 = cljs.core.get.call(null,map__3008_3106__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3109 = cljs.core.get.call(null,map__3008_3106__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3107], null),cljs.core.fnil.call(null,((function (seq__3001_3085,chunk__3002_3086,count__3003_3087,i__3004_3088,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3008_3105,map__3008_3106__$1,gline_3107,gcol_3108,name_3109,seq__3001_3099__$1,temp__5457__auto___3098,vec__2998_3082,column_3083,column_info_3084,vec__2969_3075,line_3076,columns_3077,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3108], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3076,new cljs.core.Keyword(null,"col","col",-1959363084),column_3083,new cljs.core.Keyword(null,"name","name",1843675177),name_3109], null));
});})(seq__3001_3085,chunk__3002_3086,count__3003_3087,i__3004_3088,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3008_3105,map__3008_3106__$1,gline_3107,gcol_3108,name_3109,seq__3001_3099__$1,temp__5457__auto___3098,vec__2998_3082,column_3083,column_info_3084,vec__2969_3075,line_3076,columns_3077,inverted))
,cljs.core.sorted_map.call(null)));


var G__3110 = cljs.core.next.call(null,seq__3001_3099__$1);
var G__3111 = null;
var G__3112 = (0);
var G__3113 = (0);
seq__3001_3085 = G__3110;
chunk__3002_3086 = G__3111;
count__3003_3087 = G__3112;
i__3004_3088 = G__3113;
continue;
}
} else {
}
}
break;
}


var G__3114 = seq__2972_3078;
var G__3115 = chunk__2973_3079;
var G__3116 = count__2974_3080;
var G__3117 = (i__2975_3081 + (1));
seq__2972_3078 = G__3114;
chunk__2973_3079 = G__3115;
count__2974_3080 = G__3116;
i__2975_3081 = G__3117;
continue;
} else {
var temp__5457__auto___3118 = cljs.core.seq.call(null,seq__2972_3078);
if(temp__5457__auto___3118){
var seq__2972_3119__$1 = temp__5457__auto___3118;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2972_3119__$1)){
var c__5565__auto___3120 = cljs.core.chunk_first.call(null,seq__2972_3119__$1);
var G__3121 = cljs.core.chunk_rest.call(null,seq__2972_3119__$1);
var G__3122 = c__5565__auto___3120;
var G__3123 = cljs.core.count.call(null,c__5565__auto___3120);
var G__3124 = (0);
seq__2972_3078 = G__3121;
chunk__2973_3079 = G__3122;
count__2974_3080 = G__3123;
i__2975_3081 = G__3124;
continue;
} else {
var vec__3009_3125 = cljs.core.first.call(null,seq__2972_3119__$1);
var column_3126 = cljs.core.nth.call(null,vec__3009_3125,(0),null);
var column_info_3127 = cljs.core.nth.call(null,vec__3009_3125,(1),null);
var seq__3012_3128 = cljs.core.seq.call(null,column_info_3127);
var chunk__3013_3129 = null;
var count__3014_3130 = (0);
var i__3015_3131 = (0);
while(true){
if((i__3015_3131 < count__3014_3130)){
var map__3018_3132 = cljs.core._nth.call(null,chunk__3013_3129,i__3015_3131);
var map__3018_3133__$1 = cljs.core.__destructure_map.call(null,map__3018_3132);
var gline_3134 = cljs.core.get.call(null,map__3018_3133__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3135 = cljs.core.get.call(null,map__3018_3133__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3136 = cljs.core.get.call(null,map__3018_3133__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3134], null),cljs.core.fnil.call(null,((function (seq__3012_3128,chunk__3013_3129,count__3014_3130,i__3015_3131,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3018_3132,map__3018_3133__$1,gline_3134,gcol_3135,name_3136,vec__3009_3125,column_3126,column_info_3127,seq__2972_3119__$1,temp__5457__auto___3118,vec__2969_3075,line_3076,columns_3077,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3135], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3076,new cljs.core.Keyword(null,"col","col",-1959363084),column_3126,new cljs.core.Keyword(null,"name","name",1843675177),name_3136], null));
});})(seq__3012_3128,chunk__3013_3129,count__3014_3130,i__3015_3131,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3018_3132,map__3018_3133__$1,gline_3134,gcol_3135,name_3136,vec__3009_3125,column_3126,column_info_3127,seq__2972_3119__$1,temp__5457__auto___3118,vec__2969_3075,line_3076,columns_3077,inverted))
,cljs.core.sorted_map.call(null)));


var G__3137 = seq__3012_3128;
var G__3138 = chunk__3013_3129;
var G__3139 = count__3014_3130;
var G__3140 = (i__3015_3131 + (1));
seq__3012_3128 = G__3137;
chunk__3013_3129 = G__3138;
count__3014_3130 = G__3139;
i__3015_3131 = G__3140;
continue;
} else {
var temp__5457__auto___3141__$1 = cljs.core.seq.call(null,seq__3012_3128);
if(temp__5457__auto___3141__$1){
var seq__3012_3142__$1 = temp__5457__auto___3141__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3012_3142__$1)){
var c__5565__auto___3143 = cljs.core.chunk_first.call(null,seq__3012_3142__$1);
var G__3144 = cljs.core.chunk_rest.call(null,seq__3012_3142__$1);
var G__3145 = c__5565__auto___3143;
var G__3146 = cljs.core.count.call(null,c__5565__auto___3143);
var G__3147 = (0);
seq__3012_3128 = G__3144;
chunk__3013_3129 = G__3145;
count__3014_3130 = G__3146;
i__3015_3131 = G__3147;
continue;
} else {
var map__3019_3148 = cljs.core.first.call(null,seq__3012_3142__$1);
var map__3019_3149__$1 = cljs.core.__destructure_map.call(null,map__3019_3148);
var gline_3150 = cljs.core.get.call(null,map__3019_3149__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3151 = cljs.core.get.call(null,map__3019_3149__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3152 = cljs.core.get.call(null,map__3019_3149__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3150], null),cljs.core.fnil.call(null,((function (seq__3012_3128,chunk__3013_3129,count__3014_3130,i__3015_3131,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3019_3148,map__3019_3149__$1,gline_3150,gcol_3151,name_3152,seq__3012_3142__$1,temp__5457__auto___3141__$1,vec__3009_3125,column_3126,column_info_3127,seq__2972_3119__$1,temp__5457__auto___3118,vec__2969_3075,line_3076,columns_3077,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3151], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3076,new cljs.core.Keyword(null,"col","col",-1959363084),column_3126,new cljs.core.Keyword(null,"name","name",1843675177),name_3152], null));
});})(seq__3012_3128,chunk__3013_3129,count__3014_3130,i__3015_3131,seq__2972_3078,chunk__2973_3079,count__2974_3080,i__2975_3081,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3019_3148,map__3019_3149__$1,gline_3150,gcol_3151,name_3152,seq__3012_3142__$1,temp__5457__auto___3141__$1,vec__3009_3125,column_3126,column_info_3127,seq__2972_3119__$1,temp__5457__auto___3118,vec__2969_3075,line_3076,columns_3077,inverted))
,cljs.core.sorted_map.call(null)));


var G__3153 = cljs.core.next.call(null,seq__3012_3142__$1);
var G__3154 = null;
var G__3155 = (0);
var G__3156 = (0);
seq__3012_3128 = G__3153;
chunk__3013_3129 = G__3154;
count__3014_3130 = G__3155;
i__3015_3131 = G__3156;
continue;
}
} else {
}
}
break;
}


var G__3157 = cljs.core.next.call(null,seq__2972_3119__$1);
var G__3158 = null;
var G__3159 = (0);
var G__3160 = (0);
seq__2972_3078 = G__3157;
chunk__2973_3079 = G__3158;
count__2974_3080 = G__3159;
i__2975_3081 = G__3160;
continue;
}
} else {
}
}
break;
}


var G__3161 = seq__2863_3071;
var G__3162 = chunk__2864_3072;
var G__3163 = count__2865_3073;
var G__3164 = (i__2866_3074 + (1));
seq__2863_3071 = G__3161;
chunk__2864_3072 = G__3162;
count__2865_3073 = G__3163;
i__2866_3074 = G__3164;
continue;
} else {
var temp__5457__auto___3165 = cljs.core.seq.call(null,seq__2863_3071);
if(temp__5457__auto___3165){
var seq__2863_3166__$1 = temp__5457__auto___3165;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__2863_3166__$1)){
var c__5565__auto___3167 = cljs.core.chunk_first.call(null,seq__2863_3166__$1);
var G__3168 = cljs.core.chunk_rest.call(null,seq__2863_3166__$1);
var G__3169 = c__5565__auto___3167;
var G__3170 = cljs.core.count.call(null,c__5565__auto___3167);
var G__3171 = (0);
seq__2863_3071 = G__3168;
chunk__2864_3072 = G__3169;
count__2865_3073 = G__3170;
i__2866_3074 = G__3171;
continue;
} else {
var vec__3020_3172 = cljs.core.first.call(null,seq__2863_3166__$1);
var line_3173 = cljs.core.nth.call(null,vec__3020_3172,(0),null);
var columns_3174 = cljs.core.nth.call(null,vec__3020_3172,(1),null);
var seq__3023_3175 = cljs.core.seq.call(null,columns_3174);
var chunk__3024_3176 = null;
var count__3025_3177 = (0);
var i__3026_3178 = (0);
while(true){
if((i__3026_3178 < count__3025_3177)){
var vec__3049_3179 = cljs.core._nth.call(null,chunk__3024_3176,i__3026_3178);
var column_3180 = cljs.core.nth.call(null,vec__3049_3179,(0),null);
var column_info_3181 = cljs.core.nth.call(null,vec__3049_3179,(1),null);
var seq__3052_3182 = cljs.core.seq.call(null,column_info_3181);
var chunk__3053_3183 = null;
var count__3054_3184 = (0);
var i__3055_3185 = (0);
while(true){
if((i__3055_3185 < count__3054_3184)){
var map__3058_3186 = cljs.core._nth.call(null,chunk__3053_3183,i__3055_3185);
var map__3058_3187__$1 = cljs.core.__destructure_map.call(null,map__3058_3186);
var gline_3188 = cljs.core.get.call(null,map__3058_3187__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3189 = cljs.core.get.call(null,map__3058_3187__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3190 = cljs.core.get.call(null,map__3058_3187__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3188], null),cljs.core.fnil.call(null,((function (seq__3052_3182,chunk__3053_3183,count__3054_3184,i__3055_3185,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3058_3186,map__3058_3187__$1,gline_3188,gcol_3189,name_3190,vec__3049_3179,column_3180,column_info_3181,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3189], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3173,new cljs.core.Keyword(null,"col","col",-1959363084),column_3180,new cljs.core.Keyword(null,"name","name",1843675177),name_3190], null));
});})(seq__3052_3182,chunk__3053_3183,count__3054_3184,i__3055_3185,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3058_3186,map__3058_3187__$1,gline_3188,gcol_3189,name_3190,vec__3049_3179,column_3180,column_info_3181,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted))
,cljs.core.sorted_map.call(null)));


var G__3191 = seq__3052_3182;
var G__3192 = chunk__3053_3183;
var G__3193 = count__3054_3184;
var G__3194 = (i__3055_3185 + (1));
seq__3052_3182 = G__3191;
chunk__3053_3183 = G__3192;
count__3054_3184 = G__3193;
i__3055_3185 = G__3194;
continue;
} else {
var temp__5457__auto___3195__$1 = cljs.core.seq.call(null,seq__3052_3182);
if(temp__5457__auto___3195__$1){
var seq__3052_3196__$1 = temp__5457__auto___3195__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3052_3196__$1)){
var c__5565__auto___3197 = cljs.core.chunk_first.call(null,seq__3052_3196__$1);
var G__3198 = cljs.core.chunk_rest.call(null,seq__3052_3196__$1);
var G__3199 = c__5565__auto___3197;
var G__3200 = cljs.core.count.call(null,c__5565__auto___3197);
var G__3201 = (0);
seq__3052_3182 = G__3198;
chunk__3053_3183 = G__3199;
count__3054_3184 = G__3200;
i__3055_3185 = G__3201;
continue;
} else {
var map__3059_3202 = cljs.core.first.call(null,seq__3052_3196__$1);
var map__3059_3203__$1 = cljs.core.__destructure_map.call(null,map__3059_3202);
var gline_3204 = cljs.core.get.call(null,map__3059_3203__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3205 = cljs.core.get.call(null,map__3059_3203__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3206 = cljs.core.get.call(null,map__3059_3203__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3204], null),cljs.core.fnil.call(null,((function (seq__3052_3182,chunk__3053_3183,count__3054_3184,i__3055_3185,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3059_3202,map__3059_3203__$1,gline_3204,gcol_3205,name_3206,seq__3052_3196__$1,temp__5457__auto___3195__$1,vec__3049_3179,column_3180,column_info_3181,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3205], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3173,new cljs.core.Keyword(null,"col","col",-1959363084),column_3180,new cljs.core.Keyword(null,"name","name",1843675177),name_3206], null));
});})(seq__3052_3182,chunk__3053_3183,count__3054_3184,i__3055_3185,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3059_3202,map__3059_3203__$1,gline_3204,gcol_3205,name_3206,seq__3052_3196__$1,temp__5457__auto___3195__$1,vec__3049_3179,column_3180,column_info_3181,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted))
,cljs.core.sorted_map.call(null)));


var G__3207 = cljs.core.next.call(null,seq__3052_3196__$1);
var G__3208 = null;
var G__3209 = (0);
var G__3210 = (0);
seq__3052_3182 = G__3207;
chunk__3053_3183 = G__3208;
count__3054_3184 = G__3209;
i__3055_3185 = G__3210;
continue;
}
} else {
}
}
break;
}


var G__3211 = seq__3023_3175;
var G__3212 = chunk__3024_3176;
var G__3213 = count__3025_3177;
var G__3214 = (i__3026_3178 + (1));
seq__3023_3175 = G__3211;
chunk__3024_3176 = G__3212;
count__3025_3177 = G__3213;
i__3026_3178 = G__3214;
continue;
} else {
var temp__5457__auto___3215__$1 = cljs.core.seq.call(null,seq__3023_3175);
if(temp__5457__auto___3215__$1){
var seq__3023_3216__$1 = temp__5457__auto___3215__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3023_3216__$1)){
var c__5565__auto___3217 = cljs.core.chunk_first.call(null,seq__3023_3216__$1);
var G__3218 = cljs.core.chunk_rest.call(null,seq__3023_3216__$1);
var G__3219 = c__5565__auto___3217;
var G__3220 = cljs.core.count.call(null,c__5565__auto___3217);
var G__3221 = (0);
seq__3023_3175 = G__3218;
chunk__3024_3176 = G__3219;
count__3025_3177 = G__3220;
i__3026_3178 = G__3221;
continue;
} else {
var vec__3060_3222 = cljs.core.first.call(null,seq__3023_3216__$1);
var column_3223 = cljs.core.nth.call(null,vec__3060_3222,(0),null);
var column_info_3224 = cljs.core.nth.call(null,vec__3060_3222,(1),null);
var seq__3063_3225 = cljs.core.seq.call(null,column_info_3224);
var chunk__3064_3226 = null;
var count__3065_3227 = (0);
var i__3066_3228 = (0);
while(true){
if((i__3066_3228 < count__3065_3227)){
var map__3069_3229 = cljs.core._nth.call(null,chunk__3064_3226,i__3066_3228);
var map__3069_3230__$1 = cljs.core.__destructure_map.call(null,map__3069_3229);
var gline_3231 = cljs.core.get.call(null,map__3069_3230__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3232 = cljs.core.get.call(null,map__3069_3230__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3233 = cljs.core.get.call(null,map__3069_3230__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3231], null),cljs.core.fnil.call(null,((function (seq__3063_3225,chunk__3064_3226,count__3065_3227,i__3066_3228,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3069_3229,map__3069_3230__$1,gline_3231,gcol_3232,name_3233,vec__3060_3222,column_3223,column_info_3224,seq__3023_3216__$1,temp__5457__auto___3215__$1,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3232], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3173,new cljs.core.Keyword(null,"col","col",-1959363084),column_3223,new cljs.core.Keyword(null,"name","name",1843675177),name_3233], null));
});})(seq__3063_3225,chunk__3064_3226,count__3065_3227,i__3066_3228,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3069_3229,map__3069_3230__$1,gline_3231,gcol_3232,name_3233,vec__3060_3222,column_3223,column_info_3224,seq__3023_3216__$1,temp__5457__auto___3215__$1,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted))
,cljs.core.sorted_map.call(null)));


var G__3234 = seq__3063_3225;
var G__3235 = chunk__3064_3226;
var G__3236 = count__3065_3227;
var G__3237 = (i__3066_3228 + (1));
seq__3063_3225 = G__3234;
chunk__3064_3226 = G__3235;
count__3065_3227 = G__3236;
i__3066_3228 = G__3237;
continue;
} else {
var temp__5457__auto___3238__$2 = cljs.core.seq.call(null,seq__3063_3225);
if(temp__5457__auto___3238__$2){
var seq__3063_3239__$1 = temp__5457__auto___3238__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3063_3239__$1)){
var c__5565__auto___3240 = cljs.core.chunk_first.call(null,seq__3063_3239__$1);
var G__3241 = cljs.core.chunk_rest.call(null,seq__3063_3239__$1);
var G__3242 = c__5565__auto___3240;
var G__3243 = cljs.core.count.call(null,c__5565__auto___3240);
var G__3244 = (0);
seq__3063_3225 = G__3241;
chunk__3064_3226 = G__3242;
count__3065_3227 = G__3243;
i__3066_3228 = G__3244;
continue;
} else {
var map__3070_3245 = cljs.core.first.call(null,seq__3063_3239__$1);
var map__3070_3246__$1 = cljs.core.__destructure_map.call(null,map__3070_3245);
var gline_3247 = cljs.core.get.call(null,map__3070_3246__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_3248 = cljs.core.get.call(null,map__3070_3246__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_3249 = cljs.core.get.call(null,map__3070_3246__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_3247], null),cljs.core.fnil.call(null,((function (seq__3063_3225,chunk__3064_3226,count__3065_3227,i__3066_3228,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3070_3245,map__3070_3246__$1,gline_3247,gcol_3248,name_3249,seq__3063_3239__$1,temp__5457__auto___3238__$2,vec__3060_3222,column_3223,column_info_3224,seq__3023_3216__$1,temp__5457__auto___3215__$1,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_3248], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_3173,new cljs.core.Keyword(null,"col","col",-1959363084),column_3223,new cljs.core.Keyword(null,"name","name",1843675177),name_3249], null));
});})(seq__3063_3225,chunk__3064_3226,count__3065_3227,i__3066_3228,seq__3023_3175,chunk__3024_3176,count__3025_3177,i__3026_3178,seq__2863_3071,chunk__2864_3072,count__2865_3073,i__2866_3074,map__3070_3245,map__3070_3246__$1,gline_3247,gcol_3248,name_3249,seq__3063_3239__$1,temp__5457__auto___3238__$2,vec__3060_3222,column_3223,column_info_3224,seq__3023_3216__$1,temp__5457__auto___3215__$1,vec__3020_3172,line_3173,columns_3174,seq__2863_3166__$1,temp__5457__auto___3165,inverted))
,cljs.core.sorted_map.call(null)));


var G__3250 = cljs.core.next.call(null,seq__3063_3239__$1);
var G__3251 = null;
var G__3252 = (0);
var G__3253 = (0);
seq__3063_3225 = G__3250;
chunk__3064_3226 = G__3251;
count__3065_3227 = G__3252;
i__3066_3228 = G__3253;
continue;
}
} else {
}
}
break;
}


var G__3254 = cljs.core.next.call(null,seq__3023_3216__$1);
var G__3255 = null;
var G__3256 = (0);
var G__3257 = (0);
seq__3023_3175 = G__3254;
chunk__3024_3176 = G__3255;
count__3025_3177 = G__3256;
i__3026_3178 = G__3257;
continue;
}
} else {
}
}
break;
}


var G__3258 = cljs.core.next.call(null,seq__2863_3166__$1);
var G__3259 = null;
var G__3260 = (0);
var G__3261 = (0);
seq__2863_3071 = G__3258;
chunk__2864_3072 = G__3259;
count__2865_3073 = G__3260;
i__2866_3074 = G__3261;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});

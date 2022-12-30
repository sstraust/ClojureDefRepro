// Compiled by ClojureScript 1.11.54 {:optimize-constants false, :optimizations :simple}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.analyzer');
goog.require('cljs.analyzer.impl');
goog.require('cljs.env');
goog.require('cljs.source_map');
goog.require('cljs.tools.reader');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.call(null,cljs.core.mapcat.call(null,(function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.call(null,clojure.string.replace.call(null,cljs.core.name.call(null,lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ecmascript5","ecmascript5",342717552),new cljs.core.Keyword(null,"ecmascript5-strict","ecmascript5-strict",888234811),new cljs.core.Keyword(null,"ecmascript6","ecmascript6",723864898),new cljs.core.Keyword(null,"ecmascript6-strict","ecmascript6-strict",-786049555),new cljs.core.Keyword(null,"ecmascript-2015","ecmascript-2015",-902254444),new cljs.core.Keyword(null,"ecmascript6-typed","ecmascript6-typed",-1978203054),new cljs.core.Keyword(null,"ecmascript-2016","ecmascript-2016",471574729),new cljs.core.Keyword(null,"ecmascript-2017","ecmascript-2017",620145058),new cljs.core.Keyword(null,"ecmascript-next","ecmascript-next",-1935155962)], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.call(null,ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv.call(null,(function (xs,ns,_){
if(cljs.core._EQ_.call(null,needle,cljs.compiler.get_first_ns_segment.call(null,ns))){
return cljs.core.reduced.call(null,needle);
} else {
return null;
}
}),null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__3264 = s;
var map__3264__$1 = cljs.core.__destructure_map.call(null,map__3264);
var name = cljs.core.get.call(null,map__3264__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__3264__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__3266 = info;
var map__3267 = G__3266;
var map__3267__$1 = cljs.core.__destructure_map.call(null,map__3267);
var shadow = cljs.core.get.call(null,map__3267__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__3266__$1 = G__3266;
while(true){
var d__$2 = d__$1;
var map__3269 = G__3266__$1;
var map__3269__$1 = cljs.core.__destructure_map.call(null,map__3269);
var shadow__$1 = cljs.core.get.call(null,map__3269__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__3270 = (d__$2 + (1));
var G__3271 = shadow__$1;
d__$1 = G__3270;
G__3266__$1 = G__3271;
continue;
} else {
if(cljs.core.truth_(cljs.compiler.find_ns_starts_with.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__3272){
var map__3273 = p__3272;
var map__3273__$1 = cljs.core.__destructure_map.call(null,map__3273);
var name_var = map__3273__$1;
var name = cljs.core.get.call(null,map__3273__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__3273__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__3274 = info;
var map__3274__$1 = cljs.core.__destructure_map.call(null,map__3274);
var ns = cljs.core.get.call(null,map__3274__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__3274__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$"),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.call(null,reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__3276 = arguments.length;
switch (G__3276) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
}));

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.impl.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if((!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = new cljs.core.Var(function(){return cljs.core.munge_str;},new cljs.core.Symbol("cljs.core","munge-str","cljs.core/munge-str",-301346665,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",-558947994),new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"munge-str","munge-str",-2042069652,null),"cljs/core.cljs",(25),(1),(11790),(11790),new cljs.core.Symbol(null,"string","string",-349010059,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)])).call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
}));

(cljs.compiler.munge.cljs$lang$maxFixedArity = 2);

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__3278 = cp;
switch (G__3278) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.call(null,"0000",unpadded.length);
return ["\\u",pad,cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__3280_3284 = cljs.core.seq.call(null,s);
var chunk__3281_3285 = null;
var count__3282_3286 = (0);
var i__3283_3287 = (0);
while(true){
if((i__3283_3287 < count__3282_3286)){
var c_3288 = cljs.core._nth.call(null,chunk__3281_3285,i__3283_3287);
sb.append(cljs.compiler.escape_char.call(null,c_3288));


var G__3289 = seq__3280_3284;
var G__3290 = chunk__3281_3285;
var G__3291 = count__3282_3286;
var G__3292 = (i__3283_3287 + (1));
seq__3280_3284 = G__3289;
chunk__3281_3285 = G__3290;
count__3282_3286 = G__3291;
i__3283_3287 = G__3292;
continue;
} else {
var temp__5457__auto___3293 = cljs.core.seq.call(null,seq__3280_3284);
if(temp__5457__auto___3293){
var seq__3280_3294__$1 = temp__5457__auto___3293;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3280_3294__$1)){
var c__5565__auto___3295 = cljs.core.chunk_first.call(null,seq__3280_3294__$1);
var G__3296 = cljs.core.chunk_rest.call(null,seq__3280_3294__$1);
var G__3297 = c__5565__auto___3295;
var G__3298 = cljs.core.count.call(null,c__5565__auto___3295);
var G__3299 = (0);
seq__3280_3284 = G__3296;
chunk__3281_3285 = G__3297;
count__3282_3286 = G__3298;
i__3283_3287 = G__3299;
continue;
} else {
var c_3300 = cljs.core.first.call(null,seq__3280_3294__$1);
sb.append(cljs.compiler.escape_char.call(null,c_3300));


var G__3301 = cljs.core.next.call(null,seq__3280_3294__$1);
var G__3302 = null;
var G__3303 = (0);
var G__3304 = (0);
seq__3280_3284 = G__3301;
chunk__3281_3285 = G__3302;
count__3282_3286 = G__3303;
i__3283_3287 = G__3304;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return ["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"\""].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__5639__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5640__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5641__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5642__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5643__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5643__auto__,method_table__5639__auto__,prefer_table__5640__auto__,method_cache__5641__auto__,cached_hierarchy__5642__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__3305_3308 = ast;
var map__3305_3309__$1 = cljs.core.__destructure_map.call(null,map__3305_3308);
var env_3310 = cljs.core.get.call(null,map__3305_3309__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_3310))){
var map__3306_3311 = env_3310;
var map__3306_3312__$1 = cljs.core.__destructure_map.call(null,map__3306_3311);
var line_3313 = cljs.core.get.call(null,map__3306_3312__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_3314 = cljs.core.get.call(null,map__3306_3312__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (m){
var minfo = (function (){var G__3307 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"binding","binding",539932593),null,new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast)))){
return cljs.core.assoc.call(null,G__3307,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__3307;
}
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_3313 - (1))], null),cljs.core.fnil.call(null,(function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_3314)?(column_3314 - (1)):(0))], null),cljs.core.fnil.call(null,(function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map.call(null)));
}));
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__3323 = arguments.length;
switch (G__3323) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__5791__auto__ = [];
var len__5766__auto___3330 = arguments.length;
var i__5767__auto___3331 = (0);
while(true){
if((i__5767__auto___3331 < len__5766__auto___3330)){
args_arr__5791__auto__.push((arguments[i__5767__auto___3331]));

var G__3332 = (i__5767__auto___3331 + (1));
i__5767__auto___3331 = G__3332;
continue;
} else {
}
break;
}

var argseq__5792__auto__ = (new cljs.core.IndexedSeq(args_arr__5791__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__5792__auto__);

}
});

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.impl.cljs_map_QMARK_.call(null,a)){
cljs.compiler.emit.call(null,a);
} else {
if(cljs.analyzer.impl.cljs_seq_QMARK_.call(null,a)){
cljs.core.apply.call(null,cljs.compiler.emits,a);
} else {
if(typeof a === 'function'){
a.call(null);
} else {
var s_3333 = (function (){var G__3324 = a;
if((!(typeof a === 'string'))){
return G__3324.toString();
} else {
return G__3324;
}
})();
var temp__5461__auto___3334 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5461__auto___3334 == null)){
} else {
var sm_data_3335 = temp__5461__auto___3334;
cljs.core.swap_BANG_.call(null,sm_data_3335,cljs.core.update,new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(function (p1__3315_SHARP_){
return (p1__3315_SHARP_ + s_3333.length);
}));
}

cljs.core.print.call(null,s_3333);

}
}
}
}

return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

return cljs.compiler.emits.call(null,b);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler.emits.call(null,c);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler.emits.call(null,d);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler.emits.call(null,e);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__3325 = cljs.core.seq.call(null,xs);
var chunk__3326 = null;
var count__3327 = (0);
var i__3328 = (0);
while(true){
if((i__3328 < count__3327)){
var x = cljs.core._nth.call(null,chunk__3326,i__3328);
cljs.compiler.emits.call(null,x);


var G__3336 = seq__3325;
var G__3337 = chunk__3326;
var G__3338 = count__3327;
var G__3339 = (i__3328 + (1));
seq__3325 = G__3336;
chunk__3326 = G__3337;
count__3327 = G__3338;
i__3328 = G__3339;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__3325);
if(temp__5457__auto__){
var seq__3325__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3325__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__3325__$1);
var G__3340 = cljs.core.chunk_rest.call(null,seq__3325__$1);
var G__3341 = c__5565__auto__;
var G__3342 = cljs.core.count.call(null,c__5565__auto__);
var G__3343 = (0);
seq__3325 = G__3340;
chunk__3326 = G__3341;
count__3327 = G__3342;
i__3328 = G__3343;
continue;
} else {
var x = cljs.core.first.call(null,seq__3325__$1);
cljs.compiler.emits.call(null,x);


var G__3344 = cljs.core.next.call(null,seq__3325__$1);
var G__3345 = null;
var G__3346 = (0);
var G__3347 = (0);
seq__3325 = G__3344;
chunk__3326 = G__3345;
count__3327 = G__3346;
i__3328 = G__3347;
continue;
}
} else {
return null;
}
}
break;
}
}));

/** @this {Function} */
(cljs.compiler.emits.cljs$lang$applyTo = (function (seq3317){
var G__3318 = cljs.core.first.call(null,seq3317);
var seq3317__$1 = cljs.core.next.call(null,seq3317);
var G__3319 = cljs.core.first.call(null,seq3317__$1);
var seq3317__$2 = cljs.core.next.call(null,seq3317__$1);
var G__3320 = cljs.core.first.call(null,seq3317__$2);
var seq3317__$3 = cljs.core.next.call(null,seq3317__$2);
var G__3321 = cljs.core.first.call(null,seq3317__$3);
var seq3317__$4 = cljs.core.next.call(null,seq3317__$3);
var G__3322 = cljs.core.first.call(null,seq3317__$4);
var seq3317__$5 = cljs.core.next.call(null,seq3317__$4);
var self__5751__auto__ = this;
return self__5751__auto__.cljs$core$IFn$_invoke$arity$variadic(G__3318,G__3319,G__3320,G__3321,G__3322,seq3317__$5);
}));

(cljs.compiler.emits.cljs$lang$maxFixedArity = (5));

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__3348){
var map__3349 = p__3348;
var map__3349__$1 = cljs.core.__destructure_map.call(null,map__3349);
var m = map__3349__$1;
var gen_line = cljs.core.get.call(null,map__3349__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__3357 = arguments.length;
switch (G__3357) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__5791__auto__ = [];
var len__5766__auto___3363 = arguments.length;
var i__5767__auto___3364 = (0);
while(true){
if((i__5767__auto___3364 < len__5766__auto___3363)){
args_arr__5791__auto__.push((arguments[i__5767__auto___3364]));

var G__3365 = (i__5767__auto___3364 + (1));
i__5767__auto___3364 = G__3365;
continue;
} else {
}
break;
}

var argseq__5792__auto__ = (new cljs.core.IndexedSeq(args_arr__5791__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__5792__auto__);

}
});

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.call(null,a);

return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

return cljs.compiler._emitln.call(null);
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__3358_3366 = cljs.core.seq.call(null,xs);
var chunk__3359_3367 = null;
var count__3360_3368 = (0);
var i__3361_3369 = (0);
while(true){
if((i__3361_3369 < count__3360_3368)){
var x_3370 = cljs.core._nth.call(null,chunk__3359_3367,i__3361_3369);
cljs.compiler.emits.call(null,x_3370);


var G__3371 = seq__3358_3366;
var G__3372 = chunk__3359_3367;
var G__3373 = count__3360_3368;
var G__3374 = (i__3361_3369 + (1));
seq__3358_3366 = G__3371;
chunk__3359_3367 = G__3372;
count__3360_3368 = G__3373;
i__3361_3369 = G__3374;
continue;
} else {
var temp__5457__auto___3375 = cljs.core.seq.call(null,seq__3358_3366);
if(temp__5457__auto___3375){
var seq__3358_3376__$1 = temp__5457__auto___3375;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3358_3376__$1)){
var c__5565__auto___3377 = cljs.core.chunk_first.call(null,seq__3358_3376__$1);
var G__3378 = cljs.core.chunk_rest.call(null,seq__3358_3376__$1);
var G__3379 = c__5565__auto___3377;
var G__3380 = cljs.core.count.call(null,c__5565__auto___3377);
var G__3381 = (0);
seq__3358_3366 = G__3378;
chunk__3359_3367 = G__3379;
count__3360_3368 = G__3380;
i__3361_3369 = G__3381;
continue;
} else {
var x_3382 = cljs.core.first.call(null,seq__3358_3376__$1);
cljs.compiler.emits.call(null,x_3382);


var G__3383 = cljs.core.next.call(null,seq__3358_3376__$1);
var G__3384 = null;
var G__3385 = (0);
var G__3386 = (0);
seq__3358_3366 = G__3383;
chunk__3359_3367 = G__3384;
count__3360_3368 = G__3385;
i__3361_3369 = G__3386;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln.call(null);
}));

/** @this {Function} */
(cljs.compiler.emitln.cljs$lang$applyTo = (function (seq3351){
var G__3352 = cljs.core.first.call(null,seq3351);
var seq3351__$1 = cljs.core.next.call(null,seq3351);
var G__3353 = cljs.core.first.call(null,seq3351__$1);
var seq3351__$2 = cljs.core.next.call(null,seq3351__$1);
var G__3354 = cljs.core.first.call(null,seq3351__$2);
var seq3351__$3 = cljs.core.next.call(null,seq3351__$2);
var G__3355 = cljs.core.first.call(null,seq3351__$3);
var seq3351__$4 = cljs.core.next.call(null,seq3351__$3);
var G__3356 = cljs.core.first.call(null,seq3351__$4);
var seq3351__$5 = cljs.core.next.call(null,seq3351__$4);
var self__5751__auto__ = this;
return self__5751__auto__.cljs$core$IFn$_invoke$arity$variadic(G__3352,G__3353,G__3354,G__3355,G__3356,seq3351__$5);
}));

(cljs.compiler.emitln.cljs$lang$maxFixedArity = (5));

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__5687__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__3387_3391 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__3388_3392 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__3389_3393 = true;
var _STAR_print_fn_STAR__temp_val__3390_3394 = (function (x__5688__auto__){
return sb__5687__auto__.append(x__5688__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__3389_3393);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__3390_3394);

try{cljs.compiler.emit.call(null,expr);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__3388_3392);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__3387_3391);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5687__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__5639__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5640__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5641__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5642__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5643__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant*"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5643__auto__,method_table__5639__auto__,prefer_table__5640__auto__,method_cache__5641__auto__,cached_hierarchy__5642__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.call(null,cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.impl.cljs_seq_QMARK_.call(null,x)){
return cljs.compiler.emit_list.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.core.record_QMARK_.call(null,x)){
var vec__3395 = cljs.analyzer.record_ns_PLUS_name.call(null,x);
var ns = cljs.core.nth.call(null,vec__3395,(0),null);
var name = cljs.core.nth.call(null,vec__3395,(1),null);
return cljs.compiler.emit_record_value.call(null,ns,name,(function (){
return cljs.compiler.emit_constant.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,x));
}));
} else {
if(cljs.analyzer.impl.cljs_map_QMARK_.call(null,x)){
return cljs.compiler.emit_map.call(null,cljs.core.keys.call(null,x),cljs.core.vals.call(null,x),cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
if(cljs.analyzer.impl.cljs_vector_QMARK_.call(null,x)){
return cljs.compiler.emit_vector.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.analyzer.impl.cljs_set_QMARK_.call(null,x)){
return cljs.compiler.emit_set.call(null,x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
return cljs.compiler.emit_constant_STAR_.call(null,x);

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta.call(null,cljs.core.meta.call(null,v));
if((!((cljs.core.seq.call(null,m) == null)))){
return cljs.compiler.emit_with_meta.call(null,(function (){
return cljs.compiler.emit_constant_no_meta.call(null,v);
}),(function (){
return cljs.compiler.emit_constant_no_meta.call(null,m);
}));
} else {
return cljs.compiler.emit_constant_no_meta.call(null,v);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.call(null,["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.pr_str.call(null,cljs.core.type.call(null,x))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,x),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.call(null,"NaN");
} else {
if(cljs.core.not.call(null,isFinite(x))){
return cljs.compiler.emits.call(null,(((x > (0)))?"Infinity":"-Infinity"));
} else {
if((((x === (0))) && ((((1) / x) < (0))))){
return cljs.compiler.emits.call(null,"(-0)");
} else {
return cljs.compiler.emits.call(null,"(",x,")");

}
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__3398 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.call(null,vec__3398,(0),null);
var flags = cljs.core.nth.call(null,vec__3398,(1),null);
var pattern = cljs.core.nth.call(null,vec__3398,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[ns,"/",name].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = (((!((ns == null))))?[ns,"/",name].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Keyword,(function (x){
var temp__5455__auto__ = (function (){var and__5041__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__5041__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__5041__auto__;
}
})();
if(cljs.core.truth_(temp__5455__auto__)){
var value = temp__5455__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Symbol,(function (x){
var temp__5455__auto__ = (function (){var and__5041__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__5041__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__5041__auto__;
}
})();
if(cljs.core.truth_(temp__5455__auto__)){
var value = temp__5455__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.call(null,cljs.core.map_indexed.call(null,(function (i,m){
if(cljs.core.even_QMARK_.call(null,i)){
return cljs.compiler.emit_constant.call(null,m);
} else {
return cljs.compiler.emits.call(null,m);
}
}),cljs.compiler.comma_sep.call(null,cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.compiler.emit_inst = (function cljs$compiler$emit_inst(inst_ms){
return cljs.compiler.emits.call(null,"new Date(",inst_ms,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Date,(function (date){
return cljs.compiler.emit_inst.call(null,date.getTime());
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_.call(null,items)){
return cljs.compiler.emit_js_object.call(null,items,(function (p1__3401_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3401_SHARP_);
});
}));
} else {
return cljs.compiler.emit_js_array.call(null,items,cljs.compiler.emit_constants_comma_sep);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__3403){
var map__3404 = p__3403;
var map__3404__$1 = cljs.core.__destructure_map.call(null,map__3404);
var ast = map__3404__$1;
var info = cljs.core.get.call(null,map__3404__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__3404__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__3404__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var temp__5455__auto__ = new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292).cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5455__auto__)){
var const_expr = temp__5455__auto__;
return cljs.compiler.emit.call(null,cljs.core.assoc.call(null,const_expr,new cljs.core.Keyword(null,"env","env",-1815813235),env));
} else {
var map__3405 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__3405__$1 = cljs.core.__destructure_map.call(null,map__3405);
var cenv = map__3405__$1;
var options = cljs.core.get.call(null,map__3405__$1,new cljs.core.Keyword(null,"options","options",99638489));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var or__5043__auto__ = js_module_name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,ast));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__3406 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.compiler.es5_GT__EQ_.call(null,new cljs.core.Keyword(null,"language-out","language-out",334619882).cljs$core$IFn$_invoke$arity$1(options));
if(cljs.core.truth_(and__5041__auto__)){
return (!((cljs.core.namespace.call(null,var_name) == null)));
} else {
return and__5041__auto__;
}
})())){
return clojure.set.difference.call(null,G__3406,cljs.analyzer.es5_allowed);
} else {
return G__3406;
}
})();
var js_module = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-namespaces","js-namespaces",-471353612),(function (){var or__5043__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})()], null));
var info__$2 = (function (){var G__3407 = info__$1;
if(cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.call(null,G__3407,reserved);
} else {
return G__3407;
}
})();
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var G__3408_3409 = new cljs.core.Keyword(null,"module-type","module-type",1392760304).cljs$core$IFn$_invoke$arity$1(js_module);
var G__3408_3410__$1 = (((G__3408_3409 instanceof cljs.core.Keyword))?G__3408_3409.fqn:null);
switch (G__3408_3410__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace.call(null,var_name))){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"].",cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved));
} else {
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(and__5041__auto__)){
return cljs.core._EQ_.call(null,"default",cljs.core.name.call(null,var_name));
} else {
return and__5041__auto__;
}
})())){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.call(null,info__$2);
}

break;
default:
cljs.compiler.emits.call(null,info__$2);

}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"binding","binding",539932593),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"local","local",-1497766724),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"the-var","the-var",1428415613),(function (p__3412){
var map__3413 = p__3412;
var map__3413__$1 = cljs.core.__destructure_map.call(null,map__3413);
var arg = map__3413__$1;
var env = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__3413__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__3414 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__3414__$1 = cljs.core.__destructure_map.call(null,map__3414);
var name = cljs.core.get.call(null,map__3414__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"with-meta","with-meta",-1566856820),(function (p__3415){
var map__3416 = p__3415;
var map__3416__$1 = cljs.core.__destructure_map.call(null,map__3416);
var expr = cljs.core.get.call(null,map__3416__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__3416__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__3416__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_with_meta.call(null,expr,meta);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_.call(null,(function (p1__3417_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__3417_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
}),keys__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count.call(null,keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count.call(null,keys) === (0))){
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(distinct_keys_QMARK_.call(null,keys))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.createAsIfByAssoc([",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"])");
}
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",comma_sep.call(null,keys),"],[",comma_sep.call(null,vals),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__3418){
var map__3419 = p__3418;
var map__3419__$1 = cljs.core.__destructure_map.call(null,map__3419);
var env = cljs.core.get.call(null,map__3419__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__3419__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__3419__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_map.call(null,keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.call(null,"cljs.core.list(",comma_sep.call(null,items),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count.call(null,items);
if((cnt < (32))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",comma_sep.call(null,items),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",comma_sep.call(null,items),"], true)");
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__3420){
var map__3421 = p__3420;
var map__3421__$1 = cljs.core.__destructure_map.call(null,map__3421);
var items = cljs.core.get.call(null,map__3421__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__3421__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_vector.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_.call(null,(function (p1__3422_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__3422_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
}),items__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count.call(null,items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(distinct_constants_QMARK_.call(null,items))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.createAsIfByAssoc([",comma_sep.call(null,items),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__3423){
var map__3424 = p__3423;
var map__3424__$1 = cljs.core.__destructure_map.call(null,map__3424);
var items = cljs.core.get.call(null,map__3424__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__3424__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_set.call(null,items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.call(null,"({");

var temp__5457__auto___3447 = cljs.core.seq.call(null,items);
if(temp__5457__auto___3447){
var items_3448__$1 = temp__5457__auto___3447;
var vec__3425_3449 = items_3448__$1;
var seq__3426_3450 = cljs.core.seq.call(null,vec__3425_3449);
var first__3427_3451 = cljs.core.first.call(null,seq__3426_3450);
var seq__3426_3452__$1 = cljs.core.next.call(null,seq__3426_3450);
var vec__3428_3453 = first__3427_3451;
var k_3454 = cljs.core.nth.call(null,vec__3428_3453,(0),null);
var v_3455 = cljs.core.nth.call(null,vec__3428_3453,(1),null);
var r_3456 = seq__3426_3452__$1;
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_3454),"\": ",emit_js_object_val.call(null,v_3455));

var seq__3431_3457 = cljs.core.seq.call(null,r_3456);
var chunk__3432_3458 = null;
var count__3433_3459 = (0);
var i__3434_3460 = (0);
while(true){
if((i__3434_3460 < count__3433_3459)){
var vec__3441_3461 = cljs.core._nth.call(null,chunk__3432_3458,i__3434_3460);
var k_3462__$1 = cljs.core.nth.call(null,vec__3441_3461,(0),null);
var v_3463__$1 = cljs.core.nth.call(null,vec__3441_3461,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_3462__$1),"\": ",emit_js_object_val.call(null,v_3463__$1));


var G__3464 = seq__3431_3457;
var G__3465 = chunk__3432_3458;
var G__3466 = count__3433_3459;
var G__3467 = (i__3434_3460 + (1));
seq__3431_3457 = G__3464;
chunk__3432_3458 = G__3465;
count__3433_3459 = G__3466;
i__3434_3460 = G__3467;
continue;
} else {
var temp__5457__auto___3468__$1 = cljs.core.seq.call(null,seq__3431_3457);
if(temp__5457__auto___3468__$1){
var seq__3431_3469__$1 = temp__5457__auto___3468__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3431_3469__$1)){
var c__5565__auto___3470 = cljs.core.chunk_first.call(null,seq__3431_3469__$1);
var G__3471 = cljs.core.chunk_rest.call(null,seq__3431_3469__$1);
var G__3472 = c__5565__auto___3470;
var G__3473 = cljs.core.count.call(null,c__5565__auto___3470);
var G__3474 = (0);
seq__3431_3457 = G__3471;
chunk__3432_3458 = G__3472;
count__3433_3459 = G__3473;
i__3434_3460 = G__3474;
continue;
} else {
var vec__3444_3475 = cljs.core.first.call(null,seq__3431_3469__$1);
var k_3476__$1 = cljs.core.nth.call(null,vec__3444_3475,(0),null);
var v_3477__$1 = cljs.core.nth.call(null,vec__3444_3475,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_3476__$1),"\": ",emit_js_object_val.call(null,v_3477__$1));


var G__3478 = cljs.core.next.call(null,seq__3431_3469__$1);
var G__3479 = null;
var G__3480 = (0);
var G__3481 = (0);
seq__3431_3457 = G__3478;
chunk__3432_3458 = G__3479;
count__3433_3459 = G__3480;
i__3434_3460 = G__3481;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.call(null,"[",comma_sep.call(null,items),"]");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-object","js-object",1830199158),(function (p__3482){
var map__3483 = p__3482;
var map__3483__$1 = cljs.core.__destructure_map.call(null,map__3483);
var keys = cljs.core.get.call(null,map__3483__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__3483__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env = cljs.core.get.call(null,map__3483__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_object.call(null,cljs.core.map.call(null,cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-array","js-array",-1210185421),(function (p__3484){
var map__3485 = p__3484;
var map__3485__$1 = cljs.core.__destructure_map.call(null,map__3485);
var items = cljs.core.get.call(null,map__3485__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__3485__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_array.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.call(null,ns,".map__GT_",name,"(",items,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"quote","quote",-262615245),(function (p__3486){
var map__3487 = p__3486;
var map__3487__$1 = cljs.core.__destructure_map.call(null,map__3487);
var expr = cljs.core.get.call(null,map__3487__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
return cljs.compiler.emit.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"const","const",1709929842),(function (p__3488){
var map__3489 = p__3488;
var map__3489__$1 = cljs.core.__destructure_map.call(null,map__3489);
var form = cljs.core.get.call(null,map__3489__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__3489__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__3490 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__3490__$1 = cljs.core.__destructure_map.call(null,map__3490);
var op = cljs.core.get.call(null,map__3490__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__3490__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__3490__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__5043__auto__ = (function (){var and__5041__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842));
if(and__5041__auto__){
var and__5041__auto____$1 = form;
if(cljs.core.truth_(and__5041__auto____$1)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.call(null,form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
})();
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
var and__5041__auto__ = (!((const_expr == null)));
if(and__5041__auto__){
return cljs.compiler.truthy_constant_QMARK_.call(null,const_expr);
} else {
return and__5041__auto__;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__3491 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__3491__$1 = cljs.core.__destructure_map.call(null,map__3491);
var op = cljs.core.get.call(null,map__3491__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__3491__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__3491__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__5043__auto__ = ((cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842))) && (((form === false) || ((form == null)))));
if(or__5043__auto__){
return or__5043__auto__;
} else {
var and__5041__auto__ = (!((const_expr == null)));
if(and__5041__auto__){
return cljs.compiler.falsey_constant_QMARK_.call(null,const_expr);
} else {
return and__5041__auto__;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__5043__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__3492){
var map__3493 = p__3492;
var map__3493__$1 = cljs.core.__destructure_map.call(null,map__3493);
var test = cljs.core.get.call(null,map__3493__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__3493__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__3493__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__3493__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__3493__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__5043__auto__ = unchecked;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case","case",1143702196),(function (p__3494){
var map__3495 = p__3494;
var map__3495__$1 = cljs.core.__destructure_map.call(null,map__3495);
var v = cljs.core.get.call(null,map__3495__$1,new cljs.core.Keyword(null,"test","test",577538877));
var nodes = cljs.core.get.call(null,map__3495__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var default$ = cljs.core.get.call(null,map__3495__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__3495__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__3496_3524 = cljs.core.seq.call(null,nodes);
var chunk__3497_3525 = null;
var count__3498_3526 = (0);
var i__3499_3527 = (0);
while(true){
if((i__3499_3527 < count__3498_3526)){
var map__3512_3528 = cljs.core._nth.call(null,chunk__3497_3525,i__3499_3527);
var map__3512_3529__$1 = cljs.core.__destructure_map.call(null,map__3512_3528);
var ts_3530 = cljs.core.get.call(null,map__3512_3529__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__3513_3531 = cljs.core.get.call(null,map__3512_3529__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__3513_3532__$1 = cljs.core.__destructure_map.call(null,map__3513_3531);
var then_3533 = cljs.core.get.call(null,map__3513_3532__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__3514_3534 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_3530));
var chunk__3515_3535 = null;
var count__3516_3536 = (0);
var i__3517_3537 = (0);
while(true){
if((i__3517_3537 < count__3516_3536)){
var test_3538 = cljs.core._nth.call(null,chunk__3515_3535,i__3517_3537);
cljs.compiler.emitln.call(null,"case ",test_3538,":");


var G__3539 = seq__3514_3534;
var G__3540 = chunk__3515_3535;
var G__3541 = count__3516_3536;
var G__3542 = (i__3517_3537 + (1));
seq__3514_3534 = G__3539;
chunk__3515_3535 = G__3540;
count__3516_3536 = G__3541;
i__3517_3537 = G__3542;
continue;
} else {
var temp__5457__auto___3543 = cljs.core.seq.call(null,seq__3514_3534);
if(temp__5457__auto___3543){
var seq__3514_3544__$1 = temp__5457__auto___3543;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3514_3544__$1)){
var c__5565__auto___3545 = cljs.core.chunk_first.call(null,seq__3514_3544__$1);
var G__3546 = cljs.core.chunk_rest.call(null,seq__3514_3544__$1);
var G__3547 = c__5565__auto___3545;
var G__3548 = cljs.core.count.call(null,c__5565__auto___3545);
var G__3549 = (0);
seq__3514_3534 = G__3546;
chunk__3515_3535 = G__3547;
count__3516_3536 = G__3548;
i__3517_3537 = G__3549;
continue;
} else {
var test_3550 = cljs.core.first.call(null,seq__3514_3544__$1);
cljs.compiler.emitln.call(null,"case ",test_3550,":");


var G__3551 = cljs.core.next.call(null,seq__3514_3544__$1);
var G__3552 = null;
var G__3553 = (0);
var G__3554 = (0);
seq__3514_3534 = G__3551;
chunk__3515_3535 = G__3552;
count__3516_3536 = G__3553;
i__3517_3537 = G__3554;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_3533);
} else {
cljs.compiler.emitln.call(null,then_3533);
}

cljs.compiler.emitln.call(null,"break;");


var G__3555 = seq__3496_3524;
var G__3556 = chunk__3497_3525;
var G__3557 = count__3498_3526;
var G__3558 = (i__3499_3527 + (1));
seq__3496_3524 = G__3555;
chunk__3497_3525 = G__3556;
count__3498_3526 = G__3557;
i__3499_3527 = G__3558;
continue;
} else {
var temp__5457__auto___3559 = cljs.core.seq.call(null,seq__3496_3524);
if(temp__5457__auto___3559){
var seq__3496_3560__$1 = temp__5457__auto___3559;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3496_3560__$1)){
var c__5565__auto___3561 = cljs.core.chunk_first.call(null,seq__3496_3560__$1);
var G__3562 = cljs.core.chunk_rest.call(null,seq__3496_3560__$1);
var G__3563 = c__5565__auto___3561;
var G__3564 = cljs.core.count.call(null,c__5565__auto___3561);
var G__3565 = (0);
seq__3496_3524 = G__3562;
chunk__3497_3525 = G__3563;
count__3498_3526 = G__3564;
i__3499_3527 = G__3565;
continue;
} else {
var map__3518_3566 = cljs.core.first.call(null,seq__3496_3560__$1);
var map__3518_3567__$1 = cljs.core.__destructure_map.call(null,map__3518_3566);
var ts_3568 = cljs.core.get.call(null,map__3518_3567__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__3519_3569 = cljs.core.get.call(null,map__3518_3567__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__3519_3570__$1 = cljs.core.__destructure_map.call(null,map__3519_3569);
var then_3571 = cljs.core.get.call(null,map__3519_3570__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__3520_3572 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_3568));
var chunk__3521_3573 = null;
var count__3522_3574 = (0);
var i__3523_3575 = (0);
while(true){
if((i__3523_3575 < count__3522_3574)){
var test_3576 = cljs.core._nth.call(null,chunk__3521_3573,i__3523_3575);
cljs.compiler.emitln.call(null,"case ",test_3576,":");


var G__3577 = seq__3520_3572;
var G__3578 = chunk__3521_3573;
var G__3579 = count__3522_3574;
var G__3580 = (i__3523_3575 + (1));
seq__3520_3572 = G__3577;
chunk__3521_3573 = G__3578;
count__3522_3574 = G__3579;
i__3523_3575 = G__3580;
continue;
} else {
var temp__5457__auto___3581__$1 = cljs.core.seq.call(null,seq__3520_3572);
if(temp__5457__auto___3581__$1){
var seq__3520_3582__$1 = temp__5457__auto___3581__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3520_3582__$1)){
var c__5565__auto___3583 = cljs.core.chunk_first.call(null,seq__3520_3582__$1);
var G__3584 = cljs.core.chunk_rest.call(null,seq__3520_3582__$1);
var G__3585 = c__5565__auto___3583;
var G__3586 = cljs.core.count.call(null,c__5565__auto___3583);
var G__3587 = (0);
seq__3520_3572 = G__3584;
chunk__3521_3573 = G__3585;
count__3522_3574 = G__3586;
i__3523_3575 = G__3587;
continue;
} else {
var test_3588 = cljs.core.first.call(null,seq__3520_3582__$1);
cljs.compiler.emitln.call(null,"case ",test_3588,":");


var G__3589 = cljs.core.next.call(null,seq__3520_3582__$1);
var G__3590 = null;
var G__3591 = (0);
var G__3592 = (0);
seq__3520_3572 = G__3589;
chunk__3521_3573 = G__3590;
count__3522_3574 = G__3591;
i__3523_3575 = G__3592;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_3571);
} else {
cljs.compiler.emitln.call(null,then_3571);
}

cljs.compiler.emitln.call(null,"break;");


var G__3593 = cljs.core.next.call(null,seq__3496_3560__$1);
var G__3594 = null;
var G__3595 = (0);
var G__3596 = (0);
seq__3496_3524 = G__3593;
chunk__3497_3525 = G__3594;
count__3498_3526 = G__3595;
i__3499_3527 = G__3596;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__3597){
var map__3598 = p__3597;
var map__3598__$1 = cljs.core.__destructure_map.call(null,map__3598);
var throw$ = cljs.core.get.call(null,map__3598__$1,new cljs.core.Keyword(null,"exception","exception",-335277064));
var env = cljs.core.get.call(null,map__3598__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(goog.string.startsWith(t,"!")){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(goog.string.startsWith(t,"{")){
return t;
} else {
if(goog.string.startsWith(t,"function")){
var idx = t.lastIndexOf(":");
var vec__3600 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__3600,(0),null);
var rstr = cljs.core.nth.call(null,vec__3600,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs.compiler.resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,(function (p1__3599_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__3599_SHARP_);
}),clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__3603 = ["function(",clojure.string.join.call(null,",",args_ts),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__3603,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__3603;
}
} else {
if(goog.string.endsWith(t,"=")){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),"="].join('');
} else {
return cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return ["{",clojure.string.join.call(null,"|",cljs.core.map.call(null,(function (p1__3604_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__3604_SHARP_);
}),xs)),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__3605 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__3606 = cljs.core.seq.call(null,vec__3605);
var first__3607 = cljs.core.first.call(null,seq__3606);
var seq__3606__$1 = cljs.core.next.call(null,seq__3606);
var p = first__3607;
var first__3607__$1 = cljs.core.first.call(null,seq__3606__$1);
var seq__3606__$2 = cljs.core.next.call(null,seq__3606__$1);
var ts = first__3607__$1;
var first__3607__$2 = cljs.core.first.call(null,seq__3606__$2);
var seq__3606__$3 = cljs.core.next.call(null,seq__3606__$2);
var n = first__3607__$2;
var xs = seq__3606__$3;
if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__5041__auto__){
var and__5041__auto____$1 = ts;
if(cljs.core.truth_(and__5041__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__3608 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__3609 = cljs.core.seq.call(null,vec__3608);
var first__3610 = cljs.core.first.call(null,seq__3609);
var seq__3609__$1 = cljs.core.next.call(null,seq__3609);
var p = first__3610;
var first__3610__$1 = cljs.core.first.call(null,seq__3609__$1);
var seq__3609__$2 = cljs.core.next.call(null,seq__3609__$1);
var ts = first__3610__$1;
var xs = seq__3609__$2;
if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__5041__auto__){
var and__5041__auto____$1 = ts;
if(cljs.core.truth_(and__5041__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__3613 = arguments.length;
switch (G__3613) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
}));

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = (function cljs$compiler$print_comment_lines(e){
var vec__3621 = cljs.core.map.call(null,(function (p1__3611_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__3611_SHARP_);
} else {
return p1__3611_SHARP_;
}
}),clojure.string.split_lines.call(null,e));
var seq__3622 = cljs.core.seq.call(null,vec__3621);
var first__3623 = cljs.core.first.call(null,seq__3622);
var seq__3622__$1 = cljs.core.next.call(null,seq__3622);
var x = first__3623;
var ys = seq__3622__$1;
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__3624 = cljs.core.seq.call(null,ys);
var chunk__3625 = null;
var count__3626 = (0);
var i__3627 = (0);
while(true){
if((i__3627 < count__3626)){
var next_line = cljs.core._nth.call(null,chunk__3625,i__3627);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__3633 = seq__3624;
var G__3634 = chunk__3625;
var G__3635 = count__3626;
var G__3636 = (i__3627 + (1));
seq__3624 = G__3633;
chunk__3625 = G__3634;
count__3626 = G__3635;
i__3627 = G__3636;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__3624);
if(temp__5457__auto__){
var seq__3624__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3624__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__3624__$1);
var G__3637 = cljs.core.chunk_rest.call(null,seq__3624__$1);
var G__3638 = c__5565__auto__;
var G__3639 = cljs.core.count.call(null,c__5565__auto__);
var G__3640 = (0);
seq__3624 = G__3637;
chunk__3625 = G__3638;
count__3626 = G__3639;
i__3627 = G__3640;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__3624__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__3641 = cljs.core.next.call(null,seq__3624__$1);
var G__3642 = null;
var G__3643 = (0);
var G__3644 = (0);
seq__3624 = G__3641;
chunk__3625 = G__3642;
count__3626 = G__3643;
i__3627 = G__3644;
continue;
}
} else {
return null;
}
}
break;
}
});
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__3628_3645 = cljs.core.seq.call(null,docs__$2);
var chunk__3629_3646 = null;
var count__3630_3647 = (0);
var i__3631_3648 = (0);
while(true){
if((i__3631_3648 < count__3630_3647)){
var e_3649 = cljs.core._nth.call(null,chunk__3629_3646,i__3631_3648);
if(cljs.core.truth_(e_3649)){
print_comment_lines.call(null,e_3649);
} else {
}


var G__3650 = seq__3628_3645;
var G__3651 = chunk__3629_3646;
var G__3652 = count__3630_3647;
var G__3653 = (i__3631_3648 + (1));
seq__3628_3645 = G__3650;
chunk__3629_3646 = G__3651;
count__3630_3647 = G__3652;
i__3631_3648 = G__3653;
continue;
} else {
var temp__5457__auto___3654 = cljs.core.seq.call(null,seq__3628_3645);
if(temp__5457__auto___3654){
var seq__3628_3655__$1 = temp__5457__auto___3654;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3628_3655__$1)){
var c__5565__auto___3656 = cljs.core.chunk_first.call(null,seq__3628_3655__$1);
var G__3657 = cljs.core.chunk_rest.call(null,seq__3628_3655__$1);
var G__3658 = c__5565__auto___3656;
var G__3659 = cljs.core.count.call(null,c__5565__auto___3656);
var G__3660 = (0);
seq__3628_3645 = G__3657;
chunk__3629_3646 = G__3658;
count__3630_3647 = G__3659;
i__3631_3648 = G__3660;
continue;
} else {
var e_3661 = cljs.core.first.call(null,seq__3628_3655__$1);
if(cljs.core.truth_(e_3661)){
print_comment_lines.call(null,e_3661);
} else {
}


var G__3662 = cljs.core.next.call(null,seq__3628_3655__$1);
var G__3663 = null;
var G__3664 = (0);
var G__3665 = (0);
seq__3628_3645 = G__3662;
chunk__3629_3646 = G__3663;
count__3630_3647 = G__3664;
i__3631_3648 = G__3665;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
}));

(cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3);

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (((x === true) || (((x === false) || (typeof x === 'number'))))));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__5041__auto__ = cljs.core.some.call(null,(function (p1__3667_SHARP_){
return goog.string.startsWith(p1__3667_SHARP_,"@define");
}),jsdoc);
if(cljs.core.truth_(and__5041__auto__)){
var and__5041__auto____$1 = opts;
if(cljs.core.truth_(and__5041__auto____$1)){
var and__5041__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__5041__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_.call(null,define)){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__5041__auto____$2;
}
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__3668){
var map__3669 = p__3668;
var map__3669__$1 = cljs.core.__destructure_map.call(null,map__3669);
var doc = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var test = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"test","test",577538877));
var goog_define = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"goog-define","goog-define",-1048305441));
var init = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var name = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var export$ = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"export","export",214356590));
var var$ = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var var_ast = cljs.core.get.call(null,map__3669__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__5043__auto__ = init;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,(cljs.core.truth_(goog_define)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["@define {",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog_define),"}"].join('')], null):null),jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__5455__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__5455__auto__)){
var define = temp__5455__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"the-var","the-var",1428415613),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__5041__auto__)){
return test;
} else {
return and__5041__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__3670){
var map__3671 = p__3670;
var map__3671__$1 = cljs.core.__destructure_map.call(null,map__3671);
var name = cljs.core.get.call(null,map__3671__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__3671__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__3671__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,name)),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__3672_3696 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__3673_3697 = null;
var count__3674_3698 = (0);
var i__3675_3699 = (0);
while(true){
if((i__3675_3699 < count__3674_3698)){
var vec__3682_3700 = cljs.core._nth.call(null,chunk__3673_3697,i__3675_3699);
var i_3701 = cljs.core.nth.call(null,vec__3682_3700,(0),null);
var param_3702 = cljs.core.nth.call(null,vec__3682_3700,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_3702);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__3703 = seq__3672_3696;
var G__3704 = chunk__3673_3697;
var G__3705 = count__3674_3698;
var G__3706 = (i__3675_3699 + (1));
seq__3672_3696 = G__3703;
chunk__3673_3697 = G__3704;
count__3674_3698 = G__3705;
i__3675_3699 = G__3706;
continue;
} else {
var temp__5457__auto___3707 = cljs.core.seq.call(null,seq__3672_3696);
if(temp__5457__auto___3707){
var seq__3672_3708__$1 = temp__5457__auto___3707;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3672_3708__$1)){
var c__5565__auto___3709 = cljs.core.chunk_first.call(null,seq__3672_3708__$1);
var G__3710 = cljs.core.chunk_rest.call(null,seq__3672_3708__$1);
var G__3711 = c__5565__auto___3709;
var G__3712 = cljs.core.count.call(null,c__5565__auto___3709);
var G__3713 = (0);
seq__3672_3696 = G__3710;
chunk__3673_3697 = G__3711;
count__3674_3698 = G__3712;
i__3675_3699 = G__3713;
continue;
} else {
var vec__3685_3714 = cljs.core.first.call(null,seq__3672_3708__$1);
var i_3715 = cljs.core.nth.call(null,vec__3685_3714,(0),null);
var param_3716 = cljs.core.nth.call(null,vec__3685_3714,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_3716);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__3717 = cljs.core.next.call(null,seq__3672_3708__$1);
var G__3718 = null;
var G__3719 = (0);
var G__3720 = (0);
seq__3672_3696 = G__3717;
chunk__3673_3697 = G__3718;
count__3674_3698 = G__3719;
i__3675_3699 = G__3720;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__3688_3721 = cljs.core.seq.call(null,params);
var chunk__3689_3722 = null;
var count__3690_3723 = (0);
var i__3691_3724 = (0);
while(true){
if((i__3691_3724 < count__3690_3723)){
var param_3725 = cljs.core._nth.call(null,chunk__3689_3722,i__3691_3724);
cljs.compiler.emit.call(null,param_3725);

if(cljs.core._EQ_.call(null,param_3725,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3726 = seq__3688_3721;
var G__3727 = chunk__3689_3722;
var G__3728 = count__3690_3723;
var G__3729 = (i__3691_3724 + (1));
seq__3688_3721 = G__3726;
chunk__3689_3722 = G__3727;
count__3690_3723 = G__3728;
i__3691_3724 = G__3729;
continue;
} else {
var temp__5457__auto___3730 = cljs.core.seq.call(null,seq__3688_3721);
if(temp__5457__auto___3730){
var seq__3688_3731__$1 = temp__5457__auto___3730;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3688_3731__$1)){
var c__5565__auto___3732 = cljs.core.chunk_first.call(null,seq__3688_3731__$1);
var G__3733 = cljs.core.chunk_rest.call(null,seq__3688_3731__$1);
var G__3734 = c__5565__auto___3732;
var G__3735 = cljs.core.count.call(null,c__5565__auto___3732);
var G__3736 = (0);
seq__3688_3721 = G__3733;
chunk__3689_3722 = G__3734;
count__3690_3723 = G__3735;
i__3691_3724 = G__3736;
continue;
} else {
var param_3737 = cljs.core.first.call(null,seq__3688_3731__$1);
cljs.compiler.emit.call(null,param_3737);

if(cljs.core._EQ_.call(null,param_3737,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3738 = cljs.core.next.call(null,seq__3688_3731__$1);
var G__3739 = null;
var G__3740 = (0);
var G__3741 = (0);
seq__3688_3721 = G__3738;
chunk__3689_3722 = G__3739;
count__3690_3723 = G__3740;
i__3691_3724 = G__3741;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__3692_3742 = cljs.core.seq.call(null,params);
var chunk__3693_3743 = null;
var count__3694_3744 = (0);
var i__3695_3745 = (0);
while(true){
if((i__3695_3745 < count__3694_3744)){
var param_3746 = cljs.core._nth.call(null,chunk__3693_3743,i__3695_3745);
cljs.compiler.emit.call(null,param_3746);

if(cljs.core._EQ_.call(null,param_3746,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3747 = seq__3692_3742;
var G__3748 = chunk__3693_3743;
var G__3749 = count__3694_3744;
var G__3750 = (i__3695_3745 + (1));
seq__3692_3742 = G__3747;
chunk__3693_3743 = G__3748;
count__3694_3744 = G__3749;
i__3695_3745 = G__3750;
continue;
} else {
var temp__5457__auto___3751 = cljs.core.seq.call(null,seq__3692_3742);
if(temp__5457__auto___3751){
var seq__3692_3752__$1 = temp__5457__auto___3751;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3692_3752__$1)){
var c__5565__auto___3753 = cljs.core.chunk_first.call(null,seq__3692_3752__$1);
var G__3754 = cljs.core.chunk_rest.call(null,seq__3692_3752__$1);
var G__3755 = c__5565__auto___3753;
var G__3756 = cljs.core.count.call(null,c__5565__auto___3753);
var G__3757 = (0);
seq__3692_3742 = G__3754;
chunk__3693_3743 = G__3755;
count__3694_3744 = G__3756;
i__3695_3745 = G__3757;
continue;
} else {
var param_3758 = cljs.core.first.call(null,seq__3692_3752__$1);
cljs.compiler.emit.call(null,param_3758);

if(cljs.core._EQ_.call(null,param_3758,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3759 = cljs.core.next.call(null,seq__3692_3752__$1);
var G__3760 = null;
var G__3761 = (0);
var G__3762 = (0);
seq__3692_3742 = G__3759;
chunk__3693_3743 = G__3760;
count__3694_3744 = G__3761;
i__3695_3745 = G__3762;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__3763 = cljs.core.seq.call(null,params);
var chunk__3764 = null;
var count__3765 = (0);
var i__3766 = (0);
while(true){
if((i__3766 < count__3765)){
var param = cljs.core._nth.call(null,chunk__3764,i__3766);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3767 = seq__3763;
var G__3768 = chunk__3764;
var G__3769 = count__3765;
var G__3770 = (i__3766 + (1));
seq__3763 = G__3767;
chunk__3764 = G__3768;
count__3765 = G__3769;
i__3766 = G__3770;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__3763);
if(temp__5457__auto__){
var seq__3763__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3763__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__3763__$1);
var G__3771 = cljs.core.chunk_rest.call(null,seq__3763__$1);
var G__3772 = c__5565__auto__;
var G__3773 = cljs.core.count.call(null,c__5565__auto__);
var G__3774 = (0);
seq__3763 = G__3771;
chunk__3764 = G__3772;
count__3765 = G__3773;
i__3766 = G__3774;
continue;
} else {
var param = cljs.core.first.call(null,seq__3763__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3775 = cljs.core.next.call(null,seq__3763__$1);
var G__3776 = null;
var G__3777 = (0);
var G__3778 = (0);
seq__3763 = G__3775;
chunk__3764 = G__3776;
count__3765 = G__3777;
i__3766 = G__3778;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__3779){
var map__3780 = p__3779;
var map__3780__$1 = cljs.core.__destructure_map.call(null,map__3780);
var expr = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var type = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__3780__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__3781){
var map__3782 = p__3781;
var map__3782__$1 = cljs.core.__destructure_map.call(null,map__3782);
var f = map__3782__$1;
var expr = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var max_fixed_arity = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"fixed-arity","fixed-arity",1586445869));
var variadic = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var type = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__3782__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_3791__$1 = (function (){var or__5043__auto__ = name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_3792 = cljs.compiler.munge.call(null,name_3791__$1);
var delegate_name_3793 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_3792),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_3793," = function (");

var seq__3783_3794 = cljs.core.seq.call(null,params);
var chunk__3784_3795 = null;
var count__3785_3796 = (0);
var i__3786_3797 = (0);
while(true){
if((i__3786_3797 < count__3785_3796)){
var param_3798 = cljs.core._nth.call(null,chunk__3784_3795,i__3786_3797);
cljs.compiler.emit.call(null,param_3798);

if(cljs.core._EQ_.call(null,param_3798,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3799 = seq__3783_3794;
var G__3800 = chunk__3784_3795;
var G__3801 = count__3785_3796;
var G__3802 = (i__3786_3797 + (1));
seq__3783_3794 = G__3799;
chunk__3784_3795 = G__3800;
count__3785_3796 = G__3801;
i__3786_3797 = G__3802;
continue;
} else {
var temp__5457__auto___3803 = cljs.core.seq.call(null,seq__3783_3794);
if(temp__5457__auto___3803){
var seq__3783_3804__$1 = temp__5457__auto___3803;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3783_3804__$1)){
var c__5565__auto___3805 = cljs.core.chunk_first.call(null,seq__3783_3804__$1);
var G__3806 = cljs.core.chunk_rest.call(null,seq__3783_3804__$1);
var G__3807 = c__5565__auto___3805;
var G__3808 = cljs.core.count.call(null,c__5565__auto___3805);
var G__3809 = (0);
seq__3783_3794 = G__3806;
chunk__3784_3795 = G__3807;
count__3785_3796 = G__3808;
i__3786_3797 = G__3809;
continue;
} else {
var param_3810 = cljs.core.first.call(null,seq__3783_3804__$1);
cljs.compiler.emit.call(null,param_3810);

if(cljs.core._EQ_.call(null,param_3810,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3811 = cljs.core.next.call(null,seq__3783_3804__$1);
var G__3812 = null;
var G__3813 = (0);
var G__3814 = (0);
seq__3783_3794 = G__3811;
chunk__3784_3795 = G__3812;
count__3785_3796 = G__3813;
i__3786_3797 = G__3814;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_3792," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_3815 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_3815,",0,null);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_3793,".call(this,");

var seq__3787_3816 = cljs.core.seq.call(null,params);
var chunk__3788_3817 = null;
var count__3789_3818 = (0);
var i__3790_3819 = (0);
while(true){
if((i__3790_3819 < count__3789_3818)){
var param_3820 = cljs.core._nth.call(null,chunk__3788_3817,i__3790_3819);
cljs.compiler.emit.call(null,param_3820);

if(cljs.core._EQ_.call(null,param_3820,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3821 = seq__3787_3816;
var G__3822 = chunk__3788_3817;
var G__3823 = count__3789_3818;
var G__3824 = (i__3790_3819 + (1));
seq__3787_3816 = G__3821;
chunk__3788_3817 = G__3822;
count__3789_3818 = G__3823;
i__3790_3819 = G__3824;
continue;
} else {
var temp__5457__auto___3825 = cljs.core.seq.call(null,seq__3787_3816);
if(temp__5457__auto___3825){
var seq__3787_3826__$1 = temp__5457__auto___3825;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3787_3826__$1)){
var c__5565__auto___3827 = cljs.core.chunk_first.call(null,seq__3787_3826__$1);
var G__3828 = cljs.core.chunk_rest.call(null,seq__3787_3826__$1);
var G__3829 = c__5565__auto___3827;
var G__3830 = cljs.core.count.call(null,c__5565__auto___3827);
var G__3831 = (0);
seq__3787_3816 = G__3828;
chunk__3788_3817 = G__3829;
count__3789_3818 = G__3830;
i__3790_3819 = G__3831;
continue;
} else {
var param_3832 = cljs.core.first.call(null,seq__3787_3826__$1);
cljs.compiler.emit.call(null,param_3832);

if(cljs.core._EQ_.call(null,param_3832,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__3833 = cljs.core.next.call(null,seq__3787_3826__$1);
var G__3834 = null;
var G__3835 = (0);
var G__3836 = (0);
seq__3787_3816 = G__3833;
chunk__3788_3817 = G__3834;
count__3789_3818 = G__3835;
i__3790_3819 = G__3836;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_3792,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_3792,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_3791__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_3792,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_3793,";");

cljs.compiler.emitln.call(null,"return ",mname_3792,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__3840){
var map__3841 = p__3840;
var map__3841__$1 = cljs.core.__destructure_map.call(null,map__3841);
var variadic = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var name = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var recur_frames = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var in_loop = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"in-loop","in-loop",-187298246));
var loop_lets = cljs.core.get.call(null,map__3841__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var recur_params = cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,(function (p1__3837_SHARP_){
var and__5041__auto__ = p1__3837_SHARP_;
if(cljs.core.truth_(and__5041__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__3837_SHARP_));
} else {
return and__5041__auto__;
}
}),recur_frames));
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,recur_params,(cljs.core.truth_((function (){var or__5043__auto__ = in_loop;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.seq.call(null,recur_params);
}
})())?cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets):null))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_3893__$1 = (function (){var or__5043__auto__ = name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_3894 = cljs.compiler.munge.call(null,name_3893__$1);
var maxparams_3895 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_3896 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_3894),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
}),methods$));
var ms_3897 = cljs.core.sort_by.call(null,(function (p1__3838_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__3838_SHARP_)));
}),cljs.core.seq.call(null,mmap_3896));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_3894," = null;");

var seq__3842_3898 = cljs.core.seq.call(null,ms_3897);
var chunk__3843_3899 = null;
var count__3844_3900 = (0);
var i__3845_3901 = (0);
while(true){
if((i__3845_3901 < count__3844_3900)){
var vec__3852_3902 = cljs.core._nth.call(null,chunk__3843_3899,i__3845_3901);
var n_3903 = cljs.core.nth.call(null,vec__3852_3902,(0),null);
var meth_3904 = cljs.core.nth.call(null,vec__3852_3902,(1),null);
cljs.compiler.emits.call(null,"var ",n_3903," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3904))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_3904);
} else {
cljs.compiler.emit_fn_method.call(null,meth_3904);
}

cljs.compiler.emitln.call(null,";");


var G__3905 = seq__3842_3898;
var G__3906 = chunk__3843_3899;
var G__3907 = count__3844_3900;
var G__3908 = (i__3845_3901 + (1));
seq__3842_3898 = G__3905;
chunk__3843_3899 = G__3906;
count__3844_3900 = G__3907;
i__3845_3901 = G__3908;
continue;
} else {
var temp__5457__auto___3909 = cljs.core.seq.call(null,seq__3842_3898);
if(temp__5457__auto___3909){
var seq__3842_3910__$1 = temp__5457__auto___3909;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3842_3910__$1)){
var c__5565__auto___3911 = cljs.core.chunk_first.call(null,seq__3842_3910__$1);
var G__3912 = cljs.core.chunk_rest.call(null,seq__3842_3910__$1);
var G__3913 = c__5565__auto___3911;
var G__3914 = cljs.core.count.call(null,c__5565__auto___3911);
var G__3915 = (0);
seq__3842_3898 = G__3912;
chunk__3843_3899 = G__3913;
count__3844_3900 = G__3914;
i__3845_3901 = G__3915;
continue;
} else {
var vec__3855_3916 = cljs.core.first.call(null,seq__3842_3910__$1);
var n_3917 = cljs.core.nth.call(null,vec__3855_3916,(0),null);
var meth_3918 = cljs.core.nth.call(null,vec__3855_3916,(1),null);
cljs.compiler.emits.call(null,"var ",n_3917," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3918))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_3918);
} else {
cljs.compiler.emit_fn_method.call(null,meth_3918);
}

cljs.compiler.emitln.call(null,";");


var G__3919 = cljs.core.next.call(null,seq__3842_3910__$1);
var G__3920 = null;
var G__3921 = (0);
var G__3922 = (0);
seq__3842_3898 = G__3919;
chunk__3843_3899 = G__3920;
count__3844_3900 = G__3921;
i__3845_3901 = G__3922;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_3894," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_3895),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_3895)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_3895));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__3858_3923 = cljs.core.seq.call(null,ms_3897);
var chunk__3859_3924 = null;
var count__3860_3925 = (0);
var i__3861_3926 = (0);
while(true){
if((i__3861_3926 < count__3860_3925)){
var vec__3868_3927 = cljs.core._nth.call(null,chunk__3859_3924,i__3861_3926);
var n_3928 = cljs.core.nth.call(null,vec__3868_3927,(0),null);
var meth_3929 = cljs.core.nth.call(null,vec__3868_3927,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3929))){
cljs.compiler.emitln.call(null,"default:");

var restarg_3930 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_3930," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_3931 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_3930," = new cljs.core.IndexedSeq(",a_3931,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_3928,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_3895)),(((cljs.core.count.call(null,maxparams_3895) > (1)))?", ":null),restarg_3930,");");
} else {
var pcnt_3932 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_3929));
cljs.compiler.emitln.call(null,"case ",pcnt_3932,":");

cljs.compiler.emitln.call(null,"return ",n_3928,".call(this",(((pcnt_3932 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_3932,maxparams_3895)),null,(1),null)),(2),null))),");");
}


var G__3933 = seq__3858_3923;
var G__3934 = chunk__3859_3924;
var G__3935 = count__3860_3925;
var G__3936 = (i__3861_3926 + (1));
seq__3858_3923 = G__3933;
chunk__3859_3924 = G__3934;
count__3860_3925 = G__3935;
i__3861_3926 = G__3936;
continue;
} else {
var temp__5457__auto___3937 = cljs.core.seq.call(null,seq__3858_3923);
if(temp__5457__auto___3937){
var seq__3858_3938__$1 = temp__5457__auto___3937;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3858_3938__$1)){
var c__5565__auto___3939 = cljs.core.chunk_first.call(null,seq__3858_3938__$1);
var G__3940 = cljs.core.chunk_rest.call(null,seq__3858_3938__$1);
var G__3941 = c__5565__auto___3939;
var G__3942 = cljs.core.count.call(null,c__5565__auto___3939);
var G__3943 = (0);
seq__3858_3923 = G__3940;
chunk__3859_3924 = G__3941;
count__3860_3925 = G__3942;
i__3861_3926 = G__3943;
continue;
} else {
var vec__3871_3944 = cljs.core.first.call(null,seq__3858_3938__$1);
var n_3945 = cljs.core.nth.call(null,vec__3871_3944,(0),null);
var meth_3946 = cljs.core.nth.call(null,vec__3871_3944,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3946))){
cljs.compiler.emitln.call(null,"default:");

var restarg_3947 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_3947," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_3948 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_3947," = new cljs.core.IndexedSeq(",a_3948,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_3945,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_3895)),(((cljs.core.count.call(null,maxparams_3895) > (1)))?", ":null),restarg_3947,");");
} else {
var pcnt_3949 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_3946));
cljs.compiler.emitln.call(null,"case ",pcnt_3949,":");

cljs.compiler.emitln.call(null,"return ",n_3945,".call(this",(((pcnt_3949 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_3949,maxparams_3895)),null,(1),null)),(2),null))),");");
}


var G__3950 = cljs.core.next.call(null,seq__3858_3938__$1);
var G__3951 = null;
var G__3952 = (0);
var G__3953 = (0);
seq__3858_3923 = G__3950;
chunk__3859_3924 = G__3951;
count__3860_3925 = G__3952;
i__3861_3926 = G__3953;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

var arg_count_js_3954 = ((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"self__","self__",-153190816,null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,cljs.core.first.call(null,ms_3897)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + ",arg_count_js_3954,"));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_3894,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_3894,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__3839_SHARP_){
var vec__3874 = p1__3839_SHARP_;
var n = cljs.core.nth.call(null,vec__3874,(0),null);
var m = cljs.core.nth.call(null,vec__3874,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
}),ms_3897),".cljs$lang$applyTo;");
} else {
}

var seq__3877_3955 = cljs.core.seq.call(null,ms_3897);
var chunk__3878_3956 = null;
var count__3879_3957 = (0);
var i__3880_3958 = (0);
while(true){
if((i__3880_3958 < count__3879_3957)){
var vec__3887_3959 = cljs.core._nth.call(null,chunk__3878_3956,i__3880_3958);
var n_3960 = cljs.core.nth.call(null,vec__3887_3959,(0),null);
var meth_3961 = cljs.core.nth.call(null,vec__3887_3959,(1),null);
var c_3962 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_3961));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3961))){
cljs.compiler.emitln.call(null,mname_3894,".cljs$core$IFn$_invoke$arity$variadic = ",n_3960,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_3894,".cljs$core$IFn$_invoke$arity$",c_3962," = ",n_3960,";");
}


var G__3963 = seq__3877_3955;
var G__3964 = chunk__3878_3956;
var G__3965 = count__3879_3957;
var G__3966 = (i__3880_3958 + (1));
seq__3877_3955 = G__3963;
chunk__3878_3956 = G__3964;
count__3879_3957 = G__3965;
i__3880_3958 = G__3966;
continue;
} else {
var temp__5457__auto___3967 = cljs.core.seq.call(null,seq__3877_3955);
if(temp__5457__auto___3967){
var seq__3877_3968__$1 = temp__5457__auto___3967;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3877_3968__$1)){
var c__5565__auto___3969 = cljs.core.chunk_first.call(null,seq__3877_3968__$1);
var G__3970 = cljs.core.chunk_rest.call(null,seq__3877_3968__$1);
var G__3971 = c__5565__auto___3969;
var G__3972 = cljs.core.count.call(null,c__5565__auto___3969);
var G__3973 = (0);
seq__3877_3955 = G__3970;
chunk__3878_3956 = G__3971;
count__3879_3957 = G__3972;
i__3880_3958 = G__3973;
continue;
} else {
var vec__3890_3974 = cljs.core.first.call(null,seq__3877_3968__$1);
var n_3975 = cljs.core.nth.call(null,vec__3890_3974,(0),null);
var meth_3976 = cljs.core.nth.call(null,vec__3890_3974,(1),null);
var c_3977 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_3976));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_3976))){
cljs.compiler.emitln.call(null,mname_3894,".cljs$core$IFn$_invoke$arity$variadic = ",n_3975,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_3894,".cljs$core$IFn$_invoke$arity$",c_3977," = ",n_3975,";");
}


var G__3978 = cljs.core.next.call(null,seq__3877_3968__$1);
var G__3979 = null;
var G__3980 = (0);
var G__3981 = (0);
seq__3877_3955 = G__3978;
chunk__3878_3956 = G__3979;
count__3879_3957 = G__3980;
i__3880_3958 = G__3981;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_3894,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__3982){
var map__3983 = p__3982;
var map__3983__$1 = cljs.core.__destructure_map.call(null,map__3983);
var statements = cljs.core.get.call(null,map__3983__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__3983__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__3983__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__3984_3988 = cljs.core.seq.call(null,statements);
var chunk__3985_3989 = null;
var count__3986_3990 = (0);
var i__3987_3991 = (0);
while(true){
if((i__3987_3991 < count__3986_3990)){
var s_3992 = cljs.core._nth.call(null,chunk__3985_3989,i__3987_3991);
cljs.compiler.emitln.call(null,s_3992);


var G__3993 = seq__3984_3988;
var G__3994 = chunk__3985_3989;
var G__3995 = count__3986_3990;
var G__3996 = (i__3987_3991 + (1));
seq__3984_3988 = G__3993;
chunk__3985_3989 = G__3994;
count__3986_3990 = G__3995;
i__3987_3991 = G__3996;
continue;
} else {
var temp__5457__auto___3997 = cljs.core.seq.call(null,seq__3984_3988);
if(temp__5457__auto___3997){
var seq__3984_3998__$1 = temp__5457__auto___3997;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3984_3998__$1)){
var c__5565__auto___3999 = cljs.core.chunk_first.call(null,seq__3984_3998__$1);
var G__4000 = cljs.core.chunk_rest.call(null,seq__3984_3998__$1);
var G__4001 = c__5565__auto___3999;
var G__4002 = cljs.core.count.call(null,c__5565__auto___3999);
var G__4003 = (0);
seq__3984_3988 = G__4000;
chunk__3985_3989 = G__4001;
count__3986_3990 = G__4002;
i__3987_3991 = G__4003;
continue;
} else {
var s_4004 = cljs.core.first.call(null,seq__3984_3998__$1);
cljs.compiler.emitln.call(null,s_4004);


var G__4005 = cljs.core.next.call(null,seq__3984_3998__$1);
var G__4006 = null;
var G__4007 = (0);
var G__4008 = (0);
seq__3984_3988 = G__4005;
chunk__3985_3989 = G__4006;
count__3986_3990 = G__4007;
i__3987_3991 = G__4008;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__4009){
var map__4010 = p__4009;
var map__4010__$1 = cljs.core.__destructure_map.call(null,map__4010);
var try$ = cljs.core.get.call(null,map__4010__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var env = cljs.core.get.call(null,map__4010__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var catch$ = cljs.core.get.call(null,map__4010__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__4010__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__4010__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__5043__auto__ = name;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"const","const",1709929842),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote.call(null,finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__4011,is_loop){
var map__4012 = p__4011;
var map__4012__$1 = cljs.core.__destructure_map.call(null,map__4012);
var expr = cljs.core.get.call(null,map__4012__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__4012__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__4012__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__4013_4023 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__4014_4024 = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,(function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
}),bindings):null));
(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__4014_4024);

try{var seq__4015_4025 = cljs.core.seq.call(null,bindings);
var chunk__4016_4026 = null;
var count__4017_4027 = (0);
var i__4018_4028 = (0);
while(true){
if((i__4018_4028 < count__4017_4027)){
var map__4021_4029 = cljs.core._nth.call(null,chunk__4016_4026,i__4018_4028);
var map__4021_4030__$1 = cljs.core.__destructure_map.call(null,map__4021_4029);
var binding_4031 = map__4021_4030__$1;
var init_4032 = cljs.core.get.call(null,map__4021_4030__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_4031);

cljs.compiler.emitln.call(null," = ",init_4032,";");


var G__4033 = seq__4015_4025;
var G__4034 = chunk__4016_4026;
var G__4035 = count__4017_4027;
var G__4036 = (i__4018_4028 + (1));
seq__4015_4025 = G__4033;
chunk__4016_4026 = G__4034;
count__4017_4027 = G__4035;
i__4018_4028 = G__4036;
continue;
} else {
var temp__5457__auto___4037 = cljs.core.seq.call(null,seq__4015_4025);
if(temp__5457__auto___4037){
var seq__4015_4038__$1 = temp__5457__auto___4037;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4015_4038__$1)){
var c__5565__auto___4039 = cljs.core.chunk_first.call(null,seq__4015_4038__$1);
var G__4040 = cljs.core.chunk_rest.call(null,seq__4015_4038__$1);
var G__4041 = c__5565__auto___4039;
var G__4042 = cljs.core.count.call(null,c__5565__auto___4039);
var G__4043 = (0);
seq__4015_4025 = G__4040;
chunk__4016_4026 = G__4041;
count__4017_4027 = G__4042;
i__4018_4028 = G__4043;
continue;
} else {
var map__4022_4044 = cljs.core.first.call(null,seq__4015_4038__$1);
var map__4022_4045__$1 = cljs.core.__destructure_map.call(null,map__4022_4044);
var binding_4046 = map__4022_4045__$1;
var init_4047 = cljs.core.get.call(null,map__4022_4045__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_4046);

cljs.compiler.emitln.call(null," = ",init_4047,";");


var G__4048 = cljs.core.next.call(null,seq__4015_4038__$1);
var G__4049 = null;
var G__4050 = (0);
var G__4051 = (0);
seq__4015_4025 = G__4048;
chunk__4016_4026 = G__4049;
count__4017_4027 = G__4050;
i__4018_4028 = G__4051;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__4013_4023);
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__4052){
var map__4053 = p__4052;
var map__4053__$1 = cljs.core.__destructure_map.call(null,map__4053);
var frame = cljs.core.get.call(null,map__4053__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__4053__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__4053__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__5633__auto___4054 = cljs.core.count.call(null,exprs);
var i_4055 = (0);
while(true){
if((i_4055 < n__5633__auto___4054)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_4055)," = ",exprs.call(null,i_4055),";");

var G__4056 = (i_4055 + (1));
i_4055 = G__4056;
continue;
} else {
}
break;
}

var n__5633__auto___4057 = cljs.core.count.call(null,exprs);
var i_4058 = (0);
while(true){
if((i_4058 < n__5633__auto___4057)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_4058))," = ",temps.call(null,i_4058),";");

var G__4059 = (i_4058 + (1));
i_4058 = G__4059;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__4060){
var map__4061 = p__4060;
var map__4061__$1 = cljs.core.__destructure_map.call(null,map__4061);
var expr = cljs.core.get.call(null,map__4061__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__4061__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__4061__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__4062_4070 = cljs.core.seq.call(null,bindings);
var chunk__4063_4071 = null;
var count__4064_4072 = (0);
var i__4065_4073 = (0);
while(true){
if((i__4065_4073 < count__4064_4072)){
var map__4068_4074 = cljs.core._nth.call(null,chunk__4063_4071,i__4065_4073);
var map__4068_4075__$1 = cljs.core.__destructure_map.call(null,map__4068_4074);
var binding_4076 = map__4068_4075__$1;
var init_4077 = cljs.core.get.call(null,map__4068_4075__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4076)," = ",init_4077,";");


var G__4078 = seq__4062_4070;
var G__4079 = chunk__4063_4071;
var G__4080 = count__4064_4072;
var G__4081 = (i__4065_4073 + (1));
seq__4062_4070 = G__4078;
chunk__4063_4071 = G__4079;
count__4064_4072 = G__4080;
i__4065_4073 = G__4081;
continue;
} else {
var temp__5457__auto___4082 = cljs.core.seq.call(null,seq__4062_4070);
if(temp__5457__auto___4082){
var seq__4062_4083__$1 = temp__5457__auto___4082;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4062_4083__$1)){
var c__5565__auto___4084 = cljs.core.chunk_first.call(null,seq__4062_4083__$1);
var G__4085 = cljs.core.chunk_rest.call(null,seq__4062_4083__$1);
var G__4086 = c__5565__auto___4084;
var G__4087 = cljs.core.count.call(null,c__5565__auto___4084);
var G__4088 = (0);
seq__4062_4070 = G__4085;
chunk__4063_4071 = G__4086;
count__4064_4072 = G__4087;
i__4065_4073 = G__4088;
continue;
} else {
var map__4069_4089 = cljs.core.first.call(null,seq__4062_4083__$1);
var map__4069_4090__$1 = cljs.core.__destructure_map.call(null,map__4069_4089);
var binding_4091 = map__4069_4090__$1;
var init_4092 = cljs.core.get.call(null,map__4069_4090__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4091)," = ",init_4092,";");


var G__4093 = cljs.core.next.call(null,seq__4062_4083__$1);
var G__4094 = null;
var G__4095 = (0);
var G__4096 = (0);
seq__4062_4070 = G__4093;
chunk__4063_4071 = G__4094;
count__4064_4072 = G__4095;
i__4065_4073 = G__4096;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__4099){
var map__4100 = p__4099;
var map__4100__$1 = cljs.core.__destructure_map.call(null,map__4100);
var expr = map__4100__$1;
var f = cljs.core.get.call(null,map__4100__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var args = cljs.core.get.call(null,map__4100__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__4100__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__5041__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5041__auto__)){
var and__5041__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__5041__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__5041__auto__ = protocol;
if(cljs.core.truth_(and__5041__auto__)){
var and__5041__auto____$1 = tag;
if(cljs.core.truth_(and__5041__auto____$1)){
var or__5043__auto__ = (function (){var and__5041__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5041__auto____$2)){
var and__5041__auto____$3 = protocol;
if(cljs.core.truth_(and__5041__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__5041__auto____$3;
}
} else {
return and__5041__auto____$2;
}
})();
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
var and__5041__auto____$2 = (function (){var or__5043__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__5043__auto____$1)){
return or__5043__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__5041__auto____$2)){
var or__5043__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__5043__auto____$1){
return or__5043__auto____$1;
} else {
var and__5041__auto____$3 = (!(cljs.core.set_QMARK_.call(null,tag)));
if(and__5041__auto____$3){
var and__5041__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),"null",new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),"null",new cljs.core.Symbol(null,"object","object",-1179821820,null),"null",new cljs.core.Symbol(null,"any","any",-948528346,null),"null",new cljs.core.Symbol(null,"js","js",-886355190,null),"null",new cljs.core.Symbol(null,"number","number",-1084057331,null),"null",new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),"null",new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null",new cljs.core.Symbol(null,"function","function",-486723946,null),"null",new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),"null"], null), null).call(null,tag));
if(and__5041__auto____$4){
var temp__5457__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,env,cljs.core.vary_meta.call(null,tag,cljs.core.assoc,new cljs.core.Keyword("cljs.analyzer","no-resolve","cljs.analyzer/no-resolve",-1872351017),true)));
if(cljs.core.truth_(temp__5457__auto__)){
var ps = temp__5457__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__5041__auto____$4;
}
} else {
return and__5041__auto____$3;
}
}
} else {
return and__5041__auto____$2;
}
}
} else {
return and__5041__auto____$1;
}
} else {
return and__5041__auto__;
}
})();
var first_arg_tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var opt_not_QMARK_ = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,first_arg_tag,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null))));
var opt_count_QMARK_ = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null))) && (cljs.core.boolean$.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null"], null), null).call(null,first_arg_tag))));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var ftag = cljs.analyzer.infer_tag.call(null,env,f);
var js_QMARK_ = (function (){var or__5043__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null));
if(or__5043__auto__){
return or__5043__auto__;
} else {
var or__5043__auto____$1 = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null));
if(or__5043__auto____$1){
return or__5043__auto____$1;
} else {
return new cljs.core.Keyword(null,"foreign","foreign",990521149).cljs$core$IFn$_invoke$arity$1(info);
}
}
})();
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__5043__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__5043__auto__){
return or__5043__auto__;
} else {
var or__5043__auto____$1 = (function (){var temp__5457__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5457__auto__)){
var ns_str = temp__5457__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__5043__auto____$1)){
return or__5043__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__5043__auto__ = cljs.core._EQ_.call(null,new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null),ftag);
if(or__5043__auto__){
return or__5043__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote.call(null,f);
return ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"const","const",1709929842))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__4101 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__5041__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__5041__auto__)){
return (arity > mfa);
} else {
return and__5041__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (p1__4097_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__4097_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
}));
})),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (p1__4098_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__4098_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
}));
})),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__4101,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__4101,(1),null);
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"(!(",cljs.core.first.call(null,args),"))");
} else {
if(opt_count_QMARK_){
cljs.compiler.emits.call(null,"((",cljs.core.first.call(null,args),").length)");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_4104 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_4104,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_4105 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_4105,args)),(((mfa_4105 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_4105,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__5043__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
var or__5043__auto____$1 = js_QMARK_;
if(cljs.core.truth_(or__5043__auto____$1)){
return or__5043__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__5041__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5041__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1));
} else {
return and__5041__auto__;
}
})())){
var fprop_4106 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
if(cljs.core.truth_(cljs.analyzer._STAR_fn_invoke_direct_STAR_)){
cljs.compiler.emits.call(null,"(",f__$1,fprop_4106," ? ",f__$1,fprop_4106,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,"(",cljs.compiler.comma_sep.call(null,args),"))");
} else {
cljs.compiler.emits.call(null,"(",f__$1,fprop_4106," ? ",f__$1,fprop_4106,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
}
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__4107){
var map__4108 = p__4107;
var map__4108__$1 = cljs.core.__destructure_map.call(null,map__4108);
var ctor = cljs.core.get.call(null,map__4108__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var args = cljs.core.get.call(null,map__4108__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__4108__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__4109){
var map__4110 = p__4109;
var map__4110__$1 = cljs.core.__destructure_map.call(null,map__4110);
var target = cljs.core.get.call(null,map__4110__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__4110__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__4110__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(",target," = ",val,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.sublib_select = (function cljs$compiler$sublib_select(sublib){
if(cljs.core.truth_(sublib)){
var xs = clojure.string.split.call(null,sublib,/\./);
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4111_SHARP_){
return ["['",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__4111_SHARP_),"']"].join('');
}),xs));
} else {
return null;
}
});
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
var vec__4112 = cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib);
var lib_SINGLEQUOTE_ = cljs.core.nth.call(null,vec__4112,(0),null);
var sublib = cljs.core.nth.call(null,vec__4112,(1),null);
return cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,lib)," = goog.global",cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.call(null,cljs.core.name.call(null,(function (){var or__5043__auto__ = cljs.core.get.call(null,global_exports,cljs.core.symbol.call(null,lib_SINGLEQUOTE_));
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core.get.call(null,global_exports,cljs.core.name.call(null,lib_SINGLEQUOTE_));
}
})()),/\./))),cljs.compiler.sublib_select.call(null,sublib),";");
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__4115 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__4115__$1 = cljs.core.__destructure_map.call(null,map__4115);
var options = cljs.core.get.call(null,map__4115__$1,new cljs.core.Keyword(null,"options","options",99638489));
var js_dependency_index = cljs.core.get.call(null,map__4115__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var map__4116 = options;
var map__4116__$1 = cljs.core.__destructure_map.call(null,map__4116);
var target = cljs.core.get.call(null,map__4116__$1,new cljs.core.Keyword(null,"target","target",253001721));
var nodejs_rt = cljs.core.get.call(null,map__4116__$1,new cljs.core.Keyword(null,"nodejs-rt","nodejs-rt",-512437071));
var optimizations = cljs.core.get.call(null,map__4116__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
var vec__4117 = (function (){var libs__$1 = cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.filter.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,libs)),deps));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"nodejs","nodejs",321212524),target)){
var map__4123 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__4123__$1 = cljs.core.__destructure_map.call(null,map__4123);
var node_libs = cljs.core.get.call(null,map__4123__$1,true);
var libs_to_load = cljs.core.get.call(null,map__4123__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.call(null,vec__4117,(0),null);
var libs_to_load = cljs.core.nth.call(null,vec__4117,(1),null);
var vec__4120 = (function (){var map__4124 = cljs.core.group_by.call(null,cljs.analyzer.goog_module_dep_QMARK_,libs_to_load);
var map__4124__$1 = cljs.core.__destructure_map.call(null,map__4124);
var goog_modules = cljs.core.get.call(null,map__4124__$1,true);
var libs_to_load__$1 = cljs.core.get.call(null,map__4124__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [goog_modules,libs_to_load__$1], null);
})();
var goog_modules = cljs.core.nth.call(null,vec__4120,(0),null);
var libs_to_load__$1 = cljs.core.nth.call(null,vec__4120,(1),null);
var global_exports_libs = cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__4125_4169 = cljs.core.seq.call(null,libs_to_load__$1);
var chunk__4126_4170 = null;
var count__4127_4171 = (0);
var i__4128_4172 = (0);
while(true){
if((i__4128_4172 < count__4127_4171)){
var lib_4173 = cljs.core._nth.call(null,chunk__4126_4170,i__4128_4172);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_4173)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_4173),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4173),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_4173),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4173),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_4173,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4173),"');");
}

}
}
}


var G__4174 = seq__4125_4169;
var G__4175 = chunk__4126_4170;
var G__4176 = count__4127_4171;
var G__4177 = (i__4128_4172 + (1));
seq__4125_4169 = G__4174;
chunk__4126_4170 = G__4175;
count__4127_4171 = G__4176;
i__4128_4172 = G__4177;
continue;
} else {
var temp__5457__auto___4178 = cljs.core.seq.call(null,seq__4125_4169);
if(temp__5457__auto___4178){
var seq__4125_4179__$1 = temp__5457__auto___4178;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4125_4179__$1)){
var c__5565__auto___4180 = cljs.core.chunk_first.call(null,seq__4125_4179__$1);
var G__4181 = cljs.core.chunk_rest.call(null,seq__4125_4179__$1);
var G__4182 = c__5565__auto___4180;
var G__4183 = cljs.core.count.call(null,c__5565__auto___4180);
var G__4184 = (0);
seq__4125_4169 = G__4181;
chunk__4126_4170 = G__4182;
count__4127_4171 = G__4183;
i__4128_4172 = G__4184;
continue;
} else {
var lib_4185 = cljs.core.first.call(null,seq__4125_4179__$1);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_4185)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_4185),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4185),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_4185),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4185),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_4185,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_4185),"');");
}

}
}
}


var G__4186 = cljs.core.next.call(null,seq__4125_4179__$1);
var G__4187 = null;
var G__4188 = (0);
var G__4189 = (0);
seq__4125_4169 = G__4186;
chunk__4126_4170 = G__4187;
count__4127_4171 = G__4188;
i__4128_4172 = G__4189;
continue;
}
} else {
}
}
break;
}

var seq__4129_4190 = cljs.core.seq.call(null,node_libs);
var chunk__4130_4191 = null;
var count__4131_4192 = (0);
var i__4132_4193 = (0);
while(true){
if((i__4132_4193 < count__4131_4192)){
var lib_4194 = cljs.core._nth.call(null,chunk__4130_4191,i__4132_4193);
var vec__4139_4195 = cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4194);
var lib_SINGLEQUOTE__4196 = cljs.core.nth.call(null,vec__4139_4195,(0),null);
var sublib_4197 = cljs.core.nth.call(null,vec__4139_4195,(1),null);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_4194)," = require('",lib_SINGLEQUOTE__4196,"')",cljs.compiler.sublib_select.call(null,sublib_4197),";");


var G__4198 = seq__4129_4190;
var G__4199 = chunk__4130_4191;
var G__4200 = count__4131_4192;
var G__4201 = (i__4132_4193 + (1));
seq__4129_4190 = G__4198;
chunk__4130_4191 = G__4199;
count__4131_4192 = G__4200;
i__4132_4193 = G__4201;
continue;
} else {
var temp__5457__auto___4202 = cljs.core.seq.call(null,seq__4129_4190);
if(temp__5457__auto___4202){
var seq__4129_4203__$1 = temp__5457__auto___4202;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4129_4203__$1)){
var c__5565__auto___4204 = cljs.core.chunk_first.call(null,seq__4129_4203__$1);
var G__4205 = cljs.core.chunk_rest.call(null,seq__4129_4203__$1);
var G__4206 = c__5565__auto___4204;
var G__4207 = cljs.core.count.call(null,c__5565__auto___4204);
var G__4208 = (0);
seq__4129_4190 = G__4205;
chunk__4130_4191 = G__4206;
count__4131_4192 = G__4207;
i__4132_4193 = G__4208;
continue;
} else {
var lib_4209 = cljs.core.first.call(null,seq__4129_4203__$1);
var vec__4142_4210 = cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4209);
var lib_SINGLEQUOTE__4211 = cljs.core.nth.call(null,vec__4142_4210,(0),null);
var sublib_4212 = cljs.core.nth.call(null,vec__4142_4210,(1),null);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_4209)," = require('",lib_SINGLEQUOTE__4211,"')",cljs.compiler.sublib_select.call(null,sublib_4212),";");


var G__4213 = cljs.core.next.call(null,seq__4129_4203__$1);
var G__4214 = null;
var G__4215 = (0);
var G__4216 = (0);
seq__4129_4190 = G__4213;
chunk__4130_4191 = G__4214;
count__4131_4192 = G__4215;
i__4132_4193 = G__4216;
continue;
}
} else {
}
}
break;
}

var seq__4145_4217 = cljs.core.seq.call(null,goog_modules);
var chunk__4146_4218 = null;
var count__4147_4219 = (0);
var i__4148_4220 = (0);
while(true){
if((i__4148_4220 < count__4147_4219)){
var lib_4221 = cljs.core._nth.call(null,chunk__4146_4218,i__4148_4220);
var vec__4155_4222 = cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4221);
var lib_SINGLEQUOTE__4223 = cljs.core.nth.call(null,vec__4155_4222,(0),null);
var sublib_4224 = cljs.core.nth.call(null,vec__4155_4222,(1),null);
cljs.compiler.emitln.call(null,"goog.require('",lib_SINGLEQUOTE__4223,"');");

cljs.compiler.emitln.call(null,"goog.scope(function(){");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_goog_module_lib.call(null,lib_4221)," = goog.module.get('",lib_SINGLEQUOTE__4223,"')",cljs.compiler.sublib_select.call(null,sublib_4224),";");

cljs.compiler.emitln.call(null,"});");


var G__4225 = seq__4145_4217;
var G__4226 = chunk__4146_4218;
var G__4227 = count__4147_4219;
var G__4228 = (i__4148_4220 + (1));
seq__4145_4217 = G__4225;
chunk__4146_4218 = G__4226;
count__4147_4219 = G__4227;
i__4148_4220 = G__4228;
continue;
} else {
var temp__5457__auto___4229 = cljs.core.seq.call(null,seq__4145_4217);
if(temp__5457__auto___4229){
var seq__4145_4230__$1 = temp__5457__auto___4229;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4145_4230__$1)){
var c__5565__auto___4231 = cljs.core.chunk_first.call(null,seq__4145_4230__$1);
var G__4232 = cljs.core.chunk_rest.call(null,seq__4145_4230__$1);
var G__4233 = c__5565__auto___4231;
var G__4234 = cljs.core.count.call(null,c__5565__auto___4231);
var G__4235 = (0);
seq__4145_4217 = G__4232;
chunk__4146_4218 = G__4233;
count__4147_4219 = G__4234;
i__4148_4220 = G__4235;
continue;
} else {
var lib_4236 = cljs.core.first.call(null,seq__4145_4230__$1);
var vec__4158_4237 = cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4236);
var lib_SINGLEQUOTE__4238 = cljs.core.nth.call(null,vec__4158_4237,(0),null);
var sublib_4239 = cljs.core.nth.call(null,vec__4158_4237,(1),null);
cljs.compiler.emitln.call(null,"goog.require('",lib_SINGLEQUOTE__4238,"');");

cljs.compiler.emitln.call(null,"goog.scope(function(){");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_goog_module_lib.call(null,lib_4236)," = goog.module.get('",lib_SINGLEQUOTE__4238,"')",cljs.compiler.sublib_select.call(null,sublib_4239),";");

cljs.compiler.emitln.call(null,"});");


var G__4240 = cljs.core.next.call(null,seq__4145_4230__$1);
var G__4241 = null;
var G__4242 = (0);
var G__4243 = (0);
seq__4145_4217 = G__4240;
chunk__4146_4218 = G__4241;
count__4147_4219 = G__4242;
i__4148_4220 = G__4243;
continue;
}
} else {
}
}
break;
}

var seq__4161_4244 = cljs.core.seq.call(null,global_exports_libs);
var chunk__4162_4245 = null;
var count__4163_4246 = (0);
var i__4164_4247 = (0);
while(true){
if((i__4164_4247 < count__4163_4246)){
var lib_4248 = cljs.core._nth.call(null,chunk__4162_4245,i__4164_4247);
var map__4167_4249 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,cljs.core.first.call(null,cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4248))));
var map__4167_4250__$1 = cljs.core.__destructure_map.call(null,map__4167_4249);
var global_exports_4251 = cljs.core.get.call(null,map__4167_4250__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_4251,lib_4248);


var G__4252 = seq__4161_4244;
var G__4253 = chunk__4162_4245;
var G__4254 = count__4163_4246;
var G__4255 = (i__4164_4247 + (1));
seq__4161_4244 = G__4252;
chunk__4162_4245 = G__4253;
count__4163_4246 = G__4254;
i__4164_4247 = G__4255;
continue;
} else {
var temp__5457__auto___4256 = cljs.core.seq.call(null,seq__4161_4244);
if(temp__5457__auto___4256){
var seq__4161_4257__$1 = temp__5457__auto___4256;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4161_4257__$1)){
var c__5565__auto___4258 = cljs.core.chunk_first.call(null,seq__4161_4257__$1);
var G__4259 = cljs.core.chunk_rest.call(null,seq__4161_4257__$1);
var G__4260 = c__5565__auto___4258;
var G__4261 = cljs.core.count.call(null,c__5565__auto___4258);
var G__4262 = (0);
seq__4161_4244 = G__4259;
chunk__4162_4245 = G__4260;
count__4163_4246 = G__4261;
i__4164_4247 = G__4262;
continue;
} else {
var lib_4263 = cljs.core.first.call(null,seq__4161_4257__$1);
var map__4168_4264 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,cljs.core.first.call(null,cljs.analyzer.lib_AMPERSAND_sublib.call(null,lib_4263))));
var map__4168_4265__$1 = cljs.core.__destructure_map.call(null,map__4168_4264);
var global_exports_4266 = cljs.core.get.call(null,map__4168_4265__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_4266,lib_4263);


var G__4267 = cljs.core.next.call(null,seq__4161_4257__$1);
var G__4268 = null;
var G__4269 = (0);
var G__4270 = (0);
seq__4161_4244 = G__4267;
chunk__4162_4245 = G__4268;
count__4163_4246 = G__4269;
i__4164_4247 = G__4270;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__4271){
var map__4272 = p__4271;
var map__4272__$1 = cljs.core.__destructure_map.call(null,map__4272);
var name = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__4272__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-env","repl-env",-1976503928).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"'nil';");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__4273){
var map__4274 = p__4273;
var map__4274__$1 = cljs.core.__destructure_map.call(null,map__4274);
var name = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__4274__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype","deftype",340294561),(function (p__4275){
var map__4276 = p__4275;
var map__4276__$1 = cljs.core.__destructure_map.call(null,map__4276);
var t = cljs.core.get.call(null,map__4276__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__4276__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__4276__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__4276__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__4276__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__4277_4301 = cljs.core.seq.call(null,protocols);
var chunk__4278_4302 = null;
var count__4279_4303 = (0);
var i__4280_4304 = (0);
while(true){
if((i__4280_4304 < count__4279_4303)){
var protocol_4305 = cljs.core._nth.call(null,chunk__4278_4302,i__4280_4304);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_4305)),"}");


var G__4306 = seq__4277_4301;
var G__4307 = chunk__4278_4302;
var G__4308 = count__4279_4303;
var G__4309 = (i__4280_4304 + (1));
seq__4277_4301 = G__4306;
chunk__4278_4302 = G__4307;
count__4279_4303 = G__4308;
i__4280_4304 = G__4309;
continue;
} else {
var temp__5457__auto___4310 = cljs.core.seq.call(null,seq__4277_4301);
if(temp__5457__auto___4310){
var seq__4277_4311__$1 = temp__5457__auto___4310;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4277_4311__$1)){
var c__5565__auto___4312 = cljs.core.chunk_first.call(null,seq__4277_4311__$1);
var G__4313 = cljs.core.chunk_rest.call(null,seq__4277_4311__$1);
var G__4314 = c__5565__auto___4312;
var G__4315 = cljs.core.count.call(null,c__5565__auto___4312);
var G__4316 = (0);
seq__4277_4301 = G__4313;
chunk__4278_4302 = G__4314;
count__4279_4303 = G__4315;
i__4280_4304 = G__4316;
continue;
} else {
var protocol_4317 = cljs.core.first.call(null,seq__4277_4311__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_4317)),"}");


var G__4318 = cljs.core.next.call(null,seq__4277_4311__$1);
var G__4319 = null;
var G__4320 = (0);
var G__4321 = (0);
seq__4277_4301 = G__4318;
chunk__4278_4302 = G__4319;
count__4279_4303 = G__4320;
i__4280_4304 = G__4321;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__4281_4322 = cljs.core.seq.call(null,fields__$1);
var chunk__4282_4323 = null;
var count__4283_4324 = (0);
var i__4284_4325 = (0);
while(true){
if((i__4284_4325 < count__4283_4324)){
var fld_4326 = cljs.core._nth.call(null,chunk__4282_4323,i__4284_4325);
cljs.compiler.emitln.call(null,"this.",fld_4326," = ",fld_4326,";");


var G__4327 = seq__4281_4322;
var G__4328 = chunk__4282_4323;
var G__4329 = count__4283_4324;
var G__4330 = (i__4284_4325 + (1));
seq__4281_4322 = G__4327;
chunk__4282_4323 = G__4328;
count__4283_4324 = G__4329;
i__4284_4325 = G__4330;
continue;
} else {
var temp__5457__auto___4331 = cljs.core.seq.call(null,seq__4281_4322);
if(temp__5457__auto___4331){
var seq__4281_4332__$1 = temp__5457__auto___4331;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4281_4332__$1)){
var c__5565__auto___4333 = cljs.core.chunk_first.call(null,seq__4281_4332__$1);
var G__4334 = cljs.core.chunk_rest.call(null,seq__4281_4332__$1);
var G__4335 = c__5565__auto___4333;
var G__4336 = cljs.core.count.call(null,c__5565__auto___4333);
var G__4337 = (0);
seq__4281_4322 = G__4334;
chunk__4282_4323 = G__4335;
count__4283_4324 = G__4336;
i__4284_4325 = G__4337;
continue;
} else {
var fld_4338 = cljs.core.first.call(null,seq__4281_4332__$1);
cljs.compiler.emitln.call(null,"this.",fld_4338," = ",fld_4338,";");


var G__4339 = cljs.core.next.call(null,seq__4281_4332__$1);
var G__4340 = null;
var G__4341 = (0);
var G__4342 = (0);
seq__4281_4322 = G__4339;
chunk__4282_4323 = G__4340;
count__4283_4324 = G__4341;
i__4284_4325 = G__4342;
continue;
}
} else {
}
}
break;
}

var seq__4285_4343 = cljs.core.seq.call(null,pmasks);
var chunk__4286_4344 = null;
var count__4287_4345 = (0);
var i__4288_4346 = (0);
while(true){
if((i__4288_4346 < count__4287_4345)){
var vec__4295_4347 = cljs.core._nth.call(null,chunk__4286_4344,i__4288_4346);
var pno_4348 = cljs.core.nth.call(null,vec__4295_4347,(0),null);
var pmask_4349 = cljs.core.nth.call(null,vec__4295_4347,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4348,"$ = ",pmask_4349,";");


var G__4350 = seq__4285_4343;
var G__4351 = chunk__4286_4344;
var G__4352 = count__4287_4345;
var G__4353 = (i__4288_4346 + (1));
seq__4285_4343 = G__4350;
chunk__4286_4344 = G__4351;
count__4287_4345 = G__4352;
i__4288_4346 = G__4353;
continue;
} else {
var temp__5457__auto___4354 = cljs.core.seq.call(null,seq__4285_4343);
if(temp__5457__auto___4354){
var seq__4285_4355__$1 = temp__5457__auto___4354;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4285_4355__$1)){
var c__5565__auto___4356 = cljs.core.chunk_first.call(null,seq__4285_4355__$1);
var G__4357 = cljs.core.chunk_rest.call(null,seq__4285_4355__$1);
var G__4358 = c__5565__auto___4356;
var G__4359 = cljs.core.count.call(null,c__5565__auto___4356);
var G__4360 = (0);
seq__4285_4343 = G__4357;
chunk__4286_4344 = G__4358;
count__4287_4345 = G__4359;
i__4288_4346 = G__4360;
continue;
} else {
var vec__4298_4361 = cljs.core.first.call(null,seq__4285_4355__$1);
var pno_4362 = cljs.core.nth.call(null,vec__4298_4361,(0),null);
var pmask_4363 = cljs.core.nth.call(null,vec__4298_4361,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4362,"$ = ",pmask_4363,";");


var G__4364 = cljs.core.next.call(null,seq__4285_4355__$1);
var G__4365 = null;
var G__4366 = (0);
var G__4367 = (0);
seq__4285_4343 = G__4364;
chunk__4286_4344 = G__4365;
count__4287_4345 = G__4366;
i__4288_4346 = G__4367;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord","defrecord",-1367493418),(function (p__4368){
var map__4369 = p__4368;
var map__4369__$1 = cljs.core.__destructure_map.call(null,map__4369);
var t = cljs.core.get.call(null,map__4369__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__4369__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__4369__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__4369__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__4369__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__4370_4394 = cljs.core.seq.call(null,protocols);
var chunk__4371_4395 = null;
var count__4372_4396 = (0);
var i__4373_4397 = (0);
while(true){
if((i__4373_4397 < count__4372_4396)){
var protocol_4398 = cljs.core._nth.call(null,chunk__4371_4395,i__4373_4397);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_4398)),"}");


var G__4399 = seq__4370_4394;
var G__4400 = chunk__4371_4395;
var G__4401 = count__4372_4396;
var G__4402 = (i__4373_4397 + (1));
seq__4370_4394 = G__4399;
chunk__4371_4395 = G__4400;
count__4372_4396 = G__4401;
i__4373_4397 = G__4402;
continue;
} else {
var temp__5457__auto___4403 = cljs.core.seq.call(null,seq__4370_4394);
if(temp__5457__auto___4403){
var seq__4370_4404__$1 = temp__5457__auto___4403;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4370_4404__$1)){
var c__5565__auto___4405 = cljs.core.chunk_first.call(null,seq__4370_4404__$1);
var G__4406 = cljs.core.chunk_rest.call(null,seq__4370_4404__$1);
var G__4407 = c__5565__auto___4405;
var G__4408 = cljs.core.count.call(null,c__5565__auto___4405);
var G__4409 = (0);
seq__4370_4394 = G__4406;
chunk__4371_4395 = G__4407;
count__4372_4396 = G__4408;
i__4373_4397 = G__4409;
continue;
} else {
var protocol_4410 = cljs.core.first.call(null,seq__4370_4404__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_4410)),"}");


var G__4411 = cljs.core.next.call(null,seq__4370_4404__$1);
var G__4412 = null;
var G__4413 = (0);
var G__4414 = (0);
seq__4370_4394 = G__4411;
chunk__4371_4395 = G__4412;
count__4372_4396 = G__4413;
i__4373_4397 = G__4414;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__4374_4415 = cljs.core.seq.call(null,fields__$1);
var chunk__4375_4416 = null;
var count__4376_4417 = (0);
var i__4377_4418 = (0);
while(true){
if((i__4377_4418 < count__4376_4417)){
var fld_4419 = cljs.core._nth.call(null,chunk__4375_4416,i__4377_4418);
cljs.compiler.emitln.call(null,"this.",fld_4419," = ",fld_4419,";");


var G__4420 = seq__4374_4415;
var G__4421 = chunk__4375_4416;
var G__4422 = count__4376_4417;
var G__4423 = (i__4377_4418 + (1));
seq__4374_4415 = G__4420;
chunk__4375_4416 = G__4421;
count__4376_4417 = G__4422;
i__4377_4418 = G__4423;
continue;
} else {
var temp__5457__auto___4424 = cljs.core.seq.call(null,seq__4374_4415);
if(temp__5457__auto___4424){
var seq__4374_4425__$1 = temp__5457__auto___4424;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4374_4425__$1)){
var c__5565__auto___4426 = cljs.core.chunk_first.call(null,seq__4374_4425__$1);
var G__4427 = cljs.core.chunk_rest.call(null,seq__4374_4425__$1);
var G__4428 = c__5565__auto___4426;
var G__4429 = cljs.core.count.call(null,c__5565__auto___4426);
var G__4430 = (0);
seq__4374_4415 = G__4427;
chunk__4375_4416 = G__4428;
count__4376_4417 = G__4429;
i__4377_4418 = G__4430;
continue;
} else {
var fld_4431 = cljs.core.first.call(null,seq__4374_4425__$1);
cljs.compiler.emitln.call(null,"this.",fld_4431," = ",fld_4431,";");


var G__4432 = cljs.core.next.call(null,seq__4374_4425__$1);
var G__4433 = null;
var G__4434 = (0);
var G__4435 = (0);
seq__4374_4415 = G__4432;
chunk__4375_4416 = G__4433;
count__4376_4417 = G__4434;
i__4377_4418 = G__4435;
continue;
}
} else {
}
}
break;
}

var seq__4378_4436 = cljs.core.seq.call(null,pmasks);
var chunk__4379_4437 = null;
var count__4380_4438 = (0);
var i__4381_4439 = (0);
while(true){
if((i__4381_4439 < count__4380_4438)){
var vec__4388_4440 = cljs.core._nth.call(null,chunk__4379_4437,i__4381_4439);
var pno_4441 = cljs.core.nth.call(null,vec__4388_4440,(0),null);
var pmask_4442 = cljs.core.nth.call(null,vec__4388_4440,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4441,"$ = ",pmask_4442,";");


var G__4443 = seq__4378_4436;
var G__4444 = chunk__4379_4437;
var G__4445 = count__4380_4438;
var G__4446 = (i__4381_4439 + (1));
seq__4378_4436 = G__4443;
chunk__4379_4437 = G__4444;
count__4380_4438 = G__4445;
i__4381_4439 = G__4446;
continue;
} else {
var temp__5457__auto___4447 = cljs.core.seq.call(null,seq__4378_4436);
if(temp__5457__auto___4447){
var seq__4378_4448__$1 = temp__5457__auto___4447;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4378_4448__$1)){
var c__5565__auto___4449 = cljs.core.chunk_first.call(null,seq__4378_4448__$1);
var G__4450 = cljs.core.chunk_rest.call(null,seq__4378_4448__$1);
var G__4451 = c__5565__auto___4449;
var G__4452 = cljs.core.count.call(null,c__5565__auto___4449);
var G__4453 = (0);
seq__4378_4436 = G__4450;
chunk__4379_4437 = G__4451;
count__4380_4438 = G__4452;
i__4381_4439 = G__4453;
continue;
} else {
var vec__4391_4454 = cljs.core.first.call(null,seq__4378_4448__$1);
var pno_4455 = cljs.core.nth.call(null,vec__4391_4454,(0),null);
var pmask_4456 = cljs.core.nth.call(null,vec__4391_4454,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4455,"$ = ",pmask_4456,";");


var G__4457 = cljs.core.next.call(null,seq__4378_4448__$1);
var G__4458 = null;
var G__4459 = (0);
var G__4460 = (0);
seq__4378_4436 = G__4457;
chunk__4379_4437 = G__4458;
count__4380_4438 = G__4459;
i__4381_4439 = G__4460;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__4461){
var map__4462 = p__4461;
var map__4462__$1 = cljs.core.__destructure_map.call(null,map__4462);
var target = cljs.core.get.call(null,map__4462__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__4462__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__4462__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__4462__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__4462__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-field","host-field",-72662140),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-call","host-call",1059629755),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__4463){
var map__4464 = p__4463;
var map__4464__$1 = cljs.core.__destructure_map.call(null,map__4464);
var op = cljs.core.get.call(null,map__4464__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__4464__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__4464__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__4464__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__4464__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__5041__auto__ = code;
if(cljs.core.truth_(and__5041__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__5041__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__9253__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9253__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

var seq__4469 = cljs.core.seq.call(null,table);
var chunk__4470 = null;
var count__4471 = (0);
var i__4472 = (0);
while(true){
if((i__4472 < count__4471)){
var vec__4479 = cljs.core._nth.call(null,chunk__4470,i__4472);
var sym = cljs.core.nth.call(null,vec__4479,(0),null);
var value = cljs.core.nth.call(null,vec__4479,(1),null);
var ns_4485 = cljs.core.namespace.call(null,sym);
var name_4486 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__4487 = seq__4469;
var G__4488 = chunk__4470;
var G__4489 = count__4471;
var G__4490 = (i__4472 + (1));
seq__4469 = G__4487;
chunk__4470 = G__4488;
count__4471 = G__4489;
i__4472 = G__4490;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__4469);
if(temp__5457__auto__){
var seq__4469__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4469__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__4469__$1);
var G__4491 = cljs.core.chunk_rest.call(null,seq__4469__$1);
var G__4492 = c__5565__auto__;
var G__4493 = cljs.core.count.call(null,c__5565__auto__);
var G__4494 = (0);
seq__4469 = G__4491;
chunk__4470 = G__4492;
count__4471 = G__4493;
i__4472 = G__4494;
continue;
} else {
var vec__4482 = cljs.core.first.call(null,seq__4469__$1);
var sym = cljs.core.nth.call(null,vec__4482,(0),null);
var value = cljs.core.nth.call(null,vec__4482,(1),null);
var ns_4495 = cljs.core.namespace.call(null,sym);
var name_4496 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__4497 = cljs.core.next.call(null,seq__4469__$1);
var G__4498 = null;
var G__4499 = (0);
var G__4500 = (0);
seq__4469 = G__4497;
chunk__4470 = G__4498;
count__4471 = G__4499;
i__4472 = G__4500;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__4502 = arguments.length;
switch (G__4502) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.call(null,cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.analyzer.get_externs.call(null):null));
}));

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,externs));
while(true){
if(ks){
var k_4507 = cljs.core.first.call(null,ks);
var vec__4503_4508 = cljs.core.conj.call(null,prefix,k_4507);
var top_4509 = cljs.core.nth.call(null,vec__4503_4508,(0),null);
var prefix_SINGLEQUOTE__4510 = vec__4503_4508;
if(((cljs.core.not_EQ_.call(null,new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_4507)) && ((cljs.core.get_in.call(null,known_externs,prefix_SINGLEQUOTE__4510) == null)))){
if((!(((cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,top_level),top_4509)) || (cljs.core.contains_QMARK_.call(null,known_externs,top_4509)))))){
cljs.compiler.emitln.call(null,"var ",clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__4510)),";");

cljs.core.swap_BANG_.call(null,top_level,cljs.core.conj,top_4509);
} else {
cljs.compiler.emitln.call(null,clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__4510)),";");
}
} else {
}

var m_4511 = cljs.core.get.call(null,externs,k_4507);
if(cljs.core.empty_QMARK_.call(null,m_4511)){
} else {
cljs.compiler.emit_externs.call(null,prefix_SINGLEQUOTE__4510,m_4511,top_level,known_externs);
}

var G__4512 = cljs.core.next.call(null,ks);
ks = G__4512;
continue;
} else {
return null;
}
break;
}
}));

(cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4);


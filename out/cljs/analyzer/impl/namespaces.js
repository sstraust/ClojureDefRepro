// Compiled by ClojureScript 1.11.54 {:optimize-constants false, :optimizations :simple}
goog.provide('cljs.analyzer.impl.namespaces');
goog.require('cljs.core');
/**
 * Given a libspec return a map of :as-alias alias, if was present. Return the
 * libspec with :as-alias elided. If the libspec was *only* :as-alias do not
 * return it.
 */
cljs.analyzer.impl.namespaces.check_and_remove_as_alias = (function cljs$analyzer$impl$namespaces$check_and_remove_as_alias(libspec){
if((((libspec instanceof cljs.core.Symbol)) || ((libspec instanceof cljs.core.Keyword)))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec], null);
} else {
var vec__905 = libspec;
var seq__906 = cljs.core.seq.call(null,vec__905);
var first__907 = cljs.core.first.call(null,seq__906);
var seq__906__$1 = cljs.core.next.call(null,seq__906);
var lib = first__907;
var spec = seq__906__$1;
var libspec__$1 = vec__905;
var vec__908 = cljs.core.split_with.call(null,cljs.core.complement.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"as-alias","as-alias",82482467),null], null), null)),spec);
var pre_spec = cljs.core.nth.call(null,vec__908,(0),null);
var vec__911 = cljs.core.nth.call(null,vec__908,(1),null);
var seq__912 = cljs.core.seq.call(null,vec__911);
var first__913 = cljs.core.first.call(null,seq__912);
var seq__912__$1 = cljs.core.next.call(null,seq__912);
var _ = first__913;
var first__913__$1 = cljs.core.first.call(null,seq__912__$1);
var seq__912__$2 = cljs.core.next.call(null,seq__912__$1);
var alias = first__913__$1;
var post_spec = seq__912__$2;
var post = vec__911;
if(cljs.core.seq.call(null,post)){
var libspec_SINGLEQUOTE_ = cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lib], null),cljs.core.concat.call(null,pre_spec,post_spec));
if((alias instanceof cljs.core.Symbol)){
} else {
throw (new Error(["Assert failed: ",[":as-alias must be followed by a symbol, got: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias)].join(''),"\n","(symbol? alias)"].join('')));
}

var G__914 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"as-alias","as-alias",82482467),cljs.core.PersistentArrayMap.createAsIfByAssoc([alias,lib])], null);
if((cljs.core.count.call(null,libspec_SINGLEQUOTE_) > (1))){
return cljs.core.assoc.call(null,G__914,new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec_SINGLEQUOTE_);
} else {
return G__914;
}
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec__$1], null);
}
}
});
cljs.analyzer.impl.namespaces.check_as_alias_duplicates = (function cljs$analyzer$impl$namespaces$check_as_alias_duplicates(as_aliases,new_as_aliases){
var seq__915 = cljs.core.seq.call(null,new_as_aliases);
var chunk__916 = null;
var count__917 = (0);
var i__918 = (0);
while(true){
if((i__918 < count__917)){
var vec__925 = cljs.core._nth.call(null,chunk__916,i__918);
var alias = cljs.core.nth.call(null,vec__925,(0),null);
var _ = cljs.core.nth.call(null,vec__925,(1),null);
if((!(cljs.core.contains_QMARK_.call(null,as_aliases,alias)))){
} else {
throw (new Error(["Assert failed: ",["Duplicate :as-alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias),", already in use for lib ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,as_aliases,alias))].join(''),"\n","(not (contains? as-aliases alias))"].join('')));
}


var G__931 = seq__915;
var G__932 = chunk__916;
var G__933 = count__917;
var G__934 = (i__918 + (1));
seq__915 = G__931;
chunk__916 = G__932;
count__917 = G__933;
i__918 = G__934;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__915);
if(temp__5457__auto__){
var seq__915__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__915__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__915__$1);
var G__935 = cljs.core.chunk_rest.call(null,seq__915__$1);
var G__936 = c__5565__auto__;
var G__937 = cljs.core.count.call(null,c__5565__auto__);
var G__938 = (0);
seq__915 = G__935;
chunk__916 = G__936;
count__917 = G__937;
i__918 = G__938;
continue;
} else {
var vec__928 = cljs.core.first.call(null,seq__915__$1);
var alias = cljs.core.nth.call(null,vec__928,(0),null);
var _ = cljs.core.nth.call(null,vec__928,(1),null);
if((!(cljs.core.contains_QMARK_.call(null,as_aliases,alias)))){
} else {
throw (new Error(["Assert failed: ",["Duplicate :as-alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias),", already in use for lib ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,as_aliases,alias))].join(''),"\n","(not (contains? as-aliases alias))"].join('')));
}


var G__939 = cljs.core.next.call(null,seq__915__$1);
var G__940 = null;
var G__941 = (0);
var G__942 = (0);
seq__915 = G__939;
chunk__916 = G__940;
count__917 = G__941;
i__918 = G__942;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Given libspecs, elide all :as-alias. Return a map of :libspecs (filtered)
 * and :as-aliases.
 */
cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs = (function cljs$analyzer$impl$namespaces$elide_aliases_from_libspecs(var_args){
var G__944 = arguments.length;
switch (G__944) {
case 1:
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$1 = (function (libspecs){
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.call(null,libspecs,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2 = (function (libspecs,as_aliases){
var ret = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),as_aliases,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.PersistentVector.EMPTY], null);
return cljs.core.reduce.call(null,(function (ret__$1,libspec){
var map__945 = cljs.analyzer.impl.namespaces.check_and_remove_as_alias.call(null,libspec);
var map__945__$1 = cljs.core.__destructure_map.call(null,map__945);
var as_alias = cljs.core.get.call(null,map__945__$1,new cljs.core.Keyword(null,"as-alias","as-alias",82482467));
var libspec__$1 = cljs.core.get.call(null,map__945__$1,new cljs.core.Keyword(null,"libspec","libspec",1228503756));
cljs.analyzer.impl.namespaces.check_as_alias_duplicates.call(null,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798).cljs$core$IFn$_invoke$arity$1(ret__$1),as_alias);

var G__946 = ret__$1;
var G__946__$1 = (cljs.core.truth_(libspec__$1)?cljs.core.update.call(null,G__946,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,libspec__$1):G__946);
if(cljs.core.truth_(as_alias)){
return cljs.core.update.call(null,G__946__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.merge,as_alias);
} else {
return G__946__$1;
}
}),ret,libspecs);
}));

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$lang$maxFixedArity = 2);

cljs.analyzer.impl.namespaces.elide_aliases_from_ns_specs = (function cljs$analyzer$impl$namespaces$elide_aliases_from_ns_specs(ns_specs){

var ret = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.PersistentVector.EMPTY], null);
return cljs.core.reduce.call(null,(function (p__948,p__949){
var map__950 = p__948;
var map__950__$1 = cljs.core.__destructure_map.call(null,map__950);
var ret__$1 = map__950__$1;
var as_aliases = cljs.core.get.call(null,map__950__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798));
var vec__951 = p__949;
var seq__952 = cljs.core.seq.call(null,vec__951);
var first__953 = cljs.core.first.call(null,seq__952);
var seq__952__$1 = cljs.core.next.call(null,seq__952);
var spec_key = first__953;
var libspecs = seq__952__$1;
if((!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"refer-clojure","refer-clojure",813784440),spec_key)))){
var map__954 = cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.call(null,libspecs,as_aliases);
var map__954__$1 = cljs.core.__destructure_map.call(null,map__954);
var as_aliases__$1 = cljs.core.get.call(null,map__954__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798));
var libspecs__$1 = cljs.core.get.call(null,map__954__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195));
var G__955 = ret__$1;
var G__955__$1 = (((!(cljs.core.empty_QMARK_.call(null,as_aliases__$1))))?cljs.core.update.call(null,G__955,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.merge,as_aliases__$1):G__955);
if((!(cljs.core.empty_QMARK_.call(null,libspecs__$1)))){
return cljs.core.update.call(null,G__955__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,cljs.core.list_STAR_.call(null,spec_key,libspecs__$1));
} else {
return G__955__$1;
}
} else {
return cljs.core.update.call(null,ret__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,cljs.core.list_STAR_.call(null,spec_key,libspecs));
}
}),ret,ns_specs);
});

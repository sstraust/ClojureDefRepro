// Compiled by ClojureScript 1.11.54 {:optimize-constants false, :optimizations :simple}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__13660){
var map__13661 = p__13660;
var map__13661__$1 = cljs.core.__destructure_map.call(null,map__13661);
var m = map__13661__$1;
var n = cljs.core.get.call(null,map__13661__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__13661__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__5043__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return [(function (){var temp__5457__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5457__auto__)){
var ns = temp__5457__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__13662_13690 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__13663_13691 = null;
var count__13664_13692 = (0);
var i__13665_13693 = (0);
while(true){
if((i__13665_13693 < count__13664_13692)){
var f_13694 = cljs.core._nth.call(null,chunk__13663_13691,i__13665_13693);
cljs.core.println.call(null,"  ",f_13694);


var G__13695 = seq__13662_13690;
var G__13696 = chunk__13663_13691;
var G__13697 = count__13664_13692;
var G__13698 = (i__13665_13693 + (1));
seq__13662_13690 = G__13695;
chunk__13663_13691 = G__13696;
count__13664_13692 = G__13697;
i__13665_13693 = G__13698;
continue;
} else {
var temp__5457__auto___13699 = cljs.core.seq.call(null,seq__13662_13690);
if(temp__5457__auto___13699){
var seq__13662_13700__$1 = temp__5457__auto___13699;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13662_13700__$1)){
var c__5565__auto___13701 = cljs.core.chunk_first.call(null,seq__13662_13700__$1);
var G__13702 = cljs.core.chunk_rest.call(null,seq__13662_13700__$1);
var G__13703 = c__5565__auto___13701;
var G__13704 = cljs.core.count.call(null,c__5565__auto___13701);
var G__13705 = (0);
seq__13662_13690 = G__13702;
chunk__13663_13691 = G__13703;
count__13664_13692 = G__13704;
i__13665_13693 = G__13705;
continue;
} else {
var f_13706 = cljs.core.first.call(null,seq__13662_13700__$1);
cljs.core.println.call(null,"  ",f_13706);


var G__13707 = cljs.core.next.call(null,seq__13662_13700__$1);
var G__13708 = null;
var G__13709 = (0);
var G__13710 = (0);
seq__13662_13690 = G__13707;
chunk__13663_13691 = G__13708;
count__13664_13692 = G__13709;
i__13665_13693 = G__13710;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_13711 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_13711);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_13711)))?cljs.core.second.call(null,arglists_13711):arglists_13711));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__13666_13712 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__13667_13713 = null;
var count__13668_13714 = (0);
var i__13669_13715 = (0);
while(true){
if((i__13669_13715 < count__13668_13714)){
var vec__13678_13716 = cljs.core._nth.call(null,chunk__13667_13713,i__13669_13715);
var name_13717 = cljs.core.nth.call(null,vec__13678_13716,(0),null);
var map__13681_13718 = cljs.core.nth.call(null,vec__13678_13716,(1),null);
var map__13681_13719__$1 = cljs.core.__destructure_map.call(null,map__13681_13718);
var doc_13720 = cljs.core.get.call(null,map__13681_13719__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_13721 = cljs.core.get.call(null,map__13681_13719__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_13717);

cljs.core.println.call(null," ",arglists_13721);

if(cljs.core.truth_(doc_13720)){
cljs.core.println.call(null," ",doc_13720);
} else {
}


var G__13722 = seq__13666_13712;
var G__13723 = chunk__13667_13713;
var G__13724 = count__13668_13714;
var G__13725 = (i__13669_13715 + (1));
seq__13666_13712 = G__13722;
chunk__13667_13713 = G__13723;
count__13668_13714 = G__13724;
i__13669_13715 = G__13725;
continue;
} else {
var temp__5457__auto___13726 = cljs.core.seq.call(null,seq__13666_13712);
if(temp__5457__auto___13726){
var seq__13666_13727__$1 = temp__5457__auto___13726;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13666_13727__$1)){
var c__5565__auto___13728 = cljs.core.chunk_first.call(null,seq__13666_13727__$1);
var G__13729 = cljs.core.chunk_rest.call(null,seq__13666_13727__$1);
var G__13730 = c__5565__auto___13728;
var G__13731 = cljs.core.count.call(null,c__5565__auto___13728);
var G__13732 = (0);
seq__13666_13712 = G__13729;
chunk__13667_13713 = G__13730;
count__13668_13714 = G__13731;
i__13669_13715 = G__13732;
continue;
} else {
var vec__13682_13733 = cljs.core.first.call(null,seq__13666_13727__$1);
var name_13734 = cljs.core.nth.call(null,vec__13682_13733,(0),null);
var map__13685_13735 = cljs.core.nth.call(null,vec__13682_13733,(1),null);
var map__13685_13736__$1 = cljs.core.__destructure_map.call(null,map__13685_13735);
var doc_13737 = cljs.core.get.call(null,map__13685_13736__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_13738 = cljs.core.get.call(null,map__13685_13736__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_13734);

cljs.core.println.call(null," ",arglists_13738);

if(cljs.core.truth_(doc_13737)){
cljs.core.println.call(null," ",doc_13737);
} else {
}


var G__13739 = cljs.core.next.call(null,seq__13666_13727__$1);
var G__13740 = null;
var G__13741 = (0);
var G__13742 = (0);
seq__13666_13712 = G__13739;
chunk__13667_13713 = G__13740;
count__13668_13714 = G__13741;
i__13669_13715 = G__13742;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5457__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5457__auto__)){
var fnspec = temp__5457__auto__;
cljs.core.print.call(null,"Spec");

var seq__13686 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__13687 = null;
var count__13688 = (0);
var i__13689 = (0);
while(true){
if((i__13689 < count__13688)){
var role = cljs.core._nth.call(null,chunk__13687,i__13689);
var temp__5457__auto___13743__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5457__auto___13743__$1)){
var spec_13744 = temp__5457__auto___13743__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_13744));
} else {
}


var G__13745 = seq__13686;
var G__13746 = chunk__13687;
var G__13747 = count__13688;
var G__13748 = (i__13689 + (1));
seq__13686 = G__13745;
chunk__13687 = G__13746;
count__13688 = G__13747;
i__13689 = G__13748;
continue;
} else {
var temp__5457__auto____$1 = cljs.core.seq.call(null,seq__13686);
if(temp__5457__auto____$1){
var seq__13686__$1 = temp__5457__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13686__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__13686__$1);
var G__13749 = cljs.core.chunk_rest.call(null,seq__13686__$1);
var G__13750 = c__5565__auto__;
var G__13751 = cljs.core.count.call(null,c__5565__auto__);
var G__13752 = (0);
seq__13686 = G__13749;
chunk__13687 = G__13750;
count__13688 = G__13751;
i__13689 = G__13752;
continue;
} else {
var role = cljs.core.first.call(null,seq__13686__$1);
var temp__5457__auto___13753__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5457__auto___13753__$2)){
var spec_13754 = temp__5457__auto___13753__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_13754));
} else {
}


var G__13755 = cljs.core.next.call(null,seq__13686__$1);
var G__13756 = null;
var G__13757 = (0);
var G__13758 = (0);
seq__13686 = G__13755;
chunk__13687 = G__13756;
count__13688 = G__13757;
i__13689 = G__13758;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.call(null,"js",t.name):null
))], null),(function (){var temp__5457__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5457__auto__)){
var msg = temp__5457__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5457__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5457__auto__)){
var ed = temp__5457__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__13759 = cljs.core.conj.call(null,via,t);
var G__13760 = cljs.core.ex_cause.call(null,t);
via = G__13759;
t = G__13760;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5457__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5457__auto__)){
var root_msg = temp__5457__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5457__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5457__auto__)){
var data = temp__5457__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5457__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5457__auto__)){
var phase = temp__5457__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__13763 = datafied_throwable;
var map__13763__$1 = cljs.core.__destructure_map.call(null,map__13763);
var via = cljs.core.get.call(null,map__13763__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__13763__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__13763__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__13764 = cljs.core.last.call(null,via);
var map__13764__$1 = cljs.core.__destructure_map.call(null,map__13764);
var type = cljs.core.get.call(null,map__13764__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__13764__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__13764__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__13765 = data;
var map__13765__$1 = cljs.core.__destructure_map.call(null,map__13765);
var problems = cljs.core.get.call(null,map__13765__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__13765__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__13765__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__13766 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__13766__$1 = cljs.core.__destructure_map.call(null,map__13766);
var top_data = map__13766__$1;
var source = cljs.core.get.call(null,map__13766__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__13767 = phase;
var G__13767__$1 = (((G__13767 instanceof cljs.core.Keyword))?G__13767.fqn:null);
switch (G__13767__$1) {
case "read-source":
var map__13768 = data;
var map__13768__$1 = cljs.core.__destructure_map.call(null,map__13768);
var line = cljs.core.get.call(null,map__13768__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__13768__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__13769 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__13769__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__13769,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__13769);
var G__13769__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__13769__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__13769__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__13769__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__13769__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__13770 = top_data;
var G__13770__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__13770,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__13770);
var G__13770__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__13770__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__13770__$1);
var G__13770__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__13770__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__13770__$2);
var G__13770__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__13770__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__13770__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__13770__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__13770__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__13771 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__13771,(0),null);
var method = cljs.core.nth.call(null,vec__13771,(1),null);
var file = cljs.core.nth.call(null,vec__13771,(2),null);
var line = cljs.core.nth.call(null,vec__13771,(3),null);
var G__13774 = top_data;
var G__13774__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__13774,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__13774);
var G__13774__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__13774__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__13774__$1);
var G__13774__$3 = (cljs.core.truth_((function (){var and__5041__auto__ = source__$1;
if(cljs.core.truth_(and__5041__auto__)){
return method;
} else {
return and__5041__auto__;
}
})())?cljs.core.assoc.call(null,G__13774__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__13774__$2);
var G__13774__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__13774__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__13774__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__13774__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__13774__$4;
}

break;
case "execution":
var vec__13775 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__13775,(0),null);
var method = cljs.core.nth.call(null,vec__13775,(1),null);
var file = cljs.core.nth.call(null,vec__13775,(2),null);
var line = cljs.core.nth.call(null,vec__13775,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,(function (p1__13762_SHARP_){
var or__5043__auto__ = (p1__13762_SHARP_ == null);
if(or__5043__auto__){
return or__5043__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__13762_SHARP_);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5043__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return line;
}
})();
var G__13778 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__13778__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__13778,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__13778);
var G__13778__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__13778__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__13778__$1);
var G__13778__$3 = (cljs.core.truth_((function (){var or__5043__auto__ = fn;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
var and__5041__auto__ = source__$1;
if(cljs.core.truth_(and__5041__auto__)){
return method;
} else {
return and__5041__auto__;
}
}
})())?cljs.core.assoc.call(null,G__13778__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5043__auto__ = fn;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__13778__$2);
var G__13778__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__13778__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__13778__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__13778__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__13778__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13767__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__13782){
var map__13783 = p__13782;
var map__13783__$1 = cljs.core.__destructure_map.call(null,map__13783);
var triage_data = map__13783__$1;
var phase = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__13783__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5043__auto__ = source;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5043__auto__ = line;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__5043__auto__ = class$;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__13784 = phase;
var G__13784__$1 = (((G__13784 instanceof cljs.core.Keyword))?G__13784.fqn:null);
switch (G__13784__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__5687__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__13785_13794 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__13786_13795 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__13787_13796 = true;
var _STAR_print_fn_STAR__temp_val__13788_13797 = (function (x__5688__auto__){
return sb__5687__auto__.append(x__5688__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__13787_13796);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__13788_13797);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__13780_SHARP_){
return cljs.core.dissoc.call(null,p1__13780_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__13786_13795);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__13785_13794);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5687__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__5687__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__13789_13798 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__13790_13799 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__13791_13800 = true;
var _STAR_print_fn_STAR__temp_val__13792_13801 = (function (x__5688__auto__){
return sb__5687__auto__.append(x__5688__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__13791_13800);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__13792_13801);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__13781_SHARP_){
return cljs.core.dissoc.call(null,p1__13781_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__13790_13799);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__13789_13798);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5687__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13784__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

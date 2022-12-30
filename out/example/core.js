// Compiled by ClojureScript 1.11.54 {:optimize-constants false, :optimizations :simple}
goog.provide('example.core');
goog.require('cljs.core');
goog.require('cljs.js');
example.core.log_results = (function example$core$log_results(result){
console.log(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(result));

console.log(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(result));

return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(result);
});
example.core.call_eval_with_def = (function example$core$call_eval_with_def(){
return cljs.js.eval.call(null,cljs.js.empty_state.call(null),cljs.core.list(new cljs.core.Symbol(null,"do","do",1686842252,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",597100991,null),new cljs.core.Symbol(null,"x","x",-555367584,null),(10)),cljs.core.list(new cljs.core.Symbol("js","console.log","js/console.log",-2005248266,null),cljs.core.list(new cljs.core.Symbol(null,"+","+",-740910886,null),new cljs.core.Symbol(null,"x","x",-555367584,null),(2)))),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"eval","eval",-1103567905),cljs.js.js_eval,new cljs.core.Keyword(null,"source-map","source-map",1706252311),true,new cljs.core.Keyword(null,"verbose","verbose",1694226060),true,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291)], null),example.core.log_results);
});
goog.exportSymbol('example.core.call_eval_with_def', example.core.call_eval_with_def);
console.log("loaded file!");

(ns ^:export example.core
  (:require 
   [cljs.js :refer [empty-state eval js-eval]]))

(defn log-results [result]
  (do (js/console.log (:value result))
      (js/console.log (:error result))
      (:value result)))

(defn ^:export call-eval-with-def []
  (eval
   (empty-state)
   '(do (def x 10)
        (js/console.log (+ x 2)))
   {:eval       js-eval    
    :source-map true
    :verbose true
    :context    :expr}
   log-results))

(js/console.log "loaded file!")

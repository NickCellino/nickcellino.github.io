(ns generate-rss
  (:require [clj-rss.core :as rss]))

(defn date
  [year month day]
  (.toInstant (java.util.Date. (- year 1900) (- month 1) day)))

(defn generate []
  (rss/channel-xml {:title "Nick Cellino's Website"
                    :link "https://nickcellino.com"
                    :description "Building simpler software."}

                   {:title "nbb comments"
                    :guid "https://nickcellino.com/blog/2022-09-03-nbb-comments.html"
                    :link "https://nickcellino.com/blog/2022-09-03-nbb-comments.html"
                    :pubDate (date 2022 9 3)
                    :description (str "Implementing a comments feature for my blog with nbb, htmx, Serverless "
                                      "Framework, and DynamoDB")}

                   {:title "Clojure Bandits"
                    :guid "https://nickcellino.com/blog/2022-08-07-clojure-bandits.html"
                    :link "https://nickcellino.com/blog/2022-08-07-clojure-bandits.html"
                    :pubDate (date 2022 8 7)
                    :description (str "An (interactive) exploration of a classic reinforcement learning problem"
                                      " through the lens of Clojure.")}
                   {:title "GraphQL, The N+1 Problem, and You"
                    :guid "https://nickcellino.com/blog/2021-12-15-graphql-n-1.html"
                    :link "https://nickcellino.com/blog/2021-12-15-graphql-n-1.html"
                    :pubDate (date 2021 12 15)
                    :description (str "Exploration of the N+1 problem in the context of GraphQL.")}))

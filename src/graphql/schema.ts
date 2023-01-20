import { GraphQLSchema } from "graphql"
import { queryGraph } from "./query"

export const schemaGraphQL = new GraphQLSchema({
   query: queryGraph,
   
})

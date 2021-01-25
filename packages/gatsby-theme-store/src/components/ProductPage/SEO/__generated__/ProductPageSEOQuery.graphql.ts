
/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
  ID: string
}

// Operation related types
export type ProductPageSeoQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductPageSeoQueryQuery = { site: Maybe<{ siteMetadata: Maybe<{ title: Maybe<string>, siteUrl: Maybe<string>, description: Maybe<string>, author: Maybe<string> }> }> };


// Query Related Code

export const ProductPageSEOQuery = {
  query: "query ProductPageSEOQuery {\n  site {\n    siteMetadata {\n      title\n      siteUrl\n      description\n      author\n    }\n  }\n}\n",
  sha256Hash: "ed8024d5948bc83c090cd6a3ad4d83dcb3ef593999d1ef783f31559bd50d57b2",
  operationName: "ProductPageSEOQuery",
}


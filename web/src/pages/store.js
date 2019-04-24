import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProductPreviewGrid from '../components/product/product-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle2 } from '../components/typography.module.css'

export const query = graphql`
  query ProductPageQuery {
    products: allSanityProduct(
      limit: 20
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          price
          discount
          quantity
          slug {
            current
          }
          mainImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
        }
      }
    }
  }
`

const Store = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const productNodes = data && data.products && mapEdgesToNodes(data.products).filter(filterOutDocsWithoutSlugs)
  return (
    <Layout>
      <SEO title='Store' />
      <Container>
        <h1 className={responsiveTitle2}>Store</h1>
        {productNodes && productNodes.length > 0 && <ProductPreviewGrid nodes={productNodes} />}
      </Container>
    </Layout>
  )
}

export default Store

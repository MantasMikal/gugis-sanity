import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, cn } from '../lib/helpers'
import { responsiveTitle2, uppercase } from '../components/typography.module.css'
import ArtPreviewGrid from '../components/art-preview-grid'

export const query = graphql`
  query ArtPageQuery {
    art: allSanityArt(limit: 100, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          publishedAt
          id
          title
          artworkCategory {
            title
          }
          artwork {
            alt
            caption
            asset {
              fluid(maxWidth: 1000, maxHeight: 1000) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }

    categories: allSanityArtworkCategory {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const Art = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const artNodes = data && data.art && mapEdgesToNodes(data.art)
  const categories = data && data.categories && mapEdgesToNodes(data.categories)
  return (
    <Layout>
      <SEO title='Art' />
      <Container>
        <h1 className={cn(responsiveTitle2, uppercase)}>Art</h1>
        <ArtPreviewGrid categories={categories} media={artNodes} />
      </Container>
    </Layout>
  )
}

export default Art

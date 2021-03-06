const shuffleArray = require('./src/lib/shuffleArray')

// // Fetch rates
// const fetchRate = async (API) => {
//   const response = await fetch(API)
//   const data = await response.json()
//   return data
// }

// // const rates = await fetchRate('https://api.exchangeratesapi.io/latest?base=EUR')
// //     console.log(node.details)
// //     node.details && node.details.map((detail) => {
// //     const prices = getPrices(detail.price, rates.rates)
// // })

// // Converts price to all available currencies(rates)
// // E.g.
// //  {
// //    CAD: 14.602,
// //    HKD: 86.36699999999999,
// //    ISK: 1361,
// // ..}
// const getPrices = (price, rates) => {
//   const prices = {}
//   Object.entries(rates).forEach(([name, value]) => {
//     price && rates && Object.assign(prices, {[name]:  value * price})
//   })
// }

// exports.setFieldsOnGraphQLNodeType = ({ type }) => {
//   if (type.name === `SanityProduct`) {
//     console.log("Create field for Sanity product: ", type)
//     return {
//       newField: {
//         type: GraphQLString,
//         myFielder: 'heey',
//         args: {
//           myArgument: {
//             type: GraphQLString,
//             argo: 'Heey',
//             myArgument: 12
//           }
//         },
//         resolve: (source, fieldArgs) => {
//           return `Id of this node is ${source.id}.
//                   Field was called with argument: ${fieldArgs.myArgument}`
//         }
//       }
//     }
//   }

//   // by default return empty object
//   return {}
// }

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions
//   if(node.internal.type === 'allSanityProduct') {
//     createNodeField({
//       node: node,
//       name: `convertedPrices`,
//       value: 'myPrices'
//     })
//   }
// }

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === 'SanityProduct') {
//     createNodeField({
//       node,
//       name: 'myField',
//       value: 'myValue'
//     })
//     createNodeField({
//       node,
//       name: 'myField1',
//       value: 'myValue'
//     })
//     createNodeField({
//       node,
//       name: 'myField2',
//       value: 'myValue'
//     })
//     createNodeField({
//       node,
//       name: 'myField3',
//       value: 'myValue'
//     })
//     c
//   }
// }

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          previous {
            publishedAt
            title
            slug {
              current
            }
          }
          next {
            title
            publishedAt
            slug {
              current
            }
          }
          node {
            id
            title
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    // const dateSegment = parseISO(publishedAt, 'YYYY/MM')
    const path = `/blog/${slug.current}/`

    // Next and previous pages
    // const prevDate = edge.previous ? parseISO(edge.previous.publishedAt, 'YYYY/MM') : null
    // const nextDate = edge.next ? parseISO(edge.next.publishedAt, 'YYYY/MM') : null

    const prev = edge.previous ? `/blog/${edge.previous.slug.current}/` : null
    const next = edge.next ? `/blog/${edge.next.slug.current}/` : null

    const nextTitle = edge.next ? edge.next.title : null
    const prevTitle = edge.previous ? edge.previous.title : null

    reporter.info(`Creating blog post page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/blogPostTemplate.js'),
      context: { id, prev, next, nextTitle, prevTitle }
    })
  })
}

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          previous {
            title
            slug {
              current
            }
          }
          next {
            title
            slug {
              current
            }
          }
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/project/${slug}/`
    // Next and previous pages
    const prev = edge.previous
      ? `/project/${edge.previous.slug.current}/`
      : `/project/${projectEdges[projectEdges.length - 1].node.slug.current}`
    const next = edge.next
      ? `/project/${edge.next.slug.current}/`
      : `/project/${projectEdges[0].node.slug.current}`
    const nextTitle = edge.next ? edge.next.title : null
    const prevTitle = edge.previous ? edge.previous.title : null
    reporter.info(`Creating project page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/projectTemplate.js'),
      context: { id, next, prev, nextTitle, prevTitle }
    })
  })
}

async function createProductPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      products: allShopifyProduct {
        edges {
          node {
            variants {
              availableForSale
              compareAtPrice
              id
              price
              priceV2 {
                amount
                currencyCode
              }
              requiresShipping
              selectedOptions {
                name
                value
              }
              shopifyId
              sku
              title
              weightUnit
              weight
            }
            id
            title
            description
            descriptionHtml
            handle
            productType
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  fluid(maxWidth: 910) {
                    base64
                    aspectRatio
                    srcWebp
                    srcSetWebp
                    sizes
                    src
                    originalImg
                    tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const productEdges = (result.data.products || {}).edges || []

  const getProductsWithCategories = (category, products, thisProduct) => {
    return products.filter(
      (prod, i) => category === prod.node.productType && thisProduct.node.id !== prod.node.id
    )
  }

  productEdges.forEach(edge => {
    const id = edge.node.id
    const handle = edge.node.handle
    const path = `/store/${handle}/`
    reporter.info(`Creating project page: ${path}`)

    const similarProducts = shuffleArray(
      getProductsWithCategories(edge.node.productType, productEdges, edge)
    ).splice(0, 4)

    createPage({
      path,
      component: require.resolve('./src/templates/productTemplate.js'),
      context: { id, handle, similarProducts }
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
  await createProductPages(graphql, actions, reporter)
}

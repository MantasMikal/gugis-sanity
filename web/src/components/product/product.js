import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
// import { Link } from 'gatsby'
// import { buildImageObj } from '../../lib/helpers'
// import { imageUrlFor } from '../../lib/image-url'
import BlockContent from '../block-content'
import Container from '../container'
import Button from '../button/button'
import ProductShowcase from './productShowcase'
import BlockText from '../block-text'
import { paragraphLimited } from '../typography.module.css'
import styles from './product.module.css'

class Product extends React.Component {
  render () {
    const { title, quantity, images, id, price, _rawDescription, discount, categories, mainImage, publishedAt, slug } = this.props
    let allImages = [mainImage, ...images] // Concat all images
    const shortDescription = _rawDescription[0].children[0].text
    return (
      <article className={styles.root}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <ProductShowcase image={mainImage.asset.fluid} alt={mainImage.asset.alt} images={allImages} />
            </div>
            <aside className={styles.metaContent}>
              <h1 className={styles.title}>{title}</h1>
              <h3>Price: {price}</h3>
              <h3>Quantity: {quantity}</h3>
              {_rawDescription && (
                <div className={paragraphLimited}>
                  <BlockText blocks={_rawDescription} />
                </div>
              )}
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do YYYY')}
                </div>
              )}
              {categories && (
                <div className={[styles.categories, styles.limitWidth].join(' ')}>
                  <h3 className={styles.categoriesHeadline}>Categories</h3>
                  <ul>
                    {categories.map(category => (
                      <li key={category._id}>{category.title}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Button
                id={id}
                price={price}
                name={title}
                description={shortDescription}
                image={mainImage.asset.url}
                url={`http://gustore.netlify.com/store/${slug.current}`} > GRAB NOW </Button>
            </aside>
          </div>
        </Container>
      </article>
    )
  }
}

export default Product

// Aside - For future reference
/* <aside className={styles.metaContent}>
{publishedAt && (
  <div className={styles.publishedAt}>
    {differenceInDays(new Date(publishedAt), new Date()) > 3
      ? distanceInWords(new Date(publishedAt), new Date())
      : format(new Date(publishedAt), 'MMMM Do YYYY')}
  </div>
)}
{members && <RoleList items={members} title='Authors' />}
{categories && (
  <div className={styles.categories}>
    <h3 className={styles.categoriesHeadline}>Categories</h3>
    <ul>
      {categories.map(category => (
        <li key={category._id}>{category.title}</li>
      ))}
    </ul>
  </div>
)}
{relatedProjects && (
  <div className={styles.relatedProjects}>
    <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
    <ul>
      {relatedProjects.map(project => (
        <li key={`related_${project._id}`}>
          <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)}
</aside> */

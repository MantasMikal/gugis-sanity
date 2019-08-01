import React, { Component } from 'react'
import ImageWithModal from '../image/imageWithModal'
import ProductShowcaseGrid from './product-showcase-grid'
import styles from './product-showcase.module.css'

export default class ProductShowcase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentImage: 0
    }


  }

  // Gets index of image selected
  handleClick = (e) => {
    const newImageIdx = e.target.attributes.imgidx.value

    this.setState({
      currentImage: newImageIdx
    })
  }

  render () {
    const currentImage = this.props.images[this.state.currentImage].asset.fluid
    return (
      <div className={styles.showcaseWrapper}>
        <ImageWithModal hasBorder fluid={currentImage} alt={this.props.alt} />
        <ProductShowcaseGrid images={this.props.images} handleClick={this.handleClick} />
      </div>
    )
  }
}

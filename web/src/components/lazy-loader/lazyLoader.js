import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

export default class LazyLoader extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = debounce(this.handleScroll.bind(this), 10)
  }

  handleScroll () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    if(scrolled > this.props.threshold){
      this.props.loadMore()
      if(!this.props.hasMore) this.deattachListiner()
    }
  }

  attachListiner = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  deattachListiner = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidMount() {
    this.attachListiner()
  }

  componentWillUnmount() {
    this.deattachListiner()
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}


LazyLoader.propTypes = {
  threshold: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
}

LazyLoader.defaultProps = {
  threshold: 0.4,
  hasMore: true
}

import React from 'react'
import { FaEnvelope, FaFacebookMessenger, FaInstagram } from 'react-icons/fa'
import styles from './contact.module.css'
import SEO from '../components/seo'

const Contacts = props => {
  const { title, _rawBody } = props.contactInfo
  return (
    <div className={styles.wrapper}>
      <SEO title='About' />

      <div className={styles.grid}>
        <h1 className={styles.title}>Hi!</h1>
        <div className={styles.iconGrid}>
          <a
            className={styles.icon}
            href='mailto:hi@guste.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaEnvelope size='2em' />
          </a>
          <a
            className={styles.icon}
            href='https://www.messenger.com/t/guste.vasiliauskaite'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebookMessenger size='2em' />
          </a>
          <a
            className={styles.icon}
            href='https://www.instagram.com/guste.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size='2em' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contacts

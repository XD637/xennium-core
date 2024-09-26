'use client'
import React from 'react';
import styles from './QuoteComponent.module.css';


const QuoteComponent = ({ quote, author }) => (
  <div className={styles.quoteContainer}>
    <p className={styles.quoteText}>"{quote}"</p>
    <p className={styles.authorText}>- {author}</p>
  </div>
);

export default QuoteComponent;

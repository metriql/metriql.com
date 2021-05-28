import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import {ReactComponent as ReactLogo} from '../components/Group 34.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{background: 'linear-gradient(33deg, rgba(34,193,195,1) 14%, rgba(135,12,254,1) 100%)'}}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title} <a href="https://github.com/metriql/metriql" target="_blank"><img src="img/github.png" style={{height:'35px', marginTop:'16px', marginLeft:'10px', position: 'absolute', opacity: '.5'}}></img></a></h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <p className="hero__subtitle" style={{opacity: '0.6'}}>
          
        </p>

        <div className={styles.centerizedContent}>
          <ReactLogo src="/img/Group 34.svg" style={{height: '300px', marginLeft: '1.5%'}} />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        <div className="container">
        <div className="row">
        <div className={clsx('col col--4')} class="alert alert-warning">
          metriql is very much under active development. We absolutely would welcome any help from feature requests, discussion in issues, help with database connector testing to actual code changes!
          </div>
        <div className={clsx('col col--8')}>
        <h3>Why would I need metriql?</h3>
          <ul>
            <li>You don't want to create metrics in your BI tools and suffer from vendor-lock.</li>
            <li>You want to share your business metrics across your organization.</li>
            <li><a href="/faq">See FAQ for more information.</a></li>
          </ul>
          </div>
          
          </div>
          </div>
      </main>
    </Layout>
  );
}

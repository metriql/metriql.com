import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{background: 'linear-gradient(33deg, rgba(34,193,195,1) 14%, rgba(135,12,254,1) 100%)'}}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title} <a href="https://github.com/metriql/metriql" target="_blank"><img src="img/github.png" style={{height:'35px', top:'3px', position: 'relative', opacity: '.5'}}></img></a></h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <p className="hero__subtitle" style={{opacity: '0.6'}}>
          metriql tutorial - 5min ⏱️
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/tutorial/for-starters">
            for starters
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/tutorial/for-dbt-users" style={{ marginLeft: '10px' }}>
            for dbt users
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Headless BI`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

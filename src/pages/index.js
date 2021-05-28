import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import { ReactComponent as HomepageDiagram } from '../components/homepage-diagram.svg';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{ background: 'linear-gradient(33deg, rgba(34,193,195,1) 14%, rgba(135,12,254,1) 100%)' }}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title} <a href="https://github.com/metriql/metriql" target="_blank"><img src="img/github.png" style={{ height: '35px', marginTop: '16px', marginLeft: '10px', position: 'absolute', opacity: '.5' }}></img></a></h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <p className="hero__subtitle" style={{ opacity: '0.6' }}>

        </p>

        <div className={styles.centerizedContent}>
          {/* <HomepageDiagram src="/img/homepage-diagram.svg" style={{ height: '300px', marginLeft: '1.5%' }} /> */}
          <img src="img/homepage-diagram.svg" style={{ height: '300px', marginLeft: '1.5%' }}/>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        <div className="container" style={{ textAlign: 'left', maxWidth: '950px'}}>

          <div style={{ textAlign: 'center', 'backgroundColor': '#FFF3CD', color: 'black', border: 'none' }} className="admonition alerst alert--info"><div className="admonition-heading"><h6 style={{ 'marginBottom': '0' }}><span className="admonition-icon" >

            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" style={{ fill: 'black' }}><path fill-rule="evenodd" d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"></path></svg></span>
        metriql is very much under <a href="https://github.com/metriql/metriql">active development</a>. We'd certainly welcome any help, ideas or integration requests on Github!

         </h6></div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 >Why would you need metriql?</h3>
            <ul style={{ listStyle: 'inside', padding: '0' }}>
              <li>You want to be able to switch in between BI tools easily.</li>
              <li>You want to share company metrics across all your organization.</li>
              <li>You're a data analyst and you spend too much time building roll-up tables.</li>
              <li><a href="/faq">See FAQ for more information and comparison with alternatives.</a></li>
            </ul>
          </div>

        </div>
      </main>
    </Layout>
  );
}

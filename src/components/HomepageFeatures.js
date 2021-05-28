import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Integrate with your dbt projects',
    // Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Metriql integrates with <a target="_blank" href="https://getdbt.com">dbt</a> and maps dbt resources as datasets. It can also create automatic dbt roll-up models to save data teams time.
        <br />
          <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px', borderRadius: '3px 0 0 3px'}}
            to="/tutorial/for-dbt-users">
            Tutorial
          </Link>
          <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px',borderRadius: '0 3px 3px 0'}}
            to="/advanced/aggregates">
            Learn about Aggregates
          </Link>
      </>
    ),
  },
  {
    title: 'Define your metrics centrally',
    // Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Define metrics centrally in a single place for once and all. No more defining metrics for each data tool one by one.
        <Link
            className="button button--secondary button--sm"
            style={{display: 'block',marginTop: '10px'}}
            to="/tutorial/for-starters">
            Tutorial for starters
          </Link>
      </>
    ),
  },
  {
    title: 'Consume your metrics reliably',
    // Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Synchronize your metrics to your BI tools, use them in Python or build embedded analytics applications via the REST API. 
        <br />
        <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px', borderRadius: '3px 0 0 3px'}}
            to="/integrations/jdbc-driver">
            JDBC
          </Link>
          <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px', borderRadius: '0 0 0 0'}}
            to="/integrations/rest-api">
            REST
          </Link>
          <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px', borderRadius: '0 3px 3px 0'}}
            to="/integrations/bi-tools">
            BI Tools
          </Link>
          <Link
            className="button button--secondary button--sm"
            style={{marginTop: '10px', borderRadius: '0 3px 3px 0'}}
            to="/integrations/embedded">
            Embedded
          </Link>
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} alt={title} /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

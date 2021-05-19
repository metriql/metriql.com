import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Integrate with your dbt projects',
    // Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        metriql integrates to dbt, an ELT tool from Fishtown Analytics. It has support for data lineage, tests, and documentation. metriql can create dbt roll-up models automaticly in order to save your time.
      </>
    ),
  },
  {
    title: 'Define metrics for once and all',
    // Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        You can interact with the metrics using RESTFul API, or just embed them inside your SQL. While metriql is new, we work hard to integrate it to third party tools, see the progress here.
      </>
    ),
  },
  {
    title: 'Consume data in a reliable way',
    // Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Use metriql as the serving layer of your data. Connect it from your BI tool, use metriql API in SQL queries via JDBC or build embedded analytical applications using the REST API. 
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

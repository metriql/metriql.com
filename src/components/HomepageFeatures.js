import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Integrate with your dbt projects',
    // Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        metriql integrates to dbt, an ELT tool from Fishtown Analytics. It has support for data lineage, tests, and documentation. dbt is the transformation layer and metriql is the serving layer.
      </>
    ),
  },
  {
    title: 'Create roll-up tables automatically',
    // Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        You can automatically create dbt models that can be used as roll-up tables for your raw data. No more dealing with hundreds of roll-up tables written as SQL.
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

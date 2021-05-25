import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Define your metrics centrally',
    // Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Metriql lets you define metrics centrally in a single place for once and all. No more defining metrics for each data tool one by one. You can interact with the metrics via RESTful API or by embedding them in your SQL queries.
      </>
    ),
  },
  {
    title: 'Integrate with your dbt projects',
    // Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Metriql integrates with dbt, an ELT tool from Fishtown Analytics and creates datasets from your dbt models. It also creates automatic dbt roll-up models to save data teams time and money.
      </>
    ),
  },
  {
    title: 'Sync your metrics globally',
    // Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Metriql serves as the central metric definition layer of your data. You can connect it to any other data tools you’re using via JDBC or you can build embedded analytics applications via REST API. 
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

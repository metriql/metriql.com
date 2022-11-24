const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
var SITE_URL;
if (!process.env.CONTEXT || process.env.CONTEXT == 'production') {
  SITE_URL = 'https://metriql.com';
} else {
  SITE_URL = process.env.DEPLOY_URL;
}

var ALGOLIA_API_KEY;
if (!process.env.ALGOLIA_API_KEY) {
  ALGOLIA_API_KEY = 'ca56d2ec2d55ebbf3e47dbb455ab5d08';
} else {
  ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
}

var GIT_BRANCH;
if (!process.env.CONTEXT || process.env.CONTEXT == 'production') {
  GIT_BRANCH = 'main';
} else {
  GIT_BRANCH = process.env.HEAD;
}

var ALGOLIA_INDEX_NAME;
if (!process.env.ALGOLIA_INDEX_NAME) {
  ALGOLIA_INDEX_NAME = 'metriql';
} else {
  ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;
}

var PRERELEASE = (process.env.PRERELEASE || false);

var WARNING_BANNER;
if (!PRERELEASE) {
  WARNING_BANNER = {};
} else {
  WARNING_BANNER = {
    id: 'prerelease', // Any value that will identify this message.
    content:
      'CAUTION: Prerelease! This documentation reflects the next minor version of Metriql. <a href="https://metriql.com">View current docs</a>.',
    backgroundColor: '#ffa376', // Defaults to `#fff`.
    textColor: '#033744', // Defaults to `#000`.
  }
}

module.exports = {
  title: 'Metriql Docs',
  tagline: 'Headless BI for all your company data',
  url: SITE_URL,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'metriql', 
  projectName: 'metriql', 
  themeConfig: {
    sidebarCollapsible: true,
    image: '/img/logo/social.png',
    announcementBar: WARNING_BANNER,

    algolia: {
      apiKey: ALGOLIA_API_KEY,
      //debug: true,
      indexName: ALGOLIA_INDEX_NAME,
      algoliaOptions: {
      },
    },

  
    prism: {
      defaultLanguage: 'yml',
      theme: (() => {
        var theme = require('prism-react-renderer/themes/nightOwl');
        // Add additional rule to nightowl theme in order to change
        // the color of YAML keys (to be different than values).
        // There weren't many Prism themes that differentiated
        // YAML keys and values. See link:
        // https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes
        theme.styles.push({
          types: ["atrule"],
          style: {
            // color chosen from the nightowl theme palette
            // https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/nightOwl.js#L83
            color: "rgb(255, 203, 139)"
          }
        });
        return theme
      })(),
      additionalLanguages: ['bash'],
    },
    navbar: {
      logo: {
        src: '/img/logo.svg',
        alt: 'ΣQL',
      },
      items: [
        {
          to: '/introduction/intro',
          label: 'Docs',
          position: 'left',
          activeBasePath: 'introduction',
        },
        {
          to: '/reference/dataset',
          label: 'Reference',
          position: 'left',
          activeBasePath: 'reference'
        },
        {
          to: '/metriql-cli/cli-overview',
          label: 'Metriql CLI',
          position: 'left',
          activeBasePath: 'metriql-cli'
        },
        {
          to: '/query/introduction',
          label: 'Querying',
          position: 'left',
          activeBasePath: 'query/introduction'
        },
        {
          label: 'Integrations',
          position: 'left',
          items: [
            {
              to: '/integrations/rest-api',
              label: 'REST API',
              activeBasePath: 'integrations/rest-api'
            },
            {
              to: '/integrations/bi-tools/index',
              label: 'BI Tools / Data Applications',
              activeBasePath: 'integrations/bi-tools/index',
              items: [
                {
                  to: '/integrations/bi-tools/google-data-studio',
                  label: 'Data Studio',
                  activeBasePath: 'integrations/bi-tools/google-data-studio'
                }
              ]
            },
            {
              to: '/integrations/embedded',
              label: 'Embedded analytics',
              activeBasePath: 'integrations/embedded'
            },
            {
              to: '/integrations/build',
              label: 'Build +',
              activeBasePath: 'integrations/build'
            },
          ],
        },
    
        {
          label: 'Learn',
          position: 'right',
          items: [
            {
              label: 'Getting Started Tutorial',
              to: '/tutorial/for-starters',
            },
            {
              to: '/faq',
              label: 'FAQs',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCm8bxKrtZyggJ8W9TVaNoPw',
            },
            {
              to: '/blog',
              label: 'Blog',
            }
          ],
        },
        {
          label: 'Community',
          position: 'right',
          items: [
            {
              label: 'Metriql Slack',
              href: 'https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/metriql/metriql',
            },
          ]
        },
      ],
    },
    footer: {
      // logo: {
      //   alt: 'Rakam Logo',
      //   src: 'img/oss_logo.png',
      //   href: 'https://rakam.io',
      // },
      copyright: `By <a href="https://liveramp.com" target="_blank">LiveRamp</a><br><a href="/privacypolicy">Privacy Policy</a> · <a href="/termsofuse">Terms of Usage</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl: 'https://github.com/metriql/metriql.com/edit/' + GIT_BRANCH + '/',
          showLastUpdateTime: false,
          //showLastUpdateAuthor: false,
        },
        blog: {
          blogTitle: 'Metriql Blog',
          blogDescription: 'Blog posts about Metriql',
          blogSidebarCount: 0
        },
      },
    ]
  ],
  plugins: [
    path.resolve('plugins/svg'),
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo/logo-72.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#1890ff',
          },
        ],
      },
    ],
  ],
  scripts: [
    'https://code.jquery.com/jquery-3.4.1.min.js',
  ],
  stylesheets: [
    '/css/search.css',
    '/css/api.css',
    '/css/custom.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap'
  ]
};

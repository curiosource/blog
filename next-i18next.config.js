const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ja-JP',
    locales: ['ja-JP','en-US' ],
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
};

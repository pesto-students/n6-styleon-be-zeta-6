const algoliaService = require('algoliasearch')
const algoliaKeys = require('../keys/algolia')

const connection_algolia = algoliaService(algoliaKeys.algolia.APP_ID,  algoliaKeys.algolia.ADMIN_KEY)

module.exports = {connection_algolia}
module.exports = {
  env: 'production',
  port: 6868,

  // Update this with the value you get back from the
  // /auth/callback route:
  cobotToken: 'cobot-token-here',

  cobotSubdomain: 'your-subdomain',
  cobotClientId: 'cobot-client-id',
  cobotClientSecret: 'cobot-client-secret',

  // The interval to refresh the list of events in milliseconds.
  // Defaults to 10 minutes
  refreshInterval: 10 * 60 * 1000,
}

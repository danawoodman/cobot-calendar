module.exports = {
  env: 'development',
  port: 6868,

  // Number of months to show in calendar.
  numMonths: 2,

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

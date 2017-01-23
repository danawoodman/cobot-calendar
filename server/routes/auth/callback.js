const config = require('config')

const COBOT_CLIENT_ID = config.get('cobotClientId')
const COBOT_CLIENT_SECRET = config.get('cobotClientSecret')

module.exports = function authCallback(req, res) {
  const code = req.query.code

  fetch(`https://www.cobot.me/oauth/access_token?client_id=${COBOT_CLIENT_ID}&client_secret=${COBOT_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
    method: 'POST',
    //headers: {
      //'Content-Type': 'application/json'
    //},
    //body: JSON.stringify({
      //code,
      //client_id: COBOT_CLIENT_ID,
      //client_secret: COBOT_CLIENT_SECRET,
      //grant_type: 'authorization_code',
    //})
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        res.render('auth/failure', {
          resp,
          COBOT_CLIENT_ID,
          COBOT_CLIENT_SECRET,
          code,
        })
        return
      }
      res.render('auth/success', { resp })
    })
    .catch((err) => console.error(err))
}

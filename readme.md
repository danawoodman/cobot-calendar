# Cobot Calendar

> Events calendar for Cobot events

This is a simple events calendar of all upcoming cobot events for the current and next month to display on a display at our makerspace.


# Setup

0. **Setup a Cobot application:** Create a [new Cobot application](https://www.cobot.me/oauth2_clients) with the scope `read` and set the "Redirect URL" to <http://localhost:6868/auth/callback>, like:

![](https://cl.ly/isQd/Screen%20Shot%202017-01-23%20at%201.47.17%20PM.png)

1. **Setup project dependencies:** Checkout project and then run:

```bash
# Install NVM, then:
nvm install
nvm use

# Install deps
npm install
```

2. **Create a config file for your Cobot install:** Copy over the `config/default.js` file to `config/development.js` and then modify the values to suit your Cobot install.

3. **Get an API Token:** Run the application with `npm run watch`, open up <http:localhost:6868>, then click the "Login to Cobot" link. Once you're logged in and grant access, you should see a response with an "authorization_token". Copy that value into `config/development.js` and replace the `cobotToken` value with it.

4. **Run application**: Now restart your application and open up <http://localhost:6868> again and you should see a list of your Cobot events. Check the Node and DevTools console for any errors. Now just load this webpage on a monitor at your space and open it in full screen mode. It will automatically refresh at an interval you set (default 10 minutes).

5. **Enjoy!**


# Credits

Created by [Dana Woodman](http://danawoodman.com) for [Chimera Arts & Maker Space](http://chimeraarts.org).


# Licence

Copyright &copy; Dana Woodman 2017. Released under an MIT licence.

/* eslint-env node */

const { cert, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const axios = require('axios').default;

/**
 * FirebaseTokenManager
 * Only construct this if a valid service account key exists.
 */
class FirebaseTokenManager {
  constructor(serviceAccountKey, firebaseApiKey) {
    this.firebaseApiKey = firebaseApiKey;

    const firebaseApp = initializeApp({
      credential: cert(serviceAccountKey),
    });

    this.firebaseAuth = getAuth(firebaseApp);
    this.idToken = null;
    this.idTokenExp = null;

    // Immediately fetch the initial token
    this.refreshTimerId = setTimeout(this.refreshToken.bind(this), 0);
  }

  async verifyIdToken(token) {
    return this.firebaseAuth.verifyIdToken(token);
  }

  getToken() {
    return this.idToken;
  }

  refreshToken() {
    return this.getCustomToken()
      .then(customToken => this.getIdTokenFromCustomToken(customToken))
      .then(idToken => {
        if (!idToken) {
          throw new Error('Failed to get ID token');
        }

        const payload = JSON.parse(
          Buffer.from(idToken.split('.')[1], 'base64url').toString('utf8')
        );

        this.idToken = idToken;
        this.idTokenExp = payload.exp;

        // Refresh 5 minutes before expiry
        const refreshAt = payload.exp * 1000 - Date.now() - 5 * 60 * 1000;
        if (refreshAt > 0) {
          this.refreshTimerId = setTimeout(this.refreshToken.bind(this), refreshAt);
        }
      })
      .catch(err => {
        console.error('[Firebase] Token refresh failed, retrying in 1 min', err);
        this.refreshTimerId = setTimeout(this.refreshToken.bind(this), 60 * 1000);
      });
  }

  getCustomToken() {
    return this.firebaseAuth.createCustomToken('simulator', {
      sim_backend: true,
    });
  }

  getIdTokenFromCustomToken(customToken) {
    const urlPrefix = process.env.FIREBASE_AUTH_EMULATOR_HOST
      ? `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/`
      : 'https://';

    const url =
      `${urlPrefix}identitytoolkit.googleapis.com/v1/accounts:` +
      `signInWithCustomToken?key=${this.firebaseApiKey}`;

    return axios
      .post(url, {
        token: customToken,
        returnSecureToken: true,
      })
      .then(res => res.data.idToken)
      .catch(err => {
        console.error('[Firebase] Failed to exchange custom token', err?.response?.data);
        return null;
      });
  }
}

/**
 * Factory function
 * This is the KEY change that prevents crashes.
 */
function createFirebaseTokenManager(config) {
  if (!config?.firebase?.serviceAccountKey) {
    console.warn('[WARN] FirebaseTokenManager disabled (no service account key)');
    return null;
  }

  return new FirebaseTokenManager(
    config.firebase.serviceAccountKey,
    config.firebase.apiKey
  );
}

module.exports = {
  FirebaseTokenManager,        // exported for completeness
  createFirebaseTokenManager, // THIS is what you should use
};


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAWMt0oNJMM_uuuyAJnRCZhzVYIqX3VAWo",
    authDomain: "acornspa-6af0b.firebaseapp.com",
    databaseURL: "https://acornspa-6af0b.firebaseio.com",
    projectId: "acornspa-6af0b",
    storageBucket: "acornspa-6af0b.appspot.com",
    messagingSenderId: "392289962600",
    appId: "1:392289962600:web:8cb363fb8684a6f74189dd"
  },
  baseApiUrl: 'http://localhost:4201/api/',
  botAccountsUrl: 'accounts/',
  readyAccountsUrl: 'readyAccounts/',
  freshAccountsUrl: 'freshAccounts/',
  configsUrl: 'configs/',
  logsUrl: 'logs/',
  loginUrl: '/login',
  authenticationUrl: 'users/authenticate',
  registrationUrl: 'users/register',
  usersUrl: 'users/',
  // Firebase collections 
  botsAccountsCollection: 'BotAccounts',
  botsCollection: 'Bots',
  configsCollection: 'Configs',
  freshAccountsCollection: 'FreshAccounts',
  logsCollection: 'Logs',
  readyAccountsCollection: 'ReadyAccounts',
};
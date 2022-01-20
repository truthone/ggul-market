import { TOKEN } from './constants.js'
import { getFeed } from './api.js';

// home
if(TOKEN){
  getFeed()
}
else{
  location.href = './2.login.html'
}
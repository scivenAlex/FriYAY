var request = require('request');

//This request is a simple one using the pokeapi, which doesn't require verification
var url = 'http://pokeapi.co/api/v2/pokemon/ditto'

request.get(url, async function(error, response, body){
  //console.log(body);
});

//To get specific information out of it, we need to trace down the layers
request.get(url, async function(error, response, body){
    var json = JSON.parse(body);
    console.log(json.abilities[1].ability); //This will list the first ability in ditto's ability list
});

//This request is more complicated, using a secret and a token to confirm access priviledges
var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, async function(error, response, body) {
    console.log('access token = ');
    console.log(body.access_token);
});

//Instead of making you get your own token, here's one that will expire at 4:30pm. Remind Alex and they'll upload a new one!
//Alternatively, you can get your own if you feel up to it, all you need is a spotify account.
var token = 'Bearer BQB0zKFphsFsmakkGrBzLNoA0FmjAHFaCg_uf2e6v2hwCHJH8KOifzAVBJHs9TYFLX4puVT0xh5-nIuGyiOEkBJqedIPPRTX-wht0DrE-NOhZ13cU3ic'

var spotifyRequest = {
    url: 'https://api.spotify.com/v1/artists/4QKx7KohkWZAOkO4sI3GRx',
    headers: {
      'Authorization': token
    }
  };
  
  request.get(spotifyRequest, async function(error, response, body){
    console.log('body =');
    console.log(body);
  });
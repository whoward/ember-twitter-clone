import Mirage from 'ember-cli-mirage';
import moment from 'moment';

export default function() {
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  let findUserByHandle = function(schema, handle) {
    return schema.user.where({handle: handle})[0];
  };
  
  let findCurrentUser = function(schema, request) {
    let auth = request.requestHeaders['Authorization'];
    
    let match = /^Bearer (\d+)$/.exec(auth);
    
    if(match) {
      return schema.user.find(match[1]);
    } else {
      return null;
    }
  };
  
  let parseWWWEncodedParams = function(body) {
    let object = {};
    body.split("&").forEach(function(x) {
      let [key, val] = x.split("=");
      object[key] = val;
    });
    return object;
  };
  
  let invalidClient = function() {
    return new Mirage.Response(400, {}, {error: 'invalid_client'});
  }
  
  this.post('/token', function(schema, request) {
    let params = parseWWWEncodedParams(request.requestBody);
    let user = findUserByHandle(schema, params.username);
    
    if(user && params.password === 'secret') {
      return {
        access_token: user.id,
        token_type: 'token',
        expires_in: null,
        refresh_token: user.id
      };
    } else {
      return invalidClient();
    }
  });

  this.get('/tweets', function(schema, request) {
    if(request.queryParams.user) {
      let user = findUserByHandle(schema, request.queryParams.user);
      return schema.tweet.where({authorId: user.id});
    } else {
      return schema.tweet.all();
    }
  });
  
  this.post('/tweets', function(schema, request) {
    let params = JSON.parse(request.requestBody).data.attributes;
    let currentUser = findCurrentUser(schema, request);
    
    if(!currentUser) {
      return invalidClient();
    }
    
    let id = Math.max(...schema.tweet.all().map(function(x) { return x.id })) + 1;
    
    let record = schema.tweet.create({
      id: id,
      text: params.text,
      created_at: moment(),
      authorId: currentUser.id,
      retweets: 0,
      likes: 0
    });
    
    return record;
  });
  
  this.get('/users/:handle', function(schema, request) {
    return findUserByHandle(schema, request.params.handle);
  });
  
  this.get('/users/current', function(schema, request) {
    let currentUser = findCurrentUser(schema, request);
    
    if(currentUser) {
      return currentUser;
    } else {
      return invalidClient();
    }
  });
}

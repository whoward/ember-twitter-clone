import Mirage from 'ember-cli-mirage';

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
      return new Mirage.Response(400, {}, {error: 'invalid_client'});
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
  
  this.get('/users/:handle', function(schema, request) {
    return findUserByHandle(schema, request.params.handle);
  });
  
  this.get('/users/current', function(schema, request) {
    let currentUser = findCurrentUser(schema, request);
    
    if(currentUser) {
      return currentUser; 
    } else {
      return new Mirage.Response(400, {}, {error: 'invalid_client'});
    }
  });
}

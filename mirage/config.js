
export default function() {
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  let findUserByHandle = function(schema, handle) {
    return schema.user.where({handle: handle})[0];
  };

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
}

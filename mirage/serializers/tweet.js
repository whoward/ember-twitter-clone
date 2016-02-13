import ApplicationSerializer from './application'

let serialize = ApplicationSerializer.prototype.serialize;

export default ApplicationSerializer.extend({
  serialize(object, request) {
    let json = serialize.apply(this, arguments);
    
    json.included = [];
    
    for(let i = 0; i < json.data.length; i++) {
      let record = object[i];
      let serialized = json.data[i];
      
      let author = record._schema.user.find(record.authorId);
      
      json.included.push(serialize.apply(this, [author]).data);
      
      serialized.relationships = {
        author: {data: {type: 'users', id: record.authorId}}
      };
      
      if(record.sharedById) {
        let sharedBy = record._schema.user.find(record.sharedById);
        
        serialized.relationships['shared-by'] = {
          data: {type: 'users', id: record.sharedById}
        };
        
        json.included.push(serialize.apply(this, [sharedBy]).data);
      }
    }
    
    return json;
  }
});
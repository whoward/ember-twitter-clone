import ApplicationSerializer from './application'

let serialize = ApplicationSerializer.prototype.serialize;

export default ApplicationSerializer.extend({
  serialize(object, request) {
    let json = serialize.apply(this, arguments);
    
    for(let i = 0; i < json.data.length; i++) {
      let record = object[i];
      let serialized = json.data[i];
      
      let author = record._schema.user.find(record.authorId);
      let serializedAuthor = serialize.apply(this, [author]).data;
      
      serialized.relationships = {
        author: {data: serializedAuthor}
      };
      
      if(record.sharedById) {
        let sharedBy = record._schema.user.find(record.sharedById);
        
        serialized.relationships['shared-by'] = {
          data: serialize.apply(this, [sharedBy]).data
        }
      }
    }
    
    return json;
  }
})
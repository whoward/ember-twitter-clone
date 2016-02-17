import ApplicationSerializer from './application';
import Collection from 'ember-cli-mirage/orm/collection';

let serialize = ApplicationSerializer.prototype.serialize;

export default ApplicationSerializer.extend({
  
  serializeRecord(serialized, record, included) {
    let author = record._schema.user.find(record.authorId);
      
    included.push(serialize.apply(this, [author]).data);
    
    serialized.relationships = {
      author: {data: {type: 'users', id: record.authorId}}
    };
    
    if(record.sharedById) {
      let sharedBy = record._schema.user.find(record.sharedById);
      
      serialized.relationships['shared-by'] = {
        data: {type: 'users', id: record.sharedById}
      };
      
      included.push(serialize.apply(this, [sharedBy]).data);
    }
  },
  
  serializeArray(object, json) {
    for(let i = 0; i < json.data.length; i++) {
      let record = object[i];
      let serialized = json.data[i];
      
      this.serializeRecord(serialized, record, json.included);
    }
  },
  
  serialize(object, request) {
    let json = serialize.apply(this, arguments);
    
    json.included = [];
    
    if(object instanceof Collection) {
      this.serializeArray(object, json);
    } else {
      this.serializeRecord(json.data, object, json.included);
    }
    
    return json;
  }
});
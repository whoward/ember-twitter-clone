import Ember from 'ember';
import moment from 'moment';

let tweets = [
  {
    id: 1,
    text: 'Just because the Wall Street types trade their suit for a hoodie, don’t expect the underlying motivations to be any different.',
    created_at: moment().subtract(3, 'hours'),
    author: {
      id: 1,
      name: 'DHH',
      handle: '@dhh',
      avatar_url: 'https://pbs.twimg.com/profile_images/2556368541/alng5gtlmjhrdlr3qxqv_bigger.jpeg'
    },
    retweets: 34,
    likes: 67
  },
  {
    id: 2,
    text: 'Learning to write tests for iOS Accessibility using Swift. It’s inhuman not to support and test accessibility completely.',
    created_at: moment().subtract(1, 'month'),
    author: {
      id: 2,
      name: 'Sunil Karkera',
      handle: '@gluecode',
      avatar_url: 'https://pbs.twimg.com/profile_images/677233787709722624/mjxu4PAQ_bigger.jpg'
    },
    shared_by: {
      id: 3,
      name: 'John Griffiths',
      handle: '@johnantoni',
      avatar_url: 'https://pbs.twimg.com/profile_images/625722030130774016/UNiTmIkc_bigger.png'
    },
    retweets: 1,
    likes: 1
  },
  {
    id: 3,
    text: "'Tell me, do you sleep..? You won't..' #BatmanvSuperman #Batman #Baby #DCComics #Cosplay #BabyBatman #thedarkknight",
    created_at: moment().subtract(15, 'hours'),
    author: {
      id: 4,
      name: 'Coplano Cosplay',
      handle: '@CosplayTexas',
      avatar_url: 'https://pbs.twimg.com/profile_images/694962221680447490/bzzaEHEf_bigger.jpg'
    },
    shared_by: {
      id: 5,
      name: 'Joe Vargas',
      handle: '@AngryJoeShow',
      avatar_url: 'https://pbs.twimg.com/profile_images/598586076169572352/ldaELcUr_bigger.png'
    },
    image_url: 'https://pbs.twimg.com/media/Ca9-DFFUUAA7eHd.jpg',
    retweets: 473,
    likes: 802
  }
]

export default Ember.Route.extend({
  model() {
    return tweets;
  }
});

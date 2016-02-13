import moment from 'moment';

export default [
{
    id: 1,
    text: 'Just because the Wall Street types trade their suit for a hoodie, don’t expect the underlying motivations to be any different.',
    created_at: moment().subtract(3, 'hours'),
    authorId: 1,
    retweets: 34,
    likes: 67
  },
  {
    id: 2,
    text: 'Learning to write tests for iOS Accessibility using Swift. It’s inhuman not to support and test accessibility completely.',
    created_at: moment().subtract(1, 'month'),
    authorId: 2,
    sharedById: 3,
    retweets: 1,
    likes: 1
  },
  {
    id: 3,
    text: "'Tell me, do you sleep..? You won't..' #BatmanvSuperman #Batman #Baby #DCComics #Cosplay #BabyBatman #thedarkknight",
    created_at: moment().subtract(15, 'hours'),
    authorId: 4,
    sharedById: 5,
    image_url: 'https://pbs.twimg.com/media/Ca9-DFFUUAA7eHd.jpg',
    retweets: 473,
    likes: 802
  }
];
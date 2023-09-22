import theFirstJourney from './book/the-first-journey'
import dreamsAreCalling from './book/dreams-are-calling'
import theSnowyDay from './book/the-snowy-day'
import pebble from './book/pebble'
import lookAndSeeABC from './book/look-and-see-abc'
import hickoryDickoryDock from './book/hickory-dickory-dock'

export const bookMap = {
  'dreams-are-calling': dreamsAreCalling,
  'the-first-journey': theFirstJourney,
  'the-snowy-day': theSnowyDay,
  pebble,
  'look-and-see-abc': lookAndSeeABC,
  'hickory-dickory-dock': hickoryDickoryDock
}

export default [
  {
    id: 'the-first-journey',
    title: 'The First Journey',
    cover: 'assets/covers/the-first-journey.jpg',
    author: 'Phùng Nguyên Quang',
    illustrator: 'Huynh Kim Liên'
  }, {
    id: 'dreams-are-calling',
    title: 'Dreams Are Calling',
    cover: 'assets/covers/dreams-are-calling.jpg',
    author: 'Trang Hoang',
    illustrator: 'Pham Quang Phuc'
  }, {
    id: 'the-snowy-day',
    title: 'The Snowy Day',
    cover: 'assets/covers/the-snowy-day.jpg',
    author: 'Ezra Jack Keats'
  }, {
    id: 'pebble',
    title: 'Pebble',
    cover: 'assets/covers/pebble.jpg',
    author: 'Nicole Snitselaar',
    illustrator: 'Coralie Saudo'
  }, {
    id: 'look-and-see-abc',
    title: 'Look And See ABC',
    cover: 'assets/covers/look-and-see-abc.jpg',
    author: 'Amber Lily',
    illustrator: 'Zhanna Ovocheva'
  }, {
    id: 'hickory-dickory-dock',
    title: 'Hickory Dickory Dock',
    cover: 'assets/covers/hickory-dickory-dock.jpg',
    author: 'Jemima Summer',
    illustrator: 'Emma Allen'
  }
]

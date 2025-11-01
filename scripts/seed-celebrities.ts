import mongoose from 'mongoose';
import Celebrity from '../src/models/Celebrity';

const sampleCelebrities = [
  // Actors & Actresses
  {
    name: 'Emma Watson',
    slug: 'emma-watson',
    profession: 'Actress',
    bio: 'British actress and activist, known for her role as Hermione Granger in the Harry Potter series.',
    imageUrl: '/celebrities/emma-watson.jpg',
    featured: true,
    bronze: 100,
    silver: 250,
    gold: 500,
    platinum: 1000,
    event: 300
  },
  {
    name: 'Dwayne Johnson',
    slug: 'dwayne-johnson',
    profession: 'Actor',
    bio: 'American actor, producer, and former professional wrestler known as The Rock.',
    imageUrl: '/celebrities/dwayne-johnson.jpg',
    featured: true,
    bronze: 250,
    silver: 500,
    gold: 1000,
    platinum: 2000,
    event: 600
  },
  {
    name: 'Zendaya',
    slug: 'zendaya',
    profession: 'Actress',
    bio: 'American actress and singer known for Euphoria, Spider-Man, and The Greatest Showman.',
    imageUrl: '/celebrities/zendaya.jpg',
    featured: true,
    bronze: 180,
    silver: 350,
    gold: 700,
    platinum: 1400,
    event: 450
  },
  {
    name: 'Chris Hemsworth',
    slug: 'chris-hemsworth',
    profession: 'Actor',
    bio: 'Australian actor best known for playing Thor in the Marvel Cinematic Universe.',
    imageUrl: '/celebrities/chris-hemsworth.jpg',
    featured: false,
    bronze: 200,
    silver: 400,
    gold: 800,
    platinum: 1600,
    event: 500
  },
  {
    name: 'Margot Robbie',
    slug: 'margot-robbie',
    profession: 'Actress',
    bio: 'Australian actress and producer known for Barbie, The Wolf of Wall Street, and Birds of Prey.',
    imageUrl: '/celebrities/margot-robbie.jpg',
    featured: false,
    bronze: 220,
    silver: 450,
    gold: 900,
    platinum: 1800,
    event: 550
  },
  {
    name: 'Tom Holland',
    slug: 'tom-holland',
    profession: 'Actor',
    bio: 'British actor known for playing Spider-Man in the Marvel Cinematic Universe.',
    imageUrl: '/celebrities/tom-holland.jpg',
    featured: false,
    bronze: 190,
    silver: 380,
    gold: 750,
    platinum: 1500,
    event: 475
  },

  // Musicians
  {
    name: 'Taylor Swift',
    slug: 'taylor-swift',
    profession: 'Musician',
    bio: 'American singer-songwriter known for narrative songs about her personal life.',
    imageUrl: '/celebrities/taylor-swift.jpg',
    featured: true,
    bronze: 300,
    silver: 600,
    gold: 1200,
    platinum: 2400,
    event: 750
  },
  {
    name: 'John Legend',
    slug: 'john-legend',
    profession: 'Musician',
    bio: 'American singer, songwriter, pianist, and record producer.',
    imageUrl: '/celebrities/john-legend.jpg',
    featured: true,
    bronze: 180,
    silver: 350,
    gold: 700,
    platinum: 1400,
    event: 450
  },
  {
    name: 'Beyoncé',
    slug: 'beyonce',
    profession: 'Musician',
    bio: 'American singer, songwriter, and businesswoman. Queen of pop and R&B.',
    imageUrl: '/celebrities/beyonce.jpg',
    featured: true,
    bronze: 350,
    silver: 700,
    gold: 1400,
    platinum: 2800,
    event: 850
  },
  {
    name: 'Ed Sheeran',
    slug: 'ed-sheeran',
    profession: 'Musician',
    bio: 'English singer-songwriter known for hits like Shape of You and Perfect.',
    imageUrl: '/celebrities/ed-sheeran.jpg',
    featured: false,
    bronze: 200,
    silver: 400,
    gold: 800,
    platinum: 1600,
    event: 500
  },
  {
    name: 'Ariana Grande',
    slug: 'ariana-grande',
    profession: 'Musician',
    bio: 'American singer, songwriter, and actress with a four-octave vocal range.',
    imageUrl: '/celebrities/ariana-grande.jpg',
    featured: false,
    bronze: 250,
    silver: 500,
    gold: 1000,
    platinum: 2000,
    event: 600
  },
  {
    name: 'Bruno Mars',
    slug: 'bruno-mars',
    profession: 'Musician',
    bio: 'American singer, songwriter, and record producer known for his retro showmanship.',
    imageUrl: '/celebrities/bruno-mars.jpg',
    featured: false,
    bronze: 220,
    silver: 440,
    gold: 880,
    platinum: 1760,
    event: 540
  },
  {
    name: 'Lil Wayne',
    slug: 'lil-wayne',
    profession: 'Musician',
    bio: 'American rapper and hip-hop legend, five-time Grammy winner and Young Money founder.',
    imageUrl: '/celebrities/lil-wayne.jpg',
    featured: true,
    bronze: 280,
    silver: 560,
    gold: 1120,
    platinum: 2240,
    event: 700
  },
  {
    name: 'Rick Ross',
    slug: 'rick-ross',
    profession: 'Musician',
    bio: 'American rapper, entrepreneur, and founder of Maybach Music Group.',
    imageUrl: '/celebrities/rick-ross.jpg',
    featured: true,
    bronze: 260,
    silver: 520,
    gold: 1040,
    platinum: 2080,
    event: 650
  },
  {
    name: 'Drake',
    slug: 'drake',
    profession: 'Musician',
    bio: 'Canadian rapper, singer, and global music icon with multiple chart-topping hits.',
    imageUrl: '/celebrities/drake.jpg',
    featured: true,
    bronze: 350,
    silver: 700,
    gold: 1400,
    platinum: 2800,
    event: 850
  },
  {
    name: 'Cardi B',
    slug: 'cardi-b',
    profession: 'Musician',
    bio: 'American rapper and social media sensation known for her bold personality and hit songs.',
    imageUrl: '/celebrities/cardi-b.jpg',
    featured: true,
    bronze: 270,
    silver: 540,
    gold: 1080,
    platinum: 2160,
    event: 680
  },
  {
    name: 'Post Malone',
    slug: 'post-malone',
    profession: 'Musician',
    bio: 'American rapper, singer, and songwriter known for blending hip-hop with melodic pop.',
    imageUrl: '/celebrities/post-malone.jpg',
    featured: false,
    bronze: 240,
    silver: 480,
    gold: 960,
    platinum: 1920,
    event: 600
  },
  {
    name: 'The Weeknd',
    slug: 'the-weeknd',
    profession: 'Musician',
    bio: 'Canadian singer and producer known for his distinctive voice and R&B hits.',
    imageUrl: '/celebrities/the-weeknd.jpg',
    featured: true,
    bronze: 300,
    silver: 600,
    gold: 1200,
    platinum: 2400,
    event: 750
  },
  {
    name: 'Kendrick Lamar',
    slug: 'kendrick-lamar',
    profession: 'Musician',
    bio: 'American rapper and Pulitzer Prize winner, considered one of the greatest lyricists.',
    imageUrl: '/celebrities/kendrick-lamar.jpg',
    featured: true,
    bronze: 320,
    silver: 640,
    gold: 1280,
    platinum: 2560,
    event: 800
  },
  {
    name: 'J. Cole',
    slug: 'j-cole',
    profession: 'Musician',
    bio: 'American rapper, singer, and record producer known for conscious rap and storytelling.',
    imageUrl: '/celebrities/j-cole.jpg',
    featured: false,
    bronze: 250,
    silver: 500,
    gold: 1000,
    platinum: 2000,
    event: 625
  },
  {
    name: 'Nicki Minaj',
    slug: 'nicki-minaj',
    profession: 'Musician',
    bio: 'Trinidadian-American rapper and pop icon, known for her versatile flow and personas.',
    imageUrl: '/celebrities/nicki-minaj.jpg',
    featured: true,
    bronze: 290,
    silver: 580,
    gold: 1160,
    platinum: 2320,
    event: 725
  },
  {
    name: 'Travis Scott',
    slug: 'travis-scott',
    profession: 'Musician',
    bio: 'American rapper, singer, and producer known for his unique sound and energetic performances.',
    imageUrl: '/celebrities/travis-scott.jpg',
    featured: false,
    bronze: 270,
    silver: 540,
    gold: 1080,
    platinum: 2160,
    event: 675
  },
  {
    name: 'Megan Thee Stallion',
    slug: 'megan-thee-stallion',
    profession: 'Musician',
    bio: 'American rapper known for her confidence, freestyle skills, and empowering lyrics.',
    imageUrl: '/celebrities/megan-thee-stallion.jpg',
    featured: false,
    bronze: 240,
    silver: 480,
    gold: 960,
    platinum: 1920,
    event: 600
  },
  {
    name: 'Billie Eilish',
    slug: 'billie-eilish',
    profession: 'Musician',
    bio: 'American singer-songwriter known for her unique sound and multiple Grammy wins.',
    imageUrl: '/celebrities/billie-eilish.jpg',
    featured: true,
    bronze: 280,
    silver: 560,
    gold: 1120,
    platinum: 2240,
    event: 700
  },
  {
    name: 'Dua Lipa',
    slug: 'dua-lipa',
    profession: 'Musician',
    bio: 'English-Albanian singer known for her distinctive disco-pop sound and dance hits.',
    imageUrl: '/celebrities/dua-lipa.jpg',
    featured: false,
    bronze: 230,
    silver: 460,
    gold: 920,
    platinum: 1840,
    event: 575
  },
  {
    name: 'Harry Styles',
    slug: 'harry-styles',
    profession: 'Musician',
    bio: 'English singer, songwriter, and former One Direction member with a successful solo career.',
    imageUrl: '/celebrities/harry-styles.jpg',
    featured: false,
    bronze: 260,
    silver: 520,
    gold: 1040,
    platinum: 2080,
    event: 650
  },
  {
    name: 'Lizzo',
    slug: 'lizzo',
    profession: 'Musician',
    bio: 'American singer, rapper, and flutist known for body positivity and empowering anthems.',
    imageUrl: '/celebrities/lizzo.jpg',
    featured: false,
    bronze: 220,
    silver: 440,
    gold: 880,
    platinum: 1760,
    event: 550
  },
  {
    name: 'Bad Bunny',
    slug: 'bad-bunny',
    profession: 'Musician',
    bio: 'Puerto Rican rapper and singer, global Latin music superstar and cultural icon.',
    imageUrl: '/celebrities/bad-bunny.jpg',
    featured: true,
    bronze: 300,
    silver: 600,
    gold: 1200,
    platinum: 2400,
    event: 750
  },
  {
    name: 'SZA',
    slug: 'sza',
    profession: 'Musician',
    bio: 'American R&B singer known for her soulful voice and introspective lyrics.',
    imageUrl: '/celebrities/sza.jpg',
    featured: false,
    bronze: 240,
    silver: 480,
    gold: 960,
    platinum: 1920,
    event: 600
  },

  // Athletes
  {
    name: 'Serena Williams',
    slug: 'serena-williams',
    profession: 'Athlete',
    bio: 'American former professional tennis player, widely regarded as one of the greatest tennis players of all time.',
    imageUrl: '/celebrities/serena-williams.jpg',
    featured: true,
    bronze: 200,
    silver: 400,
    gold: 800,
    platinum: 1600,
    event: 500
  },
  {
    name: 'Cristiano Ronaldo',
    slug: 'cristiano-ronaldo',
    profession: 'Athlete',
    bio: 'Portuguese professional footballer, one of the greatest players of all time.',
    imageUrl: '/celebrities/cristiano-ronaldo.jpg',
    featured: true,
    bronze: 400,
    silver: 800,
    gold: 1600,
    platinum: 3200,
    event: 1000
  },
  {
    name: 'LeBron James',
    slug: 'lebron-james',
    profession: 'Athlete',
    bio: 'American professional basketball player, four-time NBA champion and cultural icon.',
    imageUrl: '/celebrities/lebron-james.jpg',
    featured: true,
    bronze: 350,
    silver: 700,
    gold: 1400,
    platinum: 2800,
    event: 850
  },
  {
    name: 'Simone Biles',
    slug: 'simone-biles',
    profession: 'Athlete',
    bio: 'American artistic gymnast, most decorated gymnast in history.',
    imageUrl: '/celebrities/simone-biles.jpg',
    featured: false,
    bronze: 180,
    silver: 360,
    gold: 720,
    platinum: 1440,
    event: 450
  },
  {
    name: 'Lionel Messi',
    slug: 'lionel-messi',
    profession: 'Athlete',
    bio: 'Argentine professional footballer, eight-time Ballon d\'Or winner.',
    imageUrl: '/celebrities/lionel-messi.jpg',
    featured: true,
    bronze: 400,
    silver: 800,
    gold: 1600,
    platinum: 3200,
    event: 1000
  },

  // Chefs
  {
    name: 'Gordon Ramsay',
    slug: 'gordon-ramsay',
    profession: 'Chef',
    bio: 'British celebrity chef, restaurateur, and television personality.',
    imageUrl: '/celebrities/gordon-ramsay.jpg',
    featured: true,
    bronze: 150,
    silver: 300,
    gold: 600,
    platinum: 1200,
    event: 400
  },
  {
    name: 'Jamie Oliver',
    slug: 'jamie-oliver',
    profession: 'Chef',
    bio: 'British chef and restaurateur known for his accessible approach to cooking.',
    imageUrl: '/celebrities/jamie-oliver.jpg',
    featured: false,
    bronze: 120,
    silver: 240,
    gold: 480,
    platinum: 960,
    event: 320
  },
  {
    name: 'Bobby Flay',
    slug: 'bobby-flay',
    profession: 'Chef',
    bio: 'American celebrity chef, restaurateur, and reality TV personality.',
    imageUrl: '/celebrities/bobby-flay.jpg',
    featured: false,
    bronze: 130,
    silver: 260,
    gold: 520,
    platinum: 1040,
    event: 350
  },

  // Entrepreneurs & Business Leaders
  {
    name: 'Elon Musk',
    slug: 'elon-musk',
    profession: 'Entrepreneur',
    bio: 'CEO of Tesla and SpaceX, entrepreneur and technology innovator.',
    imageUrl: '/celebrities/elon-musk.jpg',
    featured: true,
    bronze: 500,
    silver: 1000,
    gold: 2000,
    platinum: 4000,
    event: 1200
  },
  {
    name: 'Oprah Winfrey',
    slug: 'oprah-winfrey',
    profession: 'Media Mogul',
    bio: 'American talk show host, television producer, actress, and media proprietor.',
    imageUrl: '/celebrities/oprah-winfrey.jpg',
    featured: true,
    bronze: 400,
    silver: 800,
    gold: 1600,
    platinum: 3200,
    event: 1000
  },
  {
    name: 'Mark Zuckerberg',
    slug: 'mark-zuckerberg',
    profession: 'Entrepreneur',
    bio: 'Co-founder and CEO of Meta (Facebook), technology entrepreneur.',
    imageUrl: '/celebrities/mark-zuckerberg.jpg',
    featured: false,
    bronze: 450,
    silver: 900,
    gold: 1800,
    platinum: 3600,
    event: 1100
  },

  // Comedians
  {
    name: 'Kevin Hart',
    slug: 'kevin-hart',
    profession: 'Comedian',
    bio: 'American comedian, actor, and producer known for his energetic comedy style.',
    imageUrl: '/celebrities/kevin-hart.jpg',
    featured: false,
    bronze: 170,
    silver: 340,
    gold: 680,
    platinum: 1360,
    event: 425
  },
  {
    name: 'Tiffany Haddish',
    slug: 'tiffany-haddish',
    profession: 'Comedian',
    bio: 'American comedian and actress known for her breakthrough role in Girls Trip.',
    imageUrl: '/celebrities/tiffany-haddish.jpg',
    featured: false,
    bronze: 140,
    silver: 280,
    gold: 560,
    platinum: 1120,
    event: 380
  },

  // Models & Influencers
  {
    name: 'Gigi Hadid',
    slug: 'gigi-hadid',
    profession: 'Model',
    bio: 'American fashion model and television personality.',
    imageUrl: '/celebrities/gigi-hadid.jpg',
    featured: false,
    bronze: 160,
    silver: 320,
    gold: 640,
    platinum: 1280,
    event: 420
  },
  {
    name: 'Kim Kardashian',
    slug: 'kim-kardashian',
    profession: 'Media Personality',
    bio: 'American media personality, socialite, and businesswoman.',
    imageUrl: '/celebrities/kim-kardashian.jpg',
    featured: true,
    bronze: 300,
    silver: 600,
    gold: 1200,
    platinum: 2400,
    event: 750
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('MONGO_URI environment variable is not set');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    console.log('Clearing existing celebrities...');
    await Celebrity.deleteMany({});
    console.log('Existing celebrities cleared');

    console.log('Seeding celebrities...');
    const celebrities = await Celebrity.insertMany(sampleCelebrities);
    console.log(`Successfully seeded ${celebrities.length} celebrities:`);
    celebrities.forEach(celeb => {
      console.log(`  - ${celeb.name} (${celeb.profession})`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

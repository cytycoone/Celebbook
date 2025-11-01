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

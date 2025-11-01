import mongoose from 'mongoose';
import Celebrity from '../src/models/Celebrity';

const sampleCelebrities = [
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
    name: 'Dwayne Johnson',
    slug: 'dwayne-johnson',
    profession: 'Actor',
    bio: 'American actor, producer, and former professional wrestler.',
    imageUrl: '/celebrities/dwayne-johnson.jpg',
    featured: true,
    bronze: 250,
    silver: 500,
    gold: 1000,
    platinum: 2000,
    event: 600
  },
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

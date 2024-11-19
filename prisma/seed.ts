import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.spot.deleteMany();

  // Create spots
  console.log('Creating spots...');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const spots = await Promise.all([
    prisma.spot.upsert({
      where: { name: 'Hamilton Library' },
      update: {},
      create: {
        name: 'Hamilton Library',
        description: 'Quiet study space with multiple floors',
        imageUrl: '/images/hamilton.jpg',
        rating: 4.5,
        numReviews: 125,
        address: '2550 McCarthy Mall, Honolulu, HI 96822',
        latitude: 21.3001,
        longitude: -157.8161,
        hasOutlets: true,
        hasParking: true,
        hasFoodDrinks: false,
        maxGroupSize: 6,
        type: 'LIBRARY',
      },
    }),
    prisma.spot.upsert({
      where: { name: 'Sinclair Library' },
      update: {},
      create: {
        name: 'Sinclair Library',
        description: '24/7 study space with comfortable seating',
        imageUrl: '/images/sinclair.jpg',
        rating: 4.2,
        numReviews: 89,
        address: '2425 Campus Rd, Honolulu, HI 96822',
        latitude: 21.2999,
        longitude: -157.8190,
        hasOutlets: true,
        hasParking: true,
        hasFoodDrinks: true,
        maxGroupSize: 4,
        type: 'LIBRARY',
      },
    }),
  ]);

  console.log('Spots created successfully');

  // Hash password once
  const hashedPassword = await hash('foo', 10);

  // Create profiles
  console.log('Creating profiles...');
  await Promise.all(
    config.defaultProfiles.map(async (profile) => {
      try {
        console.log(`  Creating/Updating profile ${profile.email}`);

        // Create user and profile concurrently
        await Promise.all([
          prisma.user.upsert({
            where: { email: profile.email },
            update: { password: hashedPassword },
            create: {
              email: profile.email,
              password: hashedPassword,
            },
          }),
          prisma.profile.upsert({
            where: { email: profile.email },
            update: {
              firstName: profile.firstName,
              lastName: profile.lastName,
              bio: profile.bio || '',
              picture: profile.picture || '',
            },
            create: {
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
              bio: profile.bio || '',
              picture: profile.picture || '',
            },
          }),
        ]);
      } catch (error) {
        console.error(`Error creating profile for ${profile.email}:`, error);
      }
    }),
  );

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

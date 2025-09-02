import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create initial landmarks
  const landmarks = await Promise.all([
    prisma.landmark.upsert({
      where: { id: "movie-theater" },
      update: {},
      create: {
        id: "movie-theater",
        title: "Movie Theater",
        description:
          "This is where my passion for storytelling began. Growing up, I spent countless hours here, absorbing narratives that would later influence my approach to creating immersive digital experiences.",
        details:
          "Just like films transport audiences to different worlds, I strive to create web experiences that captivate and engage users from the first interaction.",
        splineObjectName: "MovieTheater_Stop",
        position: { x: 0, y: 0, z: 0 },
        isActive: true,
      },
    }),
    prisma.landmark.upsert({
      where: { id: "soccer-pitch" },
      update: {},
      create: {
        id: "soccer-pitch",
        title: "Soccer Pitch",
        description:
          "Team collaboration and strategic thinking were forged on this field. Every match taught me about coordination, timing, and the importance of each player's role.",
        details:
          "In development, like in soccer, success comes from understanding how individual components work together to create something greater than the sum of their parts.",
        splineObjectName: "SoccerPitch_Stop",
        position: { x: 10, y: 0, z: 0 },
        isActive: true,
      },
    }),
    prisma.landmark.upsert({
      where: { id: "school" },
      update: {},
      create: {
        id: "school",
        title: "Elementary School",
        description:
          "Where curiosity was nurtured and the foundation of learning was built. Every classroom held a new adventure, every teacher a mentor.",
        details:
          "The structured learning environment taught me discipline and the importance of continuous growth - principles I apply to every project I undertake.",
        splineObjectName: "School_Stop",
        position: { x: -10, y: 0, z: 0 },
        isActive: true,
      },
    }),
    prisma.landmark.upsert({
      where: { id: "library" },
      update: {},
      create: {
        id: "library",
        title: "Public Library",
        description:
          "A sanctuary of knowledge where I discovered the power of information and the joy of research. Countless hours spent exploring different worlds through books.",
        details:
          "The library taught me that every problem has been solved before, and the key is knowing where to look for the solution.",
        splineObjectName: "Library_Stop",
        position: { x: 0, y: 0, z: 10 },
        isActive: true,
      },
    }),
    prisma.landmark.upsert({
      where: { id: "park" },
      update: {},
      create: {
        id: "park",
        title: "Community Park",
        description:
          "A place of balance between nature and community. Where I learned the importance of taking breaks and finding inspiration in the world around me.",
        details:
          "Just as a park provides a natural pause in urban life, I believe in creating digital experiences that give users moments of reflection and joy.",
        splineObjectName: "Park_Stop",
        position: { x: 5, y: 0, z: -5 },
        isActive: true,
      },
    }),
  ]);

  console.log("Seeded landmarks:", landmarks.length);

  // Create sample guestbook entries
  const guestbookEntries = await Promise.all([
    prisma.guestbookEntry.create({
      data: {
        landmarkId: "movie-theater",
        name: "Sarah M.",
        message:
          "Love the storytelling approach! This really captures the essence of your journey.",
        isApproved: true,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        landmarkId: "soccer-pitch",
        name: "Mike R.",
        message:
          "The team collaboration metaphor really resonates. Great work!",
        isApproved: true,
      },
    }),
    prisma.guestbookEntry.create({
      data: {
        landmarkId: "library",
        name: "Emma L.",
        message:
          "The research mindset is so important in development. Well said!",
        isApproved: true,
      },
    }),
  ]);

  console.log("Seeded guestbook entries:", guestbookEntries.length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

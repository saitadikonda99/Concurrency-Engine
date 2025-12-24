import prisma from './src/config/db.ts'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 7;


async function main() {

  const event = await prisma.event.create({
    data: {
      name: "The Summer I Turned Pretty",
      startAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    }
  });


  const seatsData = [];
  for (const row of ROWS) {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      seatsData.push({
        seatNo: `${row}${num}`, 
        eventId: event.id,
        status: 'AVAILABLE' as const, 
      });
    }
  }

  await prisma.seat.createMany({ data: seatsData });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

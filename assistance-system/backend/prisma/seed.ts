import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const employees = [
    { document_id: '1010123456', full_name: 'Juan Perez Silva' },
    { document_id: '1020987654', full_name: 'Maria Rodriguez Torres' },
    { document_id: '39485721',   full_name: 'Carlos Mendoza Diaz' },
    { document_id: '1134567890', full_name: 'Ana Lucia Martinez' },
    { document_id: '72345612',   full_name: 'Luis Fernando Vargas' },
    { document_id: '1050222333', full_name: 'Diana Marcela Gomez' },
    { document_id: '43987654',   full_name: 'Martha Ospina Lopez' },
    { document_id: '1070888999', full_name: 'Jorge Ivan Rincon' },
    { document_id: '1090777666', full_name: 'Elena Suarez Mora' },
    { document_id: '12345678',   full_name: 'Test Empleado Base' },
  ];

  for (const emp of employees) {
    await prisma.employee.upsert({
      where: { document_id: emp.document_id },
      update: {},
      create: emp,
    });
  }

  console.log('Dummy employees seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

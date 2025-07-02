import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'tbp6000372@univalle.edu';
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.usuario.findUnique({ where: { email } });

  if (!existing) {
    await prisma.usuario.create({
      data: {
        nombre: 'Director de Carrera',
        email,
        password: hashedPassword,
        rol: 'ADMIN'
      }
    });
    console.log('Usuario director creado con éxito.');
  } else {
    console.log('ℹEl usuario ya existe. No se hizo nada.');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error al crear el usuario:', e);
    prisma.$disconnect();
    process.exit(1);
  });
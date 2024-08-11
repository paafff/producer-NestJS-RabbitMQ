import { FileTypeEnum, GenderEnum, Prisma, PrismaClient } from '@prisma/client';
import { join } from 'path';
import * as fs from 'fs/promises';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

let prisma = new PrismaClient();

export async function Seeds() {
  const records: number = 100;

  const fileCreateManyInput: Prisma.FileCreateManyInput[] = Array.from({
    length: 100, // Ubah ini menjadi jumlah total yang Anda inginkan
  }).map((_, index) => ({
    fileType: faker.helpers.objectValue(FileTypeEnum),
    path: faker.image.urlPicsumPhotos() || faker.image.urlLoremFlickr(),
  }));

  const userCreateManyInput: Prisma.UserCreateManyInput[] = Array.from({
    length: records / 10,
  }).map((_, index) => {
    const username = faker.internet.userName();
    console.log('🚀 ~ Seeds ~ username:', username);
    const hashedPassword = bcrypt.hashSync(username, 10);

    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      username: username,
      password: hashedPassword,
    };
  });

  const userDetailCreateManyInput: Prisma.UserDetailCreateManyInput[] =
    Array.from({
      length: records / 10,
    }).map((_, index) => ({
      fullName: faker.person.fullName(),
      id: userCreateManyInput[index % userCreateManyInput.length].id,
      about: faker.lorem.paragraph(),
      avatarPath: fileCreateManyInput[index % fileCreateManyInput.length].path,
      gender: faker.helpers.objectValue(GenderEnum),
      height: faker.string.numeric() + ' cm',
      weight: faker.string.numeric() + ' kg',
      interests: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    }));

  try {
    console.log('🚀 ~ Seeds Start... ');

    await prisma.$transaction(
      async (prisma) => {
        await prisma.file
          .createMany({
            data: fileCreateManyInput,
          })
          .catch((error) => {
            console.error('Error creating file', error);
            throw error;
          });

        await prisma.user
          .createMany({
            data: userCreateManyInput,
          })
          .catch((error) => {
            console.error('Error creating user', error);
            throw error;
          });

        await prisma.userDetail
          .createMany({
            data: userDetailCreateManyInput,
          })
          .catch((error) => {
            console.error('Error creating userDetail', error);
            throw error;
          });
      },
      {
        maxWait: 100000, // default: 2000
        timeout: 20000000, // default: 5000
      },
    );
  } catch (error) {
    console.error('Seeding error', error);
  } finally {
    console.log('🚀 ~ Seeds Completed... ');
    await prisma.$disconnect();
  }

  //================================================================================================
}

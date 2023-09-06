import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPacksByPackId = async ({ code }: { code: number }) => {
  try {
    const findByPackId = await prisma.packs.findMany({
      where: {
        pack_id: code,
      },
    });

    return findByPackId;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPacksByProductId = async ({ code }: { code: number }) => {
  try {
    const findByCode = await prisma.packs.findMany({
      where: {
        product_id: code,
      },
    });

    return findByCode;
  } catch (error) {
    console.log(error);
    return [];
  }
};

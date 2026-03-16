'use server';

import { prisma } from '@/db/prisma';
import {convertToPlainObject} from '../utils';
import {LATEST_PRODUCTS_LIMIT, PAGE_SIZE} from '../constants'

// Get latest products
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: +LATEST_PRODUCTS_LIMIT,
  });
  return convertToPlainObject(products);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug: slug },
  });
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category: string;
}) {

  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}


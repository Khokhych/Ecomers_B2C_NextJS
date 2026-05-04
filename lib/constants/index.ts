export const DEV_SETUP = process.env.DEV_SETUP === 'true';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ProStore";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Best online store";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001/";
export const LATEST_PRODUCTS_LIMIT = process.env.LATEST_PRODUCTS_LIMIT || 4;

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'CreditCard', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'CreditCard';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 5;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user'];

export const SENDER_EMAIL =
  process.env.SENDER_EMAIL || 'onboarding@resend.dev';

export const EMAIL_TO =
  process.env.EMAIL_TO || 'no-reply@example.com';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Get locale from cookie or default to 'en'
  const locale = 'en'; // We'll handle this client-side for now

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

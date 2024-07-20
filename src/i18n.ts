import {getRequestConfig} from 'next-intl/server';
import { locales } from './config';
import { notFound } from 'next/navigation';
 
export default getRequestConfig(async () => {

  const locale = 'pt-BR';
  //const locale = 'en';

  //if (!locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
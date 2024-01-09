import { Metadata } from "next";

const title = 'snapmath';
const description = 'Machine Learning app to compute math operation with given digits.';
const siteURL = process.env.SITE_URL;
const authorName = process.env.AUTHOR_NAME;

export const defaultMetadata: Metadata = {
  title: title,
  description: description,
  keywords: ['machine learning', 'computer vision', 'tensorflow', 'artificial inteligence'],
  authors: [
    {
      url: siteURL,
      name: authorName,
    },
  ],
  creator: authorName,
  openGraph: {
    title: title,
    description: description,
    siteName: title,
    locale: 'en-US',
    images: [],
  },
  twitter: {
    title: title,
    description: description,
    creator: authorName,
    images: [],
  },
}

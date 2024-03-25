import type { Metadata } from 'next'
import './globals.css'
import { defaultMetadata } from '@snapmath/metadata'
import { MenuBar } from '@snapmath/components/menu-bar.component'
import { OnboardingInfo } from '@snapmath/components/onboarding.component'

export const metadata: Metadata = {
  ...defaultMetadata,
}

const steps = [
  {
    title: 'Welcome, visitor!',
    mainText: 'Snapmath is a simple Machine Learning project to predict single digit numbers from images.',
    secondaryText: 'The model was trained using the MNIST dataset and all details of training and model exporting can be found on the Github project. Keep in mind this project was build just for fun and to check the state of Machine Learning tools available, so it has no intentions to provide high accuracy predictions.',
    currentPage: 1,
    amountOfPages: 2,
  },
  {
    title: 'How To Use It?',
    mainText: 'Just upload images of single digit numbers and check the result with its accuracy.',
    secondaryText: 'As MNIST was the dataset used to train it, prefer using small images with white background. You can find some examples to use once you finish this tutorial.',
    imageSrc: '/imgs/step-2.webp',
    currentPage: 2,
    amountOfPages: 2,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col'>
        <OnboardingInfo steps={steps}/>
        <MenuBar />
        {children}
        <footer className='flex justify-center my-2'>
          <p>Made with love by<a target='blank' className='hover:bg-gray-400 p-1' href='https://buarki.com'>buarki.com.</a></p>
        </footer>
      </body>
    </html>
  )
}

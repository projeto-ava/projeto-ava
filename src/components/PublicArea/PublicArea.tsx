'use client'

import Image from 'next/image'

export interface IPublicAreaProp {
  image: string
  alt: string
  title: string
  subTitle: string
  children: JSX.Element
}

export const PublicArea = ({
  image,
  alt,
  title,
  subTitle,
  children
}: IPublicAreaProp) => {
  return (
    <div className="flex flex-col w-full justify-center gap-4 ">
      <div className="flex flex-col justify-center items-center gap-8 pt-11">
        <Image src={image} alt={alt} width={64} height={64} />
        <div className="flex gap-2 flex-col items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2 className="text-gray-500 text-xm text-center">{subTitle}</h2>
        </div>
      </div>
      {children}
    </div>
  )
}

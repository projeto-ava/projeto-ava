'use client'

import { IPublicAreaProp, PublicArea} from '../PublicArea/PublicArea'

type IPublicAreaCustomProp = Omit<IPublicAreaProp, 'children' | 'disabled'>

interface IPageWrapperProp {
  publicArea?: IPublicAreaCustomProp
  children: JSX.Element
}

export const PageWrapper = ({
  publicArea,
  children
}: IPageWrapperProp) => {
  if (publicArea) {
    children = (
      <PublicArea
        image={publicArea.image}
        alt={publicArea.alt}
        title={publicArea.title}
        subTitle={publicArea.subTitle}
      >
        {children}
      </PublicArea>
    )
  }

  return (
    <main className="flex flex-col w-full justify-center p-5">{children}</main>
  )
}

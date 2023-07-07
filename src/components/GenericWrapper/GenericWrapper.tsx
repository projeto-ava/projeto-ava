'use client'

import { IPublicAreaProp, PublicArea} from '../PublicArea/PublicArea'
type IWrapperCustomProp = Omit<IPublicAreaProp, 'children' | 'disabled'>
interface IGenericWrapperProp {
  Public?: IWrapperCustomProp
  children: JSX.Element
}

export const GenericWrapper = ({
  Public,
  children
}: IGenericWrapperProp) => {
  if (Public) {
    children = (
      <PublicArea
        image={Public.image}
        alt={Public.alt}
        title={Public.title}
        subTitle={Public.subTitle}
      >
        {children}
      </PublicArea>
    )
  }
  return (
    <main className="flex flex-col w-full justify-center p-5">{children}</main>
  )
}

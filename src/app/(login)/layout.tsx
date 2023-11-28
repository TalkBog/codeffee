import { Card, SectionContainer, ZodI18nProvider } from "tp-kit/components"

export default function layout({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
      <SectionContainer background="coffee" >
          <Card className="mx-[30%] my-[4%] flex flex-col">
            <ZodI18nProvider>
              {children}
            </ZodI18nProvider>
             
          </Card>
      </SectionContainer>
            
        )
}
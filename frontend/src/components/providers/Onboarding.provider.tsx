import { FC, createContext, useEffect, useState } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { createStateMachineWithContext } from 'state/machine'
import { useSearchParams } from 'react-router-dom'

import { useSDK } from '@metamask/sdk-react'

//TODO : provide better typing

export const OnboardingContext = createContext<{
  service: InterpreterFrom<any>
}>({
  //a little hack to make TS happy
  service: {} as InterpreterFrom<any>,
})

export const AwaitForMetamaskSDK: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { ready } = useSDK()
  if (ready) {
    return <>{children}</>
  } else {
    return <div>loading</div>
  }
}

export const OnboardingProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //TODO : make own hook for this to avoid calling get for every param

  const [queryParams] = useSearchParams()

  const yagnaWalletAddress = queryParams.get('yagnaWalletAddress') ?? ''
  const { sdk } = useSDK()

  const initialService = useInterpret(
    createStateMachineWithContext({
      yagnaWalletAddress,
      sdk,
    })
  )
  const [service, setService] = useState(initialService)

  return (
    //@ts-ignore
    <OnboardingContext.Provider value={{ service }}>
      {children}
    </OnboardingContext.Provider>
  )
}

import { TokenCategory, TxStatus } from 'types/ethereum'
import { settings } from 'settings'
import { getGLMToken } from 'utils/getGLMToken'
import { getNativeToken } from 'utils/getNativeToken'

import { useSupplyYagnaWallet } from 'hooks/useSupplyYagnaWallet'
import { useNetwork } from 'hooks/useNetwork'
import { useBalance } from 'hooks/useBalance'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Trans } from 'components/atoms'
import { useEffect, useState } from 'react'
import { RecommendationCardTransfer } from 'components/molecules/recommendationCard/RecommendationCard'
import { StartButton } from 'components/molecules/stepStartButton/StepStartButton'
import { IconInput } from 'components/atoms/iconInput/IconInput'
import {
  EthereumIcon,
  GolemCoinIcon,
  MaticCoinIcon,
} from 'components/atoms/icons'
import { EtherSymbol } from 'ethers'
import { use } from 'i18next'
import { set } from 'lodash'
import { MaticCoinSolidIcon } from 'components/atoms/icons/matic.icon'
import { formatEther } from 'viem'

TooltipProvider.registerTooltip({
  id: 'transfer',
  tooltip: {
    sections: [],
    appearance: 'primary',
  },
})

type Amount = {
  [TokenCategory.GLM]: number
  [TokenCategory.NATIVE]: number
}

const TransferPresentational = ({
  showContent,
  setPlacement,
  amount,
  setAmount,
  nativeToken,
  send,
  error,
}: {
  nativeToken: string
  amount: Amount
  setAmount: (amount: Amount) => void
  showContent: boolean
  placement: 'inside' | 'outside'
  setPlacement: (placement: 'inside' | 'outside') => void
  send: () => void
  error: {
    [TokenCategory.GLM]: string
    [TokenCategory.NATIVE]: string
  }
}) => {
  return (
    <div>
      {!showContent && (
        <StartButton
          onClick={() => {
            setPlacement('inside')
          }}
          step="transfer"
        />
      )}

      {showContent && (
        <div className="flex flex-col gap-6 pb-8">
          <RecommendationCardTransfer />
          <div className="text-h4 text-primary pl-8 pr-8">
            <div className="grid grid-cols-4 pr-10">
              <div className="col-span-3 flex flex-col">
                <Trans i18nKey="transferAmount" ns="transfer.step" />

                <IconInput
                  icon={GolemCoinIcon}
                  label="GLM"
                  placeholder={`${amount[TokenCategory.GLM]}`}
                  isError={!!error[TokenCategory.GLM]}
                  onChange={(e) => {
                    const value = parseFloat(e.currentTarget.value)
                    console.log('value', value)
                    setAmount({
                      ...amount,
                      [TokenCategory.GLM]: value,
                    })
                  }}
                />

                <IconInput
                  icon={
                    nativeToken === 'MATIC' ? MaticCoinSolidIcon : EthereumIcon
                  }
                  label={nativeToken}
                  placeholder={`${amount[TokenCategory.NATIVE]}`}
                  isError={!!error[TokenCategory.NATIVE]}
                  onChange={(e) => {
                    const value = parseFloat(e.currentTarget.value)
                    setAmount({
                      ...amount,
                      [TokenCategory.NATIVE]: value,
                    })
                  }}
                />

                <div>
                  <Button
                    buttonStyle="solid"
                    className="mt-10 text-white px-9 py-4 text-button-large"
                    disabled={
                      !!error[TokenCategory.GLM] ||
                      !!error[TokenCategory.NATIVE]
                    }
                    onClick={send}
                  >
                    <Trans i18nKey="transferButtonText" ns="transfer.step" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const Transfer = ({
  goToNextStep,
  placement,
  setPlacement,
}: {
  goToNextStep: () => void
  placement: 'inside' | 'outside'
  setPlacement: (placement: 'inside' | 'outside') => void
}) => {
  const balance = useBalance()
  const { send, txStatus } = useSupplyYagnaWallet()
  const [isLoading, setIsLoading] = useState(false)
  const { chain } = useNetwork()

  const [showContent, setShowContent] = useState(false)
  if (!chain?.id) {
    throw new Error('Chain not found')
  }
  useEffect(() => {
    //control button loading state s
    if (
      txStatus[TokenCategory.GLM] === TxStatus.PENDING ||
      txStatus[TokenCategory.NATIVE] === TxStatus.PENDING
    ) {
      setIsLoading(true)
    }
    //continue flow when both transactions are successful
    // if (
    //   txStatus[TokenCategory.GLM] === TxStatus.SUCCESS &&
    //   txStatus[TokenCategory.NATIVE] === TxStatus.SUCCESS
    // ) {
    //   goToNextStep()
    // }
  }, [
    txStatus,
    // goToNextStep
  ])

  const [error, setError] = useState({
    [TokenCategory.GLM]: '',
    [TokenCategory.NATIVE]: '',
  })
  const nativeToken = getNativeToken(chain.id).split('_')[0]
  const [amount, setAmount] = useState<Amount>({
    [TokenCategory.GLM]: settings.minimalBalance[getGLMToken(chain.id).symbol],
    [TokenCategory.NATIVE]: settings.minimalBalance[getNativeToken(chain.id)],
  })

  useEffect(() => {
    if (
      amount[TokenCategory.GLM] >
      Number(formatEther(balance[TokenCategory.GLM]))
    ) {
      setError({
        ...error,
        [TokenCategory.GLM]: 'Not enough GLM',
      })
    }
    if (
      amount[TokenCategory.NATIVE] >
      Number(formatEther(balance[TokenCategory.NATIVE]))
    ) {
      setError({
        ...error,
        [TokenCategory.NATIVE]: 'Not enough ' + nativeToken,
      })
    }
  }, [
    amount[TokenCategory.GLM],
    amount[TokenCategory.NATIVE],
    balance[TokenCategory.GLM],
    balance[TokenCategory.NATIVE],
    nativeToken,
  ])

  useEffect(() => {
    if (placement === 'inside') {
      setShowContent(true)
    }
  }, [placement])

  return (
    <TransferPresentational
      showContent={showContent}
      placement={placement}
      setPlacement={setPlacement}
      setAmount={setAmount}
      amount={amount}
      nativeToken={nativeToken}
      error={error}
      send={() => {
        send(amount)
      }}
    />
  )
}

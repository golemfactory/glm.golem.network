import { WalletProvider, WalletProviderType } from 'hooks/useWallet'
import { EthereumAddress } from 'types/ethereum'
import { match } from 'ts-pattern'
import {
  GolemCoinIcon,
  MaticCoinIcon,
  MetamaskIcon,
  TrustWalletIcon,
} from 'components/atoms/icons'
import { Trans } from 'components/atoms'

import style from './walletState.module.css'
import { useBalance } from 'hooks/useBalance'
import { formatBalance } from 'utils/formatBalance'

export const AccountCategory = {
  BROWSER_WALLET: 'browserWallet',
  YAGNA: 'yagnaWallet',
} as const

export type AccountCategoryType =
  (typeof AccountCategory)[keyof typeof AccountCategory]

export const WalletState = ({
  category,
  address,
  provider,
}: {
  category: AccountCategoryType
  address: EthereumAddress
  provider?: WalletProviderType
}) => {
  const balance = useBalance(address)

  return (
    <div className="flex pl-8 flex-col items-start gap-8 pb-8">
      <div className="flex items-center gap-4">
        {match([category, provider])
          .with(
            [AccountCategory.BROWSER_WALLET, WalletProvider.METAMASK],
            () => <MetamaskIcon className="h-10" />
          )
          .with([AccountCategory.YAGNA, undefined], () => (
            <div className="relative">
              <img src="golemWallet.svg" className="h-8" />
              <div
                className={`${style.yagnaLogo} absolute -bottom-0 right-0 text-darkblue-700`}
              >
                YAGNA
              </div>
            </div>
          ))
          .with(
            [AccountCategory.BROWSER_WALLET, WalletProvider.TRUST_WALLET],
            () => <TrustWalletIcon />
          )
          .otherwise(() => {
            return ''
          })}

        <div className="flex flex-col justify-center items-start gap-1">
          <div className="text-neutral-grey-300 text-c-xs whitespace-nowrap">
            <Trans i18nKey="walletAddress" ns="layout" /> {address.slice(0, 6)}
            ...{address.slice(-4)}
          </div>
          <div className="text-h6 ">
            <Trans i18nKey={category} ns="layout" />
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex flex-col gap-3 text-body-normal">
        <div className="capitalize">
          <Trans i18nKey="currentBalance" ns="layout" />
        </div>
        <div className="flex gap-16">
          <div
            className={`flex gap-1 items-center ${style.tokenIconContainer}`}
          >
            <GolemCoinIcon className="h-6 inline" /> GLM
          </div>
          <div className="text-h7">{formatBalance(balance.GLM)}</div>
        </div>
        <div className=" flex gap-16">
          <div
            className={`flex gap-1 items-center ${style.tokenIconContainer}`}
          >
            <MaticCoinIcon className="h-6 inline" /> MATIC
          </div>
          <div className="text-h7">{formatBalance(balance.NATIVE)}</div>
        </div>
      </div>
    </div>
  )
}
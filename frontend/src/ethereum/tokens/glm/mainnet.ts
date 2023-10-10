import { EthereumAddress, Token, Network, IUtilityToken } from 'types/ethereum'

export const glmMainnet: IUtilityToken = {
  isNative: false,
  name: 'Golem',
  decimals: 18,
  address: '0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429' as EthereumAddress,
  symbol: Token.GLM_MAINNET,
  network: Network.MAINNET,
}

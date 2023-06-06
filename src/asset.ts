import algosdk from 'algosdk'
import { algodClient } from './client'

export const createAsset = async ({ sender }: { sender: algosdk.Account }) => {
  const suggestedParams = await algodClient.getTransactionParams().do()
  const assetCreateTxn =
    algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams,
      from: sender.addr,
      assetName: 'VirtualCoin',
      unitName: 'VTC',
      total: 1_000_000_000,
      decimals: 1,
      reserve: sender.addr,
      freeze: sender.addr,
      clawback: sender.addr,
      manager: sender.addr,
      defaultFrozen: false,
      assetURL: 'https://developer.algorand.org',
    })

  const assetCreateTxnSigned = assetCreateTxn.signTxn(sender.sk)
  console.log(`Enviado la txn de creación del asset ${assetCreateTxn.txID()}`)

  await algodClient.sendRawTransaction(assetCreateTxnSigned).do()
  console.log(`Sending asset create transaction ${assetCreateTxn.txID()}...`)

  await algosdk.waitForConfirmation(algodClient, assetCreateTxn.txID(), 3)

  const assetCreateInfo = await algodClient
    .pendingTransactionInformation(assetCreateTxn.txID())
    .do()

  console.log(
    `Txn ${assetCreateTxn.txID()} confirmada, asset ID: ${
      assetCreateInfo['asset-index']
    }`
  )

  return assetCreateInfo
}

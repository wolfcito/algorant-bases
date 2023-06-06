import algosdk from 'algosdk'
import { createAccount } from './account'
import { algodClient } from './client'

export const makePayment = async ({ sender }: { sender: algosdk.Account }) => {
  const newAccount = await createAccount()
  const suggestedParams = await algodClient.getTransactionParams().do()
  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    from: sender.addr,
    to: newAccount.addr,
    amount: 0.5 * 1e6,
  })

  const paymentTxnSigned = paymentTxn.signTxn(sender.sk)
  await algodClient.sendRawTransaction(paymentTxnSigned).do()

  console.log(
    `Transacción de pago ${paymentTxn.txID()} confirmada. Puedes revisar en dappflow Tx ID: ${paymentTxn.txID()}`
  )
}

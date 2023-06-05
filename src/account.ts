import algosdk from 'algosdk'

export const createAccount = async () => {
  const account = algosdk.generateAccount()
  const mnemonic = algosdk.secretKeyToMnemonic(account.sk)

  console.log('Cuenta nueva creada')
  console.log(`==> Address: ${account.addr}`)
  console.log(`==> Secret key: ${account.sk}`)
  console.log(`==> Frase semilla: ${mnemonic}`)
  return account
}

export const waitForBalance = async ({
  addr,
  algodClient,
}: waitForBalanceProps) => {
  const accountInfo = await algodClient.accountInformation(addr).do()
  const balance = accountInfo.amount
  if (balance === 0) {
    await waitForBalance({ addr, algodClient })
    return
  }
  console.log(`${addr} recibio fondos`)
}

interface waitForBalanceProps {
  addr: string
  algodClient: algosdk.Algodv2
}

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

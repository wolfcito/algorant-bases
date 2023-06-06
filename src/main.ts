import { createAccount, waitForBalance } from './account'
import { algodClient } from './client'
import { makePayment } from './payment'
import { waitForInputs } from './utils'

const main = async () => {
  const account = await createAccount()
  console.log(
    'Por favor agregre fondos a la cuenta. El script continuará cuando su cuenta reciba fondos ($ALGO)'
  )

  await waitForBalance({ addr: account.addr, algodClient: algodClient })

  await waitForInputs()

  await makePayment({ sender: account })

  await waitForInputs()
}

main()

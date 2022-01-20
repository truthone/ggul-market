import { getAccount } from './api.js'

const input = document.querySelector('#search-id')

if (input)
input.addEventListener('keyup', (e) => {
  getAccount(e.currentTarget)
})
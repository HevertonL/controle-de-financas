// Insere a li na ul vazia
const transactionUl = document.querySelector('#transactions')

//Captura das receitas, despesas, valor total e valores inseridos
const revenuesDisplay = document.querySelector('#money-plus')
const expenditureDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputName = document.querySelector('#text')
const inputValue = document.querySelector('#amount')

//Função que faz com que os dados sejam armazenados no LocalStorage
const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions')) 
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []


//Função que remove alguma transação
const removeTransaction = ID => {
  transactions = transactions
  .filter( transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
} 

// Função que adiciona as transações
const addTransactionIntoDom = transaction => {
const operator = transaction.amount < 0 ? '-' : '+'
const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
const amountWithoutOperator = Math.abs(transaction.amount)
const li = document.createElement('li')

li.classList.add(CSSclass)
li.innerHTML = `
  ${transaction.name}
  <span>${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" 
  onclick="removeTransaction(${transaction.id})">x</button>
`
transactionUl.prepend(li)
}

// Função que atualiza o valor do saldo
const updateBalanceValues = () => {
const transactionsAmounts = transactions
.map(transaction => transaction.amount)

//Função que calcula o total das transações
const total = transactionsAmounts
  .reduce((accumulator, transaction) => accumulator + transaction, 0)
  .toFixed(2)

//Função que calcula o valor das receitas
const revenues = transactionsAmounts
  .filter(value => value > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

//Função que calcula o valor das despesas
const expenditure = Math.abs(transactionsAmounts
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)

balanceDisplay.textContent = `R$ ${total}`
revenuesDisplay.textContent = `R$ ${revenues}`
expenditureDisplay.textContent = `R$ ${expenditure}`

}

// Função que inicia as transações
const init = () => {
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDom)
  updateBalanceValues()
}

init()

//função que adiciona os valores na localStorage
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}


//Função que gera id's aleatórios
const generateID = () => Math.round(Math.random() * 1000)

//Função que escuta a submissão do form e adiciona a transação
form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputName.value.trim()
  const transactionValue = inputValue.value.trim()

  if (transactionName === '' || transactionValue === ''){
   alert('Por favor preencha o nome e o valor da transação') 
   return
  }

  const transaction = {
    id: generateID(), 
    name: transactionName, 
    amount: Number(transactionValue)
  }

  transactions.push(transaction)
  init()
  updateLocalStorage()

  inputName.value = ''
  inputValue.value = ''


})
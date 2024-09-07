import { dataChecker } from './utils'


const submitEvent = (event) => {
  event.preventDefault()
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  }
  console.log(data)
  dataChecker(data)
  
}

const button = document.getElementById('submit-button')
button.addEventListener('click',submitEvent)

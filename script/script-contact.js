
const dataChecker = (data) => {
  if(data.name == ''){
    return alert('name must be filled')
  }
  if(data.email == ''){
    return alert('email must be filled')
  }
  if(data.phoneNumber== ''){
    return alert('phone number must be filled')
  }
  if(data.subject == ''){
    return alert('subject must be filled')
  }
  if(data.message == ''){
    return alert('message must be filled')
  }else {

    const recipient = 'ahmadsafii.work@gmail.com'
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`${data.message}`)}`;
    window.location.href = mailtoLink;

    return alert(`
    Name : ${data.name}
    Email : ${data.email}
    Phone Number : ${data.phoneNumber}
    Subject : ${data.subject}
    Message : ${data.message}

    MESSAGE SENT!
    `)
  }
}

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

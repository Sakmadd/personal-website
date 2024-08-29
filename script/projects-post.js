const dataProjects = [];

const submitEvent = (event) => {
  event.preventDefault()

  const imageInput = document.getElementById('upload-image');
  const file = imageInput.files[0];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let checkboxValues = [];
  checkboxes.forEach((checkbox) => {
    checkboxValues.push(checkbox.value);
  });

  let blobUrl = null;
  if (file) {
    blobUrl = URL.createObjectURL(file);
  }

  const data = {
    projectName: document.getElementById('project-name').value,
    startDate: formatDate(document.getElementById('start-date').value),
    endDate: formatDate(document.getElementById('end-date').value),
    description: document.getElementById('description').value,
    technologies: checkboxValues,
    image: blobUrl 
  };
  dataProjects.unshift(data);
  renderProject(dataProjects)
  console.log(dataProjects);
}

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0'); // Tambahkan '0' di depan jika hari kurang dari 10
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tambahkan '0' di depan jika bulan kurang dari 10
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const renderProject = (dataProjects) => {
  const container = document.querySelector('.project-cards-container')
  dataProjects.forEach(data => {
    const projectCard = `
      <div class="project-card">
          <img src="${data.image}" alt="Project Image">
          <div class="project-details">
              <h3>${data.projectName}</h3>
              <p>${data.startDate} - ${data.endDate}</p>
              <p>${data.description}</p>
              
              <div class="project-buttons">
                  <a href="#"><svg class="icon--sm" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30"><path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path></svg></a>
                  <a href="#"><svg class="icon--sm" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30"><path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path></svg></a>
              </div>
          </div>
      </div>
    `;

    container.innerHTML += projectCard;
  })
}

const form = document.getElementById('form-project');
form.addEventListener('submit', submitEvent);

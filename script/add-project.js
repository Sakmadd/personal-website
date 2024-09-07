let dataProjects = JSON.parse(localStorage.getItem('LSdataProject')) || [];

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
    startDate: document.getElementById('start-date').value,
    endDate: document.getElementById('end-date').value,
    description: document.getElementById('description').value,
    technologies: checkboxValues,
    image: blobUrl 
  };
  dataProjects.unshift(data);
  localStorage.setItem('LSdataProject', JSON.stringify(dataProjects))
}

const form = document.getElementById('form-project');
form.addEventListener('submit', submitEvent);


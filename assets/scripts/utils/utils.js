const initialDummyProjects = 
  [
    {
      "id": 1,
      "title": "Project Management Tool",
      "description": "A project management tool designed to help teams collaborate, track tasks, and manage deadlines effectively. Features include task assignment, project timelines, and team communication.",
      "technologies": ["React.js", "Node.js", "TypeScripts"],
      "start_date": "2024-05-01",
      "end_date": "2024-07-15",
      "image": "/temp/project1.jpg",
      "user_id": 1,
      "duration": "2 months 15 days"
    },
    {
      "id": 2,
      "title": "Personal Portfolio",
      "description": "A personal portfolio website showcasing individual projects, skills, and professional experience. Includes a blog section and contact form.",
      "technologies": ["Next.js", "TypeScript", "Node.js"],
      "start_date": "2024-03-10",
      "end_date": "2024-05-01",
      "image": "/temp/project2.jpg",
      "user_id": 2,
      "duration": "1 month 22 days"
    },
    {
      "id": 3,
      "title": "E-Commerce Dashboard",
      "description": "An e-commerce dashboard for managing online stores, including inventory tracking, order management, and customer analytics.",
      "technologies": ["React.js", "Next.js", "TypeScript", "Node.js"],
      "start_date": "2024-06-01",
      "end_date": "2024-09-01",
      "image": "/temp/project3.jpg",
      "user_id": 3,
      "duration": "3 months"
    }
  ]

const calculateProjectDuration = (startDate, endDate) => {
  
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0); 
    days += previousMonth.getDate();
    months--; 
  }

  if (months < 0) {
    months += 12;
    years--; 
  }

  let duration = '';
  if (years > 0) {
    duration += `${years} year${years > 1 ? 's' : ''} `;
  }
  if (months > 0) {
    duration += `${months} month${months > 1 ? 's' : ''} `;
  }
  if (days > 0) {
    duration += `${days} day${days > 1 ? 's' : ''}`;
  }if(startDate === endDate) {
    duration += 'Instant'
  }

  return duration.trim();
}
function capitalizedWords(str) {
  return str
    .toLowerCase() 
    .split(' ')   
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');    
}
function convertIsoToDate(start_date, end_date) {
  let date = {}
  const startdate = new Date(start_date); 
  const endDate = new Date(end_date); 
  const formattedStartDate = startdate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  date.start_date = formattedStartDate
  date.end_date = formattedEndDate
  return date
}

module.exports = { calculateProjectDuration, capitalizedWords, convertIsoToDate, initialDummyProjects }
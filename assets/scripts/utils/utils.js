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

module.exports = { calculateProjectDuration, capitalizedWords, convertIsoToDate }
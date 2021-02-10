function renderLastWorkout(lastWorkoutData) {
  const lastWorkout = document.querySelector('.last-workout');
  const exTable = document.querySelector('#ex-list');
  exTable.innerHTML = '';
  lastWorkout.classList.remove('d-none');
  lastWorkoutData.exercises.forEach( ex => {
    const tr = document.createElement('tr');
    const tableRowHtml = `
      <td data-label="Type">${ex.type}</td>
      <td data-label="Exercise">${ex.name}</td>
      <td data-label="Sets">${ex.sets || '-'}</td>
      <td data-label="Reps">${ex.reps || '-'}</td>
      <td data-label="Weight">${ex.weight || ex.distance}</td>
      <td data-label="Duration">${ex.duration}</td>`;
    tr.innerHTML = tableRowHtml;
    exTable.append(tr);
  });
}
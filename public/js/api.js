const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch('/api/workouts');
    } catch (err) {
      console.log(err);
    }
    if (res) {
      const json = await res.json();
      return json[json.length - 1];
    }
    return
  },
  addExercise(data) {
    const id = location.search.split('=')[1];
    let exercise = data;
    exercise.id = id;
    fetch(`/api/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(response => {
      return response.json();
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      console.log('Server not responded');
      saveWorkout(data);
    });
  },
  async createWorkout(data = {}) {
    const res = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch('/api/workouts/range');
    const json = await res.json();
    return json;
  },
};

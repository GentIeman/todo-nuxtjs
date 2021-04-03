export const state = () => ({
    tasks: []
});

export const getters = {
  getTasks(state){
    return state.tasks
  }
};

export const actions = {
  addNewTask({commit}, data){

    let newData = {
      id: +new Date(),
      title: data.title,
      date: data.date,
      status: false,
    }

    commit('addTasks', newData)
    return true
  },
  removeTask({commit}, id) {
    commit('removeTasks', id)
  },
  changeTask({commit}, id) {
    commit('editTask', id)
  },
};

export const mutations = {
  addTasks(state, data) {
    state.tasks.push(data)
  },
  removeTasks(state, taskId) {
    state.tasks.splice(state.tasks.findIndex(function (item) {
      if (item.id === taskId) return true
    }), 1);
  },
  editTask(state, payload) {
    let temp = JSON.parse(JSON.stringify(state.tasks.find(item => item.id === payload.id)))
    temp[payload.toEdit] = payload.value
    state.tasks.splice(state.tasks.indexOf(state.tasks.find(item => item.id === payload.id)), 1, temp)
  }
}

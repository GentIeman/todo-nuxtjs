export const state = () => ({
    tasks: [],
    lastAddedId: null
});

export const getters = {
  getLastAdded(state) {
    return state.lastAddedId
  },
  getTasks(state) {
    return state.tasks
  },
  getTaskById: state => id => {
    return state.tasks.find(task => task.id === id);
  },
  getSearching: state => search => {
    if (search.length === 0) return []
    return state.tasks.filter((task) => {
      return task.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
  }
};

export const actions = {
  addNewTask({commit}, data){

    let newData = {
      id: +new Date(),
      title: data.title,
      date: data.date,
      status: false,
      linked: null
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
  addLink({commit}, payload) {
    commit('editTask', {
      toEdit : "linked",
      value: payload.linkTo,
      id: payload.id
    })
    commit('editTask', {
      toEdit : "linked",
      value: payload.id,
      id: payload.linkTo
    })
  },
  removeLink({commit, getters}, payload) {
    commit('editTask', {
      toEdit : "linked",
      value: null,
      id: getters.getTaskById(payload.linkTo).linked
    })

    commit('editTask', {
      toEdit : "linked",
      value: null,
      id: payload.linkTo
    })
  },
};

export const mutations = {
  changeSortedStatusForNewTask(state){
    state.lastAddedId = null
  },
  addTasks(state, data) {
    state.tasks.push(data)
    state.lastAddedId = data.id
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

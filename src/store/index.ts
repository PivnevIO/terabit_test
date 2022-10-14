import axios from 'axios'
import { InjectionKey } from 'vue'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { ResponseAPI, SingleUser, Users, Support } from '@/models/api';

const $api = axios.create({ baseURL: "https://reqres.in/api" });

export interface State {
  users: Array<Users>;
  createdUsers: Array<Users>;
  singleUser: Users | undefined;
  supportApi: Support | undefined;
  responseAPI: ResponseAPI | undefined;
}

export const key: InjectionKey<Store<State>> = Symbol()

const getters = <GetterTree<State, any>>{
  users(state: State): Array<Users> { 
    return [...state.users, ...state.createdUsers];
  },
  singleUser(state: State): Users | undefined {
    return state.singleUser
  },
  responseAPI(state: State): ResponseAPI | undefined { 
    return state.responseAPI;
  },
};

const mutations = <MutationTree<State>>{
    dataLoad(state: State, payload: ResponseAPI) {
      state.responseAPI = payload;
      state.users = payload.data as unknown as Array<Users>;
      state.supportApi = payload.support;
    },
    getSingleUser(state: State, payload: SingleUser) {
      state.supportApi = payload.support;
      state.singleUser = payload.data as unknown as Users;
    },
    clearSingleUser(state: State) {
      state.singleUser = undefined;
      state.supportApi = undefined;
    },
    deleteUserInClient(state: State, id: number) {
      state.users = state.users.filter((el: Users) => el.id !== id);
      state.createdUsers = state.createdUsers.filter((el: Users) => el.id !== id)
    },
    appendCreatedUser(state: State, user: Users) {
      state.createdUsers.push(user)
    }
};

const actions = <ActionTree<State, any>>{
  fetchUsers({ commit }, page: number) {
    $api({
      method: 'GET',
      url: 'users',
      params: {
        "page": page,
        "per_page": 5,
      },
    }).then((response: any) => { 
      commit('dataLoad', response.data);
    })
  },
  fetchSingleUser({ commit }, id: number) {
    commit('clearSingleUser');
    $api.get(`users/${id}`).then((response: any) => {
      commit('getSingleUser', response.data);
    })
  },
  deleteUser({ commit }, id: number) {
    $api.delete(`users/${id}`).then(() => {
      commit('deleteUserInClient', id);
    });
  },
  createUser({ commit }, user: Users){
    $api.post('users', {
      "email": user.email,
      "first_name": user.first_name,
      "last_name": user.last_name,
    }).then((response: any) => {      
      const newUser: Users  = { ...user, id: response.data.id}
      commit('appendCreatedUser', newUser);
    });
  }
};

export const store = createStore<State>({
  state: {
    users: [],
    createdUsers: [],
    responseAPI: undefined,
    supportApi: undefined,
    singleUser: undefined,
  },
  mutations,
  actions,
  getters
})

export function useStore() {
  return baseUseStore(key)
}

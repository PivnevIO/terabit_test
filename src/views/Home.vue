<template>
  <div class="home-page">
    <h1>{{$route.name}}</h1>
    <div class="users-list">
      <div class="sort-list">
        <Icons v-if="upDown" :IconsData="{ iconName: 'arrow-up-z-a', actionParams: false }" @onClick="setUpDown"/>
        <Icons v-if="!upDown" :IconsData="{ iconName: 'arrow-down-z-a', actionParams: true }" @onClick="setUpDown"/>
        <input type="text" v-model="searchStr" placeholder="поиск...">
        <Icons :IconsData="{ iconName: 'user-plus', actionParams: true }" @onClick="addUser"/>
      </div>
      <div class="user" v-for="user in sortUsers(upDown)" :key="user.id">
        <div class="user-photo">
          <img v-if="user.avatar" :src="user.avatar" alt="" srcset="">
          <img v-else src="@/assets/user.png" alt="" srcset="">
        </div>
        <div class="user-info">
          <div class="info">
            <router-link class="router-link" :to="`/users/${user.id}`" exact>{{userFullName(user.id)}}</router-link>
            <a class="user-email" :href="`mailto:${user.email}`">{{user.email}}</a>
          </div>
          <Icons :IconsData="{ iconName: 'trash', actionParams: user.id }" @onClick="deleteUser"/>
        </div>
      </div>
    </div>

    <div class="pagination">
      <Icons :IconsData="{
        actionParams: false,
        iconName: 'angle-left',
        disabled: page === 1
      }" @onClick="setPage"/>
      <Icons :IconsData="{ 
        iconName: 'angle-right',
        actionParams: true,
        disabled: page === totalPages
      }" @onClick="setPage"/>
    </div>
  </div>
  <font-awesome-icon icon="fa-solid fa-angle-right" />
  <font-awesome-icon icon="fa-solid fa-angle-left" />
  <!-- <font-awesome-icon icon="fa-solid fa-user-plus" /> -->
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { Users } from '@/models/api'
import { computed, ComputedRef, ref, Ref } from 'vue';
import router from '@/router';
const store = useStore();

const upDown: Ref = ref(true);
const searchStr: Ref = ref("");
const page: Ref = ref(store.getters.responseAPI?.page || 1);
const totalPages: ComputedRef = computed(() => store.getters.responseAPI?.total_pages);


const userFullName = (id: number | undefined): string => {
  const user: Users = store.getters.users.find((el: Users) => {
    return el.id === id;
  });
  return `${user.first_name} ${user.last_name}` || "";
};

const filterData = (searchStr: string): Array<Users> => {
  if (!store.getters.users) return [];
  return store.getters.users?.filter((itm: any) => {
    for (const key in itm) {
      if (!searchStr) {
        if (String(itm[key]).indexOf(searchStr) !== -1) {
          return itm;
        }
      } else {
        if (String(itm[key]).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
          return itm;
        }
      }
    }
  });
}

const sortUsers = (upDown: boolean): Array<Users> => {  
  return filterData(searchStr.value).sort((a: any, b: any) => {
    const nameA = a.last_name?.toLowerCase();
    const nameB = b.last_name?.toLowerCase();
    if(upDown){
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    }else{
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    }
    return 0;
  });
}

const setPage = (incDec: boolean): void => {
  page.value = incDec ? page.value+1 : page.value-1;
  store.dispatch('fetchUsers', page.value);
}

const setUpDown = (upDownVal: boolean): void => {
  upDown.value = upDownVal;
}

const addUser = (): void => {  
  router.push('/users')
}

const deleteUser = (id: number): void => {
  store.dispatch('deleteUser', id);
}

</script>

<style lang="scss">
.users-list{
  min-height: 600px;
  display: flex;
  flex-direction: column;
  .sort-list{
    margin-bottom: 1em;
    display: flex;
    align-items: stretch;
    padding: 0 0.1em;
    input {
      margin: 0 0.5rem;
    }
  }
  .user{
    display: flex;
    margin-bottom: 0.3rem;
    background: rgb(61, 61, 61);
    padding: 0.5rem 1em;
    border-radius: 0.5rem;
    .user-photo {
      background:  #ccc;
      border-radius: 5em;
      margin: 0;
      padding: 0.2rem;
      img {
        height: 5rem;
        width: 5rem;
        display: block;
        border-radius: 3em;
      }
      svg {
        height: 5rem;
        width: 5rem;
        display: block;
        border-radius: 3em;
        color: #10425a;
      }
    }
    .user-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1em;
        .user-email {
          font-size: 0.75rem;
          color: rgba(204, 204, 204, 0.561)
        }
        a{
          color: #ccc;
          text-decoration: none;
          transition: 0.3s;
          &:hover{
            color: #66ccff;
          }
        }
      }
    }
  }
}
.pagination{
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div id="app">
    <nav>
      <router-link class="router-link" to="/" exact>Home</router-link>
    </nav>
    <div class="page">
      <router-view />
    </div>
    <footer>
      <div>
        123321
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
useStore().dispatch('fetchUsers', 1);
</script>

<style lang="scss">
$content-width: 65%;
$body-dark-color: #CCC;
$dark-bgcolor: #1d1d1d;
$nav-dark-bgcolor: #252525;
$link-hover-effect-color: #66ccff;
* {
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  font: 1rem FontSiteSansBoldCondensed, Verdana, Helvetica, Arial, sans-serif;
}

button {
  padding: calc(0.5em - 1px) 1em calc(0.5em - 1px) 1em;
  background-color: transparent;
  border: 1px solid $link-hover-effect-color;
  border-radius: 0.3em;
  justify-content: center;
  color: $link-hover-effect-color;
  cursor: pointer;
  font-size: .75rem;
  text-align: center;
  white-space: nowrap;
  &:hover {
    background-color: $link-hover-effect-color;
    border-color: $link-hover-effect-color;
    color: #fff;
  }
  &:disabled{
    background-color: #3e8ed0;
    color: #ffffff45;
  }
  &:hover:disabled{
    background-color: #3e8ed0;
    color: #ffffff45;
  }
}

input, textarea {
  padding: calc(0.5em - 1px) calc(0.75em - 1px) calc(0.5em - 1px) calc(0.75em - 1px);
  background-color: #fff;
  border-color: #dbdbdb;
  border-radius: 0.375em;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  position: relative;
  font-size: .75rem;
  color: #363636;
  line-height: 1.5;
  width: 100%;
}

::-webkit-scrollbar {
    width: 0.4em;
}

::-webkit-scrollbar-track {
    background-color: $dark-bgcolor;
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px $nav-dark-bgcolor;
    height: 3.2em;
}

body{
  background: $dark-bgcolor;
  color: $body-dark-color;
}

#app{
  & > nav {
    display: flex;
    position: fixed;
    padding: 0.5em 5em 0.5em 0;
    width: 100%;
    background: $nav-dark-bgcolor;
    justify-content: flex-end;
    a.router-link-active{
      color: $link-hover-effect-color;
    }
    a {
      color: #FFF;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 0.5em 0.7em;
      transition: all 1s cubic-bezier(0.25,1,0.25,1);
      
      &:link {
        color: $link-hover-effect-color;
        font-weight: bold;
        text-decoration: none;
      }
      &:hover {
        color: $link-hover-effect-color;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
  .page{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4rem 1rem;
    h1 {
      margin-bottom: 1rem;
      font-size: smaller;
    }
    & > div{
      padding-top: 2em;
      width: $content-width;
    }
  }
  footer {
    display: flex;
    justify-content: center;
    background: $nav-dark-bgcolor;
    position: fixed;
    bottom: 0;
    width: 100%;
    & > div {
      padding: 1rem;
    }
  }
}
</style>

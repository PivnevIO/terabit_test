import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store, key } from '@/store'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Icons from "@/components/Icons.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App);
app.config.warnHandler = () => {};

library.add(fas, far, fab)

app.component("Icons", Icons);
app.component("faIcons", FontAwesomeIcon)


app.use(store, key).use(router).mount('#app')

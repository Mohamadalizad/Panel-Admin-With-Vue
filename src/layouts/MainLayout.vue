<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" >ناب بلاگ</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          
            <v-text-field v-model="searchView" @keydown.enter="search" class="mt-5" label="جستجو کن"></v-text-field>

        </template>
        <v-btn icon="mdi-account" @click="$router.push('/admin')" variant="text"></v-btn>

      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        permonent
        position="right"
        theme="dark"
      >
        <v-list>
            <router-link v-slot="{isExacteActive}" v-for="item in categories" :key="item" :to="`/search?categorySlug=${item.slug}`">
                <v-list-item :active="isExacteActive" prepend-icon="mdi-view-dashboard" value="dashboard" :title="item.title" repple></v-list-item>
            </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <div class="px-7 py-7">
        <transition mode="out-in">
        <router-view></router-view>
        </transition>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
import { GetCategories } from "@/Services/CategoryService";
export default {
  data: () => ({
    drawer: false,
    categories: [],
    searchView:"",
  }),

  methods:{
    search(){
      this.$router.push({path:"/search", query:{q:this.searchView} })
    }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    this.searchView = this.$route.query.q;
    GetCategories().then((res) => {
      if (res.status === 200) {
        this.categories = res.data;
      }
    });
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
.v-toolbar__content {
  direction: rtl !important;
}
.v-main {
  direction: rtl !important;
}
</style>
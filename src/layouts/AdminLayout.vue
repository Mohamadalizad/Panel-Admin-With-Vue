<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>پنل ادمین</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-chevron-left" @click="$router.back()" variant="text"></v-btn>
            <v-btn @click="$router.push('/')" icon="mdi-home"></v-btn>
        </template>


      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        permonent
        position="right"
        theme="dark"
      >
        <v-list>
            <router-link to="/admin" v-slot="{isExacteActive}">
                <v-list-item prepend-icon="mdi-view-dashboard" :active="isExacteActive" value="dashboard" title="Dashboard" v-repple></v-list-item>
            </router-link>
            <router-link v-slot="{isExacteActive}" to="/admin/posts">
                <v-list-item :active="isExacteActive" prepend-icon="mdi-file-outline" value="posts" title="مدیریت پست ها" v-repple></v-list-item>
            </router-link>
            <router-link v-slot="{isExacteActive}" to="/admin/users" >
                <v-list-item :active="isExacteActive" prepend-icon="mdi-account-box" value="users" title="لیست کاربران" v-repple></v-list-item>
            </router-link>
            <router-link v-slot="{isExacteActive}" to="/admin/categories">
                <v-list-item :active="isExacteActive" prepend-icon="mdi-adjust" title="لیست دسته بندی ها" v-repple></v-list-item>
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
  export default {
    data: () => ({
      drawer: true,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
<style scoped>
a{
    text-decoration: none;
    color: white;
}
.v-toolbar__content{
  direction: rtl !important;
}
.v-main{
  direction: rtl !important;
}
.v-list-item--active{
  color: white;
}
</style>
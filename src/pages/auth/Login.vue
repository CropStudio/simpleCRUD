<template>
  <q-page class="flex content-center justify-center " padding>
    <div class="row">
        <div class="col">
            <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
            <q-card align="center" class="q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card-section>
            <q-img src="https://cdn.freebiesupply.com/logos/large/2x/expedition-1-logo-png-transparent.png" style="height: 150px; max-width: 150px"/>
            <p class="text-h5 text-weight-light">Masuk</p>
            <p class="q-mb-lg">
              untuk melanjutkan ke dalam aplikasi
              <span
                class="text-weight-bold text-red"
              >(staff area)</span>
            </p>
            <q-input
              v-model="form.username"
              type="text"
              ref="username"
              class="q-mr-md q-ml-md"
              outlined
              label="Username"
              :rules="[
              val => !!val || 'Username dibutuhkan..',
              ]"
            />
            <q-input
              class="q-mr-md q-ml-md"
              v-model="form.password"
              outlined
              ref="password"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              :rules="[
              val => !!val || 'Password dibutuhkan..',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <!-- <p>Daftar</p> -->
            <q-toolbar class="bg-white">
              <q-space/>
              <q-btn color="primary"  type="submit" text-color="white" label="MASuk"/>
            </q-toolbar>
            <div class="text-right">
              <router-link
                style="text-decoration:none"
                to="/auth/reset"
                exact
                class="text-primary text-weight-bold q-mt-md q-mr-md text-right"
              >Lupa kata sandi ?</router-link>
            </div>
          </q-card-section>
          <q-inner-loading :showing="visible">
            <q-spinner-dots size="50px" color="primary"/>
          </q-inner-loading>
        </q-card>
            </q-form>
        </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: '',
      isPwd: true,
      visible: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.visible = true
      this.$axios.post('login', {
        username: this.form.username,
        password: this.form.password
      })
        .then((response) => {
          this.visible = false
          if (response.data.success) {
            this.$q.notify({
              color: 'positive',
              message: response.data.message,
              icon: 'ion-checkmark'
            })
            const token = response.data.data.api_token
            this.$q.cookies.set('token', token, { expires: 10, path: '/' })
            setTimeout(() => {
              this.$router.go('/')
            }, 1000)
          } else {
            this.$q.notify({
              color: 'negative',
              message: response.data.message,
              icon: 'ion-close'
            })
          }
        })
    }
  }
}
</script>

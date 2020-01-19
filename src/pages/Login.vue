<template>
  <div class="full-width full-height">
    <div class="bg-gradient">
      <div class="absolute-center">
        <q-card class="my-card login-card text-center">
          <q-card-section>
            <div class="q-mt-sm">
              <q-img class="logo-uaq" src="assets/logo-uaq.png" />
            </div>
            <h5 class="text-weight-medium text-primary q-my-sm">Inicio de sesión</h5>
          </q-card-section>

          <q-card-section class="full-width q-px-xl">
            <q-form @submit="login" class="q-gutter-xs">
              <div v-if="error">
                <q-banner inline-actions class="text-white bg-red-7">
                  Ocurrió un error, intentalo de nuevo
                </q-banner>
              </div>

              <q-input dense rounded outlined  v-model="claveEmpleado" label="Clave de empleado" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Completa el campo']">
                <template v-slot:prepend>
                  <q-icon name="eva-person-outline" />
                </template>
              </q-input>

              <q-input dense rounded outlined class="q-pb-xs" type="password" v-model="password" label="Contraseña"
                lazy-rules :rules="[ val => val && val.length > 0 || 'Completa el campo']">
                <template v-slot:prepend>
                  <q-icon name="eva-lock-outline" />
                </template>
              </q-input>

              <!--<div class="float-left q-mb-sm">
                <q-checkbox v-model="recordarme" label="Recordarme" />
              </div>-->
              <div class="q-pt-md">
                <q-btn rounded class="btn-login" label="Entrar" type="submit" color="primary" no-caps />
              </div>
            </q-form>
          </q-card-section>

          <q-card-section>
            <div>
              <q-img class="logo-cd" src="assets/logo-cd.png" />
            </div>
            Centro de desarrollo {{ year }}
          </q-card-section>
        </q-card>

        <!--<div v-for="(item, index) in loginData" :key="index">
          <p>{{item.token}}</p>
          <p>{{ item.message  }}</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { loginQuery } from '../services/graphql/queries'
import { apolloClient } from '../boot/vue-apollo'

export default {
  name: 'PageLogin',
  data () {
    return {
      claveEmpleado: undefined,
      password: undefined,
      recordarme: false,
      loginData: undefined,
      error: false,
      errMsg: undefined,
      year: undefined
    }
  },
  mounted () {
    this.year = new Date().getFullYear()
  },
  methods: {
    login () {
      this.loginData = apolloClient.query({
        query: loginQuery,
        variables: {
          clave: this.claveEmpleado,
          password: this.password
        }
      })
      this.loginData.then(
        res => {
          localStorage.setItem('scd-at', res.data.login.token)
          window.location.href = '/'
        })
        .catch(
          err => {
            console.log(err.message)
            console.log(err)
            this.error = true
            this.errMsg = err
          })
    }
  }
}
</script>

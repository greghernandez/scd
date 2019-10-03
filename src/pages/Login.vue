<template>
  <div class="row justify-center items-center content-center">
    <q-card class="my-card login-card text-center">
      <q-card-section>
        <div class="q-mt-sm">
          <q-img class="logo-uaq" src="assets/logo-uaq.png" />
        </div>
        <h5 class="text-weight-medium text-primary q-my-sm">Inicio de sesión</h5>
      </q-card-section>
      <q-card-section class="full-width q-px-xl">
        <q-form
          @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
          <q-input dense rounded outlined class="" v-model="claveEmpleado" label="Clave de empleado" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Completa el campo']">
            <template v-slot:prepend>
              <q-icon name="eva-person-outline"/>
            </template>
          </q-input>

          <q-input dense rounded outlined class="q-pb-xs" type="password" v-model="password" label="Contraseña" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Completa el campo']" >
            <template v-slot:prepend>
              <q-icon name="eva-lock-outline"/>
            </template>
          </q-input>

          <div class="float-left q-mb-sm">
            <q-checkbox v-model="recordarme" label="Recordarme" />
          </div>

          <div>
            <q-btn rounded class="btn-login" label="Entrar" type="submit" color="primary" no-caps />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <div>
          <q-img class="logo-cd" src="assets/logo-cd.png" />
        </div>
        Centro de desarrollo 2019
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      claveEmpleado: undefined,
      password: undefined,
      recordarme: false
    }
  }
}
</script>

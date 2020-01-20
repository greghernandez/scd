<template>
  <div>
    <q-card class="my-card col-12">
      <q-card-section class="row justify-betwen items-center">
        <div class="col-md-4 col-sm-12 row justify-betwen items-center">
          <div class="col-4">
            <q-avatar class="avatar-img" size="80px">
              <img src="https://picsum.photos/200">
            </q-avatar>
          </div>
          <div class="col-8">
            <div class="column">
              <div class="text-subtitle2">Nombre:</div>
              <div>
                {{ name }} {{ lastName }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <div>Adscripción:</div>
          <div>{{ adscription }}</div>
        </div>
        <div class="col-md-2 col-sm-6 col-xs-6">Documentos totales</div>
        <div class="col-md-2 col-sm-6 col-xs-6">puntos totales</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { payload } from '../services/user'

export default {
  name: 'PerfilDocente',
  data () {
    return {
      name: undefined,
      lastName: undefined,
      adscription: undefined
    }
  },
  methods: {
    ...mapActions({
      documentosQuery: 'docentes/actions'
    })
  },
  mounted () {
    this.$store
      .dispatch('docentes/userData', payload.userId)
      .then(res => {
        this.name = res.data.user.name
        this.lastName = res.data.user.lastName
        this.adscription = res.data.user.adscription.name
      })
      .catch(err => (console.log(err)))
  }
}
</script>

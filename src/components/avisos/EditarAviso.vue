<template>
  <q-dialog ref="dialog" v-model="confirm">
    <q-card class="my-modal">
      <q-card-section>
        <div class="text-h6">Editar Aviso</div>
      </q-card-section>

      <q-card-section>
        <template v-slot="body">
          <div>
            <q-form class="q-gutter-xs">
              <q-input outlined v-model="title" type="text" label="Titulo del aviso" lazy-rules dense
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']" />

              <q-input outlined v-model="description" type="textarea" label="Descripción del aviso" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']" />

              <q-input outlined v-model="link" type="text" label="Link" lazy-rules dense
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']" />

              <div class="row">
                <div class="col-6 q-pr-sm">
                  <span>Fecha de inicio:</span>
                  <q-input outlined v-model="fromDate" dense mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="fromDate" :locale="myLocale" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-6">
                  <span>Fecha de vencimiento:</span>
                  <q-input outlined v-model="toDate" dense mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="toDate" :locale="myLocale" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <input type="file" :v-model="file" @change="loadPhoto($evennoticeUpdateMutationt.target.files[0])">
              <q-card-actions align="right">
                <q-btn class="my-btn" unelevated rounded outline label="Cancelar" color="primary" dense v-close-popup
                  @click="onCancelClick()" no-caps />
                <q-btn class="my-btn" unelevated rounded label="Guardar Aviso" color="primary" dense v-close-popup
                  @click="updateNotice()" no-caps />
              </q-card-actions>
            </q-form>
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// vuex
import { mapActions } from 'vuex'
// import { payload } from '../../services/user'
import { date } from 'quasar'

export default {
  name: 'ModalCrearAviso',
  data () {
    return {
      title: '',
      description: '',
      link: '',
      fromDate: '',
      toDate: '',
      file: undefined,
      confirm: false,
      newNotice: undefined,
      timeStamp: 'null',
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return 'NA'
      value = date.formatDate(value, 'YYYY-MM-DD')
      return value
    }
  },
  mounted () {
    console.log('id', this.id)
    this.$store
      .dispatch('avisos/avisoQuery', this.id)
    this.title = this.aviso.title
    this.description = this.aviso.body
    this.link = this.aviso.link
    this.fromDate = date.formatDate(this.aviso.fromDate, 'YYYY-MM-DD')
    this.toDate = date.formatDate(this.aviso.toDate, 'YYYY-MM-DD')
  },
  computed: {
    aviso () {
      return this.$store.state.avisos.aviso
    }
  },
  methods: {
    ...mapActions({
      notices: 'avisos/actions',
      updateNotice: 'avisos/updateAviso'
    }),
    loadPhoto (file) {
      this.file = file
    },
    updateNotice () {
      this.$store
        .dispatch('avisos/updateAviso', {
          title: this.title,
          body: this.description,
          status: 1,
          link: this.link,
          fromDate: parseFloat(date.formatDate(this.fromDate, 'x')),
          toDate: parseFloat(date.formatDate(this.toDate, 'x')),
          // createdBy: payload.userId,
          _index: this.index,
          id: this.id,
          file: this.file
        })
        .then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'eva-checkmark-circle-outline',
            message: 'Se editó correctamente el aviso'
          })
          this.$store
            .dispatch('avisos/avisoQuery', this.id)
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            color: 'positive',
            icon: 'eva-alert-triangle-outline',
            message: 'Ocurrió un error, intentalo de nuevo'
          })
        })
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      console.log('Ok')
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

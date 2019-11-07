<template>
  <q-dialog ref="dialog" v-model="confirm" persistent>
    <q-card class="my-modal">
      <q-card-section>
        <div class="text-h6">Crear Aviso</div>
      </q-card-section>

      <q-card-section>
        <template v-slot="body">
          <div>
            <q-form
              class="q-gutter-xs"
            >
              <q-input
                outlined
                v-model="title"
                type="text"
                label="Titulo del aviso"
                lazy-rules
                dense
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']"
              />
              <q-input
                outlined
                v-model="description"
                type="textarea"
                label="Descripción del aviso"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']"
              />
              <q-input
                outlined
                v-model="link"
                type="text"
                label="Link"
                lazy-rules
                dense
                :rules="[ val => val && val.length > 0 || 'Debes completar este campo']"
              />
              <q-input outlined v-model="fromDate" dense mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fromDate" @input="() => $refs.qDateProxy.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- <q-input
                @input="val => { file = val[0] }"
                outlined
                type="file"
              /> -->
              <input type="file" :v-model="file" @change="loadPhoto($event.target.files[0])">
              <q-card-actions align="right">
                <q-btn class="my-btn" unelevated rounded outline label="Cancelar" color="primary" dense v-close-popup
                       @click="onCancelClick()" no-caps/>
                <q-btn class="my-btn" unelevated rounded label="Guardar Aviso" color="primary" dense v-close-popup
                       @click="createNotice()" no-caps/>
              </q-card-actions>
            </q-form>
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { apolloClient } from '../../boot/vue-apollo'
import { noticeCreateMutation } from '../../services/graphql/mutations'

export default {
  name: 'ModalCrearAviso',
  data () {
    return {
      title: '',
      description: '',
      link: '',
      fromDate: '',
      file: undefined,
      confirm: false,
      newNotice: undefined
    }
  },
  methods: {
    loadPhoto (file) {
      this.file = file
    },
    createNotice () {
      // read user token
      const token = localStorage.getItem('scd-at') || null
      var playload = JSON.parse(atob(token.split('.')[1]))

      apolloClient.mutate({
        mutation: noticeCreateMutation,
        variables: {
          file: this.file,
          input: {
            title: this.title,
            body: this.description,
            status: 1,
            link: this.link,
            fromDate: 11111111111,
            toDate: 99999999999,
            createdBy: playload.userId
          }
        },
        context: {
          hasUpload: true
        }
      })
        .then(
          res => {
            // console.log(res.data.createNotice)
            this.$emit('newNotice', res.data.createNotice)
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se creo correctamente el aviso'
            })
          })
        .catch(
          err => {
            console.error(err)
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

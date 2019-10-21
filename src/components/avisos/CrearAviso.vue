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
              <q-input
                @input="val => { file = val[0] }"
                outlined
                type="file"
              />
              <q-card-actions align="right">
<!--                <ApolloMutation-->
<!--                  :mutation="gql => gql`-->
<!--                    mutation CreateNotice($input: InputNotice!) {-->
<!--                      createNotice(input: $input) {-->
<!--                        _id-->
<!--                      }-->
<!--                    }-->
<!--                  `"-->
<!--                  :variables="{-->
<!--                    input: {-->
<!--                      title: body.title,-->
<!--                      body: body.description,-->
<!--                      status: 1,-->
<!--                      link: body.link,-->
<!--                      imgLink: 'src',-->
<!--                      fromDate: body.fromDate,-->
<!--                      toDate: body.fromDate,-->
<!--                      createdBy: 'yo'-->
<!--                    }-->
<!--                  }"-->
<!--                >-->
<!--                  <template v-slot="{ mutate, loading, error }">-->
<!--                    <button :disabled="loading" @click="mutate()">Click me</button>-->
<!--                    <p v-if="error">An error occurred: {{ error }}</p>-->
<!--                  </template>-->
<!--                </ApolloMutation>-->
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
      confirm: false,
      newNotice: undefined
    }
  },
  methods: {
    createNotice () {
      apolloClient.mutate({
        mutation: noticeCreateMutation,
        variables: {
          input: {
            title: 'this.title',
            body: 'this.description',
            status: 1,
            link: 'this.link',
            imgLnk: 'src',
            fromDate: 11111111111,
            toDate: 99999999999,
            createdBy: '5dadf9dfd0cd0a1031b3652e'
          }
        }
      })
        .then(data => console.log(data))
        .catch(error => console.error(error))
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

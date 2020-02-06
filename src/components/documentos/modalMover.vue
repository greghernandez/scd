<template>
  <q-dialog ref="dialog" v-model="alertAviso">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          Rubros
        </div>
        <q-list>
          <q-separator />

          <q-expansion-item v-for="(item, index) in categorias" :key="index" group="somegroup" icon="eva-book-outline"
            :label="item.title" header-class="text-primary">
            <q-card>
              <q-card-section>
                <div v-for="(children, index) in item.children" :key="index">
                  <q-expansion-item v-if="(children.value == null)" switch-toggle-side :label="children.title">
                    <q-card>
                      <q-card-section>
                        <q-item v-for="(children, index) in children.children" :key="index" tag="label" v-ripple>
                          <q-item-section side top>
                            <q-radio v-model="newCat" :val="children._id" :disable="(children._id === SelectedCategory.catId)" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label>{{ children.title }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-separator />

                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-item v-else tag="label" v-ripple>
                    <q-item-section side top>
                      <q-radio v-model="newCat" :val="children._id" :disable="(children._id === SelectedCategory.catId)" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ children.title }}</q-item-label>
                    </q-item-section>
                  </q-item>

                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

        </q-list>

        <q-separator />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()"
          no-caps />
        <q-btn rounded unelevated dense :disable="(newCat == '')" label="Mover aquí" color="primary" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { apolloClient } from '../../boot/vue-apollo'
import { categoriesQueryTreeMover } from '../../services/graphql/queries'
import { categoryType, rubros } from '../../../enviroment.dev'
import { mapActions } from 'vuex'
import { payload } from '../../services/user'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false,
      categorias: [],
      newCat: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    objId: {
      type: String
    },
    oids: {
      type: Array
    },
    isMultiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      documentos: 'documentos/actions'
    }),
    isActive (id) {
      if (id === this.objId) {
        return true
      } else {
        return false
      }
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      // MoveDocument action
      if (this.newCat) {
        if (!this.isMultiple) {
          this.$store.dispatch('documentos/moverDocumento', {
            doc: this.objId,
            cat: this.newCat,
            user: payload.userId
          })
            .then(res => {
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se movió correctamente el documento seleccionado'
              })
              // if the document is in pending documents, we not change points state
              if (this.$route.name !== 'pendientes') {
                // Update the card points and the total points of the user
                this.$store.commit('documentos/updatePoints', {
                  mode: 'move',
                  catId: this.SelectedCategory.catId,
                  newCat: this.newCat,
                  points: this.SelectedCategory.catDocValue,
                  movedCount: 1
                })
              }
              // update total points
              this.$store
                .dispatch('documentos/inspectCategory', {
                  user: payload.userId,
                  category: rubros.todos,
                  reset: false
                })
                .then(res => {
                  this.$store.commit('documentos/setTotalPoints', res.data.inspectCategory.totalValue)
                })
            })
            .catch(err => {
              this.$q.notify({
                color: 'negative',
                icon: 'eva-alert-triangle-outline',
                message: 'Ocurrió un error, intentalo de nuevo'
              })
              console.log(err)
            })
        } else {
          this.$store.dispatch('documentos/moverDocumentos', {
            oids: this.oids,
            cat: this.newCat
          })
            .then(res => {
              console.log(res)
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se movierón correctamente los documentos seleccionados'
              })
              // if the document is in pending documents, we not change points state
              if (this.$route.name !== 'pendientes') {
                // Update the card points and the total points of the user
                this.$store.commit('documentos/updatePoints', {
                  mode: 'move',
                  catId: this.SelectedCategory.catId,
                  newCat: this.newCat,
                  points: this.SelectedCategory.catDocValue,
                  movedCount: res.data.moveMultipleDocuments.qty
                })
              }
              // update total points
              this.$store
                .dispatch('documentos/inspectCategory', {
                  user: payload.userId,
                  category: rubros.todos,
                  reset: false
                })
                .then(res => {
                  this.$store.commit('documentos/setTotalPoints', res.data.inspectCategory.totalValue)
                })
            })
            .catch(err => {
              this.$q.create({
                color: 'negative',
                icon: 'eva-alert-triangle-outline',
                message: 'Ocurrió un error, intentalo de nuevo'
              })
              console.log(err)
            })
        }
        // send
        this.$emit('ok')
        this.hide()
      } else {
        alert('Tienes que seleccionar una categoría para poder mover tus archivos')
      }
    },
    onCancelClick () {
      this.hide()
    }
  },
  mounted () {
    apolloClient.query({
      query: categoriesQueryTreeMover,
      variables: {
        page: 0,
        perPage: 0,
        type: categoryType.rootCategories
      }
    })
      .then(res => {
        this.categorias = res.data.categories
      })
  },
  computed: {
    SelectedCategory () {
      return this.$store.state.documentos.selectedCat
    }
  }
}
</script>

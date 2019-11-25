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
                            <q-radio v-model="newCat" :val="children._id"/>
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
                      <q-radio v-model="newCat" :val="children._id" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ item.title }}</q-item-label>
                    </q-item-section>
                  </q-item>

                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

        </q-list>

        <q-separator />
        <div>
          <p>{{ newCat }}</p>
        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()"
          no-caps />
        <q-btn rounded unelevated dense label="Mover aquí" color="primary" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { apolloClient } from '../../boot/vue-apollo'
import { categoriesQueryTreeMover } from '../../services/graphql/queries'
import { categoryType } from '../../../enviroment.dev'
import { mapActions } from 'vuex'
// import { MOVE_DOCUMENT } from '../../services/graphql/mutations'

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
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      documentos: 'documentos/actions'
    }),
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
      this.$store.dispatch('documentos/moverDocumento', {
        doc: this.objId,
        cat: this.newCat
      })
      console.log('Ok')
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
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
        console.log(res.data)
      })
  }
}
</script>

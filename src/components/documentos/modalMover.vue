<template>
  <q-dialog ref="dialog" v-model="alertAviso" persistent>
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

          <q-expansion-item group="somegroup" icon="eva-book-outline" label="First" header-class="text-primary">
            <q-card>
              <q-card-section>
                contenido
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="eva-book-outline" label="Trabajos de investigación" header-class="text-primary">
            <q-card>
              <q-card-section>
                <q-expansion-item switch-toggle-side dense-toggle label="Articulos cientificos publicados en revistas">
                  <q-card>
                    <q-card-section>
                      <q-item tag="label" v-ripple>
                        <q-item-section side top>
                          <q-checkbox v-model="check1" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item tag="label" v-ripple>
                        <q-item-section side top>
                          <q-checkbox v-model="check2" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item tag="label" v-ripple>
                        <q-item-section side top>
                          <q-checkbox v-model="check3" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</q-item-label>
                        </q-item-section>
                      </q-item>

                    </q-card-section>
                  </q-card>
                </q-expansion-item>
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
        <q-btn rounded unelevated dense label="Mover aquí" color="primary" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false
    }
  },
  props: {
    title: String
  },
  methods: {
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
      console.log('Ok')
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      this.hide()
    }
  }
}
</script>

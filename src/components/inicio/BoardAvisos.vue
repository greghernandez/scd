<template>
  <q-card id="boardavisos" flat class="notices-card flat">
    <q-infinite-scroll @load="onLoad" :offset="250" :scroll-target="$refs.debounced">
      <q-card-section>
        <div class="row items-center text-secondary">
          <q-icon size="sm" name="eva-alert-triangle-outline q-mr-sm" />
          <h5 class="text-weight-bold q-my-none">Avisos</h5>
        </div>
        <!-- cards con los avisos -->
        <q-card v-for="(notices, index) in noticesData" :key="index" class="my-card q-my-md">
          <NoticeCard :title="notices.title" :body="notices.body" :img="notices.imgLnk" ></NoticeCard>
        </q-card>
        <template name="loading" v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-card-section>
    </q-infinite-scroll>
  </q-card>
</template>

<script>
import NoticeCard from './NoticeCard'
import { noticesQuery } from '../../services/graphql/queries'
import { apolloClient } from '../../boot/vue-apollo'

export default {
  name: 'BoardAvisos',
  components: {
    NoticeCard
  },
  data () {
    return {
      noticesData: []
    }
  },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        apolloClient.query({
          query: noticesQuery,
          variables: {
            page: 0,
            perPage: 3,
            status: 1
          }
        })
          .then(
            res => {
              this.noticesData = res.data.notices
              console.log(this.noticesData)
              console.log('------------')
              done(true)
            }, 2000)
      })
    }
    /* onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
    } */
  }
}
</script>

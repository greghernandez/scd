<template>
  <q-card id="boardavisos" flat class="notices-card flat">
    <q-card-section>
      <div class="row items-center text-secondary">
        <q-icon size="sm" name="eva-alert-triangle-outline q-mr-sm" />
        <h5 class="text-weight-bold q-my-none">Avisos</h5>
      </div>
      <!-- cards con los avisos -->
      <q-infinite-scroll @load="onLoad" :offset="250">
        <q-card v-for="n in 7" :key="n" class="my-card q-my-md">
          <NoticeCard></NoticeCard>
        </q-card>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-card-section>
  </q-card>
</template>

<script>
import NoticeCard from './NoticeCard'

export default {
  name: 'BoardAvisos',
  components: {
    NoticeCard
  }
}
</script>

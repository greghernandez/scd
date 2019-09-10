<template>
    <div>
        <h2>Graph</h2>
        <div v-for="countries in countries" :key="countries.id" >
            <p>{{ countries.code }} - {{ countries.name }} - {{ countries.emoji }}</p>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    countries: gql`query {
        countries{
            code,
            name,
            emoji
        }
    }`
  },
  data () {
    return {
      countries: []
    }
  }
}
</script>

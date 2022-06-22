<template>
  <div v-if="isLoading">Load</div>
  <div v-else-if="error">Error</div>
  <div v-else data-testid="profile-info">
    <div>
      {{ post.userId }}
    </div>
    <div>
      {{post.body}}
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from 'vue'
import {fetchPosts} from "../api";

const isLoading = ref(false)
const error = ref(false)
const post = reactive({})

const fetch = async () => {
  try {
    isLoading.value = true
    const data = await fetchPosts()
    Object.assign(post, data)
  } catch (e) {
    error.value = true
  } finally {
    isLoading.value = false
  }

}
onMounted(function () {
  fetch()
})

</script>

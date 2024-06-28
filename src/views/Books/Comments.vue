<script setup>

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import DeleteComment from '@/views/Books/deleteComment.vue'

const route = useRoute()
const id = route.params.id

const comments = ref(null
)

onMounted(async () => {
  try {
    const res = await axios.get('http://101.37.20.150:8090/BookComment/select/' + id)
    comments.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

watch(
  () => route.params,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      try {
        const res = await axios.get('http://101.37.20.150:8090/BookComment/select/' + id)
        comments.value = res.data.data
        location.reload('BookContent.vue')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
)
</script>

<template>
  <div class="comment-container" style="background-color: white">
    <div class="title">评论区</div>
    <hr/>
    <div class="comments" v-for="item in comments" :key="item.id">
      <div class="comment">
        {{ item.comcontent }}
      </div>
      <div class="author">{{ item.user_name }}</div>
      <delete-comment v-if="item.user_name == $route.params.username" :id="item.id"/>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  min-height: 150px;
  border: 2px #000 solid;
  max-height: 600px;
}

.title {
  width: 120px;
  font-size: 30px;
  text-align: center;
}

.comments {
  max-height: 130px;
  margin-bottom: 5px;
}

.author {
  display: inline-block;
  align-content: center;
  padding-left: 5px;
}

.comment {
  align-content: center;
  padding-left: 5px;
}
</style>

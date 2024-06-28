<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
// eslint-disable-next-line no-undef
const commentID = defineProps({
  id: {
    type: String,
    required: true
  }
})

const deleteComment = async () => {
  const res = await axios.get('http://101.37.20.150:8090/BookComment/delete/' + commentID.id + '/' + route.params.username)
  if (res.data.code === '200') {
    alert(res.data.msg)
    location.reload('BookContent.vue')
  } else if (res.data.code === '500') {
    alert(res.data.msg)
  }
}
</script>

<template>
  <div class="bin" @click="deleteComment" title="删除评论">
    <el-icon>
      <Delete/>
    </el-icon>
  </div>
</template>

<style scoped>
.bin {
  display: inline-block;
  margin-left: 5px;
}

.bin:hover {
  cursor: pointer;
  color: darkred;
}
</style>

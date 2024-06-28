<script setup>
import TopHander from '@/views/Books/TopHander.vue'
import NoneTopHeader from '@/views/Books/noneTopHeader.vue'
import Comments from '@/views/Books/Comments.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const username = route.params.username

const Books = ref({
  bookName: null,
  author: null,
  publish: null,
  pubtime: null,
  content: null
})

const comments = reactive({
  user_name: null,
  comcontent: null,
  book_id: null
})

onMounted(async () => {
  try {
    const res = await axios.get('http://101.37.20.150:8090/BookItems/contentBook/' + id
    )
    Books.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

watch(
  () => route.params.id,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      try {
        const Books = await axios.get('http://101.37.20.150:8090/BookItems/contentBook/' + route.params.id)
        Books.value = Books.data.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
)

const SubComment = async async => {
  if (route.params.username != null) {
    comments.user_name = username
    comments.book_id = id
    const res = await axios.post('http://101.37.20.150:8090/BookComment/add', {
      user_name: comments.user_name,
      comcontent: comments.comcontent,
      book_id: comments.book_id
    })
    if (res.data.code === '200') {
      comments.comcontent = ''
      alert(`${res.data.msg}`)
      location.reload('BookContent.vue')
    } else {
      comments.comcontent = ''
      alert(`${res.data.msg}`)
    }
  } else {
    alert('按操作,请先进行注册')
  }
}
</script>

<template>
  <TopHander v-if="$route.params.username != null"/>
  <NoneTopHeader v-else-if="$route.params.username == null"/>
  <div class="limitBody" >
    <div class="book-container"  >
      <div class="title-container">{{Books.bookName}}</div>
      <div class="author-container">{{Books.author}}</div>
      <div class="publishing">{{Books.publish}}</div>
      <div class="publishing-time">{{Books.pubtime}}</div>
      <div class="bookContent">
        {{Books.content}}
      </div>
    </div>
    <div class="insert-comment">
      <el-form :model="comments">
        <h2>发表评论</h2>
        <el-form-item prop="comcontent">
          <textarea v-model="comments.comcontent" style="width: 480px;"></textarea>
        </el-form-item>
        <el-form-item class="butt">
          <el-button type="primary" @click="SubComment">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Comments/>
  </div>

</template>

<style scoped>
.limitBody {
  padding-top: 10px;
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
}

.book-container {
  display: inline-block;
  width: 700px;
  height: 500px;
  border: 1px solid black;
}

.book-container p{
  margin: 0 0;
}
.title-container {
  align-content: center;
  text-align: center;
  height: 72px;
  position: relative;
  font-size: 40px;
  font-weight: 700;
}

.author-container {
  display: inline-block;
  align-content: center;
  text-align: center;
  width: 350px;
  height: 64px;
  position: relative;
  font-size: 30px;
}

.publishing {
  display: inline-block;
  width: 200px;
  height: 64px;
  align-content: center;
  text-align: center;
  font-size: 20px;
}

.publishing-time {
  display: inline-block;
  width: 150px;
  height: 64px;
  align-content: center;
  text-align: center;
}

.insert-comment{
  position: absolute;
  width: 500px;
  height: 500px;
  display: inline-block;
  border: 1px solid black;
}

h2 {
  align-content: center;
  text-align: center;
}
.butt{
  align-content: center;
  text-align: center;
}

</style>

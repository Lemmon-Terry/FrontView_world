<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import { useRoute } from 'vue-router'
import router from '@/router'

const JsonBooks = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get('http://101.37.20.150:8090/MainBody/bookList')
    JsonBooks.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
)

const route = useRoute()
const username = route.params.username

const linkBook = async () => {
  if (username !== undefined) {
    router.replace({
      name: 'UserBookView',
      params: { username: username }
    })
  } else {
    router.replace('/Allbooks')
  }
}

const ABook = async id => {
  if (username !== undefined) {
    router.replace({
      name: 'BooksView',
      params: {
        id: id,
        username: username
      }
    })
  } else {
    router.replace({
      name: 'BookDetail',
      params: {
        id: id
      }
    })
  }
}
</script>

<template>
  <div class="main-container">
    <div class="component"  id="bookList">
      <div class="titles hand" @click="linkBook" title="前往书籍列表"><a>#&nbsp;书籍</a><a
        class="moreCt">&nbsp;更多信息...</a></div>
      <hr color="black">
      <div class="books">
        <div v-for="item in JsonBooks" :key="item.id" class="items" @click="ABook(item.id)">
          <div class="title-container">《{{ item.bookName }}》</div>
          <div class="author-container">{{ item.author }}</div>
          <div class="content-container">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div class="component"  id="filmList">
      <div class="titles"><a>#&nbsp;电影</a><a class="moreCt">&nbsp;更多信息...</a></div>
      <hr color="black">
    </div>
    <div class="component"  id="PList">
      <div class="titles"><a>#&nbsp;绘画</a><a class="moreCt">&nbsp;更多信息...</a></div>
      <hr color="black">
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 900px;
  height: 1600px;
  margin: 0 auto;
}

.component {
  width: 100%;
  height: 400px;
  border: black 2px solid;
}

.titles {
  text-align: center;
  align-content: center;
  width: 200px;
  height: 60px;
  font-size: 30px;
  position: relative;
}

.moreCt {
  font-size: 15px;
}

.items {
  margin: 5px;
}

.items:hover{
  cursor: pointer;
  color: darkseagreen;
}

.title-container {
  display: inline-block;
  font-size: 30px;
  text-align: center;
  align-content: center;
  font-weight: 700;
}

.author-container {
  margin-left: 5px;
  display: inline-block;
  position: relative;
  font-size: 25px;
  text-align: center;
  align-content: center;
}

.content-container {
  display: inline-block;
  font-size: 20px;
}

.hand:hover {
  color: darkblue;
  cursor: pointer;
}
</style>

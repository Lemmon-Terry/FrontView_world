<script setup>
import { onMounted, ref } from 'vue'

import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router'

const JsonBooks = ref(null)

const username = useRoute().params.username

onMounted(async () => {
  try {
    const res = await axios.get('http://101.37.20.150:8090/BookItems/subject')
    JsonBooks.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

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
  <div class="component" id="bookList">
    <div class="titles"><a>#&nbsp;书籍</a></div>
    <div class="books">
      <div v-for="item in JsonBooks" :key="item.id" class="items" @click="ABook(item.id)">
        <div class="title-container">《{{ item.bookName }}》</div>
        <div class="author-container">{{ item.author }}</div>
        <div class="content-container">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component {
  width: 1200px;
  height: 1200px;
  margin: 0 auto;
}

.titles {
  text-align: center;
  align-content: center;
  width: 120px;
  height: 60px;
  font-size: 30px;
  position: relative;
}

.books {
  align-items: center;
  height: 800px;
}

.items {
  margin: 5px;
  border: black 2px solid;
}

.items:hover{
  cursor: pointer;
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
  width: 1000px;
  font-size: 20px;
}

hr {
  width: 1000px;
  position: absolute;
}
</style>

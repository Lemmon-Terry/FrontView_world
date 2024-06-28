<script setup>

import router from '@/router'
import { useRoute } from 'vue-router'

const LinkLogin = async () => {
  alert('前往登录页面')
  await router.replace('/login')
}

const returnIndex = async () => {
  await router.replace('/index')
}

const route = useRoute()
const username = route.params.username

const linkBook = async () => {
  if (username !== undefined) {
    router.replace({ name: 'UserBookView', params: { username: username } })
  } else {
    router.replace('/Allbooks')
  }
}
</script>

<template>
  <el-affix id="Header">
    <div class="banner-container">
      <el-row :gutter="30" style="background-color: white">
        <el-col :span="6">
          <div class="webLogo" @click="returnIndex" title="返回首页">
            View-World
            <el-icon>
              <View style="width: 20px ;height: 20px ;margin-left: 8px"/>
            </el-icon>
          </div>
        </el-col>
        <el-col :span="10">
          <div mode="horizontal">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-menu-item @click="linkBook" title="进入书籍列表">书籍</el-menu-item>
              <el-menu-item>电影</el-menu-item>
              <el-menu-item>绘画</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="person" @click="LinkLogin">
            <el-avatar>
              <el-icon>
                <User/>
              </el-icon>
            </el-avatar>
            <a class="pos">
              <el-text style="padding-right: 8px">
                暂未登录
              </el-text>
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-affix>

</template>

<style scoped>
#Header {
  width: 1250px;
  height: 64px;
  margin: 0 auto;
}

.banner-container {
  height: 48px;

}

.webLogo {
  padding-left: 20px;
  float: none;
  width: 160px;
  height: 100%;
  align-content: center;
  font-family: 微软雅黑;
  color: #f35626;
  font-weight: 1000;
}

.pos {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 8px;
}

.pos:hover{
  cursor: pointer;
}

ul {
  width: auto;
  margin: 0;
  list-style-type: none;
}

</style>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    {
      required: true,
      message: '账号不可为空',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '不能大于20个字符',
      trigger: 'blur'
    },
    {
      min: 4,
      message: '不能小于4个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不可为空',
      trigger: 'blur'
    },
    {
      min: 6,
      message: '不能小于6个字符',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '不能大于20个字符',
      trigger: 'blur'
    }
  ]
})

const router = useRouter()

const onSubmit = async () => {
  try {
    const res = await axios.post('http://101.37.20.150:8090/Headers/login', {
      username: form.username,
      password: form.password
    })
    /* URL在build之前需要处理 */
    if (res.data.code === '200') {
      router.replace({
        name: 'UserIndex',
        params: { username: form.valueOf().username }
      })
    } else if (res.data.code === '500') {
      alert(`${res.data.msg}`)
      form.username = ''
      form.password = ''
    }
  } catch (error) {
    console.error('Error during login:', error.message)
  }
}

const linkRegister = async () => {
  await router.replace('/register')
}
</script>

<template>
  <div id="loginBody">
    <div class="loginData">
      <el-form :model="form" :rules="rules" status-icon label-width="80px">
        <div class="loginText">
          <h2>用户登录</h2>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="form.username" maxlength="20" show-word-limit
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <div class="butt">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="linkRegister">前往注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
#loginBody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.loginText {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: grey;
  text-shadow: 2px 2px 4px #000000;
}

.loginData {
  width: 400px;
  height: 300px;
  transform: translate(-10%, -40%);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.butt {
  margin-top: 10px;
  text-align: center;
}
</style>

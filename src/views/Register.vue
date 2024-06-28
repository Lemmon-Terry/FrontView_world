<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import router from '@/router'

const form = reactive({
  username: '',
  password: '',
  testPwd: ''
})

const checkPassword = (rule, value, callback) => {
  if (form.password === value) {
    callback()
  } else {
    callback(new Error('输入有误'))
  }
}

const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不可为空',
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
    },
    {
      pattern: /^[a-zA-Z]\w{3,19}$/,
      message: '输入有误',
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
    },
    {
      pattern: /\w{6,20}$/,
      message: '密码输入不一致,请检查',
      trigger: 'blur'
    }
  ],
  testPwd: [
    {
      required: true,
      message: '内容不可为空',
      trigger: 'blur'
    }, {
      validator: checkPassword,
      trigger: 'blur'
    }
  ]
})

const onRegister = async () => {
  if (form.testPwd === form.password) {
    try {
      const res = await axios.post('http://101.37.20.150:8090/Headers/register', {
        username: form.username,
        password: form.password
      })
      /* URL在build之前需要处理 */
      if (res.data.code === '200') {
        alert('注册成功，请重新登录')
        router.replace('/login')
      } else if (res.data.code === '500') {
        alert(`${res.data.msg}`)
        form.username = ''
        form.password = ''
        form.testPwd = ''
      }
    } catch (error) {
      console.error('Error during register:', error.message)
    }
  } else {
    alert('请按提示进行输入')
  }
}
const linkSubmit = async () => {
  await router.replace('/login')
}
</script>

<template>
  <div id="RegisterBody">
    <div class="RegisterData">
      <el-form :model="form" :rules="rules" status-icon label-width="80px">
        <div class="RegisterText">
          <h2>用户注册</h2>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" placeholder="设置用户名 以字母开头" v-model="form.username" maxlength="20"
                    show-word-limit
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="设置密码" v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item prop="testPwd">
          <el-input type="password" placeholder="再次输入密码" v-model="form.testPwd" clearable></el-input>
        </el-form-item>
        <div class="butt">
          <el-button type="primary" @click="onRegister">注册</el-button>
          <el-button @click="linkSubmit">返回登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
#RegisterBody {
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

.RegisterText {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: grey;
  text-shadow: 2px 2px 4px #000000;
}

.RegisterData {
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

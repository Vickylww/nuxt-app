<template>
  <section class="form-container" aria-labelledby="title">
    <h2 id="title">注册</h2>
    <form @submit.prevent="handleRegister" novalidate>
      <div class="input-group">
        <label for="phone-input">手机号</label>
        <input
        id="phone-input"
          v-model="phone"
          type="tel"
          inputmode="numeric"
           autocomplete="tel"
          placeholder="请输入手机号"
          maxlength="11"
           required
          aria-required="true"
          aria-describedby="phone-error"
          @blur="validatePhone"
        />
        <span id="phone-error" v-if="phoneError" class="error-msg" role="alert">{{ phoneError }}</span>
      </div>
      <div class="input-group">
        <label for="password-input">密码</label>
        <input
        id="password-input"
          v-model="password"
         autocomplete="new-password"
          type="password"
          placeholder="请设置密码（至少6位）"
            required
            minlength="6"
        aria-required="true"
        aria-describedby="password-error"
          @blur="validatePassword"
        />
        <span id="password-error" v-if="passwordError" class="error-msg" role="alert">{{ passwordError }}</span>
      </div>
      <button type="submit" class="submit-btn">注册</button>
    </form>
    <p class="switch-link">已有账号？<router-link to="/login">立即登录</router-link></p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const phone = ref('')
const password = ref('')
const phoneError = ref('')
const passwordError = ref('')

const validatePhone = () => {
  const phoneReg = /^1[3-9]\d{9}$/
  if (!phone.value) {
    phoneError.value = '手机号不能为空'
  } else if (!phoneReg.test(phone.value)) {
    phoneError.value = '请输入正确的11位手机号'
  } else {
    phoneError.value = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = '密码不能为空'
  } else if (password.value.length < 6) {
    passwordError.value = '密码长度至少6位'
  } else {
    passwordError.value = ''
  }
}

const handleRegister = () => {
  validatePhone()
  validatePassword()
  if (!phoneError.value && !passwordError.value) {
    // 模拟注册成功跳转到登录页
    router.push('/login')
  }
}
</script>

<style scoped>
/* 与登录页样式完全一致，保持统一 */
.form-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background: #15171e;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
@media (max-width:500px) {
  .form-container{ margin: 80px 20px;
  padding: 10px 5px;}
}
h2 {
  text-align: center;
  color: #c5a47e;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 30px;
}
.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
label {
  color: #aaa;
  margin-bottom: 6px;
  font-size: 14px;
}
input {
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #0b0c10;
  color: #e0e0e0;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}
input:focus {
  border-color: #c5a47e;
}
.error-msg {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
}
.submit-btn {
  width: 100%;
  padding: 12px;
  background: #c5a47e;
  color: #0b0c10;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}
.submit-btn:hover {
  background: #b8956a;
}
.switch-link {
  text-align: center;
  margin-top: 20px;
  color: #888;
  font-size: 14px;
}
.switch-link a {
  color: #c5a47e;
  margin-left: 4px;
}
</style>

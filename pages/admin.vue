<template>
  <div>
    <h1>发布文章</h1>
    <form @submit.prevent="submit">
      <div>
        <label>标题</label><br/>
        <input v-model="title" type="text" style="width:300px" required />
      </div>
      <div style="margin-top:12px">
        <label>内容（Markdown）</label><br/>
        <textarea v-model="content" rows="12" style="width:500px" required></textarea>
      </div>
      <button type="submit" style="margin-top:12px">发布</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'nuxt/app';

definePageMeta({
  layout: 'blog'
})

const route = useRouter()
const title = ref('');
const content = ref('');
const message = ref('');
async function submit() {
  message.value = '正在发布...';
  try {
    await $fetch('/api/articles', {
      method: 'POST',
      body: { title: title.value, content: content.value }
    });
    title.value = '';
    content.value = '';
    message.value = '发布成功！';
    route.push('/blog')

  } catch (e) {
    message.value = '发布失败：' + e.message;
  }
}
</script>
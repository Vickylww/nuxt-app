<template>
  <div class="page-container">
    <div class="tasklist">
    <div>看板任务列表</div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          :id="task.id"
          v-model="task.completed"
          type="checkbox"
          :value="task.title"
          @change="toggleTask(event,task.id)"
        />
        <label for="" :class="task.completed ? 'taskline' : 'taskline1'"> {{ task.title }}</label>
        <button @click="deltask(task.id)">删除</button>
      </li>
    </ul>

    <div class="input-group">
      <label for="">任务名称</label>
      <input v-model="newTaskTitle" type="请输入任务名称" name="newtasktitle" />
      <button type="" @click="addtask()">添加</button>
    </div>
    共{{ stats.total }} 项任务，{{ stats.completed }}项未完成
  </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
const STORAGE_KEY = ''
const nextId = ref()
const newTaskTitle = ref('')
const checkedid = ref('')
const tasks = ref([])
const stats = computed(() => {
  const total = tasks.value.length
  const completed = tasks.value.filter((item) => item.completed === false).length
  const pending = total - completed
  return {
    total,
    completed,
    pending
  }
})

function addtask() {
  if (newTaskTitle.value) {
    const task = {
      id: nextId.value,
      title: newTaskTitle.value,
      completed: false
    }
    tasks.value.unshift(task)
    nextId.value++
    // 清空输入框
    newTaskTitle.value = ''
    console.log(JSON.stringify(tasks.value))
  }
}
function deltask(id) {
  console.log(id)
  tasks.value = tasks.value.filter((t) => t.id !== id)
  console.log(JSON.stringify(tasks.value))
}
function toggleTask(event,id) {
  console.log(id)
  // for (const i = 0; i < stats.value.total; i++) {
  //   if ((tasks.value[i].id = id)) {
  //     tasks.value[i].completed == false
  //       ? (tasks.value[i].completed = true)
  //       : (tasks.value[i].completed = false)
  //   }
  // }
  console.log(JSON.stringify(tasks.value))
  // console.log(`任务 ${id} 切换为 ${event.target.checked}`);
}

//保存本地缓存
function saveToStorage() {
  try {
    const data = {
      tasks: tasks.value,
      nextId: nextId.value
    }
    localStorage.setItem('STORAGE_KEY', JSON.stringify(data))
  } catch (err) {
    console.warn('保存本地缓存失败', err)
  }
}
function loadFormStorage() {
  try {
    const raw = localStorage.getItem('STORAGE_KEY')
    // console.log(JSON.stringify(raw))
    if (raw) {
      const data = JSON.parse(raw)
      if (data.tasks && Array.isArray(data.tasks)) {
        tasks.value = data.tasks
      }
      if (typeof data.nextId === Number && data.nextId > 0) {
        nextId.value = data.nextId
      }
    }
  } catch (err) {
    console.warn('本地获取缓存失败', err)
    tasks.value = ''
    nextId.value = 1
  }
}

watch(
  tasks,
  () => {
    saveToStorage()
  },
  { deep: true }
)
watch(nextId, () => {
  saveToStorage()
})

onMounted(() => {
  loadFormStorage()
})
</script>
<style>
ul li {
  color: 333;
}
.taskline {
  text-decoration: line-through;
  color: #888;
}
</style>

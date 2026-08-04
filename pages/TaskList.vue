<template>
  <section class="page-container tasklist" aria-labelledby="task-list-heading">
    <h1 id="task-list-heading">看板任务列表</h1>
    
    <ul class="tasklistbox">
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
      <label for="new-task">任务名称</label>
      <input id="new-task" v-model="newTaskTitle" type="text"
      placeholder="请输入任务名称"  @keyup.enter="addtask" />
      <button type="" @click="addtask()">添加</button>
    </div>
     <p role="status" aria-live="polite">
    共 {{ stats.total }} 项任务，{{ stats.completed }} 项未完成
  </p>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
const STORAGE_KEY = ''
const nextId = ref(0)
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
.tasklistbox{max-height:300px;overflow-y:auto;overflow-x:hidden;}
/* 看板任务列表
 /* ========== 全局重置 & 基础 ========== */
      

        /* ========== 主卡片容器 ========== */
        .page-container {
         
          
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 32px;
            padding: 36px 32px 40px;
           
            transition: all 0.3s ease;
        }

        /* ========== 标题 ========== */
        .page-container .tasklist>div:first-child {
            font-size: 28px;
            font-weight: 700;
            color: #1a2639;
            letter-spacing: -0.5px;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .page-container .tasklist>div:first-child::before {
            content: '📌';
            font-size: 30px;
            line-height: 1;
        }

        .page-container .tasklist>div:first-child::after {
            content: '';
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, #d0d9e8, transparent);
            margin-left: 8px;
        }

        /* ========== 任务列表 ========== */
        .tasklist ul {
            list-style: none;
            padding: 0;
            margin: 0 0 32px 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .tasklist ul li {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px 14px 16px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
            transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
            position: relative;
        }

        .tasklist ul li:hover {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 8px 24px rgba(0, 20, 40, 0.08);
            transform: translateY(-1px);
            border-color: rgba(255, 255, 255, 1);
        }

        /* ——— 自定义复选框 ——— */
        .tasklist ul li input[type="checkbox"] {
            appearance: none;
            -webkit-appearance: none;
            width: 22px;
            height: 22px;
            min-width: 22px;
            border-radius: 8px;
            border: 2px solid #c8d2e0;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin: 0;
            flex-shrink: 0;
        }

        .tasklist ul li input[type="checkbox"]:hover {
            border-color: #6c8cff;
            box-shadow: 0 0 0 4px rgba(108, 140, 255, 0.12);
        }

        .tasklist ul li input[type="checkbox"]:checked {
            background: #6c8cff;
            border-color: #6c8cff;
            box-shadow: 0 0 0 4px rgba(108, 140, 255, 0.15);
        }

        .tasklist ul li input[type="checkbox"]:checked::after {
            content: '✓';
            color: white;
            font-size: 16px;
            font-weight: 700;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            transform: scale(0.9);
        }

        /* ——— 任务标题 ——— */
        .tasklist ul li label {
            flex: 1;
            font-size: 16px;
            font-weight: 500;
            color: #1e293b;
            cursor: pointer;
            padding: 2px 0;
            transition: all 0.3s ease;
            word-break: break-word;
            user-select: none;
            line-height: 1.5;
        }

        .tasklist ul li label.taskline {
            color: #94a3b8;
            text-decoration: line-through;
            text-decoration-color: #94a3b8;
            text-decoration-thickness: 2px;
            opacity: 0.7;
        }

        .tasklist ul li label.taskline1 {
            color: #1e293b;
            text-decoration: none;
            opacity: 1;
        }

        /* ——— 删除按钮 ——— */
        .tasklist ul li button {
            background: transparent;
            border: none;
            color: #b9c4d4;
            font-size: 18px;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 10px;
            transition: all 0.2s ease;
            line-height: 1;
            font-weight: 400;
            flex-shrink: 0;
            opacity: 0.4;
        }

        .tasklist ul li:hover button {
            opacity: 0.8;
        }

        .tasklist ul li button:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.08);
            opacity: 1 !important;
            transform: scale(1.05);
        }

        .tasklist ul li button:active {
            transform: scale(0.92);
        }

        /* ========== 空状态 ========== */
        .empty-state {
            text-align: center;
            padding: 36px 20px 28px;
            color: #94a3b8;
            font-size: 15px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 20px;
            border: 1px dashed #d0d9e8;
            margin-bottom: 28px;
        }

        .empty-state span {
            font-size: 42px;
            display: block;
            margin-bottom: 12px;
        }

        /* ========== 输入区域 ========== */
        .tasklist .input-group {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 18px;
            padding: 6px 6px 6px 20px;
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }

        .tasklist .input-group:focus-within {
            box-shadow: 0 4px 20px rgba(108, 140, 255, 0.12);
            border-color: #6c8cff;
            background: rgba(255, 255, 255, 0.85);
        }

        .tasklist .input-group label {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            white-space: nowrap;
            letter-spacing: 0.3px;
        }

       .tasklist .input-group input[type="text"] {
            flex: 1;
            border: none;
            background: transparent;
            padding: 12px 4px;
            font-size: 15px;
            font-weight: 500;
            color: #1e293b;
            outline: none;
            min-width: 0;
            font-family: inherit;
        }

       .tasklist .input-group input[type="text"]::placeholder {
            color: #b9c4d4;
            font-weight: 400;
            font-size: 14px;
        }

       .tasklist .input-group button {
            background: #6c8cff;
            border: none;
            color: white;
            font-weight: 600;
            font-size: 15px;
            padding: 10px 24px;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
            font-family: inherit;
            letter-spacing: 0.3px;
            box-shadow: 0 4px 14px rgba(108, 140, 255, 0.25);
        }

       .tasklist .input-group button:hover {
            background: #5a7ae8;
            box-shadow: 0 8px 24px rgba(108, 140, 255, 0.35);
            transform: translateY(-1px);
        }

       .tasklist .input-group button:active {
            transform: scale(0.96);
            box-shadow: 0 2px 8px rgba(108, 140, 255, 0.2);
        }

        /* ========== 统计信息 ========== */
        .stats {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 6px 4px 6px;
            font-size: 14px;
            color: #64748b;
            border-top: 1px solid rgba(208, 217, 232, 0.4);
            margin-top: 4px;
            flex-wrap: wrap;
            gap: 8px 16px;
        }

        .stats .stats-left {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
        }

        .stats .stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
        }

        .stats .stat-item .num {
            font-weight: 700;
            color: #1e293b;
            font-size: 16px;
            min-width: 20px;
            text-align: center;
        }

        .stats .stat-item .num.done {
            color: #6c8cff;
        }

        .stats .stat-item .num.pending {
            color: #f59e0b;
        }

        .stats .progress-bar {
            flex: 1;
            min-width: 80px;
            height: 6px;
            background: #e2e8f0;
            border-radius: 99px;
            overflow: hidden;
            margin: 0 4px;
        }

        .stats .progress-bar .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #6c8cff, #8aa0ff);
            border-radius: 99px;
            transition: width 0.4s cubic-bezier(0.2, 0, 0, 1);
            width: 0%;
        }

        .stats .progress-label {
            font-weight: 600;
            color: #475569;
            font-size: 13px;
            min-width: 36px;
            text-align: right;
        }

        /* ========== 响应式 ========== */
        @media (max-width: 600px) {
            .tasklist {
                padding: 24px 18px 28px;
                border-radius: 24px;
            }

            .page-container>div:first-child {
                font-size: 22px;
                margin-bottom: 20px;
            }

            .tasklist ul li {
                padding: 12px 14px 12px 12px;
                gap: 12px;
                border-radius: 14px;
            }

            .tasklist ul li label {
                font-size: 15px;
            }

            .input-group {
                flex-wrap: wrap;
                padding: 14px 14px 14px 18px;
                border-radius: 16px;
                gap: 10px;
            }

            .input-group label {
                width: 100%;
                font-size: 13px;
            }

            .input-group input[type="text"] {
                padding: 10px 0;
                font-size: 15px;
                width: 100%;
                flex: 1 1 100%;
            }

            .input-group button {
                width: 100%;
                justify-content: center;
                padding: 12px;
                font-size: 15px;
                border-radius: 12px;
            }

            .stats {
                flex-direction: column;
                align-items: stretch;
                gap: 10px;
                padding-top: 14px;
            }

            .stats .stats-left {
                justify-content: space-between;
                gap: 12px;
            }

            .stats .progress-bar {
                min-width: 60px;
            }

            .tasklist ul li button {
                opacity: 0.6;
                padding: 4px 8px;
            }
        }

        @media (max-width: 400px) {
            .tasklist {
                padding: 16px 12px 20px;
                border-radius: 20px;
            }

            .page-container>div:first-child {
                font-size: 19px;
            }

            .tasklist ul li {
                padding: 10px 10px 10px 10px;
                gap: 10px;
            }

            .tasklist ul li label {
                font-size: 14px;
            }
        }

        /* ========== 入场动画（可选） ========== */
        .tasklist ul li {
            animation: fadeSlideIn 0.3s ease forwards;
            opacity: 0;
            transform: translateY(8px);
        }

        .tasklist ul li:nth-child(1) {
            animation-delay: 0.02s;
        }
        .tasklist ul li:nth-child(2) {
            animation-delay: 0.04s;
        }
        .tasklist ul li:nth-child(3) {
            animation-delay: 0.06s;
        }
        .tasklist ul li:nth-child(4) {
            animation-delay: 0.08s;
        }
        .tasklist ul li:nth-child(5) {
            animation-delay: 0.10s;
        }
        .tasklist ul li:nth-child(6) {
            animation-delay: 0.12s;
        }
        .tasklist ul li:nth-child(7) {
            animation-delay: 0.14s;
        }
        .tasklist ul li:nth-child(8) {
            animation-delay: 0.16s;
        }
        .tasklist ul li:nth-child(9) {
            animation-delay: 0.18s;
        }
        .tasklist ul li:nth-child(10) {
            animation-delay: 0.20s;
        }
        .tasklist ul li:nth-child(11) {
            animation-delay: 0.22s;
        }
        .tasklist ul li:nth-child(12) {
            animation-delay: 0.24s;
        }
        .tasklist ul li:nth-child(13) {
            animation-delay: 0.26s;
        }
        .tasklist ul li:nth-child(14) {
            animation-delay: 0.28s;
        }
        .tasklist ul li:nth-child(15) {
            animation-delay: 0.30s;
        }

        @keyframes fadeSlideIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
</style>

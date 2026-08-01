<template>
    <section class="help-centerbox" aria-labelledby="title">
    <div class="help-center ">
      <div class="help-left">
        <h2 id="title" class="left-title">帮助中心</h2>
        <ul class="tree" role="tree" aria-label="帮助分类">
          <li v-for="(item, idx) in currentList" :key="idx" class="tree-item"  role="treeitem"
          :aria-expanded="item.expanded ? 'true' : 'false'" >
            <button class="level1" @click="toggleItem(idx)" :aria-expanded="item.expanded ? 'true' : 'false'">
              <span class="level1-text">{{ item.name }}</span>
              <span class="arrow" aria-hidden="true">{{ item.expanded ? '▲' : '▼' }}</span>
            </button>
            <transition name="slide">
              <ul v-if="item.expanded" class="level2-list"  role="group"
              :aria-label="`${item.name} 的子分类`">
                <li
                  v-for="(child, cIdx) in item.children"
                  :key="cIdx"
                  class="level2-item"
                  :class="{ active: selectedChild?.name === child.name }"
                  role="treeitem"
                :aria-selected="selectedChild?.name === child.name ? 'true' : 'false'"
                  @click="selectChild(child)"
                >
                  <button
                  class="level2-btn"
                  @click="selectChild(child)"
                >
                  {{ child.name }}
                </button>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
      <div class="help-right">
        <div class="tab-bar" role="tablist" aria-label="详情标签切换">
          <button
            v-for="tab in tabs"
            :key="tab.key"
             role="tab"
          :aria-selected="currentTab.key === tab.key ? 'true' : 'false'"
            :class="{ active: currentTab.key === tab.key }"
            @click="switchTab(tab)"
          >
            {{ tab.title }}
          </button>
        </div>
        <div class="content-area" role="tabpanel" :aria-label="currentTab.title">
          <div v-if="selectedChild" class="detail-card">
            <h3>{{ selectedChild.name }}</h3>
            <p>{{ selectedChild.desc || '暂无详细描述' }}</p>
          </div>
          <div v-else class="placeholder">
            <p>请选择左侧二级列表查看详情</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const tabs = [
  { key: 'resource', title: '资源介绍' },
  { key: 'account', title: '开户指引' },
  { key: 'purchase', title: '购买投放' },
  { key: 'finance', title: '财务管理' }
]

const currentTab = ref(tabs[0])

const data = reactive({
  resource: [
    {
      name: '电视广告',
      expanded: true,
      children: [
        { name: '电视广告介绍', desc: '覆盖主流卫视，黄金时段，品牌曝光首选。' },
        { name: '电视广告资源位', desc: '提供各频道时段报价及受众分析。' }
      ]
    },
    {
      name: '新媒体广告',
      expanded: false,
      children: [
        { name: '新媒体广告介绍', desc: '社交媒体、短视频平台精准投放。' },
        { name: '新媒体广告资源位', desc: '微信、抖音、B站等资源一览。' }
      ]
    },
    {
      name: '广播广告',
      expanded: false,
      children: [
        { name: '广播广告介绍', desc: '全国广播电台，覆盖驾车、居家场景。' },
        { name: '广播广告资源位', desc: '各省市频率及节目单查询。' }
      ]
    }
  ],
  account: [
    {
      name: '个人开户',
      expanded: false,
      children: [
        { name: '个人开户流程', desc: '在线提交身份证，1个工作日内审核。' },
        { name: '所需资料', desc: '身份证正反面、手机号、邮箱。' }
      ]
    },
    {
      name: '企业开户',
      expanded: false,
      children: [
        { name: '企业开户流程', desc: '提交营业执照，对公账户验证，3个工作日。' },
        { name: '所需资料', desc: '营业执照、法人身份证、企业邮箱。' }
      ]
    }
  ],
  purchase: [
    {
      name: '自助投放',
      expanded: false,
      children: [
        { name: '操作指南', desc: '从创建广告到上线投放，全流程图文指引。' },
        { name: '常见问题', desc: '审核不通过、预算设置等高频问题解答。' }
      ]
    },
    {
      name: '代理投放',
      expanded: false,
      children: [
        { name: '代理政策', desc: '代理佣金比例、返点政策及结算方式。' },
        { name: '联系方式', desc: '区域代理加盟热线：400-888-9999。' }
      ]
    }
  ],
  finance: [
    {
      name: '发票管理',
      expanded: false,
      children: [
        { name: '申请发票', desc: '消费满100元可在线申请电子发票或纸质专票。' },
        { name: '发票查询', desc: '输入发票号查询真伪及开具状态。' }
      ]
    },
    {
      name: '账户充值',
      expanded: false,
      children: [
        { name: '在线充值', desc: '支持微信、支付宝、网银转账。' },
        { name: '充值记录', desc: '按月筛选，导出Excel对账。' }
      ]
    }
  ]
})

const currentList = computed(() => data[currentTab.value.key] || [])

const selectedChild = ref(null)

// 初始化默认展开第一个一级，并选中第一个二级
const initDefaultExpand = () => {
  const list = currentList.value
  if (list.length > 0) {
    // 全部折叠
    list.forEach((item) => {
      item.expanded = false
    })
    // 展开第一个一级
    list[0].expanded = true
    // 选中第一个二级
    if (list[0].children.length > 0) {
      selectedChild.value = list[0].children[0]
    } else {
      selectedChild.value = null
    }
  } else {
    selectedChild.value = null
  }
}

// 页面首次加载时执行
initDefaultExpand()

const switchTab = (tab) => {
  currentTab.value = tab
  initDefaultExpand() // 切换后重新展开第一个一级
}

const toggleItem = (idx) => {
  currentList.value[idx].expanded = !currentList.value[idx].expanded
}

const selectChild = (child) => {
  selectedChild.value = child
}
</script>

<style scoped>
.help-centerbox{margin-top:63px; }
.help-center {
  display: flex;
  min-height: calc(100vh - 60px);
  background: #f5f9fc;
}
.help-left {
  width: 280px;
  padding: 30px 0 0px 0;
  border-right: 1px solid #222;
  color: #e0e0e0;
 
}
  @media (min-width:1200px) {
   
     .help-left{padding-left:0px;}
   }
     @media (min-width:500px) {
   
     .help-left{padding-left:20px;padding-right:20px;}
   }
      @media (min-width:768px) {
    .help-left{padding-left:20px;padding-right:20px;}
   }
.left-title {
  font-size: 20px;
  color: #c5a47e;
  margin-bottom: 30px;
  letter-spacing: 2px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}
.tree {
  list-style: none;
  padding: 10px;
  background: #ffffff;
}
.tree-item {
  margin-bottom: 15px;
}
.level1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.tree-item button{width:100%;border:none;background:#fff;text-align: left;}
.level1:hover {
  background: #fff;
}
.level1-text {
  font-size: 15px;
  color: #000;
}
.arrow {
  font-size: 12px;
  color: #c5a47e;
}
.level2-list {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 15px;
  overflow: hidden;
}
.level2-item {
  padding: 8px 10px;
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
  border-radius: 3px;
  transition:
    background 0.3s,
    color 0.3s;
}
.level2-item:hover,
.level2-item.active {
  color: #000;
}
.help-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.tab-bar {
  display: flex;
  border-bottom: 1px solid #222;
}
.tab-bar button {
  padding: 15px 30px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 15px;
  cursor: pointer;
  transition:
    color 0.3s,
    border-bottom 0.3s;
  border-bottom: 3px solid transparent;
}
.tab-bar button:hover {
  color: #000;
}
.tab-bar button.active {
  color: #000;
  border-bottom-color: #c0392b;
}
.content-area {
  flex: 1;
  padding: 40px;
}
.detail-card {
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.detail-card h3 {
  color: #c5a47e;
  margin-bottom: 15px;
  font-weight: 500;
}
.detail-card p {
  color: #000;
  line-height: 1.8;
}
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #555;
  font-size: 16px;
}

/* ===== 缓慢展开/收起过渡效果 ===== */
.slide-enter-active {
  transition:
    max-height 2s ease-out,
    opacity 0s ease;
}
.slide-leave-active {
  transition:
    max-height 1.2s ease,
    opacity 0s ease;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 1;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>

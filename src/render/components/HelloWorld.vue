<template>
	<h1>{{ msg }}</h1>

	<label>
		<input type="checkbox" v-model="useScriptSetup" /> Use
		<code>&lt;script setup&gt;</code>
	</label>
	<label> <input type="checkbox" v-model="useTsPlugin" /> Provide types for <code>*.vue</code> imports </label>
	<div class="flex">
		<!-- <NInput v-model="value" type="input" round placeholder="基本的 Input" /> -->
		<CodeInput :code="code" @refesh="setCurCode" />
		<div class="btns">
			<NButton type="primary">Primary</NButton>
			<NButton type="info" ghost>连接</NButton>
			<!-- <NButton type="success">{{ newmsg }}</NButton> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, onMounted, computed } from 'vue'
// import { ipcRenderer } from 'electron'
import { NInput, NButton, useMessage } from 'naive-ui'
import CodeInput from './CodeInput/index.vue'
const props = defineProps({ msg: String })

const count = ref(0)
const message = useMessage()
const useScriptSetup = ref(false)
const useTsPlugin = ref(false)
onMounted: {
	count.value = 10
}
const code = ref([])

function setCurCode(val: []) {
	code.value = val
	const c = code.value.map((item) => item).join('')
	if (c.length === 6) {
		message.loading('Code验证中...')
	}
}
</script>

<style scoped lang="scss">
a {
	color: #42b983;
}

label {
	margin: 0 0.5em;
	font-weight: bold;
}

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
.flex {
	display: flex;
	width: 800px;
	justify-content: center;
	align-items: center;
	margin: 30px auto;
	flex-direction: column;
}
.btns { 
	margin: 10px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 180px;
	:deep(button) {
		font-size: 18px;
	}
}
</style>

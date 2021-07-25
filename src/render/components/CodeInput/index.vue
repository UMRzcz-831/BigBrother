<template>
	<div class="CodeInput">
		<input
			v-for="(item, index) in 6"
			placeholder=""
			min="0"
			max="9"
			id="codeInput"
			@input="(e) => handleOnInput(e, index)"
			@keydown="(e) => handleOnKeydown(e.key, index)"
			@focus="handleOnFocus"
			v-model.trim.number="input[index]"
			type="number"
			:ref="setNodes"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit, computed, reactive, onMounted, onBeforeUpdate, ref } from 'vue'
const props = defineProps({
	code: {
		type: Array,
		default: [],
	},
})
const emit = defineEmit()
const pasteResult = reactive([])
const current = reactive(['', '', '', '', '', ''])
let inputNodeList = ref<Array<HTMLInputElement>>([])
const input = computed({
	get: () => {
		if (props.code && Array.isArray(props.code) && props.code.length === 6) {
			return props.code
		} else if (/^\d{6}$/.test(props.code.toString())) {
			return props.code.toString().split('')
		} else if (pasteResult.length === 6) {
			return pasteResult
		} else {
			return props.code
		}
	},
	set: (val) => {
		input.value = val
	},
})

onMounted(() => {
	console.log(inputNodeList)
})
onBeforeUpdate(() => {
	inputNodeList.value = []
})

const setNodes = (el: any) => {
	if (el) inputNodeList.value.push(el)
}
function handleInputBlur(e: string, index: number) {
	// console.log(e, index)
	// if (!/\d/.test(val)) {
	// }
}
function handleOnInput(e: Event, index: number) {
	let value = (e.target as HTMLInputElement).value
	let expected = value.slice(0, 1)
	inputNodeList.value[index].value = expected
	if (/\d/.test(expected)) {
		inputNodeList.value[index < 5 ? index + 1 : index].focus()
		refeshCode()
	}
}
function refeshCode() {
	const currentArr = inputNodeList.value.map((item) => item.value)
	emit('refesh', currentArr)
}
function handleOnKeydown(key: string, index: number) {
	const currentCode = input.value.join('')
	if (key === 'Backspace') {
		if (currentCode.length < 6 && currentCode.length > 0) {
			inputNodeList.value[index - 1].value = ''
			inputNodeList.value[index - 1].focus()
		} else {
			inputNodeList.value[index].value = ''
			inputNodeList.value[index].focus()
		}
		refeshCode()
	}
}
function handleOnFocus() {
	const currentArr = inputNodeList.value.map((item) => item.value)
	let index = currentArr.findIndex((item) => item === '')
	index = (index + currentArr.length) % currentArr.length
	inputNodeList.value[index].focus()
}
</script>
<style scoped lang="scss">
$dark-green: #63e2b7;
$bezier: cubic-bezier(0.4, 0, 0.2, 1);

.CodeInput {
	width: 512px;
	height: 80px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;

	:deep(#codeInput) {
		margin: 0 5px;
		height: 80px;
		width: 80px;
		font-size: 40px;
		text-align: center;
		border-radius: 20px;
		border: none;
		outline: none;
		padding: 0;
		box-sizing: border-box;
		color: rgba(255, 255, 255, 0.8);
		background-color: rgba(255, 255, 255, 0.1);
		transition: all 0.4s ease-in-out;
		&:hover {
			border: 1px solid $dark-green;
		}
		&:focus {
			border: 1px solid $dark-green;
			box-shadow: 0 0 8px 0 rgba(99, 226, 183, 0.3);
		}
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}
}
</style>

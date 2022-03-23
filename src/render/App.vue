<template>
	<div class="logo-box">
		<img style="height: 200px" src="./assets/electron.png" alt="Electron logo" />
		<img alt="Vue logo" src="./assets/logo.png" />
	</div>
	<NConfigProvider :theme="darkTheme">
		<NMessageProvider>
			<HelloWorld msg="Electron+ WebRTC" />
		</NMessageProvider>
		
	</NConfigProvider>
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import { NConfigProvider, darkTheme,NMessageProvider } from 'naive-ui'
</script>

<style>
html,
body {
	margin: 0;
	padding: 0;
  background:#222;
}
.logo-box {
	display: flex;
	width: 100%;
	justify-content: center;
}
</style>

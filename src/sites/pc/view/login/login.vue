<template>
	<div class="form-wrap">
		<div class="header">
			<div class="header-title">iFlorens</div>
		</div>
		<div class="form">
			<div class="phone">
				<div class="title">Welcome to iFlorens</div>
				<div class="input">
					<a-input v-model:value="account" placeholder="Username" />
				</div>
				<div class="input">
					<a-input-password v-model:value="password" placeholder="Password" />
				</div>
				<div class="input verifica">
					<a-input v-model.trim="verification" :loading="loading.phoneLogin" placeholder="Verification code" @keyup.enter="passwordLogin" />
					<div class="images_verifica">
						<img :src="codeUrl" alt="Verification code" @click="clickChangeValidateCodeImg" />
					</div>
				</div>
				<a-button class="loginBtn" type="primary" :loading="loading.phoneLogin" @click.stop="passwordLogin">Confirm</a-button>
			</div>
		</div>
		<contextHolder />
	</div>
</template>
<script lang="ts">
import { ref, onMounted, reactive } from "vue";
import { message } from "ant-design-vue";
import { passWordLogin } from "../../http/user-axios";
import { Base64 } from "js-base64";
import { useRouter } from "vue-router";
import { Button, Input, InputPassword } from 'ant-design-vue'
const url = ''

const [messageApi, contextHolder] = message.useMessage();

export default {
	components: {
		contextHolder,
		[Button.name]: Button,
		[Input.name]: Input,
		[InputPassword.name]: InputPassword
	},
	setup() {
		let account = ref("zhangtf"),
			password = ref("Hb5#cvi&!3"),
			verification = ref(""),
			loading = reactive({
				phoneLogin: false,
				selectCompany: false,
			}),
			codeUrl = ref(""),
			codeUuid = ref(""); // 验证码地址;
		const router = new useRouter();

		const clickChangeValidateCodeImg = () => {
			codeUuid.value = cdnFl.uuid();
			codeUrl.value = `${url || "https://iflorensdev.florens.com"}/ram/api/v0/verification-code/img/${codeUuid.value}`;
		};

		const passwordLogin = async () => {
			localStorage.removeItem("compactLooseMode");
			if (!account.value) {
				messageApi.error("Please enter your username");
				return;
			}

			if (!password.value) {
				messageApi.error("Please enter your password");
				return;
			}
			// 转成数组
			password.value = password.value.split("");

			// 数组下标5 添加元素'a'
			password.value.splice(5, 0, "a");
			// 数组逆序
			password.value.reverse();
			// Base64encode
			password.value = Base64.encode(password.value.toString());
			// 下标5+ 'tc'字符
			password.value = password.value.slice(0, 5) + "tc" + password.value.slice(5);
			password.value = encodeURIComponent(password.value);
			loading.phoneLogin = true;
			let res: any;

			try {
				res = await passWordLogin(account.value, password.value, codeUuid.value, verification.value);
			} catch (e) {
				loading.phoneLogin = false;
			}

			if (res.status === 200) {
				const unimportance = res.data;

				cdnFl.localData("set", "unimportance", unimportance);
				cdnFl.localData("set", "LOCAL_TOKEN", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				cdnFl.setCookie("expires", res.data.expires_in, res.data.expires_in - 300);
				cdnFl.deleteCookie("kamId", null);
				// router.push({
				// 	path: "/v4/index",
				// });
                window.location.href = '/'
				return false;
			}
			if (res.message) {
				messageApi.info(res.message);
				// 帐号密码错误，重新刷新验证码
				clickChangeValidateCodeImg();
			}
		};

		onMounted(() => {
			cdnFl.localData("clean", "LOCAL_TOKEN");
			cdnFl.deleteCookie("LOCAL_TOKEN");
			cdnFl.deleteCookie("IFLORENS_PRODUCTION_TOKEN");
			cdnFl.deleteCookie("luban_access_token");
			sessionStorage.removeItem("luban_access_token");
			localStorage.removeItem("luban_access_token");
			clickChangeValidateCodeImg();
		});

		return {
			account,
			password,
			verification,
			loading,
			codeUrl,
			passwordLogin,
			clickChangeValidateCodeImg,
		};
	},
};
</script>

<style scoped lang="scss">
.verifica {
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	.images_verifica {
		margin-left: 20px;
		height: 30px;
		background-color: #000;
		img {
			width: 100px;
			height: 40px;
		}
	}
}

@keyframes fadenum {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.form-wrap {
	width: 100%;
	height: 100%;
	background: url('./bg_image.jpg') no-repeat 100% 100%;
	background-size: 100% 100%;
	position: absolute;
	.header {
		width: 100%;
		height: 100px;
		position: absolute;
		top: 20px;
		display: flex;
		justify-content: space-between;
		// padding: 0 100px;
		.logo {
			img {
				width: 400px;
				margin-left: 30px;
			}
		}
		&-title {
			font-size: 40px;
			color: #fff;
			margin-left: 100px;
		}
	}
}
.phone {
	// height: 300px;
	animation: fadenum 1s ease;
}
.form {
	position: absolute;
	top: 200px;
	left: 100px;
	padding: 40px 20px 0;
	width: 400px;
	height: 400px;
	border-radius: 4px;
	background: rgba(255, 255, 255, 0.7);
}
.weChat {
	animation: fadenum 1s ease;
	.headImage {
		text-align: center;
		padding: 16px 0 40px 0;
		img {
			width: 96px;
			height: 96px;
			border-radius: 50%;
		}
	}
	.loginBtn {
		margin-top: 10px;
	}
	.weChatCode {
		text-align: center;
		position: relative;
		img {
			width: 200px;
			height: 200px;
			margin: 0 auto;
			padding: 8px;
			border: 1px solid #d9d9d9;
		}
		p {
			font-size: 14px;
			color: #999;
		}
		.toPasswordLogin {
			color: #5b77ff;
			margin-top: 54px;
			span {
				font-size: 16px;
				padding: 0 10px;
			}
			span:first-child {
				border-right: 2px #5b77ff solid;
			}
		}
	}
}
.title {
	font-size: 20px;
	text-align: left;
	padding-bottom: 40px;
	color: #222;
}
.input {
	width: 100%;
	position: relative;
	margin-bottom: 8px;
    :deep(.iflorens-ui-input) {
		width: 100%;
		height: 40px;
		border-radius: 4px;
		text-indent: 16px;
		font-size: 16px;
	}
}
.send-code {
	display: flex;
	&-input {
		width: 65%;
		height: 40px;
		input {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
	&-btn {
		width: 35%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #d9d9d9;
		// color: #d9d9d9;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-left: 0;
	}
}
.loginBtn {
	margin-top: 30px;
	width: 100%;
	height: 40px;
	text-align: center;
}
.changeLogin {
	width: 100%;
	height: 20px;
	padding: 0 5%;
	display: flex;
	margin-top: 48px;
	.borderLeft {
		width: 25%;
		height: 8px;
		border-bottom: 1px solid #d9d9d9;
	}
	.toWeChat {
		width: 50%;
		text-align: center;
		font-size: 16px;
		color: #5b77ff;
		cursor: pointer;
	}
	.borderRight {
		width: 25%;
		height: 8px;
		border-bottom: 1px solid #d9d9d9;
	}
}
.company {
	height: 280px;
	overflow-y: auto;
}
.company-list {
	height: 30px;
	line-height: 30px;
	margin-bottom: 5px;
	padding: 0 5px;
	cursor: pointer;
}
.company-list:hover {
	background: rgba(0, 80, 142, 0.5);
}
.company-btn {
	margin-top: 10px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #fff;
	background: #1890ff;
	border-radius: 4px;
	font-size: 16px;
	cursor: pointer;
}

.selectColor {
	// background: #1890ff;
	color: #1890ff;
	font-weight: 800;
}
.change-login-method {
	margin-top: 30px;
	color: #1890ff;
	cursor: pointer;
	&::before,
	&::after {
		border-block-color: 1px solid #fff;
		border-block-start-color: #fff;
	}
}
</style>

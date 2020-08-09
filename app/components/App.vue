<template lang="pug">
  div
    div(v-if="user")
      div 認証済み
      pre {{JSON.stringify(user, null, '  ')}}
    div(v-else)
      | 未認証
</template>
<script>
import { auth, functions } from "../plugins/firebase"

const liffId = 'YOUR_LIFF_ID'

export default {
  data() {
    return {user: null}
  },
  async mounted() {
    // 1. LIFFの初期化
    const liff = window.liff
    await liff.init({liffId})
      .catch((err) => {
        window.alert('LIFFの初期化失敗。\n' + err)
      })
    // 2. LINEに未認証の場合、ログイン画面にリダイレクト
    if (!liff.isLoggedIn()) {
      await liff.login()
      return
    }
    // 3. firebaseの認証情報を取得
    auth().onAuthStateChanged(async user => {
      if (user) {
        // 3.1 firebaseにログイン済みの場合、ユーザー情報を取得し、終了
        this.user = user
      } else {
        // 3.2 firebaseにログインしていない場合
        // 3.2.1 LIFF APIを利用して、LINEのアクセストークンを取得
        const accessToken = liff.getAccessToken()
        // 3.2.3 LINEのIDトークンをfirebase functionsに投げて、firebaseのカスタム認証用トークンを取得
        const login = functions.httpsCallable('login')
        const result = await login({accessToken})
        if (result.data.error) {
          console.error(result.data.error)
        } else {
          // 3.2.4 firebaseの認証用トークンを利用してカスタム認証
          const res = await auth().signInWithCustomToken(result.data.token)
          this.user = res.user
        }
      }
    })
  }
}
</script>

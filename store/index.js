export const strict = false

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous
    }
  }
}

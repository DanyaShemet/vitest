import { ref, reactive } from 'vue'

export const useSetupData = () => {
  const times = ref(2)
  const state = reactive({
    fn: '',
    ln: '',
  })

  const handleForm = () => {
    console.log(state)
  }
  return {
    times,
    state,
    handleForm,
  }
}

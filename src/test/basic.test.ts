import ProfileInfo from '../components/ProfileInfo.vue'
import '@testing-library/jest-dom'
import { expect} from 'vitest'
import axios from "axios";
import {post} from "../mocks";
import {render, waitFor} from "@testing-library/vue";

describe('component ProfileInfo',  () => {
  // it('mounting', async () => {
  //   const view = render(ProfileInfo)
  //   expect(view).toBeDefined()
  // })

  it('api loading', async () => {
    const view = render(ProfileInfo)
    // const spy = vi.spyOn(axios, 'get')
    await waitFor(() => {
      expect(view.getByText('Load')).toBeInTheDocument()
    })
  })

  it('api success', async () => {
    const view = render(ProfileInfo)
    // const spy = vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
    //   data: post,
    // }))
    await waitFor(() => {
      expect(view.getByText(post.userId)).toBeInTheDocument()
    })
  })

  it('api error', async () => {
    const view = render(ProfileInfo)
    const spy = vi.spyOn(axios, 'get').mockRejectedValue(new Error('Async error'))
    await waitFor(() => {
      expect(view.getByText('error')).toBeInTheDocument()
    })
  })

})

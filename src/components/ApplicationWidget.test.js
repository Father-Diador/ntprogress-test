import { render, screen, fireEvent } from '@testing-library/vue'

import ApplicationWidget from './ApplicationWidget.vue'

test('Request is not empty', async () => {

  const options = {
    props: {

    }
  }

  render(ApplicationWidget, options)

  await fireEvent.click(screen.getByTestId('send-buy-request-button'))

  screen.debug()

})
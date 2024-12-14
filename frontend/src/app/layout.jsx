// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'nprogress/nprogress.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

// Animate CSS
import 'animate.css'

export const metadata = {
  title: 'PokemonApp',
  description: 'Pokemon Test app.'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout

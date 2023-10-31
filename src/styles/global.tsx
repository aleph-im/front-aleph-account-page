import { createGlobalStyle } from 'styled-components'

export const GlobalStylesOverride = createGlobalStyle`
  html, body, #__next {
    height: 100%;
  }

  section {
    padding: 0;
  }

  /* FIXME: */
  .unavailable-content {
    opacity: 0.3;
    filter: grayscale(1);
    pointer-events: none;
  }

  /* FIXME: */
  textarea {
    width: 100%;
    background: linear-gradient(to bottom, #FFFFFF33, transparent);
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #FFFFFF33;
    color: inherit;
  }

  p {
    color: ${({ theme }) => theme.color.text};
  }

  html {
    // font-size: 16px !important; 
  }
`

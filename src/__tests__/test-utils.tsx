import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter as Router } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <CssVarsProvider>
    <Router>
      {children}
    </Router>
  </CssVarsProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

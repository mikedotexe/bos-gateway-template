import styled from 'styled-components';

import { useFlags } from '@/hooks/useFlags';

const ErrorBanner = styled.div`
  background: rgb(255, 121, 102);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  column-gap: 8px;

  p {
    margin: 0;
  }
`;

const Button = styled.button`
  all: unset;
  display: block;
  height: 16px;
  line-height: 16px;
  color: #664d04;
`;

interface ErrorLoaderBannerProps {
    errorInfo?: string;
}
export function ErrorLoaderBanner({ errorInfo }: ErrorLoaderBannerProps) {
  if (!errorInfo) {
      return (<></>)
  } else {
      return (
        <ErrorBanner>
          <div>
              <p>Problem: <strong>{errorInfo}</strong></p>
          </div>
        </ErrorBanner>
      );
  }
}

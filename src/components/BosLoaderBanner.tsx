import styled from 'styled-components';

import { useFlags } from '@/hooks/useFlags';
import { useBosLoaderStore } from '@/stores/bos-loader';

const Banner = styled.div`
  //background: #fff2cd;
  border-bottom: 1px solid #f2f1e9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  column-gap: 8px;

  p {
    margin: 0;
    color: rgba(0, 236, 151, 0.6);
  }
`;

const Button = styled.button`
  all: unset;
  display: block;
  height: 16px;
  line-height: 16px;
  color: red;
  //color: #664d04;
`;

// const externalLink = url("data:image/svg+xml;charset=utf-8,%3Csvg fill='%235f8afaff' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 13v10H0V4h12v2H2v15h17v-8h2zm3-12H13.012l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07L24 12V1z'/%3E%3C/svg%3E")

export function BosLoaderBanner() {
  const redirectMapStore = useBosLoaderStore();
  const [flags, setFlags] = useFlags();

  function closeBanner() {
    if (flags?.bosLoaderUrl) {
      setFlags({ bosLoaderUrl: undefined });
    }
  }

  if (!redirectMapStore.loaderUrl) return null;

  return (
    <Banner>
      <div>
        <p>Loading components from: {redirectMapStore.loaderUrl} (<a href={"https://github.com/near/bos-loader?tab=readme-ov-file#usage"} target={"_blank"}><span className={"external-link"}>bos-loader ↗</span></a>)</p>
        {redirectMapStore.failedToLoad && (
          <p style={{ color: 'red' }}>
            BOS Loader fetch error, see console logs. CORS errors may be misleading and mean your endpoint cannot be
            reached
          </p>
        )}
      </div>
    </Banner>
  );
}

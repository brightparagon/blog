import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { mediumWidth } from 'components/Layout'

interface Props {
  place: string
}

const googleMapURL = 'https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed'

const GoogleMap = ({ place }: Props) => {
  return (
    <MapOuter>
      <Canvas>
        <iframe
          css={css`
            width: 680px;
            height: 400px;

            @media (max-width: ${mediumWidth}px) {
              height: 300px;
            }
          `}
          src={`${googleMapURL}&q=${encodeURI(place)}`}
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        />
      </Canvas>
    </MapOuter>
  )
}

export default GoogleMap

const MapOuter = styled.section`
  position: relative;
  text-align: right;
  max-width: 680px;
  max-height: 400px;
  width: 100%;
  height: 100%;
`

const Canvas = styled.div`
  overflow: hidden;
  background: none;
  width: 100%;
  height: 100%;
`

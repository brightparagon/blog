import { FC } from "react"
import styled from '@emotion/styled'

interface Props {
  place: string
}

const googleMapURL = 'https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed'

const GoogleMap: FC<Props> = ({ place }) => {
  return (
    <MapOuter>
      <Canvas>
        <iframe
          width="680"
          height="400"
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
  height: 400px;
  width: 680px;
`

const Canvas = styled.div`
  overflow: hidden;
  background: none !important;
  height: 400px;
  width: 680px;
`

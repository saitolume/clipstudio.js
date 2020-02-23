export type Layer = {
  id: string // LayerUuid
  index: number // _PW_ID
  name: string // LayerName
  opacity: number // LayerOpacity (0 - 256) / 256
  isVisible: boolean // LayerVisibility 0: false, 1: true, 3: ???
  isFolder: boolean // LayerFolder 0: false, 17: true, 1: ???
}

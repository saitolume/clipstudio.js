/**
 * Represents a layer in a CLIP STUDIO file
 */
export type Layer = {
  /** Layer unique identifier (LayerUuid) */
  id: string
  /** Layer index in the hierarchy (_PW_ID) */
  index: number
  /** Layer display name (LayerName) */
  name: string
  /** Layer opacity as a decimal from 0 to 1 (LayerOpacity normalized from 0-256) */
  opacity: number
  /** Whether the layer is visible (LayerVisibility: 0=false, 1=true) */
  isVisible: boolean
  /** Whether this is a folder layer (LayerFolder: 0=false, 17=true) */
  isFolder: boolean
}

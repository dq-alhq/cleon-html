import './icons'

declare var _: any
declare var DataTable: any
declare var Dropzone: any

let DataTableModule: any
let FileUploadModule: any
let jQuery: any

export { default as Accordion } from './components/accordion'
export { default as Carousel } from './components/carousel'
export { default as Collapsible } from './components/collapsible'
export { default as ComboBox } from './components/combobox'
export { default as CopyMarkup } from './components/copy-markup'
export { default as InputNumber } from './components/input-number'
export { default as Dropdown } from './components/menu'
export { default as Overlay } from './components/overlay'
export { default as PinInput } from './components/pin-input'
export { default as RemoveElement } from './components/remove-element'
export { default as Scrollspy } from './components/scrollspy'
export { default as Select } from './components/select'
export { default as Stepper } from './components/stepper'
export { default as StrongPassword } from './components/strong-password'
export { default as Tabs } from './components/tabs'
export { default as ThemeSwitch } from './components/theme-switch'
export { default as ToggleCount } from './components/toggle-count'
export { default as TogglePassword } from './components/toggle-password'
export { default as Tooltip } from './components/tooltip'
export { DataTableModule as Datatable }

if (typeof DataTable !== 'undefined' && typeof jQuery !== 'undefined')
    DataTableModule = require('./components/datatable').default
else DataTableModule = null

if (typeof _ !== 'undefined' && typeof Dropzone !== 'undefined')
    FileUploadModule = require('./components/file-upload').default
else FileUploadModule = null
export { FileUploadModule as FileUpload }

import './icons'

declare var _: any
declare var DataTable: any
declare var Dropzone: any

let HSDataTableModule: any
let HSFileUploadModule: any
let jQuery: any

export { default as HSAccordion } from './components/accordion'
export { default as HSCarousel } from './components/carousel'
export { default as HSCollapse } from './components/collapse'
export { default as HSComboBox } from './components/combobox'
export { default as HSCopyMarkup } from './components/copy-markup'
export { default as HSDropdown } from './components/dropdown'
export { default as HSInputNumber } from './components/input-number'
export { default as HSOverlay } from './components/overlay'
export { default as HSPinInput } from './components/pin-input'
export { default as HSRemoveElement } from './components/remove-element'
export { default as HSScrollspy } from './components/scrollspy'
export { default as HSSelect } from './components/select'
export { default as HSStepper } from './components/stepper'
export { default as HSStrongPassword } from './components/strong-password'
export { default as HSTabs } from './components/tabs'
export { default as HSThemeSwitch } from './components/theme-switch'
export { default as HSToggleCount } from './components/toggle-count'
export { default as HSTogglePassword } from './components/toggle-password'
export { default as HSTooltip } from './components/tooltip'
export { HSDataTableModule as HSDataTable }

if (typeof DataTable !== 'undefined' && typeof jQuery !== 'undefined')
    HSDataTableModule = require('./components/datatable').default
else HSDataTableModule = null

if (typeof _ !== 'undefined' && typeof Dropzone !== 'undefined')
    HSFileUploadModule = require('./components/file-upload').default
else HSFileUploadModule = null
export { HSFileUploadModule as HSFileUpload }

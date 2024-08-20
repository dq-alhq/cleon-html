import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem'
            },
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                sans: ['GT Walsheim Pro', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                danger: {
                    DEFAULT: 'hsl(var(--danger))',
                    foreground: 'hsl(var(--danger-foreground))'
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))'
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))'
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))'
                },
                dark: {
                    DEFAULT: 'hsl(var(--dark))',
                    foreground: 'hsl(var(--dark-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant('dropdown-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dropdown.open > .${e(`dropdown-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dropdown.open > .dropdown-toggle .${e(`dropdown-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dropdown.open > .dropdown-menu > .${e(`dropdown-open${separator}${className}`)}`
                    })
                }
            ])

            addVariant('removing', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.removing.${e(`removing${separator}${className}`)}`
                })
            })

            addVariant('tooltip-shown', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.tooltip.show .${e(`tooltip-shown${separator}${className}`)}`
                })
            })

            addVariant('accordion-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active.${e(`accordion-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active > .${e(`accordion-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active > .accordion-toggle .${e(`accordion-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active > .accordion-heading > .accordion-toggle .${e(
                            `accordion-active${separator}${className}`
                        )}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active > .accordion-toggle.${e(`accordion-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accordion.active > .accordion-heading > .accordion-toggle.${e(
                            `accordion-active${separator}${className}`
                        )}`
                    })
                }
            ])

            addVariant('accordion-selected', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.accordion .selected.${e(`accordion-selected${separator}${className}`)}`
                })
            })

            addVariant('collapse-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.collapse.open .${e(`collapse-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.collapse.open.${e(`collapse-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.collapse-toggle.open .${e(`collapse-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.collapse-toggle.open.${e(`collapse-open${separator}${className}`)}`
                    })
                }
            ])

            addVariant('tab-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `[data-tab].active.${e(`tab-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `[data-tab].active .${e(`tab-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('overlay-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.open.${e(`overlay-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.open .${e(`overlay-open${separator}${className}`)}`
                    })
                }
            ])

            addVariant('overlay-layout-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.overlay-body-open.${e(`overlay-layout-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.overlay-body-open .${e(`overlay-layout-open${separator}${className}`)}`
                    })
                }
            ])

            addVariant('overlay-backdrop-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.overlay-backdrop.${e(`overlay-backdrop-open${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.overlay-backdrop .${e(`overlay-backdrop-open${separator}${className}`)}`
                    })
                }
            ])

            addVariant('scrollspy-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.active.${e(`scrollspy-active${separator}${className}`)}`
                })
            })

            addVariant('carousel-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`carousel-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`carousel-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('carousel-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`carousel${separator}disabled${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`carousel${separator}disabled${separator}${className}`)}`
                    })
                }
            ])

            addVariant('selected', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected.${e(`selected${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected .${e(`selected${separator}${className}`)}`
                    })
                }
            ])

            addVariant('select-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`select-disabled${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`select-disabled${separator}${className}`)}`
                    })
                }
            ])

            addVariant('select-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`select-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`select-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('input-number-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`input-number-disabled${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`input-number-disabled${separator}${className}`)}`
                    })
                }
            ])

            addVariant('pin-input-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`pin-input-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`pin-input-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('select-opened', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.opened.${e(`select-opened${separator}${className}`)}`
                    })
                }
            ])

            addVariant('password-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`password-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`password-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`stepper-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`stepper-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-success', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success.${e(`stepper-success${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success .${e(`stepper-success${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-completed', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.completed.${e(`stepper-completed${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.completed .${e(`stepper-completed${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-error', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error.${e(`stepper-error${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error .${e(`stepper-error${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-processed', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.processed.${e(`stepper-processed${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.processed .${e(`stepper-processed${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`stepper-disabled${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`stepper-disabled${separator}${className}`)}`
                    })
                }
            ])

            addVariant('stepper-skipped', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.skipped.${e(`stepper-skipped${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.skipped .${e(`stepper-skipped${separator}${className}`)}`
                    })
                }
            ])

            addVariant('strong-password', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.passed.${e(`strong-password${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.passed .${e(`strong-password${separator}${className}`)}`
                    })
                }
            ])

            addVariant('strong-password-accepted', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accepted.${e(`strong-password-accepted${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accepted .${e(`strong-password-accepted${separator}${className}`)}`
                    })
                }
            ])

            addVariant('strong-password-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`strong-password-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('combo-box-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`combo-box-active${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`combo-box-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('combo-box-has-value', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.has-value .${e(`combo-box-has-value${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.has-value.${e(`combo-box-has-value${separator}${className}`)}`
                    })
                }
            ])

            addVariant('combo-box-selected', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected .${e(`combo-box-selected${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected.${e(`combo-box-selected${separator}${className}`)}`
                    })
                }
            ])

            addVariant('combo-box-tab-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`combo-box-tab-active${separator}${className}`)}`
                    })
                }
            ])

            addVariant('apexcharts-tooltip-dark', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dark.${e(`apexcharts-tooltip-dark${separator}${className}`)}`
                    })
                }
            ])

            addVariant('success', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success .${e(`success${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success.${e(`success${separator}${className}`)}`
                    })
                }
            ])

            addVariant('error', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error .${e(`error${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error.${e(`error${separator}${className}`)}`
                    })
                }
            ])

            // Datatables.net
            addVariant('datatable-ordering-asc', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-asc .${e(`datatable-ordering-asc${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-asc.${e(`datatable-ordering-asc${separator}${className}`)}`
                    })
                }
            ])

            addVariant('datatable-ordering-desc', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-desc .${e(`datatable-ordering-desc${separator}${className}`)}`
                    })
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-desc.${e(`datatable-ordering-desc${separator}${className}`)}`
                    })
                }
            ])

            // Modes
            addVariant('default-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.default .${e(`default-mode-active${separator}${className}`)}`
                })
            })

            addVariant('dark-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.dark .${e(`dark-mode-active${separator}${className}`)}`
                })
            })

            addVariant('auto-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.auto .${e(`auto-mode-active${separator}${className}`)}`
                })
            })
        })
    ]
}

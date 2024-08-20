import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
            },
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['GT Walsheim Pro', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                danger: {
                    DEFAULT: 'hsl(var(--danger))',
                    foreground: 'hsl(var(--danger-foreground))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                dark: {
                    DEFAULT: 'hsl(var(--dark))',
                    foreground: 'hsl(var(--dark-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant('hs-dropdown-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-dropdown.open > .${e(
                            `hs-dropdown-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-dropdown.open > .hs-dropdown-toggle .${e(
                            `hs-dropdown-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-dropdown.open > .hs-dropdown-menu > .${e(
                            `hs-dropdown-open${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-removing', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.hs-removing.${e(`hs-removing${separator}${className}`)}`;
                });
            });

            addVariant('hs-tooltip-shown', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.hs-tooltip.show .${e(
                        `hs-tooltip-shown${separator}${className}`,
                    )}`;
                });
            });

            addVariant('hs-accordion-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active.${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active > .${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active > .hs-accordion-toggle .${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active > .hs-accordion-heading > .hs-accordion-toggle .${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active > .hs-accordion-toggle.${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-accordion.active > .hs-accordion-heading > .hs-accordion-toggle.${e(
                            `hs-accordion-active${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-accordion-selected', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.hs-accordion .selected.${e(
                        `hs-accordion-selected${separator}${className}`,
                    )}`;
                });
            });

            addVariant('hs-collapse-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-collapse.open .${e(
                            `hs-collapse-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-collapse.open.${e(
                            `hs-collapse-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-collapse-toggle.open .${e(
                            `hs-collapse-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-collapse-toggle.open.${e(
                            `hs-collapse-open${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-tab-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `[data-hs-tab].active.${e(
                            `hs-tab-active${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `[data-hs-tab].active .${e(
                            `hs-tab-active${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-overlay-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.open.${e(`hs-overlay-open${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.open .${e(`hs-overlay-open${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-overlay-layout-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-overlay-body-open.${e(
                            `hs-overlay-layout-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-overlay-body-open .${e(
                            `hs-overlay-layout-open${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-overlay-backdrop-open', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-overlay-backdrop.${e(
                            `hs-overlay-backdrop-open${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.hs-overlay-backdrop .${e(
                            `hs-overlay-backdrop-open${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-scrollspy-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.active.${e(`hs-scrollspy-active${separator}${className}`)}`;
                });
            });

            addVariant('hs-carousel-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-carousel-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-carousel-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-carousel-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(
                            `hs-carousel${separator}disabled${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(
                            `hs-carousel${separator}disabled${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-selected', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected.${e(`hs-selected${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected .${e(`hs-selected${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-select-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`hs-select-disabled${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`hs-select-disabled${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-select-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-select-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-select-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-input-number-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(
                            `hs-input-number-disabled${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(
                            `hs-input-number-disabled${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-pin-input-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-pin-input-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-pin-input-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-select-opened', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.opened.${e(`hs-select-opened${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-password-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-password-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-password-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-stepper-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-stepper-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-stepper-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-stepper-success', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success.${e(`hs-stepper-success${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success .${e(`hs-stepper-success${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-stepper-completed', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.completed.${e(
                            `hs-stepper-completed${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.completed .${e(
                            `hs-stepper-completed${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-stepper-error', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error.${e(`hs-stepper-error${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error .${e(`hs-stepper-error${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-stepper-processed', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.processed.${e(
                            `hs-stepper-processed${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.processed .${e(
                            `hs-stepper-processed${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-stepper-disabled', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled.${e(`hs-stepper-disabled${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.disabled .${e(`hs-stepper-disabled${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-stepper-skipped', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.skipped.${e(`hs-stepper-skipped${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.skipped .${e(`hs-stepper-skipped${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-strong-password', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.passed.${e(`hs-strong-password${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.passed .${e(`hs-strong-password${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-strong-password-accepted', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accepted.${e(
                            `hs-strong-password-accepted${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.accepted .${e(
                            `hs-strong-password-accepted${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-strong-password-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(
                            `hs-strong-password-active${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-combo-box-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active .${e(`hs-combo-box-active${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(`hs-combo-box-active${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-combo-box-has-value', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.has-value .${e(`hs-combo-box-has-value${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.has-value.${e(`hs-combo-box-has-value${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-combo-box-selected', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected .${e(
                            `hs-combo-box-selected${separator}${className}`,
                        )}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.selected.${e(
                            `hs-combo-box-selected${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-combo-box-tab-active', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.active.${e(
                            `hs-combo-box-tab-active${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-apexcharts-tooltip-dark', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dark.${e(
                            `hs-apexcharts-tooltip-dark${separator}${className}`,
                        )}`;
                    });
                },
            ]);

            addVariant('hs-success', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success .${e(`hs-success${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.success.${e(`hs-success${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-error', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error .${e(`hs-error${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.error.${e(`hs-error${separator}${className}`)}`;
                    });
                },
            ]);

            // Datatables.net
            addVariant('hs-datatable-ordering-asc', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-asc .${e(`hs-datatable-ordering-asc${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-asc.${e(`hs-datatable-ordering-asc${separator}${className}`)}`;
                    });
                },
            ]);

            addVariant('hs-datatable-ordering-desc', [
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-desc .${e(`hs-datatable-ordering-desc${separator}${className}`)}`;
                    });
                },
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        return `.dt-ordering-desc.${e(`hs-datatable-ordering-desc${separator}${className}`)}`;
                    });
                },
            ]);

            // Modes
            addVariant('hs-default-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.default .${e(`hs-default-mode-active${separator}${className}`)}`;
                });
            });

            addVariant('hs-dark-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.dark .${e(`hs-dark-mode-active${separator}${className}`)}`;
                });
            });

            addVariant('hs-auto-mode-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.auto .${e(`hs-auto-mode-active${separator}${className}`)}`;
                });
            });
        })
    ],
}

const config: any = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            screens: {
                sm: "435px",
                md: "775px",
                lg: "1250px",
                xl: "2000px",
                quad: "2560px",
            },
            keyframes: {
                "blob-morph": {
                    "0%": {borderRadius: "64% 36% 42% 58% / 55% 62% 38% 45%"},
                    "33%": {borderRadius: "40% 60% 64% 36% / 63% 40% 60% 37%"},
                    "66%": {borderRadius: "56% 44% 36% 64% / 38% 58% 42% 62%"},
                    "100%": {borderRadius: "62% 38% 56% 44% / 46% 37% 63% 54%"},
                },
                "blob-spin": {
                    from: {rotate: "-5deg"},
                    to: {rotate: "5deg"},
                },
                "blob-counter-spin": {
                    from: {rotate: "5deg"},
                    to: {rotate: "-5deg"},
                },
                "blob-float": {
                    from: {translate: "0 -6px"},
                    to: {translate: "0 6px"},
                },
                "circle-text": {
                    from: {rotate: "0deg"},
                    to: {rotate: "360deg"},
                },
                "fade-in": {
                    from: {color: "#fff", marginTop: "10px"},
                    to: {color: "rgba(0,0,0,0.6)", marginTop: "0"}
                },
                "overlay-in": {
                    from: {opacity: "0"},
                    to: {opacity: "1"},
                },
                "overlay-out": {
                    from: {opacity: "1"},
                    to: {opacity: "0"},
                },
                "lightbox-in": {
                    from: {opacity: "0", transform: "translateY(24px) scale(0.98)"},
                    to: {opacity: "1", transform: "translateY(0) scale(1)"},
                },
                "lightbox-out": {
                    from: {opacity: "1", transform: "translateY(0) scale(1)"},
                    to: {opacity: "0", transform: "translateY(24px) scale(0.98)"},
                },
            },
            animation: {
                blob: "blob-morph 12s cubic-bezier(.37,0,.63,1) infinite alternate, blob-spin 17s ease-in-out infinite alternate, blob-float 7s ease-in-out infinite alternate",
                "blob-counter": "blob-counter-spin 17s ease-in-out infinite alternate",
                "circle-text": "circle-text 24s linear infinite",
                "fade-in": "fade-in 0.3s ease-out forwards",
                "overlay-in": "overlay-in 0.22s cubic-bezier(.2,.7,.3,1) both",
                "overlay-out": "overlay-out 0.22s cubic-bezier(.2,.7,.3,1) both",
                "lightbox-in": "lightbox-in 0.22s cubic-bezier(.2,.7,.3,1) both",
                "lightbox-out": "lightbox-out 0.22s cubic-bezier(.2,.7,.3,1) both",
            },
        },
    },
    plugins: [
        function ({addUtilities}: any) {
            addUtilities({
                ".fadeBothEdges": {
                    "-webkit-mask-image": "linear-gradient(to right, transparent 4%, white 25%, white 80%, transparent 99%)",
                    "mask-image": "linear-gradient(to right, transparent 4%, white 25%, white 80%, transparent 99%)",
                },
                ".fadeToLeft": {
                    "-webkit-mask-image": "linear-gradient(to left, white 80%, transparent 97%)",
                    "mask-image": "linear-gradient(to left, white 80%, transparent 97%)",
                },
                ".fadeToRight": {
                    "-webkit-mask-image": "linear-gradient(to right, white 80%, transparent 99%)",
                    "mask-image": "linear-gradient(to right, white 80%, transparent 99%)",
                }
            })
        }
    ],
};
export default config;

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
                blob: {
                    "0%": {
                        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                    },
                    "20%": {
                        borderRadius: "50% 60% 40% 50% / 55% 45% 55% 50%",
                    },
                    "40%": {
                        borderRadius: "40% 50% 60% 40% / 50% 60% 30% 60%",
                    },
                    "60%": {
                        borderRadius: "30% 60% 50% 40% / 70% 30% 50% 60%",
                    },
                    "100%": {
                        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                    },
                },
                "circle-text": {
                    from: {rotate: "0deg"},
                    to: {rotate: "360deg"},
                },
                "fade-in": {
                    from: {color: "#fff", marginTop: "10px"},
                    to: {color: "rgba(0,0,0,0.6)", marginTop: "0"}
                }
            },
            animation: {
                blob: "blob 7s linear infinite",
                "circle-text": "circle-text 24s linear infinite",
                "fade-in": "fade-in 0.3s ease-out forwards",
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

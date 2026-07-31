(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/FeaturedMiceBackgrounds.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturedMiceBackgrounds",
    ()=>FeaturedMiceBackgrounds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function seededRandom(seed) {
    let s = seed;
    return ()=>{
        s = s * 1664525 + 1013904223 & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
}
function hashId(id) {
    let hash = 0;
    for(let i = 0; i < id.length; i++){
        hash = (hash << 5) - hash + id.charCodeAt(i) | 0;
    }
    return hash;
}
function FeaturedMiceBackgrounds() {
    _s();
    const featuredMice = [
        {
            id: 'logitech-gpx2',
            name: 'G Pro X Superlight 2',
            weight: 60,
            rating: 4.7,
            image: '/assets/mice/logitech-gpx2-top.svg'
        },
        {
            id: 'razer-viper-v3-pro',
            name: 'Viper V3 Pro',
            weight: 54,
            rating: 4.8,
            image: '/assets/mice/razer-viper-v3-pro-top.svg'
        },
        {
            id: 'pulsar-x2h',
            name: 'X2H',
            weight: 52,
            rating: 4.5,
            image: '/assets/mice/pulsar-x2h-top.svg'
        },
        {
            id: 'lamzu-atlantis',
            name: 'Atlantis Mini',
            weight: 49,
            rating: 4.6,
            image: '/assets/mice/lamzu-atlantis-top.svg'
        },
        {
            id: 'finalmouse-starlight',
            name: 'Starlight-12 Medium',
            weight: 43,
            rating: 4.3,
            image: '/assets/mice/finalmouse-starlight-top.svg'
        },
        {
            id: 'g-wolves-hsk-pro',
            name: 'HSK Pro 4K',
            weight: 35,
            rating: 4.1,
            image: '/assets/mice/g-wolves-hsk-pro-top.svg'
        },
        {
            id: 'zowie-ec2-cw',
            name: 'EC2-CW',
            weight: 77,
            rating: 4.4,
            image: '/assets/mice/zowie-ec2-cw-top.svg'
        },
        {
            id: 'vaxee-xe-wireless',
            name: 'XE Wireless',
            weight: 68,
            rating: 4.5,
            image: '/assets/mice/vaxee-xe-wireless-top.svg'
        },
        {
            id: 'ninjutso-sora',
            name: 'Sora V2',
            weight: 47,
            rating: 4.4,
            image: '/assets/mice/ninjutso-sora-top.svg'
        },
        {
            id: 'endgame-xm2we',
            name: 'XM2we',
            weight: 63,
            rating: 4.6,
            image: '/assets/mice/endgame-xm2we-top.svg'
        },
        {
            id: 'cooler-master-mm712',
            name: 'MM712',
            weight: 58,
            rating: 4.0,
            image: '/assets/mice/cooler-master-mm712-top.svg'
        },
        {
            id: 'steelseries-aerox-3',
            name: 'Aerox 3 Wireless',
            weight: 66,
            rating: 4.2,
            image: '/assets/mice/steelseries-aerox-3-top.svg'
        }
    ];
    const generateBackgrounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FeaturedMiceBackgrounds.useMemo[generateBackgrounds]": ()=>featuredMice.map({
                "FeaturedMiceBackgrounds.useMemo[generateBackgrounds]": (mouse, index)=>{
                    const rand = seededRandom(hashId(mouse.id));
                    const top = `${rand() * 100}%`;
                    const left = `${rand() * 100}%`;
                    const width = `${80 + rand() * 120}px`;
                    const height = `${80 + rand() * 120}px`;
                    const animationDelay = `${index * 0.5}s`;
                    const animationDuration = `${20 + rand() * 20}s`;
                    return {
                        id: mouse.id,
                        top,
                        left,
                        width,
                        height,
                        animationDelay,
                        animationDuration
                    };
                }
            }["FeaturedMiceBackgrounds.useMemo[generateBackgrounds]"])
    }["FeaturedMiceBackgrounds.useMemo[generateBackgrounds]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "absolute inset-0 -z-10 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]"
            }, void 0, false, {
                fileName: "[project]/src/components/FeaturedMiceBackgrounds.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-full",
                children: generateBackgrounds.map((bg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute animate-float opacity-20",
                        style: bg,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: featuredMice.find((m)=>m.id === bg.id)?.image || '',
                            alt: featuredMice.find((m)=>m.id === bg.id)?.name || '',
                            width: 200,
                            height: 200,
                            className: "object-contain filter grayscale hover:grayscale-0 hover:opacity-50 hover:scale-110 transition-all duration-700",
                            style: {
                                width: 'auto',
                                height: 'auto'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/FeaturedMiceBackgrounds.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    }, bg.id, false, {
                        fileName: "[project]/src/components/FeaturedMiceBackgrounds.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/FeaturedMiceBackgrounds.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FeaturedMiceBackgrounds.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(FeaturedMiceBackgrounds, "Jrp7MGGR62hgPc6GQt5tM5i8axI=");
_c = FeaturedMiceBackgrounds;
var _c;
__turbopack_context__.k.register(_c, "FeaturedMiceBackgrounds");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroSlider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSlider",
    ()=>HeroSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-compare.mjs [app-client] (ecmascript) <export default as GitCompare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shapes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shapes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shapes.mjs [app-client] (ecmascript) <export default as Shapes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const slides = [
    {
        image: '/assets/hero-niko.jpg',
        badge: 'New Release — Razer DeathAdder V4 Pro NiKo Edition',
        title: 'Find Your',
        subtitle: 'Perfect Aim',
        description: 'The ultimate gaming mouse database. Compare specs, visualize shapes, and discover the perfect mouse for your hand size and grip style.'
    },
    {
        image: '/assets/mice/photos/logitech-gpx2.jpg',
        badge: 'Lightweight Champion — Logitech G Pro X Superlight 2',
        title: 'Barely There,',
        subtitle: 'Unstoppable',
        description: 'At just 60 grams with the HERO 2 sensor, the Superlight 2 delivers pro-level precision in an impossibly light package.'
    },
    {
        image: '/assets/mice/photos/razer-viper-v3-pro.jpg',
        badge: 'Next-Gen Speed — Razer Viper V4 Pro',
        title: 'Speed That',
        subtitle: 'Outruns Everything',
        description: 'The Viper V4 Pro combines a sub-55g design with the Focus Pro 35K sensor for pixel-perfect tracking at 35,000 DPI.'
    }
];
function HeroSlider() {
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const transitioning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const goTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HeroSlider.useCallback[goTo]": (index)=>{
            if (transitioning.current || index === current) return;
            transitioning.current = true;
            setCurrent(index);
            setTimeout({
                "HeroSlider.useCallback[goTo]": ()=>{
                    transitioning.current = false;
                }
            }["HeroSlider.useCallback[goTo]"], 700);
        }
    }["HeroSlider.useCallback[goTo]"], [
        current
    ]);
    const goNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HeroSlider.useCallback[goNext]": ()=>{
            if (transitioning.current) return;
            const next = (current + 1) % slides.length;
            transitioning.current = true;
            setCurrent(next);
            setTimeout({
                "HeroSlider.useCallback[goNext]": ()=>{
                    transitioning.current = false;
                }
            }["HeroSlider.useCallback[goNext]"], 700);
        }
    }["HeroSlider.useCallback[goNext]"], [
        current
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSlider.useEffect": ()=>{
            timerRef.current = setInterval(goNext, 5000);
            return ({
                "HeroSlider.useEffect": ()=>clearInterval(timerRef.current)
            })["HeroSlider.useEffect"];
        }
    }["HeroSlider.useEffect"], [
        goNext
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative mb-20 overflow-hidden rounded-2xl border border-[#2a2a3a]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex transition-transform duration-700 ease-in-out",
                    style: {
                        transform: `translateX(-${current * 100}%)`
                    },
                    children: slides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative min-w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-cover bg-center",
                                    style: {
                                        backgroundImage: `url('${slide.image}')`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSlider.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-r from-[#050508]/60 via-transparent to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSlider.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSlider.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_40%,rgba(5,5,8,0.3)_100%)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSlider.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex flex-col items-center gap-6 px-6 py-16 lg:flex-row lg:px-16 lg:py-24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 text-center lg:text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#050508]/60 px-3 py-1 text-xs font-medium text-[#6c5ce7] backdrop-blur-sm border border-[#2a2a3a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HeroSlider.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 21
                                                    }, this),
                                                    slide.badge
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-6xl",
                                                children: [
                                                    slide.title,
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] bg-clip-text text-transparent",
                                                        children: slide.subtitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HeroSlider.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#c0c0cc] drop-shadow lg:mx-0 lg:text-base",
                                                children: slide.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/compare",
                                                        className: "flex items-center gap-2 rounded-lg bg-[#6c5ce7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5a4bd6] animate-pulse-glow shadow-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompare$3e$__["GitCompare"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Start Comparing",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HeroSlider.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/visualizer",
                                                        className: "flex items-center gap-2 rounded-lg border border-[#ffffff30] bg-[#050508]/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#050508]/70 backdrop-blur-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shapes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shapes$3e$__["Shapes"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Shape Overlay"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HeroSlider.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HeroSlider.tsx",
                                                lineNumber: 91,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HeroSlider.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroSlider.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/HeroSlider.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroSlider.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2",
                    children: slides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>goTo(i),
                            className: `h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#6c5ce7]' : 'w-2 bg-white/40 hover:bg-white/60'}`
                        }, i, false, {
                            fileName: "[project]/src/components/HeroSlider.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroSlider.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroSlider.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HeroSlider.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(HeroSlider, "LDywJ8mMRgruQjtVJMM/ADT4tD0=");
_c = HeroSlider;
var _c;
__turbopack_context__.k.register(_c, "HeroSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_0fhcd37._.js.map
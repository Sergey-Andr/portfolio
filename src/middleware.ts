import {NextRequest, NextResponse} from "next/server";
import acceptLanguage from "accept-language";
import {cookieName, fallbackLng, languages} from "@/app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*(?<!\\.png|\\.jpg|\\.jpeg|\\.gif|\\.svg|\\.ico|\\.pdf))",
    ],
};

export function middleware(req: NextRequest) {
    let lng;
    if (req.cookies.has(cookieName))
        lng = acceptLanguage.get(req.cookies.get(cookieName as any)?.value);
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
        );
    }

    if (req.headers.has("referer")) {
        const refererUrl = new URL(req.headers.get("referer"));
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        const response = NextResponse.next();
        if (lngInReferer)
            response.cookies.set(cookieName as any, lngInReferer as any);
        return response;
    }

    return NextResponse.next();
}

import {NextRequest, NextResponse} from "next/server";
import acceptLanguage from "accept-language";
import {cookieName, fallbackLng, languages, languageToLocale, localeToLanguage} from "@/app/i18n/settings";

acceptLanguage.languages(languages.map(languageToLocale));

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*(?<!\\.png|\\.jpg|\\.jpeg|\\.gif|\\.svg|\\.ico|\\.pdf|\\.webp|\\.mp4|\\.webm))",
    ],
};

const detectLanguage = (req: NextRequest) => {
    const fromCookie = req.cookies.get(cookieName)?.value;
    if (fromCookie && languages.includes(fromCookie)) return fromCookie;
    const fromHeader = acceptLanguage.get(req.headers.get("Accept-Language"));
    return fromHeader ? localeToLanguage(fromHeader) : fallbackLng;
};

export function middleware(req: NextRequest) {
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(`/${detectLanguage(req)}${req.nextUrl.pathname}`, req.url),
        );
    }

    const referer = req.headers.get("referer");
    if (referer) {
        const refererUrl = new URL(referer);
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        const response = NextResponse.next();
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next();
}

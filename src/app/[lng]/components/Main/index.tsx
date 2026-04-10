import Home from "@/app/[lng]/components/Main/components/Home";
import About from "@/app/[lng]/components/Main/components/About";
import Projects from "@/app/[lng]/components/Main/components/Projects";
import {TFunction} from "@/app/i18n";
import Articles from "@/app/[lng]/components/Main/components/Articles";

export default async function Main({language}: { language: TFunction }) {
    return (
        <main className="h-full w-3/5 max-lg:w-4/5 max-sm:w-full m-auto">
            <Home language={language}/>
            <About language={language}/>
            <Projects language={language}/>
            <Articles/>
        </main>
    );
}

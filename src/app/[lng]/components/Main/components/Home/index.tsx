import Welcome from "@/app/[lng]/components/Main/components/Home/components/Welcome";
import TechStack from "@/app/[lng]/components/Main/components/Home/components/TechStack";
import { TFunction } from "@/app/i18n";

export default async function Home({ language }: { language: TFunction }) {
  return (
    <section
      className="mt-40 quad:mt-60 mb-96 max-lg:mb-72 max-sm:mt-4 max-sm:mb-32"
      id=""
    >
      <Welcome language={language} />
      <TechStack language={language} />
    </section>
  );
}

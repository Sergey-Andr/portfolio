import Main from "@/app/[lng]/components/Main";
import Header from "@/app/[lng]/components/Header";
import Footer from "@/app/[lng]/components/Footer";
import { useTranslation } from "@/app/i18n";

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <Header language={t} />
      <Main language={t} />
      <Footer language={t} />
    </>
  );
}

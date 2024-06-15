import Header from "./Header";
import ThreeCard from "./ThreeCard";
import SixCard from "./SixCard";
import SecondPage from "./SecondPage";
import Footer from "./Footer";
import TopbarLanding from "./TopbarLanding";

export default function Landing() {
  return (
    <>
      <TopbarLanding />
      <div className=" w-full overflow-x-hidden bg-[var(--white)] ">
        <SecondPage />
        <Header />
        <ThreeCard />
        <SixCard />
        <Footer />
      </div>
      {/* <Link href={{ pathname: "/auth/login" }}>Se connecter</Link> <br />
      <Link href={{ pathname: "/auth/register" }}>S{"'"}inscrire</Link> */}
    </>
  );
}

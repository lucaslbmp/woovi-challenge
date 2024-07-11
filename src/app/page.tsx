import Logo from "./components/Logo";
import OptionCard from "./components/OptionCard";
import OptionCardsColumn from "./components/OptionCardsColumn";
import PageTitle from "./components/PageTitle";
import {paymentOptions} from '../app/data.js'
import Footer from "./components/Footer";

export default function Home() {

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <Logo />
      <PageTitle text={"João, como você quer pagar?"} />
      <OptionCard
        title="Pix"
        numberOfInstallments={1}
        installmentValue={305000}
        highlighted="Ganhe 3% de Cashback"
        tip={
          <span>
            🤑 <b>R$ 300,00</b> de volta no seu Pix na hora
          </span>
        }
      />
      <OptionCardsColumn options={paymentOptions} title="Pix Parcelado"/>
      <Footer />
    </main>
  );
}

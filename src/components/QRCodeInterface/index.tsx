import { paymentOptions } from "@/app/data";
import { formatToReais } from "@/app/utils/functions";
import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";

type QRCodeInterfaceProps = {
  currPaymentMethod: (typeof paymentOptions)[0];
};

export default function QRCodeInterface({
  currPaymentMethod,
}: QRCodeInterfaceProps) {
  return (
    <>
      <PageTitle
        text={`João, pague a entrada de ${formatToReais(
          currPaymentMethod?.installmentValue
        )} pelo Pix`}
      />

      <div className="border-highlight border-2 rounded-lg mx-auto">
        <Image
          className=" p-2.5"
          src="/dummy-qr-code.svg"
          alt="qr-code"
          width={332}
          height={332}
        />
      </div>

      <Button className="flex items-center gap-3 mx-auto w-fit">
        Clique aqui para copiar QR CODE
        <Image src="/copy.svg" alt="copy" width={16} height={16} />
      </Button>

      <div className="flex flex-col text-center">
        <div className="text-textSecondary">Prazo de pagamento</div>
        <div className="font-nunitoBold">15/12/2021 - 08:17</div>
      </div>
    </>
  );
}

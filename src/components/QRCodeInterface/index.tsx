import Button from "@/components/Button";
import Image from "next/image";
import { PaymentMethod } from "@/types";
import { qrCodeFormAction } from "@/actions";
import { useTranslations } from "next-intl";

type QRCodeInterfaceProps = {
  currPaymentMethod: PaymentMethod;
};

export default function QRCodeInterface({
  currPaymentMethod,
}: QRCodeInterfaceProps) {
  const t = useTranslations("QRCodeInterface");
  const t_cta = useTranslations("CTA");

  return (
    <form action={qrCodeFormAction} className="flex flex-col gap-8">
      <div className="border-highlight border-2 rounded-lg mx-auto">
        <Image
          className=" p-2.5"
          src="/dummy-qr-code.svg"
          alt="qr-code"
          width={332}
          height={332}
        />
      </div>

      <Button type="button" className="flex items-center gap-3 mx-auto w-fit">
        {t("buttonLabel")}
        <Image src="/copy.svg" alt="copy" width={16} height={16} />
      </Button>

      <div className="flex flex-col text-center">
        <div className="text-textSecondary">{t("deadline")}</div>
        <div className="font-nunitoBold">15/12/2021 - 08:17</div>
      </div>

      <div className="flex basis-full justify-center">
        <Button className="w-full max-w-[20.5rem]">{t_cta("pay")}</Button>
      </div>
    </form>
  );
}

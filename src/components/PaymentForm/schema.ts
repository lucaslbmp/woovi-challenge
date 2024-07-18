import * as Yup from "yup";
import { checkCpf } from "@/utils/functions.ts";

const isExpired = (dateStr: string) => {
  const [month, year] = dateStr.split("/");
  const expDate = new Date(+("20" + year), +month, 1);
  const firstDayofMonth = new Date();
  firstDayofMonth.setDate(1);
  return expDate > firstDayofMonth;
};

const PaymentFormSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string()
    .required("Campo obrigatório")
    .test("is-cpf-valid", "CPF invalido", (val) => checkCpf(val || "")),
  cardNumber: Yup.string().required("Campo obrigatório"),
  cardExpiration: Yup.string()
    .required("Campo obrigatório")
    .test("is-card-expired", "Cartão vencido", (val) => isExpired(val)),
});

export default PaymentFormSchema;

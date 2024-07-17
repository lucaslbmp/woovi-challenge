import * as Yup from "yup";
import { checkCpf } from "@/utils/functions.ts";

const isExpired = (dateStr: string) => {
  const [month, year] = dateStr.split('/');
  const expDate = new Date(+("20"+year), +month, 1);
  const firstDayofMonth = new Date();
  firstDayofMonth.setDate(1);
  console.log(expDate.toLocaleDateString(), firstDayofMonth.toLocaleDateString())
  return expDate > firstDayofMonth;
}

const PaymentFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  cpf: Yup.string()
    .required("Required")
    .test("is-cpf-valid", "CPF invalido", (val) => checkCpf(val || "")),
  cardExpiration: Yup.string()
  .required("Required")
  .test('is-card-expired', 'Cartão vencido!', (val) => isExpired(val)),
});

export default PaymentFormSchema;

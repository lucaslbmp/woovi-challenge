import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex gap-2 justify-center text-textSecondary mt-10 mb-[4.5em]">
        <Image src="/protected.svg" alt="protected" width={16} height={18}/>
        Pagamento 100% seguro via:
        <Image src="/logo-footer.svg" alt="logo-footer" width={57} height={17}/>
    </div>
  );
}

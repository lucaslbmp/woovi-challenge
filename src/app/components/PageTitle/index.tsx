type PageTitleProps = {
  text: String;
};

export default function PageTitle({ text }: PageTitleProps) {
  return <h1 className="font-nunitoBold text-2xl text-center">{text}</h1>;
}

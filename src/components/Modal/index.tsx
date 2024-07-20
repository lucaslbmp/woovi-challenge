type ModalProps = {
    children: React.ReactNode;
}

export default function Modal({children}: ModalProps) {
  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className="bg-white m-auto p-8">
          <div className="flex flex-col items-center">
        {children}
          </div>
        </div>
      </dialog>
    </>
  );
}

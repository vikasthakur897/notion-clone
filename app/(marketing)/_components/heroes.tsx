import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl ">
     
     <div className="flex items-center"> <div
        className="relative w-[300px] h=[300px]
            sm:w-[35opx] sm:h-[350px] md:h-[400px] md:w-[400px]"
      >
        <Image
          src="/document.png"
          fill
          className="object-contain dark:hidden"
          alt="Document"
        />
         <Image
          src="/document-dark.png"
          fill
          className="object-contain hidden dark:block"
          alt="Document"
        />
      </div>
      <div className="relative h-[400px] w-[400px] hidden md:block">
        <Image src="/reading.png" fill className="object-contain dark:hidden" alt="reading" />
        <Image
          src="/reading-dark.png"
          fill
          className="object-contain hidden dark:block"
          alt="reading" />
      </div>
      </div>
    </div>
  );
};

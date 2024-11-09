"use client";
import Link from "next/link";
import Navbar from "../components/ui/Navbar";
import Image from "next/image";

const Line = () => {
  return (
    <div>
      <div className="w-[200px] h-[2px] bg-pinkish"></div>
    </div>
  );
};

const Works = () => {
  return (
    <div className="max-w-[1920px] mx-auto pl-[50px] pr-[50px]">
      <Navbar />
      <h1 className="mt-[150px] font-bold text-[32px] text-center">
        How it <span className="text-pinkish">Works</span>
      </h1>
      <div className="flex justify-center mt-[250px] mb-[200px]">
        <div className="w-[300px] h-[200px] bg-pinkish rounded-[10px]">
          <div className="flex justify-center">
            <Image
              src="/images/pic15.png"
              alt=""
              width={50}
              height={50}
              className="mt-[-40px]"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src="/images/pic8.png" alt="" width={245} height={245} />
          </div>
          <p className="text-center mt-[5px] font-bold">Access Focusify</p>
        </div>

        <div className="flex items-center">
          <Line />
        </div>

        <div className="w-[300px] h-[200px] bg-pinkish rounded-[10px]">
          <div className="flex justify-center">
            <Image
              src="/images/pic14.png"
              alt=""
              width={50}
              height={50}
              className="mt-[-40px]"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src="/images/pic9.png" alt="" width={125} height={125} className="mt-[40px]" />
          </div>
          <p className="text-center mt-[50px] font-bold">Customizing Timers</p>
        </div>

        <div className="flex items-center">
          <Line />
        </div>

        <div className="w-[300px] h-[200px] bg-pinkish rounded-[10px]">
          <div className="flex justify-center">
            <Image
              src="/images/pic13.png"
              alt=""
              width={50}
              height={50}
              className="mt-[-40px]"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src="/images/pic11.png" alt="" width={125} height={125} className="mt-[40px]" />
          </div>
          <p className="text-center mt-[50px] font-bold">Choose Your Music</p>
        </div>

        <div className="flex items-center">
          <Line />
        </div>
        <div className="w-[300px] h-[200px] bg-pinkish rounded-[10px]">
          <div className="flex justify-center">
            <Image
              src="/images/pic12.png"
              alt=""
              width={50}
              height={50}
              className="mt-[-40px]"
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src="/images/pic10.png" alt="" width={125} height={125} className="mt-[40px]" />
          </div>
          <p className="text-center mt-[50px] font-bold">Stay Productive</p>
        </div>
      </div>
    </div>
  );
};

export default Works;

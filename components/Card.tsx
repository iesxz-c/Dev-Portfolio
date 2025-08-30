// import { PropsWithChildren } from "react";
// import { twMerge } from "tailwind-merge";
// import grainImage from "../assets/images/grain.jpg";

// export const Card = ({
//   className,
//   children,
// }: PropsWithChildren<{ className?: string }>) => {
//   return (
//     <div
//       className={twMerge(
//         `bg-black-100 rounded-3xl relative z-0
//          overflow-hidden 
//          after:z-10 after:content-[''] after:absolute
//           after:inset-0 
//          after:outline-2 after:outline after:-outline-offset-2  
//          after:rounded-3xl after:outline-white/20 
//          after:pointer-events-none p-6
         
//          `,
//         className
//       )}
//     >
//       <div
//         className="absolute inset-0 -z-10 opacity-5"
//         style={{ backgroundImage: `url(${grainImage.src})` }}
//       />
//       {children}
//     </div>
//   );
// };
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import grainImage from "../assets/images/grain.jpg";

export const Card = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={twMerge(
        `relative z-0 rounded-3xl overflow-hidden p-6
         bg-black/40 backdrop-blur-xl 
         border border-white/10 
         shadow-[0_0_20px_rgba(0,255,170,0.15)]
         transition duration-300 hover:shadow-[0_0_25px_rgba(0,255,170,0.35)]
         group
        `,
        className
      )}
    >
      {/* Grainy background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: `url(${grainImage.src})`, backgroundSize: "cover" }}
      />

      {/* Subtle gradient border overlay */}
      <div
        className="absolute inset-0 rounded-3xl -z-10 pointer-events-none
        bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10
        opacity-60 group-hover:opacity-90 transition duration-500"
      />

      {children}
    </div>
  );
};

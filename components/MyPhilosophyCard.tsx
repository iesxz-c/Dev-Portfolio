import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { Particles } from "./Particles"

const MyPhilosophyCard = () => {
  return (
    <Card className="flex h-full min-h-[320px] w-full flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
      <CardHeader
        title="My Philosophy"
        description="Crafting Experiences, Not Just Code"
      />
      <div className="relative z-10 p-6 pt-0">
        <p className="font-mono text-sm text-white/80">
          I build digital experiences that feel natural—where code meets intuition, and coffee is just another tool in the stack. Clean, efficient solutions that work the way you think.
        </p>
        <br />
        <p className="font-mono text-sm text-white/80">
           The best products don’t get in your way—they move with you. I try to do the same.
        </p>
      </div>
      {/* <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={80}
        color={"#ffffff"}
        vy={-0.5} // Slow upward drift
      /> */}    
      
    </Card>
  );
};

export default MyPhilosophyCard;
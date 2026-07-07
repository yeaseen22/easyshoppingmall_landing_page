import { cn } from "@/utils/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <div className={cn("container w-full mx-auto px-5 overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
};

export default Container;

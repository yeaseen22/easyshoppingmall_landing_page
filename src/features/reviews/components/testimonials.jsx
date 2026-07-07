import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { MessageSquareQuote } from "lucide-react";
import ReviewForm from "./review-form";
import ReviewSlider from "./review-slider";

export default function Testimonials({ reviews = [] }) {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg">
              <MessageSquareQuote className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary font-medium text-sm tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
              Testimonials
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            What our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Discover why thousands of customers trust us for their shopping
            needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center">
          <ReviewSlider reviews={reviews || []} />
          <ReviewForm />
        </div>
      </Container>
    </Section>
  );
}

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PaymentSelector = ({ value, onChange, paymentMethods }) => {
  const methods = [
    { id: "cod", label: "Cash on Delivery", sub: "পণ্য হাতে পেয়ে টাকা দিন" },
  ];

  if (paymentMethods?.bKash?.number) {
    methods.push({
      id: "bkash",
      label: "bKash Payment",
      sub: `${paymentMethods.bKash.number} (${paymentMethods.bKash.type})`,
    });
  }

  if (paymentMethods?.nagad?.number) {
    methods.push({
      id: "nagad",
      label: "Nagad Payment",
      sub: `${paymentMethods.nagad.number} (${paymentMethods.nagad.type})`,
    });
  }

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-1 gap-3 mb-8"
    >
      {methods.map((method) => (
        <Label
          key={method.id}
          htmlFor={method.id}
          className={`flex items-center justify-between p-4 py-2 sm:py-4 border cursor-pointer transition-all ${
            value === method.id
              ? "border-primary bg-primary/10"
              : "border-border bg-muted"
          }`}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value={method.id} id={method.id} />
            <div>
              <p className="font-bold text-sm text-foreground">
                {method.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{method.sub}</p>
            </div>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default PaymentSelector;

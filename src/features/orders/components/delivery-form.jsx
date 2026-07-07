import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DeliveryForm({ customer, onChange, errors }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Delivery Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-bold uppercase">Full Name</Label>
              <Input type="text" name="customerName" value={customer.customerName} onChange={onChange} placeholder="Full Name" className="mt-1" />
              {errors.customerName && <p className="text-destructive text-[10px] mt-1">{errors.customerName}</p>}
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Phone Number</Label>
              <Input type="tel" name="phone" value={customer.phone} onChange={onChange} placeholder="Phone Number" className="mt-1" />
              {errors.phone && <p className="text-destructive text-[10px] mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-bold uppercase">Zilla</Label>
              <Input type="text" name="zilla" value={customer.zilla} onChange={onChange} placeholder="Zilla (e.g. Dhaka)" className="mt-1" />
              {errors.zilla && <p className="text-destructive text-[10px] mt-1">{errors.zilla}</p>}
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Thana</Label>
              <Input type="text" name="thana" value={customer.thana} onChange={onChange} placeholder="Thana (e.g. Mirpur)" className="mt-1" />
              {errors.thana && <p className="text-destructive text-[10px] mt-1">{errors.thana}</p>}
            </div>
          </div>
          <div>
            <Label className="text-xs font-bold uppercase block">Email</Label>
            <Input type="email" name="email" value={customer.email} onChange={onChange} placeholder="Email" className="mt-1" />
            {errors.email && <p className="text-destructive text-[10px] mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label className="text-xs font-bold uppercase block">Full Address (Area, Thana, House No)</Label>
            <Textarea name="address" rows={3} value={customer.address} onChange={onChange} placeholder="Full Address (Area, Thana, House No)" className="mt-1 resize-none" />
            {errors.address && <p className="text-destructive text-[10px] mt-1">{errors.address}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

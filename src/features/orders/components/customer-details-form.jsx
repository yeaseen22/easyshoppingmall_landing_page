"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

const fieldConfigs = [
  {
    name: "customerName",
    label: "সম্পুর্ণ নাম",
    placeholder: "মোঃ রাকিবুল ইসলাম",
    type: "text",
    className: "col-span-1 ",
  },
  {
    name: "phone",
    label: "ফোন নাম্বার",
    placeholder: "01845167412",
    type: "tel",
    className: "col-span-1",
  },
  {
    name: "zilla",
    label: "জেলা",
    placeholder: "রংপুর",
    type: "text",
    className: "col-span-1 ",
  },
  {
    name: "thana",
    label: "থানা",
    placeholder: "তারাগঞ্জ",
    type: "text",
    className: "col-span-1",
  },
  {
    name: "email",
    label: "ইমেইল",
    placeholder: "rakibul.islam@bd.com",
    type: "email",
    className: "sm:col-span-2",
  },
  {
    name: "address",
    label: "গ্রাম / মহল্লা",
    placeholder: "কুর্শা কাজী পাড়া",
    type: "textarea",
    rows: 3,
    className: "sm:col-span-2",
  },
];

const CustomerDetailsForm = ({ control }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            আপনার তথ্য দিন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fieldConfigs.map((fieldConfig) => (
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                render={({ field, fieldState }) => (
                  <Field className={fieldConfig.className}>
                    <FieldLabel
                      htmlFor={field.name}
                      data-invalid={fieldState.invalid}
                    >
                      {fieldConfig.label}
                    </FieldLabel>

                    {fieldConfig.type === "textarea" ? (
                      <Textarea
                        {...field}
                        id={field.name}
                        rows={fieldConfig.rows || 3}
                        aria-invalid={fieldState.invalid}
                        placeholder={fieldConfig.placeholder}
                        className="bg-muted resize-none px-2"
                      />
                    ) : (
                      <Input
                        {...field}
                        id={field.name}
                        type={fieldConfig.type}
                        aria-invalid={fieldState.invalid}
                        placeholder={fieldConfig.placeholder}
                        className="bg-muted px-2"
                      />
                    )}

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomerDetailsForm;

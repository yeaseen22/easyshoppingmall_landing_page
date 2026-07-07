import Container from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const defaultPaymentMethods = ["bKash", "Nagad", "COD"];

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer({ settings = {} }) {
  const brand = settings.navbar || {};
  const footer = settings.footer || {};
  const contactInfo = footer.contactInfo || {};
  const socialLinks = footer.socialLinks || {};
  const businessHours = footer.businessHours || {};

  return (
    <footer className="backdrop-blur-xl text-foreground footer-section">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-col items-start gap-3">
            <Logo brand={brand} />
            {footer.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                {footer.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <span>
                {businessHours.startDate?.slice(0, 3)}–
                {businessHours.endDate?.slice(0, 3)}: {businessHours.startTime}{" "}
                – {businessHours.endTime}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {`@ ${new Date().getFullYear()} ${brand.brandName}. All rights reserved.`}
          </p>

          <div className="flex items-center gap-2">
            {defaultPaymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs bg-muted border border-border px-3 py-1 text-muted-foreground hover:border-primary hover:text-primary transition"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs text-muted-foreground">
              Follow Us
            </span>
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (url) {
                const Icon = socialIconMap[platform];

                return (
                  <Link
                    key={platform}
                    href={url}
                    aria-label={platform}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted text-xs font-bold text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {Icon ? (
                      <Icon size={16} />
                    ) : (
                      platform.slice(0, 2).toUpperCase()
                    )}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}

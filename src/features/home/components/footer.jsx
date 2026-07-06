import Container from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
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
    <footer className="bg-black/92 backdrop-blur-xl text-accent-content footer-section">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-col items-start gap-3">
            <Logo brand={brand} />
            {footer.description && (
              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
                {footer.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin className="h-4 w-4 shrink-0 text-primary-color" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Phone className="h-4 w-4 shrink-0 text-primary-color" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail className="h-4 w-4 shrink-0 text-primary-color" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Clock className="h-4 w-4 shrink-0 text-primary-color" />
              <span>
                {businessHours.startDate.slice(0, 3)}–
                {businessHours.endDate.slice(0, 3)}: {businessHours.startTime} –{" "}
                {businessHours.endTime}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-content/8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            {`@ ${new Date().getFullYear()} ${brand.brandName}. All rights reserved.`}
          </p>

          <div className="flex items-center gap-2">
            {defaultPaymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs bg-accent-content/5 border border-accent-content/8 px-3 py-1 rounded-lg text-gray-400 hover:border-primary-color hover:text-primary-color transition"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs text-gray-400">Follow Us</span>
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
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-accent-content/8 bg-accent-content/5 text-xs font-bold text-gray-500 transition-all hover:border-primary-color hover:bg-primary-color hover:text-accent"
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

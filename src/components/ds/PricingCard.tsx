import React from "react";
import { Badge } from "./Badge";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";

/**
 * Edara PricingCard — one tier in the 3-up pricing row. The `featured` tier
 * gets a 2px primary border, a raised offset, a "Most Popular" badge, and a
 * brand-tinted hover shadow.
 */
type PricingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  tier: string;
  name: string;
  price: string;
  per?: string;
  description?: React.ReactNode;
  features?: string[];
  cta?: string;
  featured?: boolean;
  onSelect?: () => void;
};

export function PricingCard({
  tier,
  name,
  price,
  per = "/mo",
  description,
  features = [],
  cta = "Select Plan",
  featured = false,
  onSelect,
  className = "",
  ...rest
}: PricingCardProps) {
  return (
    <div
      className={`edara-price${featured ? " edara-price--featured" : ""}${
        className ? " " + className : ""
      }`}
      {...rest}
    >
      {featured && (
        <div className="edara-price__badge">
          <Badge variant="solid">Most Popular</Badge>
        </div>
      )}
      <Eyebrow tone={featured ? "brand" : "muted"}>{tier}</Eyebrow>
      <h3 className="edara-price__name">{name}</h3>
      <div className="edara-price__amt">
        <b style={featured ? { color: "var(--primary)" } : undefined}>{price}</b>
        <span className="edara-price__per">{per}</span>
      </div>
      <p className="edara-price__desc">{description}</p>
      <ul className="edara-price__list">
        {features.map((f, i) => (
          <li className="edara-price__li" key={i}>
            <span className="material-symbols-outlined">check_circle</span>
            {f}
          </li>
        ))}
      </ul>
      <Button variant={featured ? "primary" : "outline"} block onClick={onSelect}>
        {cta}
      </Button>
    </div>
  );
}

export default PricingCard;
